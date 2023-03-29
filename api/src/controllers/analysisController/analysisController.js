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
        speciality: params.speciality
    });
    return {
        message: "El registro del Analisis se ha creado exitosamente"
    }; 
    }else { throw new Error("Necesita parametros para crear el registro de analisis")
    }
   
}

// changeSpeciality modifica el valor de la tabla analysis
const changeAnalysis = async (params) => {
    const request = await Analysis.findByPk(params.id);

    if (request) {

        if(params.name){
            request.name = params.name;
        }

        if(params.speciality){
            request.speciality = params.speciality;
        }

      await request.save();
      return {message: "modificado con exito"}
    }else {
      throw new Error("Analisis no encontrado");
    }
  };



  // deleteAnalysis permite eliminar especialidades en la tabla Analisis
const deleteAnalysis = async (params) => {
    const deleteAnaly = await Analysis.destroy({
        where: {
            id: params.id
        }
    });
    if (deleteAnaly === 1) {
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