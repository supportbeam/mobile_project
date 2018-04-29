// controller
var app = function(app) {

    app.makeController = function(m, v, p) {
        v.circle.on("click", function() {
            v.circle.color = m.nextColor();
            stage.update();
        });

        v.tabs1.on("change", function() {
            p.go(v.page2);
            v.tabs1.selectedIndex = 0;
        });

        v.tabs2.on("change", function() {
            p.go(v.page1);
            v.tabs2.selectedIndex = 1;
        });

    }

    return app;
}(app || {});
