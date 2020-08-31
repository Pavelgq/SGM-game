

export default class News {

  constructor() {
    
    this.container = document.querySelector(".news__list");
    this.textRun = document.querySelector(".game__run");
  }

  /**
   * Добавляет новость в панель новостей и в бегущую строку
   * @param {String} text 
   */
  addNews(text) {
    this.container.innerHTML+= `<li class="news__item"><p>${text}</p></li>`;

    this.textRun.innerHTML = `<marquee>${text}</marquee>`
  }
}