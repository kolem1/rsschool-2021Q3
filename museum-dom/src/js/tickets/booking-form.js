const fields = document.querySelectorAll('.remove-label');
fields.forEach((field) => {
  const input = field.querySelector('input');
  const label = field.querySelector('label');
  input.oninput = function() {
    if (input.value != null) {
      label.style.visibility = 'hidden';
    }
  }
  input.onblur = function() {
    if (input.value == '') {
      label.style.visibility = 'visible';
    }
  }
  if(input.attributes.type) {
    if (input.attributes.type.value === 'date' || input.attributes.type.value === 'time') {
      input.onfocus = function() {
        label.style.visibility = 'hidden';
      }
    }
  }
})