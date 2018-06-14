var ppt = {
    $wrapper: $('.wrapper'),
    $silder: $('.silder'),
    len: $('.silder').length,
    nowIndex: 0,
    lastIndex: undefined,
    lock: true,
    timer: undefined,
    init: function () {
        if (this.len > 1) {
            this.createDom(this.len);
            this.bindEvent();
            this.autoMove();
        }
    },
    createDom: function (length) {
        var str = '',
            strBtn;

        for (var i = 0; i < length; i++) {
            // if (index == 0) {
            //     str += '<li class="active"></li>';
            // } else {
            //     str += '<li></li>';
            // }
            str += i == 0 ? '<li class="active"></li>' : '<li></li>';
        }

        str = '<div class="silder-order"><ul>' + str + '</ul></div>';
        strBtn = ' <div class="btn">\
                     <div class="leftBtn"></div>\
                     <div class="rightBtn"></div>\
                   </div>';

        this.$wrapper.append(strBtn).append(str);
    },
    bindEvent: function () {
        var that = this;
        $('.leftBtn').add($('.rightBtn')).add($('.silder-order li')).on('click', function () {

            if ($(this).attr('class') == 'leftBtn') {
                // that.getIndex('left');
                that.func('left');
            } else if ($(this).attr('class') == 'rightBtn') {
                // that.getIndex('right');
                that.func('right');
            } else {
                // that.getIndex($(this).index());
                that.func($(this).index());
            }
        });

        this.$silder.on('go', function () {
            $(this).fadeOut(300).find('p').animate({
                fontSize: '16px'
            }).end().find('.image').animate({
                width: 0
            });
        });
        this.$silder.on('come', function () {
            $(this).delay(300).fadeIn(300).find('p').delay(300).animate({
                fontSize: '20px'
            }).end().find('.image').delay(300).animate({
                width: '40%'
            }, function () {
                that.lock = true;
                that.autoMove();
            });
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
    func: function (direction) {
        if (this.lock) {
            this.getIndex(direction);
            if (this.lastIndex != this.nowIndex) {
                this.lock = false;
                this.$silder.eq(this.lastIndex).trigger('go');
                this.$silder.eq(this.nowIndex).trigger('come');
                this.changeIndex(this.nowIndex);
            }
        }
    },
    changeIndex: function (index) {
        $('.silder-order .active').removeClass();
        $('.silder-order li').eq(index).addClass('active');
    },
    autoMove: function () {
        clearTimeout(this.timer);

        var that = this;
        this.timer = setTimeout(function () {
            that.func('right');
        }, 1500);
    }
}

ppt.init();