function toggleLikes() {
  const likeButtons = document.querySelectorAll('.js-like__block');

  const changedLikes = (e) => {
    const target = e.currentTarget.firstElementChild;
    const targetElement = target.firstElementChild;
    let targetCounter = target.lastElementChild;

    if (e.currentTarget.classList.contains('like__block_active')) {
      targetElement.textContent = 'favorite_border';
      targetCounter.textContent = Number(targetCounter.textContent) - 1;
    } else {
      targetElement.textContent = 'favorite';
      targetCounter.textContent = Number(targetCounter.textContent) + 1;
    }

    e.currentTarget.classList.toggle('like__block_active');
  };

  likeButtons.forEach((elem) => {
    elem.addEventListener('click', changedLikes);
  });
}

export default toggleLikes;
