$(function(){
  
  if($(".user-card").length > 1){
    for(var i = 0; i < $(".user-card").length; i++){
      if(i != 0){
        $(".user-card").eq(i).css("top", 80 * i + "px");
      }
    }
  }

  $.getJSON("./test.json", null, function(data) {
    for(var i = 0; i < data.length; i++){
      if(data[i].service === "twitter"){
        appendTwitter(data[i].service, data[i].user, data[i].message, data[i].timestamp, i, data[i].img, data[i].usericon, data[i].post_url);
      }else if(data[i].service === "facebook"){
        appendFacebook(data[i].service, data[i].user, data[i].message, data[i].timestamp, i, data[i].img, data[i].usericon, data[i].post_url);
      }else if(data[i].service === "line"){
        appendLine(data[i].service, data[i].user, data[i].message, data[i].timestamp, i, data[i].img, data[i].usericon, data[i].post_url);
      }else{
      }
    }
  })
  .success(function(data) {
    
  })
  .error(function(jqXHR, textStatus, errorThrown) {
  })
  .complete(function() {
  });
  
  function appendTwitter(service, writer, message, time, index, image, usericon, url) {
    $("main").append('<div data-service-name="' + service + '" data-writer-url="' + usericon + '" data-article-url="' + url + '" data-article-id="' + index + '" class="article-container twitter"> <a target="_blank" href="' + url + '"><h1 class="writer">' + writer + '</h1></a> <p class="article">' + message + '</p><div class="components"> <div class="component"> <i class="fa fa-comment" aria-hidden="true"></i> </div><div class="component"> <i class="fa fa-retweet" aria-hidden="true"></i> </div><div class="component"> <i class="fa fa-heart" aria-hidden="true"></i> </div><span class="posted-time">' + time + '</span> </div></div>');
    if(image){checkImage(index, image)};
  }
  
  function appendFacebook(service, writer, message, time, index, image, usericon, url) {
    $("main").append('<div data-service-name="' + service + '" data-writer-url="' + usericon + '"  data-article-id="' + index + '" class="article-container facebook"> <a target="_blank" href="' + url + '"><h1 class="writer">' + writer + '</h1></a> <p class="article">' + message + '</p><div class="components"> <div class="component"> <i class="fa fa-comment" aria-hidden="true"></i> </div><div class="component"> <i class="fa fa-thumbs-up" aria-hidden="true"></i> </div><div class="component"> <i class="fa fa-share" aria-hidden="true"></i> </div><span class="posted-time">' + time +'</span> </div></div>');
    if(image){checkImage(index, image)};
  }
  
  function appendLine(service, writer, message, time, index, image, usericon, url) {
    $("main").append('<div data-service-name="' + service + '" data-writer-url="' + usericon + '" data-article-id="' + index + '" class="article-container line"> <a target="_blank" href="' + url + '"><h1 class="writer">' + writer + '</h1></a> <p class="article">' + message + '</p><div class="components"><div class="component"> <i class="fa fa-comment" aria-hidden="true"></i> </div><div class="component"> <i class="fa fa-smile-o" aria-hidden="true"></i> </div><span class="posted-time">' + time + '</span> </div></div>');
    if(image){checkImage(index, image)};
  }
  
  function checkImage(index, image) {
    let images = [],
        imageCount = 0;
    
    $('[data-article-id="' + index + '"]').find(".article").after('<div class="image-container"></div>');
    
    images = image.split(",");
    imageCount = images.length;
    
    for(var i = 0; i < imageCount; i++){
      
      $('[data-article-id="' + index + '"]').find(".image-container").append('<img class="article-image" src="' + images[i] + '"/>');
      
      if(i == imageCount - 1){
        switch (imageCount){
          case 1:
            $('[data-article-id="' + index + '"] > .image-container').find(".article-image").addClass("img-1-1").trigger("create");
          break;

          case 2:
            $('[data-article-id="' + index + '"] > .image-container').find(".article-image").addClass("img-1-2").trigger("create");
          break;

          case 3:
            $('[data-article-id="' + index + '"] > .image-container').find(".article-image").addClass("img-1-3").trigger("create");
          break;

          case 4:
            $('[data-article-id="' + index + '"] > .image-container').find(".article-image").addClass("img-1-4").trigger("create");
          break;
            
          default:
            $('[data-article-id="' + index + '"] > .image-container').find(".article-image").addClass("img-1-inf").trigger("create");
          break;
        };
      }
    };
    
  }
  
});