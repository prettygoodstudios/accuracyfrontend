
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
            setTimeout(() => window.scrollTo({left: 0,top: getOffset(element).top - 100, behavior: 'smooth'}), 200);
        }
    }
}