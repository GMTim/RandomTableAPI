import DataReader from "../dataReader.js"

/**
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
const table = (req, res) => {
    const dr = new DataReader()
    let table = dr.readTable(req.params.gameId, req.params.tableId)
    res.send(table)
}

export default table