var personData = [{
        name: '刘小华',
        src: '1.jpg',
        sex: 'male',
        des: '漂亮的女孩子'
    },
    {
        name: '王花',
        src: '2.jpg',
        sex: 'male',
        des: '漂亮的程序猿'
    },
    {
        name: '陈军',
        src: '3.jpg',
        sex: 'female',
        des: '我是一个学霸'
    },
    {
        name: '王华',
        src: '4.jpg',
        sex: 'female',
        des: '我喜欢游泳'
    },
    {
        name: '陈思思',
        src: '5.jpg',
        sex: 'male',
        des: '我喜欢看电影'
    },
    {
        name: '陈学习',
        src: '6.jpg',
        sex: 'female',
        des: '我爸我妈爱学习'
    },
    {
        name: '王美丽',
        src: '7.jpg',
        sex: 'male',
        des: '我妈是美丽得妈妈'
    }

];

var filter = (function () {

    function Filter(personData) {
        this.personData = personData;
        this.init();
    }

    Filter.prototype.init = function () {
        this.render();
    }

    Filter.prototype.render = function () {
        var str = '';

        this.personData.forEach(function (elem, index) {
            str += '<li><img src = "img/' + elem.src + '">\
                    <p>' + elem.name + '</p>\
                    ' + '<p>' + elem.des + '</p>';
        });

        var oUl = document.getElementsByClassName('content-ul')[0];
        oUl.innerHTML = str;
    }

    function filterNmae() {
        
    }

    return Filter;
})();

new filter(personData);