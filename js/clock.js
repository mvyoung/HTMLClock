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

var getTemp = function() {
	$.getJSON("https://api.forecast.io/forecast/3d85f330198ebc40d2d89489e16fa3b4/35.300399,-120.662362?callback=?", function (data) {
      $("#forecastLabel").html(data.daily.summary);
      $("#forecastIcon").attr("src", "img/" + data.daily.icon + ".png");
      console.log(data.daily.icon);
      var maxTemp = data.daily.data[0].temperatureMax;

      if (maxTemp >= 90) {
         $("body").addClass("hot");
      } else if (maxTemp >= 80) {
         $("body").addClass("warm");
      } else if (maxTemp >= 70) {
         $("body").addClass("nice");
      } else if (maxTemp >= 60) {
         $("body").addClass("chilly");
      } else if (maxTemp < 60) {
         $("body").addClass("cold");
      }
      console.log(data.daily.data);
      console.log(data.daily.data[0].temperatureMax);
   })
}