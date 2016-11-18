function prepend(container, element) {
    if (!container.children.length) {
        return container.appendChild(element);
    }
    return container.insertBefore(element, container.firstChild);
}
