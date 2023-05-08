import { NextFunction, Request, Response } from "express";
import { EmailService } from "../../Instance/EmailService";
import { storedOTP } from "../../types/storedOTP";
import user from "../../database/model/user";
import otpGenenrator from 'otp-generator'
import { RedisCli } from "../../Instance/Redis";

export const forgetPassword = async (req : Request, res: Response, next : NextFunction) =>{
    try {
        const {email} = req.body
        const isEmailExsist = await user.query().findOne({email})
        if(!isEmailExsist)
            return res.status(400).send('email not exsist')
        const otp = otpGenenrator.generate(6,{lowerCaseAlphabets : false, specialChars: false})
        const storeOTPForConfirm : storedOTP = {key : email, value : otp} 
        await RedisCli.setKey(storeOTPForConfirm)
        await EmailService.sendEmail(email,otp)
        
        return res.status(200).send('OTP has been send')
    } catch (error) {
        next(error)
    }
}