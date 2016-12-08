'use strict';
var ACCESS_FRIENDS = 2;

var promise = new Promise(function(resolve, reject) {
    VK.init({
        apiId: 5765565
    });

    VK.Auth.login(function(response) {
        if (response.session) {
            resolve(response);
            console.log('Пользователь успешно авторизовался');
        } else {
            reject(new Error('Не удалось авторизоваться'));
        }
    }, ACCESS_FRIENDS);
});


function sort(list) {
    list.forEach(function(friend) {
        friend.name = friend.first_name + ' ' + friend.last_name;
    });

    list.sort(function(a, b) {
        return (a.name > b.name) ? 1 : ((a.name < b.name) ? -1 : 0);
    });

    return list;
}

promise
    .then(function() {
        VK.api('friends.get', { v: '5.8', 'fields': 'photo_50' }, function(response) {
            if (response.error) {
                reject(new Error(response.error.error_msg));
            }

            var friendsList = response.response.items;
            sort(friendsList);

            var source = document.getElementById('friends-template').innerHTML;
            var templateFn = Handlebars.compile(source);
            var results = document.getElementById('friends-list');

            var selectedFriendsList = [];

            var sourceSelect = document.getElementById('selected-friends-template').innerHTML;
            var templateFnSelect = Handlebars.compile(sourceSelect);
            var resultsSelect = document.getElementById('selected-friends-list');

            function filterFriendsList(list, str) {
                return list.filter(function(friend) {
                    return friend.name.toLowerCase().indexOf(str.toLowerCase()) > -1;
                });
            }

            function createFriendsList(list, template) {
                return template({
                    friends: list
                });
            }

            function _onInput(e) {
                if (e.target.classList.contains('search-input-left')) {
                    var str = e.target.value;
                    results.innerHTML = createFriendsList(filterFriendsList(friendsList, str), templateFn);
                } else if (e.target.classList.contains('search-input-rigth')) {
                    var str = e.target.value;
                    resultsSelect.innerHTML = createFriendsList(filterFriendsList(selectedFriendsList, str), templateFnSelect);
                }
            }

            function moveItem(friendIndex, first, second) {
                second[friendIndex] = first[friendIndex];
                delete first[friendIndex];
            }

            function refreshLists() {
                results.innerHTML = createFriendsList(friendsList, templateFn);
                resultsSelect.innerHTML = createFriendsList(selectedFriendsList, templateFnSelect);
            }

            function _onClick(e) {
                if (e.target.classList.contains('add__button')) {
                    e.target.preventDefault;
                    var friendIndex = e.target.parentElement.parentElement.getAttribute('data-friend-index');
                    moveItem(friendIndex, friendsList, selectedFriendsList);

                    refreshLists();
                } else if (e.target.classList.contains('remove__button')) {
                    e.target.preventDefault;
                    var friendIndex = e.target.parentElement.parentElement.getAttribute('data-friend-index');
                    moveItem(friendIndex, selectedFriendsList, friendsList);

                    refreshLists();
                }
            }

            function createIdList(list) {
                return list.map(function(friend) {
                    return friend.id;
                }).join(',');
            }

            function _onSaveButtonClick(e) {
                e.target.preventDefault;

                localStorage.selectedFriendsId = createIdList(selectedFriendsList);
            }

            if (localStorage.selectedFriendsId) {
                localStorage.selectedFriendsId.split(',').forEach(function(id, index) {
                    if (id.length) {
                        moveItem(index, friendsList, selectedFriendsList);
                    }
                });
                refreshLists();
            }

            function _dragEnd(e) {
                e.target.style.opacity = '1';
                document.getElementById('friends-right').removeEventListener('dragover', _dragOver);
                document.getElementById('friends-right').removeEventListener('drop', _drop);
            }

            function _drop(e) {
                e.preventDefault();
                var friendIndex = e.dataTransfer.getData("text/plain");
                if (e.target.closest('#friends-right')) {
                    moveItem(friendIndex, friendsList, selectedFriendsList);
                } else if (e.target.closest('#friends-left')) {
                    moveItem(friendIndex, selectedFriendsList, friendsList);
                }

                refreshLists();
            }

            function _dragOver(e) {
                e.preventDefault();
            }

            function _dragStart(e) {
                if (e.target.classList.contains('friends-item')) {
                    var listItem = e.target;
                    listItem.style.opacity = '0.5';
                    e.dataTransfer.setData("text/plain", listItem.getAttribute('data-friend-index'));

                    if (listItem.closest('#friends-list')) {
                        document.getElementById('friends-right').addEventListener('dragover', _dragOver);
                        document.getElementById('friends-right').addEventListener('drop', _drop);
                    } else if (listItem.closest('#selected-friends-list')) {
                        document.getElementById('friends-left').addEventListener('dragover', _dragOver);
                        document.getElementById('friends-left').addEventListener('drop', _drop);
                    }

                    listItem.addEventListener('dragend', _dragEnd);
                }
            }

            var saveButton = document.getElementById('save-button');
            var mainBlock = document.querySelector('.main-block');

            document.addEventListener('input', _onInput);
            saveButton.addEventListener('click', _onSaveButtonClick);
            mainBlock.addEventListener('click', _onClick);
            mainBlock.addEventListener('dragstart', _dragStart);
            refreshLists();
        });
    }).catch(function(e) {
        alert(`Ошибка: ${e.message}`);
    });
