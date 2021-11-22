export default function checkAnswer(rightImage, userAnswer) {
  if (!userAnswer) return false;
  if (userAnswer === rightImage.imageNum) return true;
  return false;
}
