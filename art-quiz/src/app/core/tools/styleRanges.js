function calculatePercent(input) {
  const { value, max, min } = input;
  const percent = Math.round(((value - min) / (max - min)) * 100);
  return percent;
}

export default function styleRanges(ranges) {
  ranges.forEach((range) => {
    const item = range;
    const initialPercent = calculatePercent(item);
    item.style.background = `linear-gradient(to right, #FFBCA2 ${initialPercent}%, #A4A4A4 ${initialPercent}%)`;
    item.addEventListener('input', function styleThis() {
      const percent = calculatePercent(this);
      this.style.background = `linear-gradient(to right, #FFBCA2 ${percent}%, #A4A4A4 ${percent}%)`;
    });
  });
}
