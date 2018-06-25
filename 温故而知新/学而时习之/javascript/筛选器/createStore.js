function createStroe(initState) {
    var state = initState || {},
        list = [];

    function getState() {
        return deepClone(state);
    }

    function depath(action) {
        state[action.type] = action.value;

        list.forEach(function (item, index) {
            item();
        })
    }

    function register(func) {
        list.push(func);
    }

    return {
        getState: getState,
        depath: depath,
        register: register
    }
}

function deepClone(origin, target) {
    var toString = Object.prototype.toString,
        strOjb = '[object Object]',
        strArray = '[object Array]';

    target = target || (toString.call(origin) == strArray ? [] : {});

    if (origin) {
        for (var prop in origin) {
            if (origin.hasOwnProperty(prop)) {
                if (origin[prop] !== null && typeof origin[prop] == 'object') {
                    target[prop] = toString.call(origin[prop]) == strArray ? [] : {};
                    deepClone(origin[prop], target[prop]);
                } else {
                    target[prop] = origin[prop];
                }
            }
        }
    }

    return target;
}