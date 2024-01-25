import DataReader from "../dataReader.js"
import * as Models from "../models.js"

function getRandomNumber(min, max) {
    min = Math.ceil(min)
    max = Math.floor(max)
    return Math.floor(Math.random() * (max - min + 1) + min)
}
/**
 * @param {Models.Models.Range} first 
 * @param {Models.Models.Range} second
 * @return {number}
 */
function getRandomPair(first, second) {
    let f = getRandomNumber(first.low, first.high)
    let s = getRandomNumber(second.low, second.high)
    return parseInt(`${f}${s}`)
}

function getRandomCardNumber() {
    return getRandomNumber(2, 14)
}
function convertNumberToCard(number) {
    if (number <= 10) { return `${number}` }
    switch(number) {
        case 11: return "J"
        case 12: return "Q"
        case 13: return "K"
        case 14: return "A"
    }
    return "0"
}
function convertCardToNumber(card) {
    if (!isNaN(card)) { return parseInt(card) }
    switch(card) {
        case "J": return 11
        case "Q": return 12
        case "K": return 13
        case "A": return 14
    }
    return 0
}

/**
 * @param {number} roll 
 * @param {Models.Models.TableEntry[]} entries 
 * @return {Models.Models.TableEntry}
 */
function findCardRow(roll, entries) {
    let number = roll
    return entries.find((entry) => {
        let low = convertCardToNumber(entry.range.low)
        let high = convertCardToNumber(entry.range.high)
        return low <= number && high >= number
    })
}

/**
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
const table = (req, res) => {
    const dr = new DataReader()
    const data = dr.readTable(req.params.gameId, req.params.tableId)
    if (!data || !data.table) {
        res.status(404).send({ error: "Missing Game Or Table" })
        return
    }
    /** @type {Models.Models.Table} */
    const table = data.table
    let random = undefined
    let entry = undefined
    const rangeEntry = () => {entry = table.entries.find(e => e.range.low <= random && e.range.high >= random)}
    switch (table.range.type) {
        case Models.RangeTypes.range:
            random = getRandomNumber(table.range.range.low, table.range.range.high)
            rangeEntry()
            break
        case Models.RangeTypes.pair:
            random = getRandomPair(table.range.pair.first, table.range.pair.second)
            rangeEntry()
            break
        case Models.RangeTypes.card:
            random = getRandomCardNumber()
            entry = findCardRow(random, table.entries)
            random = convertNumberToCard(random)
            break
    }
    
    res.send({ roll: random, entry: entry })
}

export default table