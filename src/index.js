import './styles.css';
import cardTpl from './templates/card.hbs';
import refs from './js/refs';
import apiService from './js/apiService.js';

refs.searchForm.addEventListener('submit', onSearch);

function onSearch(event) {
  event.preventDefault();

  const form = event.currentTarget;
  apiService.query = form.elements.query.value;
  refs.cardList.innerHTML = '';

  apiService.resetPage();
  fetchCardImage();
  form.reset();
}

function fetchCardImage() {
  apiService.fetchCard().then(hits => {
    cardsMarkup(hits);
  });
}

function cardsMarkup(hits) {
  refs.cardList.insertAdjacentHTML('beforeend', cardTpl(hits));
}

refs.loadMoreBtn.addEventListener('click', () => {
  apiService.fetchCard().then(hits => {
    cardsMarkup(hits);

    window.scrollTo({
      top: document.documentElement.offsetHeight,
      behavior: 'smooth',
    });
  });
});
