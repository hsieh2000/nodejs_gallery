const fs = require("fs");
const sizeOf = require("image-size");
const { promisify } = require('util');
const convert = require('heic-convert');

module.exports = function (web_path="") {
  // 路徑包含中文時，使用 decodeURI 來確保不會出現亂碼
    let dir_path = decodeURI(__dirname+"/../public/media/"+web_path);

    let files = fs.readdirSync(dir_path);
    let pics = [];
    let videos = [];
    let dirs = [];
  
    files.forEach(file => {
      let file_type = fs.statSync(dir_path+"/"+file);
      // 過濾隱藏檔與備份檔
      if (file[0] !== ".") {
        if (file_type.isFile()) {
          ext_Name = String(file.split('.').pop()).toLowerCase();
          switch (ext_Name) {
            case "heic":
              (async () => {
                const inputBuffer = await promisify(fs.readFile)(dir_path+"/"+file);
                const outputBuffer = await convert({
                  buffer: inputBuffer, // the HEIC file buffer
                  format: 'JPEG',      // output format
                  quality: 1           // the jpeg compression quality, between 0 and 1
                });

                await promisify(fs.writeFile)(dir_path+"/"+file.replace("heic", "jpeg"), outputBuffer).then(() => {
                  fs.unlink(dir_path+"/"+file, (err)=> {
                    console.log(`${file} 刪除失敗`);
                  });
                }).catch((err) => {console.log(err)});

                pics.push(decodeURI(web_path+file.replace("heic", "jpeg")));
                // console.log(web_path+file.replace("heic", "jpeg"));

              })();
              
              console.log(`heic: ${file}`);
              break
            case "png":
            case "jpeg":
            case "jpg":
              pics.push(decodeURI(web_path+file));
              // console.log(web_path+file);
              break;
            case "mov":
            case "mp4":
              videos.push(decodeURI(web_path+file));
              // console.log(web_path+file);
              break;
            default:
              console.log("err");
              break;
          }
    
        } else if(file_type.isDirectory) {
          console.log("isDirectory");
          dirs.push(web_path+file+"/");
        } else {
          console.log("can't handle");
        }
      }
    });
    return [pics, videos, dirs]
  }
  