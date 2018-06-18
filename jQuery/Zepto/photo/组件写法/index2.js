var phone = {
    $wrapper: $('.wrapper'),
    // total:14,
    data: [{
            src: '0.png',
        },
        {
            src: '1.png',
        },
        {
            src: '2.png',
        }, {
            src: '3.png',
        }, {
            src: '4.png',
        }, {
            src: '5.png',
        }, {
            src: '6.png',
        }, {
            src: '7.png',
        }, {
            src: '8.png',
        }, {
            src: '9.png',
        }, {
            src: '10.png',
        }, {
            src: '11.png',
        }, {
            src: '12.png',
        }, {
            src: '13.png',
        }, {
            src: '14.png',
        }
    ],
    len: 0,
    liWidth: $(window).width() / 4,
    ratio: $(window).height() / $(window).width(),
    activeIndex: 0,
    init: function () {
        this.createDom(this.data);
        this.bindEvent();
    },
    createDom: function (data) {
        var that = this;
        that.len = this.data.length;
        var str = '';
        data.forEach(function (item, index) {
            str += '<li style="height:' + that.liWidth + "px" + '" ><img src="../src/images/' + item.src + '">';
        });

        $(str).appendTo(this.$wrapper).animate({
            opacity: 1
        }, 500);
    },
    bindEvent: function () {
        var that = this;
        $('.wrapper').on('tap', 'li', function () {
            that.activeIndex = $(this).index();
            that.show(that.activeIndex);
        });

        $('.show').on('tap', function () {
            $(this).hide();
        }).on('swipeLeft', function () {
            if (that.activeIndex < that.len - 1) {
                that.activeIndex++;
                that.show(that.activeIndex);
            }
        }).on('swipeRight', function () {
            if (that.activeIndex > 0) {
                that.activeIndex--;
                that.show(that.activeIndex);
            }
        });
    },
    show: function (index) {
        var that = this;
        $('.show').html('').show();
        var oImg = new Image();
        oImg.src = '../src/images/' + this.data[index].src;
        oImg.onload = function () {
            var w = this.width,
                h = this.height;


            if (h / w > that.ratio) {
                $(this).appendTo($('.show')).css('height', '100%').animate({
                    opacity: 1
                }, 500);
            } else {
                $(this).appendTo($('.show')).css('width', '100%').animate({
                    opacity: 1
                }, 500);
            }
        }
    }
}

phone.init();