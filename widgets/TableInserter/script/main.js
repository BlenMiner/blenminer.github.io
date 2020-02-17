/*
 * @author VBU4
 */

var _3DSpace = undefined;
var _TargetFile = undefined;

var _Tenants = [];
var _TenantOpts = [];
var _TenantId = 0;

var _TableData = [];

var MyWidget = function() 
{
    var me = this;

    //Toggles the drop box element on & off
    this.toggleDropbox = function(enable)
    {
        let drop = document.getElementById("drop");
        drop.className = enable ? 'zone' : 'hidden';
    }

    this.uploadChanges = function()
    {
        var elem = document.getElementById("myBar");

        let filename = _TargetFile.displayName;
        let csv_file = new Blob([ArrayToCSV(_TableData, ',')], { type: 'text/plain' });

        var btn = document.getElementById("add_entry_button");
        btn.disabled = true;

        elem.style.width = "0%";

        _3dspace_file_update(_Tenants[_TenantId]["3DSpace"], _TargetFile.objectId, _TargetFile.objectId, csv_file, filename,
            function(result)
            {
                elem.style.width = "100%";
                DrawCSVTable(_TableData, data);
                me.printMsg('Uploaded file correctly!');
                if (btn) btn.disabled = true;
            },
            function(error)
            {
                me.printMsg('Something went wrong :( ' + error);
                if (btn) btn.disabled = true;
            }
        );
    }

    //Downloads & displays the table's content
    this.updatePreview = function()
    {
        var elem = document.getElementById("myBar");
        me.toggleDropbox(false);

        //Get the file URL & download it
        elem.style.width = "10%";
        _3dspace_file_url(_Tenants[_TenantId]["3DSpace"], _TargetFile.objectId,
            function(RESULT_URl)
            {
                elem.style.width = "50%";
                _httpCallAuthenticated(RESULT_URl, {
                    onComplete: function(RESULT_CONTENT)
                    {
                        //Convert the csv to an array & display its content
                        _TableData = CSVToArray(RESULT_CONTENT, ',');
                        let data = document.getElementById("data");
                        let form = document.getElementById("form_spot");

                        DrawCSVTable(_TableData, data);

                        //Add the form to be able to add a new element
                        let form_html = "<div id='form'>";

                        for (i = 0; i < _TableData[0].length; i++)
                            form_html += `<input type="text" id="${_TableData[0][i]}" placeholder="${_TableData[0][i]} ...">`;
                        
                        form_html += `<input type="submit" value="Add Entry" id="add_entry_button">`;
                        form_html += "</div>";

                        form.innerHTML = form_html;

                        //Add the ability to add new lines
                        document.getElementById("add_entry_button").addEventListener("click",
                        function()
                        {
                            let line = [];

                            for (i = 0; i < _TableData[0].length; i++)
                            {
                                let elmnt = document.getElementById(_TableData[0][i]);
                                
                                line.push(sanitize(elmnt.value));
                                elmnt.value = "";
                            }

                            _TableData.push(line);
                            //DrawCSVTable(_TableData, data);
                            me.uploadChanges();
                        });;

                        //Display some visual progress
                        elem.style.width = "100%";
                    }
                });
            }
        );
    }

    // Widget constructor function (before widget is loaded)
    this.start = function()
    {
        widget.addEvent("onLoad", me.onLoad);
        widget.addEvent("onRefresh", me.onRefresh);
        widget.addEvent("onSearch", me.onSearch);
        widget.addEvent("onResetSearch", me.onResetSearch);
    };

    // Widget Start point
    this.onLoad = function()
    {
        // set icon and title
        widget.setIcon(WIDGET_ROOT + "assets/favicon.ico");
        widget.setTitle("Table Inserter");

        // fill 'content' div
        var content = document.querySelector("div#content");
        content.innerHTML = `
            <div id="myProgress">
                <div id="myBar"></div>
            </div>
            <center>
                <div id='main_body'>
                    <h3>Table Inserter [VBU4]</h3>
                    <div id='drop' class='hidden'></div>
                    <div id='data'></div>
                    <div id='form_spot'></div>
                </div>
            </center>`;

        _getPlatformServices(undefined, function(data) 
        {
            _Tenants = data;
            
            for (i = 0; i < _Tenants.length; i++)
            {
                _TenantOpts.push({
                    value : `${i}`,
                    label : `${_Tenants[i].platformId} - ${_Tenants[i].displayName}`
                });
            }

            // Setup your preferences...
            widget.addPreference({
                name: "_TargetFile_",
                type: "hidden",
                label: "File",
                defaultValue: ''
            });

            widget.addPreference({
                name: "_TenantsData_",
                type: "list",
                label: "Tenant",
                defaultValue: `${_TenantId}`,
                options: _TenantOpts
            });

            //Loads the prefs if available
            {
                let targetfile = widget.getValue("_TargetFile_");
                _TenantId = widget.getValue("_TenantsData_");

                if (targetfile && targetfile != '') {
                    _TargetFile = JSON.parse(targetfile);
                    me.updatePreview();
                }
                else {
                    me.toggleDropbox(true);
                }
            }
        });

        _setDroppable(document.getElementById("drop"), function(strData, element, event) 
        {
            let jsonObject = JSON.parse(strData);

            switch (jsonObject.protocol)
            {
                case "3DXContent":
                    items = jsonObject.data.items;
                    for (i = 0; i < items.length; i++)
                    {
                        item = items[i];
                        _TargetFile = {objectId: item.objectId, displayName: item.displayName, fileId: null};

                        widget.setValue("_TargetFile_", JSON.stringify(_TargetFile));
                        me.updatePreview();

                        break;
                    }
                    break;
                default:
                    break;
            }

        });
    };

    // Widget Reload button or Preference changed
    this.onRefresh = function() {
        if (_TargetFile) 
        {
            _TenantId = widget.getValue("_TenantsData_");
            me.updatePreview();
        }
    };

    // Dashboard Search event
    this.onSearch = function(searchQuery) {
    };

    // Dashboard Search reset event
    this.onResetSearch = function() {
    };

    // Dashboard Tagger selection change event
    this.onTaggerFilter = function(eventFilter) {
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
