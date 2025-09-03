// Essential Functions
document.addEventListener('DOMContentLoaded', () => {
  // Clock Update
  function updateTime() {
    const el = document.getElementById('lux-time');
    const menuEl = document.getElementById('menu-time');
    const now = new Date();
    let h = now.getUTCHours() + 5;
    let m = now.getUTCMinutes() + 30;
    let s = now.getUTCSeconds();
    if (m >= 60) { h += 1; m -= 60; }
    if (h >= 24) h -= 24;
    const timeString = `INR ${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')} GMT +5:30`;
    if (el) el.textContent = timeString;
    if (menuEl) menuEl.textContent = timeString;
  }
  setInterval(updateTime, 1000);
  
  // Scroll Animations
  const handleScroll = () => {
    // Video zoom
    const video = document.getElementById('lux-bg-video');
    if (video) {
      const scale = Math.max(1, 1.1 - (window.scrollY / (window.innerHeight * 0.8)) * 0.1);
      video.style.transform = `scale(${scale})`;
    }
    
    // Animate sections
    document.querySelectorAll('.section').forEach(section => {
      const rect = section.getBoundingClientRect();
      if (rect.top < window.innerHeight * 0.8) {
        section.classList.add('visible');
      }
    });
  };
  
  window.addEventListener('scroll', handleScroll);

  // Menu Toggle Functionality
  const menuToggle = document.getElementById('menu-toggle');
  const menuClose = document.getElementById('menu-close');
  const menuCloseMobile = document.querySelector('.menu-close-mobile');
  const menuOverlay = document.getElementById('menu-overlay');

  if (menuToggle && menuOverlay) {
    menuToggle.addEventListener('click', () => {
      menuOverlay.style.display = 'block';
      menuOverlay.classList.add('show');
      document.body.style.overflow = 'hidden';
    });

    const closeMenu = () => {
      menuOverlay.classList.remove('show');
      setTimeout(() => {
        menuOverlay.style.display = 'none';
      }, 300);
      document.body.style.overflow = 'auto';
    };

    // Desktop close button
    if (menuClose) {
      menuClose.addEventListener('click', closeMenu);
    }
    
    // Mobile close button
    if (menuCloseMobile) {
      menuCloseMobile.addEventListener('click', closeMenu);
    }

    // Close menu on escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && menuOverlay.style.display === 'block') {
        closeMenu();
      }
    });
  }

  // Service Items Click Functionality
  const serviceItems = document.querySelectorAll('.service-item');
  serviceItems.forEach(item => {
    const heading = item.querySelector('h3, h2');
    const details = item.querySelector('.service-details');
    
    if (!heading || !details) return;

    // Initially hide all details
    details.style.display = 'none';
    details.style.height = '0';
    details.style.opacity = '0';

    // Click event for service items
    item.addEventListener('click', () => {
      const isActive = item.classList.contains('active');
      
      // Close all other items
      serviceItems.forEach(otherItem => {
        if (otherItem !== item) {
          otherItem.classList.remove('active');
          const otherDetails = otherItem.querySelector('.service-details');
          const otherHeading = otherItem.querySelector('h3, h2');
          
          if (otherDetails) {
            otherDetails.style.display = 'none';
            otherDetails.style.height = '0';
            otherDetails.style.opacity = '0';
          }
          
          if (otherHeading) {
            otherHeading.style.textShadow = 'none';
          }
          
          otherItem.style.opacity = '0.7';
        }
      });
      
      // Toggle current item
      if (!isActive) {
        // Expand current item
        item.classList.add('active');
        item.style.opacity = '1';
        
        heading.style.textShadow = '0 0 8px rgba(255, 255, 255, 0.3)';
        heading.style.transition = 'all 0.3s ease';
        
        details.style.display = 'block';
        details.style.height = 'auto';
        details.style.opacity = '1';
        details.style.transition = 'all 0.5s ease';
      } else {
        // Collapse current item
        item.classList.remove('active');
        item.style.opacity = '0.7';
        
        heading.style.textShadow = 'none';
        
        details.style.display = 'none';
        details.style.height = '0';
        details.style.opacity = '0';
      }
    });

    // Hover effects
    item.addEventListener('mouseenter', () => {
      if (!item.classList.contains('active')) {
        item.style.opacity = '1';
        item.style.transition = 'opacity 0.3s ease';
      }
    });

    item.addEventListener('mouseleave', () => {
      if (!item.classList.contains('active')) {
        item.style.opacity = '0.7';
      }
    });
  });

  // Initialize Services Slider if present
  if (typeof VeloSlider !== 'undefined') {
    VeloSlider.init();
  }
});
/**
 * Velocity Effects
 *
 * First, A few Registered effects for velocity's ui kit.
 * Actual slider stuff below
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
      scale: '1',
 
    }, 1]
  ]
});
//scale down
$.Velocity.RegisterEffect("scaleDown", {
  defaultDuration: 1,
  calls: [
    [{
      opacity: '0',
      scale: '0.7',
 
    }, 1]
  ]
});

//gallery
$.Velocity.RegisterEffect("scaleDown.moveUp", {
  defaultDuration: 1,
  calls: [
    [{
      translateY: '0%',
      scale: scaleDownAmnt,
 
    }, 0.20],
    [{
      translateY: '-100%'
    }, 0.60],
    [{
      translateY: '-100%',
      scale: '1',
      // boxShadowBlur: '0'
    }, 0.20]
  ]
});
$.Velocity.RegisterEffect("scaleDown.moveUp.scroll", {
  defaultDuration: 1,
  calls: [
    [{
      translateY: '-100%',
      scale: scaleDownAmnt,
 
    }, 0.60],
    [{
      translateY: '-100%',
      scale: '1',
      // boxShadowBlur: '0'
    }, 0.40]
  ]
});
$.Velocity.RegisterEffect("scaleUp.moveUp", {
  defaultDuration: 1,
  calls: [
    [{
      translateY: '90%',
      scale: scaleDownAmnt,
      // boxShadowBlur: boxShadowAmnt     
    }, 0.20],
    [{
      translateY: '0%'
    }, 0.60],
    [{
      translateY: '0%',
      scale: '1',
      // boxShadowBlur: '0'
    }, 0.20]
  ]
});
$.Velocity.RegisterEffect("scaleUp.moveUp.scroll", {
  defaultDuration: 1,
  calls: [
    [{
      translateY: '0%',
      scale: scaleDownAmnt,
      // boxShadowBlur: boxShadowAmnt
    }, 0.60],
    [{
      translateY: '0%',
      scale: '1',
      // boxShadowBlur: '0'
    }, 0.40]
  ]
});
$.Velocity.RegisterEffect("scaleDown.moveDown", {
  defaultDuration: 1,
  calls: [
    [{
      translateY: '0%',
      scale: scaleDownAmnt,
      // boxShadowBlur: boxShadowAmnt
    }, 0.20],
    [{
      translateY: '100%'
    }, 0.60],
    [{
      translateY: '100%',
      scale: '1',
      // boxShadowBlur: '0'
    }, 0.20]
  ]
});
$.Velocity.RegisterEffect("scaleDown.moveDown.scroll", {
  defaultDuration: 1,
  calls: [
    [{

    }, 0.60],
    [{
      translateY: '100%',
      scale: '1',
      // boxShadowBlur: '0'
    }, 0.40]
  ]
});
$.Velocity.RegisterEffect("scaleUp.moveDown", {
  defaultDuration: 1,
  calls: [
    [{
      translateY: '-90%',
      scale: scaleDownAmnt,
      // boxShadowBlur: boxShadowAmnt
    }, 0.20],
    [{
      translateY: '0%'
    }, 0.60],
    [{
      translateY: '0%',
      scale: '1',
      // boxShadowBlur: '0'
    }, 0.20]
  ]
});



/**
 * Velo Slider
 * A Custom Slider using Velocity and Velocity UI effects
 */

var VeloSlider = (function() {

  /**
   * Global Settings 
   */
  var settings = {
    veloInit: $('.velo-slides').data('velo-slider'),
    $veloSlide: $('.velo-slide'),
    veloSlideBg: '.velo-slide__bg',
    navPrev:  $('.velo-slides-nav').find('a.js-velo-slides-prev'),
    navNext:  $('.velo-slides-nav').find('a.js-velo-slides-next'),
    veloBtn:   $('.velo-slide__btn'),
    delta: 0,
    scrollThreshold: 7,
    currentSlide: 1,
    animating: false,
    animationDuration: 2000
  };


  // Flags
  var delta = 0,
      animating = false;

  return {
   
      /**
       * Init 
       */
      init: function() {
        this.bind();
      },
    
    /**
     * Bind our click, scroll, key events
     */
    bind: function(){
 
      //  Add active to first slide to set it off
      settings.$veloSlide.first().addClass('is-active');

      //  Init with a data attribute, 
      //  Binding the animation to scroll, arrows, keys
      if (settings.veloInit == 'on') {
        VeloSlider.initScrollJack();
        $(window).on('DOMMouseScroll mousewheel', VeloSlider.scrollJacking);
      }

      // Arrow / Click Nav
      settings.navPrev.on('click', VeloSlider.prevSlide);
      settings.navNext.on('click', VeloSlider.nextSlide);
    
      // Key Nav
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
      
      // // Swipes
      // $(window).swipe(function( direction, offset ) {
      //   //if (offset < 100) { return; }
      //   if (direction == "up") { 
      //     VeloSlider.prevSlide(); 
      //     console.log('swipe up');

      //   }
      //   if (direction == "down") { VeloSlider.nextSlide(); } 
      // });
    
      //set navigation arrows visibility
      VeloSlider.checkNavigation();

      // Call Button Hover animation
      VeloSlider.hoverAnimation();
     
    },

    /**
     * Hover Animation
     * Adds 'is-hovering' class to the current slide
     * when hovering over the button.
     */
    hoverAnimation: function(){
      settings.veloBtn.hover(function (){
        $(this).closest(settings.$veloSlide).toggleClass('is-hovering');
      });
    },

    /** 
     * Set Animation
     * Defines the animation sequence, calling our registered velocity effects
     * @see js/components/_velocity-effects.js
     */
    setAnimation: function(midStep, direction) {
      
      // Vars for our velocity effects
      var animationVisible = 'translateNone',
          animationTop = 'translateUp',
          animationBottom = 'translateDown',
          easing = 'ease',
          animDuration = settings.animationDuration;

      // Middle Step
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

    /** 
     * Init Scroll Jaclk
     */
    initScrollJack: function() {

      var visibleSlide = settings.$veloSlide.filter('.is-active'),
          topSection = visibleSlide.prevAll(settings.$veloSlide),
          bottomSection = visibleSlide.nextAll(settings.$veloSlide),
          animationParams = VeloSlider.setAnimation(false),
          animationVisible = animationParams[0],
          animationTop = animationParams[1],
          animationBottom = animationParams[2];
          console.log(animationParams);
          console.log(animationParams[4]);

      visibleSlide.children('div').velocity(animationVisible, 1, function() {
        visibleSlide.css('opacity', 1);
        topSection.css('opacity', 1);
        bottomSection.css('opacity', 1);
      });

      topSection.children('div').velocity(animationTop, 0);
      bottomSection.children('div').velocity(animationBottom, 0);
    },

    /**
     * Scroll Jack
     * On Mouse Scroll
     */
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

    /**
     * Previous Slide
     */
    prevSlide: function(e) {
      //go to previous section
      typeof e !== 'undefined' && e.preventDefault();
      
      var visibleSlide = settings.$veloSlide.filter('.is-active'),
          animationParams = VeloSlider.setAnimation(midStep, 'prev'),
          midStep = false;
      
      visibleSlide = midStep ? visibleSlide.next(settings.$veloSlide) : visibleSlide;

      console.log(midStep);

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
        currentSlide = settings.currentSlide - 1;
      }
      VeloSlider.resetScroll();
    },


    /** 
     * Next Slide
     */
    nextSlide: function(e) {
      
      //go to next section
      typeof e !== 'undefined' && e.preventDefault();
      
      var visibleSlide = settings.$veloSlide.filter('.is-active'),
          animationParams = VeloSlider.setAnimation(midStep, 'next'),
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
        currentSlide = settings.currentSlide + 1;
      }
      VeloSlider.resetScroll();
    },

    /**
     * Reset SCroll
     */
    resetScroll: function() {
      delta = 0;
      VeloSlider.checkNavigation();
    },

    /**
     * Check Nav
     * Adds / hides nav based on first/last slide
     * @todo - loop slides, without cloning if possible
     */
    checkNavigation: function() {
      //update navigation arrows visibility
      (settings.$veloSlide.filter('.is-active').is(':first-of-type')) ? settings.navPrev.addClass('inactive'): settings.navPrev.removeClass('inactive');
      (settings.$veloSlide.filter('.is-active').is(':last-of-type')) ? settings.navNext.addClass('inactive'): settings.navNext.removeClass('inactive');

    },
  };
})();

// INIT
VeloSlider.init();

// Services Interactive Functionality
document.addEventListener('DOMContentLoaded', function() {
  const serviceItems = document.querySelectorAll('.service-item');
  
  serviceItems.forEach(item => {
    const title = item.querySelector('.service-title');
    
    // Add click functionality
    title.addEventListener('click', function() {
      // Remove active class from all items
      serviceItems.forEach(otherItem => {
        otherItem.classList.remove('active');
      });
      
      // Add active class to clicked item
      item.classList.add('active');
    });
    
    // Add hover effects
    item.addEventListener('mouseenter', function() {
      if (!item.classList.contains('active')) {
        item.classList.add('hover');
      }
    });
    
    item.addEventListener('mouseleave', function() {
      item.classList.remove('hover');
    });
  });
  
  // Auto-activate first service item
  if (serviceItems.length > 0) {
    serviceItems[0].classList.add('active');
  }
});

// Services section scroll animations
function initServicesAnimations() {
  const serviceItems = document.querySelectorAll('.service-item');
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });
  
  serviceItems.forEach((item, index) => {
    item.style.opacity = '0';
    item.style.transform = 'translateY(30px)';
    item.style.transition = `opacity 0.6s ease ${index * 0.2}s, transform 0.6s ease ${index * 0.2}s`;
    observer.observe(item);
  });
}

// Initialize animations when DOM is loaded
document.addEventListener('DOMContentLoaded', initServicesAnimations);
  