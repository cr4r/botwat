const save = require('instagram-save')

module.exports = doing = (linkn) => new Promise((resolve, reject) => {
    save(linkn,'./instagram/').then(res => {
        let naTy = res.mimeType
        if(res.mimeType.split('/')[0]===`image`){
            naTy = 'insta.jpg'
        }else if(res.mimeType.split('/')[0]==='video'){
            naTy = 'insta.mp4'
        }else{
            resolve({'status':404,'result':'error'})
        }
        resolve({'status':200,'result':'ok','nama':naTy})
    })
})