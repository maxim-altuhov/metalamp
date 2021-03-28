function toggleLikes() {
  const likeButtons = document.querySelectorAll('.like__block');

  function changedLikes(e) {
    const target = e.currentTarget.firstElementChild;
    const targetElement = target.firstElementChild;
    let targetCounter = target.lastElementChild;

    if (e.currentTarget.classList.contains('like__block_active')) {
      targetElement.textContent = 'favorite_border';
      targetCounter.textContent = +targetCounter.textContent - 1;
    } else {
      targetElement.textContent = 'favorite';
      targetCounter.textContent = +targetCounter.textContent + 1;
    }

    e.currentTarget.classList.toggle('like__block_active');
  }

  likeButtons.forEach((elem) => {
    elem.addEventListener('click', changedLikes);
  });
}

export default toggleLikes;
