module.exports = options = (headless, start) => {
    const options = {
        sessionId: 'CR4R',
        headless: headless,
        autoRefresh: true,
        restartOnCrash: start,
        qrTimeout: 0,
        cacheEnabled: false,
        // executablePath: execPath,
        useChrome: true,
        killProcessOnBrowserClose: true,
        throwErrorOnTosBlock: false,
        chromiumArgs: [
            '--no-sandbox',
            '--disable-setuid-sandbox',
            '--aggressive-cache-discard',
            '--disable-cache',
            '--disable-application-cache',
            '--disable-offline-load-stale-cache',
            '--disk-cache-size=0'
        ]
    }

    return options
}