var finalhandler = require('finalhandler');
var http = require('http');
var serveStatic = require('serve-static');
var serve = serveStatic('public', {'index': ['index.html', 'index.htm']});
var array =  []


var server = http.createServer(function(request, response) {
	//debugger;
 
	var done = finalhandler(request, response);
	

if(request.method==="GET") {

serve(request, response, done);

} else if(request.method==="POST") {

	var body = '';

    request.on('data', function (data) {
        body += data;

        
        if (body.length > 1e6)
            request.connection.destroy();
    });

    request.on('end', function () {
        var bodyDecoded = decodeURIComponent(body)
        var bodyDecodedSplit = bodyDecoded.split('&')
    	var message = {}
    
    for (i = 0; i < bodyDecodedSplit.length; i++) {
    	var keyValue = bodyDecodedSplit[i].split("=")
		message[keyValue[0]] = keyValue[1];
    }
    
    array.push(message)

    console.log(message);
	
    response.writeHead(302, { 'Location': 'thankyou.html'}); //Here is the 302
    
    response.end();
       
   
     });



}	

});



server.listen(8888, "127.0.0.1");




