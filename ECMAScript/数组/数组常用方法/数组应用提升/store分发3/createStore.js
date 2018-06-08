function createStore(initState) {

    var state = initState || {};
    var list = [];

    function getStore() {
        return deepClone(state);
    }

    function dispatch(action) {
        state[action.type] = action.value;
        list.forEach(function (item, index) {
            item();
        });
    }

    function subScribe(func) {
        list.push(func);
    }

    return {
        getStore: getStore,
        dispatch: dispatch,
        subScribe: subScribe
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