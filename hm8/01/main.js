document.addEventListener("DOMContentLoaded", function() {
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

    var source = document.getElementById('cities-template').innerHTML;
    var template = Handlebars.compile(source);
    var container = document.getElementById('container');

    promise
        .then(function(cities) {
            return cities.map(function(city) {
                return city.name;
            }).sort();
        })
        .then(function(cities) {

            function filterCitiesArray(cities, str) {
                return cities.filter(function(city) {
                    return city.toLowerCase().indexOf(str.toLowerCase()) > -1;
                });
            }

            function createCitiesList(cities) {
                return template({
                    cities: cities
                });
            }

            container.innerHTML = createCitiesList(cities);

            field.addEventListener('input', function(e) {
                var str = e.target.value;
                container.innerHTML = createCitiesList(filterCitiesArray(cities, str));
            });
        });
});
