import fs from "fs"
import path from "path"
import Constants from "./constants.js"

/**
 * @typedef {import('./models.js').Models} Models
 */

/**
 * @typedef {Object} GameData
 * @property {string} path - Location of the game.
 * @property {Models.GameInfo} info - Info about the game.
 */

/**
 * @typedef {Object} TableData
 * @property {GameData} game
 * @property {Models.Table} table
 */

/**
 * @callback ScanCallback
 * @param {string} path - Extra Processing On Path
 * @param {boolean} isDir - Dictates if the path is a file or not
 * @returns {Object} The processed data.
 */

/**
 * @param {string} directoryPath 
 * @param {ScanCallback} handler 
 * @returns {Set}
 */
const DirectoryScan = (directoryPath, handler) => {
    try {
        const filesAndDirectories = fs.readdirSync(directoryPath)
        let data = new Set()
        filesAndDirectories.forEach(fileOrDirectory => {
            const fullPath = path.join(directoryPath, fileOrDirectory)
            const isDir = fs.statSync(fullPath).isDirectory()
            const rd = handler(fullPath, isDir)
            if(rd !== undefined) {
                data.add(rd)
            }
        })
        return data
    } catch (error) {
        console.error('Error reading directory:', error)
        return
    }
}
const LoadFile = (file) => {
    try {
        const fileData = fs.readFileSync(file)
        return JSON.parse(fileData)
    } catch (error) {
        console.error('Missing data:', error)
        return
    }
}

class DataReader {
    /** @type {Set<GameData>} */
    games

    constructor(directoryPath) {
        /** @private */
        this.directoryPath = directoryPath ?? Constants.dataDir
        this.games = new Set()
        this.readGames()
    }

    /** @private */
    readGames() {
        this.games = DirectoryScan(this.directoryPath, (path, isDir) => {
            if (!isDir) { return }
            const info = this.readGameInfo(path)
            return {path: path, info: info}
        })
    }
    /**
     * @private
     * @param {string} dir 
     * @returns {GameInfo}
     */
    readGameInfo(dir) {
        return LoadFile(path.join(dir, "game.json"))
    }
    /**
     * @param {string} gameId 
     * @returns {GameData}
     */
    find(gameId) {
        const gameList = Array.from(this.games)
        return gameList.find(game => game.info.id === gameId )
    }
    /**
     * @param {string} gameId 
     * @returns {Models.TableListEntry[]}
     */
    readTableList(gameId) {
        const game = this.find(gameId)
        if (!game) { return }
        return LoadFile(path.join(game.path, "tables.json"))
    }
    /**
     * @param {string} gameId
     * @param {string} tableID
     * @returns {TableData}
     */
    readTable(gameId, tableId) {
        const game = this.find(gameId)
        if (!game) { return }
        const tableList = this.readTableList(gameId)
        if (!tableList.find(table => table.id == tableId)) { return }
        return {game: game, table: LoadFile(path.join(game.path, `table-${tableId}.json`))}
    }
}

export default DataReader