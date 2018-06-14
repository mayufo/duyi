// var photo = {
//     $wrapper: $('.wrapper'),
//     total: 15,
//     init: function () {
//         this.createDom();
//     },
//     createDom: function () {
//         var str = '';

//         for (var i = 0; i < this.total; i++) {
//             str += '<li><img src="src/images/' + i + '.png"></li>';
//         }

//         this.$wrapper.append(str);
//     }
// }

// photo.init();

var total = 15,
    // liWidth = ($('.wrapper').width() - 24) / 4;
    liWidth = $('.wrapper').width() / 4,
    activeIndex,
    ratio = $(window).height() / $(window).width();

function render() {
    var str = '';

    for (var i = 0; i < total; i++) {
        str += '<li style="height:' + liWidth + "px" + '"><img src="src/images/' + i + '.png"></li>';
    }

    $(str).appendTo($('.wrapper')).animate({
        opacity: 1
    }, 500);
}

render();

$('.wrapper').on('tap', 'li', function (e) {
    activeIndex = $(this).index();
    show(activeIndex);
});

function show(index) {
    $('.show').html('').show();
    var oImg = new Image();
    oImg.src = "src/images/" + index + ".png";

    oImg.onload = function () {
        var w = this.width,
            h = this.height;

        if (h / w > ratio) {
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

$('.show').on('tap', function () {
        $(this).hide();
    })
    .on('swipeLeft', function () {
        if (activeIndex < total - 1) {
            activeIndex++;
            show(activeIndex);
        }
        // activeIndex = activeIndex >= total - 1 ? total - 1 : activeIndex + 1;
    })
    .on('swipeRight', function () {
        if (activeIndex > 0) {
            activeIndex--;
            show(activeIndex);
        }
        // activeIndex = activeIndex <= 0 ? 0 : activeIndex - 1;
        // show(activeIndex);
    })