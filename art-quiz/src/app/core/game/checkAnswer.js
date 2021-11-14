export default function checkAnswer(rightAnswer, button) {
  if (!button) return false;
  if (button.dataset.imageNum === rightAnswer.imageNum) return true;
  return false;
}
