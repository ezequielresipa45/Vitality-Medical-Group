const { User, Plan, Paids } = require("../../db.js")
const {mailWelcome} = require("../../utils/correo.js")

const attr = [
    "id",
    "full_name",
    "email",
    "user_name",
    "image",
    "is_admin",
    "is_plan_pay",
    "is_delete",
    "planId"
]

const login = async (email) => {
    const user = await User.findOne({
        where: {
            email: email,
        },
        attributes: attr,
    });

    if(!user){
        const newUser = await User.create({email})
        return newUser;
    }
    return user;
}

const signUp = async (full_name, email, user_name, image) => {
    const newUser = await User.findOne({
        where: {
            email: email
        }
    })

    if(!newUser) throw Error("No se puede crear al usuario porque no existe")
    newUser.set({
        full_name,
        email,
        user_name,
        image
    })

    await newUser.save();
    const link = "https://vitality-medical-group.vercel.app/planes"
    await mailWelcome(newUser, link)
    return newUser
}

module.exports = {
    login,
    signUp
}