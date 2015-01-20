var getTime = function() {
   var date = new Date();
   var time = zero_pad(date.getHours()) + ":" + zero_pad(date.getMinutes()) + ":" + zero_pad(date.getSeconds());
   document.getElementById("clock").innerHTML = time;
   setTimeout(getTime, 1000);
};

var zero_pad = function(time) {
   if (time < 10) {
      return "0" + time;
   } else {
      return time;
   }
}