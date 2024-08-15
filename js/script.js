document.addEventListener('DOMContentLoaded', function () {
    // Mobile Menu 
    const toggleButton = document.querySelector(".navbar__mobile-menu-toggle");
    const mobileMenu = document.querySelector(".navbar__mobile-menu-items");

    toggleButton.addEventListener('click', function () {
        mobileMenu.classList.toggle('active');
    });

       // Video Modal
       const modal = document.querySelector('#videoModal');
       const videoButton = document.querySelector('.preview__video-button');
       const closeButton = document.querySelector('.modal__close-button');
       const videoPlayer = document.querySelector('#videoPlayer');
   
       // Open Modal on click
       videoButton.addEventListener('click', function(){
           // Show Modal
           modal.style.display = 'block';
   
           // Replace the src attribute with video url
           videoPlayer.src = 'https://www.youtube.com/embed/XHTrLYShBRQ?si=HvoOXWE4v0BS3ZXk';

           closeButton.addEventListener('click', function(){
            modal.style.display = 'none';
            videoPlayer.src = '';
           })

           // Close Modal on outer click
           window.addEventListener('click', function(event) {
            if (event.target == modal) {
                modal.style.display = 'none';
                videoPlayer.src = '';
            }
           });
       });
   });

// Navigation background on scroll
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');   

    if (this.window.scrollY > 0) {
        navbar.classList.add('navbar--scroll');
    } else {
        navbar.classList.remove('navbar--scroll');
    }
})


/* Counter */
document.addEventListener('DOMContentLoaded', () => {
    const counters = document.querySelectorAll('.details__icons-amount');
    const speed = 200; // Adjust this value to control the speed of the counting animation
    let hasActivatedObserver = false;

    const countUp = (counter) => {
      const target = +counter.getAttribute('data-target');
      const count = +counter.innerText.replace(/,/g, ''); // Remove commas for correct counting

      const increment = target / speed;

      if (count < target) {
        counter.innerText = Math.ceil(count + increment).toLocaleString();
        setTimeout(() => countUp(counter), 20);
      } else {
        counter.innerText = target.toLocaleString();
      }
    };

    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const counter = entry.target;
          countUp(counter);
          observer.unobserve(counter); // Unobserve the counter once it has started counting
        }
      });
    }, {
      threshold: 0.5 // Adjust this value based on when you want to trigger the count
    });

    const activateObserver = () => {
      if (window.scrollY >= 3777 && !hasActivatedObserver) {
        counters.forEach(counter => {
          observer.observe(counter);
        });
        hasActivatedObserver = true;
      }
    };

    window.addEventListener('scroll', activateObserver);

    // Also check on initial load in case the user reloads the page at a scroll position > 3777
    activateObserver();
  });