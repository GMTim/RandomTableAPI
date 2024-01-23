const env = process.env
class Constants {
    constructor() {}
    get apiKey() { return env.APIKEY }
    get dataDir() { return env.DATADIR }
    get port() { return env.PORT }
}

export default new Constants()