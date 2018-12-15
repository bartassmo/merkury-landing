module.exports = function (grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        sass: {
            dist: {
                files: [{
                    expand: true,
                    cwd: 'src/scss',
                    src: '**/*.scss',
                    dest: 'dist/css',
                    ext: '.css'
                }],
                options: {
                    style: 'expanded'
                }
            }
        },
        cssmin: {
            target: {
                files: [{
                    expand: true,
                    cwd: 'dist/css',
                    src: ['*.css', '!*.min.css'],
                    dest: 'dist/css',
                    ext: '.min.css'
                }]
            }
        },
        concat: {
            dist: {
                src: ['src/js/*.js'],
                dest: 'dist/js/script.js'
            }
        },
        uglify: {
            my_target: {
                files: {
                    'dist/js/script.min.js': 'dist/js/script.js'
                }
            }
        },
        imagemin: {
            dynamic: {
                files: [{
                    expand: true,
                    cwd: 'src/img',
                    src: ['**/*.{png,gif,jpg}'],
                    dest: 'dist/img'
                }]
            }
        },
        watch: {
            css: {
                files: 'src/scss/**/*.scss',
                tasks: ['sass', 'cssmin']
            },
            scripts: {
                files: 'src/js/**/*.js',
                tasks: ['concat', 'uglify']
            },
            images: {
                files: 'src/img/**/*.{png,gif,jpg}',
                tasks: ['imagemin']
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-imagemin');
    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.registerTask('default', ['sass', 'cssmin', 'concat', 'uglify', 'imagemin', 'watch']);
}