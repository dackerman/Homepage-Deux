animTimer = null;
currentImg = null;

r = function(x){
  return Math.floor(Math.random() * (x+1));
};

startFlying = function(selector) { 
  return function() {
    $(selector).removeClass('hidden');
    $(selector).each(function(index) {
      $(this).css('top', r(500));
      $(this).css('left', r(500));
    });
    currentImg = selector;
    animTimer = setInterval("updateImgs()", 50);
  };
};

stopFlying = function(selector) {
  return function() {
    clearInterval(animTimer);
    $(selector).addClass('hidden');
  };
};

updateImgs = function() {
  $(currentImg).each(function(index) {
    var curPosition = $(this).position();
    $(this).css('top', curPosition.top + r(10)-5);
    $(this).css('left', curPosition.left + r(10)-5);
  });
};

$(document).ready(function() {
  $('.section').hover(
    function() {
      $(this).addClass('section_over');
    },
    function() {
      $(this).removeClass('section_over');
    });

  jQuery.each(['blog', 'pictures', 'resume', 'other'], function(index, value){
    $('#' + value).hover(startFlying('.' + value), stopFlying('.' + value));
    // Create (2^3)-1 copies of the images  
    $('.' + value).clone().appendTo('body');
    $('.' + value).clone().appendTo('body');
    $('.' + value).clone().appendTo('body');
  });

});

