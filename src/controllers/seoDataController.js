const SeoData = require("../models/SeoData.js");

exports.getAllSeoData = async (req, res) => {
  try {
    const seoDataList = await SeoData.find().populate('page');

    if (seoDataList.length === 0) {
      return res.status(404).json({ status: false, message: "No SEO data found" });
    }

    res.json({
      status: true,
      message: "SEO data retrieved successfully",
      data: seoDataList
    });
  } catch (error) {
    res.status(500).json({ status: false, message: error.message });
  }
};

exports.addSeoData = async (req, res) => {
  try {
    const { page, title, description, content } = req.body;

    const newSeoData = new SeoData({
      page,
      title,
      description,
      content
    });

    await newSeoData.save();

    res.status(201).json({
      status: true,
      message: "SEO data created successfully"
    });
  } catch (error) {
    res.status(500).json({ status: false, message: error.message });
  }
};

exports.getSeoDataById = async (req, res) => {
  try {
    const seoData = await SeoData.findById(req.params.id).populate('page');

    if (!seoData) {
      return res.status(404).json({ status: false, message: "SEO data not found" });
    }

    res.json({ status: true, data: seoData });
  } catch (error) {
    res.status(500).json({ status: false, message: error.message });
  }
};

exports.updateSeoData = async (req, res) => {
  try {
    const seoData = await SeoData.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    if (!seoData) {
      return res.status(404).json({ status: false, message: "SEO data not found" });
    }

    res.status(200).json({
      status: true,
      message: "SEO data updated successfully",
      data: seoData
    });
  } catch (error) {
    res.status(500).json({ status: false, message: error.message });
  }
};

exports.deleteSeoData = async (req, res) => {
  try {
    const seoData = await SeoData.findByIdAndDelete(req.params.id);

    if (!seoData) {
      return res.status(404).json({ status: false, message: "SEO data not found" });
    }

    res.json({ status: true, message: "SEO data deleted successfully" });
  } catch (error) {
    res.status(500).json({ status: false, message: error.message });
  }
};
