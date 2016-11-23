document.addEventListener('DOMContentLoaded', function() {
	var container = document.querySelector('.accordion');

	var _onClick = function(evt) {
		var elem = evt.target;
		var item = elem.closest('.accordion__item');
		var items = document.querySelectorAll('.accordion__item');

		if (elem.classList.contains('accordion__trigger')) {
			if (!item.classList.contains('active')) {
				for (var i of items) {
					i.classList.remove('active');
				}
				item.classList.add('active');
			} else {
				item.classList.remove('active');
			}
		}
	}

	container.addEventListener('click', _onClick);
})