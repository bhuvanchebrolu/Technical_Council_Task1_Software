const Joi=require("joi");
module.exports.problemSchema=Joi.object({
    problem:Joi.object({
        species:Joi.string().required(),
        description:Joi.string().required(),
        young:Joi.string().required().default("No"),
        image:Joi.string(),
        place:Joi.string().required()


    }).required()
})