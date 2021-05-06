const { exec } = require('child_process')

module.exports = doing = (userr,passs) => new Promise((resolve, reject) => {
    exec('nordvpn logout',(error)=>{
        exec(`nordvpn login -u ${userr} -p ${passs}`,(error,stdout) => {
            let hasil = ""
            if(error) resolve({'status':'no','result':'error\n\n'+error})
            a = stdout.split(' ')
            if(!(a.indexOf('\rWelcome') === -1)){
                exec(`nordvpn account`,(error,stdout) => {
                    if(error) resolve({'status':'no','result':'error saat melihat informasi'})
                    aa = stdout.trim().split(' ')
                    if(!(aa.indexOf('Active') === -1)){
                        hasil = `${userr}:${passs} ${stdout.trim().split('(')[1].split(')')[0].split('Expires on ')[1]}`
                        resolve({'status':'ok','result':hasil})
                    }else if(!(aa.indexOf('Inactive') === -1)){
                        resolve({'status':'ok','result':'inactive'})
                    }else{
                        resolve({'status':'no','result':'Gagal cek akun'})
                    }
                })
            }else{
                resolve({'status':'no','result':'Login gagal'})
            }
        })
    })    
})