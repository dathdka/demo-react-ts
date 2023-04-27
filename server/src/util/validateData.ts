import joi from 'joi'

export const loginSchema = joi.object({
    email : joi.string().email().required().min(10).max(40),
    password: joi.string().required().min(6).max(20)
})

export const insertSchema = joi.object({
    id: joi.string(),
    name: joi.string().min(8).max(40),
    email : joi.string().email().required().min(10).max(40),
    phone : joi.string().required().min(9).max(12),
    address: joi.string().required().min(10).max(40),
    dob: joi.string().required(),
    password: joi.string().required().min(6).max(20),
    admin : joi.boolean()
})

export const updateSchema = joi.object({
    id: joi.string(),
    name: joi.string().min(8).max(40),
    email : joi.string().email().required().min(10).max(40),
    phone : joi.string().required().min(9).max(12),
    address: joi.string().required().min(10).max(40),
    dob: joi.string().required(),
    admin : joi.boolean()
})

export const deleteSchema = joi.object({
    id: joi.string().required()
})

export const validatePayload = (input : string) =>{
    return input.toString().replace('/[^a-zA-Z0-9@]/gi','')
}