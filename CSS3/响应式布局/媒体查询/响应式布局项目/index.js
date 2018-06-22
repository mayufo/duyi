var ppt = {
    $wrapper: $('.ppt'),
    $silder: $('.silder'),
    len: $('.silder').length,
    nowIndex: 0,
    lastIndex: undefined,
    lock: true,
    timer: null,
    init: function () {
        if (this.len > 1) {
            this.createDom(this.len);
            this.bindEvent();
            this.silderAuto();
        }
    },
    createDom: function (len) {
        var strLi = '';

        for (var i = 0; i < len; i++) {
            if (i == 0) {
                strLi += '<li class="active"></li>';
            } else {
                strLi += '<li></li>';
            }
        }

        strLi = '<div  class="silder-order"><ul>' +
            strLi +
            '</ul></div>';
        strBtn = '<div class="silder-btn">\
                        <span class="btnLeft"></span>\
                        <span class="btnRight"></span>\
                      </div>';

        this.$wrapper.append(strLi).append(strBtn);

    },
    bindEvent: function () {
        var _this = this;
        $('.silder-btn .btnLeft').add($('.silder-btn .btnRight')).
        add($('.silder-order li')).on('click', function () {
            if ($(this).attr('class') == 'btnLeft') {
                _this.totalFun('left');
            } else if ($(this).attr('class') == 'btnRight') {
                _this.totalFun('right');
            } else {
                var index = $(this).index();
                _this.totalFun(index);
            }
        });

        this.$silder.on('go', function () {
            $(this).fadeOut(300).find('p').animate({
                fontSize: '16px'
            });
        });

        this.$silder.on('come', function () {
            $(this).delay(300).fadeIn(300).find('p').delay(300).animate({
                fontSize: '20px'
            }, function () {
                _this.lock = true;
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
    // move: function () {
    //     var _this = this;
    //     this.$silder.eq(this.lastIndex).fadeOut(300);
    //     this.$silder.eq(this.nowIndex).delay(300).fadeIn(300, function () {
    //         _this.lock = true;
    //     });
    // },
    totalFun: function (direction) {
        if (this.lock) {
            this.getIndex(direction);
            if (this.nowIndex != this.lastIndex) {
                this.lock = false;
                this.$silder.eq(this.lastIndex).trigger('go');
                this.$silder.eq(this.nowIndex).trigger('come');
                // clearTimeout(this.timer);
                this.changeOrder(this.nowIndex);
                // this.silderAuto();
            }

        }
    },
    changeOrder: function (index) {
        $('.silder-order li').eq(index).addClass('active').siblings().removeClass('active');
    },
    silderAuto: function () {
        var _this = this;
        clearInterval(_this.timer);
        _this.timer = setTimeout(function () {
            _this.totalFun('right');
        }, 3000);
    }
}

ppt.init();