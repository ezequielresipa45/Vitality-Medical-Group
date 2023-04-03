const {
    getAnalysis,
    createAnalysis,
    changeAnalysis,
    deleteAnalysis
} = require('../../controllers/analysisController/analysisController')

const GET_ANALYSIS = async (req,res) =>{
        const data = await getAnalysis()
        res.status(200).json(data)
}

const POST_ANALYSIS = async (req, res) =>{
    try {
        const params = req.body
        const data = await createAnalysis(params)
        res.status(200).json(data)
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }

}

const PUT_ANALYSIS = async (req, res) =>{
    try {
        const params = req.body
        const data = await changeAnalysis(params)
        res.status(200).json(data)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

const DELETE_ANALYSIS = async (req, res) =>{
    try {
        const {id} = req.params
        const data = await deleteAnalysis(id)
        res.status(200).json(data)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
    
}

module.exports = {
    GET_ANALYSIS,
    POST_ANALYSIS,
    PUT_ANALYSIS,
    DELETE_ANALYSIS
}