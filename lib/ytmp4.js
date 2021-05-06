var request = require('request')

module.exports = doing = (linkn) => new Promise((resolve, reject) => {
    var headers = {
        'User-Agent':       'Super Agent/0.0.1',
        'Content-Type':     'application/x-www-form-urlencoded'
    }
    var options = {
        url: 'https://www.y2mate.com/mates/analyze/ajax',
        method: 'POST',
        headers: headers,
        form: {'url': linkn, 'q_auto': 1, 'ajax':1}
    }
    request(options, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            // Print out the response body
            aa = JSON.parse(body)
            var bn = aa.result.indexOf('START OVER ')==-1
            if(!bn){
                resolve('error')
            }else{
                var kid = aa.result.split('var k__id = \"')[1].split('\"')[0]
                var idds = aa.result.split('data-id=\"')[1].split('\"')[0]
                var down = {
                    url: 'https://www.y2mate.com/mates/convert',
                    method: 'POST',
                    headers: headers,
                    form: {'type': 'youtube', '_id': kid, 'v_id':idds, 'ajax':1,'token':"",'ftype':'mp4','fquality':'360'}
                }
                request(down, function (error, response, body) {
                    if (!error && response.statusCode == 200) {
                        linknya = {'url':JSON.parse(body).result.split('href=\"')[1].split('\"')[0]}
                        resolve(linknya)
                    }
                    else{
                        reject('error');
                    }
                })
            }
        }
        else{
            reject('error')
        }
    })
})