var fs = require('fs');
var path = require('path');
var { createCanvas, Image } = require('canvas');

function resizeBase64Img() {
  var image_dir = 'images/engagement';
  fs.readdir(image_dir, (err, files) => {
    if (err) return console.error(err);
    for (let i = 0; i < files.length; i++) {
      let file = files[i];
      if(path.extname(file) === '.jpg') {
        fs.readFile(path.join(image_dir, file), (err, data) => {
          if (err) return console.error(err);

          var img = new Image;
          img.src = data;
          var w = img.width/10;
          var h = img.height/10;
          var canvas = createCanvas(w, h);
          var context = canvas.getContext('2d');

          context.drawImage(img, 0, 0, w, h);

          var out = fs.createWriteStream(path.join('images/thumbnails', i+'.jpg'));
          var stream = canvas.createJPEGStream({ bufsize: 4096, quality: 75 });

          fs.writeFile(path.join(image_dir, i+'.jpg'), data, (err) => {
            if (err) return console.error(err);
            fs.unlink(path.join(image_dir, file), (err) => {
              if (err) return console.error(err);
              console.log('succesfully removed', file)
            });
          });
          stream.pipe(out);
        });
      }
    }
  });
}
resizeBase64Img();
