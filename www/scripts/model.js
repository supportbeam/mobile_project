// model

var app = function(app) {

  app.Model = function() {
    var m = this;
    var colors = m.colors = [frame.green, frame.pink, frame.blue];

    var colorNum = 0;
    m.nextColor = function() {
      colorNum++;
      return colors[colorNum % colors.length]
    }

  }

  return app;
}(app || {});
