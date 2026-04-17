import { db_connect } from "../utils/db.js"
import { hash } from "../utils/hash.js" 

export const login = async (req, res) => {
    const sql = db_connect()
    
    try {
        const { username, password } = req.body
    console.log(req.body)
    console.log("Username:", username)
        const text = "SELECT * FROM users WHERE username = $1"
        const values = [username]
        const result = await sql.query(text, values)

        if (result.rows.length === 0) {
            return res.status(404).json({ isLogin: false, user: {} })
        }
        const storedPassword = result.rows[0].password
        const salt = storedPassword.substring(0, parseInt(process.env.SALT_SIZE))
const hashed = hash(password, salt)
        //const username = result.rows[0].username   // el nombre de usuario que inició sesión
        // window.location.href = `tu-juego.html?username=${username}`
        if (hashed === storedPassword.substring(parseInt(process.env.SALT_SIZE))) {
            res.status(200).json({ isLogin: true, user: result.rows[0] }) 
        } else {
            res.status(401).json({ isLogin: false, user: {} })
        }
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: error.message })
    }
}