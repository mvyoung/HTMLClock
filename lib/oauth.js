var client_id;
var type;
var callback_function;

var init = function(login) {
   client_id = login['client_id'];
   type = login['type'];
   callback_function = login['callback_function'];
};

var login = function() {
   window.open("https://api.imgur.com/oauth2/authorize?client_id=" + client_id + "&response_type=" + type + "&state=lab9");
};