const BASE_URL = 'https://restcountries.com/v3.1';
export function fetchCountries(country) {
    const ulr = `${BASE_URL}/name/${countryName}?fields=name,capital,population,flags,languages`
    return fetch(url).then(res => {
        if (res.status === 404) {
            throw new Error();
        }
        return res.json();
    });
}


