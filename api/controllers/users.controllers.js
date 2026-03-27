import { db_connect } from "../utils/db.js"
import { hash, getSalt } from "../utils/hash.js" 

export const getUsers = async (req, res) => {
    const sql = db_connect()
    try {
        const result = await sql.query("SELECT * FROM users")
        res.json(result.rows)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

export const getUser = async (req, res) => {
    const sql = db_connect()
    try {
        const result = await sql.query("SELECT * FROM users WHERE id = $1", [req.params.id])
        if (result.rows.length === 0) return res.status(404).json({ message: "Usuario no encontrado" })
        res.json(result.rows[0])
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

export const postUser = async (req, res) => {
    const sql = db_connect()
    const { name, username, password, points } = req.body
    try {
        const salt = getSalt(process.env.SALT_SIZE) 
        const hashed = hash(password, salt)
        const salted_hashed = salt + hashed
        const text = "INSERT INTO users (name, username, password, points) VALUES ($1, $2, $3, $4)"
        const result = await sql.query(text, [name, username, salted_hashed, points])
        res.status(201).json(result)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

export const putUser = async (req, res) => {
    const sql = db_connect()
    const { name, username, points } = req.body 
    try {
        const text = "UPDATE users SET name = $1, points = $2 WHERE username = $3"
        const result = await sql.query(text, [name, points, username])
        res.json(result)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

export const deleteUser = async (req, res) => {
    const sql = db_connect()
    try {
        await sql.query("DELETE FROM users WHERE id = $1", [req.params.id])
        res.status(204).send()
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}