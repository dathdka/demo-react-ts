import jwt from 'jsonwebtoken'
import 'dotenv/config'

export interface DecodeToken {
    id: string,
    email : string,
    name : string,
    admin: boolean
}

export const decodeToken = (token: string) =>{
    try {
        const decoded = jwt.verify(token, `${process.env.SECRET_JWT}`) as DecodeToken
        return decoded;
    } catch (error) {
        throw error
    }
}