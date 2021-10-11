import formResults, {changeFormResults} from "./calculator-tickets";
import price from "./price";

const bookingForm = document.getElementById('ticket-booking');
const timeInput = bookingForm.querySelector('#booking-time');
const dateInput = bookingForm.querySelector('#booking-date');
const contersObject = {};

const today = new Date();
dateInput.min = today.toISOString().substring(0, 10);

timeInput.addEventListener('change', function() {
  const value = this.value;
  const hours = Number(value.split(':')[0]);
  const minutes = Number(value.split(':')[1]);
  if(hours < 9) {
    this.value = `09:00`;
  } else if(hours > 17) {
    this.value = `17:00`;
  }
  if(minutes % 30 !== 0) {
    if(minutes <= 15) {
      this.value = `${this.value.split(':')[0]}:00`; 
    } else if(minutes <= 45) {
      this.value = `${this.value.split(':')[0]}:30`; 
    } else {
      this.value = `${this.value.split(':')[0]}:00`;
    }
  }
  document.dispatchEvent(changeFormResults)
});
dateInput.addEventListener('input', () => document.dispatchEvent(changeFormResults));

document.addEventListener('changeFormResults', changeOverview);
changeOverview();

function changeOverview() {
  const ticketsPrice = bookingForm.querySelectorAll('.ticket-price');
  const ticketCounters = bookingForm.querySelectorAll('.ticket-counter');
  const ticketSumms = bookingForm.querySelectorAll('.ticket-summ');
  const ticketsType = bookingForm.querySelector('.selected-ticket-type');
  const time = bookingForm.querySelector('.selected-time');
  const date = bookingForm.querySelector('.selected-date');

  ticketsPrice.forEach(setPrice);
  ticketCounters.forEach(setCounter);
  ticketSumms.forEach(setSumm);
  setTicketType(ticketsType);
  setTime(time);
  setDate(date);
}

function setPrice(item) {
  const selectedTicketType = formResults.ticketType;
  const ticketType = item.dataset.type;
  const ticketPrice = price[selectedTicketType][ticketType]; 
  item.innerHTML = ticketPrice;
  contersObject[`${ticketType}Price`] = ticketPrice;
}

function setCounter(counter) {
  const ticketType = counter.dataset.type;
  counter.innerHTML = formResults[ticketType];
  contersObject[ticketType] = formResults[ticketType];
}

function setSumm(item) {
  const ticketType = item.dataset.type;
  const ticketAmount = contersObject[`${ticketType}Amount`];
  const ticketPrice = contersObject[`${ticketType}Price`];
  item.innerHTML = ticketAmount * ticketPrice;
}

function setTicketType(item) {
  const select = bookingForm.querySelector('select[name=ticket-type]');
  const selectedOption = select.options[select.selectedIndex];
  item.innerHTML = selectedOption.text;
}

function setTime(item) {
  const input = bookingForm.querySelector('#booking-time');
  item.innerHTML = input.value || input.min;
}

function setDate(item) {
  const date = dateInput.valueAsDate;
  let stringDate;
  if(date) {
    stringDate = `${getDayOfWeek(date)}, ${date.toLocaleString('en-US', { month: 'long' })} ${date.getDate()}`;
    item.innerHTML =  stringDate;
  } else {
    stringDate = today.toLocaleString('en-US', { weekday: 'long', month: 'long', day: 'numeric' });
  }
  item.innerHTML =  stringDate;
}

function getDayOfWeek(date) {
  const dayOfWeek = new Date(date).getDay();    
  return isNaN(dayOfWeek) ? null : 
    ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][dayOfWeek];
}

