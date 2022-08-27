import express from 'express'

import { getUsers } from "../controllers/users.js" //dont forget to add posts.js, in react we don't need this for need this for node.js

const router = express.Router()

router.get('/', getUsers)

export default router