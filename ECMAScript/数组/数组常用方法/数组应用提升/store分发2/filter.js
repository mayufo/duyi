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

        // var state = {
        //     text: '',
        //     sex: 'all'
        // }

        var store = createStore({
            text: '',
            sex: 'all'
        });

        store.subScribe(function () {
            renderList(lastFilterFunc());
        });

        function renderList(data) {
            var str = '';

            data.forEach(function (item, index) {
                str += "<li>\
                    <img src=../img/" + item.src + ">\
                    <p>" + item.name + "</p>\
                    <p>" + item.des + "</p>\
                    </li>";
            });

            oUl.innerHTML = str;
        }

        renderList(personData);

        // for (var i = 0; i < oSpan.length; i++) {
        //     addEvent(oSpan[i], 'click', function () {
        //         var name = this.innerHTML.toLocaleLowerCase();
        //         var arr = personData.filter(function (item, index) {
        //             if (item.sex == name) {
        //                 return true;
        //             } else if (name == 'all') {
        //                 return true;
        //             }
        //         });

        //         renderList(arr);
        //     });
        // }

        //搜索筛选
        addEvent(oSearchDiv, 'click', function (e) {
            var event = e || window.event;
            var target = event.target || event.srcElement;

            if (target.nodeName == 'SPAN') {
                state.text = oSearch.value;
                state.sex = target.getAttribute('sex');
                renderList(lastFilterFunc(personData));
                // oSpan.forEach(function (item, index) {
                //     item.className = '';
                // });
                document.getByClassName('active')[0].className = '';

                target.className = 'active';
            }
        });


        //男女筛选
        addEvent(oSearch, 'input', function () {
            state.text = this.value;
            // var lastArr = filterText(state.text, personData);
            renderList(lastFilterFunc(personData));

            // var arr = filterText(text, personData);
        });


        //根据name筛选数组
        function filterText(text, arr) {
            return arr.filter(function (item, index) {
                // if (item.name.indexOf(text) != -1) {
                //     return true;
                // }
                return item.name.indexOf(text) != -1;
            });

            // return newArr;
        }

        //根据sex筛选数组
        function filterSex(sex, arr) {
            if (sex == 'all') {
                return arr;
            } else {
                return arr.filter(function (item, index) {
                    return item.sex == sex;
                })
            }
        }

        //合并筛选条件
        function unionFilterFunc(obj, arr) {

            return function () {
                var lastArr = arr;
                for (var prop in obj) {
                    lastArr = obj[prop](store.getStore()[prop], lastArr);
                }

                return lastArr;
            }
        }

        var lastFilterFunc = unionFilterFunc({
            text: filterText,
            sex: filterSex
        }, personData);
    }
})();

initPserson();