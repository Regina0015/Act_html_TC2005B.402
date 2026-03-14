import {Router} from "express"
import {getAPI, postAPI, getPolo, getPing} from "../controllers/index.controllers.js"
const router = Router()

router.get("/", getAPI)
router.post("/", postAPI)
router.get("/marco", getPolo)
router.get("/ping", getPing)

export default router