import Router from 'express'
import { getComments, addComment } from '../Controller/Commandcontroller.js';
const authRoutes = Router();

authRoutes.get("/getcomment", getComments);

authRoutes.post("/addcomment", addComment);

export default authRoutes;