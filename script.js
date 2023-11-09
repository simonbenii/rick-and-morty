const rootElement = document.querySelector("#root");
const search = document.getElementById('search-input');

const fetchUrl = (url) => fetch(url).then((res) => res.json());

const skeletonComponent = () => `
  <div class="characters"></div>
  <div class="buttons"></div>
`;

const characterComponent = (characterData) => `
  <div class="char">
    <div class="char-content">
      <img src="${characterData.image}">
      <h2>${characterData.name}</h2>
      <div class="hidden-info">
        <p>Status: ${characterData.status}</p>
        <p>Type: ${characterData.type}</p>
        <p>Species: ${characterData.species}</p>
        <p>Gender: ${characterData.gender}</p>
        <p>Origin: ${characterData.origin.name}</p>
        <p>Location: ${characterData.location.name}</p>
      </div>
    </div>
  </div>
`;

const buttonComponent = (id, text) => `<button id=${id}>${text}</button>`;

const buttonEventComponent = (id, url) => {
  const buttonElement = document.querySelector(`#${id}`);
  buttonElement.addEventListener("click", () => {
    console.log(`fetch: ${url}`);
    rootElement.innerHTML = "LOADING...";
    fetchUrl(url).then((data) => makeDomFromData(data, rootElement));
  });
};

const makeDomFromData = (data, rootElement) => {
  rootElement.innerHTML = skeletonComponent();

  const charactersElement = document.querySelector(".characters");
  const buttonsElement = document.querySelector(".buttons");

  const info = data.info;
  const characters = data.results;

  characters.forEach((character) =>
    charactersElement.insertAdjacentHTML("beforeend", characterComponent(character))
  );

  if (info.prev) {
    buttonsElement.insertAdjacentHTML("beforeend", buttonComponent("prev", "previous"));
    buttonEventComponent("prev", info.prev);
  }

  if (info.next) {
    buttonsElement.insertAdjacentHTML("beforeend", buttonComponent("next", "next"));
    buttonEventComponent("next", info.next);
  }
};

function searchFunc() {
  search.addEventListener('input', () => {
    if (search.value.length === 0) {
      rootElement.innerHTML = "LOADING...";
      fetchUrl("https://rickandmortyapi.com/api/character").then((data) =>
        makeDomFromData(data, rootElement)
      );
    } else {
      rootElement.innerHTML = "LOADING...";
      fetchUrl(`https://rickandmortyapi.com/api/character/?name=${search.value}`).then((data) =>
        makeDomFromData(data, rootElement)
      );
    }
  })
}

const init = () => {
  rootElement.innerHTML = "LOADING...";
  fetchUrl("https://rickandmortyapi.com/api/character").then((data) =>
    makeDomFromData(data, rootElement)
  );
  searchFunc();
};



init();
