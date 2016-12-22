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
    _sort: function(albums) {
        var self = this;
        return function(e) {
            e.preventDefault();
            if (e.target.classList.contains('sort')) {
                var albumId = e.target.parentNode.parentNode.parentNode.getAttribute('data-album-id');
                switch (e.target.name) {
                    case ('comments'):
                        albums[albumId].photos.sort(function(a, b) {
                            return b.comments.length - a.comments.length;
                        });
                        break;
                    case ('reposts'):
                        albums[albumId].photos.sort(function(a, b) {
                            return b.reposts - a.reposts;
                        });
                        break;
                    case ('likes'):
                        albums[albumId].photos.sort(function(a, b) {
                            return b.likes.count - a.likes.count;
                        });
                        break;
                    case ('date'):
                        albums[albumId].photos.sort(function(a, b) {
                            return b.date - a.date;
                        });
                        break;
                }
                self.renderAlbums(albums);
            }
        }
    },
    renderAlbums: function(albums) {
        var self = this;
        results.innerHTML = View.render('photos', { list: albums });
        document.addEventListener('click', self._sort(albums));
    },
    photosRoute: function() {
        var self = this;
        return Model.getPhotos().then(function(photos) {
            Model.getAllComments().then(function(comments) {
                return self.groupComments(comments);
            }).then(function(commentsDict) {
                var idCommentedUsers = self.getIdCommentedUsers(photos, commentsDict);
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
                var albumDict = self.groupPhotos(photos);
                var idAlbums = self.getIdAlbums(albumDict);
                return Model.getAlbums(idAlbums).then(function(albums) {
                    for (id in albumDict) {
                        albums.items.forEach(function(album) {
                            if (Number(id) === album.id) {
                                albumDict[id].title = album.title;
                                albumDict[id].id = id;
                            }
                        })
                    }
                    return albumDict;
                });
            }).then(function(albums) {
                self.renderAlbums(albums);

            });
        });
    }
};
