var countdownDate = new Date("March 16 2019 09:00").getTime();
var updateCountdown = setInterval(function(){
  var now = new Date().getTime();
  var distance = countdownDate-now;
  var second = 1000;
  var minute = second*60;
  var hour = minute*60;
  var day = hour*24;
  var days = Math.floor(distance/day);
  var hours = Math.floor((distance%day)/hour);
  var minutes = Math.floor((distance%hour)/minute);
  var seconds = Math.floor((distance%minute)/second);

  document.getElementById("countdown_clock").innerHTML = days + "days" + hours + "hours "
  + minutes + "minutes " + seconds + "seconds ";

  if(distance < 0) {
    document.getElementById("countdown_clock").innerHTML = "WE'RE MARRIED!"
    clearInterval(x);
  }
}, 1000);
