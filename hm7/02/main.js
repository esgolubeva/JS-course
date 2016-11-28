document.addEventListener('DOMContentLoaded', function() {

    function renderList() {

        tbody.innerHTML = '';

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

            var cookieName = cookieItem[0];

            delButton.addEventListener('click', function() {
                var date = new Date(0);
                if (confirm("Удалить cookie с именем " + cookieName + "?")) {
                    document.cookie = item + "; " + "path=/; expires=" + date.toUTCString();
                    tbody.removeChild(row);
                }
            });
        });
    }

    renderList();

    addButton.addEventListener('click', function(e) {
        e.preventDefault();

        if (nameC.value && valueC.value && timeC.value) {
            var date = new Date();
            date.setDate(date.getDate() + Number(timeC.value));
            document.cookie = nameC.value + "=" + valueC.value + "; path=/; expires=" + date.toUTCString();
            renderList();
        } else {
            alert('Заполните все поля формы');
        }

        form.reset();
    });

});
