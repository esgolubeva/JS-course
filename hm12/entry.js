var Model = require('./model.js');
var View = require('./view.js');
var Router = require('./router.js');
var Handlebars = require('handlebars');
require('bootstrap-css-only');


Handlebars.registerHelper('formatTime', function(time) {
    var minutes = parseInt(time / 60),
        seconds = time - minutes * 60;

    minutes = minutes.toString().length === 1 ? '0' + minutes : minutes;
    seconds = seconds.toString().length === 1 ? '0' + seconds : seconds;

    return minutes + ':' + seconds;
});

Handlebars.registerHelper('formatDate', function(ts) {
    return new Date(ts * 1000).toLocaleString();
});

new Promise(function(resolve) {
    window.onload = resolve;
}).then(function() {
    return Model.login(5267932, 2 | 8 | 8192);
}).then(function() {
    return Model.getUser().then(function(users) {
        header.innerHTML = View.render('header', users[0]);
    });
}).then(function() {

    document.addEventListener('click', function(e) {
        var route = e.target.dataset.route;
        if (route) {
            Router.handle(route);
        }
    })

}).catch(function(e) {
    console.error(e);
    alert('Ошибка: ' + e.message);
});

