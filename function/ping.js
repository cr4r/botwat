const { spawn, exec } = require('child_process');

const statusServer = (rahman) => {
    exec(`cat /proc/meminfo | grep MemFree`, (error, stdout) => {
        var memfree = round(evaluate(stdout.replace('\n', '').replace('MemFree\:', '').replace('kB', '').trim() / 1024).toString(), 2) + ' mb';
        exec('cat /proc/meminfo \| grep MemTotal', (error, stdout, stderr) => {
            (async () => {
                var memtotal = evaluate(stdout.replace('\n', '').replace('MemTotal:', '').replace('kB', '').trim()).toString() + ' mb';
                console.log(memtotal);
                var loadedMsg = await rahman.getAmountOfLoadedMessages();
                var chatIds = await rahman.getAllChatIds();
                var groups = await rahman.getAllGroups();
                rahman.reply(from, `${donasi}\n\nSpeed: ${processTime(t, moment())} _Second_\nStatus : *${loadedMsg}* Pesan\nPesan belum dibaca:\n- *${groups.length}* Pesan Grub\n- *${chatIds.length - groups.length}* Chat Pribadi\n- *${chatIds.length}* Total Chats\n\nBattery HP tersisa ${battery} \%\nPenggunaan RAM: ${memfree}\\${memtotal}`, id)
            })()
        })
    });
}

module.exports = {
    statusServer
}