import { createApp } from 'vue'
import App from './App.vue'

function waitFor(globalVarname, timeout, callback, failback)
{
    if (typeof window[globalVarname] !== "undefined") 
    {
        callback();
    }
    else if (timeout === 0)
    {
        failback();
    }
    else
    {
        console.warn("Waiting for " + globalVarname);
        var dt = 100;
        setTimeout(waitFor, dt, globalVarname, timeout - dt, callback, failback);
    }
}

waitFor("widget", 1000, () => {
    console.log("APPP");
    // eslint-disable-next-line no-undef
    console.log(widget);
    createApp(App).mount('#app')
},
() => {
    console.log("create app");
    createApp(App).mount('#app')
});

