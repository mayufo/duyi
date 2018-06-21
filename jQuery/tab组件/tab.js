var Tabs = (function ($) {
    function Tabs(selector) {
        this.elements = $(selector);
        this.init();
        this.bindEvents();
    }

    Tabs.prototype.init = function () {
        this.elements.each(function (index, elem) {
            $(elem).children('.tab-bar').children('li').eq(0).addClass('active');
            $(elem).children('.tab-content').children('li').eq(0).addClass('active');
        });
    }

    Tabs.prototype.bindEvents = function () {
        this.elements.on('click', '.tab-bar>li', function (e) {
            // var $li = $(e.currentTarget);
            $(this).addClass('active').siblings().removeClass('active');
            var index = $(this).index();
            $(this).closest('.tabs').find('.tab-content>li').eq(index).addClass('active').siblings().removeClass('active');
        });
    }

    return Tabs;
})(jQuery);

// var tabs = new Tabs('.tabs');
var tabs = new Tabs('.tab1');