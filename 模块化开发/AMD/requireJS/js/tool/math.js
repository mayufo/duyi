require.config({
    paths: {
        'myLib': '../myLib/myLib'
    }
})

define(['myLib'], function (myLib) {
    function sum(a, b) {
        console.log(myLib.aa());
        return a + b;
    }

    return {
        sum: sum
    }
})