var request = require('request')

module.exports = doing = (text, kdn) => new Promise((resolve, reject) => {
    var headers = {
        'User-Agent':       'Super Agent/0.0.1',
        'Content-Type':     'application/x-www-form-urlencoded'
    }
    var options = {
        url: 'https://cof.co.il/dev_cof_translate/proxy.php',
        method: 'POST',
        headers: headers,
        form: {'text':text,'to':kdn}
    }
    request(options, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            var hsil = JSON.parse(body)[0].translations[0].text
            resolve(hsil)
        }else{
            reject(err)
        }
    })
})