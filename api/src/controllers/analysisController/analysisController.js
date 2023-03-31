const { Analysis } = require("../../db")
const { Op } = require("sequelize");




//getAnalysis devuelve todos los campos que tenga la tabla Analysis
const getAnalysis = async () => {
    const request = await Analysis.findAll()
    return request
}

//createAnalysis crea un nuevo analysis
const createAnalysis = async (params) => {
    console.log(params);
    if (params) {
        const nuevaAnalisys= await Analysis.create({
        name: params.name,
        speciality: params.speciality,
        price: params.price
    });
    return {
        message: "El registro del Analisis se ha creado exitosamente"
    }; 
    }else { throw new Error("Necesita parametros para crear el registro de analisis")
    }
   
}

// changeSpeciality modifica el valor de la tabla analysis
const changeAnalysis = async ({id, name, speciality, price}) => {
    console.log(id, name, speciality, price)
    const request = await Analysis.findByPk(id);

    if (request) {

        request.set({
            name,
            speciality,
            price
        })

      await request.save();
      return {message: "modificado con exito"}
    }else {
      throw new Error("Analisis no encontrado");
    }
  };



  // deleteAnalysis permite eliminar especialidades en la tabla Analisis
const deleteAnalysis = async (id) => {
    console.log(id)
    const analysis = await Analysis.findByPk(id)
    if (analysis) {

        await analysis.destroy();
        return {
            message: `Se ha eliminado el analisis exitosamente`
        };
    } else { throw new Error (`No se ha encontrado el analisis`)
    }
}






module.exports ={
    getAnalysis,
    createAnalysis,
    changeAnalysis,
    deleteAnalysis

}