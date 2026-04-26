{
  const toggle = document.querySelector<HTMLButtonElement>('.form-toggle');
  const drawer = document.querySelector<HTMLElement>('.form-drawer');

  if (toggle && drawer) {
    toggle.addEventListener('click', () => {
      const isOpen = toggle.getAttribute('aria-expanded') === 'true';

      if (isOpen) {
        // Pin current height so the transition has a real start point
        drawer.style.maxHeight = `${drawer.scrollHeight}px`;
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            drawer.style.maxHeight = '0';
            drawer.style.opacity = '0';
          });
        });
        toggle.setAttribute('aria-expanded', 'false');
        drawer.setAttribute('aria-hidden', 'true');
        toggle.classList.remove('form-toggle--open');
      } else {
        drawer.style.maxHeight = `${drawer.scrollHeight}px`;
        drawer.style.opacity = '1';
        toggle.setAttribute('aria-expanded', 'true');
        drawer.setAttribute('aria-hidden', 'false');
        toggle.classList.add('form-toggle--open');
        setTimeout(() => {
          drawer.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 350);
      }
    });

    // Release max-height after open so the form can grow freely
    drawer.addEventListener('transitionend', () => {
      if (toggle.getAttribute('aria-expanded') === 'true') {
        drawer.style.maxHeight = 'none';
      }
    });
  }
}
