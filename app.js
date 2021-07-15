const countriesSelector = select("#countries");
const ctx = select("#chart").getContext("2d");
const flagEl = select(".flag")
const base_url = "https://disease.sh/v3/covid-19/";


function updateFlag(country) {
  flagEl.src = `https://disease.sh/assets/img/flags/${country}.png`
}


async function getCountryData(country) {
  const url = base_url + `countries/${country}`
  data = await (await fetch(url)).json();
  let total = {
    cases: data.cases,
    recovered: data.recovered,
    deaths: data.deaths,
  }

  let today = {
    cases: data.todayCases,
    recovered: data.todayRecovered,
    deaths: data.todayDeaths,
  }

  return [total, today];
}

async function getCountryHistory(country) {
  const url = base_url + `historical/${country}`
  data = await (await fetch(url)).json();
  const time = Object.keys(data.timeline.cases);
  const cases = Object.values(data.timeline.cases);
  const recovered = Object.values(data.timeline.recovered);
  const deaths = Object.values(data.timeline.deaths);

  return [time, cases, recovered, deaths]
}

function updateUI(total, today) {
  select(".today_cases").textContent = "+" + today.cases
  select(".today_recovered").textContent = "+" + today.recovered
  select(".today_deaths").textContent = "+" + today.deaths
  select(".total_cases").textContent = total.cases + " total"
  select(".total_recovered").textContent = total.recovered + " total"
  select(".total_deaths").textContent = total.deaths + " total"
}
// Draw chart
let chart = new Chart(ctx, {
  data: {
    labels: [],
    datasets: [{
      type: 'line',
      label: 'Cases',
      data: [],
      borderColor: '#f0ad4e'
    },
    {
      type: 'line',
      label: 'Recovered',
      data: [],
      borderColor: '#5cb85c'
    },
    {
      type: 'line',
      label: 'Deaths',
      data: [],
      borderColor: '#d9534f'
    }]
  }

})

function updateChart(time, cases, recovered, deaths) {
  chart.data.labels = time;
  chart.data.datasets[0].data = cases
  chart.data.datasets[1].data = recovered
  chart.data.datasets[2].data = deaths
  chart.update();
}

// Render data
function renderData() {
  let country = countriesSelector.value.length == 0 ? "AF" : countriesSelector.value
  updateFlag(country.toLowerCase());
  getCountryData(country).then(data => {
    updateUI(...data)
  })

  getCountryHistory(country).then(data => {
    updateChart(...data)
  });
}

loadCountries();
renderData();

countriesSelector.addEventListener("change", renderData);
