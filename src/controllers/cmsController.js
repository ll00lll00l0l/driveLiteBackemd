const Page = require('../models/Page');
const Section = require('../models/Section');

exports.getAllPagesWithSections = async (req, res) => {
  try {
    // Fetch all pages
    const pages = await Page.find();

    // For each page, fetch its associated sections
    const pagesWithSections = await Promise.all(
      pages.map(async (page) => {
        const sections = await Section.find({ page: page._id });
        return {
          ...page.toObject(),
          sections,
        };
      })
    );

    res.status(200).json({
      status: true,
      data: pagesWithSections,
    });
  } catch (error) {
    res.status(500).json({ status: false, message: error.message });
  }
};
