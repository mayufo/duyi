var ppt = {
    $wrapper: $('.wrapper'),
    $slider: $('.slider'),
    len: $('.slider').length,
    nowIndex: 0,
    lastIndex: undefined,
    flag: true,
    sliderTimer: undefined,
    init: function () {
        if (this.len > 1) {
            this.createDom(this.len);
            this.bindEvent();
            this.sliderAuto();
        }
    },
    createDom: function (len) {
        var strLi = '',
            strBtn = '<div class="btn">\
                        <span class="btnLeft"></span>\
                        <span class="btnRight"></span>\
                      </div>';

        for (var i = 0; i < len; i++) {
            strLi += i == 0 ? '<li class="active"></li>' : '<li></li>';
        }

        strLi = '<div class="slider-order"><ul>' + strLi + '</ul></div>';

        // var str = $('.wrapper').html() + strBtn + strLi;
        // this.$wrapper.html(str);

        this.$wrapper.append(strLi).append(strBtn);
    },
    bindEvent: function () {
        var that = this;
        $('.btnLeft').add($('.btnRight')).add($('.slider-order li')).on('click', function () {
            if ($(this).attr('class') == 'btnLeft') {
                that.totalFun('left');
                // that.getIndex('left');
            } else if ($(this).attr('class') == 'btnRight') {
                // that.getIndex('right');
                that.totalFun('right');
            } else {
                // that.getIndex($(this).index());
                that.totalFun($(this).index());
            }

            // that.$slider.eq(that.lastIndex).trigger('go');
            // that.$slider.eq(that.nowIndex).trigger('come');
            // that.changeOrder(that.nowIndex);
        });

        this.$slider.on('go', function () {
            $(this).fadeOut(300).find('p').animate({
                fontSize: '16px'
            }).end().find('.image').animate({
                width: "0px"
            })
        });
        this.$slider.on('come', function () {
            $(this).delay(300).fadeIn(300).find('p').delay(300).animate({
                fontSize: '20px'
            }).end().find('.image').delay(300).animate({
                width: "40%"
            }, function () {
                that.flag = true;
                that.sliderAuto();                
            })
        });
    },
    getIndex: function (direction) {
        this.lastIndex = this.nowIndex;
        if (direction == 'left' || direction == 'right') {
            if (direction == 'left') {
                this.nowIndex = this.nowIndex == 0 ? this.len - 1 : this.nowIndex - 1;
            } else {
                this.nowIndex = this.nowIndex == this.len - 1 ? 0 : this.nowIndex + 1;
            }
        } else {
            this.nowIndex = direction;
        }
    },
    changeOrder: function (index) {
        $('.slider-order .active').removeClass('active');
        // $('.slider-order li').eq(index).attr('class', 'active');
        $('.slider-order li').eq(index).addClass('active');
    },
    totalFun: function (direction) {
        if (this.flag) {
            this.getIndex(direction);
            if (this.nowIndex != this.lastIndex) {
                this.flag = false;
                this.$slider.eq(this.lastIndex).trigger('go');
                this.$slider.eq(this.nowIndex).trigger('come');
                this.changeOrder(this.nowIndex);
            }
        }
    },
    sliderAuto: function () {
        var that = this;
        clearInterval(this.sliderTimer);
        this.sliderTimer = setTimeout(function () {
            that.totalFun('right');
        }, 1000);
    }
}

ppt.init();