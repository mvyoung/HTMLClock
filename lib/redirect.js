var redirect_init = function() {
   // First, parse the query string
   var params = {}, queryString = location.hash.substring(1),
       regex = /([^&=]+)=([^&]*)/g, m;
   while (m = regex.exec(queryString)) {
     params[decodeURIComponent(m[1])] = decodeURIComponent(m[2]);
   }

   localStorage.setItem('access_token', params['access_token']);
   window.opener.callback_function();
   window.close();
}