document.addEventListener('DOMContentLoaded', function() {
    var promise = new Promise(function(resolve, reject) {
        var xhr = new XMLHttpRequest();

        xhr.open('GET', 'https://raw.githubusercontent.com/smelukov/citiesTest/master/cities.json', true);

        xhr.send();

        xhr.onreadystatechange = function() {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    var cities = JSON.parse(xhr.responseText);
                    resolve(cities);
                } else {
                    reject(new Error(xhr.responseText));
                }
            }
        }
    });

    promise
        .then(function(cities) {
            return cities.map(function(city) {
                return city.name;
            }).sort();
        })
        .then(function(cities) {
            cities.forEach(function(city) {
                var li = document.createElement('li');
                li.textContent = city;
                citiesList.appendChild(li);
            });
        });
});
