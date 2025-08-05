const sharp = require("sharp");
const path = require("path");
const fs = require("fs");

const resizeImage = async (req, res) => {
  const {
    filename,
    width,
    height,
    format = "webp",
    fit = "cover",
    offsetX = 0,
    offsetY = 0,
    quality = "80",
  } = req.query;

  if (!filename) return res.status(400).send("Missing filename");

  const inputPath = path.join(__dirname, "../media/section", filename);

  if (!fs.existsSync(inputPath)) {
    return res.status(404).send("Image not found");
  }

  const w = width ? parseInt(width) : undefined;
  const h = height ? parseInt(height) : undefined;
  const x = parseInt(offsetX); // your "right" adjustment (but from left origin)
  const y = parseInt(offsetY);

  try {
    const image = sharp(inputPath);
    const metadata = await image.metadata();

    // Validate width and height
    const cropWidth = w || metadata.width;
    const cropHeight = h || metadata.height;

    // Prevent crop outside bounds
    const maxX = Math.max(0, Math.min(metadata.width - cropWidth, x));
    const maxY = Math.max(0, Math.min(metadata.height - cropHeight, y));

    const buffer = await image
      .extract({
        left: maxX,
        top: maxY,
        width: cropWidth,
        height: cropHeight,
      })
      .toFormat(format === "jpg" ? "jpeg" : format, {
        quality: parseInt(quality),
      })
      .toBuffer();

    res.set("Content-Type", `image/${format === "jpg" ? "jpeg" : format}`);
    res.send(buffer);
  } catch (err) {
    console.error("Sharp Error:", err);
    res.status(500).send("Error processing image");
  }
};

module.exports = { resizeImage };
