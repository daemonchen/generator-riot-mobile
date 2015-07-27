'use strict'
var generators = require('yeoman-generator');
// var _ = require('lodash');
var yosay = require('yosay');
module.exports = generators.Base.extend({
    init: function() {
        this.log(yosay('Welcome to the Riot.Js Mobile App generator!'))
        this.option('skip-install', {
            desc: 'Whether dependencies should be installed',
            defaults: false,
        })

        this.option('skip-install-message', {
            desc: 'Whether commands run should be shown',
            defaults: false,
        })
    },
    askForName: function() {
        var done = this.async()
        var prompts = [{
            name: 'appName',
            message: 'What\'s the name of your web app?',
            default: 'riotApp'
        }]
        this.prompt(prompts, function(props) {
            this.appName = props.appName
            done()
        }.bind(this))
    },

    askForPath: function() {
        var done = this.async()
        var prompts = [{
            name: 'appPath',
            message: 'In which directory do you want to generate the app?',
            default: this.appName.replace(' ', '_')
        }]
        this.prompt(prompts, function(props) {
            this.appPath = props.appPath
            done()
        }.bind(this))
    },
    writing: {

        git: function() {
            this.template('gitignore', this.appPath + '/.gitignore');
        },

        bower: function() {
            this.template('bowerrc', this.appPath + '/.bowerrc');
            this.template('_bower.json', this.appPath + '/bower.json');
        },

        gulpfile: function() {
            this.template('_Gulpfile.js', this.appPath + '/Gulpfile.js');
        },

        packageJSON: function() {
            this.template('_package.json', this.appPath + '/package.json');
        },

        jshint: function() {
            this.copy('jshintrc', this.appPath + '/.jshintrc');
        },

        editorConfig: function() {
            this.copy('editorconfig', this.appPath + '/.editorconfig');
        },

        html: function() {
            this.template('index.html', this.appPath + '/index.html')
        },

        app: function() {
            this.directory('app', this.appPath + '/app')
        }
    },
    // install: function() {
    //     if (['backbone:app', 'backbone'].indexOf(this.options.namespace) >= 0) {
    //         this.installDependencies({
    //             skipInstall: this.options['skip-install']
    //         });
    //     }
    // },
    end: function() {
        this.log(yosay('Finished generating, please run "npm install" and launch by "gulp" '))
    }
});