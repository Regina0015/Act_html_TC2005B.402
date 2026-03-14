import { db_connect } from "../utils/db.js"

export const login = async (req, res) => {
    const sql = db_connect()
    const {username, password} = req.body
    const text = "select * from user where username = $1"
    const values = [username]
    const result = await sql.query(text, values)
    console.log(result.rows[0])
    if(result.rows[0].password === password){
        res.status(200).json({isLogin:true,user:result.rows[0]})
    } else {
        res.status(401).json({isLogin:false,user:{}})
    }
    // console.log(req.body); 
    res.send("post login")
}