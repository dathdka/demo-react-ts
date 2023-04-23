import * as yup from 'yup'

export const registerSchema = yup.object().shape({
    name : yup.string().required().min(12,'name must be at least 12 characters').max(40,'name must not exceed 40 characters'),
    email: yup.string().required().min(12,'email must be at least 12 characters').max(40,'email must not exceed 40 characters'),
    phone:  yup.number().required().min(9,'phone number must be at least 9 characters').max(12,'phone number must not exceed 11 characters'),
    address : yup.string().required().min(12,'address must be at least 15 characters').max(40,'address must not exceed 40 characters'),
    password: yup.string().required().min(12,'password must be at least 15 characters').max(20,'password must not exceed 20 characters'),
})