import {updateForms, setFormValuee} from "./calculator-functions";

const calculatorForms = document.querySelectorAll('.calculator-form');

let formResults = {
  ticketType: 'permanent',
  basicAmount: 1,
  seniorAmount: 1,
  total: 30
};

let changeFormResults = new Event('changeFormResults');

if(localStorage.getItem('selectedValues')) {
  formResults = JSON.parse(localStorage.getItem("selectedValues"));
}
calculatorForms.forEach(form => {
  setFormValuee(form, formResults);
});

calculatorForms.forEach((form, i, forms) => {
  const ticketTypeInputs = form.querySelectorAll('[name=ticket-type]');
  const basicAmountField = form.querySelector('input[name=basic-amount]');
  const seniorAmountField = form.querySelector('input[name=senior-amount]');
  const amoutButtons = form.querySelectorAll('.amount__button');
  

  ticketTypeInputs.forEach(item => {
    item.addEventListener('change', function() {
      updateForms.call(this, forms, formResults);
      document.dispatchEvent(changeFormResults);
    });
  });

  basicAmountField.addEventListener('input', function() {
    updateForms.call(this, forms, formResults);
    document.dispatchEvent(changeFormResults);
  });

  seniorAmountField.addEventListener('input', function() {
    updateForms.call(this, forms, formResults);
    document.dispatchEvent(changeFormResults);
  });

  amoutButtons.forEach(item => {
    item.addEventListener('click', function() {
      updateForms.call(this, forms, formResults);
      document.dispatchEvent(changeFormResults);
    });
  });
});

export default formResults;
export {changeFormResults};


