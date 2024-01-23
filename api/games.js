import express from "express"
import DataReader from "../dataReader.js"

/**
 * @param {express.Request} req
 * @param {express.Response} res
 */
const games = (req, res) => {
    const dr = new DataReader()
    let list = []
    dr.games.forEach((game) => {
        list.push({id: game.info.id, name: game.info.name})
    })
    res.send(list)
}

export default games