module.exports = function(url, callback) {
    $.ajax({
        url: url,
        dataType: 'script',
        success: callback,
        async: true
    })
}