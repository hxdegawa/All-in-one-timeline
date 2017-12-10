$(window).load(function(){
  
  $("body").on("click", ".article-image", function(){
    $(".focused-image").attr("src", $(this).attr("src"));
    console.log($(this).attr("src"));
    $(".focused-image-wrapper").addClass("visible");
  });
  
  $("body").on("click", ".image-focus-background", function(){
    $(".focused-image-wrapper").removeClass("visible");
  });
  
  $(".setting-button").eq(0).on("click", function(){
    $(".screen-settings").toggleClass("visible");
  });
  
  $("body").on("mouseover", ".writer", function(e){
    $(".writer-thumbnail").attr("src", $(e.target).parent().parent().data("writerUrl"));
    $(".writer-name").text($(e.target).text());
    $(".writer-service-name").text($(e.target).parent().parent().data("serviceName") + " account");
    $(".writer-description").addClass($(e.target).parent().parent().data("serviceName") + "-writer-profile")
                            .addClass("visible");
  })
              .on("mouseout", ".writer", function(){
    $(".writer-description").removeClass("visible")
                            .removeClass("twitter-writer-profile")
                            .removeClass("facebook-writer-profile")
                            .removeClass("instagram-writer-profile")
                            .removeClass("line-writer-profile");
  });
  
  $(window).on("mousemove", null, function(e){
      $(".writer-description").css("left", e.screenX - 175 + "px");
      $(".writer-description").css("top", e.screenY - 170 + "px");
  });
  
});