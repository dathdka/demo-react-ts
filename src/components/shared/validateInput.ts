import * as yup from 'yup'

export const infoSchema = yup.object().shape({
    name : yup.string().required().min(8,'name must be at least 8 characters').max(40,'name must not exceed 40 characters'),
    email: yup.string().required().min(10,'email must be at least 10 characters').max(40,'email must not exceed 40 characters'),
    phone:  yup.string().required().min(9,'phone number must be at least 9 characters').max(12,'phone number must not exceed 11 characters'),
    address : yup.string().required().min(10,'address must be at least 10 characters').max(40,'address must not exceed 40 characters'),
    dob : yup.date().required(),
    password: yup.string().required().min(6,'password must be at least 6 characters').max(20,'password must not exceed 20 characters'),
})

export const loginSchema = yup.object().shape({
    email: yup.string().required().min(10,'email must be at least 10 characters').max(40,'email must not exceed 40 characters'),
    password: yup.string().required().min(6,'password must be at least 6 characters').max(20,'password must not exceed 20 characters'),
})