const ctx1 = select('#bar-chart').getContext('2d')

let bar_chart = new Chart(ctx1, {
  data: {
    labels: [],
    datasets: [{
      type: 'bar',
      label: 'Cases in Continents',
      data: [],
      backgroundColor: ['#f0ad4e']
    }, {
      type: 'bar',
      label: 'Recovered in Continents',
      data: [],
      backgroundColor: ['#5cb85c']
    }, {
      type: 'bar',
      label: 'Deaths in Continents',
      data: [],
      backgroundColor: ['#d9534f']
    }
    ]
  }

})

function updatePieChart(continent, cases, recovered, deaths) {
  bar_chart.data.labels = continent;
  bar_chart.data.datasets[0].data = cases
  bar_chart.data.datasets[1].data = recovered
  bar_chart.data.datasets[2].data = deaths
  bar_chart.update();
}

async function getContinentData() {
  const continent = [];
  const cases = [];
  const recovered = [];
  const deaths = [];
  const url = "https://disease.sh/v3/covid-19/continents";
  data = await (await fetch(url)).json();
  data.forEach(element => {
    continent.push(element.continent)
    cases.push(element.cases)
    recovered.push(element.recovered)
    deaths.push(element.deaths)
  });

  return [continent, cases, recovered, deaths]
}

getContinentData().then(data => {
  updatePieChart(...data)
});