import fs from "fs"
import path from "path"
import Constants from "./constants.js"

/**
 * Game Information
 * @typedef {Object} readGameInfo
 * @property {string} id - The unique identifier of the game.
 * @property {string} name - The name of the game.
 */

/**
 * Game Information
 * @typedef {Object} GameData
 * @property {string} path - Location of the game.
 * @property {GameInfo} info - Info about the game.
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
 * @returns 
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

class DataReader {
    /** @type {GameData[]} */
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
        try {
            let file = path.join(dir, "game.json")
            const fileData = fs.readFileSync(file)
            return JSON.parse(fileData)
        } catch (error) {
            console.error('Missing game data:', error)
            return
        }
    }
}

export default DataReader