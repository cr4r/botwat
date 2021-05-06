const request = require('request')

module.exports = doing = (maill) => new Promise((resolve, reject) => {
    var headers = {
        'User-Agent':       'Super Agent/0.0.1',
        'Content-Type':     'application/x-www-form-urlencoded'
    }
    var options = {
        url: 'https://generator.email/blog/gmail-generator',
        method: 'POST',
        headers: headers,
        form: {'mesperpage': 1024, 'page_num': 1, 'ylink':maill, 'ydomain':'gmail.com','toggler-2':1,'toggler-1':1,'action':'submit'}
    }
    request(options, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            abc = body.split(`<hr>`)[1].split('<br>')
            let mlny =''
            jmlh = abc.length
            for (let i = 0; i < jmlh-2; i++) {
                mlny += `${abc[i]}\n`
            }
            resolve({'mail':mlny,'status':'ok'})
        }
        else{
            resolve({'status':'no'})
        }
    })
})