// Replies with onDone(CSRF ticket)
function _3dspace_get_csrf(host, docid, onDone = undefined, onError = undefined)
{
    let url = host + `/resources/v1/modeler/documents/${docid}`;

    _httpCallAuthenticated(url, {
            onComplete: function(response, headers, xhr) {
                info = JSON.parse(response);
                if (onDone) onDone(info);
            },

            onFailure: function(response) {
                if (onError) onError(response);
            }
        }
    );
}

// Replies with onDone(URL)
function _3dspace_file_url(host, docid, onDone = undefined, onError = undefined) 
{
    let url = host + `/resources/v1/modeler/documents/${docid}/files/DownloadTicket`;
    _3dspace_get_csrf(host, docid, function(info) {
        _httpCallAuthenticated(url, {
                method: "PUT",
                headers: {ENO_CSRF_TOKEN: info.csrf.value}, 
    
                onComplete: function(response) {
                    let info = JSON.parse(response);
    
                    if (info.success == true)
                    {
                        try {
                            file_url = info.data[0].dataelements.ticketURL;
                            if (onDone) onDone(file_url);
                        } catch(err) {
                            if (onError) onError(err);
                        }
                    }
                },
    
                onFailure: function(response) {
                    if (onError) onError(response);
                }
            }
        );
    }, onError);
}

// Replies with onDone(URL)
function _3dspace_file_url_csr(host, docid, csr, onDone = undefined, onError = undefined) 
{
    let url = host + `/resources/v1/modeler/documents/${docid}/files/DownloadTicket`;
    _httpCallAuthenticated(url, {
        method: "PUT",
        headers: {ENO_CSRF_TOKEN: csr}, 

        onComplete: function(response) {
            let info = JSON.parse(response);

            if (info.success == true)
            {
                try {
                    file_url = info.data[0].dataelements.ticketURL;
                    if (onDone) onDone(file_url);
                } catch(err) {
                    if (onError) onError(err);
                }
            }
        },

        onFailure: function(response) {
            if (onError) onError(response);
        }
    });
}

function _3dspace_file_update(host, docid, fileid, data, filename, onDone = undefined, onError = undefined)
{
    _3dspace_get_csrf(host, docid,
    function (info)
    {
        _3dspace_file_update_csr(host, docid, fileid, data, filename, info.csrf.value, onDone, onError);
    },
    onError);
}

function _3dspace_file_update_csr(host, docid, fileid, data, filename, csr, onDone = undefined, onError = undefined)
{
    let url = host + `/resources/v1/modeler/documents/${docid}/files/CheckinTicket`;
    _httpCallAuthenticated(url, 
        {
            method: "PUT",
            headers: {ENO_CSRF_TOKEN: csr}, 

            onComplete: function(response, headers, xhr)
            {
                let info = JSON.parse(response).data[0].dataelements;

                let formData = new FormData();

                formData.append('__fcs__jobTicket', info.ticket);
                formData.append('file_0', data, filename);
    
                var opts = {};
                opts.method = 'POST';
                opts.data = formData;

                opts.onComplete = function(response) {
                    //Update the FCS file receipt
                    let tempId = "temp_" + Date.now();
                    let options = 
                    {
                        method: "PUT",
                        headers: { ENO_CSRF_TOKEN: csr },
                        data: JSON.stringify({
                            data: [{
                                id: docid,
                                relateddata: {
                                    files: [
                                    {
                                        id: fileid,
                                        dataelements: 
                                        {
                                            title: filename,
                                            receipt: response,
                                        },
                                        updateAction: "REVISE"
                                    }]
                                },
                                tempId: tempId
                            }]
                        }),

                        type: "json",

                        onComplete: function(response) {
                            if (onDone) onDone(response);
                        },

                        onFailure: function(response) {
                            if (onError) onError(response);
                        }
                    };

                    _httpCallAuthenticated(host + `/resources/v1/modeler/documents`, options);
                };

                opts.onFailure = function(err) {
                    if(onError) onError(err);
                };

                opts.timeout = 0;
    
                _httpCallAuthenticated(info.ticketURL, opts);
            }
        }
    );
}