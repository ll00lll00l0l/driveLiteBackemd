const path = require("path");
const fs = require("fs");
const sharp = require("sharp");

const uploadImage = async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "No file uploaded" });
  }

  const originalPath = req.file.path;
  const webpDir = path.join(__dirname, "../media/webp");
  fs.mkdirSync(webpDir, { recursive: true });

  const baseName = path.parse(req.file.filename).name;
  const resizedFilename = `${baseName}-resized.webp`;
  const resizedPath = path.join(webpDir, resizedFilename);

  const { width, height, offsetX, offsetY } = req.body;

  try {
    const image = sharp(originalPath);

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

module.exports = { uploadImage };
