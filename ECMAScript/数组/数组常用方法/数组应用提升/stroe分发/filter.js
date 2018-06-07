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

var list = document.getElementById('list');
var oSearch = document.getByClassName('search')[0];
var oLi = document.getElementById('sex').getElementsByTagName('li');
var oSearchInp = document.getElementById('inp');

var store = createStroe({
    name: '',
    sex: 'all'
});

store.subScribe(function () {
    renderList(lastFilterFunc());
});

function renderList(arr) {
    var str = '';

    arr.forEach(function (elem, index) {
        str += '<li>\
                <img src=../img/' + elem.src + '>\
                <span class="name"> ' + elem.name + ' </span>\
                <span class="des"> ' + elem.des + '</span>\
                </li>';
    });

    list.innerHTML = str;
}

renderList(personData);

// var state = {
//     name: '',
//     sex: 'all'
// }

addEvent(oSearch, 'click', function (e) {
    var event = e || window.event;
    var target = event.target || event.srcElement;

    if (target.nodeName == 'LI') {
        // state.sex = target.getAttribute('sex');
        store.dispatch({
            type: 'sex',
            value: target.getAttribute('sex')
        })
        // renderList(lastFilterFunc(personData));
        // for (var i = 0; i < oLi.length; i++) {
        //     oLi[i].className = '';
        // }
        document.getByClassName('active')[0].className = '';
        target.className = 'active';
    }
});

addEvent(oSearchInp, 'input', function () {
    // state.name = this.value;
    store.dispatch({
        type: 'name',
        value: this.value
    });

    // renderList(lastFilterFunc(personData));
})

//根据name筛选数组
function filterName(text, arr) {
    return arr.filter(function (elem, index) {
        return elem.name.indexOf(text) != -1;
    });
}

//根据sex筛选数组
function filterSex(text, arr) {
    if (text == 'all') {
        return arr;
    } else {
        return arr.filter(function (elem, index) {
            return elem.sex == text;
        })
    }
}

//合并筛选条件
// 公共函数筛选
// var state = {
//     text: '',
//     sex: 'all'
// }
function unionFilterFunc(obj, arr) {

    return function () {
        for (var prop in obj) {
            arr = obj[prop](store.getStore()[prop], arr);
        }

        return arr;
    }
}

var lastFilterFunc = unionFilterFunc({
    name: filterName,
    sex: filterSex
}, personData);

// state状态--》改变状态filter--》[arr]  renderDom--->view区域