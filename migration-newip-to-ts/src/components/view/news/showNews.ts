export default function showNews(e: Event) {
  const wrapper = e.currentTarget as HTMLElement;
  const target  = e.target as HTMLElement;
  const body = document.body;

  if(!target.closest('.news')) {
    body.classList.remove('lock');
    wrapper.classList.remove('show');
    wrapper.removeEventListener('click', showNews);
  }
}
