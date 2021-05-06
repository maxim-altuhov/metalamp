// функция меняет окончания слова "Отзывы" в зависимости от их кол-ва
function convertComment() {
  const comments = document.querySelectorAll('.js-card-room__comment');

  comments.forEach(elem => {
    const numberOfComments = Number(elem.querySelector('span').textContent);
    const numberRemainingBy100 = numberOfComments % 100;
    const numberRemainingBy10 = numberOfComments % 10;

    if (numberRemainingBy100 > 5 && numberRemainingBy100 < 21) {
      elem.innerHTML = `<span class="card-room__comment-number">${numberOfComments}</span> Отзывов`;
    } else if (numberRemainingBy10 > 1 && numberRemainingBy10 < 5) {
      elem.innerHTML = `<span class="card-room__comment-number">${numberOfComments}</span> Отзыва`;
    } else if (numberRemainingBy10 === 1) {
      elem.innerHTML = `<span class="card-room__comment-number">${numberOfComments}</span> Отзыв`;
    }
  });
}

export default convertComment;
