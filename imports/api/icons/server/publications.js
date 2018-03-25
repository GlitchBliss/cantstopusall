import { Meteor } from 'meteor/meteor';

var fs = require('fs');

function recursiveBrowse(path, output, absoluteToRemove) {

  _.each(fs.readdirSync(path), function (file) {
    if (file.indexOf('.svg') != -1) {
      finalPath = path.replace(absoluteToRemove, '');
      output.added('icons', file, { 'label': file, 'url': finalPath + '/' + file });
    }

    try {
      let subPath = path + '/' + file;
      if (fs.readdirSync(subPath)) {
        recursiveBrowse(subPath, output, absoluteToRemove);
      }
    } catch (e) {
    }

  });

}

Meteor.publish('icons.all', function () {
  var path = require('path');
  var meteor_root = fs.realpathSync(__meteor_bootstrap__.serverDir + '/../');
  var application_root = fs.realpathSync(meteor_root + '/../');

  // if running on dev mode
  if (path.basename(fs.realpathSync(meteor_root + '/../../../')) == '.meteor') {
    application_root = fs.realpathSync(meteor_root + '/../../../../');
  }

  let iconPath = application_root + '/public/img/icons';
  recursiveBrowse(iconPath, this, application_root + '/public/');
  this.ready();
});