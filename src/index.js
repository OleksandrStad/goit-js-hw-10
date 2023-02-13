import './css/styles.css';
import { fetchCountries } from './fetchCountries';
import debounce from 'lodash.debounce';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
const DEBOUNCE_DELAY = 300;
const inputCountryEl = document.querySelector('#search-box');
const listCountryEl = document.querySelector('.country-list');
const infoCountryEl = document.querySelector('.country-info');

inputCountryEl.addEventListener('input', debounce(inputNameCountry, DEBOUNCE_DELAY));
function inputNameCountry(e) {
    const textInput = e.target.value.trim();
    if (!textInput) {
        infoCountryEl.innerHTML = '';
        return;
    };

    fetchCountries(textInput)
        .then(sortCountries)
        .catch(error => {
            Notify.failure('Oops, there is no country with that name');
        });
};

function sortCountries(countries) {
    if (countries.length > 10) {
        Notify.info('Too many matches found. Please enter a more specific name');
        return;
    } else if (countries.length === 1) {
        infoCountryEl.innerHTML = '';
        renderCountry(countries[0]);
        return;
    }
    infoCountryEl.innerHTML = '';
    countries.forEach(el => {
        renderCountries(el);
    });
};

function renderCountries(country) {
    const markup = `<div>
                    <img src="${country.flags.svg}" alt="${country.name.common} width="60" height="60">
                    <p>${country.name.common}</p>
                  </div>`;
    infoCountryEl.insertAdjacentHTML('afterbegin', markup);
};

function renderCountry(country) {

    const markup = `<div>
                    <img src="${country.flags.svg}" alt="${country.name.common} width="60" height="60">
                    <p>${country.name.common}</p>
                  </div>
                  <p><span style="font-weight:bold;">Capital:  </span>${country.capital}</p>
                  <p><span style="font-weight:bold;">Population:  </span>${country.population}</p>
                  <p><span style="font-weight:bold;">Languages:  </span>${Object.values(country.languages).join(',')}</p>`;

    infoCountryEl.innerHTML = markup;

}

