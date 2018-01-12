var wedding_date = document.getElementById('wedding_date').value;
var countdownDate = new Date(wedding_date + " 09:00").getTime();
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

  document.getElementById("countdown_clock-days").innerHTML = days + " days";
  document.getElementById("countdown_clock-hours").innerHTML = hours + " hours";
  document.getElementById("countdown_clock-minutes").innerHTML = minutes + " minutes";
  document.getElementById("countdown_clock-seconds").innerHTML = seconds + " seconds";

  if(distance < 0) {
    document.getElementById("countdown_clock").innerHTML = "WE'RE MARRIED!"
    clearInterval(x);
  }
}, 1000);
