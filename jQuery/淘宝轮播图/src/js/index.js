var $silderPage = $('.silderPage'),
    num = $('.silderPage li').length - 1,
    moveWidth = $('.silderPage').children().eq(0).width(),
    activeIndex = 0,
    flag = true,
    timer = null;

function init() {
    bindEvent();
    autoMove();
}

function bindEvent() {
    $('.prevBtn').add($('.nextBtn')).add('.silderIndex li').on('click', function () {
        if ($(this).attr('class') == 'prevBtn') {
            move('prev');
        } else if ($(this).attr('class') == 'nextBtn') {
            move('next');
        } else {
            var index = $(this).index();
            move(index);
        }
    });
    $('.wrapper').on('mouseenter', function () {
        clearTimeout(timer);
        $('.wrapper .btn').css({
            display: 'block'
        });
    }).on('mouseleave', function () {
        $('.wrapper .btn').css({
            display: 'none'
        });
        autoMove();
    });

    $('.btn a').on('mouseenter', function () {
        autoMove();
    });
}

function move(direction) {
    if (flag) {
        flag = false;
        var a = 1;
        if (direction == 'prev' || direction == 'next') {
            if (direction == 'prev') {
                if (activeIndex == 0) {
                    $silderPage.css({
                        left: -num * moveWidth
                    });
                    activeIndex = num - 1;
                } else {
                    activeIndex--;
                }

                // $silderPage.animate({
                //     left: -activeIndex * moveWidth
                // }, function () {
                //     flag = true;
                //     autoMove();
                // });
            } else {
                if (activeIndex == num - 1) {
                    a = 0;
                    $silderPage.animate({
                        left: -num * moveWidth
                    }, function () {
                        $(this).css({
                            left: 0
                        });
                        flag = true;
                        autoMove();
                    });
                    activeIndex = 0;
                } else {
                    activeIndex++;
                    // $silderPage.animate({
                    //     left: -activeIndex * moveWidth
                    // }, function () {
                    //     flag = true;
                    //     autoMove();
                    // });
                }
            }
        } else {
            activeIndex = direction;
            // $silderPage.animate({
            //     left: -activeIndex * moveWidth
            // }, function () {
            //     flag = true;
            //     autoMove();
            // })
        }

        if (a) {
            $silderPage.animate({
                left: -activeIndex * moveWidth
            }, function () {
                flag = true;
                autoMove();
            });
        }

        changeIndexStyle(activeIndex);

        // $silderPage.animate({
        //     left: -activeIndex * moveWidth
        // }, function () {
        //     flag = true;
        //     // if (activeIndex == num) {
        //     //     $silderPage.css({
        //     //         left: 0
        //     //     });
        //     //     activeIndex = 0;
        //     // }
        //     autoMove();
        // })
    }
}

function changeIndexStyle(index) {
    $('.silderIndex .active').removeClass('active');
    $('.silderIndex li').eq(index).addClass('active');
}

function autoMove() {
    clearTimeout(timer);

    timer = setTimeout(function () {
        move('next');
    }, 1500);
}

init();