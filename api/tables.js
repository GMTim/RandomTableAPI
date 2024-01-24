import DataReader from "../dataReader.js"

/**
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
const tables = (req, res) => {
    const dr = new DataReader()
    let tables = dr.readTableList(req.params.gameId)
    res.send(tables)
}

export default tables