const { Plan } = require("../../db")
const { Op } = require("sequelize")

const getPlanDB = (item) => {
    return{
        id: item.id,
        name: item.name,
        members: item.members,
        price: item.price,
        description: item.description,
        code: item.code,
        consultations_per_patients: item.consultations_per_patients,
        is_delete: item.is_delete,
    }
}


const getPlanAll = async () =>{
    const request = await Plan.findAll({
        
    })
    let filtered = request
    .map((item) => getPlanDB(item))
    .filter((item) => item.is_delete !== true)
    .flat();


  return filtered;   
}

const getPlanByCode = async (code) => {
    const planSearch = await Plan.findOne({
        where: {
            code: code
        }
    })

    if(!planSearch) return "No existe plan con ese codigo"

    return planSearch
}

const getPlanById = async (id) => {
    const plan = await Plan.findByPk(id);
    if(!plan) return `No se encontro ningun plan con el id = ${id} `
    return plan;
}

const updatePlan = async (id, name, members, price, description, code, consultations_per_patients) => {
    
    const plan = await Plan.findByPk(id)
    if(!plan) return `No se puede actualizar el plan con el id = ${id}, porque no existe `

    plan.set({
        name,
        members,
        price,
        description,
        consultations_per_patients
    })

    await plan.save();

    return plan;
}

const addPlan = async (name, members, price, description, code, consultations_per_patients) => {
    const newPlan = await Plan.create({
        name,
        members,
        price,
        description,
        code,
        consultations_per_patients
    })

    return newPlan;
}

const deletePlan = async (id) => {
    const request = await Plan.findByPk(id);
    
    if (!request) {
      throw new Error('El plan no fue encontrado');
    }
    
    request.set({
      is_delete: true,
    });
    await request.save();
  
    return "El plan fue borrado exitosamente";
  };

module.exports = {
    getPlanAll,
    getPlanByCode,
    getPlanById,
    updatePlan,
    addPlan,
    deletePlan
}