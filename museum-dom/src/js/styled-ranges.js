const ranges = document.querySelectorAll('.styled-range');

ranges.forEach(range => {
  range.addEventListener('input', function() {
    const value = this.value;
    console.log(value);
    this.style.background = `linear-gradient(to right, #710707 ${value}%, #C4C4C4 ${value}%)`
  })
})