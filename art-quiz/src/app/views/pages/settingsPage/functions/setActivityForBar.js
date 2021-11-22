export default function setActivityForBar(checkbox) {
  const parent = checkbox.closest('.settings-item');
  const bar = parent.querySelector('.settings__range');

  if (checkbox.checked) {
    bar.disabled = false;
  } else {
    bar.disabled = true;
  }
}
