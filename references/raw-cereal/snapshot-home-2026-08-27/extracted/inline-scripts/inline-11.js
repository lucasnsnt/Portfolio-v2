// MARQUEE SCROLL
  const homeHeaderCarousel = (className, xDirection) => {
    gsap.to(`.${className}`, { xPercent: xDirection, repeat: -1, duration: 60, ease: "linear" });
  };

  // Create scrolling marquees for the specified classes
  homeHeaderCarousel("projects-carousel_top-list", -100);      // Scroll to the left
  homeHeaderCarousel("projects-carousel_middle-list", 100);    // Scroll to the right
  homeHeaderCarousel("projects-carousel_bottom-list", -100);   // Scroll to the left
