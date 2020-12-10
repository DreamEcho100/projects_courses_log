const express = require('express');

const app = express();

// You typically want to render templates like this:

// app.get('/', function(req, res){
//   res.render('index.ejs');
// });

// However you can also deliver static content - to do so use:

// app.use(express.static(__dirname + '/public'));

// Now everything in the /public directory of your project
// will be delivered as static content at the root of your site

app.use(express.static(__dirname + '/public'));
app.listen(3000);