function startMove(obj, json, callback) {
    clearInterval(obj.timer);
    var iSpeed, iCur;

    obj.timer = setInterval(function () {
        var bStop = true;

        for (var attr in json) {
            if (attr == 'opacity') {
                iCur = parseFloat(getStyle(obj, 'opacity')) * 100;
            } else {
                iCur = parseInt(getStyle(obj, attr));
            }

            iSpeed = (json[attr] - iCur) / 7;
            iSpeed = iSpeed > 0 ? Math.ceil(iSpeed) : Math.floor(iSpeed);

            obj.style[attr] = attr == 'opacity' ? (iCur + iSpeed) / 100 : iCur + iSpeed + "px";

            if (iCur != json[attr]) {
                bStop = false;
            }
        }

        if (bStop) {
            clearInterval(obj.timer);
            typeof callback == 'function' ? callback() : '';
        }
    }, 30);
}


function getStyle(obj, attr) {
    if (window.getComputedStyle) {
        return window.getComputedStyle(obj, null)[attr];
    } else {
        return obj.currentStyle[attr];
    }
}