const express = require('express');
const fs = require("fs");
const rimraf = require("rimraf");
const classifier = require("../function/classifier");
const upload = require("../function/upload");
const checkLoginMiddleware = require("../middlewares/checkLoginMiddleware");
const router = express.Router();

/* GET home page. */
router.get('/', checkLoginMiddleware, function(req, res, next) {
  res.redirect("/1222/");
  // res.render('index', { title: 'Express' });

});

router.get('/1222/', checkLoginMiddleware, function(req, res, next) {
  let ref = req.url.split("/").slice(0, -2).join("/");
  // console.log(ref);
  let arr = classifier();
  res.render('main', {pics: arr[0], videos: arr[1], dirs: arr[2], ref: ref});

});

router.get("/1222/*", checkLoginMiddleware, function(req, res, next) {
  try {
    let ref = req.url.split("/").slice(0, -2).join("/");
    // console.log(ref);
    let arr = classifier(req.url.slice(6));
    res.render('main', {pics: arr[0], videos: arr[1], dirs: arr[2], ref: ref});
  } catch {
    res.redirect("/1222/");
  }
}); 

// 處理文件上傳
// multer 
// 處理資料夾建立與刪除
router.post("/1222/*", checkLoginMiddleware,(req, res) => {
  // console.log(req.body);
  // console.log(Object.keys(req.body).length);
  if (Object.keys(req.body).length == 0) {
    console.log("上傳中");
    upload(req, res, function (err) {
      if (err) {
          // ERROR occurred (here it can be occurred due
          // to uploading image of size greater than
          // 1MB or uploading different file type)
          return res.send(err);
      } 
      res.redirect(req.url);
    });
  } else {
    const {command, name} = req.body
    // console.log(command, des, name);
    let folder_path = req.url.replace("1222", "media");

    if(command == "create") {
      try {
        if (!fs.existsSync(__dirname+"/../public"+folder_path+name)) {
          fs.mkdirSync(__dirname+"/../public"+folder_path+name);
        } else {
          console.log("Folder already exist")
        }
      } catch (err) {
        console.log("Failed to create folder");
        console.error(err);
      }
    } else if (command == "delete") {
      try {
        if (fs.existsSync(__dirname+"/../public"+name)) {
          rimraf.sync(__dirname+"/../public"+name);
        } else {
          console.log("Folder doesn't exist")
        }
      } catch (err) {
        console.log("Failed to delete folder");
        console.error(err);
      }
    } else {
      console.log("Invalid Payload");
    }
  }
  res.render(req.url);

});

router.post("/del/*", checkLoginMiddleware, (req, res) => {
  let web_path = req.url.replace("/del/", "");
  // 路徑包含中文時，使用 decodeURI 來確保不會出現亂碼
  let dir_path = decodeURI(__dirname+"/../public/"+web_path);
  // 刪除檔案
  try {
    fs.unlink(dir_path, (err)=> {
      if(err == null) {
        console.log(`刪除成功`);
        return
      } 
      console.log(`刪除失敗 ${err}`);
    });
    let ref = `/${req.get('Referrer').split("/").slice(3).join("/")}`
    res.redirect(ref);
  } catch {
    res.redirect("/1222/");
  }
});

module.exports = router;
