const emoji = require('emoji-regex')
const fs = require('fs-extra')

const sleep = async (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms));
}

module.exports = {
    sleep
}