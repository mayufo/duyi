function createStroe(initState) {
    var state = initState || {};
    var list = [];

    function getStore() {
        return state;
    }

    function dispatch(action) {
        state[action.type] = action.value;
        list.forEach(function (item, index) {
            item();
        });
    }

    function subScribe(handler) {
        list.push(handler);
    }

    return {
        getStore: getStore,
        dispatch: dispatch,
        subScribe: subScribe
    }
}