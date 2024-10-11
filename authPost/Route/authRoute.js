import Router from "express";
import {  addPost,getPost } from "../controller/Postcontroller.js"
const authRoutes =Router()




authRoutes.get("/getpost", getPost);
authRoutes.post('/addpost',addPost)






export default authRoutes;