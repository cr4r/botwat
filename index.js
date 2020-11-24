const { create, Client } = require('@open-wa/wa-automate')
const welcome = require('./lib/welcome')
const msgHandler = require('./msgHndlr')
const options = require('./options')

const start = async (client = new Client()) => {
        console.log('[SERVER] Bot Whatsapp sudah mulai!')
        // Force it to keep the current session
        client.onStateChanged((state) => {
            console.log('Client sudah', state)
            if (state === 'CONFLICT' || state === 'UNLAUNCHED') client.forceRefocus()
        })
        // listening on message
        client.onMessage((async (message) => {
            client.getAmountOfLoadedMessages().then((msg) => {
                if (msg >= 3000) {
                    client.cutMsgCache()
                }
            })
            msgHandler(client, message)
        }))

        client.onGlobalParicipantsChanged((async (heuh) => {
            await welcome(client, heuh)
            //left(client, heuh)
        }))

        // Hilangkan tanda // jika ingin mengaktifkan fiturnya
        //fitur out otomatis
        client.onAddedToGroup(((chat) => {
            client.sendText(chat.id, `Halo om, kalo mau masukin saya (bot) ke grub, silahkan hubungi wa.me/6282237416678. eeittts gak gratis ya :) (donasi seiklasnya min.5k) bye bye :p`).then(() => client.leaveGroup(chat.id)).then(() => client.deleteChat(chat.id))
            // let totalMem = chat.groupMetadata.participants.length
            // if (totalMem < 30) { 
            // 	client.sendText(chat.id, `Cih member nya cuma ${totalMem}, Kalo mau invite bot, minimal jumlah mem ada 30`).then(() => client.leaveGroup(chat.id)).then(() => client.deleteChat(chat.id))
            // } else {
            //     client.sendText(chat.groupMetadata.id, `Halo warga grup *${chat.contact.name}* terimakasih sudah menginvite bot ini, untuk melihat menu silahkan kirim *!help*`)
            // }
        }))

        /*client.onAck((x => {
            const { from, to, ack } = x
            if (x !== 3) client.sendSeen(to)
        }))*/

        // listening on Incoming Call
        // client.onIncomingCall(( async (call) => {
        //     await client.sendText(call.peerJid, 'Maaf, saya tidak bisa menerima panggilan. nelfon = block!')
        //     .then(() => client.contactBlock(call.peerJid))
        // }))
    }

create('CR4R', options(true, start))
    .then(client => start(client))
    .catch((error) => console.log(error))
