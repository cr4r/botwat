var axios = require('axios');
var cheerio = require('cheerio');

module.exports = doing = (drh) => new Promise((resolve, reject) => {
    url = `https://www.jadwalsholat.org/adzan/monthly.php?id=1`
    if (drh>316){
        axios.get(url).then(resp => {
            let $ = cheerio.load(resp.data);
            var namaKota = $('select[class="inputcity"]').text().trim().split('\n')
            var listKota = []
            var listK = $('select[class="inputcity"]').find('option').each(function (index, element){
                listKota.push($(element).attr('value'));
            });
            let dataKota = 'Sepertinya anda salah memasukkan nomor\nPilihlah nomor dari list Kota dibawah ini\n\n'
            for (var i = 0, len = listKota.length; i < len; i++) {
                dataKota += `${listKota[i]}. ${namaKota[i]}\n`
            }
            dataKota += `Contoh:\nsolat 01`
            resolve(dataKota)
        })
    }else{
        url = `https://www.jadwalsholat.org/adzan/monthly.php?id=${drh}`
        axios.get(url).then(resp => {
            let $ = cheerio.load(resp.data);
            let komen = 'Jadwal Solat ini saya ambil dari web jadwalsholat.org\n'
            listJam = []
            var listJam1 = $('tr[class="table_highlight"]').find('td').each(function (index, element){
                listJam.push($(element).text());
            });
            datanya = `Pada Tanggal ${listJam[0]} (Hari ini)\nImsyak\t${listJam[1]}\nShubuh\t${listJam[2]}\nTerbit\t${listJam[3]}\nDhuha\t${listJam[4]}\nDzhuhur\t${listJam[5]}\nAshr\t${listJam[6]}\nMaghrib\t${listJam[7]}\nIsya\t${listJam[8]}\n\nArah :`
            var komenn = []
            var komenn1 = $('tr[class="table_block_content"]').each(function (index, element){
                komenn.push($(element).text().trim());
            });
            for (var i = 0, len = komenn.length; i < len; i++) {
                komen += `${komenn[i]}\n`
            }
            datanya += komen
            resolve(datanya.trim())
        })  
    }
})