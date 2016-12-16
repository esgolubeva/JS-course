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
    photosRoute: function() {
        return Model.getPhotos().then(function(photos) {
            Model.getAllComments().then(function(comments) {
                return groupComments(comments);
            }).then(function(commentsDict) {
                photos.items.forEach(function(photo) {
                    photo.comments = commentsDict[photo.id] ? commentsDict[photo.id].length : 0;
                });
                return photos;
            }).then(function(photos) {
                results.innerHTML = View.render('photos', { list: photos.items });
            });
        });
    }
};
