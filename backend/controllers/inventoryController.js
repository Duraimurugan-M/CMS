import InventoryItem from "../models/InventoryItem.js";

export const createItem = async (req,res)=>{
  const item = await InventoryItem.create(req.body);
  res.status(201).json(item);
};

export const getItems = async (req,res)=>{
  const items = await InventoryItem.find();
  res.json(items);
};

export const updateItem = async (req,res)=>{
  const item = await InventoryItem.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new:true }
  );
  res.json(item);
};

export const deleteItem = async (req,res)=>{
  await InventoryItem.findByIdAndDelete(req.params.id);
  res.json({message:"Item deleted"});
};