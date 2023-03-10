import "reflect-metadata"
import express from "express"
import {router} from '../src/routes'
import './databases'
import "./shared/container"

const app = express()
app.use(express.json())
app.use(router)


app.listen(3333)