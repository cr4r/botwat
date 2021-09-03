const { e } = require('mathjs');
const db = require('../database/seting');
const wlcm = require('../database/welcome');

const dapat = async() => {
    var a = await db.find().sort();
    return a[0];
};

//('buat/hapus/update', 'welcome/seting', '{a:'a'}', '62822xxxx@c.us')
const savedb = async(mode, namadb, text, nomor) => {
    jadi = {};
    textdb = await Object.keys(text);
    if (mode === "get") {
        if (namadb === "welcome") {
            a = await wlcm.find().sort();
            b = await a.filter(d => d.nomor);
            return b;
        } else {
            a = await dapat();
            return a
        };
    } else if (mode === "buat" && namadb === "welcome") {
        jadi.db = await new wlcm();
    } else if (mode === "hapus" && namadb === "welcome") {
        jadi.db = await wlcm.findOne({ nomor: nomor });
        if (jadi.db) {
            try {
                docs = await akun.findByIdAndDelete(jadi.db._id);
                if (docs) {
                    return { status: 'ok', result: `Nomor ${docs.nomor.split('@')[0]} telah di ${mode}` };
                } else {
                    return { status: 'no', result: `Gagal ${mode} - Maaf Nomor tidak ada` };
                };
            } catch (e) {
                return { status: 'no', result: `Error - ${e}` };
            };
        } else {
            return { status: 'no', result: 'Maaf Nomor tidak ada' };
        };
    } else {
        if (namadb === "seting") {
            jadi.db = await dapat();
        } else {
            jadi.db = await wlcm.findOne({ nomor: nomor });
        };
    };
    try {
        textdb.forEach(isinya => {
            jadi.db[isinya] = text[isinya];
        });
        b = await jadi.db.save();
        if (b) {
            return { status: 'ok', result: `Telah di ${mode}` };
        } else {
            return { status: 'no', result: `Gagal ${mode}` };
        };
    } catch (e) {
        return { status: 'no', result: `Gagal ${mode} - ${e}` };
    };
};



const owner = async() => {
    a = await dapat();
    return a.ownerNumber;'628895131355@c.us')
};

const maintence = async(mode, text) => {
    a = await savedb(mode, 'seting', { maintence: text })
    return a
};

const welcome = async(mode, text) => {
    a = await savedb(mode, 'welcome', { nomor: text }, text)
    return a
};


module.exports = {
    owner,
    maintence,
    welcome
};
