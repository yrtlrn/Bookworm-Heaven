import { Request } from "express";
import { Types } from "mongoose";


export const authorizeSession = (req:Request,userId: Types.ObjectId) => {
    req.session.authorized = true
    req.session.userId = userId
    
}