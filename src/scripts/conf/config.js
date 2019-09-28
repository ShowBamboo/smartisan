//做配置（配置每一个模块的加载路径）
requirejs({
    baseUrl: "http://localhost:8000/",
    paths: {
        "jquery": "static/scripts/jquery-3.3.1.min",
        "swiper": "static/scripts/swiper",
        "jq.ui": "static/scripts/jquery-ui",
        "css": "scripts/lib/css",
        "cookie": "static/scripts/jquery.cookie"
        // "myfun": "scripts/mylib/ma",
        // "common": "scripts/common/common",
        // "zoom": "scripts/lib/jquery.jqzoom-core",
    },
    shim: {
        // "zoom": {
        //     deps: ["jquery"]
        // },
        "swiper": {
            deps: ["css!static/styles/swiper.css"]
        }
    }
})