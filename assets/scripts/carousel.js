const leftCarouselButton = document.querySelector('.carousel-button_left');
const rightCarouselButton = document.querySelector('.carousel-button_right');
const carouselContainer = document.querySelector('.participants__list');
const carouselTextContainer = document.querySelector('.carousel-buttons__text');

let scrollCarouselCounter = 1;
let timer= null;

const changeCarouselText = (counter) => {
  carouselTextContainer.textContent = counter.toString();
};

const controlCarouselButtons = () => {
  if (scrollCarouselCounter === 6) {
    disableButton(rightCarouselButton);
  } else if (scrollCarouselCounter === 1) {
    disableButton(leftCarouselButton);
  } else {
    activateButton(rightCarouselButton);
    activateButton(leftCarouselButton);
  }
};

const swipeContainer = (side, breakpoint) => {
  if (side === 'right') {
    carouselContainer.scrollLeft += breakpoint;
  } else {
    carouselContainer.scrollLeft -= breakpoint;
  }
};

const disableButton = (button) => {
  button.classList.add('carousel-button_disabled');
  button.disabled = true;
};

const activateButton = (button) => {
  if (button.classList.contains('carousel-button_disabled')) {
    button.classList.remove('carousel-button_disabled');
    button.disabled = false;
  }
};

const changeActiveCarouselItem = () => {
  [].slice.call(carouselContainer.children).forEach((item, index) => {
    if (Math.abs(
        item.getBoundingClientRect().left -
      carouselContainer.getBoundingClientRect().left,
    ) < 40
    ) {
      scrollCarouselCounter = index + 1;
      changeCarouselText(scrollCarouselCounter);
      controlCarouselButtons();
    }
  });
};


carouselContainer.addEventListener('scroll', () => {
  clearTimeout(timer);

  timer = setTimeout(() => {
    clearTimeout(timer);
    changeActiveCarouselItem();
  }, 100);
});

leftCarouselButton
    .addEventListener('click', () =>swipeContainer('left', 400));
rightCarouselButton
    .addEventListener('click', () => swipeContainer('right', 400));
