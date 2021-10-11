import price from "./price";

function findChecked(radios) {
  let value;
  radios.forEach(radio => {
    if(radio.checked) value = radio.value;
  });
  return value;
}

function formChange(form, objectResults) {
  getFormData(form, objectResults);
  const total = form.closest('.calculator').querySelector('.total span');
  objectResults.total = calculateTotal(objectResults);
  total.innerHTML = objectResults.total;
  localStorage.setItem('selectedValues', JSON.stringify(objectResults));
}

function getFormData(form, objectResults) {
  const ticketTypeInputs = form.querySelectorAll('[name=ticket-type]');
  const basicAmountField = form.querySelector('input[name=basic-amount]');
  const seniorAmountField = form.querySelector('input[name=senior-amount]');

  objectResults.ticketType = findChecked(ticketTypeInputs) || ticketTypeInputs[0].options[ticketTypeInputs[0].selectedIndex].value;
  objectResults.basicAmount = basicAmountField.value;
  objectResults.seniorAmount = seniorAmountField.value;
}

function calculateTotal(formData) {
  const ticketType = formData.ticketType;
  const basicAmount = formData.basicAmount;
  const seniorAmount = formData.seniorAmount;

  const total = price[ticketType]['basic'] * basicAmount + price[ticketType]['senior'] * seniorAmount;
  
  return total;
}


function setFormValuee(form, objectResults) {
  const ticketTypeInputs = form.querySelectorAll('[name=ticket-type]');
  const basicAmountField = form.querySelector('input[name=basic-amount]');
  const seniorAmountField = form.querySelector('input[name=senior-amount]');
  const total = form.closest('.calculator').querySelector('.total span');

  setChecked(ticketTypeInputs, objectResults.ticketType) || (ticketTypeInputs[0].value = objectResults.ticketType);
  basicAmountField.value = objectResults.basicAmount;
  seniorAmountField.value = objectResults.seniorAmount;
  total.innerHTML = objectResults.total;
}

function setChecked(radios, value) {
  radios.forEach(radio => {
    if(value === radio.value) {
      radio.checked = true;
      return radio;
    }
  });
}

function updateForms(forms, objectResults) {
  const thisForm = this.closest('.calculator-form')
  formChange(thisForm, objectResults)
  forms.forEach(form => {
    if(form == thisForm) {
      return;
    } else {
      setFormValuee(form, objectResults);
    }
  })
}

export {updateForms, setFormValuee}