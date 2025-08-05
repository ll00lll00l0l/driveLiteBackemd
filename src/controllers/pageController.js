const Page = require('../models/Page');

exports.getAllPages = async (req, res) => {
  try {
    const pages = await Page.find();

    if (pages.length === 0) {
      return res.status(404).json({ status: false, message: 'No Pages found' });
    }

    res.json({
      status: true,
      message: 'Pages retrieved successfully',
      data: pages,
    });
  } catch (error) {
    res.status(500).json({ status: false, message: error.message });
  }
};

exports.addPage = async (req, res) => {
  try {
    const { name, meta_data, title, description } = req.body;

    const newPage = new Page({
      name,
      meta_data,
      title,
      description,
    });

    await newPage.save();

    res.status(201).json({
      status: true,
      message: 'Page created successfully',
      data: newPage,
    });
  } catch (error) {
    res.status(500).json({ status: false, message: error.message });
  }
};

exports.getPageById = async (req, res) => {
  try {
    const page = await Page.findById(req.params.id).populate('sectionOrder');

    if (!page) {
      return res.status(404).json({ status: false, message: 'Page not found' });
    }

    res.json({ status: true, data: page });
  } catch (error) {
    res.status(500).json({ status: false, message: error.message });
  }
};

exports.updatePage = async (req, res) => {
  try {
    const page = await Page.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    if (!page) {
      return res.status(404).json({ status: false, message: 'Page not found' });
    }

    res.status(200).json({
      status: true,
      message: 'Page updated successfully',
      data: page,
    });
  } catch (error) {
    res.status(500).json({ status: false, message: error.message });
  }
};

exports.deletePage = async (req, res) => {
  try {
    const page = await Page.findByIdAndDelete(req.params.id);

    if (!page) {
      return res.status(404).json({ status: false, message: 'Page not found' });
    }

    res.json({ status: true, message: 'Page deleted successfully' });
  } catch (error) {
    res.status(500).json({ status: false, message: error.message });
  }
};
