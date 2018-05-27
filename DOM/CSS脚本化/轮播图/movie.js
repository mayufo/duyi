function getStyle(ele, prop) {
    if (window.getComputedStyle) {
        return window.getComputedStyle(ele, null)[prop];
    } else {
        return ele.getCurrentStyle[prop];
    }
}

var initMovie = (function () {
    var movies = document.getElementsByClassName('movie-wrap')[0];
    var speed = 1,
        timer = 0,
        count = 1,
        ctimer = 0;

    return function () {

        wait();

        function move() {
            timer = setInterval(function () {
                if (parseInt(getStyle(movies, 'left')) <= -1600) {
                    movies.style.left = "0px";
                    count = 1;
                    clearInterval(timer);
                    wait();
                }
                if (parseInt(getStyle(movies, 'left')) <= -400 * count) {
                    clearInterval(timer);
                    wait();
                    movies.style.left = -400 * count + "px";
                    count++;
                } else {
                    movies.style.left = parseInt(getStyle(movies, 'left')) - speed + "px";
                    console.log(parseInt(getStyle(movies, 'left')));
                }

            }, 1);
        }

        function wait() {
            ctimer = setInterval(function () {
                move();
                clearInterval(ctimer);
            }, 2000);
        }
    }
}());

initMovie();