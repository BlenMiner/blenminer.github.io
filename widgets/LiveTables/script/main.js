/*
 * @author VBU4
 */

var header = { icon: "Icon", name: "Filename", type:"File Type" ,date:"Last Modification", source: "Source", tools: "Tools"};
var data = [];

var preview_csv_data = [];
var preview_row = undefined;

var _3DSpace = undefined;
var _3DDrive = undefined;

var search_pat = "";
var tag_pat = [];
var platformUrl = "";

var BACK_BUTTON = `
            <div class='window'>
                <img id='back_preview' src='${WIDGET_ROOT}/assets/close_red.png'></img>
            </div>`;

var MyWidget = function() 
{
    var me = this;

    // Widget constructor function (before widget is loaded)
    this.start = function()
    {
        widget.addEvent("onLoad", me.onLoad);
        widget.addEvent("onRefresh", me.onRefresh);
        widget.addEvent("onSearch", me.onSearch);
        widget.addEvent("onResetSearch", me.onResetSearch);
    };

    // only for template demonstration
    this.printMsg = function(message, color)
    {
        console.log("LiveTables: " + message);
    };

    this.printTable = function()
    {
        html = "<table id='customers'>";

        html += "<tr><th>" + header.icon + "</th><th>" +  header.name + "</th><th>"  +  header.type + "</th><th>" + 
                header.date + "</th><th>"  + header.source + "</th><th>" + header.tools + "</th></th>";

        for (i = 0; i < data.length; i++)
        {
            row = data[i];

            html += "<tr id='" + row.id + "'";
            
            any_found = false;
            tagged = false;

            for (j = 0; j < tag_pat.length; j++)
            {
                if (tag_pat[j] == i)
                {
                    tagged = true;
                    break;
                }
            }
            
            if (tagged)
            {
                for (const [key, value] of Object.entries(row))
                {
                    if (value.toLowerCase().includes(search_pat))
                    {
                        any_found = true;
                        break;
                    }
                }
            }

            if (!any_found)
                html += " class='rejected'";

            html += ">";
            html += "<td width='10'><img width='50px' src='" + row.icon + "'/>" +
                "</td><td>" + row.name +
                "</td><td>" + row.type + (row.extension ? " - " + row.extension : "") +
                "</td><td>" + row.date +
                "</td><td>" + row.source +
                "</td><td>" + "<a class='delete' id='" + row.id + "-remove'>X</a>" + 
                              "<a class='fetch' id='" + row.id + "-preview'>👁</a>" + "</td>";

            html += "</tr>";
        }
        html += "</table>";

        var tableDiv = document.querySelector("div#data");
        tableDiv.innerHTML = html;

        for (i = 0; i < data.length; i++)
        {
            row = data[i];

            me.setDraggable(document.getElementById(row.id), row.drag, function(element, event) { });

            document.getElementById(row.id + "-remove").addEventListener("click", function()
            {
                i = me.getTableElementIndex(this.id);
                if (i > -1) {
                    me.popTable(i);
                }
            });

            document.getElementById(row.id + "-preview").addEventListener("click", function()
            {
                i = me.getTableElementIndex(this.id);
                if (i > -1) {
                    me.downloadFileData(data[i]);
                }
            });
        }
    };

    this.toggleMainMenu = function(enable)
    {
        document.getElementById('main_body').className = enable ? '' : 'hidden';
        document.getElementById('preview_body').className = !enable ? '' : 'hidden';
    };

    this.printCSV = function(csv_text)
    {
        preview_csv_data = CSVToArray(csv_text, ',');
        DrawCSVTable(preview_csv_data);

        document.getElementById("back_preview").addEventListener("click", function()
        {
            me.toggleMainMenu(true);
        });

        document.getElementById("upload_preview").addEventListener("click", function()
        {
            me.printMsg("This is where I upload the changes");
            me.uploadFileData(preview_row, "test");
        });

        var cell = document.querySelectorAll('.cell');

        for (let i = 0; i < cell.length; i++) {
            cell[i].addEventListener('dblclick', function() {
                if (document.getElementById("live_edit"))
                    return;
                    
                this.innerHTML = `<span contenteditable="true" id="live_edit">${sanitize(this.innerText)}</span>`;

                let textbox = document.getElementById("live_edit");

                textbox.focus();
                
                textbox.addEventListener("blur", function()
                {
                    //Change table content
                    let coords = this.parentElement.id.split("-");
                    let sanitized_content = sanitize(this.innerText);

                    preview_csv_data[coords[0]][coords[1]] = sanitized_content;

                    //Update the preview
                    this.parentElement.innerHTML = sanitized_content;
                });

                textbox.addEventListener("keypress", function (event) {
                    if (event.which == 13 || event.keyCode == 13) {
                        this.blur();
                        return false;
                    }
                    return true;
                });
            });
        }
    };

    this.printImg = function(file_url)
    {
        var csvDiv = document.querySelector("div#preview_data");

        //Clear old data
        csvDiv.innerHTML = BACK_BUTTON + `
            <center>
                <div class='window'>
                    <img style='max-width: 90%;' src='${file_url}'></img>
                </div>
            </center>`;

        document.getElementById("back_preview").addEventListener("click", function()
        {
            me.toggleMainMenu(true);
        });
    };

    this.printPDF = function(file_url)
    {
        var csvDiv = document.querySelector("div#preview_data");

        //Clear old data
        csvDiv.innerHTML = BACK_BUTTON + `
            <center>
                <div class='window'>
                    <embed src="${file_url}" width=90% height=1000px></embed>
                </div>
            </center>`;

        document.getElementById("back_preview").addEventListener("click", function()
        {
            me.toggleMainMenu(true);
        });
    };

    this.printDoc = function(file_url)
    {
        var csvDiv = document.querySelector("div#preview_data");

        //Clear old data
        csvDiv.innerHTML = BACK_BUTTON + `
        <center>
            <div class='window'>
            ${file_url}
            </div>
        </center>`;

        document.getElementById("back_preview").addEventListener("click", function()
        {
            me.toggleMainMenu(true);
        });
    };

    this.popTable = function(index)
    {
        data.splice(index, 1);
        me.printTable();
        me.updatePrefs();
    };

    this.pushTable = function(elmnt)
    {
        for (i = 0; i < data.length; i++)
        {
            if (data[i].id == elmnt.id)
            {
                return;
            }
        }
        
        tag_pat.push(data.length);
        data.push(elmnt);
        me.printTable();
        me.updatePrefs();

        me.updateID(elmnt);
    };

    this.getTableElementIndex = function(file_id)
    {
        for (i = 0; i < data.length; i++)
        {
            if (file_id.indexOf(data[i].id) !== -1)
            {
                return i;
            }
        }
        
        return -1;
    }

    this.updatePrefs = function(clear = null)
    {
        if (clear != null)
        {
            widget.setValue("_data", undefined);
            data = [];

            me.printTable();
        }
        else
            widget.setValue("_data", JSON.stringify(data));
    };

    this.updateID_3DDrive = function(row)
    {
        url = _3DDrive + `/resources/3ddrive/v1/bos/${row.id}`;
        me.httpCallAuthenticated(url,
        {
            onComplete: function(response, headers, xhr)
            {
                info = JSON.parse(response);
                
                row_id = me.getTableElementIndex(info.id);
                row = data[row_id];
                row.extension = info.extension;

                var last_mod = new Date(1970, 1, 0);
                last_mod.setSeconds(info.modified);

                row.date = last_mod.toLocaleTimeString() + " " + last_mod.toLocaleDateString();

                me.printTable();
                me.updatePrefs();
            }
        });
    }

    this.updateID_3DSpace = function(row)
    {
        url = _3DSpace + `/resources/v1/modeler/documents/${row.id}`;
        me.httpCallAuthenticated(url, 
        {
            onComplete: function(response, headers, xhr)
            {
                info = JSON.parse(response);
                
                me.printMsg(response);
                
                for (i = 0; i < info.data.length; i++)
                {
                    element = info.data[i];
                    row_id = me.getTableElementIndex(element.id);
                    
                    if (row_id > -1)
                    {
                        row = data[row_id];
                        row.csrf = info.csrf.value;

                        file = element.relateddata.files[0];
                        row.file = file;

                        if (element.dataelements.image)
                            row.icon = element.dataelements.image;

                        if (file) {
                            row.extension = file.dataelements.title.split('.').pop();
                        }
                        else if (row.type == "Issue") {
                            row.extension = "issue";
                        }

                        if (info.success == true && element.dataelements !== undefined)
                            row.date = element.dataelements.modified;
                        else row.date = "Error";

                        me.printTable();
                        me.updatePrefs();
                    }
                }
            }
        });
    }

    this.updateID = function(row)
    {
        if (row.source == "3DDrive") {
            me.updateID_3DDrive(row);
        }
        else {
            me.updateID_3DSpace(row);
        }
    };

    this.updateAllData = function()
    {
        //Loads the prefs if available
        prefs = widget.getValue("_data");
        if (prefs != null) {
            data = JSON.parse(prefs);
        }

        me.printTable();
        
        for (i = 0; i < data.length; i++)
        {
            me.updateID(data[i]);
        }
    };

    this.previewFile = function(file_url, extension)
    {
        switch (extension.toLowerCase())
        {
            case "csv":
                me.httpCallAuthenticated(file_url, 
                    {
                        onComplete: function(response, headers, xhr)
                        {
                            me.printCSV(response);
                            me.toggleMainMenu(false);
                        }
                    });
                break;
            case "docx":
                me.printDoc(file_url);
                me.toggleMainMenu(false);
                break;
            case "png":
            case "jpg":
            case "tif":
            case "webp":
            case "gif":
                me.printImg(file_url);
                me.toggleMainMenu(false);
                break;
            case "pdf":
                me.printPDF(file_url);
                me.toggleMainMenu(false);
                break;
            default:
                me.toggleMainMenu(true);
                break;
        }
    }

    this.downloadFileData = function(row)
    {
        if (row.extension == "issue")
        {
            window.open(platformUrl + `/enovia/common/emxTree.jsp?objectId=${row.id}`);
            return;
        }

        preview_row = row;

        if (row.source == "3DDrive") {
            url = _3DDrive + `/resources/3ddrive/v1/bos/${row.id}/fileurl`;

            me.httpCallAuthenticated(url, 
            {
                onComplete: function(response, headers, xhr)
                {
                    let info = JSON.parse(response);

                    try {
                        me.previewFile(info.url, info.extension);
                    } catch(err) {
                        me.printMsg("Failed to fetch the ticket's URL.");
                        me.printMsg(err);
                        return;
                    }
                }
            });
        }
        else {
            url = _3DSpace + `/resources/v1/modeler/documents/${row.id}/files/DownloadTicket`;

            me.httpCallAuthenticated(url, 
            {
                method: "PUT",
                headers: {ENO_CSRF_TOKEN: row.csrf}, 
    
                onComplete: function(response, headers, xhr)
                {
                    let info = JSON.parse(response);
    
                    if (info.success == true)
                    {
                        try {
                            file_url = info.data[0].dataelements.ticketURL;
                            me.previewFile(file_url, row.extension);
                        } catch(err) {
                            me.printMsg("Failed to fetch the ticket's URL.");
                        }
                    }
                }
            });
        }
    };

    this.uploadFileData = function(row, file)
    {
        let url = _3DSpace + `/resources/v1/modeler/documents/${row.id}/files/CheckinTicket`;

        me.httpCallAuthenticated(url, 
            {
                method: "PUT",
                headers: {ENO_CSRF_TOKEN: row.csrf}, 

                onComplete: function(response, headers, xhr)
                {
                    let info = JSON.parse(response).data[0].dataelements;

                    let formData = new FormData();
                    let filename = preview_row.name + "." + preview_row.extension;
                    let csv_file = new Blob([ArrayToCSV(preview_csv_data, ',')]);
                    
                    formData.append('__fcs__jobTicket', info.ticket);
                    formData.append('file-description', filename);
                    formData.append('file-name', filename);
                    formData.append('file-title', filename);
                    formData.append('file_0', new File([csv_file], { type: 'text/plain' }, filename));
        
                    var opts = {};
                    opts.method = 'POST';
                    opts.data = formData;

                    opts.onComplete = function(response) {
                        me.printMsg("Sent file info.");
                    };

                    opts.onFailure = function(response) {
                        me.printMsg("Failed to upload... " + response);
                    };

                    opts.timeout = 0;
        
                    me.httpCallAuthenticated(info.ticketURL, opts);
                }
            }
        );
    }

    // Widget Start point
    this.onLoad = function()
    {
        // set icon and title
        widget.setIcon(WIDGET_ROOT + "assets/favicon.ico");
        widget.setTitle("LiveTables");

        // fill 'content' div
        var content = document.querySelector("div#content");
        content.innerHTML = `
            <center>
                <div id='main_body'>
                    <h3>LiveTables</h3>
                    <div id='drop' class='zone'></div>
                    <div id='data'></div>
                </div>
            </center>
            <div id='preview_body'>
                <div id='preview_data'></div>
            </div>`;

        me.toggleMainMenu(true);

        // Setup your preferences...
        widget.addPreference({
            name: "_data",
            type: "hidden",
            label: "Table Data",
            defaultValue: JSON.stringify(data)
        });

        widget.addPreference({
            name: "plat_url",
            type: "text",
            label: "Platform URL",
            defaultValue: "https://dsext004-euw1-3dxdev22-space.3dexperience.3ds.com"
        });

        //THIS IS WHERE THE TENTANT STUFF COMES TO PLAY -----------------
        me.getPlatformServices(undefined, function(data) 
        {
            console.log(data);

            _3DSpace = data[1]["3DSpace"];
            _3DDrive =  data[1]["3DDrive"];

            console.log(_3DDrive);
            console.log(_3DSpace);

            //Load all the information for the first time
            me.updateAllData();
        });

        me.setDroppable(document.getElementById("drop"), function(strData, element, event) 
        {
            me.printMsg(strData);

            let jsonObject = JSON.parse(strData);

            switch (jsonObject.protocol)
            {
                case "3DXContent":
                    items = jsonObject.data.items;
                    for (i = 0; i < items.length; i++)
                    {
                        item = items[i];
                        
                        preview = item.displayPreview;

                        if (preview == "")
                            preview = item.displayIcon;

                        me.pushTable({ icon: preview, name: item.displayName, type: item.objectType, date: "NaN", source: item.serviceId,
                                        id: item.objectId, drag: strData});
                    }
                    break;
                default:
                    break;
            }

        });


        //Loads the prefs if available
        prefs = widget.getValue("_data");
        if (prefs != null) {
            data = JSON.parse(prefs);
        }

        platformUrl = widget.getValue("plat_url");

        // configure tagger
        var tags = {};
        for (i = 0; i < data.length; i++)
        {
            tag_pat.push(i);
            row = data[i];
            tags[i] = 
            [
                { object: row.date, sixw: "ds6w:when/Last Modification", dispValue: row.date },
                { object: row.source, sixw: "ds6w:where/Source", dispValue: row.source },
                { object: row.type, sixw: "ds6w:what/Type", dispValue: row.type },
                { object: row.name, sixw: "ds6w:who/Name", dispValue: row.name }
            ];
        }

        me.setupTagger(tags);
    };

    // Widget Reload button or Preference changed
    this.onRefresh = function()
    {
        me.updateAllData();
    };

    // Dashboard Search event
    this.onSearch = function(searchQuery) {
        search_pat = searchQuery.toLowerCase();
        me.printTable();
    };

    // Dashboard Search reset event
    this.onResetSearch = function() {
        search_pat = "";
        me.printTable();
    };

    // Dashboard Tagger selection change event
    this.onTaggerFilter = function(eventFilter) {
        tag_pat = eventFilter.filteredSubjectList;
        me.printTable();
    };


    ///////////////////////////////////
    // widget API proxy

    // drag & drop
    this.setDraggable = function(elem, strData, onDrag) {
        require(["DS/DataDragAndDrop/DataDragAndDrop"], function(DataDragAndDrop) {
            DataDragAndDrop.draggable(elem, { data: strData, start: onDrag });
        });
    };

     // create setup Tagger for this widget
    this.setupTagger = function(tags) {
        require(["DS/TagNavigatorProxy/TagNavigatorProxy"], function(TagNavigatorProxy) {
            if (me.taggerProxy === undefined) {
                me.taggerProxy = TagNavigatorProxy.createProxy({
                    widgetId: widget.id,
                    filteringMode: "WithFilteringServices"
                });
                me.taggerProxy.addEvent("onFilterSubjectsChange", me.onTaggerFilter);
            }
            me.taggerProxy.setSubjectsTags(tags);
        });
    };

    this.setDroppable = function(elem, onDrop) {
        require(["DS/DataDragAndDrop/DataDragAndDrop"], function(DataDragAndDrop) {
            DataDragAndDrop.droppable(elem, { drop: onDrop });
        });
    };

    // HTTP calls
    this.httpCallAuthenticated = function(url, options) {
        require(["DS/WAFData/WAFData"], function(WAFData) {
            WAFData.authenticatedRequest(url, options);
        });
    };

    this.getPlatformServices = function(platformId, onSuccess, onFailure) 
    {
        require(["DS/i3DXCompassServices/i3DXCompassServices"], function(i3DXCompassServices)
        {
            if (!platformId || platformId === "") platformId = widget.getValue("PlatFormInstanceId");
            if (!platformId || platformId === "") platformId = undefined;

            i3DXCompassServices.getPlatformServices({
                platformId: platformId,
                onComplete: onSuccess,
                onFailure: onFailure
            });
        });
    };
};

function waitFor(globalVarname, timeout, callback)
{
    if (typeof window[globalVarname] !== "undefined") 
    {
        callback();
    }
    else if (timeout === 0)
    {
        document.body.innerHTML = "Error while trying to load widget. See console for details";
        throw globalVarname + " didn't load";
    }
    else
    {
        console.warn("Waiting for " + globalVarname);
        var dt = 100;
        setTimeout(waitFor, dt, globalVarname, timeout - dt, callback);
    }
}

waitFor("widget", 1000, function()
{
    var myWidget = new MyWidget();
    myWidget.start();
});
