const StolenItems = require("../models/stolen.model")
const getStolenItems = async (req,res) =>{
    try{
        const stolenItems = await StolenItems.find({});
        res.status(200).json(stolenItems);
  } catch(error) {
    res.status(500).json({message: error.message});
  }}

  const getStolenItem =  async (req,res) => {
    try{
          const {id} = req.params;
          const stolenItem = await StolenItems.findById(id);
          res.status(200).json(stolenItem);
    } catch(error) {
      res.status(500).json({message: error.message});
    } }

    const createStolenItem = async (req,res) => {
      try{
            const stolenItem = await StolenItems.create(req.body);
            res.status(200).json(stolenItem)
      } catch(error) {
        res.status(500).json({message: error.message});
      }}

      const updateStolenItem = async (req,res) => {
        try{
          const {id} = req.params;
      
          const stolenItem = await StolenItems.findByIdAndUpdate(id,req.body);
      
          if(!stolenItem) {
            return res.status(404).json({message: "Item data does not exist"})
          }
      
          const updatedStolenItem = await StolenItems.findById(id);
          res.status(200).json(updatedStolenItem)
      
        } catch(error) {
          res.status(500).json({message:error.message})
        }
      }

      const deleteStolenItem = async (req,res) => {
        try{
          const {id} = req.params;
      
          const stolenItem = await StolenItems.findByIdAndDelete(id,req.body);
      
          if(!stolenItem) {
            return res.status(404).json({message: "Item data does not exist"})
          }
      
          res.status(200).json({message:'Item data has been deleted'})
      
        } catch(error) {
          res.status(500).json({message:error.message})
        }
      }

  module.exports = {
    getStolenItems,
    getStolenItem,
    createStolenItem,
    updateStolenItem,
    deleteStolenItem                
  }