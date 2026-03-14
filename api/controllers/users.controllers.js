import { db_connect } from "../utils/db.js"

export const getUsers = async (req, res) => {
    const sql = db_connect()
    const text = "select * from users"
    const result = await sql.query(text)
    console.log(result.rows)
    res.json(result.rows)
}
export const getUser = async (req, res) => {
    const sql = db_connect()
    const text = "select * from users where id = $1"
    const values = [req.params.id]
    const result = await sql.query(text, values)
    console.log(result.rows)
    res.json(result.rows)
}
export const postUser = async (req, res) => {
    const sql = db_connect()
    const { name, username, password, points } = req.body
    const text = "insert into users (name, username, password, points) values ($1, $2, $3, $4)"
    const values = [name, username, password, points]
    const result = await sql.query(text, values)
    res.json(result)
}
export const putUser = async (req, res) => {
    const sql = db_connect()
    const { name, username, password, points } = req.body
    const text = "insert into users (name, username, password, points) values ($1, $2, $3, $4)"
    const values = [name, username, password, points]
    const result = await sql.query(text, values)
    res.json(result)
}
export const deleteUser = async (req, res) => {}