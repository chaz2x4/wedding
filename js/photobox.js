var slidenum = 1;
var photoHolder = document.getElementById('photosHolder');
var image = document.getElementById('photoObject');
var modal = document.getElementById('photosModal');
var max;

function rmClass(object, string){
  if(object.classList) {
    if(!string.match(' ')){
      string = ' ' + string;
    }
    object.classList = object.classList.toString().replace(new RegExp(string, 'g'), '');
  }
}

function openModal(max_thumbs){
  modal.classList += ' show';
  max = max_thumbs;
}

function closeModal() {
    rmClass(modal, 'show');
}

function currentSlide(thumb, w, h){
  var thumbObject = document.getElementById('thumb' + thumb);
  w = w | thumbObject.naturalWidth;
  h = h | thumbObject.naturalHeight;

  photosHolder.classList += ' is-loading';

  image.src = 'images/engagement/' + thumb +'.jpg';
  image.onload = function (){
    if(h > w){
      photoHolder.classList += ' modal-content_vertical';
      image.classList ='img-fluid-flipped';
    }
    else {
      rmClass(photoHolder, 'modal-content_vertical')
      image.classList = 'img-fluid';
    }
    rmClass(photoHolder, 'is-loading')
  }


  slidenum = Number(thumb);
}

function moveSlide(direction) {
  var nextSlide = direction + slidenum;
  if (nextSlide < 1) nextSlide = max;
  else if(nextSlide > max) nextSlide = 1;
  currentSlide(nextSlide);
}

var thumbs = document.getElementsByClassName('img-thumbnail');
for (var i = 0; i < thumbs.length; i++) {
  var thumb = thumbs[i];
  thumb.width = 225;
}

window.addEventListener('click', (e) => {
    if(e.target == modal)
      closeModal();
});

var lastX;
photoHolder.addEventListener('touchstart', (e) => {
  lastX = e.changedTouches[0].clientX;
});
photoHolder.addEventListener('touchend', (e) => {
  var currentX = e.changedTouches[0].clientX;
  currentX -= lastX;
  if(currentX > 150) {
    moveSlide(1)
  }
  else if(currentX < -150){
    moveSlide(-1);
  }
});

window.addEventListener('keydown', (e) => {
  var isModalVisible = modal.classList.contains('show');
  if(isModalVisible) {
    e.preventDefault();
    if(e.key === 'ArrowRight')
      moveSlide(1);
    else if(e.key === 'ArrowLeft')
      moveSlide(-1);
  }
});
