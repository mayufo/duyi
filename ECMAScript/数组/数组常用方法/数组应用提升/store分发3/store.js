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

var oUl = document.getByClassName('user')[0];
var search = document.getByClassName('search')[0];
var searchIpt = document.getByClassName('search-box')[0];

var store = createStore({
    name: '',
    sex: 'all'
});

store.subScribe(function () {
    render(lastFilterFuc());
});

var lastFilterFuc = addFilter({
    name: nameFilter,
    sex: sexFilter
}, personData);

render(lastFilterFuc());

addEvent(search, 'click', function (e) {
    var event = e || window.event;
    var target = event.target || event.srcElement;

    if (target.nodeName == 'LI') {
        store.dispatch({
            type: 'sex',
            value: target.getAttribute('sex')
        });

        document.getByClassName('active')[0].className = '';
        target.className = 'active';
    }
});

addEvent(searchIpt, 'input', function () {
    store.dispatch({
        type: 'name',
        value: this.value
    });
});

function render(arr) {
    var str = '';

    arr.forEach(function (item, index) {
        str += "<li>\
            <img src='../img/" + item.src + "'>\
             <span>" + item.name + "</span>\
              <span>" + item.des + "</span>\
               </li> ";
    });

    oUl.innerHTML = str;
}

function nameFilter(text, arr) {
    return arr.filter(function (item, index) {
        return item.name.indexOf(text) != -1;
    });
}

function sexFilter(text, arr) {
    if (text == 'all') {
        return arr;
    } else {
        return arr.filter(function (item, index) {
            return text == item.sex;
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