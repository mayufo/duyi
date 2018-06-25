function addEvent(elem, type, handler) {
    if (elem.addEventListener) {
        elem.addEventListener(type, handler);
    } else if (elem.attachEvent) {
        elem['temp' + type + handler] = handler;
        elem[type + handler] = function () {
            elem['temp' + type + handler].call(elem);
        }
        elem.attachEvent('on' + type, elem[type + hanlder]);
    } else {
        elem['on' + type] = handler;
    }
}

function removeEvent(elem, type, handler) {
    if (elem.removeEventListener) {
        elem.removeEventListener(type, handler);
    } else if (elem.detachEvent) {
        elem.detachEvent('on' + type, elem[type + hanlder]);
    } else {
        elem['on' + type] = false;
    }
}

Document.prototype.getClassByName = function (className) {
    var arr = Array.prototype.slice.call(document.getElementsByTagName('*'), 0),
        len = arr.length,
        filterArr = [];

    arr.forEach(function (elem, index) {
        var classArray = dealClass(elem.className).split(' ');
        for (var i = 0; i < classArray.length; i++) {
            if (classArray[i] == className) {
                filterArr.push(elem);
                break;
            }
        }
    })

    function dealClass(name) {
        var reg = /\s+/g;
        return name.replace(reg, ' ').trim();
    }

    return filterArr;
}

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

var initPerson = (function () {

    return function (data) {
        var oUl = document.getClassByName('content-ul')[0],
            oInput = document.getClassByName('search-box')[0],
            // oSpan = document.getClassByName('search')[0].getElementsByTagName('span');
            oSearch = document.getClassByName('search')[0];

        var store = createStroe({
            name: '',
            sex: 'all'
        });

        store.register(function () {
            renderList(lastFilterFunc());
        });


        function renderList(data) {
            var str = '';

            data.forEach(function (elem, index) {
                str += '<li><img src = "img/' + elem.src + '">\
                <p>' + elem.name + '</p>\
                ' + '<p>' + elem.des + '</p>';
            });

            oUl.innerHTML = str;
        }

        renderList(data);


        // var lastFilter = {
        //     name: filterName,
        //     sex: filterSex
        // }

        function filterName(arr, text) {
            return arr.filter(function (item, index) {
                return item.name.indexOf(text) != -1;
            });
        }

        function filterSex(arr, text) {
            if (text == 'all') {
                return arr;
            } else {
                return arr.filter(function (item, index) {
                    return item.sex == text;
                });
            }
        }

        function totalFilter(obj, arr) {

            return function () {
                var lastArr = arr;
                for (var prop in obj) {
                    lastArr = obj[prop](lastArr, store.getState()[prop]);
                }

                return lastArr;
            }
        }

        var lastFilterFunc = totalFilter({
            name: filterName,
            sex: filterSex
        }, personData);


        addEvent(oInput, 'input', function () {
            store.depath({
                type: 'name',
                value: this.value
            });
            // state.name = this.value;

            // renderList(lastFilterFunc());
        });

        addEvent(oSearch, 'click', function (e) {
            var event = e || window.event;
            var target = event.target || event.srcElement;

            if (target.nodeName == 'SPAN') {
                // state.sex = target.getAttribute('sex');
                // renderList(lastFilterFunc());

                store.depath({
                    type: 'sex',
                    value: target.getAttribute('sex')
                });

                document.getClassByName('active')[0].className = '';
                target.className = 'active';
            }
        });
    }


})();

initPerson(personData);