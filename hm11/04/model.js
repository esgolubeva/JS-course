var Model = {
    login: function(appId, perms) {
        return new Promise(function(resolve, reject) {
            VK.init({
                apiId: appId
            });

            VK.Auth.login(function(response) {
                if (response.session) {
                    resolve(response);
                } else {
                    reject(new Error('Не удалось авторизоваться'));
                }
            }, perms);
        });
    },
    callApi: function(method, params) {
        return new Promise(function(resolve, reject) {
            VK.api(method, params, function(response) {
                if (response.error) {
                    reject(new Error(response.error.error_msg));
                } else {
                    resolve(response.response);
                }
            });
        });
    },
    getUser: function() {
        return this.callApi('users.get', {});
    },
    getMusic: function() {
        return this.callApi('audio.get', {});
    },
    getFriends: function() {
        return this.callApi('friends.get', { fields: 'photo_100' });
    },
    getNews: function() {
        return this.callApi('newsfeed.get', { filters: 'post', count: 20 });
    },
    getGroups: function() {
        return this.callApi('groups.get', { extended: 1, fields: 'photo_50' });
    },
    getPhotos: function() {
        return this.callApi('photos.getAll', { extended: 1, v: '5.60', count: 200 });
    },
    getAllComments: function() {
        return this.callApi('photos.getAllComments', { v: '5.60', count: 100 });
    },
    getUsers: function(id) {
        return this.callApi('users.get', { user_ids: id, fields: 'photo_50' });
    },
    getAlbums: function(idAlbums) {
        return this.callApi('photos.getAlbums', { v: '5.60', album_ids: idAlbums });
    }

};
