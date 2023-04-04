const { User, Plan, Paids } = require("../../db.js")

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

const signUp = async (email) => {
    const user = await User.create({email});
    return user;
}

module.exports = {
    login,
    signUp
}