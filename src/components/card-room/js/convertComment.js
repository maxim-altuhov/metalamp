// функция меняет окончания слова "Отзывы" в зависимости от их кол-ва
function convertComment() {
  const comments = document.querySelectorAll('.js-card-room__comments');

  comments.forEach((comment) => {
    const numberOfComments = Number(comment.querySelector('.js-card-room__comments-meter').textContent);
    const checkNumberOfComments = (startNumber, endNumber, checkTwoDigitNum = true) => {
      const checkingNumber = checkTwoDigitNum ? numberOfComments % 100 : numberOfComments % 10;

      return (checkingNumber > startNumber) && (checkingNumber < endNumber);
    };

    if (checkNumberOfComments(5, 21)) {
      comment.lastChild.textContent = ' отзывов';
    } else if (checkNumberOfComments(1, 5, false)) {
      comment.lastChild.textContent = ' отзыва';
    } else if ((numberOfComments % 10) === 1) {
      comment.lastChild.textContent = ' отзыв';
    }
  });
}

export default convertComment;
