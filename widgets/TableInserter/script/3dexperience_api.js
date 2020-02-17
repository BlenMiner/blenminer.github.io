function _httpCallAuthenticated(url, options)
{
    require(["DS/WAFData/WAFData"], function(WAFData)
    {
        WAFData.authenticatedRequest(url, options);
    });
};

function _setDraggable(elem, strData, onDrag) 
{
    require(["DS/DataDragAndDrop/DataDragAndDrop"], function(DataDragAndDrop) 
    {
        DataDragAndDrop.draggable(elem, { data: strData, start: onDrag });
    });
};

function _setupTagger(tags, onTaggerFilter = undefined)
 {
    require(["DS/TagNavigatorProxy/TagNavigatorProxy"], function(TagNavigatorProxy) {
        if (taggerProxy === undefined) {
            taggerProxy = TagNavigatorProxy.createProxy({
                widgetId: widget.id,
                filteringMode: "WithFilteringServices"
            });

            if (onTaggerFilter != undefined)
                taggerProxy.addEvent("onFilterSubjectsChange", onTaggerFilter);
        }
        taggerProxy.setSubjectsTags(tags);
    });
};

function _setDroppable(elem, onDrop)
 {
    require(["DS/DataDragAndDrop/DataDragAndDrop"], function(DataDragAndDrop) {
        DataDragAndDrop.droppable(elem, { drop: onDrop });
    });
};

function _getPlatformServices(platformId, onSuccess, onFailure) 
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