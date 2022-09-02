import './css/styles.css';
import { fetchCountries } from './fetchCountries';
import debounce from 'lodash.debounce';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
const DEBOUNCE_DELAY = 300;

const countryList = document.querySelector('.country-list');
const countryInfoBox = document.querySelector('.country-info');
const inputCountryName = document.querySelector('#search-box');

inputCountryName.addEventListener(
  'input',
  debounce(inputChange, DEBOUNCE_DELAY)
);

function inputChange(event) {
  let name = event.target.value;
  clearDatas();
  if (name.length === 0) {
    return;
  }

  fetchCountries(name.trim())
    .then(countries => renderCountriesList(countries))
    .catch(error => Notify.failure('Oops, there is no country with that name'));
}
function clearDatas() {
  countryList.innerHTML = '';
  countryInfoBox.innerHTML = '';
}
function renderCountriesList(countries) {
  if (countries.length > 10) {
    Notify.info('Too many matches found. Please enter a more specific name.');
    return;
  }
  updateCountryDatas(countries);
}
function currentLanguages(languages) {
  const langs = [];
  for (let key in languages) {
    langs.push(languages[key]);
  }
  return langs;
}
function updateCountryDatas(countries) {
  if (countries.length === 1) {
    countriesBox(countries);
  } else {
    countriesList(countries);
  }
}
function countriesList(countries) {
  const markup = countries
    .map(country => {
      return `<li class="country-list-item">
        <img src="${country.flags.svg}" alt="${country.name.official}" width="50">
          <p>${country.name.official}</p>
        </li>`;
    })
    .join('');
  countryList.innerHTML = markup;
}
function countriesBox(countries) {
  const markup = countries
    .map(country => {
      const languages = currentLanguages(country.languages);
      return `<div class="country-item">
        <img src="${country.flags.svg}" alt="${country.name.official}" width="200">
          <p><b>Name</b>: ${country.name.official}</p>
          <p><b>Capital</b>: ${country.capital}</p>
          <p><b>Languages</b>: ${languages}</p>
          <p><b>Population</b>: ${country.population}</p>
        </div>`;
    })
    .join('');
  countryInfoBox.innerHTML = markup;
}
