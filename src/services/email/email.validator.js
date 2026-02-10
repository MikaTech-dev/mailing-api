import Joi from "joi";

const schema = Joi.object({
    name: Joi.string()
    .min(5)
    .max(60)
    .required(),

    email: Joi.string()
    .email({ maxDomainSegments: 3, }),

    phone: Joi.number()
    .integer()
    .positive()
    .min(10)  // Americas .incl
    .max(15), // Germany .incl

    message: Joi.string()
    .alphanum(),

    website: Joi.string()
    .uri()
})

const validate = async () => {
    try {
        await schema.validateAsync()
    }catch (error) {
        console.log("An error occurred: ", error);
    }
}

