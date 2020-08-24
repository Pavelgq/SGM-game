

export default class News {

  constructor() {
    
    this.container = document.querySelector(".news");
    this.textRun = document.querySelector(".game__run");
  }

  addNews(text) {
    this.container.innerHTML+= `<div class="news__item"><p>${text}</p></div>`;

    this.textRun.innerHTML = `<marquee>${text}</marquee>`
  }
}