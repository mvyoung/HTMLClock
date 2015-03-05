
var client_id;
var type;
var callback_function;

var init = function(login) {
   client_id = '6a580e02be5b1d7';
   type = 'token';
   callback_function = function() {
      $.ajax({url: "https://api.imgur.com/3/account/me", success: function(result) {
         alert(result.url);
      }});
   };
}

var login = function() {
   window.open("https://api.imgur.com/oauth2/authorize?client_id=6a580e02be5b1d7&response_type=token&state=lab9")
}