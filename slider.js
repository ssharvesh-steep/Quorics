/**
 * Velocity Effects
 */
var scaleDownAmnt = 0.7;
var boxShadowAmnt = '40px';

$.Velocity.RegisterEffect("translateUp", {
  defaultDuration: 1,
  calls: [
    [{
      translateY: '-100%'
    }, 1]
  ]
});

$.Velocity.RegisterEffect("translateDown", {
  defaultDuration: 1,
  calls: [
    [{
      translateY: '100%'
    }, 1]
  ]
});

$.Velocity.RegisterEffect("translateNone", {
  defaultDuration: 1,
  calls: [
    [{
      translateY: '0',
      opacity: '1',
      scale: '1'
    }, 1]
  ]
});

$.Velocity.RegisterEffect("scaleDown", {
  defaultDuration: 1,
  calls: [
    [{
      opacity: '0',
      scale: '0.7'
    }, 1]
  ]
});

$.Velocity.RegisterEffect("scaleDown.moveUp", {
  defaultDuration: 1,
  calls: [
    [{
      translateY: '0%',
      scale: scaleDownAmnt
    }, 0.20],
    [{
      translateY: '-100%'
    }, 0.60],
    [{
      translateY: '-100%',
      scale: '1'
    }, 0.20]
  ]
});

$.Velocity.RegisterEffect("scaleDown.moveUp.scroll", {
  defaultDuration: 1,
  calls: [
    [{
      translateY: '-100%',
      scale: scaleDownAmnt
    }, 0.60],
    [{
      translateY: '-100%',
      scale: '1'
    }, 0.40]
  ]
});

$.Velocity.RegisterEffect("scaleUp.moveUp", {
  defaultDuration: 1,
  calls: [
    [{
      translateY: '90%',
      scale: scaleDownAmnt
    }, 0.20],
    [{
      translateY: '0%'
    }, 0.60],
    [{
      translateY: '0%',
      scale: '1'
    }, 0.20]
  ]
});

$.Velocity.RegisterEffect("scaleUp.moveUp.scroll", {
  defaultDuration: 1,
  calls: [
    [{
      translateY: '0%',
      scale: scaleDownAmnt
    }, 0.60],
    [{
      translateY: '0%',
      scale: '1'
    }, 0.40]
  ]
});

$.Velocity.RegisterEffect("scaleDown.moveDown", {
  defaultDuration: 1,
  calls: [
    [{
      translateY: '0%',
      scale: scaleDownAmnt
    }, 0.20],
    [{
      translateY: '100%'
    }, 0.60],
    [{
      translateY: '100%',
      scale: '1'
    }, 0.20]
  ]
});

$.Velocity.RegisterEffect("scaleDown.moveDown.scroll", {
  defaultDuration: 1,
  calls: [
    [{}, 0.60],
    [{
      translateY: '100%',
      scale: '1'
    }, 0.40]
  ]
});

$.Velocity.RegisterEffect("scaleUp.moveDown", {
  defaultDuration: 1,
  calls: [
    [{
      translateY: '-90%',
      scale: scaleDownAmnt
    }, 0.20],
    [{
      translateY: '0%'
    }, 0.60],
    [{
      translateY: '0%',
      scale: '1'
    }, 0.20]
  ]
});

/**
 * Velo Slider
 */
var VeloSlider = (function() {
  var settings = {
    veloInit: $('.velo-slides').data('velo-slider'),
    $veloSlide: $('.velo-slide'),
    veloSlideBg: '.velo-slide__bg',
    navPrev: $('.velo-slides-nav').find('a.js-velo-slides-prev'),
    navNext: $('.velo-slides-nav').find('a.js-velo-slides-next'),
    veloBtn: $('.velo-slide__btn'),
    delta: 0,
    scrollThreshold: 7,
    currentSlide: 1,
    animating: false,
    animationDuration: 2000
  };

  var delta = 0,
      animating = false;

  return {
    init: function() {
      this.bind();
    },
    
    bind: function() {
      settings.$veloSlide.first().addClass('is-active');

    // Removed scroll-jacking for normal slide animation
    // if (settings.veloInit == 'on') {
    //   VeloSlider.initScrollJack();
    //   $(window).on('DOMMouseScroll mousewheel', VeloSlider.scrollJacking);
    // }

      settings.navPrev.on('click', VeloSlider.prevSlide);
      settings.navNext.on('click', VeloSlider.nextSlide);
    
      $(document).on('keydown', function(e) {
        var keyNext = (e.which == 39 || e.which == 40),
            keyPrev = (e.which == 37 || e.which == 38);

        if (keyNext && !settings.navNext.hasClass('inactive')) {
          e.preventDefault();
          VeloSlider.nextSlide();
        } else if (keyPrev && (!settings.navPrev.hasClass('inactive'))) {
          e.preventDefault();
          VeloSlider.prevSlide();
        }
      });
      
      VeloSlider.checkNavigation();
      VeloSlider.hoverAnimation();
    },

    hoverAnimation: function() {
      settings.veloBtn.hover(function() {
        $(this).closest(settings.$veloSlide).toggleClass('is-hovering');
      });
    },

    setAnimation: function(midStep, direction) {
      var animationVisible = 'translateNone',
          animationTop = 'translateUp',
          animationBottom = 'translateDown',
          easing = 'ease',
          animDuration = settings.animationDuration;

      if (midStep) {
        animationVisible = 'scaleUp.moveUp.scroll';
        animationTop = 'scaleDown.moveUp.scroll';
        animationBottom = 'scaleDown.moveDown.scroll';
      } else {
        animationVisible = (direction == 'next') ? 'scaleUp.moveUp' : 'scaleUp.moveDown';
        animationTop = 'scaleDown.moveUp';
        animationBottom = 'scaleDown.moveDown';
      }

      return [animationVisible, animationTop, animationBottom, animDuration, easing];
    },

    initScrollJack: function() {
      var visibleSlide = settings.$veloSlide.filter('.is-active'),
          topSection = visibleSlide.prevAll(settings.$veloSlide),
          bottomSection = visibleSlide.nextAll(settings.$veloSlide),
          animationParams = VeloSlider.setAnimation(false),
          animationVisible = animationParams[0],
          animationTop = animationParams[1],
          animationBottom = animationParams[2];

      visibleSlide.children('div').velocity(animationVisible, 1, function() {
        visibleSlide.css('opacity', 1);
        topSection.css('opacity', 1);
        bottomSection.css('opacity', 1);
      });

      topSection.children('div').velocity(animationTop, 0);
      bottomSection.children('div').velocity(animationBottom, 0);
    },

    scrollJacking: function(e) {
      if (e.originalEvent.detail < 0 || e.originalEvent.wheelDelta > 0) {
        delta--;
        (Math.abs(delta) >= settings.scrollThreshold) && VeloSlider.prevSlide();
      } else {
        delta++;
        (delta >= settings.scrollThreshold) && VeloSlider.nextSlide();
      }
      return false;
    },

    prevSlide: function(e) {
      typeof e !== 'undefined' && e.preventDefault();
      
      var visibleSlide = settings.$veloSlide.filter('.is-active'),
          animationParams = VeloSlider.setAnimation(false, 'prev'),
          midStep = false;
      
      visibleSlide = midStep ? visibleSlide.next(settings.$veloSlide) : visibleSlide;

      if (!animating && !visibleSlide.is(":first-child")) {
        animating = true;
        
        visibleSlide
          .removeClass('is-active')
          .children(settings.veloSlideBg)
          .velocity(animationParams[2], animationParams[3], animationParams[4])
          .end()
          .prev(settings.$veloSlide)
          .addClass('is-active')
          .children(settings.veloSlideBg)
          .velocity(animationParams[0], animationParams[3], animationParams[4], function() {
            animating = false;
          });
        settings.currentSlide = settings.currentSlide - 1;
      }
      VeloSlider.resetScroll();
    },

    nextSlide: function(e) {
      typeof e !== 'undefined' && e.preventDefault();
      
      var visibleSlide = settings.$veloSlide.filter('.is-active'),
          animationParams = VeloSlider.setAnimation(false, 'next'),
          midStep = false;

      if (!animating && !visibleSlide.is(":last-of-type")) {
        animating = true;

        visibleSlide.removeClass('is-active')
          .children(settings.veloSlideBg)
          .velocity(animationParams[1], animationParams[3])
          .end()
          .next(settings.$veloSlide)
          .addClass('is-active')
          .children(settings.veloSlideBg)
          .velocity(animationParams[0], animationParams[3], function() {
            animating = false;
          });
        settings.currentSlide = settings.currentSlide + 1;
      }
      VeloSlider.resetScroll();
    },

    resetScroll: function() {
      delta = 0;
      VeloSlider.checkNavigation();
    },

    checkNavigation: function() {
      (settings.$veloSlide.filter('.is-active').is(':first-of-type')) ? settings.navPrev.addClass('inactive') : settings.navPrev.removeClass('inactive');
      (settings.$veloSlide.filter('.is-active').is(':last-of-type')) ? settings.navNext.addClass('inactive') : settings.navNext.removeClass('inactive');
    }
  };
})();

// Initialize the slider
$(document).ready(function() {
  VeloSlider.init();
});