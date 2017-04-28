
exports.buildCfg = {
  "outputPath": "output_f",
  "staticPath": "/"
};

exports.appCfg = {
  "proxy": {
    "/some/api1/": "http://testhost1", //以“/some/api1”开头的接口，如 “/some/api1/some/method” 在mock模式下会指向src/mock/some_method.json  dev模式下会重定向到http://testhost1/some/api1/some/method
  }
};



