var http = require('http');

var client_id;
var type;
var callback_function;

var init = function(login) {
   client_id = '6a580e02be5b1d7';
   type = 'token';
   callback_function = function() {
      var options = {
         host: 'https://api.imgur.com'
         path: '/3/account/me'
      };
      http.request(options, callback_function).end();
   };
}

var login = function() {
   window.open("https://api.imgur.com/oauth2/authorize?client_id=6a580e02be5b1d7&response_type=token&state=lab9")
}