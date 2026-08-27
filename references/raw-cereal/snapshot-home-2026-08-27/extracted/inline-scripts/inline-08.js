// MARQUEE SCROLL
  const createScrollingMarquee = (className, reverseDirection) => {
    let currentScroll = 0;
    let isScrollingDown = true;
    
    const xDirection = reverseDirection ? 100 : -100;  // Adjust the xPercent value based on the reverseDirection parameter
    
    const tween = gsap.to(`.${className}`, { xPercent: xDirection, repeat: -1, duration: 30, ease: "linear" }).totalProgress(0.5);
    
    window.addEventListener("scroll", function () {
      if (window.pageYOffset > currentScroll) {
        isScrollingDown = true;
      } else {
        isScrollingDown = false;
      }
      
      gsap.to(tween, {
        timeScale: isScrollingDown ? 1 : -1
      });
      
      currentScroll = window.pageYOffset;
    });
  };
  
  // Create scrolling marquees for the specified classes
  createScrollingMarquee("marquee-text_list", false);  // Normal scrolling
