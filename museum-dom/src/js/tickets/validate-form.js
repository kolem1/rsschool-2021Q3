const bookingForm = document.querySelector('.booking-form');

const inputs = bookingForm.querySelectorAll('.validate-input');

inputs.forEach(input => {
  input.addEventListener('blur', validateInput);
});

const errors = {
  name: 'The name should only consist of Latin or Cyrillic letters and not exceed 15 characters in length. Separated by a space is possible',
  email: "Email should be in the format username@example.com",
  phone: 'The phone number should be digits only and should not exceed 10 characters in length. Separation of spaces or dash by 2 or 3 characters is possible.'
}

const isValid = {
  name(input) {
    const regExp = new RegExp('^[a-zа-я ]{3,15}$', 'i');
    return regExp.test(input.value);
  },
  email(input) {
    const regExp = new RegExp('^[\\w-_]{3,15}@[a-z]{4,}\\.[a-z]{2,}$', 'i');
    return regExp.test(input.value);
  },
  phone(input) {
    let value = input.value;
    let isValid = true;

    const spaceSeparation = value.split(' ');
    if(spaceSeparation.length > 1) {
      spaceSeparation.forEach(item => {
        if(item.length > 3 || item.length < 2) {
          isValid = false;
        }
      });
      if(!isValid) return false;
      value = spaceSeparation.join('');
    }
    const dashSeparation = value.split('-');
    if(dashSeparation.length > 1) {
      dashSeparation.forEach(item => {
        if(item.length > 3 || item.length < 2) {
          isValid = false;
        }
      });
      if(!isValid) return false;
      value = dashSeparation.join('');
    }
    const regExp = new RegExp('^\\d{0,10}$');
    return regExp.test(value);
  }
}

function validateInput() {
  if(isValid[this.name](this)) {
    this.classList.remove('invalid');
    removeError(this)
  } else {
    this.classList.add('invalid');
    showError(this, errors[this.name]);
  }
}

function showError(input, error) {
  const parentSibling = input.parentElement.nextElementSibling;
  if(!parentSibling.classList.contains('validate-error')) {
    input.parentElement.insertAdjacentHTML("afterend", `<div class="validate-error">${error}</div>`);
  }
}

function removeError(input) {
  const error = input.parentElement.nextElementSibling;
  if(error.classList.contains('validate-error')) {
    error.remove();
  }
}

