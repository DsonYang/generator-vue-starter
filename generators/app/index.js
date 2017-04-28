var Generator = require('yeoman-generator');
var yosay = require('yosay');
var mkdirp = require('mkdirp')
module.exports = class extends Generator {
	constructor(args, opts) {
	    super(args, opts);

  	}
  	initializing(){
  		
  		this.log(yosay('Welcome to the vue_webpack generator'));
  	}
  	prompting() {
  		return this.prompt([{
  		  type    : 'input',
	      name    : 'name',
	      message : 'Please give your project a name, default value is \''+this.appname+'\'',
	      default : this.appname 
  		},{
  		  type    : 'input',
	      name    : 'mode',
	      message : 'Which mode do you want to build your project?(1/2), default is 1\n  1:fast mode. Will use sass/iView/axios/underscore/vue-router/etc, so you can jump into the development right now \n  2:base mode. Will only generate the base structure, no extra utils or plugins\n',
	      default : "1"
  		}]).then((answers) => {
  			if (answers.name != "") {
	    		this.appname = answers.name
	    		this.destinationRoot('./'+answers.name)
	    	}else {
	    		this.destinationRoot('./')
	    	}
	    	this.mode = answers.mode
  		})
    	
  	}
  	writing(){
  		this.fs.copyTpl(
	      this.templatePath('_.babelrc'),
	      this.destinationPath('.babelrc')
	    );
	    this.fs.copyTpl(
	      this.templatePath('_.gitignore'),
	      this.destinationPath('.gitignore')
	    );
	    let pkg,src,cfg,rdm;
  		if (this.mode == 1) {
  			pkg = '_package_fast.json'
  			src = '_src_fast'
  			cfg = '_config_fast'
  			rdm = '_README_fast.md'
  		} else {
  			pkg = '_package.json'
  			src = '_src'
  			cfg = '_config'
  			rdm = '_README.md'
  		}
  		this.fs.copyTpl(
	      this.templatePath(pkg),
	      this.destinationPath('package.json'),
	      { proname: this.appname  }
	    );
	    this.fs.copyTpl(
	      this.templatePath(src),
	      this.destinationPath('./src')
	    );
	    mkdirp.sync(this.destinationPath('./src/assets/'));
	    mkdirp.sync(this.destinationPath('./src/public/plugins/'));
	    mkdirp.sync(this.destinationPath('./src/public/scripts/'));
	    mkdirp.sync(this.destinationPath('./src/public/styles/'));
	    mkdirp.sync(this.destinationPath('./src/pages/common/'));
	    
	    this.fs.copyTpl(
	      this.templatePath(cfg),
	      this.destinationPath('config')
	    );
	    this.fs.copyTpl(
	      this.templatePath(rdm),
	      this.destinationPath('README.md'),
	      { proname: this.appname  }
	    );
  		
  	}
};