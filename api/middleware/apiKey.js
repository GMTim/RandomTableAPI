import express from "express"
import Constants from "../../constants.js"

/**
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 */
const apiKey = (req, res, next) => {
    const key = req.get("X-API-KEY")
    if (key != Constants.apiKey) {
        res.status(400).send({error: "Missing or Wrong API Key"})
        return
    }
    next()
}

export default apiKey