require.config({
    baseUrl: './js/tool',
    paths: {
        'jquery': 'jquery-3.3.1.min',
        'math': 'math'
    }
})

require(['jquery', 'math'], function ($, math) {
    console.log(math.sum(1, 2));
});