// const mongoose = require('mongoose');
// passdb = `mongodb://cr4r:ajkw9mvl`;
// namadb = `${passdb}@cluster0-shard-00-00.jfman.mongodb.net:27017,cluster0-shard-00-01.jfman.mongodb.net:27017,cluster0-shard-00-02.jfman.mongodb.net:27017/botwa`;
// const uri = `${namadb}?ssl=true&replicaSet=atlas-103bw8-shard-0&authSource=admin&retryWrites=true&w=majority`;
// await mongoose.connect(uri, {
//     useUnifiedTopology: true,
//     useNewUrlParser: true,
//     serverSelectionTimeoutMS: 10000
// }, (err) => {
//     if (err) {
//         console.log(`Error gan saat konek db \n${err}\n\nMenjalankan Ulang!!!`);
//     };
// });
// mongoose.connection.on('connected', function() {
//     console.log('Database user sudah terkoneksi');
// });
// mongoose.connection.on('disconnected', function() {
//     console.log('Database disconnected');
// });