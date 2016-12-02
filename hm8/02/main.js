'use strict';
var ACCESS_FRIENDS = 2;

var promise = new Promise(function(resolve, reject) {
    VK.init({
        apiId: 5757199
    });

    VK.Auth.login(function(response) {
        if (response.session) {
            resolve(response);
            console.log('Пользователь успешно авторизовался');
        } else {
            reject(new Error('Не удалось авторизоваться'));
        }
    }, ACCESS_FRIENDS);
})

function getMilliseconds(bdate, now) {
    if (bdate === undefined) {
        return Number.MAX_VALUE;
    }
    var tokens = bdate.split('.', 2);
    var currentMonth = now.getMonth();
    var currentYear = now.getFullYear();
    var currentDay = now.getDate();
    var year = currentYear;

    if (tokens[1] - 1 < currentMonth || (tokens[1] - 1 == currentMonth && tokens[0] < currentDay)) {
        year = currentYear + 1;
    }

    var d = new Date(year, Number(tokens[1]) - 1, Number(tokens[0]));

    return d.getTime();
}

function getAge(bdate, now) {
    if (bdate === undefined) {
        return null;
    }

    var currentMonth = now.getMonth();
    var currentDay = now.getDate();
    var tokens = bdate.split('.');
    var bday = new Date(Number(tokens[2]), Number(tokens[1]) - 1, Number(tokens[0]));

    if (tokens.length < 3) {
        return null;
    }

    var age = Math.floor((Date.now() - bday.getTime()) / (1000 * 60 * 60 * 24 * 365.25));

    return age;
}

promise
    .then(function() {
        return new Promise(function(resolve, reject) {
            VK.api('users.get', { 'name_case': 'gen' }, function(response) {
                if (response.error) {
                    reject(new Error(response.error.error_msg));
                } else {
                    var userData = response.response[0];

                    document.getElementById('headerInfo').textContent = `Друзья ${userData.first_name} ${userData.last_name}`;
                    resolve();
                }
            });
        });
    }).then(function() {
        return new Promise(function(resolve, reject) {
            VK.api('friends.get', { v: '5.8', 'fields': 'bdate, photo_50' }, function(response) {
                if (response.error) {
                    reject(new Error(response.error.error_msg));
                } else {
                    var friendsList = response.response.items;
                    var now = new Date();
                    var msNow = now.getTime();

                    friendsList.sort(function(first, second) {
                        return (msNow - getMilliseconds(second.bdate, now)) - (msNow - getMilliseconds(first.bdate, now));
                    }).forEach(function(friend) {
                        friend.age = getAge(friend.bdate, now)
                    })
                }
                var source = document.getElementById('friends-template').innerHTML;
                var templateFn = Handlebars.compile(source);
                var results = document.getElementById('results');

                results.innerHTML = templateFn({ friends: friendsList });
                resolve();
            })
        })
    }).catch(function(e) {
        alert(`Ошибка: ${e.message}`);
    });
