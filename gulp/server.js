'use strict';

var path = require('path');
var gulp = require('gulp');
var conf = require('./conf');
var http = require('http');

var browserSync = require('browser-sync');
var browserSyncSpa = require('browser-sync-spa');
var runSequence = require('run-sequence');

var util = require('util');
var fs = require('fs');

var proxyMiddleware = require('http-proxy-middleware');
var mocks = {
    "data": function (req, res) {
        res.setHeader("Content-Type", "application/json");
        var path = __dirname + '/../src' + req.url;
        fs.readFile(path, function(err, data) {
            if(err == null) {
                var json = JSON.parse(data);
                var obj = {
                    data: json
                };
                res.end(data);
            } else {
                res.end(err);
            }
        });
    }
}

function browserSyncInit(baseDir, browser) {
    browser = browser === undefined ? 'default' : browser;

    var routes = null;
    if(baseDir === conf.paths.src || (util.isArray(baseDir) && baseDir.indexOf(conf.paths.src) !== -1)) {
        routes = {
            '/bower_components': 'bower_components',
            '/static': 'static',
            '/build': 'build',
            '/awesome': 'awesome'
        };
    }

    var server = {
        baseDir: baseDir,
        routes: routes,
        middleware: [function (req, res, next) {
            res.setHeader('Access-Control-Allow-Origin', '*');
            next();
        }]
    };

    /*
     * You can add a proxy to your backend by uncommenting the line below.
     * You just have to configure a context which will we redirected and the target url.
     * Example: $http.get('/users') requests will be automatically proxified.
     *
     * For more details and option, https://github.com/chimurai/http-proxy-middleware/blob/v0.9.0/README.md
     */
    var options = {target: 'http://localhost:8899', changeOrigin: true,
        onProxyRes: function(proxyRes, req, res) {
            //proxyRes.statusCode = 302;
            proxyRes.headers['Access-Control-Allow-Origin'] = '*';
            proxyRes.headers['x-add'] = 'foobar';
            if(proxyRes.statusCode === 302 && req.url != '/user/logout' && req.url != '/user/login') {
                //proxyRes.headers['location'] = proxyRes.headers['location'].replace('8899', '3000');
                proxyRes.statusCode = 401; 
            }
        },
        onProxyReq(proxyReq, req, res) {
            // add custom header to request
            console.log(req.url);
        }};
    server.middleware.push(proxyMiddleware(['/api', '/user', '/login.html'], options));
    browserSync.instance = browserSync.init({
        startPath: '/',
        server: server,
        browser: browser
    }, function (err, bs) {
        bs.addMiddleware('', function (req, res, next) {
            if (req.url.indexOf('/data') === 0) {
                return mocks['data'](req, res);
            }
            next();
        }, {override: true});
    });
}

browserSync.use(browserSyncSpa({
    selector: '[ng-app]'// Only needed for angular apps
}));

gulp.task('serve', function () {
    runSequence('config:dist', ['watch']);










    browserSyncInit([path.join(conf.paths.tmp, '/serve'), conf.paths.src]);
});

gulp.task('serve:dist', ['build'], function () {
    browserSyncInit(conf.paths.dist);
});

gulp.task('serve:e2e', ['inject'], function () {
    browserSyncInit([conf.paths.tmp + '/serve', conf.paths.src], []);
});

gulp.task('serve:e2e-dist', ['build'], function () {
    browserSyncInit(conf.paths.dist, []);
});
