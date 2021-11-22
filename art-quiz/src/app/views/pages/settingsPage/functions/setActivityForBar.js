export default function setActivityForBar() {
  const parent = this.closest('.settings-item');
  const bar = parent.querySelector('.settings__range');

  if(this.checked) {
    bar.disabled = false;
  } else {
    bar.disabled = true;
  }
}