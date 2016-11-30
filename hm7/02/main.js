document.addEventListener('DOMContentLoaded', function() {

    function renderList() {

        tbody.innerHTML = '';

        var cookieArray = document.cookie.split('; ');

        cookieArray.forEach(function(item) {
            var cookieItem = item.split('=');
            var row = document.createElement('tr');
            var delButton = document.createElement('button');

            delButton.setAttribute('class', 'del-button');
            delButton.setAttribute('data-cookie-name', cookieItem[0]);
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
        });
    }

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

    function _onAddButtonClick(e) {
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
    };

    renderList();

    tbody.addEventListener('click', _onRemoveButtonClick);
    addButton.addEventListener('click', _onAddButtonClick);

});
