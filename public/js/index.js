// GET REQUEST
function getHeadlines() {
  axios
    .get(
      "https://newsapi.org/v2/top-headlines?country=us&apiKey=245b93f17234480c8618b219b2cee9e9",
      {
        timeout: 5000,
      }
    )
    .then((res) => showOutput(res))
    .catch((err) => console.error(err));
}

function getEverything() {
  axios
    .get(
      "https://newsapi.org/v2/everything?q=bitcoin&apiKey=245b93f17234480c8618b219b2cee9e9",
      {
        timeout: 5000,
      }
    )
    .then((res) => showOutput(res))
    .catch((err) => console.error(err));
}

// possible categories business entertainment general health science sports technology
function getTechnology() {
  axios
    .get(
      "https://newsapi.org/v2/top-headlines?country=us&category=technology&apiKey=245b93f17234480c8618b219b2cee9e9",
      {
        timeout: 5000,
      }
    )
    .then((res) => showOutput(res))
    .catch((err) => console.error(err));
}

// Show output in browser
function showOutput(res) {
  document.getElementById("res").innerHTML = `
  <div class="card card-body mb-4">
    <h5>Status: ${res.status}</h5>
  </div>

  <div class="card mt-3">
    <div class="card-header">
      Headers
    </div>
    <div class="card-body">
      <pre>${JSON.stringify(res.headers, null, 2)}</pre>
    </div>
  </div>

  <div class="card mt-3">
    <div class="card-header">
      Data
    </div>
    <div class="card-body">
      <pre>${JSON.stringify(res.data, null, 2)}</pre>
    </div>
  </div>

  <div class="card mt-3">
    <div class="card-header">
      Config
    </div>
    <div class="card-body">
      <pre>${JSON.stringify(res.config, null, 2)}</pre>
    </div>
  </div>
`;
}

// Event listeners
document.getElementById("headlines").addEventListener("click", getHeadlines);
document.getElementById("everything").addEventListener("click", getEverything);
document.getElementById("tech").addEventListener("click", getTechnology);
