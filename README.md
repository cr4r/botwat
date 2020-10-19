# Bot Whatsapp
script untuk menjalankan bot pada whatsapp sesuai dengan perintah di script tersebut <br><br>
"Makin aku banyak membaca, makin aku banyak berpikir<br>
makin aku banyak belajar, makin aku sadar bahwa aku tak mengetahui apa pun." - Voltaire
## Aplikasi yang harus di install
Google-Chrome, Nodejs<br>
Sudah di test melalui OS Ubuntu 18.04 Bionic dan Debian 10 Buster
## Clone this project
```bash
git clone https://github.com/cr4r1/botwat
```
## Tata cara penginstalan
Jika belum ada google-chrome maka silahkan install dengan cara './installChrome'<br>
Jika belum ada nodeJS maka silahkan install dengan cara 
```bash
./installNode
```
Jika sudah tersedia semua silahkan ketik perintah
```bash
./install
```
Jika sudah terinstall module nya, tidak ada kendala silahkan jalankan menggunakan perintah
```bash
node index.js
```
## Error saat melakukan ./install
jika error pada saat penginstalan di file install<br>
silahkan download module disini https://cr4r.me/node_modules.tar.gz, letakkan file yang sudah di download di folder botwat. lalu extrak dengan cara <br>
```bash
tar -xvf node_modules.tar.gz
```
lalu jalankan script dengan menggunakan perintah
```bash
node index.js
```
## Features

| Sticker Creator |                Feature           |
| :-----------: | :--------------------------------: |
|       ✅       | Kirim foto dengan caption          |
|       ✅       | Reply A Photo                    |
|       ✅       | Image Url                        |
|       ✅       | Send Video or GIF with Caption   |


| Downloader |                     Feature                |
| :------------: | :---------------------------------------------: |
|       ✅        |   YouTube mp3/mp4 Downloader                    |
|       ❌        |   Doujin Downloader         |
|       ❌        |   Instagram Video/Image Downloader                  |
|       ❌        |   Facebook Video Downloader                  |


| Other  |                     Feature                     |
| :------------: | :---------------------------------------------: |
|       ✅        |   Get a random meme             |
|       ✅        |   Text to speech                |
|       ✅        |   Get a random waifu images     |
|       ✅        |   Get a random quotes           |
|       ✅        |   Get a random anime quotes     |
|       ✅        |   Get info gempa from BMKG      |
|       ✅        |   Weather's report's     |
|       ✅        |   Wikipedia                 |
|       ✅        |   Anime searcher    |
|       ✅        |   Get a random cat images       |
|       ✅        |   Get a random dog images       |
|      And        |   Others...                     |


| Group Only  |                     Feature                     |
| :------------: | :---------------------------------------------: |
|       ✅        |   Panggil semua member          |
|       ✅        |   Panggil semua member dengan Pesan          |
|       ✅        |   Promote User                  |
|       ✅        |   Demote User                   |
|       ✅        |   Kick User                     |
|       ✅        |   Add User                      |
|       ✅        |   Mention All User              |
|       ✅        |   Get link group                |
|       ✅        |   Get Admin list                |
|       ✅        |   Get owner group               |
|       ✅        |   enable or disable nsfw command|
|       ✅        |   enable or disable welcome feature|


| Owner Group Only  |              Feature                |
| :------------: | :---------------------------------------------: |
|       ✅        |   Kick All Member Group                 |

| Owner Bot Only  |              Feature                |
| :------------: | :---------------------------------------------: |
|       ✅        |   leave all group                   |
|       ✅        |   clear all message                 |
|       ✅        |   Broadcast                      |


## Alur Direktori botwat
├── functions.js <br>
├── index.js <br>
├── install <br>
├── installChrome <br>
├── installNode <br>
├── lib <br>
│   ├── brainly.js <br>
│   ├── cmd.js <br>
│   ├── color.js <br>
│   ├── fetcher.js <br>
│   ├── functions.js <br>
│   ├── help.js <br>
│   ├── husbu.json <br>
│   ├── msgFilter.js <br>
│   ├── NSFW.json <br>
│   ├── welcome.js <br>
│   └── welcome.json <br>
├── media <br>
│   ├── img <br>
│   │   ├── after.jpg <br>
│   │   ├── before.jpg <br>
│   │   ├── Kaguya.png <br>
│   │   ├── nimek.jpg <br>
│   │   ├── screenshot.jpeg <br>
│   │   └── tutod.jpg <br>
│   ├── mp4 <br>
│   └── tts <br>
├── msgHndlr.js <br>
├── node_modules <br>
│   ├── abbrev <br>
│   ├── accepts <br>
│   ├── after <br>
│   ├── adm-zip <br>
│   ├── dan folder lainnya.... <br>
├── options.js <br>
└── README.md <br>

## Special Thanks to
* [`open-wa/wa-automate-nodejs`](https://github.com/open-wa/wa-automate-nodejs)
* [`YogaSakti/imageToSticker`](https://github.com/YogaSakti/imageToSticker)
* [`MhankBarBar/msghndlr`](https://github.com/MhankBarBar/whatsapp-bot)

### Donate
* [`Saweria`](https://saweria.co/donate/cr4r)
