{
  const nav = document.querySelector<HTMLElement>('.nav');
  const toggle = document.querySelector<HTMLButtonElement>('.nav__toggle');
  const links = document.querySelector<HTMLElement>('.nav__links');

  function setMenuOpen(open: boolean) {
    links?.classList.toggle('is-open', open);
    nav?.classList.toggle('is-open', open);
    document.body.style.overflow = open ? 'hidden' : '';
    toggle?.setAttribute('aria-expanded', String(open));
  }

  toggle?.addEventListener('click', () => {
    const isOpen = links?.classList.contains('is-open');
    setMenuOpen(!isOpen);
  });

  document.querySelectorAll('.nav__links a').forEach((link) => {
    link.addEventListener('click', () => setMenuOpen(false));
  });
}
