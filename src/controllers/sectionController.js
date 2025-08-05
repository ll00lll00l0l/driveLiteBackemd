const Section = require('../models/Section');

exports.getAllSections = async (req, res) => {
  try {
    const sections = await Section.find();

    if (sections.length === 0) {
      return res.status(404).json({ status: false, message: 'No sections found' });
    }

    res.json({
      status: true,
      message: 'Sections retrieved successfully',
      data: sections,
    });
  } catch (error) {
    res.status(500).json({ status: false, message: error.message });
  }
};

exports.addSection = async (req, res) => {
  try {
    const {
      page,
      title,
      subtitle,
      description,
      imagepath,
      button,
      link,
      sectionname,
      status,
    } = req.body;

    const newSection = new Section({
      page,
      title,
      subtitle,
      description,
      imagepath,
      button,
      link,
      sectionname,
      status,
    });

    await newSection.save();

    res.status(201).json({
      status: true,
      message: 'Section created successfully',
      data: newSection,
    });
  } catch (error) {
    res.status(500).json({ status: false, message: error.message });
  }
};

exports.getSectionById = async (req, res) => {
  try {
    const section = await Section.findById(req.params.id);

    if (!section) {
      return res.status(404).json({ status: false, message: 'Section not found' });
    }

    res.json({ status: true, data: section });
  } catch (error) {
    res.status(500).json({ status: false, message: error.message });
  }
};

exports.updateSection = async (req, res) => {
  try {
    const section = await Section.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    if (!section) {
      return res.status(404).json({ status: false, message: 'Section not found' });
    }

    res.status(200).json({
      status: true,
      message: 'Section updated successfully',
      data: section,
    });
  } catch (error) {
    res.status(500).json({ status: false, message: error.message });
  }
};

exports.deleteSection = async (req, res) => {
  try {
    const section = await Section.findByIdAndDelete(req.params.id);

    if (!section) {
      return res.status(404).json({ status: false, message: 'Section not found' });
    }

    res.json({ status: true, message: 'Section deleted successfully' });
  } catch (error) {
    res.status(500).json({ status: false, message: error.message });
  }
};
