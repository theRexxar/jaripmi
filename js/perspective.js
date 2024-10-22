jQuery(document).ready(function($) {
  $(function() {

    // Platform Story
    var cardPlaStor = $(".platform-story");

    cardPlaStor.on("mousemove", function(e) {
      var x = e.clientX + $(window).scrollLeft() - $(this).offset().left;
      var y = e.clientY + $(window).scrollTop() - $(this).offset().top;

      var rY = map(x, 0, $(this).width(), -24, 24);
      var rX = map(y, 0, $(this).height(), -24, 24);

      $(this)
        .children(".ps-card-talent")
        .children(".ps-shape")
        .css(
          "transform",
          "rotateY(" + rY + "deg)" + " " + "rotateX(" + -rX + "deg)"
        );
    });

    cardPlaStor.on("mouseenter", function() {
      $(this)
        .children(".ps-card-talent")
        .children(".ps-shape")
        .css({
          transition: "all " + 0.05 + "s" + " linear",
          WebkitTransition: "all " + 0.05 + "s" + " linear"
        });
    });

    cardPlaStor.on("mouseleave", function() {
      $(this)
        .children(".ps-card-talent")
        .children(".ps-shape")
        .css({
          transition: "all " + 0.2 + "s" + " linear",
          WebkitTransition: "all " + 0.2 + "s" + " linear"
        });

      $(this)
        .children(".ps-card-talent")
        .children(".ps-shape")
        .css(
          "transform",
          "rotateY(" + 0 + "deg)" + " " + "rotateX(" + 0 + "deg)"
        );
    });

    // Product Showcase image
    var cardProShow = $(".product-showcase");

    cardProShow.on("mousemove", function(e) {
      var x = e.clientX + $(window).scrollLeft() - $(this).offset().left;
      var y = e.clientY + $(window).scrollTop() - $(this).offset().top;

      var rY = map(x, 0, $(this).width(), -24, 0);
      var rX = map(y, 0, $(this).height(), 0, 24);

      $(this)
        .children("img")
        .css(
          "transform",
          "rotateY(" + rY + "deg)" + " " + "rotateX(" + -rX + "deg)"
        );
    });

    cardProShow.on("mouseenter", function() {
      $(this)
        .children("img")
        .css({
          transition: "all " + 0.05 + "s" + " linear",
          WebkitTransition: "all " + 0.05 + "s" + " linear"
        });
    });

    cardProShow.on("mouseleave", function() {
      $(this)
        .children("img")
        .css({
          transition: "all " + 0.2 + "s" + " linear",
          WebkitTransition: "all " + 0.2 + "s" + " linear"
        });

      $(this)
        .children("img")
        .css(
          "transform",
          "rotateY(" + 0 + "deg)" + " " + "rotateX(" + 0 + "deg)"
        );
    });

    function map(x, in_min, in_max, out_min, out_max) {
      return ((x - in_min) * (out_max - out_min)) / (in_max - in_min) + out_min;
    }
  });
});
