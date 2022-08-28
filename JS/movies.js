import { API_KEY, BASE_URL, IMG_URL} from './api.js'

export class MovieAPI {
  static getPopularMovies() {
    const endpoint = `${BASE_URL}/3/movie/popular?api_key=${API_KEY}&language=en-US&page=1`

    return fetch(endpoint)
    .then(data => data.json())
    .then(data => {
      return data.results
    })
  }
}

export class Movie {
  constructor(root) {
    this.root = document.querySelector(root)
    this.load()
    this.loadMovies()
  }
  load() {
    this.movies = JSON.parse(localStorage.getItem("@movies:")) || []
  }

  save() {
    localStorage.setItem("@movies:", JSON.stringify(this.movies))
  }

  async loadMovies() {
    const movies = await MovieAPI.getPopularMovies()
    console.log(movies)
    this.movies = movies

    this.save()
  }
}


export class ShowMovie extends Movie {
  constructor(root) {
    super(root)

    this.aboutMovie = this.root.querySelector(".aboutMovie")
    this.pickMovie()
  }

  pickMovie() {
    document.querySelector("button")
    .addEventListener("click", () => {
      this.removeMain() 
      const movies = JSON.parse(localStorage.getItem("@movies:"))
      const movie = movies[Math.floor(Math.random()*movies.length)];
      console.log(movie)
      const row = this.createMain()
      row.querySelector("img").src = `${IMG_URL}/${movie.poster_path}`
      row.querySelector("h2").textContent = movie.title
      row.querySelector("p").textContent = `${movie.overview}`  
      this.aboutMovie.append(row)
    })
  }

  createMain() {
    const aboutMovie = document.querySelector(".aboutMovie")

    aboutMovie.innerHTML = `
    <div>
    <img src="" alt="">
    </div>
    <div>
    <h2 class="name">Os Caça-Fantasmas
    </h2>
    <p class="sinopse">Em Nova York Peter Venkman, Ray Stantz e Egon Spengler são três cientistas do departamento de psicologia da Columbia University, que se dedicam ao estudo de casos paranormais. Quando a subvenção termina eles são despedidos e Venkman sugere que abram um negócio próprio, a exterminadora de fantasmas Ghostbusters. Inicialmente eles só têm despesas e nenhum cliente, mas eis que surge Dana Barrett, uma violoncelista que teve uma experiência assustadora em seu apartamento.</p>
    </div>
    `
    return aboutMovie
  }

  removeMain() {
    this.aboutMovie.querySelectorAll(".aboutMovie div").forEach(div => {
      div.remove()
    })
  }
}