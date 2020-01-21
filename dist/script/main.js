/*
 *
 * @author P13
 */

var data = [
    { id: "user1", firstName: "John", lastName: "Murphy" },
    { id: "user2", firstName: "John", lastName: "Sampson" },
    { id: "user3", firstName: "Sarah", lastName: "Connor" }
];

var MyWidget = function() {
    var me = this;

    // baseUrl :string
    // taggerProxy : TagNavigatorProxy

    /** Widget constructor function (before widget is loaded) */
    this.start = function() {
        var url = widget.getUrl();
        console.log(url);
        this.baseUrl = url.substring(0, url.lastIndexOf("/"));
        console.log(me.baseUrl);

        widget.addEvent("onLoad", me.onLoad);
        widget.addEvent("onRefresh", me.onRefresh);
        widget.addEvent("onSearch", me.onSearch);
        widget.addEvent("onResetSearch", me.onResetSearch);
    };

    // only for template demonstration
    this.printMsg = function(message, color) {
        var consoleDiv = document.querySelector("div#console");
        if (consoleDiv) {
            let html = "<p";
            if (color) html += " style='color: " + color + "'";
            html += ">" + message + "</p>";
            consoleDiv.innerHTML += html;
            consoleDiv.scrollTop = consoleDiv.scrollHeight;
        }
        console.log("MyWidget: " + message);
    };
    this.printTable = function(filter = null) {
        html = "<table>";
        html += "<tr><th>firstname</th><th>lastname</th></th>";
        for (row of data) {
            html += "<tr id='" + row.id + "'";
            if (filter && !filter.includes(row.id)) {
                html += " class='rejected'";
            }
            html += ">";
            html += "<td>" + row.firstName + "</td><td>" + row.lastName + "</td>";
            html += "</tr>";
        }
        html += "</table>";

        var tableDiv = document.querySelector("div#data");
        tableDiv.innerHTML = html;
    };

    // Widget Start point
    this.onLoad = function() {
        // set icon and title
        widget.setIcon(me.baseUrl + "/assets/icons/default-widget-icon.png");
        widget.setTitle("My first Widget");

        // fill 'content' div
        var content = document.querySelector("div#content");
        content.innerHTML = `
            <h3>My First Widget</h3>
            <div id='sandbox'>
              <div id='data'></div>
              <div id='drag' class='zone'>Drag from<br><br>here</div>
              <div id='drop' class='zone'>Drop to<br><br>here</div>
              <div id='toolbar'>
                <a id='butSendA'>send topicA</a>
                <a id='butSendB'>send topicB</a>
                <a id='butReqProx'>proxyfied Request</a>
                <a id='butReqAuth'>authenticated Request</a>
              </div>
            </div>
            <div id='console'></div>`;

        // bind button
        document.getElementById("butSendA").addEventListener("click", function() {
            me.printMsg("sendMessage( topicA,...)");
            me.sendMessage("topicA", { msg: "hello A" });
        });
        document.getElementById("butSendB").addEventListener("click", function() {
            me.printMsg("sendMessage( topicB,...)");
            me.sendMessage("topicB", {});
        });

        me.getPlatformServices(undefined, function(data) {
            me.printMsg("getPlatformServices(" + JSON.stringify(data) + ")");
            document.getElementById("butReqProx").addEventListener("click", function() {
                me.printMsg("httpCallProxified(tuleap.net/api/users)");
                let url = "https://tuleap.net/api/users?query=phi&limit=2";
                me.httpCallProxified(url, {
                    onComplete: function(response, headers, xhr) {
                        me.printMsg("--> response: " + response, "#0055ff");
                    }
                });
            });

            document.getElementById("butReqAuth").addEventListener("click", function() {
                me.printMsg("httpCallAuthenticated( ...pno/person)");
                let url = data[0]["3DSpace"] + "/resources/modeler/pno/person?current=true";
                me.httpCallAuthenticated(url, {
                    onComplete: function(response, headers, xhr) {
                        me.printMsg("--> response: " + response, "#0055ff");
                    }
                });
            });
        });

        // TODO: add your own implementation...
        me.printMsg("onLoad()");
        me.printTable();

        // Setup your preferences...
        widget.addPreference({
            name: "username",
            type: "text",
            label: "User name",
            defaultValue: "Romain"
        });

        // listen to widget message
        me.listenMessage("topicA", function(data) {
            me.printMsg("eventReceived topicA, ...");
        });
        me.listenMessage("topicB", function(data) {
            me.printMsg("eventReceived topicB, ...");
        });

        // configure Drag & Drop
        me.setDraggable(document.getElementById("drag"), JSON.stringify({ name: "Axel", size: 163 }), function(element, event) {
            me.printMsg("onDrag( elem, event)");
            console.log(arguments);
        });
        me.setDroppable(document.getElementById("drop"), function(strData, element, event) {
            me.printMsg("onDrop( " + strData + ",elem, event)");
            console.log(arguments);
        });

        // configure tagger
        var tags = {};
        for (row of data) {
            tags[row.id] = [
                { object: row.firstName, sixw: "ds6w:who/firstName", dispValue: row.firstName },
                { object: row.lastName, sixw: "ds6w:who/lastName", dispValue: row.lastName }
            ];
        }
        me.setupTagger(tags);
    };

    // Widget Reload button or Preference changed
    this.onRefresh = function() {
        // TODO: add your own implementation...
        me.printMsg("onRefresh()");
    };

    // Dashboard Search event
    this.onSearch = function(searchQuery) {
        // TODO: add your own implementation...
        me.printMsg("onSearch(" + searchQuery + ")");
    };

    // Dashboard Search reset event
    this.onResetSearch = function() {
        // TODO: add your own implementation...
        me.printMsg("onResetSearch()");
    };

    // Dashboard Tagger selection change event
    this.onTaggerFilter = function(eventFilter) {
        // TODO: add your own implementation...
        me.printMsg("onTaggerFilter( { filteredSubjectList:" + JSON.stringify(eventFilter.filteredSubjectList) + ", ... }) (see console for detailed data)");
        console.log(eventFilter);
        me.printTable(eventFilter.filteredSubjectList);
    };

    ///////////////////////////////////
    // widget API proxy

    // send message to other widgets
    this.sendMessage = function(topic, data) {
        require(["DS/PlatformAPI/PlatformAPI"], function(PlatformAPI) {
            PlatformAPI.publish(topic, data);
        });
    };

    // listen message for widgets
    this.listenMessage = function(topic, callback) {
        require(["DS/PlatformAPI/PlatformAPI"], function(PlatformAPI) {
            PlatformAPI.subscribe(topic, callback);
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

    // drag & drop
    this.setDraggable = function(elem, strData, onDrag) {
        require(["DS/DataDragAndDrop/DataDragAndDrop"], function(DataDragAndDrop) {
            DataDragAndDrop.draggable(elem, { data: strData, start: onDrag });
        });
    };

    this.setDroppable = function(elem, onDrop) {
        require(["DS/DataDragAndDrop/DataDragAndDrop"], function(DataDragAndDrop) {
            DataDragAndDrop.droppable(elem, { drop: onDrop });
        });
    };

    // HTTP calls
    this.httpCallProxified = function(url, options) {
        require(["DS/WAFData/WAFData"], function(WAFData) {
            WAFData.proxifiedRequest(url, options);
        });
    };

    this.httpCallAuthenticated = function(url, options) {
        require(["DS/WAFData/WAFData"], function(WAFData) {
            WAFData.authenticatedRequest(url, options);
        });
    };

    this.getPlatformServices = function(platformId, onSuccess, onFailure) {
        require(["DS/i3DXCompassServices/i3DXCompassServices"], function(i3DXCompassServices) {
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

function waitFor(globalVarname, timeout, callback) {
    if (typeof window[globalVarname] !== "undefined") {
        callback();
    } else if (timeout === 0) {
        document.body.innerHTML = "Error while trying to load widget. See console for details";
        throw globalVarname + " didn't load";
    } else {
        console.warn("Waiting for " + globalVarname);
        var dt = 100;
        setTimeout(waitFor, dt, globalVarname, timeout - dt, callback);
    }
}

waitFor("widget", 1000, function() {
    var myWidget = new MyWidget();
    myWidget.start();
});
