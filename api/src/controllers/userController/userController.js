const { User, Plan, Paids, Comment, Patient } = require("../../db.js");
const { Op } = require("sequelize");

/* 
hecho 
get todos los user 
post crear usuario nuevo
put cambiar usuario a admin o sacarle el admin 
delete eliminar un usuario 

falta 

put para setear la contraseña en "Password1234"(debatir con santi)


    id,
    full_name,
    email,
    password,
    user_name,
    image,
    is_admin,
    is_plan_pay,
    is_delete
*/

// aca esta estructurada la informacion de la base de datos
const filterUserDB = (item) => {
  return {
    id: item.id,
    full_name: item.full_name,
    email: item.email,
    //password: item.password, hace falta devolver la contraseña?
    user_name: item.user_name,
    image: item.image,
    is_admin: item.is_admin,
    is_plan_pay: item.is_plan_pay,
    is_delete: item.is_delete,
  };
};

// este controler trae los users

const getAllUser = async () => {
  const request = await User.findAll({
    include: [
      {
        model: Plan,
      },
      {
        model: Paids,
      },
      {
        model: Comment,
      },
      {
        model: Patient,
      },
    ],
  });
  let filtered = request.filter((item) => item.is_delete !== true);

  return filtered;
};

// *Este controller busca a un usuario por id:
const getUserById = async (id) => {
  const request = await User.findByPk(id, {
    include: [
      {
        model: Plan,
      },
      {
        model: Paids,
      },
      {
        model: Comment,
      },
      {
        model: Patient,
      },
    ],
  });

  if (request && request.is_delete === false) {
    return request;
  } else {
    return "No existe el Usuario con ese Id";
  }
};

// aca se crea un usuario nuevo

const createUser = async (full_name, email, password, user_name, image) => {
  const newUser = await User.create({
    full_name: full_name,
    email: email,
    password: password,
    user_name: user_name,
    image: image,
    is_plan_pay: false,
  });
  return { message: "El Usuario a sido creado con exito" };
};

const setUser = async (
  id,
  full_name,
  email,
  password,
  user_name,
  image,
  is_plan_pay,
  is_delete
) => {
  const changeUser = await User.findByPk(id);
  if (changeUser) {
    await changeUser.set({
      full_name: full_name,
      email: email,
      password: password,
      user_name: user_name,
      image: image,
      is_plan_pay: is_plan_pay,
      is_delete: is_delete,
    });

    await changeUser.save();
    return [changeUser];
  } else {
    return "No existe el Usuario";
  }
};

const isAdmin = async (id, is_admin) => {
  let allUser = await getAllUser();
  let user = await User.findByPk(id);

  if (user.email === "infovitalitymedical@gmail.com") {
    user.is_admin = true;
    await user.save();
    return { message1: "No se pueden realizar modificaciones a este usuario" };
  } else if (is_admin === false) {
    const result = await User.update(
      {
        is_admin: false,
      },
      {
        where: {
          id: id,
        },
      }
    );
    return { message: "El usuario ya no es Administador" };
  } else if (is_admin === true) {
    const result = await User.update(
      {
        is_admin: true,
      },
      {
        where: {
          id: id,
        },
      }
    );
    return { message: "El usuario ahora es administrador" };
  } else {
    throw new Error("No se encontro al usuario");
  }
};

const deleteUser = async (id) => {
  const request = await User.findByPk(id);

  if (!request) {
    throw new Error("El usuario no fue encontrado");
  }

  request.set({
    is_delete: true,
  });
  await request.save();

  return "El usuario fue borrado exitosamente";
};


console.log()

module.exports = {
  getAllUser,
  getUserById,
  createUser,
  setUser,
  isAdmin,
  deleteUser,
};
