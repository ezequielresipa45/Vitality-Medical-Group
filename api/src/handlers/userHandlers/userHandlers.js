const {
  getAllUser,
  getUserById,
  createUser,
  setUser,
  isAdmin,
  deleteUser,
} = require("../../controllers/userController/userController");

const GET_USER = async (req, res) => {
  try {
    const data = await getAllUser();
    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
    return res.status(400).json({ error: error.message });
  }
};

const GET_USER_ID = async (req, res) => {
  try {
    const { id } = req.params;
    const request = await getUserById(id);
    return res.status(200).json(request);
  } catch (error) {
    console.log(error);
    return res.status(400).json({ error: error.message });
  }
};

const POST_USER = async (req, res) => {
  try {
    const { full_name, email, password, user_name, image, plan, paids } =
      req.body;
    const data = await createUser(
      full_name,
      email,
      password,
      user_name,
      image,
      plan,
      paids
    );
    res.status(200).json(data);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const PUT_USER = async (req, res) => {
  try {
    const {
      id,
      full_name,
      email,
      password,
      user_name,
      image,
      is_plan_pay,
      is_delete,
    } = req.body;
    const data = await setUser(
      id,
      full_name,
      email,
      password,
      user_name,
      image,
      is_plan_pay,
      is_delete
    );
    return res.status(201).json(data);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const PUT_ISADMIN = async (req, res) => {
  try {
    const { id, is_admin } = req.body;
    const data = await isAdmin(id, is_admin);
    res.status(200).json(data);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const DELETE_USER = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await deleteUser(id);
    res.status(200).json(data);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  GET_USER,
  GET_USER_ID,
  POST_USER,
  PUT_USER,
  PUT_ISADMIN,
  DELETE_USER,
};
