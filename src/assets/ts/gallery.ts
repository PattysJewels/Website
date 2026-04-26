const buttons = document.querySelectorAll<HTMLButtonElement>('.gallery-filter');
const items = document.querySelectorAll<HTMLElement>('.gallery-page__grid .gallery-item');

buttons.forEach((button) => {
  button.addEventListener('click', () => {
    const selected = button.dataset.category ?? 'all';

    buttons.forEach((b) => b.classList.remove('gallery-filter--active'));
    button.classList.add('gallery-filter--active');

    items.forEach((item) => {
      const visible = selected === 'all' || item.dataset.category === selected;
      item.style.display = visible ? '' : 'none';
    });
  });
});
