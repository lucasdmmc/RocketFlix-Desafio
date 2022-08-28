import {
  API_KEY, BASE_URL,
  IMG_URL,
  language,
} from './api.js'

class Movie {
  constructor(root) {
    this.root = document.querySelector(root)
    this.load()
  }
  load() {
    this.entries = [{
      original_title: "Os Caça-Fantasmas",
      overview: "Em Nova York Peter Venkman, Ray Stantz e Egon Spengler são três cientistas do departamento de psicologia da Columbia University, que se dedicam ao estudo de casos paranormais. Quando a subvenção termina eles são despedidos e Venkman sugere que abram um negócio próprio, a exterminadora de fantasmas Ghostbusters. Inicialmente eles só têm despesas e nenhum cliente, mas eis que surge Dana Barrett, uma violoncelista que teve uma experiência assustadora em seu apartamento"
    }]
  }
}


export class ShowMovie extends Movie {
  constructor(root) {
    super(root)

    this.aboutMovie = this.root.querySelector(".aboutMovie")
    this.update()
  }

  update() {
    this.removeMain()

    this.entries.forEach(user => {
      const row = this.createMain()

      row.querySelector(".user h2").textContent = user.original_title
      this.aboutMovie.append(row)
    })

  }

  createMain() {
    const aboutMovie = document.createElement("div")

    aboutMovie.innerHTML = `
    <section class="user">
    <img class="capa" src="/assets/filme.svg" alt="">
    <h2 class="name">Os Caça-Fantasmas
    </h2>
    <p class="sinopse">Em Nova York Peter Venkman, Ray Stantz e Egon Spengler são três cientistas do departamento de psicologia da Columbia University, que se dedicam ao estudo de casos paranormais. Quando a subvenção termina eles são despedidos e Venkman sugere que abram um negócio próprio, a exterminadora de fantasmas Ghostbusters. Inicialmente eles só têm despesas e nenhum cliente, mas eis que surge Dana Barrett, uma violoncelista que teve uma experiência assustadora em seu apartamento.</p>
    </section>
    `
    
    return
  }

  removeMain() {

    this.aboutMovie.querySelectorAll(".aboutMovie div").forEach(tags => {
      tags.remove()
    })
    console.log(this.aboutMovie)
  }
}