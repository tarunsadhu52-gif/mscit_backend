import express from "express";
import {adduser, getUser, getSingleUser, DeleteUser, UpdateUser, loginUser} from "../controller/userDataController.js"
import authenticateToken from "../utits/authMiddware.js"
import upload from "../utits/uploadMiddware.js";

const router = express.Router()
router.post('/api/add-user',upload.single('image'), adduser)
router.get('/api/get-user', authenticateToken, getUser)
router.get('/api/get-single-user/:id', authenticateToken, getSingleUser)
router.delete('/api/delete-user/:id', authenticateToken, DeleteUser)
router.put('/api/update-user/:id', authenticateToken, UpdateUser)
router.post('/api/login', loginUser)

export default router