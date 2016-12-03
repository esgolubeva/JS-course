document.addEventListener('DOMContentLoaded', function() {
    var body = document.body;
    var createButton = document.getElementById('create');
    var saveButton = document.getElementById('save');
    var divs = [];
    var savedDivs = document.cookie.slice(document.cookie.indexOf("divs=") + 5, document.cookie.lastIndexOf("|"));

    if (savedDivs.length) {
        loadDivs();
    }

    function loadDivs() {
        var divsArray = savedDivs.split("|");
        
        divsArray.forEach(function(divsItem) {
            var div = document.createElement('div');
            var divProps = divsItem.split("+");

            div.setAttribute('class', 'rect');
            div.style.width = divProps[0];
            div.style.height = divProps[1];
            div.style.top = divProps[2];
            div.style.left = divProps[3];
            div.style.backgroundColor = divProps[4];
            div.style.position = 'absolute';
            div.style.cursor = 'move';

            body.appendChild(div);
            divs.push(div);
        })
    }

    function createDiv() {
        var div = document.createElement('div');
        var divWidth = parseInt(getComputedStyle(body).width) / 2;
        var divHeight = parseInt(getComputedStyle(body).height) / 2;

        div.setAttribute('class', 'rect');
        div.style.width = Math.random() * divWidth + 'px';
        div.style.height = Math.random() * divHeight + 'px';
        div.style.top = Math.random() * divHeight + 'px';
        div.style.left = Math.random() * divWidth + 'px';
        div.style.position = 'absolute';
        div.style.cursor = 'move';

        var color = {
            red: Math.floor(Math.random() * 255),
            green: Math.floor(Math.random() * 255),
            blue: Math.floor(Math.random() * 255)
        };

        div.style.backgroundColor = 'rgb(' + color.red + ',' + color.green + ',' + color.blue + ')';

        return div;
    }

    function _onCreateButtonClick(e) {
        e.preventDefault();
        var newDiv = createDiv();
        body.appendChild(newDiv);
        divs.push(newDiv);
    }

    function _onSaveButtonClick(e) {
        e.preventDefault();
        var cookieValue = divs.reduce(function(prev, current) {
            return prev + current.style.width + "+" + current.style.height + "+" +
                current.style.top + "+" + current.style.left + "+" + current.style.backgroundColor + "|";
        }, "");
        document.cookie = "divs=" + cookieValue + "; path=/; expires=Tue, 19 Jan 2038 03:14:07 GMT";
        console.log(document.cookie);
    }

    function _onMouseDown(e) {
        if (e.target.classList.contains('rect')) {

            var div = e.target;
            var rect = div.getBoundingClientRect();

            var shiftX = e.pageX - rect.left - pageXOffset;
            var shiftY = e.pageY - rect.top - pageYOffset;

            function _onDrag(e) {
                div.style.left = e.pageX - shiftX + 'px';
                div.style.top = e.pageY - shiftY + 'px';
            }

            document.addEventListener('mousemove', _onDrag);

            div.addEventListener('mouseup', function(e) {
                document.removeEventListener('mousemove', _onDrag, false);
            });
        }
    };

    createButton.addEventListener('click', _onCreateButtonClick);
    saveButton.addEventListener('click', _onSaveButtonClick);
    document.body.addEventListener('mousedown', _onMouseDown);

});
