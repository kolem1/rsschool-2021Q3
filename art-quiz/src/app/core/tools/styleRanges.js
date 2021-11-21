export default function styleRanges(ranges) {
  ranges.forEach((range) => {
    const item = range;
    item.style.background = `linear-gradient(to right, #FFBCA2 ${range.value}%, #A4A4A4 ${range.value}%)`;
    item.addEventListener('input', function styleThis() {
      const { value } = this;
      this.style.background = `linear-gradient(to right, #FFBCA2 ${value}%, #A4A4A4 ${value}%)`;
    });
  });
}
