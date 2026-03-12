import FeeHead from "../models/FeeHead.js";

export const createFeeHead = async (req, res) => {
  try {
    const { name, code, amount, description } = req.body;

    if (!name || !code || amount === undefined) {
      return res.status(400).json({
        success: false,
        message: "Name, code and amount are required"
      });
    }

    const exists = await FeeHead.findOne({ code: code.toUpperCase() });
    if (exists) {
      return res.status(400).json({
        success: false,
        message: "Fee head code already exists"
      });
    }

    const feeHead = await FeeHead.create({
      name,
      code: code.toUpperCase(),
      amount,
      description
    });

    res.status(201).json({
      success: true,
      message: "Fee head created successfully",
      data: feeHead
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

export const getFeeHeads = async (req, res) => {
  try {
    const feeHeads = await FeeHead.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: feeHeads.length,
      data: feeHeads
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

export const getFeeHeadById = async (req, res) => {
  try {
    const feeHead = await FeeHead.findById(req.params.id);

    if (!feeHead) {
      return res.status(404).json({
        success: false,
        message: "Fee head not found"
      });
    }

    res.status(200).json({
      success: true,
      data: feeHead
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

export const updateFeeHead = async (req, res) => {
  try {
    const { name, code, amount, description, isActive } = req.body;

    const feeHead = await FeeHead.findById(req.params.id);

    if (!feeHead) {
      return res.status(404).json({
        success: false,
        message: "Fee head not found"
      });
    }

    if (code && code.toUpperCase() !== feeHead.code) {
      const codeExists = await FeeHead.findOne({ code: code.toUpperCase() });
      if (codeExists) {
        return res.status(400).json({
          success: false,
          message: "Fee head code already exists"
        });
      }
    }

    feeHead.name = name ?? feeHead.name;
    feeHead.code = code ? code.toUpperCase() : feeHead.code;
    feeHead.amount = amount ?? feeHead.amount;
    feeHead.description = description ?? feeHead.description;
    feeHead.isActive = isActive ?? feeHead.isActive;

    await feeHead.save();

    res.status(200).json({
      success: true,
      message: "Fee head updated successfully",
      data: feeHead
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

export const deleteFeeHead = async (req, res) => {
  try {
    const feeHead = await FeeHead.findById(req.params.id);

    if (!feeHead) {
      return res.status(404).json({
        success: false,
        message: "Fee head not found"
      });
    }

    await feeHead.deleteOne();

    res.status(200).json({
      success: true,
      message: "Fee head deleted successfully"
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};