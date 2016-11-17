function deleteTextNodes(element) {
    var childNodes = element.childNodes;
    var childNodesArray = [];

    for (var i = 0; i < childNodes.length; i++) {
        childNodesArray[childNodesArray.length] = childNodes[i];
    }

    for (var i = 0; i < childNodesArray.length; i++) {
        if (childNodesArray[i].nodeType === 3) {
            childNodesArray[i].remove();
        } else {
            deleteTextNodes(childNodesArray[i]);
        }
    }
}
