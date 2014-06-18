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
    if (file.indexOf('https://gist.github.com/') == 0) {
          generateSlide(file, '<script src="' + file + '"></script>');
    }
    else {
      md = fs.readFileSync(file, {encoding: "utf8"});
      generateSlide(file, marked(md));
    }
	});
  done();

  function generateSlide(title, content){
    ejsOpts.slides.push({
      title: title,
      content: content
    });
  };

	function done(){
    generateSlide('The End', marked('# Thanks!\n[The beginning](#slide-0)'));
    var html = ejs.render(template, ejsOpts);
    cb(null, html);
	}
}

