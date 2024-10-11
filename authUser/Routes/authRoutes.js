import Router from 'express'
import { Login, Signup} from '../controller/authController.js'



const authRoutes=Router()

authRoutes.post('/signup',Signup)
authRoutes.post('/login',Login)





export default authRoutes;