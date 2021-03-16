function toggleLikes() {
  const likeButtons = document.querySelectorAll('.like__btn');

  function changedLikes(e) {
    const targetElement = e.currentTarget.firstElementChild;
    let targetCounter = e.currentTarget.lastElementChild;

    if (e.currentTarget.classList.contains('like__btn_active')) {
      targetElement.textContent = 'favorite_border';
      targetCounter.textContent = +targetCounter.textContent - 1;
    } else {
      targetElement.textContent = 'favorite';
      targetCounter.textContent = +targetCounter.textContent + 1;
    }

    e.currentTarget.classList.toggle('like__btn_active');
  }

  likeButtons.forEach((elem) => {
    elem.addEventListener('click', changedLikes);
  });
}

export default toggleLikes;
