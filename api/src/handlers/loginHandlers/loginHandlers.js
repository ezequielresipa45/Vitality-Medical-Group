const { login, signUp } = require("../../controllers/loginControllers/loginControllers.js")


const Login = async (req, res) => {
    const { email } = req.query
    try{
        if(!email){
            throw Error("No a enviado el email")
        }
        const user = await login(email)
        return res.status(200).json(user)
    } catch(error){
        return res.status(400).json({error: error.message})
    }
}

const SignUp = async (req, res) => {
    const { full_name, email, user_name, image } = req.body;
    console.log(email)
    try{
        if(!email) throw Error("No a enviado el email")
        const newUser = await signUp(full_name, email, user_name, image)
        return res.status(200).json(newUser)
    } catch(error){
        return res.status(400).json({error: error.message})
    }
}

module.exports = {
    Login,
    SignUp
}