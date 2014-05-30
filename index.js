var fs = require("fs");
var path = require("path");

var marked = require("marked");
var ejs = require("ejs");

var filename = path.join(__dirname, "./template.ejs");
var template = fs.readFileSync(filename, "utf8");

module.exports = function(opts, cb){
	var ejsOpts = {};
	ejsOpts.filename = filename;
	ejsOpts.delayTime = opts.delaySeconds;
	ejsOpts.slides = [];

	var i = 0;
	opts.files.forEach(function(file){
		i++;
		fs.readFile(file, "utf8", function(err, md){
			if(err){
				cb(err);
				cb = function(){};
			}
			else{
				var content =  marked(md);
				ejsOpts.slides.push({
					title: file,
					content: content
				});
				i--;
				done();
			}
		});
	});

	function done(){
		if(i==0){
			var html = ejs.render(template, ejsOpts);
			cb(null, html);
		}
	}
}

