function addCountry(country) {
  const countryEl = document.createElement("option");
  countryEl.textContent = country.name;
  countryEl.value = country.value;
  countriesSelector.appendChild(countryEl)
}

async function loadCountries() {
  const url = base_url + "countries"
  response = await (await fetch(url)).json();
  countries = response.map((country) => ({
    name: country.country,
    value: country.countryInfo.iso2,
    flag: country.countryInfo.flag,
    lat: country.countryInfo.lat,
    long: country.countryInfo.long,
  }));

  countries.forEach(country => addCountry(country))
}