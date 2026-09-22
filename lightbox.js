(function () {
  const figures = document.querySelectorAll('.gallery img');
  if (!figures.length) return;

  const lightbox = document.getElementById('lightbox');
  const lbImg = document.getElementById('lightbox-img');
  const images = Array.from(figures).map(img => ({ src: img.src, alt: img.alt }));
  let index = 0;

  function show(i) {
    index = (i + images.length) % images.length;
    lbImg.src = images[index].src;
    lbImg.alt = images[index].alt;
  }

  function open(i) {
    show(i);
    lightbox.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function close() {
    lightbox.classList.remove('open');
    document.body.style.overflow = '';
  }

  figures.forEach((img, i) => img.addEventListener('click', () => open(i)));
  lightbox.querySelector('.lb-close').addEventListener('click', close);
  lightbox.querySelector('.lb-prev').addEventListener('click', () => show(index - 1));
  lightbox.querySelector('.lb-next').addEventListener('click', () => show(index + 1));
  lightbox.addEventListener('click', e => { if (e.target === lightbox) close(); });

  document.addEventListener('keydown', e => {
    if (!lightbox.classList.contains('open')) return;
    if (e.key === 'Escape') close();
    if (e.key === 'ArrowLeft') show(index - 1);
    if (e.key === 'ArrowRight') show(index + 1);
  });
})();
