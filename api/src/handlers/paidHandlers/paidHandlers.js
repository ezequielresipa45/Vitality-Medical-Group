const {
    getPaidsAll,
    getPaidsByUserId,
    getPaidsByPlanId,
    getPaidById,
    updatePaidById,
    addPaid
} = require("../../controllers/paidControllers/paidControllers.js")


const getPaidsHandler = async (req, res) => {
    const { planId } = req.query

    try {
        const paids = planId ? await getPaidsByPlanId(planId)
                           : await getPaidsAll();
        res.status(200).json(paids)
    } catch (error ){
        res.status(400).json({error: error.message})
    }   
}

const getPaidsByUserHandler = async (req,res) => {
    const { userId } = req.body
    try{
        const paids = await getPaidsByUserId(userId)
        return res.status(200).json(paids)
    } catch (error) {
        return res.status(400).json({error: error.message})
    }
}

const getPaidByIdHandler = async (req, res) => {
    const { id } = req.params;
    try {
        const paid = await getPaidById(id);
        res.status(200).json(paid)
    } catch ( error ) {
        res.status(400).json({error: error})
    }
}

const updateByIdHandler = async (req, res) => {
    const { id, period, cutoff_date, date_pay, price, check, userId, planId } = req.body;
    try{
        const paid = await updatePaidById(id, period, cutoff_date, date_pay, price, check, userId, planId );
        return res.status(200).json(paid)
    } catch (error) {
        return res.status(400).json({error: error.message})
    }

}

const createPaidHandler = async (req, res) => {
    const {period, cutoff_date, date_pay, price, check, userId, planId} = req.body;
    try{
        const paid = await addPaid(period, cutoff_date, date_pay, price, check, userId, planId);
        return res.status(200).json(paid)
    } catch (error) {
        return res.status(400).json({error: error.message})
    }
}

module.exports = {
    getPaidsHandler,
    getPaidByIdHandler,
    getPaidsByUserHandler,
    updateByIdHandler,
    createPaidHandler
}