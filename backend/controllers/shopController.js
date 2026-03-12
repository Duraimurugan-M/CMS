import ShopItem from "../models/ShopItem.js";
import SalesTransaction from "../models/SalesTransaction.js";

export const addItem = async (req, res) => {
    const item = await ShopItem.create(req.body);
    res.json(item);
};

export const getItems = async (req, res) => {
    const items = await ShopItem.find();
    res.json(items);
};

export const createSale = async (req, res) => {
    const sale = await SalesTransaction.create(req.body);
    res.json(sale);
};