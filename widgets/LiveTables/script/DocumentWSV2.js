/**
 * BT WW Competencies Center - Fast Prototypes Team
 * @author UM5
 */
define(["UM5Modules/Connector3DExpV2", "UM5Modules/3DSpaceWSHelper"], function(Connector3DExp, SpaceWSHelper) 
{
    "use strict";

    var DocumentsWS = {

        get3DSpaceURL: function() {
            return SpaceWSHelper.get3DSpaceURL();
        },

        //OOTB Documents Web Services

        //Helpers for the Web Services
        getDocInfos: function(docId, options) {
            options.url = "/resources/v1/modeler/documents/" + docId;
            options.method = "GET";
            SpaceWSHelper._doCallWithCSRF(options);
        },

        getDocInfosFiles: function(docId, options) {
            options.url = "/resources/v1/modeler/documents/" + docId + "/files";
            options.method = "GET";
            SpaceWSHelper._doCallWithCSRF(options);
        },

        getDocFileDownloadTicket: function(docId, fileId, options) {
            if (fileId) {
                options.url = `/resources/v1/modeler/documents/${docId}/files/${fileId}/DownloadTicket`;
            } else {
                options.url = `/resources/v1/modeler/documents/${docId}/files/DownloadTicket`;
            }

            options.method = "PUT";
            SpaceWSHelper._doCallWithCSRF(options);
        },

        uploadFileToNewDoc: function(tenant, file, docName, parentFolderId, onOkWithDocInfos, onError) {
            //Process is :
            // 1- Get a Checkin Ticket for the FCS
            // 2- Upload the file in the FCS and get the FCS Receipt
            // 3- Create the Document with the FCS Receipt to attach the file to it at creation

            let parentInfos = null;
            if (parentFolderId) {
                parentInfos = {
                    parentId: parentFolderId,
                    parentRelName: "Vaulted Objects", //TODO : switch to Vaulted Documents for Projects Folder and Documents
                    parentDirection: "from"
                };
            }

            DocumentsWS._getCheckinTicketInfos(tenant, null, fcsDataTicket => {
                //Step 1 done
                let fcsURL = fcsDataTicket.ticketURL;
                let fcsTicketParam = fcsDataTicket.ticketparamname;
                let fcsTicket = fcsDataTicket.ticket;
                DocumentsWS._uploadFileToFCS(
                    file,
                    fcsURL,
                    fcsTicketParam,
                    fcsTicket,
                    fcsReceipt => {
                        //Step 2 done
                        let fileName = file.name;
                        let docTitle = fileName.substring(0, fileName.lastIndexOf("."));
                        DocumentsWS._createNewDocWithFCSFileReceipt(tenant, fcsReceipt, docTitle, docName, fileName, parentInfos, onOkWithDocInfos, onError);
                    },
                    onError
                );
            }, onError);
        },

        _getCheckinTicketInfos: function(tenant, docId, onOkFCSTicket, onError) {
            let options = {
                url: `/resources/v1/modeler/documents${docId ? "/"+docId : ""}/files/CheckinTicket`,
                tenant: tenant,
                method: "PUT",
                data: "{}", //Empty Json as a String
                contentType: "application/json",
                onOk: dataFCSTicket => {
                    let fcsData = dataFCSTicket && dataFCSTicket[0] && dataFCSTicket[0].dataelements;
                    onOkFCSTicket(fcsData);
                },
                onError: (errorType, errorMsg) => {
                    onError(errorType, errorMsg);
                }
            };
            //No CSRF Token needed for this PUT call to get a CheckinTicket and the bonus is that it will give us one for the next calls
            SpaceWSHelper._do3DSpaceCall(options);
        },

        _uploadFileToFCS: function(file, fcsURL, fcsTicketParam, fcsTicket, onOkFCSReceipt, onError) {
            let formData = new FormData();
            formData.append(fcsTicketParam, fcsTicket);
            formData.append("file_0", file, file.name);

            let req = new XMLHttpRequest();
            req.open("POST", fcsURL, true);

            req.onload = function(e) {
                if (this.status === 200) {
                    var dataFCSReceipt = req.response;

                    onOkFCSReceipt(dataFCSReceipt);
                } else {
                    console.error("Error will uploading the file to FCS", e);
                    onError("WebService Call Faillure " + fcsURL, req.response);
                }
            };

            req.onerror = function() {
                onError("WebService Call Faillure " + fcsURL, arguments);
            };

            req.send(formData); //Send the XHR
        },

        _createNewDocWithFCSFileReceipt: function(tenant, fcsFileReceipt, docTitle, docName, fileName, parentInfos, onOkDocCreated, onError) {

            //Load the tenant infos first if ctx not loaded for indicated Tenant
            Connector3DExp.getEnoCtxOfTenant(tenant, (enoCtxOfTenant) => {
                let preferredEnoCtx = enoCtxOfTenant.preferredcredentials;
                //let strCtx = preferredEnoCtx.role.name + "." + preferredEnoCtx.organization.name + "." + preferredEnoCtx.collabspace.name;

                let currentCS = preferredEnoCtx.collabspace.name;

                let tempId = "temp_" + Date.now();

                let options = {
                    url: "/resources/v1/modeler/documents",
                    tenant: tenant,
                    method: "POST",
                    data: {
                        //CSRF token will be added by the _doCallWithCSRF function call
                        data: [{
                            dataelements: {
                                title: docTitle,
                                collabSpace: currentCS,
                                name: docName,
                                parentId: parentInfos && parentInfos.parentId,
                                parentRelName: parentInfos && parentInfos.parentRelName,
                                parentDirection: parentInfos && parentInfos.parentDirection
                            },
                            relateddata: {
                                files: [{
                                    dataelements: {
                                        title: fileName,
                                        receipt: fcsFileReceipt
                                    }
                                }]
                            },
                            tempId: tempId
                        }]
                    },
                    contentType: "application/json",
                    type: "json",
                    onOk: dataDoc => {
                        onOkDocCreated(dataDoc, tempId);
                    },
                    onError: (errorType, errorMsg) => {
                        onError(errorType, errorMsg);
                    }
                };

                SpaceWSHelper._doCallWithCSRF(options);

            }, onError);
        },

        updateFileOfDoc(tenant, docId, fileId, file, onOkFileUpdated, onError) {
            //Process is :
            // 1- Get a Checkin Ticket for the FCS
            // 2- Upload the file in the FCS and get the FCS Receipt
            // 3- UPDATE the Document with the FCS Receipt to update the file that was just uploaded

            DocumentsWS._getCheckinTicketInfos(tenant, docId, fcsDataTicket => {
                //Step 1 done
                let fcsURL = fcsDataTicket.ticketURL;
                let fcsTicketParam = fcsDataTicket.ticketparamname;
                let fcsTicket = fcsDataTicket.ticket;
                DocumentsWS._uploadFileToFCS(
                    file,
                    fcsURL,
                    fcsTicketParam,
                    fcsTicket,
                    fcsReceipt => {
                        //Step 2 done
                        let fileName = file.name;
                        DocumentsWS._updateDocFileWithFCSFileReceipt(tenant, docId, fileId, fileName, fcsReceipt, onOkFileUpdated, onError);
                    },
                    onError
                );
            }, onError);
        },
        _updateDocFileWithFCSFileReceipt(tenant, docId, fileId, fileName, fcsFileReceipt, onOkDocFileUpdated, onError) {
            let tempId = "temp_" + Date.now();

            let options = {
                url: `/resources/v1/modeler/documents`, // /${docId}/files/${fileId}, Note here : 19xfd01 parameters in the query are not working, it has to go in the request payload it seems
                tenant: tenant,
                method: "PUT",
                data: {
                    //CSRF token will be added by the _doCallWithCSRF function call
                    data: [{
                        id: docId,
                        relateddata: {
                            files: [{
                                id: fileId,
                                dataelements: {
                                    title: fileName,
                                    receipt: fcsFileReceipt
                                },
                                updateAction: "REVISE"
                            }]
                        },
                        tempId: tempId
                    }]
                },
                contentType: "application/json",
                type: "json",
                onOk: dataDoc => {
                    onOkDocFileUpdated(dataDoc, tempId);
                },
                onError: (errorType, errorMsg) => {
                    onError(errorType, errorMsg);
                }
            };

            SpaceWSHelper._doCallWithCSRF(options);
        }
    };
    return DocumentsWS;
});
