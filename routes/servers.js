import { Router } from "express";
import Picture from "../model/item.js";
import pkg from "canvas";
import path from "path";
import fs from "fs";
import multer from "multer";
const __dirname = path.resolve();
let pictureArray = [];
const { createCanvas, loadImage } = pkg;
const router = Router();
// multer
let storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "static/upload");
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + Date.now() + ".jpg");
  },
});
let upload = multer({ storage: storage });
//routes
router.get("/", async (req, res) => {
  pictureArray = await Picture.find({}).lean();
  res.render("index", { title: "Main Page", active: "main", pictureArray });
});
router.get("/create", (req, res) => {
  res.render("create", { title: "Create new", active: "create" });
});
router.post("/create", upload.single("image"), (req, res) => {
  //pre-sizing
  const width = 256;
  const height = 147;
  const canvas = createCanvas(width, height);
  let ctx = canvas.getContext("2d");
  const width_m = 512;
  const height_m = 294;
  const canvas_m = createCanvas(width_m, height_m);
  let ctx_m = canvas_m.getContext("2d");
  loadImage(req.file.path)
    .then((image) => {
      ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
      fs.writeFileSync(
        "static/s_size/" + req.file.originalname,
        canvas.toBuffer("image/png")
      );
      loadImage(req.file.path).then((image) => {
        ctx_m.drawImage(image, 0, 0, canvas_m.width, canvas_m.height);
        fs.writeFileSync(
          "static/m_size/" + req.file.originalname,
          canvas_m.toBuffer("image/png")
        );
      });
    })
    .then(() => {
      return new Picture({
        title: req.body.title,
        artist: req.body.artist,
        year: req.body.year,
        image_b: req.file.path,
        image_l: "/s_size/" + req.file.originalname,
        image_m: "/m_size/" + req.file.originalname,
      });
    })
    .then((newPic) => {
      newPic.save();
      res.redirect("/");
    });
});
router.post("/download", async (req, res) => {
  let picture = await Picture.findById(req.body.id);
  res.download(__dirname + "/" + picture.image_b);
});

router.delete("/edit/:id", async (req, res) => {
  pictureArray = await Picture.findOneAndDelete({ _id: req.params.id });
  res.json({});
});

export default router;
