const multer = require('multer');
const path = require("path");

// // 利用multer接收上傳檔案
// // Define storage for uploaded files
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, __dirname+"/../public"+ decodeURI(req.url.replace("1222", "media"))); // Destination folder for uploaded files
    },
    filename: (req, file, cb) => {
      // 將檔名變更為現在日期
      cb(null,Date.now()+"."+file.originalname.split(".").slice(-1)[0]); // Rename the file to include the timestamp
    },
  });
  
// 1MB
// const maxSize = 1 * 1000 * 1000;

let upload = multer({
    storage: storage,
    // limits: { fileSize: maxSize },
    fileFilter: function (req, file, cb) {
        // Set the filetypes, it is optional
        var filetypes = /jpeg|jpg|png|heic|mp4|mov/;
        var mimetype = filetypes.test(file.mimetype);
  
        var extname = filetypes.test(
            path.extname(file.originalname).toLowerCase()
        );
  
        if (mimetype && extname) {
            return cb(null, true);
        }
  
        cb(
            "Error: File upload only supports the " +
                "following filetypes - " +
                filetypes
        );
    },
  
    // media is the name of file attribute
}).any("media");

module.exports = upload;
