const axios = require('axios');

module.exports = doing = (keyword) => new Promise((resolve, reject) => {
    axios.get(`http://youtube-scrape.herokuapp.com/api/search?q=${keyword}&page=1`).then(resp =>{
        aaa = resp.data.results[0]
        if(aaa.video === undefined) return reject(`error`)
        judual = aaa.video.title
        durationa = aaa.video.duration
        vie = aaa.video.views
        idss = aaa.video.id
        urlala = `https://youtu.be/${idss}`
        tumb = aaa.video.thumbnail_src
        dt = aaa.video.upload_date
        thumb = aaa.video.thumbnail_src
        usernamee = resp.data.results[0].uploader.username
        var jsn = {'judul':judual,'thumb':thumb,'durasi':durationa,'view':vie,'idn':idss,'url':urlala,'upload':dt,'username':usernamee}
        resolve(jsn)
    })
})