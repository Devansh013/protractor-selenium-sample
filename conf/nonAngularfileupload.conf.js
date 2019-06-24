
username= process.env.LT_USERNAME || "<your username>",
accessKey=  process.env.LT_ACCESS_KEY || "<your accessKey>",

exports.config = {
  'specs': ['../specs/nonangular.js'],

  seleniumAddress: 'https://'+ username +':'+ accessKey  +'@hub.lambdatest.com/wd/hub',

  'capabilities': {
    'build': 'protractor-LambdaTest-Single',
    'browserName': 'chrome',
    'version':'73.0',
    'platform': 'Windows 10',
    'video': true,
    'network': true,
    'console': true,
    'visual': true
  },
  onPrepare: () => {

    myReporter = {
      specStarted: function(result) {
        specStr= result.id
        spec_id = parseInt(specStr[specStr.length -1])
        browser.getProcessedConfig().then(function (config) {
          var fullName = config.specs[spec_id];
          browser.executeScript("lambda-name="+fullName.split(/(\\|\/)/g).pop())
        });
      },
      specDone: function(result) {
        browser.executeScript("lambda-status="+result.status);
      }
    };
    jasmine.getEnv().addReporter(myReporter);
},
  onComplete: () => {
    browser.quit();
  }

};
