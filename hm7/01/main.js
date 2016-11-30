document.addEventListener('DOMContentLoaded', function() {
    document.cookie = "someName0=123; path=/; expires=Tue, 19 Jan 2038 03:14:07 GMT";
    document.cookie = "someName1=234; path=/; expires=Tue, 19 Jan 2038 03:14:07 GMT";
    document.cookie = "someName2=345; path=/; expires=Tue, 19 Jan 2038 03:14:07 GMT";
    document.cookie = "someName3=456; path=/; expires=Tue, 19 Jan 2038 03:14:07 GMT";

    var cookieArray = document.cookie.split('; ');

    cookieArray.forEach(function(item) {
        var cookieItem = item.split('=');
        var row = document.createElement('tr');
        var delButton = document.createElement('button');

        delButton.setAttribute('class', 'del-button');
        delButton.setAttribute('data-cookie-name', cookieItem[0]);
        delButton.innerHTML = 'удалить';
        tbody.appendChild(row);

        cookieItem.forEach(function(i) {
            var cell = document.createElement('td');
            cell.innerHTML = i;
            row.appendChild(cell);
        });

        var cell = document.createElement('td');
        row.appendChild(cell);
        cell.appendChild(delButton);
    });

    function _onRemoveButtonClick(e) {
        if (e.target.classList.contains('del-button')) {
            var button = e.target;
            var cookieName = button.getAttribute('data-cookie-name');
            var cookieRow = button.parentNode.parentNode;
            var date = new Date(0);
            if (confirm("Удалить cookie с именем " + cookieName + "?")) {
                document.cookie = cookieName + "=; " + "path=/; expires=" + date.toUTCString();
                cookieRow.parentNode.removeChild(cookieRow);
            }
        }
    };

    tbody.addEventListener('click', _onRemoveButtonClick);

});
