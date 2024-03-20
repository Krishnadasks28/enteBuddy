import multer from "multer";
import path from "path";

const __dirname = path.dirname(new URL(import.meta.url).pathname);
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    if (file.fieldname == "primaryImage") {
      cb(null, path.join(__dirname, "../uploads/primaryImages"));
    } else if (file.fieldname == "secondaryImages") {
      cb(null, path.join(__dirname, "../uploads/secondaryImages"));
    } else {
      cb(new Error("Unexpected field"));
    }
  },
  filename: (req, file, cb) => {
    cb(
      null,
      file.originalname.split(".")[0] +
        "-" +
        Date.now() +
        path.extname(file.originalname)
    );
  },
});

export const imageUpload = multer({ storage: storage }).fields([
  { name: "primaryImage", maxCount: 1 },
  { name: "secondaryImages", maxCount: 5 },
]);
