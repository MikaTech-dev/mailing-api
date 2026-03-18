import Joi from "joi";



const schema = Joi.object({
    name: Joi.string()
    .min(3)
    .max(60)
    .required()
    .pattern(new RegExp(/[A-Z]/, "i")),
    // Todo: add regex to only accept string

    email: Joi.string()
    .email({ maxDomainSegments: 3, })
    .required(),

    phone: Joi.string()
    .min(5)
    .max(17),

    message: Joi.string()
    .min(5)
    .max(700)
    .required(),

    website: Joi.string()
    .uri()
    .required(),

    recipient: Joi.string()
    .email({maxDomainSegments: 3, })
    .required(),
})

const verifySchema = (data) => {
    const {error, value} = schema.validate(data)
    if (error) {
        throw new Error(error);
    }
    return value
}


export default verifySchema