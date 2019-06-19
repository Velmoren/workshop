const searchFotm = document.querySelector('#search-form');
const movie = document.querySelector('#movies');

function apiSearch(e) {
    e.preventDefault();

    const searchText = document.querySelector('#searchText').value,
        // api ключь с https://www.themoviedb.org
        server =
        'https://api.themoviedb.org/3/search/multi?api_key=f4a6e45a9644b968785144ac0c92538e&language=ru&query=' +
        searchText;
    requestApi(server);

}
// обработчик события по нажатию клавиши ENTER
searchFotm.addEventListener('submit', apiSearch);

function requestApi(url) {

    const request = new XMLHttpRequest();
    request.open('GET', url);
    request.send();

    request.addEventListener('readystatechange', () => {
        if (request.readyState !== 4) { return; }
        if (request.status !== 200) {
            console.log('error: ' + request.status);
            return;
        }
        // метод parse распарсит(приведет в порядок и раскидает по свойствам) строку JSON в переменную
        const output = JSON.parse(request.responseText);

        let inner = '';

        output.results.forEach((item) => {
            let nameItem = item.name || item.title;
            console.log(nameItem);
            // inner += `<div class="col-12">${nameItem}</div>`;   - современный синтаксис через обратные кавычки
            inner += '<div class="col-12">' + nameItem + '</div>';
        });

        movie.innerHTML = inner;

        console.log(output);

    });

}
