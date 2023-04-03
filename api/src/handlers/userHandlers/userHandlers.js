const {getAllUser, getUserById, createUser, isAdmin, deleteUser} = require('../../controllers/userController/userController')


const GET_USER = async (req, res) => {
    const data = await getAllUser()
    res.status(200).json(data)
}

const GET_USER_ID = async (req, res) => {
    try {
      const { id } = req.params;
      const request = await getUserById(id);
      return res.status(200).json(request);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  };

const POST_USER = async (req, res) => {
    try {
        const {full_name, email, password, user_name, image} = req.body
        const data = await createUser(full_name, email, password, user_name, image)
        res.status(200).json(data)
    } catch (error) {
        res.status(400).json({error: error.message})
    }}


const PUT_ISADMIN = async (req, res) => {
    try {
        const {id, is_Admin} = req.body
    const data = await isAdmin(id, is_Admin)
    res.status(200).json(data)
    } catch (error) {
    res.status(400).json({error: error.message})
    }}


const DELETE_USER = async (req, res) => {
    try {
        const {id} = req.params
    const data = await deleteUser(id)
    res.status(200).json(data) 
    } catch (error) {
    res.status(400).json({error: error.message})
    }
   
}

module.exports = {
    GET_USER,
    GET_USER_ID,
    POST_USER,
    PUT_ISADMIN,
    DELETE_USER
}