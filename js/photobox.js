var slidenum = 1;
function openModal(){
  var modal = document.getElementById('photosModal');
  modal.classList += ' show';
}
function currentSlide(thumb, w, h){
  var thumbObject = document.getElementById('thumb' + thumb);
  w = w | thumbObject.naturalWidth;
  h = h | thumbObject.naturalHeight;

  var image = document.getElementById('photoObject');
  var photoHolder = document.getElementById('photosHolder');
  photosHolder.classList += ' is-loading';

  image.src = 'images/engagement/' + thumb +'.jpg';
  image.onload = function (){
    if(h > w){
      photoHolder.classList += ' modal-content_vertical';
      image.classList ='img-fluid-flipped';
    }
    else {
      photoHolder.classList = photoHolder.classList.toString().replace(' modal-content_vertical', '');
      image.classList = 'img-fluid';
    }
    photoHolder.classList = photoHolder.classList.toString().replace(' is-loading', '');
  }


  slidenum = Number(thumb);
}

function moveSlide(direction, max) {
  var nextSlide = direction + slidenum;
  if (nextSlide < 1) nextSlide = max;
  else if(nextSlide > max) nextSlide = 1;
  currentSlide(nextSlide);
}

var thumbs = document.getElementsByClassName('img-thumbnail');
for (var i = 0; i < thumbs.length; i++) {
  var thumb = thumbs[i];
  if(thumb.naturalHeight > 400) {
    thumb.width = 150;
  }
  else {
    thumb.width = 200;
  }
}
