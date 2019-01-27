import $ from "jquery";

function getOffset( el ) {
    var _x = 0;
    var _y = 0;
    while( el && !isNaN( el.offsetLeft ) && !isNaN( el.offsetTop ) ) {
        _x += el.offsetLeft - el.scrollLeft;
        _y += el.offsetTop - el.scrollTop;
        el = el.offsetParent;
    }
    return { top: _y, left: _x };
}

export const setScroll = () => {
    return function(dispatch){
        const id = window.location.href.split("=")[1];
        if(id && id != ""){
            const element = document.getElementById(id);
            console.log(element);
            const isSafari = /constructor/i.test(window.HTMLElement) || (function (p) { return p.toString() === "[object SafariRemoteNotification]"; })(!window['safari'] || (typeof safari !== 'undefined' && safari.pushNotification));
            const isIE = /*@cc_on!@*/false || !!document.documentMode;
            const isEdge = !isIE && !!window.StyleMedia;
            const deprecatedBrowser = isSafari || isIE || isEdge;
            if(!deprecatedBrowser){
                setTimeout(() => window.scrollTo({left: 0,top: getOffset(element).top - 100, behavior: 'smooth'}), 200);
            }else{
                setTimeout(() => $('html, body').animate({scrollTop: $(`#${id}`).offset().top - 100}, 400), 200);
            }
            
        }
    }
}