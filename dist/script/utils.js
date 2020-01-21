function waitFor(globalVarname, timeout, callback)
{
    if (typeof window[globalVarname] !== "undefined")
    {
        callback();
    }
    else if (timeout === 0)
    {
        document.body.innerHTML = "Error while trying to load widget.";
        throw globalVarname + " didn't load";
    }
    else
    {
        console.warn("Waiting for " + globalVarname);
        var dt = 100;
        setTimeout(waitFor, dt, globalVarname, timeout - dt, callback);
    }
}