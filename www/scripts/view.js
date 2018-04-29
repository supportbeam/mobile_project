// view
var app = function(app) {

  app.View = function(model, layoutManager) {

    var v = this;

    var page1 = v.page1 = new Container();

    // ~~~~~~~  HEADER ~~~~~~~~~~~
    var header = new Container(500, 100).addTo(page1);
    var logo = frame.asset("logo.jpg").scaleTo(header, 100, 100).center(header);

    // ~~~~~~~  CONTENT ~~~~~~~~~~~
    var content = new Container(500, 500).addTo(page1);


    var text = "Help the Mouse!\n\n";
    text += "Avoid the Cats\n";
    text += "&\n";
    text += "Eat the Cheese!";

    var instructions = page1.instructions = new Label({
      text: text,
      color: "white",
      // size: "15",
      align: "center",
      fontOptions: "italic"
    }).center(content);

    // ~~~~~~~  FOOTER ~~~~~~~~~~~
    var footer = v.tabs1 = new Tabs({
      tabs: ["Home", "Play"],
      color: "orange",
      rollColor: "red"
    }).addTo(page1);

    // ~~~~~~~  LAYOUT ~~~~~~~~~~~

    var layout1 = v.layout1 = new Layout(page1, [{
        object: header,
        marginTop: 0,
        backgroundColor: frame.yellow
      },
      {
        object: content,
        marginTop: 0,
        backgroundColor: frame.green
      },
      {
        object: footer,
        marginTop: 0,
        backgroundColor: frame.yellow
      }
    ], 0, frame.grey, null, new Shape(), stage);
    layoutManager.add(layout1);



    // PAGE 2

    var page2 = v.page2 = new Container();

    // ~~~~~~~  HEADER ~~~~~~~~~~~
    var header = new Container(500, 100).addTo(page2);
    var icon = frame.asset("icon.jpg").sca(0.1).center(header);

    // ~~~~~~~  CONTENT ~~~~~~~~~~~
    var content = new Container(500, 500).addTo(page2);

    var mouse = frame.asset("mouse.png")
      .addTo(content)
      .sca(.05);
    mouse.pos(content.width / 2, content.height - mouse.height);
    mouse.reg(mouse.width / 2, mouse.height);

    stage.on("stagemousemove", startGame, null, true);

    function startGame() {
      Ticker.add(animate);
      dropCheese();
      dropCats();
    };

    var cats = new Container();
    content.addChild(cats);

    function dropCats() {
      interval([1000, 1200], function() {
        var cat = frame.asset("cat.png").clone();
        cat
          .reg(cat.width / 2, cat.height)
          .sca(.05)
          .pos(rand(cat.width, content.width - cat.width), -10)
          .addTo(cats);

        var clawed = new Label({
          text: "-1",
          color: "red"
        });
        clawed.reg(clawed.width / 2, clawed.height - 5);
        cat.clawed = clawed;
      });
    };

    var cheeseContainer = new Container().addTo(content);

    function dropCheese() {

      interval([1000, 1500], function() {
        var cheese = frame.asset("cheese.png").clone();
        cheese
          .reg(cheese.width / 2, cheese.height)
          .sca(0.05)
          .pos(rand(cheese.width, content.width - cheese.width), -10)
          .addTo(cheeseContainer);

        var point = new Label({
          text: "+1",
          color: "white"
        });
        point.reg(point.width / 2, point.height - 10);
        cheese.point = point;
      });
    };

    var damp = new Damp(null, .3);
    damp.immediate(mouse.x);

    var speed = 5;

    function animate() {
      mouse.x = damp.convert(stage.mouseX - content.x);

      loop(cats, function(cat) {
        cat.y += speed;
        if (mouse.hitTestBounds(cat)) {
          clawed(cat);
        }
      }, true);

      var cheese;
      loop(cheeseContainer, function(cheese) {
        cheese.y += speed;
        if (mouse.hitTestBounds(cheese)) {
          grab(cheese);
        }
        if (cheese.y >= content.height + cheese.height + 10) {
          var point = cheese.point;
          point = null;
          cheeseContainer.removeChild(cheese);
          cheese = null;
        }
      }, true);
    };

    function clawed(cat) {
      var clawed = cat.clawed;
      if (clawed) {
        clawed
          .addTo(content)
          .pos(cat.x, cat.y - 100)
          .animate({
            alpha: 0
          }, 100, null, remove, null, 100);
        frame.asset("meow.mp3").play();
      }
      cat.removeFrom(cats);
      cat = null;
    };

    function grab(cheese) {
      var point = cheese.point;
      cheese.removeFrom(cheeseContainer);
      cheese = null;
      point
        .addTo(content)
        .pos(mouse.x, mouse.y - 100)
        .animate({
          alpha: 0
        }, 100, null, remove, null, 100);
      frame.asset("squeak.mp3").play();
    };

    function remove(obj) {
      stage.removeChild(obj);
      obj = null;
    }


    // ~~~~~~~  FOOTER ~~~~~~~~~~~
    var footer = v.tabs2 = new Tabs({
      tabs: ["Home", "Play"]
    }).addTo(page2);
    footer.selectedIndex = 1;

    // ~~~~~~~  LAYOUT ~~~~~~~~~~~

    var layout2 = v.layout2 = new Layout(page2, [{
        object: header,
        marginTop: 0,
        backgroundColor: frame.yellow
      },
      {
        object: content,
        marginTop: 0
      },
      {
        object: footer,
        marginTop: 0,
        backgroundColor: frame.yellow
      }
    ], 0, frame.grey, null, new Shape(), stage);
    layoutManager.add(layout2);


  }

  return app;
}(app || {});
