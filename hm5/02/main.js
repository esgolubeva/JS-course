document.addEventListener('DOMContentLoaded', function() {
    var button = document.querySelector('.button');
    var div;
    var body = document.body;

    function createDiv() {
        var div = document.createElement('div');
        var divWidth = parseInt(getComputedStyle(body).width) / 2;
        var divHeight = parseInt(getComputedStyle(body).height) / 2;

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

    function _onClick(e) {
        e.preventDefault();

        if (div) div.remove();

        div = createDiv();
        body.appendChild(div);

        div.addEventListener('mousedown', function(e) {

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
        });
    }

    button.addEventListener('click', _onClick);
});
