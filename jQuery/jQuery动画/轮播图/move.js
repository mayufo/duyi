function startMove(obj, data, callback) {
    clearInterval(obj.timer);
    var iSpeed, iCur;

    obj.timer = setInterval(function () {
        var bStop = true;
        for (var attr in data) {
            if (attr == 'opacity') {
                name = 'opacity';
                iCur = parseFloat(getStyle(obj, 'opacity')) * 100;
            } else {
                iCur = parseInt(getStyle(obj, attr));
            }

            iSpeed = (data[attr] - iCur) / 7;
            iSpeed = iSpeed > 0 ? Math.ceil(iSpeed) : Math.floor(iSpeed);

            obj.style[attr] = attr == 'opacity' ? (iCur + iSpeed) / 100 : iCur + iSpeed + "px";

            if (iCur != data[attr]) {
                bStop = false;
            }
            // if (Math.floor(Math.abs(data[attr] - iCur)) != 0) {
            //     bStop = false;
            // }
            // console.log(data[attr] + "|" + iCur);
        }

        if (bStop) {
            clearInterval(obj.timer);
            // if (name === 'opacity') {
            //     obj.style.opacity = data[name] / 100;
            // }
            typeof callback == 'function' ? callback() : '';
        }
    }, 30);
}

function getStyle(elem, prop) {
    if (window.getComputedStyle) {
        return window.getComputedStyle(elem, null)[prop];
    } else {
        return elem.currentStyle[prop];
    }
}

function addEvent(elem, type, handler) {
    if (elem.addEventListener) {
        elem.addEventListener(type, handler, false);
    } else if (elem.attachEvent) {
        elem['temp' + type + handler] = handler;
        elem[type + handler] = function () {
            elem['temp' + type + handler].call(elem);
        }
        elem.attachEvent('on' + type, elem[type + handler]);
    } else {
        elem['on' + type] = handler;
    }
}

function removeEvent(elem, type, handler) {
    if (elem.removeEventListener) {
        elem.removeEventListener(type, handler, false);
    } else if (elem.detachEvent) {
        elem.detachEvent('on' + type, handler);
    } else {
        elem['on' + type] = null;
    }
}

function stopBubble(event) {
    if (event.stopPropagation) {
        event.stopPropagation();
    } else {
        event.cancelBubble = true;
    }
}

function cancelHandler(event) {
    if (event.preventDefault) {
        event.preventDefault();
    } else {
        event.returnValue = false;
    }
}


function getViewPortOffset() {
    if (window.innerWidth) {
        return {
            width: window.innerWidth,
            height: window.innerHeight
        }
    } else if (document.compatMode == "CSS1Compat") {
        return {
            width: document.documentElement.clientWidth,
            height: document.documentElement.clientHeight
        }
    } else {
        return {
            width: document.body.clientWidth,
            height: document.body.clientHeight
        }
    }
}

Document.prototype.getByClassName = function (name) {
    var arr = Array.prototype.slice.call(document.getElementsByTagName('*'), 0);
    var filterArr = [];

    function dealClass(className) {
        var reg = /\s+/g;

        return className.replace(reg, ' ').trim();
    }

    arr.forEach(function (elem, index) {
        var classArr = dealClass(elem.className).split(' '),
            len = classArr.length;
        for (var i = 0; i < len; i++) {
            if (classArr[i] == name) {
                filterArr.push(elem);
                break;
            }
        }
    })

    return filterArr;
}