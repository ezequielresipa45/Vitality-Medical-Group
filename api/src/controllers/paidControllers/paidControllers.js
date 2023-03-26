const { Paids } = require("../../db.js")


const getPaidsAll = async () => {
    const paids = await Paids.findAll();
    return paids;
}

const getPaidsByUserId = async (userId) => {
    const  paids = await Paids.findAll({
        where: {
            userId: userId
        }
    })  
    return paids  
}

const getPaidsByPlanId = async (planId) => {
    const  paids = await Paids.findAll({
        where: {
            planId: planId
        }
    })  
    return paids  
}
const getPaidById = async (id) => {
    const paid = await Paids.findByPk(id);
    return paid;
}

const updatePaidById = async (id, period, cutoff_date, date_pay, price, check, userId, planId) => {
    const paid = await Paids.findByPk(id);
    if(!paid) throw Error(`No existe ticket con el id = ${id}`)

    paid.set({
        period,
        cutoff_date,
        date_pay,
        price,
        check,
        userId,
        planId
    })
    await paid.save()

    return paid
}   

const addPaid = async (period, cutoff_date, date_pay, price, check, userId, planId) => {
    const paid = await Paids.create({period, cutoff_date, date_pay, price, check, userId, planId})
    return paid;
}


module.exports = {
    getPaidsAll,
    getPaidsByUserId,
    getPaidsByPlanId,
    getPaidById,
    updatePaidById,
    addPaid
}