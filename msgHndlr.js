const aclip = require('./tools/aclIp')
var dns = require('dns'); 
var deepai = require('deepai');
const inst = require('./lib/instagram')
const cuaca = require('./lib/cuaca')
const gmal = require('./lib/gmailGen.js')
const xml2js = require('xml2json');
const cheerio = require("cheerio");
const crypto = require('crypto');
const yts = require("./lib/cmd.js");
const ytmp3 = require("./lib/ytmp3.js");
const ytmp4 = require('./lib/ytmp4.js');
const { decryptMedia } = require('@open-wa/wa-decrypt')
const fs = require('fs-extra')
const solat = require('./lib/jadwalsolat')
const axios = require('axios')
const moment = require('moment-timezone')
const get = require('got')
const color = require('./lib/color')
const tranlstae = require('./lib/translate')
const { spawn, exec } = require('child_process')
const nhentai = require('nhentai-js')
const { API } = require('nhentai-api')
const { liriklagu, quotemaker, randomNimek, fb, sleep, jadwalTv, ss } = require('./lib/functions')
const { help,webKom,grubKom,gabutKom,cryptoKom,downKom,otherKom, snk, info, donate, readme, listChannel } = require('./lib/help')
const nsfw_ = JSON.parse(fs.readFileSync('./lib/NSFW.json'))
const welkom = JSON.parse(fs.readFileSync('./lib/welcome.json'))
const { pow,round, log , evaluate, parse, derivative } = require('mathjs')
const request = require('request');
const urlencode = require("urlencode");
const url3 = require('url');
const processTime = (timestamp, now) => {return moment.duration(now - moment(timestamp * 1000)).asSeconds()}
moment.tz.setDefault('Asia/Jakarta').locale('id')

module.exports = msgHandler = async (client, message) => {
    try {
        const { type, id, from, t, sender, isGroupMsg, chat, caption, isMedia, mimetype, quotedMsg, quotedMsgObj, mentionedJidList } = message
        let { body } = message
        const { name, formattedTitle } = chat
        let { pushname, verifiedName } = sender
        pushname = pushname || verifiedName
        const commands = caption || body || ''
        const command = commands.toLowerCase().split(' ')[0] || ''
        const args =  commands.split(' ')
        
        const msgs = (message) => {
            if (command.startsWith('!')) {
                if (message.length >= 10){
                    return `${message.substr(0, 15)}`
                }else{
                    return `${message}`
                }
            }
        }
        function os_func() {
            this.execCommand = function (cmd) {
                return new Promise((resolve, reject)=> {
                   exec(cmd, (error, stdout, stderr) => {
                     if (error) {
                        reject(error);
                        return;
                    }
                    resolve(stdout)
                    console.log(stdout)
                   });
               })
           }
        }
        var os = new os_func();

        const mess = {
            wait: '[ WAIT ] Sedang di proses⏳ silahkan tunggu sebentar',
            error: {
                St: '[❗] Kirim gambar dengan caption *sticker* atau tag gambar yang sudah dikirim',
                Qm: '[❗] Terjadi kesalahan, mungkin themenya tidak tersedia!',
                Yt3: '[❗] Terjadi kesalahan, tidak dapat meng konversi ke mp3!',
                Yt4: '[❗] Terjadi kesalahan, mungkin error di sebabkan oleh sistem.',
                Ig: '[❗] Terjadi kesalahan, mungkin karena akunnya private',
                Ki: '[❗] Bot tidak bisa mengeluarkan admin group!',
                Ad: '[❗] Tidak dapat menambahkan target, mungkin karena di private',
                Iv: '[❗] Link yang anda kirim tidak valid!'
            }
        }
        function aca(lsls){return lsls[Math.floor(Math.random() * lsls.length)]}
        var donasi = 'Jangan lupa Donasinya (ovo/gopay/dana)\n082237416678\natau\nhttps://saweria.co/cr4r/\nMakasih donasinya :)\njika mau donasi pulsa kirim ke nomor bot ini aja ya'
        var pagi = ['pagi', 'jg', 'pgi jga','pgi','pagi']
        var sapa = ['hai','hello','hai kak','siapa?','ada apa','ya?','ada apa ya?','y','ya','ada apa kak','ya ada apa','ada yang bisa saya bantu?','hmm','oh yes','oh no','kenapa bang','ada apa bang','muehehehe']
        var syg = ['ngp sayang', 'apa sayang','apa bebeb','apa beb','opo','apo','ngp','apaan','apoh syang','ap beb','ngp beb', 'yo sayang']
        var lgpp = ['lagi guling', 'lagi ngoleng', 'lagi makan','lagi nonton','lagi nonton youtube','lagi boring','mager','bosen','bosan','pening','pusing','lgi bnyak tugas','lagi baperan','laper','makan','nk mandi','kepanasan']
        const time = moment(t * 1000).format('HH:mm:ss')
        const botNumber = await client.getHostNumber()
        const battery = await client.getBatteryLevel()
        const blockNumber = await client.getBlockedIds()
        const groupId = isGroupMsg ? chat.groupMetadata.id : ''
        const groupAdmins = isGroupMsg ? await client.getGroupAdmins(groupId) : ''
        const isGroupAdmins = isGroupMsg ? groupAdmins.includes(sender.id) : false
        const isBotGroupAdmins = isGroupMsg ? groupAdmins.includes(botNumber + '@c.us') : false
        const ownerNumber = '6282237416678@c.us'
        const isOwner = sender.id === ownerNumber
        const isBlocked = blockNumber.indexOf(sender.id)===-1
        const isNsfw = isGroupMsg ? nsfw_.includes(chat.id) : false
        const uaOverride = 'WhatsApp/2.2029.4 Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.116 Safari/537.36'
        const isUrl = new RegExp(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&/=]*)/gi)
        if (!isGroupMsg && command.startsWith('!')) console.log('\x1b[1;31m~\x1b[1;37m>', '[\x1b[1;32mEXEC\x1b[1;37m]', time, color(msgs(command)), 'from', color(pushname))
        if (isGroupMsg && command.startsWith('!')) console.log('\x1b[1;31m~\x1b[1;37m>', '[\x1b[1;32mEXEC\x1b[1;37m]', time, color(msgs(command)), 'from', color(pushname), 'in', color(formattedTitle))
        if (!isGroupMsg && !command.startsWith('!')) console.log('\x1b[1;33m~\x1b[1;37m>', '[\x1b[1;31mMSG\x1b[1;37m]', time, color(body), 'from', color(pushname))
        if (isGroupMsg && !command.startsWith('!')) console.log('\x1b[1;33m~\x1b[1;37m>', '[\x1b[1;31mMSG\x1b[1;37m]', time, color(body), 'from', color(pushname), 'in', color(formattedTitle))
        // if (isBlocked) return client.reply(from, 'Hey hey orang yang sudah di blok tidak bisa gunakan bot',id)
        
        function cek(){
            var maint = fs.readFileSync('lib/maintance','utf-8')
            if (maint==='hidup'){
                return 'ok'
            }else{
                return 'off'
            }
        }
        function kotor(ktanya){
            a = ['gila','tolol','asw','asu','kontol','kontl','kntl','bngke','bangke','tlol','anjng','anjing','jing','njir','anjir','wanjir']
            console.log(ktanya)
            try{
                b = ktanya.split(' ')
            }catch(err){
                b = ktanya
            }
            for(i=0,len=b.length; i<len; i++){
                if(a.indexOf(b[i]) >= 0) return 'ok'
            }
        }
        var maintan = `Maaf botnya lagi sedang perbaikan, mohon tunggu sehari atau 2 hari.\ntetapi jika anda mau donasi.\nhubungi ownernya\nwa.me/6282237416678\nuntuk semangatin :)\n\nmau 5k,10k,15k,20k,25k,30k,35k,40k,45k,50k,55k,60k,65k,70k,75k,80l,85k,90k,95,100k..999juta saya terima semua :'), tetapi sebelum donasi hubungi ownernya dulu. makasih`
        var jagaOmongan = `Maaf gans jaga omongan -_-\n\n${donasi}`

        switch(command) {
        case 'acl':
            if(args.length === 1) return client.reply(from,`acl help/..`,id)
            var kdNegara = body.split(' ')[1]
            
            if(kdNegara.toLowerCase()==='help') return client.sendFile(from,'tools/kodeNegara.txt','kodeNegara.txt',id)
            formt = `Format:\n1. Apache .htaccess Deny\n2. Apache .htaccess Allow\n3. CIDR\n4. Cisco ACL\n5. Cisco bit bucket\n6. Decimal/CIDR\n7. IP Range\n8. Inverse Netmask\n9. Juniper Junos\n10. Linux iptables\n11. MicroTik\n12. Netmask\n13. Network-Object\n14. Peerguardian2\n15. web.config Deny\n16. web.config allow\n17. Custom CIDR\n18. Custom Netmask`
            
            if(args.length === 2) return client.reply(from,`acl [format] [kode Negara]\nContoh:\nacl CN 3\n\n${formt}`,id)
            var formtny = body.split(' ')[2]

            if(formtny > 18) return client.reply(from, formt,id)
            var kode = fs.readFileSync('tools/kodeNegara.txt','utf-8').trim().split(' ')
            console.log('Pengecekan ok')
            if(kode.indexOf(formtny)==-1){
                console.log(formtny)
                console.log('kode negara salah')
                client.reply(from,'Maaf kode negara yang anda pilih tidak ada',id)
            }else{
                aclip(kdNegara, formtny.toUpperCase()).then((hsl)=> {
                    console.log(hsl)
                    console.log(kdNegara, formtny.toUpperCase())
                    if(hsl==='ok'){
                        client.sendFile(from,'log/hasilIp.txt','hasilIp.txt',from)
                        exec(`log/hasilIp.txt`)
                    }else{
                        return client.sendFile(from,'tools/kodeNegara.txt','kodeNegara.txt',id)
                    }
                })
            }
            break
        case 'sibuk':
            if(args.length === 1) return client.reply(from,`sibuk on/off`,id)
            if(!isOwner) return client.reply(from,'Fitur hanya owner yang bisa :p',id)
            var onof = body.split(' ')[1]
            if(onof === 'on'){
                fs.writeFile('lib/maintance','hidup',(err)=>{
                    if(err) return console.log(err)
                    client.reply(from,'Maintence Hidup',id)
                    })
            }else{
                fs.writeFile('lib/maintance','mati',(err)=>{
                    if(err) return console.log(err)
                    client.reply(from,'Maintence Mati',id)
                })
            }
            break
        case '.gabut':
            client.reply(from,gabutKom,id)
            break
        case '.other':
            client.reply(from,otherKom,id)
            break
        case '.website':
            client.reply(from,webKom,id)
            break
        case '.crypto':
            client.reply(from,cryptoKom,id)
            break
        case '.grub':
            client.reply(from,grubKom,id)
            break
        case 'dns':
            if(kotor(body.toLowerCase()) === 'ok') return client.reply(from,jagaOmongan,id)
            if(cek()==='ok') return client.reply(from,maintan,id)
            var psnny = body.split('dns ')[1]
            dns.lookup(psnny,  function onLookup(err, address, family) { 
                let datan = `address:\t ${address}`
                dns.reverse(address, function (err, hostnames) { 
                    datan += `reverse dari  ${address} :\n`; 
                    hostnya = JSON.parse(JSON.stringify(hostnames))
                    for (i=0,len = hostnya.length; i<len;i++){
                        datan += `${i}. ${hostnya[i]}\n`
                    }
                    client.reply(from,datan,id)
                });   
            }); 
            break

        case 'qrcode':
            if(kotor(body.toLowerCase()) === 'ok') return client.reply(from,jagaOmongan,id)
            if(cek()==='ok') return client.reply(from,maintan,id)
            if (!isGroupMsg) return client.reply(from, 'Perintah ini hanya bisa di gunakan dalam group!', id)
            if (args.length === 1) return client.reply(from, 'Kirim perintah *qrcode [query]*\nContoh : *qrcode cr4r bot*', id)
            var qrcodes = body.slice(7)
            client.sendFileFromUrl(from, `https://api.qrserver.com/v1/create-qr-code/?size=500x500&data=${qrcodes}`, 'gambar.png', donasi,id)
            // fs.close(file_descriptor, (err) => { if (err) return console.error("Failed to close file", err) }
            break
        case 'kbbi':
            if(kotor(body.toLowerCase()) === 'ok') return client.reply(from,jagaOmongan,id)
            if(cek()==='ok') return client.reply(from,maintan,id)
            if (!isGroupMsg) return client.reply(from, 'Perintah ini hanya bisa di gunakan dalam group!', id)
            if (args.length === 1) return client.reply(from, 'Kirim perintah *kbbi [query]*\nContoh : *kbbi asu*', id)
            const kbbl = body.slice(5)
            const kbbl2 = await axios.get(`https://mnazria.herokuapp.com/api/kbbi?search=${kbbl}`)
            if (kbbl2.data.error) {
                client.reply(from, kbbl2.data.error, id)
            } else {
                client.sendText(from, `➸ *KBBI* : ${kbbl}\n\n➸ *Hasil* : ${kbbl2.data.result}`, id)
            }
            break
        case 'cari':
            if(kotor(body.toLowerCase()) === 'ok') return client.reply(from,jagaOmongan,id)
            if(cek()==='ok') return client.reply(from,maintan,id)
            if (args.length === 1) return client.reply(from,`Masukkan gambar apa yang mau dicari\n\nContoh:\ncari boruto`,id)
            var cr = body.slice(5);
            var urlny = "https://api.fdci.se/rep.php?gambar=" + cr;
            axios.get(urlny).then((result) => {
                var jsnn = JSON.parse(JSON.stringify(result.data));
                if(jsnn[1]===null) return client.reply(from,'Maaf gambar yang anda cari tidak ada',id)
                var dapt =  jsnn[Math.floor(Math.random() * jsnn.length)];
                client.sendFileFromUrl(from,dapt, 'cari.jpg',`Mantap gak?\n\n${donasi}`,id)
            })
            break
        case 'loli':
            if(kotor(body.toLowerCase()) === 'ok') return client.reply(from,jagaOmongan,id)
            if(cek()==='ok') return client.reply(from,maintan,id)
            if (!isGroupMsg) return client.reply(from, 'Perintah ini hanya bisa di gunakan dalam group!', id)
            var loli = await axios.get('https://mhankbarbar.herokuapp.com/api/randomloli')
            client.sendFileFromUrl(from, loli.data.result, 'loli.jpeg', `*LOLI*\n\n${donasi}`, id)
            break
        case 'dadu':
            if(kotor(body.toLowerCase()) === 'ok') return client.reply(from,jagaOmongan,id)
            if(cek()==='ok') return client.reply(from,maintan,id)
            if (!isGroupMsg) return client.reply(from, 'Perintah ini hanya bisa di gunakan dalam group!', id)
            const dice = Math.floor(Math.random() * 6) + 1
            client.sendStickerfromUrl(from, 'https://www.random.org/dice/dice' + dice + '.png', { method: 'get' },id)
            break
        case 'koin':
            if(kotor(body.toLowerCase()) === 'ok') return client.reply(from,jagaOmongan,id)
            if(cek()==='ok') return client.reply(from,maintan,id)
            if (!isGroupMsg) return client.reply(from, 'Perintah ini hanya bisa di gunakan dalam group!', id)
            const side = Math.floor(Math.random() * 2) + 1
            if (side == 1) {
                client.sendStickerfromUrl(from, 'https://i.ibb.co/YTWZrZV/2003-indonesia-500-rupiah-copy.png', { method: 'get' },id)
            } else {
                client.sendStickerfromUrl(from, 'https://i.ibb.co/bLsRM2P/2003-indonesia-500-rupiah-copy-1.png', { method: 'get' },id)
            }
            break
        case 'img':
            if(kotor(body.toLowerCase()) === 'ok') return client.reply(from,jagaOmongan,id)
            if(cek()==='ok') return client.reply(from,maintan,id)
            if (quotedMsg && quotedMsg.type == 'sticker') {
                const mediaData = await decryptMedia(quotedMsg)
                const imageBase64 = `data:${quotedMsg.mimetype};base64,${mediaData.toString('base64')}`
                client.sendFile(from, imageBase64, 'imagesticker.jpg', `Sukses Convert Sticker ke Image!\n\n${donasi}`, id)
            } else if (!quotedMsg) return client.reply(from, 'tag sticker yang ingin dijadikan gambar!', id)
            break
        case 'solat':
            if(kotor(body.toLowerCase()) === 'ok') return client.reply(from,jagaOmongan,id)
            if(cek()==='ok') return client.reply(from,maintan,id)
            if (args.length === 1) {
                solat(317).then((hsl)=> {
                    client.reply(from,hsl,id)
                })
            }else{
                var brp = body.split(' ')[1]
                if (isNaN(brp)) return client.reply(from,'Masukkan Angka bukan Huruf!',id)
                solat(brp).then((hsl)=> {
                    client.reply(from,hsl,id)
                })
            }
            break
        case 'sh':
            if(kotor(body.toLowerCase()) === 'ok') return client.reply(from,jagaOmongan,id)
            if(cek()==='ok') return client.reply(from,maintan,id)
            if (!isBlocked) return client.reply(from, 'Hey hey orang yang sudah di blok tidak bisa gunakan bot',id)
            if (!isOwner) return client.reply(from, 'Mau apa om?, aku bot tapi gak sebodoh itu menerima perintah sembarangan :p',id)
            if (args.length === 1) return client.reply(from,`Ketik\nsh commandnya`,id)
            psn = body.split('sh ')[1]
            console.log(psn)
            exec(`${psn}`, (error, stdout) => {
                if (error) {
                    client.reply(`ERROR => ${error.message}`);
                }
                else{
                    client.reply(from, `${stdout}`, id)
                }
            });
            break
        case 'scan':
            if(kotor(body.toLowerCase()) === 'ok') return client.reply(from,jagaOmongan,id)
            if(cek()==='ok') return client.reply(from,maintan,id)
            var outn = `./log/output`
            var outj = `./log/output.jpg`
            if (isMedia && type === 'image') {
                const mediaData = await decryptMedia(message, uaOverride)
                fs.writeFile(outj,mediaData,(err)=>{if(err) return client.reply(from,`Error gan\n\n${err}`,id)})
                exec(`tesseract ${outj} ${outn} --dpi 150`, (error, stdout) => {
                    if (error) return client.reply(`ERROR => ${error}`);
                    client.sendFile(from, outn+'.txt','output.txt','',id)
                    client.reply(from,`${donasi}`,id)
                    exec(`rm ${outn}.txt'`)
                })
            } else if (quotedMsg && quotedMsg.type == 'image') {
                const mediaData = await decryptMedia(quotedMsg, uaOverride)
                fs.writeFile(outj,mediaData,(err)=>{if(err) return client.reply(from,`Error gan\n\n${err}`,id)})
                exec(`tesseract ${outj} ${outn} --dpi 150`, (error, stdout) => {
                    if (error) return client.reply(`ERROR => ${error}`);
                    client.sendFile(from, outn+'.txt','output.txt','',id)
                    client.reply(from,`${donasi}`,id)
                    exec(`rm ${outn}.txt'`)
                })
            }else if(args.length === 2&&body.split(' ')[2].match(isUrl)){
                var lnk = body.split(' ')[2]
                exec(`wget -O ${outj} ${lnk}&&tesseract ${outj} ${outn} --dpi 150`, (error, stdout) => {
                    if (error) {
                        client.reply(from,`ERROR => ${error.message}`,id);
                    }
                    client.sendFile(from, `${outn}.txt`,'output.txt','',id)
                    client.reply(from,`${donasi}`,id)
                    exec(`rm ${outn}.txt'`)
                })
            }else{
                client.reply(from,'Halo kak, silahkan Baca Ya!\nScan adalah  sebuah fitur yang bisa mengenali character, huruf atau angka dalam sebuah  dokumen photo dan juga bisa menjadi fungsi scaner untuk sebuah objek yang terdapat tulisan sehingga menjadi output berupa teks di perangkat smartphone maupun pc.\n\nAda 3 Cara Penggunaannya:\n1. kirim lah sebuah gambar yang berisikan teks dan sebuah pesan scan\n2.Tag lah sebuah foto yang berisikan teks dengan pesan/caption scan\n3.ketiklah \nscan urlGambarnya')
            }
            break
        case 'gmail':
            if(kotor(body.toLowerCase()) === 'ok') return client.reply(from,jagaOmongan,id)
            if(cek()==='ok') return client.reply(from,maintan,id)
            if (!isBlocked) return client.reply(from, 'Hey hey orang yang sudah di blok tidak bisa gunakan bot',id)
            if (args.length <= 1) return client.reply(from, `Fitur gmail adalah sebuah trik untuk memanipulasi sebuah email agar disaat menshare email kita tidak perlu kasih tau email aslinya, cukup kasih tau dengan hasil email di fitur ini.\nContoh:\nKirim lah email kita dari hasil generate, maka akan muncul pesan yang kita kirim kan ke email asli tanpa mengirimnya ke email asli, bingung ya? aku juga bingung kek gak ada kerjaan hehe.\n\nCara penggunaannya:\nmisalkan kita mempunyai email cr4r@gmail.com, maka ketiklah perintah\nemail cr4r\n\n*tidak perlu mengetik @gmail.com*`,id)
            var usern = body.split(' ')[1].replace('@gmail.com','')
            gmal(usrn).then((aaa)=>{
                if(aaa.status==='ok'){
                    client.reply(from,`${donasi}\n\nSpeed: ${processTime(t, moment())} _Detik_\n\n${aaa.mail}`,id)
                }else{
                    client.reply(from, `Gagal Gan, silahkan coba lagi dalam beberapa detik`,id)
                }
            })
            break
        case '#kode':
            if(kotor(body.toLowerCase()) === 'ok') return client.reply(from,jagaOmongan,id)
            if(cek()==='ok') return client.reply(from,maintan,id)
            if (!isBlocked) return client.reply(from, 'Hey hey orang yang sudah di blok tidak bisa gunakan bot',id)
            client.reply(from,`Halo kak, Kode ini untuk fitur trans, kode ini digunakan untuk mentranslate ke tujuan\nMisalkan dari bahasa indonesia ke jepang, jadi gunakan kode *ja*\n\nar = Arabic\nbg = Nulgarian\nzh-CHS = Chinese Simplifed\nzh-CHT = Chinese Traditional\ncs = Czech\nda = Danish\nnl = Dutch\nen = english\net = Estonian\nfr = French\nde = German\nel = Greek\nhi = Hindi\nid = Indonesia\nit = Italian\nja = Japanse\nko = Korean\nms = Malaysia\npt = Portugis\nru = Rusia\nth = Thailand\ntr = Turkish\nvi = Vietnam`,id)
            break
        case 'trans':
            if(kotor(body.toLowerCase()) === 'ok') return client.reply(from,jagaOmongan,id)
            if(cek()==='ok') return client.reply(from,maintan,id)
            if (!isBlocked) return client.reply(from, 'Hey hey orang yang sudah di blok tidak bisa gunakan bot',id)
            if (args.length <= 2) return client.reply(from, `Maaf, format pesan salah.\nSilahkan reply sebuah pesan dengan caption translate <kode_bahasa>\nnContoh:\ntrans Hello word .id`, id)
            kode = ['ar','bg','zh-CHS','zh-CHT','cs','da','nl','en','et','fr','de','el','hi','id','it','ja','ko','ms','pt','ru','th','tr','vi']
            var lend = body.split('./')[1]
            var psnn = body.split('trans ')[1].split('./')[0]
            console.log(kode.indexOf(lend))
            if(kode.indexOf(lend)==-1){
                client.reply(from,'Salah kodenya\nKetik *#kode* untuk melihat kode translate\n\nContoh:\ntrans Hello word ./id',id)
            }else{
                tranlstae(psnn,lend).then((result) => client.reply(from,result,id))
            }
            break
        case 'des':
        case 'asci':
        case 'hex':
            if(kotor(body.toLowerCase()) === 'ok') return client.reply(from,jagaOmongan,id)
            if(cek()==='ok') return client.reply(from,maintan,id)
            if (!isBlocked) return client.reply(from, 'Hey hey orang yang sudah di blok tidak bisa gunakan bot',id)
            var pl = body.split(' ')[0]
            console.log(pl)
            if(pl==='des'){
                var pili = body.split('des ')[1].split(' ')[0]
                var pesan = body.split('des ')[1].split(' ')[1]
                if(pili==='asci'){
                    let psn = ""
                    for (var i = 0, len = pesan.length; i < len; i++) {
                        psn += pesan[i].charCodeAt()+' '
                    }
                    client.reply(from,psn,id)
                }else if(pili==='hex'){
                    var he = Buffer.from(pesan, 'utf8').toString('hex')
                    client.reply(from,he,id)
                }else{client.reply(from,'Salah memasukkan perintah',id)}
            }
            else if(pl === 'bin'){
                var pili = body.split('bin ')[1].split(' ')[0]
                var pesan = body.split('bin ')[1].split(' ')[1]
                if(pili === 'hex'){
                    var ps = parseInt(pesan,2).toString(16)
                    if(ps === 'NaN') return client.reply(from, 'Seharusnya anda memasukkan angka binary bukan huruf',id)
                    client.reply(from,ps,id)
                }else if(pili === 'des'){
                    ps = parseInt(pesan, 2)
                    if(ps === 'NaN') return client.reply(from, 'Seharusnya anda memasukkan angka binary bukan huruf',id)
                    client.reply(from,ps,id)
                }else{client.reply(from,'Salah memasukkan perintah',id)}
            }else if(pl === 'hex'){
                var pili = body.split('hex ')[1].split(' ')[0]
                var pesan = body.split('hex ')[1].split(' ')[1]
                if(pili === 'des'){
                    ps = parseInt(pesan, 8)
                    if(ps === 'NaN') return client.reply(from, 'Seharusnya anda memasukkan angka hex bukan huruf',id)
                    client.reply(from,ps,id)
                }else{client.reply(from,'Salah memasukkan perintah',id)}
            }else{
                client.reply(from, `Perintahnya\n[command1] [command2] [pesanmu]\n\n[command1] => des/asci/hex [command2] =>\ndes => asci/hex\nbin => hex/des\nhex => des\n\nContoh:\ndes asci hallo world`,id)
            }
            break
            
        case 'vpn':
            if(kotor(body.toLowerCase()) === 'ok') return client.reply(from,jagaOmongan,id)
            if(cek()==='ok') return client.reply(from,maintan,id)
            if (!isBlocked) return client.reply(from, 'Hey hey orang yang sudah di blok tidak bisa gunakan bot',id)
            /*Fitur ini hanya bisa digunakan yang mempunyai server bukan cloud!
            Installah openvpn yang sudah tersedia di folder ini, lalu
            ubahlah variabel lokasiBot, userLinuxnya sesuai servermu*/
            if (!isGroupMsg){
                if (args.length === 1) return client.reply(from, `Halo kak, untuk membuat akun vpn silahkan ketik\n*vpn buat username*\n\nUntuk menghapus user ketik\n*vpn hapus username*\n\nIngat ya, username tidak boleh ada spasi\ndan selalu membaca Syarat dan Ketentuan berlaku, untuk melihatnya ketik\n*vpn snk*`,id)
                var ab = body.split(' ')[1]
                var lokasiBot = '/home/ubuntu/bot'
                var userLinuxnya = 'ubuntu:ubuntu'
                if(ab === 'help'){
                    client.reply(from,`*Android*\n1. Jika kakak menggunakan android, silahkan download Openvpn\n2. Download lah konfigurasi yang telah saya kirimkan\n3. Import file namaFilemu.ovpn di aplikasi openvpn\n4. Lalu klik konek\n\n*PC Linux*\n1. Install Openvpn \'sudo apt install openvpn -y\'\n2. Download File yang telah di kirimkan namaFilemu.ovpn\n3. Ketik \'sudo openvpn --config namaFilemu.ovpn\'\n4. Masukkan username anda, dan password dikosongkan\n\n*Windows*\n1. Silahkan download di https\:\/\/bit\.ly\/ovpnWin\n2. Installah seperti pada umumnya\n3. Download config yang dikirimkan di whatsapp\n4. Silahkan masukkan username, password dikosongkan`,id)
                }else if(ab === 'snk'){
                    client.reply(from, `Mohon dibaca Semua pesan saya sebelum menggunakan vpn\nSyarat & Ketentuan:\n1. Jangan melakukan tindakan ilegal\n2. Jika anda melakukannya, kami tidak segan\" akan melaporkan ke pihak berwajib\n3. Jika anda menggunakan vpn untuk menonton, dosa ditanggung anda sendiri\n4. Semua aktivitas anda berada di kendali server bot ini\n\nJika kakak setuju silahkan ikuti petunjuk dengan mengirim pesan\nvpn help`,id)
                }else if (ab === 'buat'){
                    var abc = body.split(' ')[2]
                    lokasin = `media/vpn/${abc}.ovpn`
                    var ab = 'buat'
                    exec(`sudo chown -R ${userLinuxnya} /etc/openvpn&&ack ${abc} /etc/openvpn/server/easy-rsa/pki/index.txt  | grep \"\^V\" | cut -d \'=\' -f 2`,(error,stdout) => {
                        if(error){
                            client.reply(from, `error pada saat mengecek username \n${error}`,id)
                        }
                        if(abc === stdout.replace('\n','')){
                            client.reply(from,'Halo kak, username yang kakak buat sudah ada, silahkan masukkan username berbeda',id)
                        }
                        else{
                            exec(`cd /etc/openvpn/server/easy-rsa/&&EASYRSA_CERT_EXPIRE=3650 ./easyrsa build-client-full ${abc} nopass&>/dev/null&&cd /home/ubuntu/bot&&sudo chown -R ${userLinuxnya} /etc/openvpn&>/dev/null`,(error,stdout) => {
                                if(error){
                                    return client.reply(from, `error pada saat membuat config \n${error}`,id)
                                }
                                var common = fs.readFileSync('/etc/openvpn/server/client-common.txt','utf-8')+'\n\n<ca>\n'
                                var ca = fs.readFileSync('/etc/openvpn/server/easy-rsa/pki/ca.crt','utf-8')+'</ca>\n<cert>\n'
                                fs.writeFile(lokasin,common+ca,(err)=>{if(err) return console.log(err)})
                                exec(`sed -ne \'\/BEGIN CERTIFICATE\/,\$ p\' /etc/openvpn/server/easy-rsa/pki/issued/${abc}.crt >> ${lokasin}`,(error, stdout) => {
                                    if(error) return client.reply(from, `error gan saat import sertifikat ca nya\n\n${error}`,id)
                                    var key = '</cert>\n<key>\n'+fs.readFileSync(`/etc/openvpn/server/easy-rsa/pki/private/${abc}.key`,'utf-8')+'</key>\n<tls-crypt>\n'
                                    fs.writeFile(lokasin, key, { flag: 'a+' }, err => {if(err) return console.log(err)})
                                    exec(`sed -ne \'/BEGIN OpenVPN Static key/,\$ p\' /etc/openvpn/server/tc.key>>${lokasin}&&echo \"</tls-crypt>\">>${lokasin}`,(error)=>{
                                        if(error) return client.reply(from, `error gan\n\n${error}`,id)
                                        client.reply(from,`Halo kak, vpn sudah dibuat\nSilahkan ketik vpn help\nuntuk Tutorial cara menggunakannya\nUntuk melihat Syarat \& dan ketentuan berlaku silahkan ketik\nvpn snk`,id)
                                        client.sendFile(from,lokasin,`${abc}.ovpn`,id)
                                    })
                                })
                            })
                        }
                    })
                }else if(ab === 'hapus'){
                    var abc = body.split(' ')[2]
                    exec(`sudo chown -R ${userLinuxnya} /etc/openvpn&&ack ${abc} /etc/openvpn/server/easy-rsa/pki/index.txt  | grep \"^V\" | cut -d \'=\' -f 2`,(error,stdout) => {
                        if(error){
                            client.reply(from, `error pada saat mengecek username \n${error}`,id)
                        }
                        console.log(stdout)
                        if(abc === stdout.replace('\n','')){
                            exec(`cd /etc/openvpn/server/easy-rsa/&&./easyrsa --batch revoke ${abc}&>/dev/null&&EASYRSA_CRL_DAYS=3650 ./easyrsa gen-crl&>/dev/null&&sudo rm /etc/openvpn/server/crl.pem&>/dev/null&&sudo cp /etc/openvpn/server/easy-rsa/pki/crl.pem /etc/openvpn/server/crl.pem&&sudo chown -R ${userLinuxnya} /etc/openvpn&&cd ${lokasiBot}`,(error)=>{
                                if(error) return client.reply(from, `Hem ada yang error nih coba lagi kak`,id)
                                client.reply(from,`Halo kak, user ${abc} sudah dihapus di server saya. terima kasih sudah mencoba vpn kami`,id)
                            })
                        }else{
                            client.reply(from,`Halo kak, User yang anda ketik tidak ada\n Masukkan user yang benar untuk menghapusnya`,id)
                        }
                    })
                }else{
                    client.reply(from, `Halo kak, untuk membuat akun vpn silahkan ketik\n*vpn buat username*\n\nUntuk menghapus user ketik\n*vpn hapus username*\n\nIngat ya, username tidak boleh ada spasi\ndan selalu membaca Syarat dan Ketentuan berlaku, untuk melihatnya ketik\n*vpn snk*`,id)
                }
            }else{
                client.reply(from, `Halo kak, Untuk masalah privasi. Fitur vpn ini hanya untuk chat only.`,id)
            }
            break

        case 'short':
            if(kotor(body.toLowerCase()) === 'ok') return client.reply(from,jagaOmongan,id)
            if(cek()==='ok') return client.reply(from,maintan,id)
            if (!isBlocked) return client.reply(from, 'Hey hey orang yang sudah di blok tidak bisa gunakan bot',id)
            /*Fitur ini hanya bisa digunakan jika anda mempunyai server sendiri bukan dari cloud
            Cara penggunaannya:, buat lah fitur short url menggunakan apache atau apalah di server anda
            Lalu editlah variabel loks ,userLinuxnya dan lik*/
            if (args.length <= 2) return client.reply(from, 'Fitur Short adalah pemendek url yang dituju, cara kerjanya sama seperti bit.ly , goo.gl dan website lainnya.\n\nCara penggunaan fitur ini\nContoh:\nshort google https://google.com', id)
            var userLinuxnya = 'ubuntu:ubuntu'
            var lik = 'https://cr4r.me/'
            var loks = '/var/www/html/link'
            var nam = body.split(' ')[1]
            var likk = body.split(' ')[2]
            var isLinkud = likk.match(/(?:https?:\/\/)/gi)
            if (!isLinkud) return client.reply(from, 'Maaf link yang anda masukkan salah!!\n\nContoh:\nshort google https://google.com', id)
            if (nam === 'rnd'){
                var nam = crypto.randomBytes(4).toString('hex');
            }else{
                exec(`sudo chown ${userLinuxnya} ${loks}&&ack \'${nam}\' ${loks}`, (error, stdout) => {
                    if(stdout.split(' ')[0] === nam){
                        client.reply(from,'Maaf nama shortLink anda sudah di pakai, silahkan pakai nama lain',id)
                    }else{
                        exec(`echo \'${nam} ${likk}\'>>${loks}`)
                        client.reply(from,`Jangan lupa bantu donasinya supaya server tetap hidup :)\n\nLink Pendeknya:\n${link}${nam}`)
                    }
                })
            }
            break
        case 'spam':
            if(kotor(body.toLowerCase()) === 'ok') return client.reply(from,jagaOmongan,id)
            if(cek()==='ok') return client.reply(from,maintan,id)
            if (!isBlocked) return client.reply(from, 'Hey hey orang yang sudah di blok tidak bisa gunakan bot',id)
            if (args.length <= 3) return client.reply(from,`Ketik\nspam [jumlah] [nomornya] [pesan kamu]\n\nContoh:\nspam 5 62822xxxx hay sayang`,id)
            if(body.split(' ')[1]==='grub'){
                if (!isGroupMsg) return client.reply(from, 'Fitur ini hanya bisa di gunakan dalam group', id)
                if (!isGroupAdmins) return client.reply(from, 'Perintah ini hanya bisa di gunakan oleh admin group', id)
                var psnn = body.slice(10).split('./')[0]
                limit = body.split('./')[1]
                for(i=0;i<limit;i++){
                    client.reply(from,psnn+`\n\nPesan dari https://wa.me/${sender.id}`.replace(`@c.us`,''))
                }
            }else{
                var limit = body.split(' ')[1]
                var nomor = body.split(' ')[2].replace("@","").replace("c.us","")
                let messageIndex = body.indexOf(nomor) + nomor.length;
                let psn = body.slice(messageIndex, body.length);
                if(isOwner){
                    if (nomor.length<6){
                        client.reply(from, 'Maaf nomor yang anda masukkan salah\nHarap masukkan kode negara+nomor\nContoh spam 628233777777')
                    }
                    else{
                        let messageIndex = body.indexOf(nomor) + nomor.length;
                        let pesn = body.slice(messageIndex, body.length);
                        console.log(`Pesan :${psn}\nNomor: ${nomor+'@c.us'}`)
                        for(i=0;i<limit;i++){
                            client.sendText(nomor+`@c.us`,psn+`\n\nPesan dari https://wa.me/${sender.id}`.replace(`@c.us`,''))
                        }
                    }
                }else{
                    if (limit>22){
                        client.reply(from, 'Gak ada akhlak\nBatasan spam hanya 20 pesan',id)
                    }else if(limit.length<21){
                        if (nomor.length<6){
                            client.reply(from, 'Maaf nomor yang anda masukkan salah\nHarap masukkan kode negara+nomor\nContoh 628233777777',id)
                        }
                        else{
                            
                            console.log(`Pesan :${psn}\nNomor: ${nomor+'@c.us'}`)
                            for(i=0;i<limit;i++){
                                client.sendText(nomor+`@c.us`,psn+`\n\nPesan dari https://wa.me/${sender.id}`.replace(`@c.us`,''))
                            }
                        }
                    }
                    else{
                        client.reply(from,'hemmm eror gan',id )
                    }
                }
            }
            break
        case 'nmap':
            if(kotor(body.toLowerCase()) === 'ok') return client.reply(from,jagaOmongan,id)
            if(cek()==='ok') return client.reply(from,maintan,id)
            if (!isBlocked) return client.reply(from, 'Hey hey orang yang sudah di blok tidak bisa gunakan bot',id)
            if (args.length === 1) return client.reply(from,`Ketik\nmap linknya`,id)
            var pesan = body.split(' ')[1].replace(';','').replace('\&\&','');
            exec(`nmap ${pesan}`, (error, stdout) => {
                if (error) {
                    client.reply(from,`ERROR => ${error}`,id);
                }
                else{
                    client.reply(from,`${stdout}`,id)
                }
            });
            break
        case 'wget':
            if(kotor(body.toLowerCase()) === 'ok') return client.reply(from,jagaOmongan,id)
            if(cek()==='ok') return client.reply(from,maintan,id)
            if (!isBlocked) return client.reply(from, 'Hey hey orang yang sudah di blok tidak bisa gunakan bot',id)
            if (args.length === 1) return client.reply(from,`Ketik\nwget https://linknya`,id)
            var pesan = body.split(' ')[1].replace(';','').replace('\&\&','');
            var namaFile = url3.parse(pesan).pathname.split('/').pop();
            exec(`wget ${pesan} \-O media\/file\/${namaFile}`, (error, stdout) => {
                if (error) {
                    client.reply(`ERROR => ${error.message}`);
                }
                else{
                    client.sendFile(from, `./log/${namaFile}`, `${namaFile}`,'', id)
                    // client.reply(`${stdout}`)
                    exec(`rm ./log/${namaFile}`)
                }
            });
            break
        case 'ping':
            if(kotor(body.toLowerCase()) === 'ok') return client.reply(from,jagaOmongan,id)
            if(cek()==='ok') return client.reply(from,maintan,id)
            if (!isBlocked) return client.reply(from, 'Hey hey orang yang sudah di blok tidak bisa gunakan bot',id)
            console.log(sender.id)
            exec(`cat /proc/meminfo | grep MemFree`, (error, stdout) => {
                var memfree = round(evaluate(stdout.replace('\n','').replace('MemFree\:','').replace('kB','').trim()/1024).toString(),2)+' mb'
                exec('cat /proc/meminfo \| grep MemTotal',(error,stdout,stderr)=>{
                    (async () => {
                    var memtotal = evaluate(stdout.replace('\n','').replace('MemTotal:','').replace('kB','').trim()).toString()+' mb'
                    console.log(memtotal)
                    var loadedMsg = await client.getAmountOfLoadedMessages()
                    var chatIds = await client.getAllChatIds()
                    var groups = await client.getAllGroups()
                    client.reply(from, `${donasi}\n\nSpeed: ${processTime(t, moment())} _Second_\nStatus : *${loadedMsg}* Pesan\nPesan belum dibaca:\n- *${groups.length}* Pesan Grub\n- *${chatIds.length - groups.length}* Chat Pribadi\n- *${chatIds.length}* Total Chats\n\nBattery HP tersisa ${battery} \%\nPenggunaan RAM: ${memfree}\\${memtotal}`,id)
                    })();
                });
            });
            break

        case 'pantun':
            if(kotor(body.toLowerCase()) === 'ok') return client.reply(from,jagaOmongan,id)
            if(cek()==='ok') return client.reply(from,maintan,id)
            if (!isBlocked) return client.reply(from, 'Hey hey orang yang sudah di blok tidak bisa gunakan bot',id)
            const fetch = require("node-fetch");
            fetch('https://raw.githubusercontent.com/cr4r/text/main/pantun').then(res => res.text()).then(body => {
                let tod = body.split("\n");
                let pjr = tod[Math.floor(Math.random() * tod.length)];
                client.reply(from,`${pjr.replace(/grs/g,"\n")}\n\n${donasi}`,id);
                });
            break

        case 'nama':
            if(kotor(body.toLowerCase()) === 'ok') return client.reply(from,jagaOmongan,id)
            if(cek()==='ok') return client.reply(from,maintan,id)
            if (!isBlocked) return client.reply(from, 'Hey hey orang yang sudah di blok tidak bisa gunakan bot',id)
            if (args.length === 1) return client.reply(from,`Ketik\nnama Namamu`,id)
            var namas = body.slice(5)
            var req = urlencode(namas.replace(/ /g,"+"));
            request.get({
                headers: {'content-type' : 'application/x-www-form-urlencoded'},url:'http://www.primbon.com/arti_nama.php?nama1='+ req +'&proses=+Submit%21+',},function(error, response, body){
                if(error) return client.reply(from, 'error gan, hubungi pemilik bot',id)
                let $ = cheerio.load(body);
                var y = $.html().split('arti:')[1];
                var t = y.split('method="get">')[1];
                var f = y.replace(t ," ");
                var x = f.replace(/<br\s*[\/]?>/gi, "\n");
                var h  = x.replace(/<[^>]*>?/gm, '');
              client.reply(from,`Ingat jangan percaya & anggap hanya lelucon\n*Arti Dari Namamu*\n${donasi}\n ͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏----------------------------------\nNama _*${namas}*_ ${h}\n----------------------------------\n*_Arti Nama By cr4r_*`,id);
              });
            break

        case 'pasangan':
            if(kotor(body.toLowerCase()) === 'ok') return client.reply(from,jagaOmongan,id)
            if(cek()==='ok') return client.reply(from,maintan,id)
            if (!isBlocked) return client.reply(from, 'Hey hey orang yang sudah di blok tidak bisa gunakan bot',id)
            if (args.length === 1) return client.reply(from,`Ketik\npasangan Namamu&Pasanganmu`,id)
            var gh = body.split("pasangan ")[1];
            var namamu = gh.split('&')[0]
            var pasangan = gh.split('&')[1]
            var pasan= 'http://www.primbon.com/kecocokan_nama_pasangan.php?nama1='+ namamu +'&nama2='+ pasangan +'&proses=+Submit%21+';
            axios.get(pasan).then((result) => {
                let $ = cheerio.load(result.data);
                var y = $.html().split('<b>KECOCOKAN JODOH BERDASARKAN NAMA PASANGAN</b><br><br>')[1];
                var t = y.split('.<br><br>')[1];
                var f = y.replace(t ," ");
                var x = f.replace(/<br\s*[\/]?>/gi, "\n");
                var h  = x.replace(/<[^>]*>?/gm, '');
                var d = h.replace("&amp;", '&')
                client.reply(from, `ini hanyalah lelucon jangan dipercaya\n-----------------------------------\n${donasi}\n*Cek Kecocokan Jodoh Berdasarkan Nama *\n\n ͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏${d}\n\n----------------------------------\n_Cek Kecocokan Pasangan mu_`, id);
            });
            break

        case '.cewe':
            if(kotor(body.toLowerCase()) === 'ok') return client.reply(from,jagaOmongan,id)
            if(cek()==='ok') return client.reply(from,maintan,id)
            if (!isBlocked) return client.reply(from, 'Hey hey orang yang sudah di blok tidak bisa gunakan bot',id)
            var items = ["ullzang girl", "cewe cantik", "cewe hijab", "hijaber", "hijab cantik", "korean girl"];
            // var a = url.match(/(?:https?:\\\/{2})?i.pinimg.com\/originals\/([^\s&]+)/)
            var cewe = items[Math.floor(Math.random() * items.length)];
            var apalo = "http://api.fdci.se/rep.php?gambar=" + cewe;
            axios.get(apalo).then((result) => {
                var b = result.data
                var cewek =  b[Math.floor(Math.random() * b.length)];
                client.sendFileFromUrl(from, cewek, 'cewe.jpg', `Aku cantik gak\n\n${donasi}`, id)
            });
            break

        case '.cowo':
            if(kotor(body.toLowerCase()) === 'ok') return client.reply(from,jagaOmongan,id)
            if(cek()==='ok') return client.reply(from,maintan,id)
            if (!isBlocked) return client.reply(from, 'Hey hey orang yang sudah di blok tidak bisa gunakan bot',id)
            var items = ["ullzang boy", "cowo ganteng", "cogan", "korean boy", "jepang boy", "cowo korea"];
            // var a = url.match(/(?:https?:\\\/{2})?i.pinimg.com\/originals\/([^\s&]+)/)
            var cewe = items[Math.floor(Math.random() * items.length)];
            var apalo = "http://api.fdci.se/rep.php?gambar=" + cewe;
            axios.get(apalo).then((result) => {
                var b = JSON.parse(JSON.stringify(result.data));
                var cewek =  b[Math.floor(Math.random() * b.length)];
                client.sendFileFromUrl(from, cewek, 'cowo.jpg', `aku ganteng gak\n\n${donasi}`, id)
            });
            break

        case 'hitung':
            if(kotor(body.toLowerCase()) === 'ok') return client.reply(from,jagaOmongan,id)
            if(cek()==='ok') return client.reply(from,maintan,id)
            if (!isBlocked) return client.reply(from, 'Hey hey orang yang sudah di blok tidak bisa gunakan bot',id)
            try{
                client.reply(from,`*Kalkulator*\n${body.slice(7)} = ${evaluate(body.slice(7)).toString()}\n\n${donasi}`)
            }
            catch(err){
                client.reply(from,`anda salah masukkan symbol\n* : perkalian\n/ : pembagian\n+ : pertambahan\n- : pengurangan\n\nContoh Penggunaan: ͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏\n   hitung 1.2*(2 + 4.5)  //7.8\n   hitung 9/3+2i  //3+2i\n   hitung det([-1, 2; 3, 1])  //-7\n   hitung 12.7 cm to inch  //5\n\n${err}`)
            }
            break

        case 'pow':
            if(kotor(body.toLowerCase()) === 'ok') return client.reply(from,jagaOmongan,id)
            if(cek()==='ok') return client.reply(from,maintan,id)
            if (!isBlocked) return client.reply(from, 'Hey hey orang yang sudah di blok tidak bisa gunakan bot',id)
            try{
                var a = JSON.parse(JSON.stringify(body.slice(4).split('#')[0].toString()))
                var b = JSON.parse(JSON.stringify(body.slice(4).split('#')[1].toString()))
                client.reply(from,`*Perpangkatan*\n${a}\^${b} = ${pow(a,b).toString()}`)
            }
            catch(err){
                client.reply(from,`Salah: ${a}\n anda salah masukkan symbol\n* : perkalian\n/ : pembagian\n+ : pertambahan\n- : pengurangan\n\nContoh Penggunaan: ͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏\n   *pow 3#2*\n\n# adalah pembatasan untuk perpangkatan\n\n${err}`)
            // *pow [[-1, 2],[3, 1]],2*
            }
            break

        case 'round':
            if(kotor(body.toLowerCase()) === 'ok') return client.reply(from,jagaOmongan,id)
            if(cek()==='ok') return client.reply(from,maintan,id)
            if (!isBlocked) return client.reply(from, 'Hey hey orang yang sudah di blok tidak bisa gunakan bot',id)
            try{
                console.log(body.slice(6))
                var a = body.slice(6).split(',')[0]
                var b = body.slice(6).split(',')[1]
                client.reply(from,`*Pembulatan dari*\n${body.slice(6)} = ${round(a,b).toString()}\n\n${donasi}`)
                }
            catch(err){
                client.reply(from,`Salah\nContoh Penggunaan:\nround 3.4956,2\nround 34.987,0\n,0-15 untuk menampilkan angka dibelakang koma\n\n${err}`)
            }
            break

        case 'lg':
        case 'lagi':
        case 'lgi':
            ac = aca(lgpp)
            if(body.split(' ')[1]==='ngp'||body.split(' ')[1]==='apa'||body.split(' ')[1]==='ap'||body.split(' ')[1]==='ngpo'||body.split(' ')[1]==='apo') return client.reply(from, ac, id)
            break

        case 'selamat':
        case 'slamat':
        case 'slmat':
        case 'slmt':
            ac = aca(pagi)
            if(body.split(' ')[1]==='pagi'||body.split(' ')[1]==='pgi'||body.split(' ')[1]==='pg') return client.reply(from, ac, id)
            break

        case 'cintaku':
        case 'sayangku':
        case 'syg':
        case 'sayang':
        case 'syang':
        case 'zheyeng':
        case 'suyung':
            ac = aca(syg)
            client.reply(from, ac, id)
            break

        case 'hai':
        case 'bot':
        case 'bot?':
        case 'hi':
        case 'hello':
        case 'hay':
        case 'kak':
        case 'ini bot':
            if (body.split(' ')[0]==='kak'){
                return client.reply(from, `Ada apa kak\n\n${donasi}`, id)
            }
            ac = aca(sapa)
            client.reply(from, `${ac}\n\n${donasi}`, id)
            break

        case "assalamualaikum":
        case "assalamu'alaikum":
            client.reply(from, 'Wa\'laikumsalam', id)
            break

        case 'sticker':
        case 'stiker':
            if(kotor(body.toLowerCase()) === 'ok') return client.reply(from,jagaOmongan,id)
            if(cek()==='ok') return client.reply(from,maintan,id)
            if (!isBlocked) return client.reply(from, 'Hey hey orang yang sudah di blok tidak bisa gunakan bot',id)
            if (isMedia && type === 'image') {
                const mediaData = await decryptMedia(message, uaOverride)
                const imageBase64 = `data:${mimetype};base64,${mediaData.toString('base64')}`
                client.reply(from,`${donasi}`,id)
                await client.sendImageAsSticker(from, imageBase64,id)
            } else if (quotedMsg && quotedMsg.type == 'image') {
                const mediaData = await decryptMedia(quotedMsg, uaOverride)
                const imageBase64 = `data:${quotedMsg.mimetype};base64,${mediaData.toString('base64')}`
                client.reply(from,`${donasi}`,id)
                await client.sendImageAsSticker(from, imageBase64, id)
            } else if (args.length === 2) {
                const url = args[1]
                if (url.match(isUrl)) {
                    await client.sendStickerfromUrl(from, url, { method: 'get' })
                        .catch(err => console.log('Caught exception: ', err))
                } else {
                    client.reply(from, mess.error.Iv, id)
                }
            } else {
                    client.reply(from, mess.error.St, id)
            }
            break

        case 'gif':
        case 'stickergif':
        case 'stikergif':
        case 'sgif':
            if(kotor(body.toLowerCase()) === 'ok') return client.reply(from,jagaOmongan,id)
            if(cek()==='ok') return client.reply(from,maintan,id)
            if (!isBlocked) return client.reply(from, 'Hey hey orang yang sudah di blok tidak bisa gunakan bot',id)
            if (isMedia) {
                console.log(mimetype)
                try{
                    if (mimetype === 'video/mp4' && message.duration < 10 || mimetype === 'image/gif' && message.duration < 10) {
                        const mediaData = await decryptMedia(message, uaOverride)
                        client.reply(from, '[WAIT] Sedang di proses⏳ silahkan tunggu ± 1 menit!', id)
                        const filename = `./media/input.${mimetype.split('/')[1]}`
                        await fs.writeFileSync(filename, mediaData)
                        exec(`sudo ffmpeg -i ${filename} \/var\/www\/html\/output\.gif \-vf fps\=30,scale\=240:\-1 \-y`, async function (error, stdout, stderr) {
                            const gif = await fs.readFileSync('./media/output.gif', { encoding: "base64" })
                            // console.log(gif.toString('base64'))
                            await client.sendGiphyAsSticker(from, `https://cr4r.me/output.gif`)
                        })
                    } else (
                        client.reply(from, '[❗] Kirim video dengan caption *stickerGif* max 10 detik!', id)
                    )
                }catch(err){
                    client.reply(from,'error gan',id)
                }
            }
            break
        case 'donasi':
        case 'donate':
            client.sendLinkWithAutoPreview(from, '', donate)
            break
        case 'tts':
            if(kotor(body.toLowerCase()) === 'ok') return client.reply(from,jagaOmongan,id)
            if(cek()==='ok') return client.reply(from,maintan,id)
            if (!isBlocked) return client.reply(from, 'Hey hey orang yang sudah di blok tidak bisa gunakan bot',id)
            if (args.length === 1) return client.reply(from, 'Kirim perintah *tts [id, en, jp, ar] [teks]*, contoh *tts [id] halo semua*')
            const ttsId = require('node-gtts')('id')
            const ttsEn = require('node-gtts')('en')
	        const ttsJp = require('node-gtts')('ja')
            const ttsAr = require('node-gtts')('ar')
            const dataText = body.slice(8)
            if (dataText === '') return client.reply(from, 'Baka?', id)
            if (dataText.length > 500) return client.reply(from, 'Teks terlalu panjang!', id)
            var dataBhs = body.slice(5, 7)
	    if (dataBhs == 'id') {
                ttsId.save('./media/tts/resId.mp3', dataText, function () {
                    client.sendPtt(from, './media/tts/resId.mp3', id)
                })
            } else if (dataBhs == 'en') {
                ttsEn.save('./media/tts/resEn.mp3', dataText, function () {
                    client.sendPtt(from, './media/tts/resEn.mp3', id)
                })
            } else if (dataBhs == 'jp') {
                ttsJp.save('./media/tts/resJp.mp3', dataText, function () {
                    client.sendPtt(from, './media/tts/resJp.mp3', id)
                })
	    } else if (dataBhs == 'ar') {
                ttsAr.save('./media/tts/resAr.mp3', dataText, function () {
                    client.sendPtt(from, './media/tts/resAr.mp3', id)
                })
            } else {
                client.reply(from, 'Kirim perintah *tts [id, en, jp, ar] [teks]*, contoh *tts [id] halo semua*',id)
            }
            break
        case 'tulis':
        case 'nulis':
            if(kotor(body.toLowerCase()) === 'ok') return client.reply(from,jagaOmongan,id)
            if(cek()==='ok') return client.reply(from,maintan,id)
            if (!isBlocked) return client.reply(from, 'Hey hey orang yang sudah di blok tidak bisa gunakan bot',id)
            if (args.length === 1) return client.reply(from, 'Kirim perintah *nulis [teks]*', id)
            let text = body.slice(6)
            let bb = []
            //for(let i=0, ilen=text11.length;i<ilen;i+=80){bb.push(text11.substring(i, i+80))}
            //let text = bb.join('\n')
            // client.reply(from, mess.wait, id)
            const splitText = text.replace(/(\S+\s*){1,10}/g, '$&\n')
            const fixHeight = splitText.split('\n').slice(0, 25).join('\n')
            //huruf 54 baris baru 700
            spawn('convert', [
                './media/img/before.jpg',
                '-font','Indie-Flower',
                '-size','50x960',
                '-pointsize','22',
                '-interline-spacing','17',
                '-annotate','+170+222',
                fixHeight,'./log/after.jpg'
            ]).on('error', () => client.reply(from, `Error gan`, id)).on('exit', () => {
                client.sendImage(from, './log/after.jpg', 'nulis.jpg', `Nih kak\n\n${donasi}\nDitulis oleh bot CR4R`, id)
                exec(`rm ./log/after.jpg`)
            })
            break
        case 'yt':
            if(kotor(body.toLowerCase()) === 'ok') return client.reply(from,jagaOmongan,id)
            if(cek()==='ok') return client.reply(from,maintan,id)
            if (!isBlocked) return client.reply(from, 'Hey hey orang yang sudah di blok tidak bisa gunakan bot',id)
            if (args.length === 1) return client(from,`Contoh Penggunaan:\nyt mp3 https://linkyoutube\nyt mp4 https://linkyoutube`)
            if (args.length === 2) return client(from,`Contoh Penggunaan:\nyt mp3 https://linkyoutube\nyt mp4 https://linkyoutube`)
            var piliha = body.split(' ')[1]
            var linkk = body.split(' ')[2]
            console.log(linkk)
            var headers = {
                'User-Agent':       'Super Agent/0.0.1',
                'Content-Type':     'application/x-www-form-urlencoded'
            }
            try{
                if(piliha === 'mp3'){
                    try{
                        yts(linkk).then((a) => {
                            if(a.durasi.split(':').length>=3) return client.reply(from, 'Video yang kamu inginkan lebih dari 1 jam. aku gak kuat mas\nkecuali kamu donasi 10k ke nomor 6282237416678',id)
                            client.sendFileFromUrl(from, a.thumb, 'thumb.jpg', `➸ *Judul* : ${a.judul}\nUpload: ${a.upload}\nViewers: ${a.view}\nDurasi: ${a.durasi}\nYoutube: ${a.username}\n\n${donasi}\n\nSilahkan tunggu sebentar proses pengiriman file membutuhkan waktu beberapa menit.`, id)
                            ytmp3(a.url).then((b) => {
                                client.sendFileFromUrl(from, b, a.judul, '',id)
                            })
                        })
                    }catch(error){
                        client.reply(from, 'Error gan, ulangi setelah 10 detik', id)
                    }
                }
                else if(piliha === 'mp4'){
                    try{
                        yts(linkk).then((a) =>{
                            if(a === 'error') return client.reply(from, 'Link salah',id)
                            if(a.durasi.split(':').length>=3) return client.reply(from, 'Video yang kamu inginkan lebih dari 1 jam. aku gak kuat mas\nkecuali kamu donasi 10k ke nomor 6282237416678',id)
                            ytmp4(a.url).then((b) => {
                                client.sendFileFromUrl(from, b.url, a.judul, `➸ *Judul* : ${a.judul}\nUpload: ${a.upload}\nViewers: ${a.view}\nDurasi: ${a.durasi}\nYoutube: ${a.username}\n\n${donasi}`, id)
                            })
                        })
                    }catch(error){
                        client.reply(from, 'Error gan, ulangi setelah 10 detik', id)
                    }
                }else{
                    client.reply(from,'Maaf gans seharusnya\nyt mp3 linkyoutubenya\natau\nyt mp4 linkyoutubenya',id)
                }
            }catch (error) {
                client.sendText(ownerNumber, 'Error Gans : '+ error)
                client.reply(from, mess.error.Yt4, id)
            }
            break

        case 'play':
            if(kotor(body.toLowerCase()) === 'ok') return client.reply(from,jagaOmongan,id)
            if(cek()==='ok') return client.reply(from,maintan,id)
            if (!isBlocked) return client.reply(from, 'Hey hey orang yang sudah di blok tidak bisa gunakan bot',id)
            if (args.length === 1) return client.reply(from, 'Kirim perintah *play nama lagu*, untuk contoh silahkan kirim perintah *play goyang dumang*')
            let keyword = body.slice(5);
            try{
                yts(keyword).then((a) => {
                    if(a.durasi.split(':').length>=3) return client.reply(from, 'Video yang kamu inginkan lebih dari 1 jam. aku gak kuat mas\nkecuali kamu donasi 10k ke nomor 6282237416678',id)
                    client.sendFileFromUrl(from, a.thumb, 'thumb.jpg', `➸ *Judul* : ${a.judul}\nUpload: ${a.upload}\nViewers: ${a.view}\nDurasi: ${a.durasi}\nYoutube: ${a.username}\n\n${donasi}\n\nSilahkan tunggu sebentar proses pengiriman file membutuhkan waktu beberapa menit.`, id)
                    ytmp3(a.url).then((b) => {
                        client.sendFileFromUrl(from, b, a.judul, '',id)
                    })
                })
            }catch(error){
                client.reply(from, 'Error gan, ulangi setelah 10 detik', id)
            }
            break

        case 'wiki':
            if(kotor(body.toLowerCase()) === 'ok') return client.reply(from,jagaOmongan,id)
            if(cek()==='ok') return client.reply(from,maintan,id)
            if (!isBlocked) return client.reply(from, 'Hey hey orang yang sudah di blok tidak bisa gunakan bot',id)
            if (args.length === 1) return client.reply(from, 'Kirim perintah *wiki [query]*\nContoh : *wiki asu*', id)
            const query_ = body.slice(5)
            const wiki = await get.get('https://arugaz.herokuapp.com/api/wiki?q='+ query_).json()
            if (wiki.error) {
                client.reply(from, wiki.error, id)
            } else {
                client.reply(from,`${wiki.result.replace('by: Astri-chan BOT','')}`, id)
            }
            break
        case 'cuaca':
            if(kotor(body.toLowerCase()) === 'ok') return client.reply(from,jagaOmongan,id)
            if(cek()==='ok') return client.reply(from,maintan,id)
            if (args.length === 1) return client.reply(from, 'Kirim perintah *cuaca [provinsi] [tempat]*\nContoh : *cuaca 0 Aceh Barat*', id)
            if (args.length === 2) {
                let blabla = ''
                for(var i = 0, len = propin.length; i<len; i++){
                    blabla += `${i}. ${propin[i]}\n`
                }
                client.reply(from,`Maaf Provinsi yang ada pilih salah!! Berikut Nama Provinsi\n${blabla}\nContoh:\n*cuaca 0 Aceh Barat`,id)
            }
            var psn = body.split('cuaca ')[1];
            var pron = psn.split(' ')[0];
            if (pron.length >2) return client.reply(from,'Masukkan perintah\ncuaca [provinsi] [daerah kamu]\n\ncontoh:\n*cuaca 0 Aceh Barat*')
            var daerahh = psn.split(`${pron} `)[1];
            cuaca(daerahh,pron).then((hsl)=> {
                if(hsl.status==='no') return client.reply(from, `sepertinya daerah kakak salah ketik deh, coba periksa nama daerah d bawah ini (Bukan angka ya!)\n\n${hsl.result}\n\nContoh:\n*cuaca 0 Aceh Barat*`)
                if(hsl.status==='ok'){
                    client.reply(from,`*Keakuratan data berasal dari bmkg.go.id!\n${hsl.result}`,id)
                }
            })
            break

        case 'fb':
            if(kotor(body.toLowerCase()) === 'ok') return client.reply(from,jagaOmongan,id)
            if(cek()==='ok') return client.reply(from,maintan,id)
            if (!isBlocked) return client.reply(from, 'Hey hey orang yang sudah di blok tidak bisa gunakan bot',id)
            if (args.length === 1) return client.reply(from, 'Kirim perintah *fb [linkFb]* untuk contoh silahkan kirim perintah *readme*', id)
            if (!args[1].includes('facebook.com')) return client.reply(from, mess.error.Iv, id)
            client.reply(from, mess.wait, id)
            const epbe = await fb(args[1])
            client.sendFileFromUrl(from, epbe.url, `Cuih${epbe.exts}`, epbe.capt, id)
            break
        case 'creator':
            if(kotor(body.toLowerCase()) === 'ok') return client.reply(from,jagaOmongan,id)
            if(cek()==='ok') return client.reply(from,maintan,id)
            if (!isBlocked) return client.reply(from, 'Hey hey orang yang sudah di blok tidak bisa gunakan bot',id)
            client.sendContact(from, '6282237416678@c.us')
            break
        case 'nsfw':
            if(kotor(body.toLowerCase()) === 'ok') return client.reply(from,jagaOmongan,id)
            if(cek()==='ok') return client.reply(from,maintan,id)
            if (!isBlocked) return client.reply(from, 'Hey hey orang yang sudah di blok tidak bisa gunakan bot',id)
            if (!isGroupMsg) return client.reply(from, 'Perintah ini hanya bisa di gunakan dalam group!', id)
            if (!isGroupAdmins) return client.reply(from, 'Perintah ini hanya bisa di gunakan oleh Admin group!', id)
            if (args.length === 1) return client.reply(from, 'Pilih enable atau disable!', id)
            if (args[1].toLowerCase() === 'enable') {
                nsfw_.push(chat.id)
                fs.writeFileSync('./lib/NSFW.json', JSON.stringify(nsfw_))
                client.reply(from, 'NSWF Command berhasil di aktifkan di group ini! kirim perintah *nsfwMenu* untuk mengetahui menu', id)
            } else if (args[1].toLowerCase() === 'disable') {
                nsfw_.splice(chat.id, 1)
                fs.writeFileSync('./lib/NSFW.json', JSON.stringify(nsfw_))
                client.reply(from, 'NSFW Command berhasil di nonaktifkan di group ini!', id)
            } else {
                client.reply(from, 'Pilih enable atau disable !', id)
            }
            break
        case 'welcome':
            if(kotor(body.toLowerCase()) === 'ok') return client.reply(from,jagaOmongan,id)
            if(cek()==='ok') return client.reply(from,maintan,id)
            if (!isBlocked) return client.reply(from, 'Hey hey orang yang sudah di blok tidak bisa gunakan bot',id)
            if (!isGroupMsg) return client.reply(from, 'Perintah ini hanya bisa di gunakan dalam group!', id)
            if (!isGroupAdmins) return client.reply(from, 'Perintah ini hanya bisa di gunakan oleh Admin group!', id)
            if (args.length === 1) return client.reply(from, 'Pilih enable atau disable!', id)
            if (args[1].toLowerCase() === 'enable') {
                welkom.push(chat.id)
                fs.writeFileSync('./lib/welcome.json', JSON.stringify(welkom))
                client.reply(from, 'Fitur welcome berhasil di aktifkan di group ini!', id)
            } else if (args[1].toLowerCase() === 'disable') {
                welkom.splice(chat.id, 1)
                fs.writeFileSync('./lib/welcome.json', JSON.stringify(welkom))
                client.reply(from, 'Fitur welcome berhasil di nonaktifkan di group ini!', id)
            } else {
                client.reply(from, 'Pilih enable atau disable !', id)
            }
            break
        case 'nsfwmenu':
            if(kotor(body.toLowerCase()) === 'ok') return client.reply(from,jagaOmongan,id)
            if(cek()==='ok') return client.reply(from,maintan,id)
            if (!isBlocked) return client.reply(from, 'Hey hey orang yang sudah di blok tidak bisa gunakan bot',id)
            client.reply(from, '1. randomHentai\n2. randomNsfwNeko', id)
            break
        case 'ig':
            if(kotor(body.toLowerCase()) === 'ok') return client.reply(from,jagaOmongan,id)
            if(cek()==='ok') return client.reply(from,maintan,id)
            if (!isBlocked) return client.reply(from, 'Hey hey orang yang sudah di blok tidak bisa gunakan bot',id)
            client.reply(from, 'Maaf fitur ini sedang perbaikan',id)
            // if (args.length === 1) return client.reply(from, 'Kirim perintah *ig [linkIg]* untuk contoh silahkan kirim perintah *readme*')
            // if (!args[1].match(isUrl) && !args[1].includes('instagram.com')) return client.reply(from, mess.error.Iv, id)
            // // var splitted_URL=body.split(' ')[1].split("/");    ///returns an array
            // // var array_length=splitted_URL.length;
            // // var insta_photo_id=splitted_URL[array_length-2]
            // console.log(body.split(' ')[1])
            // inst(body.split(' ')[1]).then((aa)=>{
            //     console.log(aa.status)
            //     if(aa.status===404) return client.reply(from, 'Maaf link yang anda kirimkan mungkin bukan type gambar/video, jadi saya tidak mau :)',id)
            //     if(aa.status===200) return client.sendFile(from,res.file,res.nama,donasi,id)
            //     exec(`rm ./media/instagram/*`)
            // })
            break
        case 'igstalk':
            if(kotor(body.toLowerCase()) === 'ok') return client.reply(from,jagaOmongan,id)
            if(cek()==='ok') return client.reply(from,maintan,id)
            if (!isBlocked) return client.reply(from, 'Hey hey orang yang sudah di blok tidak bisa gunakan bot',id)
            if (!isBlocked) return client.reply(from, 'Hey hey orang yang sudah di blok tidak bisa gunakan bot',id)
            if (args.length === 1)  return client.reply(from, 'Kirim perintah *igStalk @username*\nConntoh *igStalk @duar_amjay*', id)
            var usrr = body.split(' ')
            axios.get(`https://arugaz.herokuapp.com/api/stalk?username=${usrr}`).then(resp =>{
                if(resp.data.status === false) return client.reply(from, 'Foto/Video tidak ada',id)
                if(resp.data.status === 200){
                    var biodata = resp.data.biodata.replace('ArugaZ','cr4r')
                    var follower = resp.data.Jumlah_Followers
                    var following = resp.data.Jumlah_Following
                    var post = resp.data.Jumlah_Post
                    var naman = resp.data.name
                    var usrnm = resp.data.username
                    var caps = `Nama: ${naman}\nUsername: ${usrnm}\nBio: ${biodata}\nJumlah Post: ${post}\n${follower}\n${following}\n\n${donasi}`
                    client.sendFileFromUrl(from, resp.data.Profile_pic, 'Profile.jpg', caps, id)
                }
            })
            
            break
        case 'infogempa':
            if(kotor(body.toLowerCase()) === 'ok') return client.reply(from,jagaOmongan,id)
            if(cek()==='ok') return client.reply(from,maintan,id)
            if (!isBlocked) return client.reply(from, 'Hey hey orang yang sudah di blok tidak bisa gunakan bot',id)
            axios.get(`https://data.bmkg.go.id/autogempa.xml`).then(resp =>{
                jsonn = JSON.parse(xml2js.toJson(resp.data)).Infogempa.gempa
                urlla = `https://www.google.com/maps/search/${jsonn.Lintang.split(' ')[0]},${jsonn.Bujur.split(' ')[0]}`
                console.log(urlla)
                ss(urlla)
                client.reply(from,`Info Gempa Terkini\n\nTanggal  : ${jsonn.Tanggal}\nJam      : ${jsonn.Jam}\nLintang  : ${jsonn.Lintang}\nBujur    : ${jsonn.Bujur}\nMagnitude: ${jsonn.Magnitude}\nKedalaman: ${jsonn.Kedalaman}\n\nPada wilayah\n${jsonn.Wilayah1}\n${jsonn.Wilayah2}\n${jsonn.Wilayah3}\n${jsonn.Wilayah4}\n${jsonn.Wilayah5}\n\njsonn.Potensi\nBuka Maps: ${urlla}`,id)
            })
            break
        case 'anime':
            if(kotor(body.toLowerCase()) === 'ok') return client.reply(from,jagaOmongan,id)
            if(cek()==='ok') return client.reply(from,maintan,id)
            if (!isBlocked) return client.reply(from, 'Hey hey orang yang sudah di blok tidak bisa gunakan bot',id)
            if (args.length === 1) return client.reply(from, 'Kirim perintah *anime [query]*\nContoh : *anime Naruto*', id)
            var psna = body.slice(6)
            axios.get(`https://api.jikan.moe/v3/search/anime?q=${psna}&page=1`).then(resp =>{
                if(resp.status === 404) return clien.reply(from,'data tidak ditemukan kak, harap mengetik yang benar',id)
                if(resp.status === 200) {
                    dat = resp.data.results[0]
                    chap = `\nChapter: ${dat.chapters}`
                    if(dat.chapters===undefined){
                        chap = ''
                    }
                    tranlstae(dat.synopsis,'id').then((result) => {
                        client.sendFileFromUrl(from, dat.image_url, dat.title, `Judul: ${dat.title}\nType: ${dat.type}\nScore: ${dat.score}${chap}\n\n${result}\n\n${donasi}`, id)
                    })
                }
            })
            break
        case 'brainly':
            if(kotor(body.toLowerCase()) === 'ok') return client.reply(from,jagaOmongan,id)
            if(cek()==='ok') return client.reply(from,maintan,id)
            if (!isBlocked) return client.reply(from, 'Hey hey orang yang sudah di blok tidak bisa gunakan bot',id)
            if (args.length >= 2){
                const BrainlySearch = require('./lib/brainly')
                let tanya = body.slice(8)
                let jum = Number(tanya.split('.')[1]) || 2
                if (jum > 10) return client.reply(from, 'Max 10!', id)
                if (Number(tanya[tanya.length-1])){
                    tanya
                }
                client.reply(from, `➸ *Pertanyaan* : ${tanya.split('.')[0]}\n\n➸ *Jumlah jawaban* : ${Number(jum)}`, id)
                await BrainlySearch(tanya.split('.')[0],Number(jum), function(res){
                    res.forEach(x=>{
                        if (x.jawaban.fotoJawaban.length == 0) {
                            client.reply(from, `➸ *Pertanyaan* : ${x.pertanyaan}\n\n➸ *Jawaban* : ${x.jawaban.judulJawaban}\n`, id)
                        } else {
                            client.reply(from, `➸ *Pertanyaan* : ${x.pertanyaan}\n\n➸ *Jawaban* 〙: ${x.jawaban.judulJawaban}\n\n➸ *Link foto jawaban* : ${x.jawaban.fotoJawaban.join('\n')}`, id)
                        }
                    })
                })
            } else {
                client.reply(from, 'Usage :\nbrainly [pertanyaan] [.jumlah]\n\nEx : \nbrainly NKRI .2', id)
            }
            break
        case 'buatquote':
        case 'quotesmaker':
        case 'quotemaker':
            if(kotor(body.toLowerCase()) === 'ok') return client.reply(from,jagaOmongan,id)
            if(cek()==='ok') return client.reply(from,maintan,id)
            if (!isBlocked) return client.reply(from, 'Hey hey orang yang sudah di blok tidak bisa gunakan bot',id)
            arg = body.split('|')
            if (arg.length >= 4) {
                client.reply(from, mess.wait, id)
                const quotes = arg[1]
                const author = arg[2]
                const theme = arg[3]
                await quotemaker(quotes, author, theme).then(amsu => {
                    client.sendFile(from, amsu, 'quotesmaker.jpg','nih gans...').catch(() => {
                       client.reply(from, mess.error.Qm, id)
                    })
                })
            } else {
                client.reply(from, 'Cara Penggunaan: \nquotemaker |teks|watermark|theme\nContoh :\nquotemaker |ini contoh|bicit|random', id)
            }
            break
        case 'linkgroup':
            if(kotor(body.toLowerCase()) === 'ok') return client.reply(from,jagaOmongan,id)
            if(cek()==='ok') return client.reply(from,maintan,id)
            if (!isBlocked) return client.reply(from, 'Hey hey orang yang sudah di blok tidak bisa gunakan bot',id)
            if (!isBotGroupAdmins) return client.reply(from, 'Perintah ini hanya bisa di gunakan ketika bot menjadi admin', id)
            if (isGroupMsg) {
                const inviteLink = await client.getGroupInviteLink(groupId);
                client.sendLinkWithAutoPreview(from, inviteLink, `\nLink group *${name}*`)
            } else {
            	client.reply(from, 'Perintah ini hanya bisa di gunakan dalam group!', id)
            }
            break
        case 'bc':
            if(kotor(body.toLowerCase()) === 'ok') return client.reply(from,jagaOmongan,id)
            if(cek()==='ok') return client.reply(from,maintan,id)
            if (!isBlocked) return client.reply(from, 'Hey hey orang yang sudah di blok tidak bisa gunakan bot',id)
            if (!isOwner) return client.reply(from, 'Perintah ini hanya untuk Owner bot!', id)
            let msg = body.slice(3)
            const chatz = await client.getAllChatIds()
            for (let ids of chatz) {
                var cvk = await client.getChatById(ids)
                if (!cvk.isReadOnly) await client.sendText(ids, `[ CR4R BOT Broadcast ]\n\n${msg}`)
            }
            client.reply(from, 'Broadcast Success!', id)
            break
        case 'adminlist':
            if(kotor(body.toLowerCase()) === 'ok') return client.reply(from,jagaOmongan,id)
            if(cek()==='ok') return client.reply(from,maintan,id)
            if (!isBlocked) return client.reply(from, 'Hey hey orang yang sudah di blok tidak bisa gunakan bot',id)
            if (!isGroupMsg) return client.reply(from, 'Perintah ini hanya bisa di gunakan dalam group!', id)
            let mimin = ''
            for (let admon of groupAdmins) {
                mimin += `➸ @${admon.replace(/@c.us/g, '')}\n`
            }
            await sleep(2000)
            await client.sendTextWithMentions(from, mimin)
            break

        case 'ownergroub':
        case 'ownergrub':
        case 'ownergroup':
            if(kotor(body.toLowerCase()) === 'ok') return client.reply(from,jagaOmongan,id)
            if(cek()==='ok') return client.reply(from,maintan,id)
            if (!isBlocked) return client.reply(from, 'Hey hey orang yang sudah di blok tidak bisa gunakan bot',id)
            if (!isGroupMsg) return client.reply(from, 'Perintah ini hanya bisa di gunakan dalam group!', id)
            const Owner_ = chat.groupMetadata.owner
            await client.sendTextWithMentions(from, `Owner Group : @${Owner_}`)
            break

        case 'member':
            if(kotor(body.toLowerCase()) === 'ok') return client.reply(from,jagaOmongan,id)
            if(cek()==='ok') return client.reply(from,maintan,id)
            if (!isBlocked) return client.reply(from, 'Hey hey orang yang sudah di blok tidak bisa gunakan bot',id)
            if (!isGroupMsg) return client.reply(from, 'Perintah ini hanya bisa di gunakan dalam group!', id)
            if (!isGroupAdmins&&!isOwner) return client.reply(from, 'Perintah ini hanya bisa di gunakan oleh admin group', id)
            try{
                const groupMem = await client.getGroupMembers(groupId)
		        console.log(!isOwner)
                var pesan = body.slice(7)
                console.log(pesan)
                if(body.split('member ').length==1||body.split('member ')[1]==undefined||body.split('member ')[1]==''){
                    let hehe = `*╭══•›ꪶ ཻུ۪۪ꦽꦼ̷⸙ ━ ━ ━ ━ ꪶ ཻུ۪۪ꦽꦼ̷⸙‹•════\n`
                    hehe += `*╠➥   ✪〘 Hay semuanya 〙✪══\n`
                    for (let i = 0; i < groupMem.length; i++) {
                        hehe += '╠➥'
                        hehe += ` @${groupMem[i].id.replace(/@c.us/g, '')}\n`
                    }
                    hehe += `╠➥${donasi}`
                    hehe += '╚═〘 BOT CR4R 〙'
                    await sleep(2000)
                    await client.sendTextWithMentions(from, hehe)
                }
                else{
                    let hehe = `╔══✪〘 Hay semuanya 〙✪══\n╠➥✪〘 ADA INFO DARI ADMIN 〙\n╠➥✪〘 ${pesan} 〙 ͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏\n`
                    for (let i = 0; i < groupMem.length; i++) {
                        hehe += '╠➥'
                        hehe += ` @${groupMem[i].id.replace(/@c.us/g, '')}\n`
                    }
                    hehe += `╠➥${donasi}`
                    hehe += '╚═〘 BOT CR4R 〙'
                    await sleep(2000)
                    await client.sendTextWithMentions(from, hehe)
                }
            }
            catch(err){
                if (!isGroupMsg) return client.reply(from, 'Perintah ini hanya bisa di gunakan dalam group!', id)
                if (!isGroupAdmins) return client.reply(from, 'Perintah ini hanya bisa di gunakan oleh admin group', id)
                const groupMem = await client.getGroupMembers(groupId)
                let hehe = `╔══✪〘 Hay semuanya 〙✪══\n`
                for (let i = 0; i < groupMem.length; i++) {
                    hehe += '╠➥'
                    hehe += ` @${groupMem[i].id.replace(/@c.us/g, '')}\n`
                }
                hehe += '╚═〘 BOT CR4R 〙'
                await sleep(2000)
                await client.sendTextWithMentions(from, hehe)
            }
            break
        case 'kickall':
            if(kotor(body.toLowerCase()) === 'ok') return client.reply(from,jagaOmongan,id)
            if(cek()==='ok') return client.reply(from,maintan,id)
            if (!isBlocked) return client.reply(from, 'Hey hey orang yang sudah di blok tidak bisa gunakan bot',id)
            if (!isGroupMsg) return client.reply(from, 'Perintah ini hanya bisa di gunakan dalam group!', id)
            const isGroupOwner = sender.id === chat.groupMetadata.owner
            if (!isGroupOwner) return client.reply(from, 'Perintah ini hanya bisa di gunakan oleh Owner group', id)
            if (!isBotGroupAdmins) return client.reply(from, 'Perintah ini hanya bisa di gunakan ketika bot menjadi admin', id)
            const allMem = await client.getGroupMembers(groupId)
            for (let i = 0; i < allMem.length; i++) {
                if (groupAdmins.includes(allMem[i].id)) {
                    console.log('Upss this is Admin group')
                } else {
                    await client.removeParticipant(groupId, allMem[i].id)
                }
            }
            client.reply(from, 'Succes kick all member', id)
            break
        case 'leaveall':
            if(kotor(body.toLowerCase()) === 'ok') return client.reply(from,jagaOmongan,id)
            if(cek()==='ok') return client.reply(from,maintan,id)
            if (!isBlocked) return client.reply(from, 'Hey hey orang yang sudah di blok tidak bisa gunakan bot',id)
            if (!isOwner) return client.reply(from, 'Perintah ini hanya untuk Owner bot', id)
            const allChats = await client.getAllChatIds()
            const allGroups = await client.getAllGroups()
            for (let gclist of allGroups) {
                await client.sendText(gclist.contact.id, `Maaf bot sedang pembersihan, total chat aktif : ${allChats.length}`)
                await client.leaveGroup(gclist.contact.id)
            }
            client.reply(from, 'Succes leave all group!', id)
            break
        case 'clearall':
            if(kotor(body.toLowerCase()) === 'ok') return client.reply(from,jagaOmongan,id)
            if(cek()==='ok') return client.reply(from,maintan,id)
            if (!isBlocked) return client.reply(from, 'Hey hey orang yang sudah di blok tidak bisa gunakan bot',id)
            if (!isOwner) return client.reply(from, 'Perintah ini hanya untuk Owner bot', id)
            const allChatz = await client.getAllChats()
            for (let dchat of allChatz) {
                await client.deleteChat(dchat.id)
            }
            client.reply(from, 'Succes clear all chat!', id)
            break
        case 'add':
            if(kotor(body.toLowerCase()) === 'ok') return client.reply(from,jagaOmongan,id)
            if(cek()==='ok') return client.reply(from,maintan,id)
            if (!isBlocked) return client.reply(from, 'Hey hey orang yang sudah di blok tidak bisa gunakan bot',id)
            if (!isGroupMsg) return client.reply(from, 'Fitur ini hanya bisa di gunakan dalam group', id)
            if (args.length === 1) return client.reply(from, 'Untuk menggunakan fitur ini, kirim perintah *add* 628xxxxx', id)
            if (!isGroupAdmins) return client.reply(from, 'Perintah ini hanya bisa di gunakan oleh admin group', id)
            if (!isBotGroupAdmins) return client.reply(from, 'Perintah ini hanya bisa di gunakan ketika bot menjadi admin', id)
            try {
                await client.addParticipant(from,`${body.split(' ')}@c.us`)
            } catch {
                client.reply(from, mess.error.Ad, id)
            }
            break
        case 'kick':
            if(kotor(body.toLowerCase()) === 'ok') return client.reply(from,jagaOmongan,id)
            if(cek()==='ok') return client.reply(from,maintan,id)
            if (!isBlocked) return client.reply(from, 'Hey hey orang yang sudah di blok tidak bisa gunakan bot',id)
            if (!isGroupMsg) return client.reply(from, 'Fitur ini hanya bisa di gunakan dalam group', id)
            if (!isGroupAdmins) return client.reply(from, 'Perintah ini hanya bisa di gunakan oleh admin group', id)
            if (!isBotGroupAdmins) return client.reply(from, 'Perintah ini hanya bisa di gunakan ketika bot menjadi admin', id)
            if (mentionedJidList.length === 0) return client.reply(from, 'Untuk menggunakan Perintah ini, kirim perintah *!kick* @tagmember', id)
            await client.sendText(from, `Perintah diterima, mengeluarkan:\n${mentionedJidList.join('\n')}`)
            for (let i = 0; i < mentionedJidList.length; i++) {
                if (groupAdmins.includes(mentionedJidList[i])) return client.reply(from, mess.error.Ki, id)
                await client.removeParticipant(groupId, mentionedJidList[i])
            }
            break
        case '.keluar':
            if(kotor(body.toLowerCase()) === 'ok') return client.reply(from,jagaOmongan,id)
            if(cek()==='ok') return client.reply(from,maintan,id)
            if (!isBlocked) return client.reply(from, 'Hey hey orang yang sudah di blok tidak bisa gunakan bot',id)
            if (!isGroupMsg) return client.reply(from, 'Perintah ini hanya bisa di gunakan dalam group', id)
            if (!isGroupAdmins) return client.reply(from, 'Perintah ini hanya bisa di gunakan oleh admin group', id)
            await client.sendText(from,'Sayonara').then(() => client.leaveGroup(groupId))
            break
        case 'admin':
            if(kotor(body.toLowerCase()) === 'ok') return client.reply(from,jagaOmongan,id)
            if(cek()==='ok') return client.reply(from,maintan,id)
            if (!isBlocked) return client.reply(from, 'Hey hey orang yang sudah di blok tidak bisa gunakan bot',id)
            if (!isGroupMsg) return client.reply(from, 'Fitur ini hanya bisa di gunakan dalam group', id)
            if (!isGroupAdmins) return client.reply(from, 'Fitur ini hanya bisa di gunakan oleh admin group', id)
            if (!isBotGroupAdmins) return client.reply(from, 'Fitur ini hanya bisa di gunakan ketika bot menjadi admin', id)
            if (mentionedJidList.length === 0) return client.reply(from, 'Untuk menggunakan fitur ini, kirim perintah *!promote* @tagmember', id)
            if (mentionedJidList.length >= 2) return client.reply(from, 'Maaf, perintah ini hanya dapat digunakan kepada 1 user.', id)
            if (groupAdmins.includes(mentionedJidList[0])) return client.reply(from, 'Maaf, user tersebut sudah menjadi admin.', id)
            await client.promoteParticipant(groupId, mentionedJidList[0])
            await client.sendTextWithMentions(from, `Perintah diterima, menambahkan @${mentionedJidList[0]} sebagai admin.`)
            break
        case 'unadmin':
            if(kotor(body.toLowerCase()) === 'ok') return client.reply(from,jagaOmongan,id)
            if(cek()==='ok') return client.reply(from,maintan,id)
            if (!isBlocked) return client.reply(from, 'Hey hey orang yang sudah di blok tidak bisa gunakan bot',id)
            if (!isGroupMsg) return client.reply(from, 'Fitur ini hanya bisa di gunakan dalam group', id)
            if (!isGroupAdmins) return client.reply(from, 'Fitur ini hanya bisa di gunakan oleh admin group', id)
            if (!isBotGroupAdmins) return client.reply(from, 'Fitur ini hanya bisa di gunakan ketika bot menjadi admin', id)
            if (mentionedJidList.length === 0) return client.reply(from, 'Untuk menggunakan fitur ini, kirim perintah *!demote* @tagadmin', id)
            if (mentionedJidList.length >= 2) return client.reply(from, 'Maaf, perintah ini hanya dapat digunakan kepada 1 orang.', id)
            if (!groupAdmins.includes(mentionedJidList[0])) return client.reply(from, 'Maaf, user tersebut tidak menjadi admin.', id)
            await client.demoteParticipant(groupId, mentionedJidList[0])
            await client.sendTextWithMentions(from, `Perintah diterima, menghapus jabatan @${mentionedJidList[0]}.`)
            break
        case 'join':
            if(kotor(body.toLowerCase()) === 'ok') return client.reply(from,jagaOmongan,id)
            if(cek()==='ok') return client.reply(from,maintan,id)
            if (!isBlocked) return client.reply(from, 'Hey hey orang yang sudah di blok tidak bisa gunakan bot',id)
            if (!isOwner) return client.reply(from, 'Hay kalo mau masukin bot ke grub, hubungi ownernya ya\nwa.me/6282237416678\n\n*TIDAK GRATIS*',id)
            if (args.length === 1) return client.reply(from, 'Kirim perintah *join* linkgroup\n\nEx:\njoin https://chat.whatsapp.com/blablablablablabla', id)
            const link = body.split(' ')[1]
            console.log(link)
            const tGr = await client.getAllGroups()
            const minMem = 5
            const maxMem = 255
            const isLink = link.match(/(https:\/\/chat.whatsapp.com)/gi)
            const check = await client.inviteInfo(link)
            if (!isLink) return client.reply(from, 'Ini bukan link grub wa', id)
            const inviteCode = body.split(' ')[1].replace('https://chat.whatsapp.com/', '')
            if(body.split(' ')[1].match(/(https:)/gi)) {
                try {
                    await client.joinGroupViaLink(inviteCode);
                    client.reply(from, 'Otw join gan', id);
                } catch (e) {
                    client.reply(from, 'Sepertinya link grup bermasalah', id);}
            } else {
                client.reply(from, 'Ini link? 👊🤬',id)
            }
            break
        case 'hapus':
            if(kotor(body.toLowerCase()) === 'ok') return client.reply(from,jagaOmongan,id)
            if(cek()==='ok') return client.reply(from,maintan,id)
            if (!isBlocked) return client.reply(from, 'Hey hey orang yang sudah di blok tidak bisa gunakan bot',id)
            if (!isGroupMsg) return client.reply(from, 'Fitur ini hanya bisa di gunakan dalam group', id)
            if (!isGroupAdmins) return client.reply(from, 'Fitur ini hanya bisa di gunakan oleh admin group', id)
            if (!quotedMsg) return client.reply(from, 'Salah!!, kirim perintah *!delete [tagpesanbot]*', id)
            if (!quotedMsgObj.fromMe) return client.reply(from, 'Salah!!, Bot tidak bisa mengahpus chat user lain!', id)
            client.deleteMessage(quotedMsgObj.chatId, quotedMsgObj.id, false)
            break
        case 'getses':
            if(kotor(body.toLowerCase()) === 'ok') return client.reply(from,jagaOmongan,id)
            if(cek()==='ok') return client.reply(from,maintan,id)
            if (!isBlocked) return client.reply(from, 'Hey hey orang yang sudah di blok tidak bisa gunakan bot',id)
            const sesPic = await client.getSnapshot()
            client.sendFile(from, sesPic, 'session.png', `${donasi}`, id)
            break
        case 'lirik':
            if(kotor(body.toLowerCase()) === 'ok') return client.reply(from,jagaOmongan,id)
            if(cek()==='ok') return client.reply(from,maintan,id)
            if (!isBlocked) return client.reply(from, 'Hey hey orang yang sudah di blok tidak bisa gunakan bot',id)
            if (args.length == 1) return client.reply(from, 'Kirim perintah *lirik [optional]*, contoh *lirik aku bukan boneka*', id)
            const lagu = body.slice(6)
            const lirik = await liriklagu(lagu)
            client.reply(from, lirik, id)
            break

        case 'listblock':
            if(kotor(body.toLowerCase()) === 'ok') return client.reply(from,jagaOmongan,id)
            if(cek()==='ok') return client.reply(from,maintan,id)
            if (!isBlocked) return client.reply(from, 'Hey hey orang yang sudah di blok tidak bisa gunakan bot',id)
            let hih = `list blok nomor\nTotal : ${blockNumber.length}\n`
            for (let i of blockNumber) {
                hih += `➸ @${i.replace(/@c.us/g,'')}\n`
            }
            client.sendTextWithMentions(from, hih, id)
            break
        
        case 'listchannel':
            if(kotor(body.toLowerCase()) === 'ok') return client.reply(from,jagaOmongan,id)
            if(cek()==='ok') return client.reply(from,maintan,id)
            if (!isBlocked) return client.reply(from, 'Hey hey orang yang sudah di blok tidak bisa gunakan bot',id)
            client.reply(from, listChannel, id)
            break
        case 'jadwaltv':
            if(kotor(body.toLowerCase()) === 'ok') return client.reply(from,jagaOmongan,id)
            if(cek()==='ok') return client.reply(from,maintan,id)
            if (!isBlocked) return client.reply(from, 'Hey hey orang yang sudah di blok tidak bisa gunakan bot',id)
            if (args.length === 1) return client.reply(from, 'Kirim perintah *jadwalTv [channel]*', id)
            const query = body.slice(9).toLowerCase()
            const jadwal = await jadwalTv(query)
            client.reply(from, jadwal, id)
            break
        case 'jadwaltvnow':
            if(kotor(body.toLowerCase()) === 'ok') return client.reply(from,jagaOmongan,id)
            if(cek()==='ok') return client.reply(from,maintan,id)
            if (!isBlocked) return client.reply(from, 'Hey hey orang yang sudah di blok tidak bisa gunakan bot',id)
            const jadwalNow = await get.get('https://api.haipbis.xyz/jadwaltvnow').json()
            client.reply(from, `Jam : ${jadwalNow.jam}\n\nJadwalTV : ${jadwalNow.jadwalTV}`, id)
            break
        case 'waifu':
            if(kotor(body.toLowerCase()) === 'ok') return client.reply(from,jagaOmongan,id)
            if(cek()==='ok') return client.reply(from,maintan,id)
            if (!isBlocked) return client.reply(from, 'Hey hey orang yang sudah di blok tidak bisa gunakan bot',id)
            var outj = `./log/waifu.jpg`
            try{
                if (isMedia && type === 'image' || quotedMsg && quotedMsg.type === 'image') {
                    if (isMedia) {
                        var mediaData = await decryptMedia(message, uaOverride)
                    } else {
                        var mediaData = await decryptMedia(quotedMsg, uaOverride)
                    }
                    fs.writeFile(outj,mediaData,(err)=>{if(err) return client.reply(from,`Error gan\n\n${err}`,id)})
                    imag = outj
                }
                else if(body.split(' ')[1].match(isUrl)){
                    imag = body.split(' ')[1]
                }
                else{
                    return client.reply(from,'Waifu adalah algoritma yang meningkatkan gambar ͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏ sekaligus mengurangi noise di dalam gambar. Itu mendapatkan namanya dari seni bergaya anime yang dikenal sebagai \'waifu\' yang sebagian besar dilatihnya. Meskipun waifus merupakan sebagian besar data pelatihan, api waifu2x ini masih berfungsi dengan baik pada foto dan jenis citra lainnya. Anda dapat menggunakan Waifu2x untuk menggandakan ukuran gambar Anda sekaligus mengurangi noise.\n\nCara Penggunaan waifu\nContoh\:\nKirimlah foto beserta pesan berisi waifu\natau\nwaifu https:\/\/www.animenewsnetwork.com\/images\/encyc\/A6248\-3.jpg',id)
                }
            }catch(error){return client.reply(from, 'Waifu adalah algoritma yang meningkatkan gambar sekaligus mengurangi noise di dalam gambar. Itu mendapatkan namanya dari seni bergaya anime yang dikenal sebagai \'waifu\' yang sebagian besar dilatihnya. Meskipun waifus merupakan sebagian besar data pelatihan, api waifu2x ini masih berfungsi dengan baik pada foto dan jenis citra lainnya. Anda dapat menggunakan Waifu2x untuk menggandakan ukuran gambar Anda sekaligus mengurangi noise.\n\nCara Penggunaan waifu\nContoh\:\nKirimlah foto beserta pesan berisi waifu\natau\nwaifu https:\/\/www.animenewsnetwork.com\/images\/encyc\/A6248\-3.jpg',id)}
            deepai.setApiKey('d22373bd-b3d1-41a6-97a0-78450f64915c');
            try{
                (async function() {
                    var resp = await deepai.callStandardApi("waifu2x", {
                            image: imag,
                    });
                    client.sendFileFromUrl(from, resp.output_url, 'Waifu.jpg', `Semoga Sesuai expetasi :)\n${donasi}`, id)
                    exec(`rm ${outj}`,(error)=>{
                        if (error) return client.reply(`ERROR => Kesalahan saat menghapus log waifu`)
                    })
                })()
            }catch(error){
                client.reply(from,`Hmmmm error gan\n\n${error}`)
            }
            break
        case 'random':
            if(kotor(body.toLowerCase()) === 'ok') return client.reply(from,jagaOmongan,id)
            if(cek()==='ok') return client.reply(from,maintan,id)
            if (!isBlocked) return client.reply(from, 'Hey hey orang yang sudah di blok tidak bisa gunakan bot',id)
            prm = body.split(' ')[1]
            var urk = 'https://api.computerfreaker.cf/v1/'
            if(prm==='nsfwneko'){
                axios.get(`${urk}nsfwneko`).then(resp =>{client.sendFileFromUrl(from, resp.data.url, `NSFWNeko Anime.png`, 'NSFWNeko Anime', id)})
            }else if(prm==='hentai'){
                axios.get(`${urk}hentai`).then(resp =>{client.sendFileFromUrl(from, resp.data.url, `Hentai.png`, 'Hentai Anime', id)})
            }else if(prm==='hug'){
                axios.get(`${urk}hug`).then(resp =>{client.sendFileFromUrl(from, resp.data.url, `hug.png`, 'hug', id)})
            }else if(prm==='nekonime'){
                axios.get(`${urk}neko`).then(resp =>{client.sendFileFromUrl(from, resp.data.url, `NekoAnime.png`, 'Neko Anime', id)})
            }else if(prm==='trapnime'){
                axios.get(`${urk}trap`).then(resp =>{client.sendFileFromUrl(from, resp.data.url, `TrapAnime.png`, 'Trap Anime', id)})
            }else if(prm==='anime'){
                axios.get(`${urk}anime`).then(resp =>{client.sendFileFromUrl(from, resp.data.url, `Randomanime.png`, 'Randomanime', id)})
            }
            break
        case 'neko':
            if(kotor(body.toLowerCase()) === 'ok') return client.reply(from,jagaOmongan,id)
            if(cek()==='ok') return client.reply(from,maintan,id)
            if (!isBlocked) return client.reply(from, 'Hey hey orang yang sudah di blok tidak bisa gunakan bot',id)
            q2 = Math.floor(Math.random() * 900) + 300;
            q3 = Math.floor(Math.random() * 900) + 300;
            client.sendFileFromUrl(from, 'http://placekitten.com/'+q3+'/'+q2, 'neko.png','Neko ')
            break
        case 'pokemon':
            if(kotor(body.toLowerCase()) === 'ok') return client.reply(from,jagaOmongan,id)
            if(cek()==='ok') return client.reply(from,maintan,id)
            if (!isBlocked) return client.reply(from, 'Hey hey orang yang sudah di blok tidak bisa gunakan bot',id)
            q7 = Math.floor(Math.random() * 890) + 1;
            client.sendFileFromUrl(from, 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/'+q7+'.png','Pokemon.png',)
            break
        case 'ss':
            if(kotor(body.toLowerCase()) === 'ok') return client.reply(from,jagaOmongan,id)
            if(cek()==='ok') return client.reply(from,maintan,id)
            if (!isBlocked) return client.reply(from, 'Hey hey orang yang sudah di blok tidak bisa gunakan bot',id)
            var _query = body.slice(3)
            //#const _query = body.slice(43)
            if (!_query.match(isUrl)) return client.reply(from, mess.error.Iv, id)
            if (args.length === 1) return client.reply(from, 'Kirim perintah *!ss [web]*\nContoh *ss https://google.com*', id)
            await ss(_query).then((result) => {
                client.sendFile(from, `./log/screenshot.jpeg`, 'ss.jpeg', `${donasi}`, id)
                exec(`rm ./log/screenshot.jpeg`)
            })
            .catch(() => client.reply(from, `Error tidak dapat mengambil screenshot website ${_query}`, id))
            break
        case 'quote':
        case 'quotes':
            if(kotor(body.toLowerCase()) === 'ok') return client.reply(from,jagaOmongan,id)
            if(cek()==='ok') return client.reply(from,maintan,id)
            if (!isBlocked) return client.reply(from, 'Hey hey orang yang sudah di blok tidak bisa gunakan bot',id)
            var urll = 'https://jagokata.com/kata-bijak/acak.html'
            axios.get(urll).then((result) => {
                let $ = cheerio.load(result.data);
                var author = $('a[class="auteurfbnaam"]').contents().first().text();
                var kata = $('q[class="fbquote"]').contents().first().text();
                client.reply(from, `➸ *Quotes* : _${kata}_\n➸ *Author* : ${author}\n\n${donasi}`, id)
            })
            break
        case 'katacinta':
            if(kotor(body.toLowerCase()) === 'ok') return client.reply(from,jagaOmongan,id)
            if(cek()==='ok') return client.reply(from,maintan,id)
            if (!isBlocked) return client.reply(from, 'Hey hey orang yang sudah di blok tidak bisa gunakan bot',id)
            var urll = 'https://jagokata.com/kata-bijak/kata-cinta.html'
            axios.get(urll).then((result) => {
                let $ = cheerio.load(result.data);
                var author = $('a[class="auteurfbnaam"]').contents().first().text();
                var kata = $('q[class="fbquote"]').contents().first().text();
                client.reply(from, `      _${kata}_\n\n    ~ ${author}\n\n${donasi}`, id)
            });
            break
        case 'quoteanime':
            if(kotor(body.toLowerCase()) === 'ok') return client.reply(from,jagaOmongan,id)
            if(cek()==='ok') return client.reply(from,maintan,id)
            if (!isBlocked) return client.reply(from, 'Hey hey orang yang sudah di blok tidak bisa gunakan bot',id)
            const skya = await get.get('https://mhankbarbar.herokuapp.com/api/quotesnime/random').json()
            skya_ = skya.data
            client.reply(from, `➸ *Quotes* : ${skya_.quote}\n➸ *Character* : ${skya_.character}\n➸ *Anime* : ${skya_.anime}`, id)
            break
        case 'meme':
            if(kotor(body.toLowerCase()) === 'ok') return client.reply(from,jagaOmongan,id)
            if(cek()==='ok') return client.reply(from,maintan,id)
            if (!isBlocked) return client.reply(from, 'Hey hey orang yang sudah di blok tidak bisa gunakan bot',id)
            const response = await axios.get('https://meme-api.herokuapp.com/gimme/wholesomeanimemes');
            const { postlink, title, subreddit, url, nsfw, spoiler } = response.data
            client.sendFileFromUrl(from, `${url}`, 'meme.jpg', `${title}\n\n${donasi}`,id)
            break
        case 'menu':
        case 'help':
            if(kotor(body.toLowerCase()) === 'ok') return client.reply(from,jagaOmongan,id)
            if(cek()==='ok') return client.reply(from,maintan,id)
            if (!isBlocked) return client.reply(from, 'Hey hey orang yang sudah di blok tidak bisa gunakan bot',id)
            client.reply(from, help, id)
            break
        case 'readme':
            if(kotor(body.toLowerCase()) === 'ok') return client.reply(from,jagaOmongan,id)
            if(cek()==='ok') return client.reply(from,maintan,id)
            client.reply(from, readme, id)
            break
        case 'info':
            if(kotor(body.toLowerCase()) === 'ok') return client.reply(from,jagaOmongan,id)
            if(cek()==='ok') return client.reply(from,maintan,id)
            client.sendLinkWithAutoPreview(from, 'Informasi Bot', info)
            break
        case 'snk':
            if(kotor(body.toLowerCase()) === 'ok') return client.reply(from,jagaOmongan,id)
            client.reply(from, snk, id)
            break
        }
    } catch (err) {
        console.log(color('[ERROR]', 'red'), err)
        //client.kill().then(a => console.log(a))
    }
}
