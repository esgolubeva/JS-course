document.addEventListener('DOMContentLoaded', function() {
    document.cookie = "someName0=123; path=/; expires=Sun, 25 Aug 2019 21:13:01 GMT";
    document.cookie = "someName1=234; path=/; expires=Sun, 25 Aug 2019 21:13:01 GMT";
    document.cookie = "someName2=345; path=/; expires=Sun, 25 Aug 2019 21:13:01 GMT";
    document.cookie = "someName3=456; path=/; expires=Sun, 25 Aug 2019 21:13:01 GMT";

    var cookieArray = document.cookie.split('; ');

    cookieArray.forEach(function(item) {
        var cookieItem = item.split('=');
        var row = document.createElement('tr');
        var delButton = document.createElement('button');

        delButton.innerHTML = 'Удалить';
        tbody.appendChild(row);

        cookieItem.forEach(function(i) {
            var cell = document.createElement('td');
            cell.innerHTML = i;
            row.appendChild(cell);
        });

        var cell = document.createElement('td');
        row.appendChild(cell);
        cell.appendChild(delButton);

        delButton.addEventListener('click', function() {
            var cookieName = cookieItem[0];
            var date = new Date(0);
            if (confirm("Удалить cookie с именем " + cookieName + " ?")) {
                document.cookie = item + "; " + "path=/; expires=" + date.toUTCString();
                tbody.removeChild(row);
            }
        });
    });
});
