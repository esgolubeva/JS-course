function timer(t) {
    return new Promise(function(resolve, reject) {
        setTimeout(function() {
            resolve();
        }, t);
    })
}

timer(3000).then(function() {
    console.log('я вывелась через 3 секунды');
});
