// view
var app = function(app) {

    app.View = function(model, layoutManager) {

        var v = this;
        zog(model.colors);

        var page1 = v.page1 = new Container();

        // ~~~~~~~  HEADER ~~~~~~~~~~~
        var header = new Container(500,100).addTo(page1);
        var logo = new Label("Cat Mouse").center(header);

        var logo = v.logo = frame.asset("logo.jpg");
        logo.startY = stageH*.25;
        logo.addTo(stage).scaleTo(stage).pos(0, logo.startY);



        // ~~~~~~~  CONTENT ~~~~~~~~~~~
        var content = new Container(500,500).addTo(page1);
        // put intro screen


        // ~~~~~~~  FOOTER ~~~~~~~~~~~
        var footer = v.tabs1 = new Tabs({
            tabs:["Home", "Play"]
        }).addTo(page1);

        // ~~~~~~~  LAYOUT ~~~~~~~~~~~

        var layout1 = v.layout1 = new Layout(page1,[
            {object:header, marginTop:5, backgroundColor:frame.yellow},
            {object:content, marginTop:5, backgroundColor:frame.green},
            {object:footer, marginTop:5, maxWidth:90, minHeight:15}
        ], 5, frame.grey, null, new Shape(), stage);
        layoutManager.add(layout1);




        // PAGE 2

        var page2 = v.page2 = new Container();

        // ~~~~~~~  HEADER ~~~~~~~~~~~
        var header = new Container(500,100).addTo(page2);
        var logo = new Label("Cat Mouse").center(header);


        // ~~~~~~~  CONTENT ~~~~~~~~~~~
        var content = new Container(500,500).addTo(page2);
        var circle = v.circle = new Circle(100, model.colors[0])
            .center(content)
            .cur();
        circle.drag();

        // ~~~~~~~  FOOTER ~~~~~~~~~~~
        var footer = v.tabs2 = new Tabs({
            tabs:["Home", "Play"]
        }).addTo(page2);
        footer.selectedIndex = 1;

        // ~~~~~~~  LAYOUT ~~~~~~~~~~~

        var layout2 = v.layout2 = new Layout(page2,[
            {object:header, marginTop:5, backgroundColor:frame.yellow},
            {object:content, marginTop:5},
            {object:footer, marginTop:5, maxWidth:90, minHeight:15}
        ], 5, frame.grey, null, new Shape(), stage);
        layoutManager.add(layout2);


    }

    return app;
}(app || {});
