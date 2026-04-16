import {Router} from "express"
import {getAPI, postAPI, getPolo, getPing} from "../controllers/index.controllers.js"
import { getGameUser, updateUserPoints } from "../controllers/users.controllers.js"
const router = Router()


router.get("/", getAPI)
router.post("/", postAPI)
router.get("/marco", getPolo)
router.get("/ping", getPing)
router.get("/game/users/:id", getGameUser)      
router.put("/users/:id", updateUserPoints) 

export default router