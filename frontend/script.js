const searchInput = document.querySelector('input.form-control.mr-sm-2')
//Carga peliculas por popularidad por default
axios.get('https://api.themoviedb.org/3/discover/movie?api_key=cea68b520beecac6718820e4ac576c3a&language=es-ES&sort_by=popularity.desc&include_adult=false&include_video=false&page=1')
    .then(res => {
        const peliculas = res.data.results;
        peliculas.forEach(pelicula => {
            document.querySelector('.divMovies').innerHTML += `
            <div class="card" id=${pelicula.id}>
                <img src="${pelicula.poster_path==null?'https://upload.wikimedia.org/wikipedia/en/6/60/No_Picture.jpg':"http://image.tmdb.org/t/p/w185/"+pelicula.poster_path}" class="card-img-top" alt="..." onclick="getMovieById(event, ${pelicula.id})">
                <div class="card-body">
                    <h6 class="card-title">${pelicula.title}</h6>
                </div>
            </div>`
        })
    })
    .catch(error => console.error(error))

//Carga generos en dropdown por default
axios.get('https://api.themoviedb.org/3/genre/movie/list?api_key=cea68b520beecac6718820e4ac576c3a&language=es-ES')
    .then(res => {
        const generos = res.data.genres;
        generos.forEach(genero => {
            document.querySelector('.listaGeneros').innerHTML += ` 
            <a class="dropdown-item" href="#" id=${genero.id} 
            onclick="getMoviesByGenre(event, ${genero.id})">${genero.name}</a>`;
        })
    })
    .catch(error => console.error(error))

searchInput.addEventListener("input", function (event) {
    if ('' == this.value) {
        document.querySelector('.divMovies').innerHTML = '';
    }
})

//Carga carrousel
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
            </ol>
            <div class="carousel-inner">
                <div class="carousel-item active" id=${peliculas[0].id}> 
                    <img class="d-block m-100 mw-100" src="http://image.tmdb.org/t/p/w780/${peliculas[0].backdrop_path}" alt="First slide">
                    <div class="carousel-caption d-none d-md-block">
                        <h5>${peliculas[0].title}</h5>
                        <p>${peliculas[0].overview}</p>
                    </div>
                </div>
                <div class="carousel-item" id=${peliculas[1].id}>
                    <img class="d-block m-100 mw-100" src="http://image.tmdb.org/t/p/w780/${peliculas[1].backdrop_path}" alt="Second slide">
                    <div class="carousel-caption d-none d-md-block">
                        <h5>${peliculas[1].title}</h5>
                        <p>${peliculas[1].overview}</p>
                    </div>
                </div>
                <div class="carousel-item" id=${peliculas[2].id}>
                    <img class="d-block m-100 mw-100" src="http://image.tmdb.org/t/p/w780/${peliculas[2].backdrop_path}" alt="Third slide">
                    <div class="carousel-caption d-none d-md-block">
                        <h5>${peliculas[2].title}</h5>
                        <p>${peliculas[2].overview}</p>
                    </div>
                </div>
            </div>
            <a class="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
                <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                <span class="sr-only">Previous</span>
            </a>
            <a class="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
                <span class="carousel-control-next-icon" aria-hidden="true"></span>
                <span class="sr-only">Next</span>
            </a>
        </div>`
                
    })
    .catch(error => console.error(error))

searchInput.addEventListener("keyup", function (event) {
    busqueda = event.target.value;
    axios.get('https://api.themoviedb.org/3/search/movie?api_key=cea68b520beecac6718820e4ac576c3a&language=es-ES&query=' + busqueda)
        .then(res => {
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
        })
        .catch(error => console.error(error))
})

function getMovieById(event, movieId) {
    axios.get(`https://api.themoviedb.org/3/movie/${movieId}?api_key=cea68b520beecac6718820e4ac576c3a&append_to_response=credits&language=es-ES`)
        .then(res => {
            const pelicula = res.data;

            let generos = '';
            pelicula.genres.forEach(genre => {
                generos += genre.name + ", "
            });
            generos = generos.substring(0, generos.length - 2);

            let actores = '';
            for (let i = 0; i < 10; i++) {
                actores += pelicula.credits.cast[i].name + ", "
            }
            actores = actores.substring(0, actores.length - 2);

            showModal(pelicula, generos, actores);
        })
        .catch(error => console.error(error))
}

function getMoviesByGenre(event, genreId) {
    axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=cea68b520beecac6718820e4ac576c3a&with_genres=${genreId}`)
        .then(res => {
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
                        <h5 class="modal-title" id="movieTitle">${pelicula.title}</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    
                    <div class="modal-body">
                        <img src="${pelicula.poster_path==null?'https://upload.wikimedia.org/wikipedia/en/6/60/No_Picture.jpg':
                            "http://image.tmdb.org/t/p/w185/"+pelicula.poster_path}" class="card-img-left" alt="...">
                        <div class="modalInfo">
                            <div>
                                ${pelicula.overview}
                            </div><br>
                            <div>
                                Géneros: ${generos}
                            </div><br>
                            <div>
                                Actores: ${actores}
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                    </div>
                </div>
            </div>
        </div>`
    $('#moviesModal').modal('show');
}



//<p class="card-text">${pelicula.overview}</p>
//<a href="#" class="btn btn-primary">Go somewhere</a>