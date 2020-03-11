const getMoviesInput = async (event) => {
    if (event.key === "Enter" || event.type === "click") {
        if (document.querySelector('.form-control').value != '') {
            //document.querySelector('.peliculas').innerHTML = '';
            const busqueda = document.querySelector('.form-control').value;
            axios.get('https://api.themoviedb.org/3/search/movie?api_key=cea68b520beecac6718820e4ac576c3a&language=es-ES&query='+busqueda)
            .then(res=>{ const peliculas = res.data.results;
                peliculas.forEach(pelicula => {
                    console.log(pelicula.title);
                    document.querySelector('.peliculas').innerHTML +=`
                    <div class="card" style="width: 11rem;" id=${pelicula.id}>
                        <img src="http://image.tmdb.org/t/p/w185/${pelicula.poster_path}" class="card-img-top" alt="..." data-toggle="modal" data-target="#exampleModal">
                        <div class="card-body">
                            <h6 class="card-title">${pelicula.title}</h6>
                        </div>
                    </div>`;
                })
            })
            .catch(error => console.error(error))
        }
    }
}

//array de generos
//https://api.themoviedb.org/3/genre/movie/list?api_key=cea68b520beecac6718820e4ac576c3a&language=es-ES
//genres: [ { id: 28, name: "Acción"}, { id: 12, name: "Aventura" }, { id: 16, name: "Animación" }, { id: 35, name: "Comedia" } ]

//buscar por movieID
//https://api.themoviedb.org/3/movie/{movie_id}?api_key=cea68b520beecac6718820e4ac576c3a&language=es-ES

//cargar pelis por popularidad
/*
axios.get('https://api.themoviedb.org/3/discover/movie?api_key=cea68b520beecac6718820e4ac576c3a&language=es-ES&sort_by=popularity.desc&include_adult=false&include_video=false&page=1')
    .then(res=>{ const peliculas =res.data.results
        peliculas.forEach(pelicula => {
            document.querySelector('.peliculas').innerHTML +=`
            <div class="card" style="width: 11rem;" id=${pelicula.id}>
                <img src="http://image.tmdb.org/t/p/w185/${pelicula.poster_path}" class="card-img-top" alt="..." data-toggle="modal" data-target="#exampleModal">
                <div class="card-body">
                    <h6 class="card-title">${pelicula.title}</h6>
                </div>
            </div>`
        })
    })
    .catch(error => console.error(error))
*/
/*
function showModal() {
    document.querySelector('.modal').innerHTML +=`
    <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
            aria-hidden="true">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">Con amor, Simon</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    
                    <div class="modal-body">
                        <img src="http://image.tmdb.org/t/p/w342/zaUWIdiXvKWydu9QxtsY7RUu8Kv.jpg" class="card-img-left" alt="...">
                        <div class="modalInfo">
                            <div>
                                Simon Spier es un joven 16 años que no se atreve a revelar su homosexualidad, ya que prefiere
                                esperar al musical que se celebra en secundaria. Pero un día, uno de sus correos electrónicos llega
                                a manos equivocadas y las cosas se complican extraordinariamente.
                            </div><br>
                            <div>
                                Géneros 
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                    </div>
                </div>
            </div>
        </div>`
    }



//<p class="card-text">${pelicula.overview}</p>
//<a href="#" class="btn btn-primary">Go somewhere</a>
*/