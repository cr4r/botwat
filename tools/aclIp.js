var axios = require('axios');
var request = require('request')
var cheerio = require('cheerio');
var fs = require('fs-extra')

module.exports = doing = (linkn,formatt) => new Promise((resolve, reject) => {
    if(format === 1){ formatt = 3 }
    else if(format === 2){ formatt = 4 }
    else if(format === 3){ formatt = 1 }
    else if(format === 4){ formatt = 8 }
    else if(format === 5){ formatt = 14 }
    else if(format === 6){ formatt = 6 }
    else if(format === 7){ formatt = 5 }
    else if(format === 8){ formatt = 16 }
    else if(format === 9){ formatt = 15 }
    else if(format === 10){ formatt = 18 }
    else if(format === 11){ formatt = 17 }
    else if(format === 12){ formatt = 2 }
    else if(format === 13){ formatt = 13 }
    else if(format === 14){ formatt = 9 }
    else if(format === 15){ formatt = 11 }
    else if(format === 16){ formatt = 12 }
    else if(format === 17){ formatt = 19 }
    else if(format === 18){ formatt = 20 }
    else { resolve('no') }
    var headers = {
        'User-Agent':       'Super Agent/0.0.1',
        'Content-Type':     'application/x-www-form-urlencoded'
    }
    var options = {
        url: 'https://countryipblocks.net/acl.php',
        method: 'POST',
        headers: headers,
        form: {'countries[]':linkn , 'format1' : formatt, 'get_acl' : 'Create+ACL'}
    }
    request(options, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            // Print out the response body
            let $ = cheerio.load(body);
            lstIp = $('div[class="col1"]').text().split('Copy ACL to Clipboard')[0].trim().split('ACL Results')[1]
            fs.writeFile('log/hasilIp.txt',lstIp,(err)=>{
                if(err) return resolve('no')
                resolve('ok')
            })
        }
    })
})