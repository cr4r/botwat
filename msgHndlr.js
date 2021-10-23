const gmal = require('./lib/gmailGen.js')
const cheerio = require("cheerio");
const yts = require("./lib/cmd.js");
const ytmp3 = require("./lib/ytmp3.js");
const ytmp4 = require('./lib/ytmp4.js');
const { decryptMedia } = require('@open-wa/wa-decrypt')
const fs = require('fs-extra')
const solat = require('./lib/jadwalsolat')
const axios = require('axios')
const moment = require('moment-timezone')
const color = require('./lib/color')
const tranlstae = require('./lib/translate')
const { spawn, exec } = require('child_process')
const { sleep } = require('./lib/functions')
const { ownerNumber } = require('./lib/setting.json')
const { help, webKom, grubKom, gabutKom, downKom, otherKom, snk, info, donate, readme, listChannel } = require('./lib/help')
const welkom = JSON.parse(fs.readFileSync('./lib/welcome.json'))
const { pow, round, log, evaluate, parse, derivative } = require('mathjs')
const request = require('request');

const { blockCek, cek, kotor } = require('./function/blockChat');
const { statusServer } = require('./function/ping');

const urlencode = require("urlencode");
const url3 = require('url');
const processTime = (timestamp, now) => { return moment.duration(now - moment(timestamp * 1000)).asSeconds() }
moment.tz.setDefault('Asia/Jakarta').locale('id')

module.exports = msgHandler = async (rahman, message) => {
  try {
    const { type, id, from, t, sender, isGroupMsg, chat, caption, isMedia, mimetype, quotedMsg, quotedMsgObj, mentionedJidList } = message
    let { body } = message
    const { name, formattedTitle } = chat
    let { pushname, verifiedName } = sender
    pushname = pushname || verifiedName
    const commands = caption || body || ''
    const command = commands.toLowerCase().split(' ')[0] || ''
    const args = commands.split(' ')

    const msgs = (message) => {
      if (command.startsWith('')) {
        if (message.length >= 10) {
          return `${message.substr(0, 15)}`
        } else {
          return `${message}`
        }
      }
    }
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

    function aca(lsls) { return lsls[Math.floor(Math.random() * lsls.length)] }
    var donasi = `Jangan lupa Donasinya (ovo/dana)\n082237416678\natau\n* https://trakteer.id/cr4r\nMakasih donasinya :)\njika mau donasi pulsa silahkan chat saya (bot)`
    var pagi = ['pagi', 'jg', 'pgi jga', 'pgi', 'pagi']
    var sapa = ['hai', 'hello', 'hai kak', 'siapa?', 'ada apa', 'ya?', 'ada apa ya?', 'y', 'ya', 'ada apa kak', 'ya ada apa', 'ada yang bisa saya bantu?', 'hmm', 'oh yes', 'oh no', 'kenapa bang', 'ada apa bang', 'muehehehe']
    var syg = ['ngp sayang', 'apa sayang', 'apa bebeb', 'apa beb', 'opo', 'apo', 'ngp', 'apaan', 'apoh syang', 'ap beb', 'ngp beb', 'yo sayang']
    var lgpp = ['lagi guling', 'lagi ngoleng', 'lagi makan', 'lagi nonton', 'lagi nonton youtube', 'lagi boring', 'mager', 'bosen', 'bosan', 'pening', 'pusing', 'lgi bnyak tugas', 'lagi baperan', 'laper', 'makan', 'nk mandi', 'kepanasan']
    const time = moment(t * 1000).format('HH:mm:ss')
    const botNumber = await rahman.getHostNumber();
    const battery = await rahman.getBatteryLevel();
    const blockNumber = await rahman.getBlockedIds();
    const groupId = isGroupMsg ? chat.groupMetadata.id : ''
    const groupAdmins = isGroupMsg ? await rahman.getGroupAdmins(groupId) : ''
    const isGroupAdmins = isGroupMsg ? groupAdmins.includes(sender.id) : false
    const isBotGroupAdmins = isGroupMsg ? groupAdmins.includes(botNumber + '@c.us') : false
    // const isAdmin = kode.indexOf(lend)==-1
    // if (maintance.indexOf(lend) == -1) { return 'ok' }
    const isOwner = ownerNumber.includes(sender.id)
    const isBlocked = blockNumber.indexOf(sender.id) === -1
    const uaOverride = 'WhatsApp/2.2029.4 Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.116 Safari/537.36'
    const isUrl = new RegExp(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&/=]*)/gi)
    if (!isGroupMsg && command.startsWith('')) console.log('\x1b[1;31m~\x1b[1;37m>', '[\x1b[1;32mEXEC\x1b[1;37m]', time, color(msgs(command)), 'from', color(pushname))
    if (isGroupMsg && command.startsWith('')) console.log('\x1b[1;31m~\x1b[1;37m>', '[\x1b[1;32mEXEC\x1b[1;37m]', time, color(msgs(command)), 'from', color(pushname), 'in', color(formattedTitle))
    if (!isGroupMsg && !command.startsWith('')) console.log('\x1b[1;33m~\x1b[1;37m>', '[\x1b[1;31mMSG\x1b[1;37m]', time, color(body), 'from', color(pushname))
    if (isGroupMsg && !command.startsWith('')) console.log('\x1b[1;33m~\x1b[1;37m>', '[\x1b[1;31mMSG\x1b[1;37m]', time, color(body), 'from', color(pushname), 'in', color(formattedTitle))
    // if (isBlocked) return rahman.reply(from, 'Hey hey orang yang sudah di blok tidak bisa gunakan bot',id)

    function rndm(isi) { return Math.floor(Math.random() * isi) + 1 }

    switch (command) {
      case 'akunnord': //work
        cekUmum = await blockCek(body.toLowerCase());
        if (cekUmum) {
          rahman.reply(from, cekUmum, id)
        } else {
          var hasil = await axios.get('https://raw.githubusercontent.com/cr4r/ceknord/main/akun')
          var dataanya = hasil.data.split('\n');

          rahman.reply(from, dataanya[rndm(dataanya.length)], id);
        };
        break

      // case 'save':
      //     if (isMedia && type === 'image' || type === 'document' || quotedMsg && quotedMsg.type === 'document' || quotedMsg.type === 'image') {
      //         const dokun = await decryptMedia(quotedMsg, uaOverride)
      //         var datnya = dokun.toString('utf-8')
      //         fs.writeFile(`log/${quotedMsg.filename}`, 'hidup', (err) => {
      //             if (err) return console.log(err)
      //             rahman.reply(from, 'File sudah tersimpan, Ingat file tersebut akan hilang tanpa d kasih tau\n\nuntuk mengirim file yang sudah tersimpan\n\nkirimf namafilenya', id)
      //         })
      //     }
      //     break
      case 'undi': //work
        cekUmum = await blockCek(body.toLowerCase(), { isGroupMsg, isGroupAdmins });
        if (cekUmum) return rahman.reply(from, cekUmum, id);

        const memberNya = await rahman.getGroupMembers(groupId);
        let hayiu = '';
        if (args.length === 1) { var pesannyaa = '' } else { var pesannyaa = body.split('undi ')[1] };
        for (let i = 0; i < memberNya.length; i++) { hayiu += `@${memberNya[i].id.replace(/@c.us/g, '')},` };
        await sleep(2000);
        var orangg = hayiu.split(',')[rndm(hayiu.split(',').length)];
        rahman.sendTextWithMentions(from, `${orangg}\n\n${pesannyaa}`, id);
        break

      case 'sibuk': //work
        if (args.length === 1) return rahman.reply(from, `sibuk on/off`, id);
        if (!isOwner) return rahman.reply(from, 'Fitur hanya owner yang bisa :p', id);

        var onof = body.split(' ')[1]
        if (onof === 'on') {
          fs.writeFile('lib/maintence', 'hidup', (err) => {
            if (err) return console.log(err)
            rahman.reply(from, 'Maintence Hidup', id)
          })
        } else {
          fs.writeFile('lib/maintence', 'mati', (err) => {
            if (err) return console.log(err)
            rahman.reply(from, 'Maintence telah Mati', id)
          })
        }
        break

      case '.gabut':
        rahman.reply(from, gabutKom, id)
        break

      case '.other':
        rahman.reply(from, otherKom, id)
        break

      case '.website':
        rahman.reply(from, webKom, id)
        break

      case '.grub':
        rahman.reply(from, grubKom, id)
        break

      case '.download':
        rahman.reply(from, downKom, id)
        break

      case 'qrcode': //work
        cekUmum = await blockCek(body.toLowerCase(), { isGroupMsg });
        if (cekUmum) return rahman.reply(from, cekUmum, id);

        if (args.length === 1) return rahman.reply(from, 'Kirim perintah *qrcode [query]*\nContoh : *qrcode rahman bot*', id);
        var qrcodes = body.slice(7);
        rahman.sendFileFromUrl(from, `https://api.qrserver.com/v1/create-qr-code/?size=500x500&data=${qrcodes}`, 'gambar.png', donasi, id);
        break
      // case 'cari': //work
      //     if (kotor(body.toLowerCase()) === 'ok') return rahman.reply(from, jagaOmongan, id);
      //     if (cek() === 'ok') return rahman.reply(from, maintan, id);
      //     if (args.length === 1) return rahman.reply(from, `Masukkan gambar apa yang mau dicari\n\nContoh:\ncari boruto`, id);
      //     var cr = body.slice(5);
      //     var urlny = "https://api.fdci.se/rep.php?gambar=" + cr;
      //     axios.get(urlny).then((result) => {
      //         var jsnn = JSON.parse(JSON.stringify(result.data));
      //         if (jsnn[1] === null) return rahman.reply(from, 'Maaf gambar yang anda cari tidak ada', id);
      //         var dapt = jsnn[Math.floor(Math.random() * jsnn.length)];
      //         rahman.sendFileFromUrl(from, dapt, 'cari.jpg', `Mantap gak?\n\n${donasi}`, id)
      //     });
      //     break

      case 'dadu': //work
        cekUmum = await blockCek(body.toLowerCase(), { isGroupMsg });
        if (cekUmum) return rahman.reply(from, cekUmum, id);

        const dice = Math.floor(Math.random() * 6) + 1;
        rahman.sendStickerfromUrl(from, 'https://www.random.org/dice/dice' + dice + '.png', { method: 'get' }, id);
        break

      case 'koin':
        cekUmum = await blockCek(body.toLowerCase(), { isGroupMsg });
        if (cekUmum) return rahman.reply(from, cekUmum, id);

        const side = Math.floor(Math.random() * 2) + 1;
        if (side == 1) { rahman.sendStickerfromUrl(from, 'https://i.ibb.co/YTWZrZV/2003-indonesia-500-rupiah-copy.png', { method: 'get' }, id) } else { rahman.sendStickerfromUrl(from, 'https://i.ibb.co/bLsRM2P/2003-indonesia-500-rupiah-copy-1.png', { method: 'get' }, id) };
        break

      case 'img': //work
        cekUmum = await blockCek(body.toLowerCase());
        if (cekUmum) return rahman.reply(from, cekUmum, id);

        if (quotedMsg && quotedMsg.type == 'sticker') {
          const mediaData = await decryptMedia(quotedMsg);
          const imageBase64 = `data:${quotedMsg.mimetype};base64,${mediaData.toString('base64')}`;
          rahman.sendFile(from, imageBase64, 'imagesticker.jpg', `Sukses Convert Sticker ke Image!\n\n${donasi}`, id)
        } else if (!quotedMsg) return rahman.reply(from, 'tag sticker yang ingin dijadikan gambar!', id);
        break

      // case 'sh': //belum
      //     if (kotor(body.toLowerCase()) === 'ok') return rahman.reply(from, jagaOmongan, id);
      //     if (cek() === 'ok') return rahman.reply(from, maintan, id);
      //     if (!isBlocked) return rahman.reply(from, 'Hey hey orang yang sudah di blok tidak bisa gunakan bot', id);
      //     if (!isOwner) return rahman.reply(from, 'Mau apa om?, aku bot tapi gak sebodoh itu menerima perintah sembarangan :p', id);
      //     if (args.length === 1) return rahman.reply(from, `Ketik\nsh commandnya`, id);
      //     psn = body.split('sh ')[1];
      //     exec(`${psn}`, (error, stdout) => { if (error) { rahman.reply(`ERROR => ${error}`) } else { rahman.reply(from, `${stdout}`, id) } });
      //     break
      case 'scan':
        cekUmum = await blockCek(body.toLowerCase());
        if (cekUmum) return rahman.reply(from, cekUmum, id);

        var outn = `./log/output`;
        var outj = `./log/output.jpg`;
        if (isMedia && type === 'image') {
          const mediaData = await decryptMedia(message, uaOverride);
          fs.writeFile(outj, mediaData, (err) => { if (err) return rahman.reply(from, `Error gan\n\n${err}`, id) });
          exec(`tesseract ${outj} ${outn} --dpi 150`, (error, stdout) => {
            if (error) return rahman.reply(`ERROR => ${error}`);
            rahman.sendFile(from, `${outn}.txt`, 'output.txt', '', id);
            rahman.reply(from, `${donasi}`, id);
            exec(`rm ${outn}.txt'`)
          })
        } else if (quotedMsg && quotedMsg.type == 'image') {
          const mediaData = await decryptMedia(quotedMsg, uaOverride);
          fs.writeFile(outj, mediaData, (err) => { if (err) return rahman.reply(from, `Error gan\n\n${err}`, id) });
          exec(`tesseract ${outj} ${outn} --dpi 150`, (error, stdout) => {
            if (error) return rahman.reply(`ERROR => ${error}`);
            rahman.sendFile(from, outn + '.txt', 'output.txt', '', id);
            rahman.reply(from, `${donasi}`, id);
            exec(`rm ${outn}.txt'`)
          })
        } else if (args.length === 2 && body.split(' ')[2].match(isUrl)) {
          var lnk = body.split(' ')[2];
          exec(`wget -O ${outj} ${lnk}&&tesseract ${outj} ${outn} --dpi 150`, (error, stdout) => {
            if (error) { rahman.reply(from, `ERROR => ${error.message}`, id) };
            rahman.sendFile(from, `${outn}.txt`, 'output.txt', '', id);
            rahman.reply(from, `${donasi}`, id);
            exec(`rm ${outn}.txt'`)
          })
        } else { rahman.reply(from, 'Halo kak, silahkan Baca Ya!\nScan adalah  sebuah fitur yang bisa mengenali character, huruf atau angka dalam sebuah  dokumen photo dan juga bisa menjadi fungsi scaner untuk sebuah objek yang terdapat tulisan sehingga menjadi output berupa teks di perangkat smartphone maupun pc.\n\nAda 3 Cara Penggunaannya:\n1. kirim lah sebuah gambar yang berisikan teks dan sebuah pesan scan\n2.Tag lah sebuah foto yang berisikan teks dengan pesan/caption scan\n3.ketiklah \nscan urlGambarnya') }
        break

      case 'gmail':
        cekUmum = await blockCek(body.toLowerCase(), { isBlocked });
        if (cekUmum) return rahman.reply(from, cekUmum, id);

        if (args.length <= 1) return rahman.reply(from, `Fitur gmail adalah sebuah trik untuk memanipulasi sebuah email agar disaat menshare email kita tidak perlu kasih tau email aslinya, cukup kasih tau dengan hasil email di fitur ini.\nContoh:\nKirim lah email kita dari hasil generate, maka akan muncul pesan yang kita kirim kan ke email asli tanpa mengirimnya ke email asli, bingung ya? aku juga bingung kek gak ada kerjaan hehe.\n\nCara penggunaannya:\nmisalkan kita mempunyai email rahman@gmail.com, maka ketiklah perintah\nemail rahman\n\n*tidak perlu mengetik @gmail.com*`, id);
        var usern = body.split(' ')[1].replace('@gmail.com', '');
        gmal(usrn).then((aaa) => { if (aaa.status === 'ok') { rahman.reply(from, `${donasi}\n\nSpeed: ${processTime(t, moment())} _Detik_\n\n${aaa.mail}`, id) } else { rahman.reply(from, `Gagal Gan, silahkan coba lagi dalam beberapa detik`, id) } });
        break

      case '#kode':
        cekUmum = await blockCek(body.toLowerCase(), { isGroupMsg });
        if (cekUmum) return rahman.reply(from, cekUmum, id);
        rahman.reply(from, `Halo kak, Kode ini untuk fitur trans, kode ini digunakan untuk mentranslate ke tujuan\nMisalkan dari bahasa indonesia ke jepang, jadi gunakan kode *ja*\n\nar = Arabic\nbg = Nulgarian\nzh-CHS = Chinese Simplifed\nzh-CHT = Chinese Traditional\ncs = Czech\nda = Danish\nnl = Dutch\nen = english\net = Estonian\nfr = French\nde = German\nel = Greek\nhi = Hindi\nid = Indonesia\nit = Italian\nja = Japanse\nko = Korean\nms = Malaysia\npt = Portugis\nru = Rusia\nth = Thailand\ntr = Turkish\nvi = Vietnam`, id);
        break

      case 'trans':
        cekUmum = await blockCek(body.toLowerCase(), { isBlocked });
        if (cekUmum) return rahman.reply(from, cekUmum, id);

        if (args.length <= 2) return rahman.reply(from, `Maaf, format pesan salah.\nSilahkan reply sebuah pesan dengan caption translate <kode_bahasa>\nnContoh:\ntrans Hello word .id`, id);
        kode = ['ar', 'bg', 'zh-CHS', 'zh-CHT', 'cs', 'da', 'nl', 'en', 'et', 'fr', 'de', 'el', 'hi', 'id', 'it', 'ja', 'ko', 'ms', 'pt', 'ru', 'th', 'tr', 'vi'];
        var lend = body.split('./')[1];
        var psnn = body.split('trans ')[1].split('./')[0];
        console.log(kode.indexOf(lend));
        if (kode.indexOf(lend) == -1) { rahman.reply(from, 'Salah kodenya\nKetik *#kode* untuk melihat kode translate\n\nContoh:\ntrans Hello word ./id', id) } else { tranlstae(psnn, lend).then((result) => rahman.reply(from, result, id)) }
        break

      // case 'short':
      //     if (kotor(body.toLowerCase()) === 'ok') return rahman.reply(from, jagaOmongan, id)
      //     if (cek() === 'ok') return rahman.reply(from, maintan, id)
      //     if (!isBlocked) return rahman.reply(from, 'Hey hey orang yang sudah di blok tidak bisa gunakan bot', id)
      //         /*Fitur ini hanya bisa digunakan jika anda mempunyai server sendiri bukan dari cloud
      //         Cara penggunaannya:, buat lah fitur short url menggunakan apache atau apalah di server anda
      //         Lalu editlah variabel loks ,userLinuxnya dan lik*/
      //     if (args.length <= 2) return rahman.reply(from, 'Fitur Short adalah pemendek url yang dituju, cara kerjanya sama seperti bit.ly , goo.gl dan website lainnya.\n\nCara penggunaan fitur ini\nContoh:\nshort google https://google.com', id)
      //     var userLinuxnya = 'ubuntu:ubuntu'
      //     var lik = 'https://rahman.me/'
      //     var loks = '/var/www/html/link'
      //     var nam = body.split(' ')[1]
      //     var likk = body.split(' ')[2]
      //     var isLinkud = likk.match(/(?:https?:\/\/)/gi)
      //     if (!isLinkud) return rahman.reply(from, 'Maaf link yang anda masukkan salah!!\n\nContoh:\nshort google https://google.com', id)
      //     if (nam === 'rnd') {
      //         var nam = crypto.randomBytes(4).toString('hex');
      //     } else {
      //         exec(`sudo chown ${userLinuxnya} ${loks}&&ack \'${nam}\' ${loks}`, (error, stdout) => {
      //             if (stdout.split(' ')[0] === nam) {
      //                 rahman.reply(from, 'Maaf nama shortLink anda sudah di pakai, silahkan pakai nama lain', id)
      //             } else {
      //                 exec(`echo \'${nam} ${likk}\'>>${loks}`)
      //                 rahman.reply(from, `Jangan lupa bantu donasinya supaya server tetap hidup :)\n\nLink Pendeknya:\n${lik}${nam}`)
      //             }
      //         })
      //     }
      //     break

      case 'spam': //belum
        cekUmum = await blockCek(body.toLowerCase(), { isBlocked });
        if (cekUmum) return rahman.reply(from, cekUmum, id);

        if (args.length <= 3) return rahman.reply(from, `Halo kak fitur bisa digunakan jika si penerima/pengirim pesan sudah membuka chat (Sudah pernah chatingan sebelumnya), jika belom pernah maka fitur ini tidak akan work.\n\nKetik\nspam [jumlah] [nomornya] [pesan kamu]\n\nContoh:\nspam 5 62822xxxx hay sayang`, id)
        if (body.split(' ')[1] === 'grub') {
          if (!isGroupMsg) return rahman.reply(from, 'Fitur ini hanya bisa di gunakan dalam group', id)
          if (!isGroupAdmins) return rahman.reply(from, 'Perintah ini hanya bisa di gunakan oleh admin group', id)
          var psnn = body.slice(10).split('./')[0]
          limit = body.split('./')[1]
          for (i = 0; i < limit; i++) {
            rahman.reply(from, psnn + `\n\nPesan dari https://wa.me/${sender.id}`.replace(`@c.us`, ''))
          }
        } else {
          var limit = body.split(' ')[1]
          var nomor = body.split(' ')[2].replace("@", "").replace("c.us", "")
          let messageIndex = body.indexOf(nomor) + nomor.length;
          let psn = body.slice(messageIndex, body.length);
          if (isOwner) {
            if (nomor.length < 6) {
              rahman.reply(from, 'Maaf nomor yang anda masukkan salah\nHarap masukkan kode negara+nomor\n\nKetik\nspam [jumlah] [nomornya] [pesan kamu]\n\nContoh:\nspam 5 62822xxxx hay sayang')
            } else {
              let messageIndex = body.indexOf(nomor) + nomor.length;
              let pesn = body.slice(messageIndex, body.length);
              console.log(`Pesan :${psn}\nNomor: ${nomor + '@c.us'}`)
              for (i = 0; i < limit; i++) {
                rahman.sendText(nomor + `@c.us`, psn + `\n\nPesan dari https://wa.me/${sender.id}`.replace(`@c.us`, ''))
              }
            }
          } else {
            if (limit > 22) {
              rahman.reply(from, 'Gak ada akhlak\nBatasan spam hanya 20 pesan', id)
            } else if (limit.length < 21) {
              if (nomor.length < 6) {
                rahman.reply(from, 'Maaf nomor yang anda masukkan salah\nHarap masukkan kode negara+nomor\n\nKetik\nspam [jumlah] [nomornya] [pesan kamu]\n\nContoh:\nspam 5 62822xxxx hay sayang', id)
              } else {

                console.log(`Pesan :${psn}\nNomor: ${nomor + '@c.us'}`)
                for (i = 0; i < limit; i++) {
                  rahman.sendText(nomor + `@c.us`, psn + `\n\nPesan dari https://wa.me/${sender.id}`.replace(`@c.us`, ''))
                }
              }
            } else {
              rahman.reply(from, 'hemmm eror gan', id)
            }
          }
        }
        break

      case 'nmap':
        cekUmum = await blockCek(body.toLowerCase(), { isBlocked });
        if (cekUmum) return rahman.reply(from, cekUmum, id);

        if (args.length === 1) return rahman.reply(from, `Ketik\nmap linknya`, id);
        var pesan = body.split(' ')[1].replace(';', '').replace('\&\&', '');
        exec(`nmap ${pesan}`, (error, stdout) => { if (error) { rahman.reply(from, `ERROR => ${error}`, id) } else { rahman.reply(from, `${stdout}`, id) } });
        break

      case 'wget':
        cekUmum = await blockCek(body.toLowerCase(), { isBlocked });
        if (cekUmum) return rahman.reply(from, cekUmum, id);

        if (args.length === 1) return rahman.reply(from, `Ketik\nwget https://linknya`, id)
        var pesan = body.split(' ')[1].replace(';', '').replace('\&\&', '');
        var namaFile = url3.parse(pesan).pathname.split('/').pop();
        if (namaFile === '') { namaFile = pesan.replace('https://', '').replace('http://', '') }
        exec(`wget ${pesan} -O log/${namaFile}`, (error, stdout) => {
          if (error) {
            rahman.reply(from, `ERROR => ${error}`, id);
          } else {
            rahman.sendFile(from, `./log/${namaFile}`, `${namaFile}`, '', id)
            exec(`rm ./log/${namaFile}`)
          }
        });
        break

      case 'ping':
        cekUmum = await blockCek(body.toLowerCase(), { isBlocked });
        if (cekUmum) return rahman.reply(from, cekUmum, id);

        statusServer(rahman);
        break

      case 'pantun':
        cekUmum = await blockCek(body.toLowerCase(), { isBlocked });
        if (cekUmum) return rahman.reply(from, cekUmum, id);

        const fetch = require("node-fetch");
        fetch('https://raw.githubusercontent.com/cr4r/text/main/pantun').then(res => res.text()).then(body => {
          let tod = body.split("\n");
          let pjr = tod[Math.floor(Math.random() * tod.length)];
          rahman.reply(from, `${pjr.replace(/grs/g, "\n")}\n\n${donasi}`, id)
        });
        break

      case '.cewe':
        cekUmum = await blockCek(body.toLowerCase(), { isBlocked });
        if (cekUmum) return rahman.reply(from, cekUmum, id);

        var items = ["ullzang girl", "cewe cantik", "cewe hijab", "hijaber", "hijab cantik", "korean girl"];
        var cewe = items[Math.floor(Math.random() * items.length)];
        var apalo = "http://api.fdci.se/rep.php?gambar=" + cewe;
        axios.get(apalo).then((result) => {
          var b = result.data;
          var cewek = b[Math.floor(Math.random() * b.length)];
          rahman.sendFileFromUrl(from, cewek, 'cewe.jpg', `Aku cantik gak\n\n${donasi}`, id)
        });
        break

      case '.cowo':
        cekUmum = await blockCek(body.toLowerCase(), { isBlocked });
        if (cekUmum) return rahman.reply(from, cekUmum, id);

        var items = ["ullzang boy", "cowo ganteng", "cogan", "korean boy", "jepang boy", "cowo korea"];
        // var a = url.match(/(?:https?:\\\/{2})?i.pinimg.com\/originals\/([^\s&]+)/)
        var cewe = items[Math.floor(Math.random() * items.length)];
        var apalo = "http://api.fdci.se/rep.php?gambar=" + cewe;
        axios.get(apalo).then((result) => {
          var b = JSON.parse(JSON.stringify(result.data));
          var cewek = b[Math.floor(Math.random() * b.length)];
          rahman.sendFileFromUrl(from, cewek, 'cowo.jpg', `aku ganteng gak\n\n${donasi}`, id)
        });
        break

      case 'hitung':
        cekUmum = await blockCek(body.toLowerCase(), { isBlocked });
        if (cekUmum) return rahman.reply(from, cekUmum, id);

        try { rahman.reply(from, `*Kalkulator*\n${body.slice(7)} = ${evaluate(body.slice(7)).toString()}\n\n${donasi}`) } catch (err) { rahman.reply(from, `anda salah masukkan symbol\n* : perkalian\n/ : pembagian\n+ : pertambahan\n- : pengurangan\n\nContoh Penggunaan: ͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏\n   hitung 1.2*(2 + 4.5)  //7.8\n   hitung 9/3+2i  //3+2i\n   hitung det([-1, 2; 3, 1])  //-7\n   hitung 12.7 cm to inch  //5\n\n${err}`) }
        break

      case 'pow':
        cekUmum = await blockCek(body.toLowerCase(), { isBlocked });
        if (cekUmum) return rahman.reply(from, cekUmum, id);

        try {
          var a = JSON.parse(JSON.stringify(body.slice(4).split('#')[0].toString()))
          var b = JSON.parse(JSON.stringify(body.slice(4).split('#')[1].toString()))
          rahman.reply(from, `*Perpangkatan*\n${a}\^${b} = ${pow(a, b).toString()}`)
        } catch (err) {
          rahman.reply(from, `Salah: ${a}\n anda salah masukkan symbol\n* : perkalian\n/ : pembagian\n+ : pertambahan\n- : pengurangan\n\nContoh Penggunaan: ͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏\n   *pow 3#2*\n\n# adalah pembatasan untuk perpangkatan\n\n${err}`)
          // *pow [[-1, 2],[3, 1]],2*
        }
        break

      case 'round':
        cekUmum = await blockCek(body.toLowerCase(), { isBlocked });
        if (cekUmum) return rahman.reply(from, cekUmum, id);

        try {
          console.log(body.slice(6));
          var a = body.slice(6).split(',')[0];
          var b = body.slice(6).split(',')[1];
          rahman.reply(from, `*Pembulatan dari*\n${body.slice(6)} = ${round(a, b).toString()}\n\n${donasi}`)
        } catch (err) { rahman.reply(from, `Salah\nContoh Penggunaan:\nround 3.4956,2\nround 34.987,0\n,0-15 untuk menampilkan angka dibelakang koma\n\n${err}`) }
        break

      case 'lg':
      case 'lagi':
      case 'lgi':
        ac = aca(lgpp)
        if (body.split(' ')[1] === 'ngp' || body.split(' ')[1] === 'apa' || body.split(' ')[1] === 'ap' || body.split(' ')[1] === 'ngpo' || body.split(' ')[1] === 'apo') return rahman.reply(from, ac, id)
        break

      case 'selamat':
      case 'slamat':
      case 'slmat':
      case 'slmt':
        ac = aca(pagi)
        if (body.split(' ')[1] === 'pagi' || body.split(' ')[1] === 'pgi' || body.split(' ')[1] === 'pg') return rahman.reply(from, ac, id)
        break

      case 'cintaku':
      case 'sayangku':
      case 'syg':
      case 'sayang':
      case 'syang':
      case 'zheyeng':
      case 'suyung':
        ac = aca(syg)
        rahman.reply(from, ac, id)
        break

      case 'hai':
      case 'bot':
      case 'bot?':
      case 'hi':
      case 'hello':
      case 'hay':
      case 'kak':
      case 'ini bot':
        if (body.split(' ')[0] === 'kak') {
          return rahman.reply(from, `Ada apa kak ~ Bot`, id)
        }
        ac = aca(sapa)
        rahman.reply(from, `${ac} ~ Bot`, id)
        break

      case "assalamualaikum":
      case "assalamu'alaikum":
        rahman.reply(from, 'Wa\'laikumsalam', id)
        break

      case 'sticker':
      case 'stiker':
        cekUmum = await blockCek(body.toLowerCase(), { isBlocked });
        if (cekUmum) return rahman.reply(from, cekUmum, id);

        if (isMedia && type === 'image') {
          const mediaData = await decryptMedia(message, uaOverride);
          const imageBase64 = `data:${mimetype};base64,${mediaData.toString('base64')}`;
          rahman.reply(from, `${donasi}`, id);
          await rahman.sendImageAsSticker(from, imageBase64, id)
        } else if (quotedMsg && quotedMsg.type == 'image') {
          const mediaData = await decryptMedia(quotedMsg, uaOverride);
          const imageBase64 = `data:${quotedMsg.mimetype};base64,${mediaData.toString('base64')}`;
          rahman.reply(from, `${donasi}`, id);
          await rahman.sendImageAsSticker(from, imageBase64, id)
        } else if (args.length === 2) { const url = args[1]; if (url.match(isUrl)) { await rahman.sendStickerfromUrl(from, url, { method: 'get' }).catch(err => console.log('Caught exception: ', err)) } else { rahman.reply(from, mess.error.Iv, id) } } else { rahman.reply(from, mess.error.St, id) };
        break
      case 'donasi':
      case 'donate':
        rahman.sendLinkWithAutoPreview(from, '', donate)
        break
      case 'tts':
        cekUmum = await blockCek(body.toLowerCase(), { isBlocked });
        if (cekUmum) return rahman.reply(from, cekUmum, id);

        if (args.length === 1) return rahman.reply(from, 'Kirim perintah *tts [id, en, jp, ar] [teks]*, contoh *tts [id] halo semua*')
        const ttsId = require('node-gtts')('id')
        const ttsEn = require('node-gtts')('en')
        const ttsJp = require('node-gtts')('ja')
        const ttsAr = require('node-gtts')('ar')
        const dataText = body.slice(8)
        if (dataText === '') return rahman.reply(from, 'Baka?', id)
        if (dataText.length > 500) return rahman.reply(from, 'Teks terlalu panjang!', id)
        var dataBhs = body.slice(5, 7)
        if (dataBhs == 'id') {
          ttsId.save('./media/tts/resId.mp3', dataText, function () {
            rahman.sendPtt(from, './media/tts/resId.mp3', id)
          })
        } else if (dataBhs == 'en') {
          ttsEn.save('./media/tts/resEn.mp3', dataText, function () {
            rahman.sendPtt(from, './media/tts/resEn.mp3', id)
          })
        } else if (dataBhs == 'jp') {
          ttsJp.save('./media/tts/resJp.mp3', dataText, function () {
            rahman.sendPtt(from, './media/tts/resJp.mp3', id)
          })
        } else if (dataBhs == 'ar') {
          ttsAr.save('./media/tts/resAr.mp3', dataText, function () {
            rahman.sendPtt(from, './media/tts/resAr.mp3', id)
          })
        } else {
          rahman.reply(from, 'Kirim perintah *tts [id, en, jp, ar] [teks]*, contoh *tts [id] halo semua*', id)
        }
        break
      case 'tulis':
      case 'nulis':
        cekUmum = await blockCek(body.toLowerCase(), { isBlocked });
        if (cekUmum) return rahman.reply(from, cekUmum, id);

        if (args.length === 1) return rahman.reply(from, 'Kirim perintah *nulis [teks]*', id)
        let text = body.slice(6)
        let bb = []
        //for(let i=0, ilen=text11.length;i<ilen;i+=80){bb.push(text11.substring(i, i+80))}
        //let text = bb.join('\n')
        // rahman.reply(from, mess.wait, id)
        const splitText = text.replace(/(\S+\s*){1,10}/g, '$&\n')
        const fixHeight = splitText.split('\n').slice(0, 25).join('\n')
        //huruf 54 baris baru 700
        spawn('convert', [
          './media/img/before.jpg',
          '-font', 'Indie-Flower',
          '-size', '50x960',
          '-pointsize', '22',
          '-interline-spacing', '17',
          '-annotate', '+170+222',
          fixHeight, './log/after.jpg'
        ]).on('error', () => rahman.reply(from, `Error gan`, id)).on('exit', () => {
          rahman.sendImage(from, './log/after.jpg', 'nulis.jpg', `Nih kak\n\n${donasi}\nDitulis oleh bot rahman`, id)
          exec(`rm ./log/after.jpg`)
        })
        break
      // case 'yt':
      //     if (kotor(body.toLowerCase()) === 'ok') return rahman.reply(from, jagaOmongan, id);
      //     if (cek() === 'ok') return rahman.reply(from, maintan, id);
      //     if (!isBlocked) return rahman.reply(from, 'Hey hey orang yang sudah di blok tidak bisa gunakan bot', id)
      //     if (args.length <= 2) return client(from, `Contoh Penggunaan:\nyt mp3 https://linkyoutube\nyt mp4 https://linkyoutube`)
      //     var piliha = body.split(' ')[1];
      //     var linkk = body.split(' ')[2]
      //     console.log(linkk)
      //     var headers = { 'User-Agent': 'Super Agent/0.0.1', 'Content-Type': 'application/x-www-form-urlencoded' }
      //     try {
      //         if (piliha === 'mp3') {
      //             try {
      //                 yts(linkk).then((a) => {
      //                     if (a.durasi.split(':').length >= 3) return rahman.reply(from, 'Video yang kamu inginkan lebih dari 1 jam. aku gak kuat mas\nkecuali kamu donasi 10k ke nomor 6282237416678', id)
      //                     rahman.sendFileFromUrl(from, a.thumb, 'thumb.jpg', `➸ *Judul* : ${a.judul}\nUpload: ${a.upload}\nViewers: ${a.view}\nDurasi: ${a.durasi}\nYoutube: ${a.username}\n\n${donasi}\n\nSilahkan tunggu sebentar proses pengiriman file membutuhkan waktu beberapa menit.`, id)
      //                     ytmp3(a.url).then((b) => {
      //                         rahman.sendFileFromUrl(from, b, a.judul, '', id)
      //                     })
      //                 })
      //             } catch (error) {
      //                 rahman.reply(from, 'Error gan, ulangi setelah 10 detik', id)
      //             }
      //         } else if (piliha === 'mp4') {
      //             try {
      //                 yts(linkk).then((a) => {
      //                     if (a === 'error') return rahman.reply(from, 'Link salah', id)
      //                     if (a.durasi.split(':').length >= 3) return rahman.reply(from, 'Video yang kamu inginkan lebih dari 1 jam. aku gak kuat mas\nkecuali kamu donasi 10k ke nomor 6282237416678', id)
      //                     ytmp4(a.url).then((b) => {
      //                         rahman.sendFileFromUrl(from, b.url, a.judul, `➸ *Judul* : ${a.judul}\nUpload: ${a.upload}\nViewers: ${a.view}\nDurasi: ${a.durasi}\nYoutube: ${a.username}\n\n${donasi}`, id)
      //                     })
      //                 })
      //             } catch (error) {
      //                 rahman.reply(from, 'Error gan, ulangi setelah 10 detik', id)
      //             }
      //         } else {
      //             rahman.reply(from, 'Maaf gans seharusnya\nyt mp3 linkyoutubenya\natau\nyt mp4 linkyoutubenya', id)
      //         }
      //     } catch (error) {
      //         rahman.sendText(ownerNumber, 'Error Gans : ' + error)
      //         rahman.reply(from, mess.error.Yt4, id)
      //     }
      //     break

      // case 'play':
      //     if (kotor(body.toLowerCase()) === 'ok') return rahman.reply(from, jagaOmongan, id);
      //     if (cek() === 'ok') return rahman.reply(from, maintan, id);
      //     if (!isBlocked) return rahman.reply(from, 'Hey hey orang yang sudah di blok tidak bisa gunakan bot', id);
      //     if (args.length === 1) return rahman.reply(from, 'Kirim perintah *play nama lagu*, untuk contoh silahkan kirim perintah *play goyang dumang*');
      //     let keyword = body.slice(5);
      //     try {
      //         yts(keyword).then((a) => {
      //             if (a === 'error') return rahman.reply(from, 'error gan gtw apa penyebabnya, silahkan lapor ke owner bot', id);
      //             if (a.durasi.split(':').length >= 3) return rahman.reply(from, 'Video yang kamu inginkan lebih dari 1 jam. aku gak kuat mas\nkecuali kamu donasi 10k ke nomor 6282237416678', id);
      //             rahman.sendFileFromUrl(from, a.thumb, 'thumb.jpg', `➸ *Judul* : ${a.judul}\nUpload: ${a.upload}\nViewers: ${a.view}\nDurasi: ${a.durasi}\nYoutube: ${a.username}\n\n${donasi}\n\nSilahkan tunggu sebentar proses pengiriman file membutuhkan waktu beberapa menit.`, id);
      //             ytmp3(a.url).then((b) => { rahman.sendFileFromUrl(from, b, a.judul, '', id) })
      //         })
      //     } catch (error) { rahman.reply(from, 'Error gan, ulangi setelah 10 detik', id) }
      //     break
      case 'creator':
        cekUmum = await blockCek(body.toLowerCase(), { isBlocked });
        if (cekUmum) return rahman.reply(from, cekUmum, id);

        rahman.sendContact(from, '6282237416678@c.us')
        break
      case 'welcome':
        cekUmum = await blockCek(body.toLowerCase(), { isBlocked, isGroupMsg, isGroupAdmins });
        if (cekUmum) return rahman.reply(from, cekUmum, id);

        if (args.length === 1) return rahman.reply(from, 'Pilih enable atau disable!', id)
        if (args[1].toLowerCase() === 'enable') {
          welkom.push(chat.id)
          fs.writeFileSync('./lib/welcome.json', JSON.stringify(welkom))
          rahman.reply(from, 'Fitur welcome berhasil di aktifkan di group ini!', id)
        } else if (args[1].toLowerCase() === 'disable') {
          welkom.splice(chat.id, 1)
          fs.writeFileSync('./lib/welcome.json', JSON.stringify(welkom))
          rahman.reply(from, 'Fitur welcome berhasil di nonaktifkan di group ini!', id)
        } else {
          rahman.reply(from, 'Pilih enable atau disable !', id)
        }
        break
      case 'buatquote':
      case 'quotesmaker':
      case 'quotemaker':
        cekUmum = await blockCek(body.toLowerCase(), { isBlocked });
        if (cekUmum) return rahman.reply(from, cekUmum, id);

        arg = body.split('|');
        if (arg.length >= 4) {
          rahman.reply(from, mess.wait, id);
          const quotes = arg[1];
          const author = arg[2];
          const theme = arg[3];
          await quotemaker(quotes, author, theme).then(amsu => { rahman.sendFile(from, amsu, 'quotesmaker.jpg', 'nih gans...').catch(() => { rahman.reply(from, mess.error.Qm, id) }) })
        } else { rahman.reply(from, 'Cara Penggunaan: \nquotemaker |teks|watermark|theme\nContoh :\nquotemaker |ini contoh|bicit|random', id) }
        break
      case 'linkgroup':
        cekUmum = await blockCek(body.toLowerCase(), { isBlocked, isBotGroupAdmins });
        if (cekUmum) return rahman.reply(from, cekUmum, id);

        if (isGroupMsg) {
          const inviteLink = await rahman.getGroupInviteLink(groupId);
          rahman.sendLinkWithAutoPreview(from, inviteLink, `\nLink group *${name}*`)
        } else {
          rahman.reply(from, 'Perintah ini hanya bisa di gunakan dalam group!', id)
        }
        break

      case 'bc':
        cekUmum = await blockCek(body.toLowerCase(), { isOwner });
        if (cekUmum) return rahman.reply(from, cekUmum, id);

        let msg = body.slice(3)
        const chatz = await rahman.getAllChatIds()
        for (let ids of chatz) {
          var cvk = await rahman.getChatById(ids)
          if (!cvk.isReadOnly) await rahman.sendText(ids, `[ rahman BOT Broadcast ]\n\n${msg}`)
        }
        rahman.reply(from, 'Broadcast Success!', id)
        break

      case 'adminlist':
        cekUmum = await blockCek(body.toLowerCase(), { isBlocked, isGroupMsg });
        if (cekUmum) return rahman.reply(from, cekUmum, id);

        let mimin = ''
        for (let admon of groupAdmins) {
          mimin += `➸ @${admon.replace(/@c.us/g, '')}\n`
        }
        await sleep(2000)
        await rahman.sendTextWithMentions(from, mimin)
        break

      case 'ownergroub':
      case 'ownergrub':
      case 'ownergroup':
        cekUmum = await blockCek(body.toLowerCase(), { isBlocked, isGroupMsg });
        if (cekUmum) return rahman.reply(from, cekUmum, id);

        const Owner_ = chat.groupMetadata.owner
        await rahman.sendTextWithMentions(from, `Owner Group : @${Owner_}`)
        break

      case 'member':
        cekUmum = await blockCek(body.toLowerCase(), { isBlocked, isGroupMsg, isGroupAdmins, isOwner });
        if (cekUmum) return rahman.reply(from, cekUmum, id);

        try {
          const groupMem = await rahman.getGroupMembers(groupId);
          var pesan = body.slice(7);
          if (body.split('member ').length == 1 || body.split('member ')[1] == undefined || body.split('member ')[1] == '') {
            let hehe = `*╭══•›ꪶ ཻུ۪۪ꦽꦼ̷⸙ ━ ━ ━ ━ ꪶ ཻུ۪۪ꦽꦼ̷⸙‹•════\n`;
            hehe += `*╠➥   ✪〘 Hay semuanya 〙✪══\n`;
            for (let i = 0; i < groupMem.length; i++) {
              hehe += '╠➥';
              hehe += ` @${groupMem[i].id.replace(/@c.us/g, '')}\n`
            }
            hehe += `╠➥${donasi}`;
            hehe += '╚═〘 BOT rahman 〙';
            await sleep(2000);
            await rahman.sendTextWithMentions(from, hehe)
          } else {
            let hehe = `╔══✪〘 Hay semuanya 〙✪══\n╠➥✪〘 ADA INFO DARI ADMIN 〙\n╠➥✪〘 ${pesan} 〙 ͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏\n`;
            for (let i = 0; i < groupMem.length; i++) {
              hehe += '╠➥';
              hehe += ` @${groupMem[i].id.replace(/@c.us/g, '')}\n`
            };
            hehe += `╠➥${donasi}`;
            hehe += '╚═〘 BOT rahman 〙';
            await sleep(2000);
            await rahman.sendTextWithMentions(from, hehe)
          }
        } catch (err) {
          const groupMem = await rahman.getGroupMembers(groupId);
          let hehe = `╔══✪〘 Hay semuanya 〙✪══\n`;
          for (let i = 0; i < groupMem.length; i++) {
            hehe += '╠➥';
            hehe += ` @${groupMem[i].id.replace(/@c.us/g, '')}\n`
          };
          hehe += '╚═〘 BOT rahman 〙';
          await sleep(2000);
          await rahman.sendTextWithMentions(from, hehe)
        };
        break

      case 'kickall':
        const isGroupOwner = sender.id === chat.groupMetadata.owner
        cekUmum = await blockCek(body.toLowerCase(), { isBlocked, isGroupMsg, isGroupAdmins, isGroupOwner, isOwner });
        if (cekUmum) return rahman.reply(from, cekUmum, id);

        const allMem = await rahman.getGroupMembers(groupId)
        for (let i = 0; i < allMem.length; i++) {
          if (groupAdmins.includes(allMem[i].id)) {
            console.log('Upss this is Admin group')
          } else {
            await rahman.removeParticipant(groupId, allMem[i].id)
          }
        }
        rahman.reply(from, 'Succes kick all member', id)
        break

      case 'leaveall':
        cekUmum = await blockCek(body.toLowerCase(), { isOwner });
        if (cekUmum) return rahman.reply(from, cekUmum, id);

        const allChats = await rahman.getAllChatIds()
        const allGroups = await rahman.getAllGroups()
        for (let gclist of allGroups) {
          await rahman.sendText(gclist.contact.id, `Maaf bot sedang pembersihan, total chat aktif : ${allChats.length}`)
          await rahman.leaveGroup(gclist.contact.id)
        }
        rahman.reply(from, 'Succes leave all group!', id)
        break

      case 'clearall':
        cekUmum = await blockCek(body.toLowerCase(), { isOwner });
        if (cekUmum) return rahman.reply(from, cekUmum, id);

        const allChatz = await rahman.getAllChats()
        for (let dchat of allChatz) {
          await rahman.deleteChat(dchat.id)
        }
        rahman.reply(from, 'Succes clear all chat!', id)
        break

      case 'add':
        if (args.length === 1) return rahman.reply(from, 'Untuk menggunakan fitur ini, kirim perintah *add* 628xxxxx', id)

        cekUmum = await blockCek(body.toLowerCase(), { isBlocked, isOwner, isGroupMsg, isGroupAdmins, isBotGroupAdmins });
        if (cekUmum) return rahman.reply(from, cekUmum, id);

        try {
          await rahman.addParticipant(from, `${body.split(' ')}@c.us`)
        } catch {
          rahman.reply(from, mess.error.Ad, id)
        }
        break

      case 'kick':
        cekUmum = await blockCek(body.toLowerCase(), { isBlocked, isOwner, isGroupMsg, isGroupAdmins, isBotGroupAdmins });
        if (cekUmum) return rahman.reply(from, cekUmum, id);

        if (mentionedJidList.length === 0) return rahman.reply(from, 'Untuk menggunakan Perintah ini, kirim perintah *!kick* @tagmember', id)
        await rahman.sendText(from, `Perintah diterima, mengeluarkan:\n${mentionedJidList.join('\n')}`)
        for (let i = 0; i < mentionedJidList.length; i++) {
          if (groupAdmins.includes(mentionedJidList[i])) return rahman.reply(from, mess.error.Ki, id)
          await rahman.removeParticipant(groupId, mentionedJidList[i])
        }
        break

      case '.keluar':
        cekUmum = await blockCek(body.toLowerCase(), { isBlocked, isOwner, isGroupMsg, isGroupAdmins });
        if (cekUmum) return rahman.reply(from, cekUmum, id);

        await rahman.sendText(from, 'Sayonara').then(() => rahman.leaveGroup(groupId))
        break

      case 'admin':
        cekUmum = await blockCek(body.toLowerCase(), { isBlocked, isOwner, isGroupMsg, isGroupAdmins, isBotGroupAdmins });
        if (cekUmum) return rahman.reply(from, cekUmum, id);

        if (mentionedJidList.length === 0) return rahman.reply(from, 'Untuk menggunakan fitur ini, kirim perintah *!promote* @tagmember', id)
        if (mentionedJidList.length >= 2) return rahman.reply(from, 'Maaf, perintah ini hanya dapat digunakan kepada 1 user.', id)
        if (groupAdmins.includes(mentionedJidList[0])) return rahman.reply(from, 'Maaf, user tersebut sudah menjadi admin.', id)

        await rahman.promoteParticipant(groupId, mentionedJidList[0])
        await rahman.sendTextWithMentions(from, `Perintah diterima, menambahkan @${mentionedJidList[0]} sebagai admin.`)
        break

      case 'unadmin':
        cekUmum = await blockCek(body.toLowerCase(), { isBlocked, isGroupMsg, isOwner, isGroupAdmins, isBotGroupAdmins });
        if (cekUmum) return rahman.reply(from, cekUmum, id);

        if (mentionedJidList.length === 0) return rahman.reply(from, 'Untuk menggunakan fitur ini, kirim perintah *!demote* @tagadmin', id)
        if (mentionedJidList.length >= 2) return rahman.reply(from, 'Maaf, perintah ini hanya dapat digunakan kepada 1 orang.', id)
        if (!groupAdmins.includes(mentionedJidList[0])) return rahman.reply(from, 'Maaf, user tersebut tidak menjadi admin.', id)

        await rahman.demoteParticipant(groupId, mentionedJidList[0])
        await rahman.sendTextWithMentions(from, `Perintah diterima, menghapus jabatan @${mentionedJidList[0]}.`)
        break

      case 'join':
        cekUmum = await blockCek(body.toLowerCase(), { isBlocked });
        if (cekUmum) return rahman.reply(from, cekUmum, id);

        if (args.length === 1) return rahman.reply(from, 'Kirim perintah *join* linkgroup\n\nEx:\njoin https://chat.whatsapp.com/blablablablablabla', id)
        const link = body.split(' ')[1]
        const tGr = await rahman.getAllGroups()
        const minMem = 5
        const maxMem = 255
        const isLink = link.match(/(https:\/\/chat.whatsapp.com)/gi)
        const check = await rahman.inviteInfo(link)
        if (!isLink) return rahman.reply(from, 'Ini bukan link grub wa', id)
        const inviteCode = body.split(' ')[1].replace('https://chat.whatsapp.com/', '')
        if (body.split(' ')[1].match(/(https:)/gi)) {
          try {
            await rahman.joinGroupViaLink(inviteCode);
            rahman.reply(from, 'Otw join gan', id);
          } catch (e) {
            rahman.reply(from, 'Sepertinya link grup bermasalah', id);
          }
        } else {
          rahman.reply(from, 'Ini link? 👊🤬', id)
        }
        break
      case 'hapus':
        cekUmum = await blockCek(body.toLowerCase(), { isBlocked, isOwner, isGroupMsg, isGroupAdmins, });
        if (cekUmum) return rahman.reply(from, cekUmum, id);

        if (!quotedMsg) return rahman.reply(from, 'Salah!!, kirim perintah *!delete [tagpesanbot]*', id)
        if (!quotedMsgObj.fromMe) return rahman.reply(from, 'Salah!!, Bot tidak bisa mengahpus chat user lain!', id)

        rahman.deleteMessage(quotedMsgObj.chatId, quotedMsgObj.id, false)
        break

      case 'getses':
        cekUmum = await blockCek(body.toLowerCase(), { isOwner });
        if (cekUmum) return rahman.reply(from, cekUmum, id);

        if (kotor(body.toLowerCase()) === 'ok') return rahman.reply(from, jagaOmongan, id)
        const sesPic = await rahman.getSnapshot()
        rahman.sendFile(from, sesPic, 'session.png', `Nih boss`, id)
        break

      case 'listblock':
        cekUmum = await blockCek(body.toLowerCase(), { isBlocked });
        if (cekUmum) return rahman.reply(from, cekUmum, id);

        let hih = `list blok nomor\nTotal : ${blockNumber.length}\n`
        for (let i of blockNumber) {
          hih += `➸ @${i.replace(/@c.us/g, '')}\n`
        }
        rahman.sendTextWithMentions(from, hih, id)
        break

      case 'quote':
      case 'quotes':
        cekUmum = await blockCek(body.toLowerCase(), { isBlocked });
        if (cekUmum) return rahman.reply(from, cekUmum, id);

        var urll = 'https://jagokata.com/kata-bijak/acak.html'
        axios.get(urll).then((result) => {
          let $ = cheerio.load(result.data);
          var author = $('a[class="auteurfbnaam"]').contents().first().text();
          var kata = $('q[class="fbquote"]').contents().first().text();
          rahman.reply(from, `➸ *Quotes* : _${kata}_\n➸ *Author* : ${author}\n\n${donasi}`, id)
        })
        break

      case 'katacinta':
        cekUmum = await blockCek(body.toLowerCase(), { isBlocked });
        if (cekUmum) return rahman.reply(from, cekUmum, id);

        var urll = 'https://jagokata.com/kata-bijak/kata-cinta.html'
        axios.get(urll).then((result) => {
          let $ = cheerio.load(result.data);
          var author = $('a[class="auteurfbnaam"]').contents().first().text();
          var kata = $('q[class="fbquote"]').contents().first().text();
          rahman.reply(from, `      _${kata}_\n\n    ~ ${author}\n\n${donasi}`, id)
        });
        break

      case 'menu':
      case 'help':
        cekUmum = await blockCek(body.toLowerCase(), { isBlocked });
        if (cekUmum) return rahman.reply(from, cekUmum, id);

        rahman.reply(from, help, id)
        break

      case 'readme':
        cekUmum = await blockCek(body.toLowerCase(), { isBlocked });
        if (cekUmum) return rahman.reply(from, cekUmum, id);

        rahman.reply(from, readme, id)
        break

      case 'info':
        cekUmum = await blockCek(body.toLowerCase(), { isBlocked });
        if (cekUmum) return rahman.reply(from, cekUmum, id);

        rahman.sendLinkWithAutoPreview(from, 'Informasi Bot', info)
        break

      case 'snk':
        cekUmum = await blockCek(body.toLowerCase());
        if (cekUmum) return rahman.reply(from, cekUmum, id);

        rahman.reply(from, snk, id)
        break
    }
  } catch (err) {
    console.log(color('[ERROR]', 'red'), err)
    //rahman.kill().then(a => console.log(a))
  }
}