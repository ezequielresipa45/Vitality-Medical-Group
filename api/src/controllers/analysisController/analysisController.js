const { Analysis } = require("../../db")
const { Op } = require("sequelize");


const filterAnalysisDB = (item) => {
    return{
        id: item.id,
        name: item.name,
        speciality: item.speciality,
        price: item.price,
        is_delete: item.is_delete,

    }

}


//getAnalysis devuelve todos los campos que tenga la tabla Analysis
const getAnalysis = async () =>{
    const request = await Analysis.findAll()
    let filtered = request
    .map((item) => filterAnalysisDB(item))
    .filter((item) => item.is_delete !== true)
    .flat();


  return filtered;   
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
    const request = await Analysis.findByPk(id);
    
    if (!request) {
      throw new Error('El Analisis no fue encontrado');
    }
    
    request.set({
      is_delete: true,
    });
    await request.save();
  
    return "El Analisis fue borrado exitosamente";
  };






module.exports ={
    getAnalysis,
    createAnalysis,
    changeAnalysis,
    deleteAnalysis

}