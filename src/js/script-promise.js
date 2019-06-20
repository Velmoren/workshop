const searchFotm = document.querySelector('#search-form');
const movie = document.querySelector('#movies');

function apiSearch(e) {
    e.preventDefault();
    const searchText = document.querySelector('#searchText').value;
    // api ключ с https://www.themoviedb.org
    const server =
        'https://api.themoviedb.org/3/search/multi?api_key=f4a6e45a9644b968785144ac0c92538e&language=ru&query=' +
        searchText;

    // показываем Загрузка пока грузятся данные
    movie.innerHTML = 'Загрузка';

    // вызываем функцию requestApi и обрабатываем полученные данные
    requestApi(server)
        // вызываем метод .then()
        .then((result) => {
            // метод parse распарсит(приведет в порядок и раскидает по свойствам) строку JSON в переменную
            const output = JSON.parse(result);
            let inner = '';
            output.results.forEach((item) => {
                // вытягиваем из item нужные данные
                let nameItem = item.name || item.title;
                let releaseItem = item.first_air_date || item.release_date;
                // inner += `<div class="col-12">${nameItem}</div>`;   - современный синтаксис через обратные кавычки
                inner += '<div class="col-12 col-md-4 col-xl-3">' + nameItem + ' (дата релиза: ' +
                    releaseItem + ')' + '</div>';
            });
            movie.innerHTML = inner;
        })

        // вызываем метод .catch()
        .catch((reason) => {
            movie.innerHTML = 'Упс, что-то пошло не так';
            console.log('error: ' + reason.status);
        });
}
// обработчик события по нажатию клавиши ENTER
searchFotm.addEventListener('submit', apiSearch);

function requestApi(url) {
    return new Promise((resolve, reject) => {
        const request = new XMLHttpRequest();
        request.open('GET', url);
        // если промис удачный, то
        request.addEventListener('load', () => {
            if (request.status !== 200) {
                reject({ status: request.status });
                return;
            }
            resolve(request.response);
        });
        // если промис с ошибкой, то
        request.addEventListener('error', () => {
            reject({ status: request.status });
        });
        request.send();
    });
}
