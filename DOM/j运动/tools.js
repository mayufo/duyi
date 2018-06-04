Document.prototype.getByClassName = function (name) {
    var arr = Array.prototype.slice.call(document.getElementsByTagName('*'), 0);
    var filterArr = [];

    function dealClass(name) {
        var reg = /\s+/g;

        return name.replace(reg, ' ').trim();
    }

    arr.forEach(function (elem, index) {
        var cnArr = dealClass(elem.className).split(' '),
            len = cnArr.length;
        for (var i = 0; i < len; i++) {
            if (cnArr[i] == name) {
                filterArr.push(elem);
                break;
            }
        }
    });

    return filterArr;
}