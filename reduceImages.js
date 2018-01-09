var fs = require('fs');
var path = require('path');
var { createCanvas, Image } = require('canvas');

function removeThumbnails(dir) {
  if (fs.existsSync(dir)) {
    fs.readdirSync(dir).forEach((file, index) => {
      var curPath = path.join(dir, file);
      if (fs.lstatSync(curPath).isDirectory()) { // recurse
        removeThumbnails(curPath);
      } else { // delete file
        fs.unlinkSync(curPath);
      }
    });
    fs.rmdirSync(dir);
  }
};

function resizeBase64Img(category_name) {
  removeThumbnails(path.join('images', 'thumbnails'));
  var image_dir = path.join('images', category_name);
  fs.readdir(image_dir, (err, files) => {
    if (err) return console.error(err);
    for (let i = 0; i < files.length; i++) {
      let file = files[i];
      if(path.extname(file) === '.jpg') {
        fs.readFile(path.join(image_dir, file), (err, data) => {
          if (err) return console.error(err);

          var img = new Image;
          img.src = data;
          console.log(img);
          var w = img.width/10;
          var h = img.height/10;

          var canvas = createCanvas(w, h);
          var context = canvas.getContext('2d');
          context.drawImage(img, 0, 0, w, h);

          var thumbnail_dir = path.join('images', 'thumbnails', category_name);
          if(!fs.existsSync(thumbnail_dir)) {
            var all_thumbnails_dir = path.join('images', 'thumbnails');
            if(!fs.existsSync(all_thumbnails_dir)) fs.mkdirSync(all_thumbnails_dir);
            fs.mkdirSync(thumbnail_dir);
          }

          var thumb_path = path.join(thumbnail_dir, i+'.jpg');
          var img_path = path.join(image_dir, i+'.jpg');
          if(i < 10){
            thumb_path = path.join(thumbnail_dir, '0' + i + '.jpg');
            img_path = path.join(image_dir, '0' + i + '.jpg');
          }
          var out = fs.createWriteStream(thumb_path);
          var stream = canvas.createJPEGStream({ bufsize: 4096, quality: 75 });

          fs.unlink(path.join(image_dir, file), (err) => {
            if (err) return console.error(err);
            fs.writeFile(img_path, data, (err) => {
              if (err) return console.error(err);
              console.log('Successfully replaced', file)
            });
          });
          stream.pipe(out);
        });
      }
    }
  });
}
resizeBase64Img('justfun');
resizeBase64Img('engagement');
