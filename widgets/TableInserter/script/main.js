/*
 * @author VBU4
 */

var _3DSpace = undefined;
var _TargetFile = undefined;

var _Tenants = [];
var _TenantOpts = [];
var _TenantId = 0;

var MyWidget = function() 
{
    var me = this;

    this.updatePreview = function()
    {
        _3dspace_file_url(_Tenants[_TenantId]["3DSpace"], _TargetFile.objectId,
            function(RESULT_URl)
            {
                _httpCallAuthenticated(RESULT_URl, {
                    onComplete: function(RESULT_CONTENT)
                    { 
                        let table = CSVToArray(RESULT_CONTENT, ',');

                        let drop = document.getElementById("drop");
                        if (drop) drop.parentElement.removeChild(element);

                        let data = document.getElementById("data");
                        DrawCSVTable(table, data);
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
            <center>
                <div id='main_body'>
                    <h3>Table Inserter [VBU4]</h3>
                    <div id='drop' class='zone'></div>
                    <div id='data'></div>
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

            //_3DSpace = data[1]["3DSpace"];
            
            widget.addPreference({
                name: "_TenantsData_",
                type: "list",
                label: "Tenant",
                defaultValue: `${_TenantId}`,
                options: _TenantOpts
            });
        });
 
        // Setup your preferences...
        widget.addPreference({
            name: "_TargetFile_",
            type: "hidden",
            label: "File",
            defaultValue: 'undefined'
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

        //Loads the prefs if available
        {
            let prefs = widget.getValue("_TargetFile_");

            if (prefs != undefined)
            {
                _TargetFile = JSON.parse(prefs);
                me.updatePreview();
            }

            prefs = widget.getValue("_TenantsData_");
            if (prefs != undefined) _TenantId = prefs;
        }
    };

    // Widget Reload button or Preference changed
    this.onRefresh = function() {
        if (_TargetFile) {
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
