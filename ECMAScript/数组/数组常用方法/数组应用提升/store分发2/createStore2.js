function createStore(initState) {

    var state = initState || {};
    var list = [];

    function getStore() {
        return state;
    }

    function dispatch(action) {
        state[action.type] = action.value;
        list.forEach(function (elem, index) {
            elem();
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