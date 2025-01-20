window.addEventListener('scroll', function() {
    let scrollUpBtn = document.getElementById('scrollUpBtn');
    if (window.scrollY > 300) {
      scrollUpBtn.classList.add('show');
    } else {
      scrollUpBtn.classList.remove('show');
    }
  });
  
  document.getElementById('scrollUpBtn').addEventListener('click', function() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });