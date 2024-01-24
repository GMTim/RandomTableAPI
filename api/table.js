import DataReader from "../dataReader.js"

/**
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
const table = (req, res) => {
    const dr = new DataReader()
    let data = dr.readTable(req.params.gameId, req.params.tableId)
    if (!data || !data.table) {
        res.status(404).send({error: "Missing Game Or Table"})
        return
    }
    res.send(data.table)
    
}

export default table