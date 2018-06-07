function craeteStore(initState) {
    var state = initState || {};
    var list = [];

    function getState() {
        return state;
    }

    function dispatch(action) {
        state[action.text] = action.value;
        list.forEach(function (item, index) {
            item();
        });
    }

    function subScribe(handler) {
        list.push(handler);
    }
}