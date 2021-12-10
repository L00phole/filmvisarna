let title;

async function readJson() {
  let rawData = await fetch('/frontend/json/films.json')
  title = await rawData.json();
}