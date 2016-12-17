var Controller = {
    musicRoute: function() {
        return Model.getMusic().then(function(music) {
            results.innerHTML = View.render('music', { list: music });
        });
    },
    friendsRoute: function() {
        return Model.getFriends().then(function(friends) {
            results.innerHTML = View.render('friends', { list: friends });
        });
    },
    newsRoute: function() {
        return Model.getNews().then(function(news) {
            results.innerHTML = View.render('news', { list: news.items });
        });
    },
    groupsRoute: function() {
        return Model.getGroups().then(function(groups) {
            groups.shift();
            results.innerHTML = View.render('groups', { list: groups });
        });
    },
    groupPhotos: function(photos) {
        var albumDict = {};
        photos.items.forEach(function(photo) {
            var albumId = photo.album_id;
            if (albumId in albumDict) {
                albumDict[albumId].photos.push(photo);
            } else {
                albumDict[albumId] = { photos: [photo] };
            }
        });
        return albumDict;
    },
    getIdAlbums: function(albumDict) {
        var idAlbums = [];
        for (key in albumDict) {
            idAlbums.push(key);
        }
        return idAlbums;
    },
    groupComments: function(comments) {
        var commentsDict = {};
        comments.items.forEach(function(comment) {
            var photoId = comment.pid;
            if (photoId in commentsDict) {
                commentsDict[photoId].push(comment);
            } else {
                commentsDict[photoId] = [comment];
            }
        });
        return commentsDict;
    },
    getIdCommentedUsers: function(photos, commentsDict) {
        var idCommentedUsers = [];
        photos.items.forEach(function(photo) {
            if (commentsDict[photo.id]) {
                photo.comments = commentsDict[photo.id];
                photo.comments.reverse();
                photo.comments.forEach(function(comment) {
                    if (idCommentedUsers.indexOf(comment.from_id) === -1) {
                        idCommentedUsers.push(comment.from_id);
                    }
                })
            } else {
                photo.comments = [];
            }
        });
        return idCommentedUsers;
    },
    photosRoute: function() {
        return Model.getPhotos().then(function(photos) {
            Model.getAllComments().then(function(comments) {
                return Controller.groupComments(comments);
            }).then(function(commentsDict) {
                var idCommentedUsers = Controller.getIdCommentedUsers(photos, commentsDict);
                return { idCommentedUsers: idCommentedUsers, commentsDict: commentsDict };
            }).then(function(arg) {
                return Model.getUsers(arg.idCommentedUsers).then(function(users) {
                    photos.items.forEach(function(photo) {
                        if (arg.commentsDict[photo.id]) {
                            photo.comments.forEach(function(comment) {
                                users.forEach(function(user) {
                                    if (comment.from_id === user.uid) {
                                        comment.first_name = user.first_name;
                                        comment.last_name = user.last_name;
                                        comment.photo_50 = user.photo_50;
                                    }
                                });
                            });
                        }
                    });
                    return photos;
                });
            }).then(function(photos) {
                var albumDict = Controller.groupPhotos(photos);
                var idAlbums = Controller.getIdAlbums(albumDict);
                return Model.getAlbums(idAlbums).then(function(albums) {
                    for (id in albumDict) {
                        albums.items.forEach(function(album) {
                            if (Number(id) === album.id) {
                                albumDict[id].title = album.title;
                            }
                        })
                    }
                    return albumDict;
                });
            }).then(function(albums) {
                results.innerHTML = View.render('photos', { list: albums });
            });
        });
    }
};
