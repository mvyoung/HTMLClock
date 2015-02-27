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

var showAlarmPopup = function() {
   $("#mask").removeClass("hide");
   $("#popup").removeClass("hide");
}

var hideAlarmPopup = function() {
   $("#mask").addClass("hide");
   $("#popup").addClass("hide");
}

var insertAlarm = function(object, hours, min, ampm, alarmName) {
   console.log(hours + ':' + min + ' ' + ampm);
   var newDiv = $("<div>");
   newDiv.addClass(".flexable");
   var subDiv = $("<div>");
   subDiv.addClass("name");
   subDiv.text(alarmName);
   newDiv.append(subDiv);
   var subsubDiv = $("<div>");
   subsubDiv.addClass("time");
   subsubDiv.text(hours + ':' + min + ' ' + ampm);
   newDiv.append(subsubDiv);
   $("#alarms").append(newDiv);
   var deleteButton = $("<button>");
   deleteButton.text("Delete");
   deleteButton.click(function () {
      object.destroy({
         success: function(object) {
            newDiv.remove();
         },
         error: function(object, error) {
            console.log("ERROR ON DELETE ALARM");
         }
      })
      ga('send', 'event', 'Alarm', 'Delete');
   });
   newDiv.append(deleteButton);
}

var addAlarm = function() {
   var hours, mins, ampm, alarmName;

   function checkLoginState() {
      FB.getLoginStatus(function(response) {
         if (response.status === 'connected') {
            // continue code execution
         } else {
            return;
         }
      });
   }

   hours = $("#hours option:selected").text();
   mins = $("#mins option:selected").text();
   ampm = $("#ampm option:selected").text();
   alarmName = $("#alarmName").val();
   
   FB.api('/me', function(response) {
      console.log(response.name);
      user = response.name;
   });
   
   var AlarmObject = Parse.Object.extend("Alarm");
   var alarmObject = new AlarmObject();
   alarmObject.save({"username": user, "hours": hours, "mins": mins, "ampm": ampm, "alarmName": alarmName}, {
      success: function(object) {
         insertAlarm(object, hours, mins, ampm, alarmName);
         hideAlarmPopup();
      }
   });

   ga('send', 'event', 'Alarm', 'Add');
}

var getAllAlarms = function(user) {
   Parse.initialize("WkFQV21CSDe7o4tdonGdbLrBuZpmZt322rsw28TN", "A5mmOtol2Cv0IOKM6dSLltMX2uXnUgvkfiwZJPjP");
   var AlarmObject = Parse.Object.extend("Alarm");
   var query = new Parse.Query(AlarmObject);
   query.equalTo("username", user);
   query.find({
      success: function(results) {
         for (var i = 0; i < results.length; i++) { 
            insertAlarm(results[i], results[i].get('hours'), results[i].get('mins'), results[i].get('ampm'), results[i].get('alarmName'));
         }
      }
   });
}