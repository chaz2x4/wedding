var slidenum = 1;
var photoHolder = document.getElementById('photosHolder');
var image = document.getElementById('photoObject');
var modal = document.getElementById('photosModal');

function rmClass(object, string){
  if(object.classList) {
    object.classList = object.classList.toString().replace(' ' + string, '');
  }
}

function openModal(){
  modal.classList += ' show';
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

function moveSlide(direction, max) {
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
