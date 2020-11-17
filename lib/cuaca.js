var axios = require('axios');
const xml2js = require('xml2json');

propin=['Aceh','Bali','BangkaBelitung','Banten','Bengkulu','DIYogyakarta','DKIJakarta','Gorontalo','Jambi','JawaBarat','JawaTengah','JawaTimur','KalimantanBarat','KalimantanSelatan','KalimantanTengah','KalimantanTimur','KalimantanUtara','KepulauanRiau','Lampung','Maluku','MalukuUtara','NusaTenggaraBarat','NusaTenggaraTimur','Papua','PapuaBarat','Riau','SulawesiBarat','SulawesiSelatan','SulawesiTengah','SulawesiTenggara','SulawesiUtara','SumateraBarat','SumateraSelatan','SumateraUtara','Indonesia']

function daer(description,area1){
    return area1.filter( area1 => area1.description.toLowerCase() == description.toLowerCase() );
}

module.exports = doing = (description,prop) => new Promise((resolve, reject) => {
    let area = ''
    let data = ''
    url = `https://data.bmkg.go.id/datamkg/MEWS/DigitalForecast/DigitalForecast-${propin[prop]}.xml`
    axios.get(url).then(resp => {
        area1 = JSON.parse(xml2js.toJson(resp.data)).data.forecast.area
        for (var i = 0, len = area1.length; i < len; i++) {
            area += `${i}. ${area1[i].description}\n`
        }
        fixA = daer(description,area1)
        if(fixA.length===0){
            bb = {'status':'no','result':area}
            resolve(bb)
        }else{
            daerah = fixA[0].name[0].$t
            data += `Daerah : ${daerah}\n`
            kota = fixA[0].name[1].$t
            data += `Kota : ${kota}\n`
            Provinsi = fixA[0].domain
            data += `Provinsi : ${Provinsi}`
            kelembapan = fixA[0].parameter[0].timerange
            temperature = fixA[0].parameter[5].timerange
            ws = fixA[0].parameter[8].timerange
            waktu = fixA[0].parameter[8].timerange
            wht  = fixA[0].parameter[6].timerange
            for (var i = 0; i<8; i++) {
                wktu = `${waktu[i].datetime}`
                jm = `${waktu[i].h}`
                if(jm==='0'||jm==='24'||jm==='48'){
                    data += `\n\n\nTanggal ${wktu.slice(6,-4)}-${wktu.slice(4,-6)}-${wktu.slice(0,-8)}`
                }
                data += `\nJam ${wktu.slice(8,-2)}:${wktu.slice(10)}:00\n     Cuaca: ${wht[i].value.$t}\n     Lembap : ${kelembapan[i].value.$t}%\n     Temp   : ${temperature[i].value[0].$t}°C\n     Angin  : ${ws[i].value[2].$t} kph`}
            resolve({'status':'ok','result':data})
        }
    })
})
