const BASE_URL = 'https://restcountries.com/v3.1/name/';
const nameF = '?fields=name,capital,population,flag,languages';

function fetchCountries(name) {
  return fetch(`${BASE_URL}${name}${nameF}`).then(response => {
    if (!response.ok) {
      throw new Error(response.status);
    }
    return response.json;
  });
}

export { fetchCountries };
