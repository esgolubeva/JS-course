function scanDOM(elem, statistics) {
    if (elem === undefined) {
        var html = document.getElementsByTagName('html')[0];
        elem = html;
    }

    if (statistics === undefined) {
        statistics = {
            classesList: {},
            tagsList: {},
            textNodes: 0
        };
    }

    var tag = elem.tagName;
    var classes = elem.classList;

    if (tag) {
        if (statistics.tagsList[tag]) {
            statistics.tagsList[tag] += 1;
        } else {
            statistics.tagsList[tag] = 1;
        }
    }

    if (classes) {
        for (var i = 0; i < classes.length; i++) {
            if (statistics.classesList[classes[i]]) {
                statistics.classesList[classes[i]] += 1;
            } else {
                statistics.classesList[classes[i]] = 1;
            }
        }
    }

    if (elem.childNodes.length > 0) {
        for (var i = 0; i < elem.childNodes.length; i++) {
            if (elem.childNodes[i].nodeType === 3) {
                statistics.textNodes += 1;
            } else {
                scanDOM(elem.childNodes[i], statistics);
            }
        }
    }

    if (elem === html) {
        for (var t in statistics.tagsList) {
            console.log('Тэгов ' + String(t).toLowerCase() + ': ' + statistics.tagsList[t]);
        }
        for (var c in statistics.classesList) {
            console.log('Элементов с классом ' + String(c).toLowerCase() + ': ' + statistics.classesList[c]);
        }
        console.log('Текстовых узлов: ' + statistics.textNodes);
    }
}
