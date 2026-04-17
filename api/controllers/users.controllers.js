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
        const result = await sql.query("SELECT * FROM users WHERE user_id = $1", [req.params.id])
        if (result.rows.length === 0) return res.status(404).json({ message: "Usuario no encontrado" })
        res.json(result.rows[0])
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

export const postUser = async (req, res) => {
    const sql = db_connect()
    const { first_name, last_name, username, password, birthdate } = req.body
    try {
        const salt = getSalt(process.env.SALT_SIZE) 
        const hashed = hash(password, salt)
        const salted_hashed = salt + hashed
        // ✅ Corregido: columnas reales y cantidad de valores ($1–$5)
        const text = "INSERT INTO users (username, first_name, last_name, birthdate, password) VALUES ($1, $2, $3, $4, $5)"
        const result = await sql.query(text, [username, first_name, last_name, birthdate, salted_hashed])
        res.status(201).json(result)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

export const putUser = async (req, res) => {
    const sql = db_connect()
    const { first_name, last_name, username } = req.body 
    try {
        const text = "UPDATE users SET first_name = $1, last_name = $2 WHERE username = $3"
        const result = await sql.query(text, [first_name, last_name, username])
        res.json(result)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

export const deleteUser = async (req, res) => {
    const sql = db_connect()
    try {
        await sql.query("DELETE FROM users WHERE user_id = $1", [req.params.id])
        res.status(204).send()
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

export const getGameUser = async (req, res) => {
    const sql = db_connect()
    const { id } = req.params

    try {
        const result = await sql.query(
            "SELECT * FROM users WHERE username = $1",
            [id]
        )

        if (result.rows.length === 0) {
            return res.status(404).json({ message: "User not found" })
        }

        const u = result.rows[0]

        res.json({
            id: u.user_id,
            name: u.first_name + " " + u.last_name,
            username: u.username,
            password: u.password,
            age: 0
        })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

export const updateUserPoints = async (req, res) => {
    const sql = db_connect()
    const { id } = req.params
    const { birthdate } = req.body
    try {
        const result = await sql.query(
            "UPDATE users SET birthdate = $1 WHERE user_id = $2 RETURNING *",
            [birthdate, id]
        )
        res.json(result.rows[0])
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}