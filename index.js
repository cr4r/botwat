const { create, Client } = require('@open-wa/wa-automate')
const welcome = require('./lib/welcome')
const msgHandler = require('./msgHndlr')
const options = require('./options')

const start = async (CR4R = new Client()) => {
        console.log('[SERVER] Bot Whatsapp sudah mulai!')
        // Force it to keep the current session
        CR4R.onStateChanged((state) => {
            console.log('[CLIENT]', state)
            if (state === 'CONFLICT' || state === 'UNLAUNCHED') CR4R.forceRefocus()
        })
        // listening on message
        CR4R.onMessage((async (message) => {
            CR4R.getAmountOfLoadedMessages().then((msg) => {
                if (msg >= 3000) {
                    CR4R.cutMsgCache()
                }
            })
            msgHandler(CR4R, message)
        }))

        CR4R.onGlobalParicipantsChanged((async (heuh) => {
            await welcome(CR4R, heuh)
            //left(CR4R, heuh)
        }))

        // Hilangkan tanda // jika ingin mengaktifkan fiturnya
        //fitur out otomatis
        CR4R.onAddedToGroup(((chat) => {
            CR4R.sendText(chat.id, `Halo om, kalo mau masukin saya (bot) ke grub, silahkan hubungi wa.me/6282237416678. eeittts gak gratis ya :) (donasi seiklasnya min.5k) bye bye :p`).then(() => CR4R.leaveGroup(chat.id)).then(() => CR4R.deleteChat(chat.id))
            // let totalMem = chat.groupMetadata.participants.length
            // if (totalMem < 30) { 
            // 	CR4R.sendText(chat.id, `Cih member nya cuma ${totalMem}, Kalo mau invite bot, minimal jumlah mem ada 30`).then(() => CR4R.leaveGroup(chat.id)).then(() => CR4R.deleteChat(chat.id))
            // } else {
            //     CR4R.sendText(chat.groupMetadata.id, `Halo warga grup *${chat.contact.name}* terimakasih sudah menginvite bot ini, untuk melihat menu silahkan kirim *!help*`)
            // }
        }))

        /*CR4R.onAck((x => {
            const { from, to, ack } = x
            if (x !== 3) CR4R.sendSeen(to)
        }))*/

        // listening on Incoming Call
        // CR4R.onIncomingCall(( async (call) => {
        //     await CR4R.sendText(call.peerJid, 'Maaf, saya tidak bisa menerima panggilan. nelfon = block!')
        //     .then(() => CR4R.contactBlock(call.peerJid))
        // }))
    }

create('CR4R', options(true, start))
    .then(CR4R => start(CR4R))
    .catch((error) => console.log(error))