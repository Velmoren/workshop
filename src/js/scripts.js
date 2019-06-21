const searchFotm = document.querySelector('#search-form');
const movie = document.querySelector('#movies');
const urlPoster = 'https://image.tmdb.org/t/p/w500';

function apiSearch(event) {
    event.preventDefault();
    const searchText = document.querySelector('#searchText').value;

    // проверка на пустое сообщение? trim() уберает все пробелы
    if (searchText.trim().length === 0) {
        movie.innerHTML = '<h2 class="col-12 text-center text-danger">Поле поиска не должно быть пустым</h2>';
        return;
    }

    // api ключ с https://www.themoviedb.org
    const server =
        'https://api.themoviedb.org/3/search/multi?api_key=f4a6e45a9644b968785144ac0c92538e&language=ru&query=' +
        searchText;

    // показываем Загрузка пока грузятся данные
    movie.innerHTML = '<div class="spinner"></div>';

    fetch(server)
        .then((value) => {
            if (value.status !== 200) {
                return Promise.reject(value);
            }
            return value.json();
        })
        .then((output) => {
            let inner = '';
            // если запрос не выдал ни одного результата выводим сообщение
            if (output.results.length === 0) {
                inner = '<h2 class="col-12 text-center text-info">По вашему запросу ничего не найдено</h2>';
            }

            output.results.forEach((item) => {

                // вытягиваем из item нужные данные
                let nameItem = item.name || item.title;
                let releaseItem = item.first_air_date || item.release_date;
                // ставим заглушку если картинки в обьекте нет
                let poster = item.poster_path ?
                    urlPoster + item.poster_path :
                    "./image/image-null.jpg";
                // добавляем атрибуты к элементам если media_type не является персоной
                let dataInfo = '';
                if (item.media_type !== 'person') {
                    dataInfo =
                        `data-id="${item.id}" data-type="${item.media_type}"`;
                }

                // создаем выводимые данные
                inner += `
                <div class="col-12 col-md-6 col-xl-3 item">
                <img src=${poster} class="img_poster" alt="${nameItem}" ${dataInfo}>
                <h5>${nameItem}</h5>
                (дата релиза: 
                ${ releaseItem }
                )
                </div>
                `;
            });
            // выводим собранные данные
            movie.innerHTML = inner;

            addEventMedia();

        })
        .catch((reason) => {
            movie.innerHTML = 'Упс, что-то пошло не так';
            console.error('Error: ' + reason.status);
        });
}
// обработчик события по нажатию клавиши ENTER
searchFotm.addEventListener('submit', apiSearch);

function addEventMedia() {
    // получаем псевдомассив всех item и перебираем их
    // на target елемент вешаем слушатель по click
    const media = movie.querySelectorAll('img[data-id]');
    media.forEach((elem) => {
        elem.style.cursor = 'pointer';
        elem.addEventListener('click', showFullInfo);
    });
}

function showFullInfo() {
    console.log(this);
}
