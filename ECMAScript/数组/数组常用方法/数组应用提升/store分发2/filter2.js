Document.prototype.getByClassName = function (name) {
    var oAllArr = Array.prototype.slice.call(document.getElementsByTagName('*'), 0),
        filterArr = [];

    function dealClass(className) {
        var reg = /\s+/g;

        return className.replace(reg, ' ').trim();
    }

    oAllArr.forEach(function (item, index) {
        var itemClassArr = dealClass(item.className).split(' '),
            len = itemClassArr.length;

        for (var i = 0; i < len; i++) {
            if (itemClassArr[i] == name) {
                filterArr.push(item);
                break;
            }
        }
    });

    return filterArr;
}

function addEvent(elem, type, handler) {
    if (elem.addEventListener) {
        elem.addEventListener(type, handler, false);
    } else if (elem.attachEvent) {
        elem['temp' + type + handler] = handler;
        elem[type + handler] = function () {
            elem['temp' + type + handler].call(elem);
        }

        elem.attachEvent('on' + type, elem[type + handler]);
    } else {
        elem['on' + type] = handler;
    }
}

function removeEvent(elem, type, handler) {
    if (elem.removeEventListener) {
        elem.removeEventListener(type, handler, false);
    } else if (elem.detachEvent) {
        elem.detachEvent('on' + type, elem[type + handler]);
    } else {
        elem['on' + type] = false;
    }
}

var initPserson = (function () {

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

    return function () {

        var oUl = document.getByClassName('content-ul')[0];
        var oSpan = Array.prototype.slice.call(document.getByClassName('search')[0].getElementsByTagName('span'), 0);
        var oSearch = document.getByClassName('search-box')[0];
        var oSearchDiv = document.getByClassName('search')[0];

        var store = createStore({
            name: '',
            sex: 'all'
        });

        var lastFilterFunc = addFilter({
            name: nameFilter,
            sex: sexFilter
        }, personData);

        store.subScribe(function () {
            render(lastFilterFunc());
        });

        function render(arr) {
            var str = '';
            arr.forEach(function (elem, index) {
                str += "<li>\
                <img src=../img/" + elem.src + ">\
                <p>" + elem.name + "</p>\
                <p>" + elem.des + "</p>\
                </li>";
            });


            oUl.innerHTML = str;
        }

        addEvent(oSearch, 'input', function () {
            store.dispatch({
                type: 'name',
                value: this.value
            });
        });

        addEvent(oSearchDiv, 'click', function (e) {
            var event = e || window.event;
            var target = event.target || event.srcElement;

            if (target.nodeName == 'SPAN') {
                store.dispatch({
                    type: 'sex',
                    value: target.getAttribute('sex')
                })
                document.getByClassName('active')[0].className = '';
                target.className = 'active';
            }
        })

        render(personData);

        // var state = {
        //     name: '',
        //     sex: 'all'
        // }

        function nameFilter(text, arr) {
            return arr.filter(function (elem, index) {
                return elem.name.indexOf(text) != -1;
            });
        }

        function sexFilter(text, arr) {
            if (text == 'all') {
                return arr;
            } else {
                return arr.filter(function (elem, index) {
                    return elem.sex == text;
                });
            }
        }

        function addFilter(obj, arr) {

            return function () {
                var newArr = arr;
                for (var prop in obj) {
                    newArr = obj[prop](store.getStore()[prop], newArr);
                }

                return newArr;
            }
        }
    }

})();



initPserson();