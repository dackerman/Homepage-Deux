animTimer = null;
currentImg = null;

updateSpeed = 50;

r = function(x){
  return Math.floor(Math.random() * (x+1));
};

rr = function(l, h){
  return Math.floor(Math.random() * (h-l) + l);
};

startFlying = function(selector) { 
  return function() {
    $(selector).removeClass('hidden');
    $(selector).each(function(index) {
      $(this).css('top', r(500));
      $(this).css('left', r(500));
      $(this).data("particle", {vx:20, vy:20, ax:3, ay:3})
    });
    currentImg = selector;
    animTimer = setInterval("updateImgs()", updateSpeed);
  };
};

updateImgs = function() {
  $(currentImg).each(function(index) {
    var curPosition = $(this).position();
    var particle = $(this).data("particle");
    var seconds = updateSpeed / 1000.0;
    particle.vx += particle.ax * seconds;
    particle.vy += particle.ay * seconds;
    curPosition.left += particle.vx * seconds;
    curPosition.top += particle.vy * seconds;
    particle.ax = particle.ax * 0.9 + rr(-5, 10);
    particle.ay = particle.ay * 0.9 + rr(-5, 10);
    $(this).data("particle", particle);
    $(this).css('top', curPosition.top);
    $(this).css('left', curPosition.left);
  });
};

stopFlying = function(selector) {
  return function() {
    clearInterval(animTimer);
    $(selector).addClass('hidden');
  };
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

