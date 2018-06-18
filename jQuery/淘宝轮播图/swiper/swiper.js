var swiper = {
    $silderPage: $('.silderPage'),
    moveWidth: $('.silderPage li').width(),
    num: $('.silderPage li').length - 1,
    nowIndex: 0,
    flag: true,
    silderTimer: null,
    init: function () {
        this.bindEvent();
        // this.autoMove();
    },
    bindEvent: function () {
        var that = this;
        $('.prevBtn').add($('.nextBtn')).add($('.silderIndex li')).on('click', function () {
            if ($(this).attr('class') == 'prevBtn') {
                that.move('prev');
            } else if ($(this).attr('class') == 'nextBtn') {
                that.move('next');
            } else {
                that.move($(this).index());
            }
        });

        $('.wrapper').on('mouseenter', function () {
            clearTimeout(that.silderTimer);
            $('.silderBtn').removeClass('hide').addClass('show');
        }).on('mouseleave', function () {
            that.autoMove();
            $('.silderBtn').removeClass('show').addClass('hide');
        });

        $('.silderBtn').add($('.silderIndex ul')).on('mouseenter', function () {
            that.autoMove();
        });
    },
    move: function (direction) {
        if (this.flag) {
            this.flag = false;
            var that = this;
            var a = 1;
            if (direction == 'prev' || direction == 'next') {
                if (direction == 'prev') {
                    if (this.nowIndex == 0) {
                        this.$silderPage.css({
                            left: -this.num * this.moveWidth
                        });
                        this.nowIndex = this.num - 1;
                    } else {
                        this.nowIndex--;
                    }
                } else {
                    if (this.nowIndex == this.num - 1) {
                        a = 0;
                        this.$silderPage.animate({
                            left: -this.num * this.moveWidth
                        }, 150, function () {
                            $(this).css({
                                left: 0
                            });
                            that.flag = true;
                            that.nowIndex = 0;
                            that.autoMove();
                        });
                    } else {
                        this.nowIndex++;
                    }
                }
            } else {
                this.nowIndex = direction;
            }

            this.changeIndexStyle(this.nowIndex);

            if (a) {
                this.$silderPage.animate({
                    left: -this.nowIndex * this.moveWidth
                }, 150, function () {
                    that.flag = true;
                    that.autoMove();
                });
            }
        }

    },
    changeIndexStyle: function (index) {
        $('.silderIndex .active').removeClass('active');
        $('.silderIndex li').eq(index).addClass('active');
    },
    autoMove: function () {
        var that = this;
        clearTimeout(that.silderTimer);
        this.silderTimer = setTimeout(function () {
            that.move('next');
        }, 1500);
    }
}

swiper.init();

