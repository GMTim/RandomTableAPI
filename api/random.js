import DataReader from "../dataReader.js"

function getRandomNumber(min, max) {
    min = Math.ceil(min)
    max = Math.floor(max)
    return Math.floor(Math.random() * (max - min + 1) + min)
}

/**
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
const table = (req, res) => {
    const dr = new DataReader()
    const table = dr.readTable(req.params.gameId, req.params.tableId).table
    const random = getRandomNumber(table.range.low, table.range.high)
    const entry = table.entries.find(e => e.range.low <= random && e.range.high >= random)
    res.send({roll: random, entry: entry})
}

export default table