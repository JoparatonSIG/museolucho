'use strict';


module.exports = function(grunt) {
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-stylus');
  grunt.loadNpmTasks('grunt-contrib-csslint');
  grunt.loadNpmTasks('grunt-bower-task');
  grunt.loadNpmTasks('grunt-csscomb');
  grunt.loadNpmTasks('grunt-jscs');
  grunt.loadNpmTasks('grunt-githooks');
//  grunt.loadNpmTasks('grunt-karma');
//  grunt.loadNpmTasks('grunt-mocha-test');
  grunt.loadNpmTasks('grunt-shell');
  grunt.loadTasks('grunt');

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    jscs: {
      options: {
        config: '.jscsrc',
        reporter: 'checkstyle'
      },
      src: [
        'GruntFile.js',
        'src/**/*.js',
        '!src/public/lib/**',
        '!src/public/css/**',
        '!src/public/js/**',
        '!src/stylus/**'
      ]    },
    jshint: {
      options: {
        jshintrc: '.jshintrc',
        reporter: 'checkstyle'
      },
      src: [
        'GruntFile.js',
        'src/**/*.js',
        '!src/public/lib/**',
        '!src/public/js/**',
        '!src/stylus/**',
        '!src/public/css/**'
      ]
    },
    githooks: {
      all: {
        options: {
          endMarker: ''
        },
        'pre-commit': 'analyze',
        'post-checkout': 'shell:gitlog',
        'post-commit': 'shell:gitlog',
        'post-merge': 'shell:gitlog shell:npminstall'
      }
    },
    shell: {
      gitlog: {
        command: 'git log -1 > git-info.txt'
      },
      npminstall: {
        command: 'npm install'
      },
      logClean: {
        command: 'rm -f logs/*.log'
      },
      cpcss: {
        command: 'mv src/stylus/*.css src/public/css'
      }
    },
    mochaTest: {
      all: {
        options: {
          reporter: 'spec'
        },
        src: ['test/**/*Test.js', '!test/public/js/**/*Test.js']
      }
    },
    karma: {
      client: {
        configFile: 'karma.conf.js'
      }
    },
    autoprefixer: {
      options: {
        browsers: [
          'Android 2.3',
          'Android >= 4',
          'Chrome >= 20',
          'Firefox >= 24', // Firefox 24 is the latest ESR
          'Explorer >= 8',
          'iOS >= 6',
          'Opera >= 12',
          'Safari >= 6'
        ]
      },
      main: {
        expand: true,
        flatten: true,
        src: 'src/stylus/*.css',
        dest: 'src/public/css/'
      }
    },
    stylus: {
      compile: {
        options: {
      use: [
        function(){ return require('autoprefixer-stylus')('last 3 versions', 'ie 8')}
      ],
          compress: false,
          paths: ['src/stylus']
        },
        files: {
          'src/stylus/magnific-popup.css': 'src/stylus/magnific-popup.styl',
          'src/stylus/museo.css': 'src/stylus/museo.styl',
          'src/stylus/plantilla.css': 'src/stylus/plantilla.styl',
          'src/stylus/stacktable.css': 'src/stylus/stacktable.styl',
          'src/stylus/submit-button.css': 'src/stylus/submit-button.styl',
          'src/stylus/fonts.css': 'src/stylus/fonts.styl'
        }
      }
    },
    bower: {
      install: {
        options: {
          targetDir: 'src/public/lib',
          layout: 'byType',
          install: true,
          verbose: false,
          cleanTargetDir: false,
          cleanBowerDir: true,
          bowerOptions: { forceLatest:true }
        }
      }
    },
    csscomb: {
      museo: {
          files: {
              'src/stylus/magnific-popup.css': ['src/public/css/magnific-popup.css'],
              'src/stylus/museo.css': ['src/public/css/museo.css'],
              'src/stylus/plantilla.css': ['src/public/css/plantilla.css'],
              'src/stylus/stacktable.css': ['src/public/css/stacktable.css'],
              'src/stylus/submit-button.css': ['src/public/css/submit-button.css'],
              'src/stylus/fonts.css': ['src/public/css/fonts.css']
          }
      }
    },
    csslint: {
       options: {
           force: true,
           absoluteFilePathsForFormatters: true,
           formatters: [
               {id: 'compact', dest: 'quality/report/css/compact.xml'}
           ]
       },
       strict:{
           options:{
               force: true,
               import:2,
               "box-model":false,
           },
           src:['src/public/css/*.css','!src/public/css/bootstrap*'],
       },
       lax: {
            options: {
                import: false
            },
       src: [
         'src/public/css/magnific-popup.css',
         'src/public/css/museo.css',
         'src/public/css/plantilla.css',
         'src/public/css/stacktable.css',
         'src/public/css/submit-button.css',
         'src/public/css/fonts.css'
       ]
      }
    }
  });

  grunt.registerTask('default', ['analyze']);
  grunt.registerTask('bower', ['bower']);
  grunt.registerTask('css', ['stylus', 'shell:cpcss', 'csscomb', 'csslint']);
  grunt.registerTask('test', 'Runs unit tests', ['mochaTest', 'karma:client']);
  grunt.registerTask('analyze', 'Validate code style', ['jshint', 'jscs']);
};
