var axios = require('axios');
var request = require('request')
var cheerio = require('cheerio');
var fs = require('fs-extra')

module.exports = doing = (linkn,formatn) => new Promise((resolve, reject) => {
    var formatt = ''
    if(formatn === 1) {
        formatt = 3
    }else if(formatn === 2){
        formatt = 4
    }else if(formatn === 3){
        formatt = 1
    }else if(formatn === 4){
        formatt = 8
    }else if(formatn === 5)  {
        formatt = 14
    }else if(formatn === 6){
        formatt = 6
    }else if(formatn === 7){
        formatt = 5
    }else if(formatn === 8){
        formatt = 16
    }else if(formatn === 9)  {
        formatt = 15
    }else if(formatn === 10) {
        formatt = 18
    }else if(formatn === 11) {
        formatt = 17
    }else if(formatn === 12) {
        formatt = 2
    }else if(formatn === 13) {
        formatt = 13
    }else if(formatn === 14) {
        formatt = 9
    }else if(formatn === 15) {
        formatt = 11
    }else if(formatn === 16) {
        formatt = 12
    }else if(formatn === 17) {
        formatt = 19
    }else if(formatn === 18) {
        formatt = 20
    }

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
                if(err) return resolve({'status':'no','result':err})
                resolve({'status':'ok','result':'log/hasilIp.txt'})
            })
        }
    })
})