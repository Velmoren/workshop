const searchFotm = document.querySelector('#search-form');
const movie = document.querySelector('#movies');
const urlPoster = 'https://image.tmdb.org/t/p/w500';

function apiSearch(event) {
    event.preventDefault();
    const searchText = document.querySelector('#searchText').value;
    // api ключ с https://www.themoviedb.org
    const server =
        'https://api.themoviedb.org/3/search/multi?api_key=f4a6e45a9644b968785144ac0c92538e&language=ru&query=' +
        searchText;

    // показываем Загрузка пока грузятся данные
    movie.innerHTML = 'Загрузка';

    fetch(server)
        .then((value) => {
            if (value.status !== 200) {
                return Promise.reject(value);
            }
            return value.json();
        })
        .then((output) => {
            let inner = '';
            output.results.forEach((item) => {

                // вытягиваем из item нужные данные
                let nameItem = item.name || item.title;
                let releaseItem = item.first_air_date || item.release_date;
                let image;
                // ставим заглушку если картинки в обьекте нет
                if (item.backdrop_path !== null) {
                    image = `<img src="${urlPoster + item.poster_path}" alt="${nameItem}">`;
                } else {
                    image = `<img src="./image/image-null.jpg" alt="${nameItem}">`;
                }

                // создаем выводимые данные
                inner += `
                <div class="col-12 col-md-4 col-xl-3 item">
                ${image}
                <h5>${nameItem}</h5>
                (дата релиза: 
                ${ releaseItem }
                )
                </div>
                `;
            });
            // выводим собранные данные
            movie.innerHTML = inner;
        })
        .catch((reason) => {
            movie.innerHTML = 'Упс, что-то пошло не так';
            console.error('Error: ' + reason.status);
        });
}
// обработчик события по нажатию клавиши ENTER
searchFotm.addEventListener('submit', apiSearch);
