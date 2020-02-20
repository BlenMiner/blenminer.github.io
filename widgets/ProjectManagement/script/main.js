/*
 * @author VBU4
 */

var _Tenants = [];
var _TenantOpts = [];
var _TenantId = 0;

var WPM = function() 
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

    // Widget Start point
    this.onLoad = function()
    {
        // set icon and title
        widget.setIcon(WIDGET_ROOT + "assets/favicon.ico");
        widget.setTitle("Table Inserter v1.04");

        // fill 'content' div
        var content = document.querySelector("div#content");
        content.innerHTML = `
            <center>
                <div id='main_body'>
                    <h3>Widget Project Management [VBU4]</h3>
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

            // Setup your preferences...
            widget.addPreference({
                name: "_TenantsData_",
                type: "list",
                label: "Tenant",
                defaultValue: `${_TenantId}`,
                options: _TenantOpts
            });

            //Loads the prefs if available
            _TenantId = widget.getValue("_TenantsData_");
        });
    };

    // Widget Reload button or Preference changed
    this.onRefresh = function() {
        if (_TargetFile) 
        {
            _TenantId = widget.getValue("_TenantsData_");
            me.queueUpdatePreview(me.updatePreview);
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
    var myWidget = new WPM();
    myWidget.start();
});
