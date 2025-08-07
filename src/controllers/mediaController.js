const path = require("path");
const fs = require("fs");
const sharp = require("sharp");

const uploadImage = async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "No file uploaded" });
  }

  const webpDir = path.join(__dirname, "../media/webp");
  fs.mkdirSync(webpDir, { recursive: true });

  const timestamp = Date.now();
  const resizedFilename = `${timestamp}-resized.webp`;
  const resizedPath = path.join(webpDir, resizedFilename);

  const { width, height, offsetX, offsetY } = req.body;

  try {
    const image = sharp(req.file.buffer);

    if (width && height && offsetX && offsetY) {
      await image
        .extract({
          width: parseInt(width),
          height: parseInt(height),
          left: parseInt(offsetX),
          top: parseInt(offsetY),
        })
        .resize(1200)
        .toFormat("webp")
        .toFile(resizedPath);
    } else {
      await image
        .resize(1200)
        .toFormat("webp")
        .toFile(resizedPath);
    }

    res.status(200).json({
      message: "Image uploaded and resized",
      resizedPath: `/media/webp/${resizedFilename}`,
      status: true,
    });
  } catch (err) {
    console.error("Image processing failed:", err);
    res.status(500).json({ error: "Image processing failed" });
  }
};

const getAllWebpImages = (req, res) => {
  const webpDir = path.join(__dirname, "../media/webp");

  fs.readdir(webpDir, (err, files) => {
    if (err) {
      return res.status(500).json({ status: false, message: "Failed to read directory" });
    }

    const webpFiles = files.filter(file => file.endsWith(".webp"));

    const fullUrls = webpFiles.map(file => {
      return `${req.protocol}://${req.get("host")}/media/webp/${file}`;
    });

    res.status(200).json({
      status: true,
      count: webpFiles.length,
      files: fullUrls,
    });
  });
};

const deleteWebpImage = (req, res) => {
  const filename = req.params.filename;

  if (!filename.endsWith(".webp")) {
    return res.status(400).json({ status: false, message: "Only .webp files can be deleted" });
  }

  const filePath = path.join(__dirname, `../media/webp/${filename}`);

  if (!fs.existsSync(filePath)) {
    return res.status(404).json({ status: false, message: "Image not found" });
  }

  try {
    fs.unlinkSync(filePath);
    res.status(200).json({ status: true, message: "Image deleted successfully" });
  } catch (error) {
    res.status(500).json({ status: false, message: "Failed to delete image" });
  }
};

module.exports = { uploadImage ,getAllWebpImages ,deleteWebpImage};
