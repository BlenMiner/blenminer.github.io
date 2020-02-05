function _httpCallAuthenticated(url, options) {
    require(["DS/WAFData/WAFData"], function(WAFData) {
        WAFData.authenticatedRequest(url, options);
    });
};

function _3dspace_get_csrf(host, docid, onDone = undefined, onError = undefined)
{
    let url = host + `/resources/v1/modeler/documents/${docid}`;

    _httpCallAuthenticated(url, 
        {
            onComplete: function(response, headers, xhr) {
                info = JSON.parse(response);
                if (onDone) onDone(info.csrf.value);
            },

            onFailure: function(response) {
                if (onError) onError(response);
            }
        }
    );
}

function _3dspace_file_url(host, docid, onDone = undefined, onError = undefined) 
{
    let url = host + `/resources/v1/modeler/documents/${docid}/files/DownloadTicket`;
    _3dspace_get_csrf(host, docid, function(csrf)
    {
        _httpCallAuthenticated(url, 
            {
                method: "PUT",
                headers: {ENO_CSRF_TOKEN: csrf}, 
    
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