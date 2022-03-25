function switchLikes() {
  const likeButtons = document.querySelectorAll('.js-like__btn');

  const handleLikeBtnClick = (e) => {
    const target = e.currentTarget;
    const likeBtn = target.firstElementChild;
    const likeIcon = likeBtn.firstElementChild;
    const likeCounter = likeBtn.lastElementChild;

    if (target.classList.contains('like__btn_active')) {
      likeIcon.textContent = 'favorite_border';
      likeCounter.textContent = Number(likeCounter.textContent) - 1;
    } else {
      likeIcon.textContent = 'favorite';
      likeCounter.textContent = Number(likeCounter.textContent) + 1;
    }

    target.classList.toggle('like__btn_active');
  };

  likeButtons.forEach((btn) => btn.addEventListener('click', handleLikeBtnClick));
}

export default switchLikes;
