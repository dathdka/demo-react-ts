import jwt from 'jsonwebtoken'
import { decodedToken } from '../types/decodedToken'
import 'dotenv/config'

export const decodeToken = (token: string) =>{
    try {
        const decoded = jwt.verify(token, `${process.env.SECRET_JWT}`) as decodedToken
        return decoded;
    } catch (error) {
        throw error
    }
}