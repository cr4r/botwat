process.env.TZ = 'Asia/Jakarta';
const { create, Client } = require('@open-wa/wa-automate')
const welcome = require('./lib/welcome')
const msgHandler = require('./msgHndlr')
const options = require('./options');

const start = async (rahman = new Client()) => {
    console.log('[SERVER] Bot Whatsapp sudah mulai!')
    rahman.onStateChanged((state) => {
        console.log('[CLIENT]', state)
        if (state === 'CONFLICT' || state === 'UNLAUNCHED') rahman.forceRefocus()
    })
    // listening on message
    rahman.onMessage((async (message) => {
        rahman.getAmountOfLoadedMessages().then((msg) => {
            if (msg >= 3000) {
                rahman.cutMsgCache()
            }
        })
        msgHandler(rahman, message)
    }))

    // Hilangkan tanda // jika ingin mengaktifkan fiturnya
    //fitur out otomatis
    rahman.onAddedToGroup(((chat) => {
        rahman.sendText(chat.id, `Halo om, kalo mau masukin saya (bot) ke grub, silahkan hubungi wa.me/6282237416678. eeittts gak gratis ya :) (donasi seiklasnya min.5k) bye bye :p`).then(() => rahman.leaveGroup(chat.id)).then(() => rahman.deleteChat(chat.id))
        // let totalMem = chat.groupMetadata.participants.length
        // if (totalMem < 30) { 
        // 	rahman.sendText(chat.id, `Cih member nya cuma ${totalMem}, Kalo mau invite bot, minimal jumlah mem ada 30`).then(() => rahman.leaveGroup(chat.id)).then(() => rahman.deleteChat(chat.id))
        // } else {
        //     rahman.sendText(chat.groupMetadata.id, `Halo warga grup *${chat.contact.name}* terimakasih sudah menginvite bot ini, untuk melihat menu silahkan kirim *!help*`)
        // }
    }))

    /*rahman.onAck((x => {
        const { from, to, ack } = x
        if (x !== 3) rahman.sendSeen(to)
    }))*/

    // listening on Incoming Call
    // rahman.onIncomingCall(( async (call) => {
    //     await rahman.sendText(call.peerJid, 'Maaf, saya tidak bisa menerima panggilan. nelfon = block!')
    //     .then(() => rahman.contactBlock(call.peerJid))
    // }))
}

create(options(true, start))
    .then(rahman => start(rahman))
    .catch((error) => console.log(error))