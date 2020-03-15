const searchInput = document.querySelector('input.form-control.mr-sm-2')
const main = document.querySelector('main');
let page = 1;
let mode = "popular";
let busqueda = ""
getPopularMovies(1);

const changePage = (step) => {
    page += step;
    document.querySelector('.currentPage').innerText = page;
    if (mode === "popular") {
        getPopularMovies(page);
    } else if (mode === "search") {
        getMoviesByQuery();
    }
}

//Carga generos en dropdown por default
if (document.querySelector('.listaGeneros').innerHTML === "") {
    axios.get('https://api.themoviedb.org/3/genre/movie/list?api_key=cea68b520beecac6718820e4ac576c3a&language=es-ES')
        .then(res => {
            const generos = res.data.genres;
            generos.forEach(genero => {
                document.querySelector('.listaGeneros').innerHTML += ` 
                <a class="dropdown-item" href="#" id=${genero.id} 
                onclick="loadMoviesByGenre('${genero.name}', ${genero.id})">${genero.name}</a>`;
            })
        })
        .catch(error => console.error(error))
}

//Carga carrousel con top 5 de popularidad
if (document.querySelector('.divCarousel').innerHTML === "") {
    let carousel = '';
    axios.get('https://api.themoviedb.org/3/discover/movie?api_key=cea68b520beecac6718820e4ac576c3a&language=es-ES&sort_by=popularity.desc&include_adult=false&include_video=false&page=1')
        .then(res => {
            const peliculas = res.data.results;
            document.querySelector('.divCarousel').innerHTML = `
                <div id="carouselExampleIndicators" class="carousel slide" data-ride="carousel">
                <ol class="carousel-indicators">
                    <li data-target="#carouselExampleIndicators" data-slide-to="0" class="active"></li>
                    <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
                    <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
                    <li data-target="#carouselExampleIndicators" data-slide-to="3"></li>
                    <li data-target="#carouselExampleIndicators" data-slide-to="4"></li>
                </ol>
                <div class="carousel-inner">
                    <div class="carousel-item active" id=${peliculas[0].id} onclick="getMovieById(event, ${peliculas[0].id})"> 
                        <img class="d-block m-100 mw-100" src="http://image.tmdb.org/t/p/w780/${peliculas[0].backdrop_path}" alt="First slide">
                        <div class="carousel-caption d-none d-md-block">
                            <h5>${peliculas[0].title}</h5>
                            <p>${peliculas[0].overview}</p>
                        </div>
                    </div>
                    <div class="carousel-item" id=${peliculas[1].id} onclick="getMovieById(event, ${peliculas[1].id})">
                        <img class="d-block m-100 mw-100" src="http://image.tmdb.org/t/p/w780/${peliculas[1].backdrop_path}" alt="Second slide">
                        <div class="carousel-caption d-none d-md-block">
                            <h5>${peliculas[1].title}</h5>
                            <p>${peliculas[1].overview}</p>
                        </div>
                    </div>
                    <div class="carousel-item" id=${peliculas[2].id} onclick="getMovieById(event, ${peliculas[2].id})">
                        <img class="d-block m-100 mw-100" src="http://image.tmdb.org/t/p/w780/${peliculas[2].backdrop_path}" alt="Third slide">
                        <div class="carousel-caption d-none d-md-block">
                            <h5>${peliculas[2].title}</h5>
                            <p>${peliculas[2].overview}</p>
                        </div>
                    </div>
                    <div class="carousel-item" id=${peliculas[3].id} onclick="getMovieById(event, ${peliculas[3].id})">
                        <img class="d-block m-100 mw-100" src="http://image.tmdb.org/t/p/w780/${peliculas[3].backdrop_path}" alt="Third slide">
                        <div class="carousel-caption d-none d-md-block">
                            <h5>${peliculas[3].title}</h5>
                            <p>${peliculas[3].overview}</p>
                        </div>
                    </div>
                    <div class="carousel-item" id=${peliculas[4].id} onclick="getMovieById(event, ${peliculas[4].id})">
                        <img class="d-block m-100 mw-100" src="http://image.tmdb.org/t/p/w780/${peliculas[4].backdrop_path}" alt="Third slide">
                        <div class="carousel-caption d-none d-md-block">
                            <h5>${peliculas[4].title}</h5>
                            <p>${peliculas[4].overview}</p>
                        </div>
                    </div>
                </div>
            </div>`;
        })
        .catch(error => console.error(error))
}

function getPopularMovies(page = 1) {
    if (mode !== "popular") {
        page = 1;
        document.querySelector('.currentPage').innerText = page;
    }
    mode = "popular";
    if (page === 1) {
        document.querySelector('#prevPage').style.visibility = "hidden";
    } else {
        document.querySelector('#prevPage').style.visibility = "visible";
    }
    //Carga peliculas por popularidad por default
    axios.get('https://api.themoviedb.org/3/discover/movie?api_key=cea68b520beecac6718820e4ac576c3a&language=es-ES&sort_by=popularity.desc&include_adult=false&include_video=false&page=' + page)
        .then(res => {
            const peliculas = res.data.results;
            document.querySelector('.divMovies').innerHTML = '';
            document.querySelector('.whatAreWeSeeing h4').innerHTML = `Películas más populares`;
            peliculas.forEach(pelicula => {
                document.querySelector('.divMovies').innerHTML += `
                <div class="card" id=${pelicula.id}>
                    <img src="${pelicula.poster_path==null?'https://upload.wikimedia.org/wikipedia/en/6/60/No_Picture.jpg':"http://image.tmdb.org/t/p/w185/"+pelicula.poster_path}" class="card-img-top" alt="..." onclick="getMovieById(event, ${pelicula.id})">
                    <div class="card-body">
                        <h6 class="card-title">${pelicula.title}</h6>
                    </div>
                </div>`;
            })
        })
        .catch(error => console.error(error))
    //Mostrar carousel
    document.querySelector('.divCarousel').style.display = "block";
    document.querySelector('.divCarousel').style.backgroundColor = "#98ccd3";
}

searchInput.addEventListener("input", function (event) {
    if ('' == this.value) {
        document.querySelector('.divMovies').innerHTML = '';
        getPopularMovies();
    }
})

const getMoviesByQuery = () => {
    document.querySelector('.currentPage').innerText = page;
    if (page === 1) {
        document.querySelector('#prevPage').style.visibility = "hidden";
    } else {
        document.querySelector('#prevPage').style.visibility = "visible";
    }
    axios.get(`https://api.themoviedb.org/3/search/movie?api_key=cea68b520beecac6718820e4ac576c3a&language=es-ES&query=${busqueda}&page=${page}`)
        .then(res => {
            let totalPages = res.data.total_pages;
            document.querySelector('.whatAreWeSeeing h4').innerHTML = `Películas que contienen en el título "${busqueda}"`;
            document.querySelector('.divCarousel').style.display = "none";
            document.querySelector('.divCarousel').style.backgroundColor = "transparent";
            const peliculas = res.data.results;
            if (peliculas.length > 0) {
                document.querySelector('.divMovies').innerHTML = '';
                peliculas.forEach(pelicula => {
                    document.querySelector('.divMovies').innerHTML += `
                <div class="card" id=${pelicula.id}>
                <img src="${pelicula.poster_path==null?'https://upload.wikimedia.org/wikipedia/en/6/60/No_Picture.jpg':"http://image.tmdb.org/t/p/w185/"+pelicula.poster_path}" class="card-img-top" alt="..." onclick="getMovieById(event, ${pelicula.id})">
                <div class="card-body">
                <h6 class="card-title">${pelicula.title}</h6>
                </div>
                </div>`;
                })
            } else {
                document.querySelector('.divMovies').innerHTML = '';
            }
            if (page === totalPages) {
                document.querySelector('#nextPage').style.visibility = "hidden";
            } else {
                document.querySelector('#nextPage').style.visibility = "visible";
            }
        })
        .catch(error => console.error(error))
}

searchInput.addEventListener("keyup", function (event) {
    busqueda = event.target.value;
    mode = "search";
    page = 1;
    getMoviesByQuery()
})

function getMovieById(event, movieId) {
    axios.get(`https://api.themoviedb.org/3/movie/${movieId}?api_key=cea68b520beecac6718820e4ac576c3a&append_to_response=credits&language=es-ES`)
        .then(res => {
            const pelicula = res.data;

            let generos = '';
            if (pelicula.genres.length > 0) {
                generos = 'Géneros: ';
                pelicula.genres.forEach(genre => {
                    generos += genre.name + ", "
                });
                generos = generos.substring(0, generos.length - 2);
            }
            let actores = '';
            if (pelicula.credits.cast.length > 0) {
                actores = 'Actores: ';
                let i = 0;
                pelicula.credits.cast.forEach(actor => {
                    if (i < 10) {
                        actores += actor.name + ", "
                        i++;
                    }
                })
                actores = actores.substring(0, actores.length - 2);
            }
            showModal(pelicula, generos, actores);
        })
        .catch(error => console.error(error))
}

function getSimilarMovies(movieId, movieName) {
    axios.get(`https://api.themoviedb.org/3/movie/${movieId}/similar?api_key=cea68b520beecac6718820e4ac576c3a&language=es-ES&page=1`)
        .then(res => {
            const peliculas = res.data.results;
            document.querySelector('.divMovies').innerHTML = '';
            document.querySelector('.divCarousel').style.display = "none";
            document.querySelector('.divCarousel').style.backgroundColor = "transparent";
            if (peliculas.length > 0) {
                peliculas.forEach(pelicula => {
                    document.querySelector('.divMovies').innerHTML += `
                        <div class="card" id=${pelicula.id}>
                            <img src="${pelicula.poster_path==null?'https://upload.wikimedia.org/wikipedia/en/6/60/No_Picture.jpg'
                                :"http://image.tmdb.org/t/p/w185/"+pelicula.poster_path}" class="card-img-top" alt="..." 
                                onclick="getMovieById(event, ${pelicula.id})">
                            <div class="card-body">
                                <h6 class="card-title">${pelicula.title}</h6>
                            </div>
                        </div>`
                });
                document.querySelector('.whatAreWeSeeing h4').innerHTML = `Películas similares a "${movieName}"`;
            } else {
                document.querySelector('.whatAreWeSeeing h4').innerHTML = `No se encontraron películas similares a "${movieName}"`;
            }
        })
        .catch(error => console.error(error))
}

function showModal(pelicula, generos, actores) {
    document.querySelector('.divModal').innerHTML = `
    <div class="modal fade" id="moviesModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
            aria-hidden="true">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="movieTitle">${pelicula.title} (${pelicula.release_date.slice(0,4)})</h5>
                        <div class="stars-outer">
                            <div class="stars-inner"></div>
                        </div>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    
                    <div class="modal-body">
                        <img src="${pelicula.poster_path==null?'https://upload.wikimedia.org/wikipedia/en/6/60/No_Picture.jpg':
                            "http://image.tmdb.org/t/p/w185/"+pelicula.poster_path}" class="card-img-left" alt="...">
                        <div class="modalInfo">
                            <div>${pelicula.overview}</div><br>
                            <div>${generos}</div><br>
                            <div>${actores}</div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        ¿Ya viste esta película y te encantó?   
                        <button type="button" class="btn btn-primary" data-dismiss="modal" 
                        onclick="getSimilarMovies(${pelicula.id}, '${pelicula.title}')">Ver similares</button>
                    </div>
                </div>
            </div>
        </div>`;
    document.querySelector(`.stars-inner`).style.width = `${(Math.round(pelicula.vote_average)*10)}%`;
    $('#moviesModal').modal('show');
}

function loadMoviesByGenre(genreName, genreId) {
    document.querySelector('.divCarousel').style.display = "none";
    document.querySelector('.divCarousel').style.backgroundColor = "transparent";
    document.querySelector('.whatAreWeSeeing h4').innerHTML = `Género: ${genreName}`;
    document.querySelector('.whatAreWeSeeing h4').id = `${genreId}`;
    document.querySelector('.whatAreWeSeeing select').style.visibility = 'visible';
    document.querySelector('.whatAreWeSeeing select').selectedIndex = '0';
    document.querySelector('.divMovies').innerHTML = '';
    filterMoviesByGenreAndSelectedOption(document.getElementById("mySelect"));
}

function filterMoviesByGenreAndSelectedOption(element) {
    let generoId = document.getElementById("mySelect").parentElement.firstElementChild.id;
    if (element.selectedIndex === 0) {
        getMoviesByGenreAndByVoteAverage(generoId);
    } else if (element.selectedIndex === 1) {
        getMoviesByGenreAndByReleaseDate(generoId);
    } else if (element.selectedIndex === 2) {
        getMoviesByGenreAndByTitleDesc(generoId);
    } else if (element.selectedIndex === 3) {
        getMoviesByGenreAndByTitleAsc(generoId);
    }
}

function injectinDivMovies(peliculas) {
    document.querySelector('.divCarousel').style.display = "none";
    document.querySelector('.divCarousel').style.backgroundColor = "transparent";
    if (peliculas.length > 0) {
        document.querySelector('.divMovies').innerHTML = '';
        peliculas.forEach(pelicula => {
            document.querySelector('.divMovies').innerHTML += `
    <div class="card" id=${pelicula.id}>
    <img src="${pelicula.poster_path==null?'https://upload.wikimedia.org/wikipedia/en/6/60/No_Picture.jpg'
    :"http://image.tmdb.org/t/p/w185/"+pelicula.poster_path}" class="card-img-top" alt="..." onclick="getMovieById(event, ${pelicula.id})">
    <div class="card-body">
    <h6 class="card-title">${pelicula.title}</h6>
    </div>
    </div>`;
        })
    } else {
        document.querySelector('.divMovies').innerHTML = '';
    }
}

function getMoviesByGenreAndByVoteAverage(genreId) {
    axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=cea68b520beecac6718820e4ac576c3a&language=es-ES&sort_by=vote_average.desc&include_adult=false&page=1&vote_count.gte=100&with_genres=${genreId}`)
        .then(res => {
            const peliculas = res.data.results;
            injectinDivMovies(peliculas);
        })
        .catch(error => console.error(error));
}

function getMoviesByGenreAndByReleaseDate(genreId) {
    axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=cea68b520beecac6718820e4ac576c3a&language=es-ES&sort_by=release_date.desc&include_adult=false&page=1&release_date.gte=2019&vote_count.gte=100&with_genres=${genreId}`)
        .then(res => {
            const peliculas = res.data.results;
            injectinDivMovies(peliculas);
        })
        .catch(error => console.error(error));
}

function getMoviesByGenreAndByTitleDesc(genreId) {
    axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=cea68b520beecac6718820e4ac576c3a&vote_count.gte=100&language=es-ES&sort_by=original_title.asc&page=1&with_genres=${genreId}`)
        .then(res => {
            const peliculas = res.data.results;
            injectinDivMovies(peliculas);
        })
        .catch(error => console.error(error));
}

function getMoviesByGenreAndByTitleAsc(genreId) {
    axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=cea68b520beecac6718820e4ac576c3a&vote_count.gte=100&language=es-ES&sort_by=original_title.desc&page=1&with_genres=${genreId}`)
        .then(res => {
            const peliculas = res.data.results;
            injectinDivMovies(peliculas);
        })
        .catch(error => console.error(error));
}