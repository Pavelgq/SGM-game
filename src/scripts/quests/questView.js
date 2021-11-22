export default class QuestView {
  constructor(quest) {
    this.quest = quest;
  }

  questInQuests() {
    const quest = this.quest;
    //сгенерировать награды
    let bonuses = '';
    if (quest.bonuses.money) {
      bonuses += `<div class="wrapper"><span>Деньги:</span><span class="conditions__money">${quest.bonuses.money}</span></div>`;
    };
    if (quest.bonuses.exp) {
      bonuses += `<div class="wrapper"><span>Опыт:</span><span class="conditions__exp">${quest.bonuses.exp}</span></div>`;
    };
    for (const key in quest.bonuses.relationship) {
      const element = quest.bonuses.relationship[key];
      if (element) {
        bonuses += ` <div class="wrapper"><span>Репутация ${this.model.creatures[key].name}:</span><span class="conditions__rep">${element}</span></div>`;
      }
    }

    //сгенерировать траты
    let spending = '';
    if (quest.spending.fuel) {
      spending += `<div class="wrapper"><span>Топливо:</span><span class="conditions__fuel">${quest.spending.fuel}</span></div>`;
    };
    if (quest.spending.money) {
      spending += `<div class="wrapper"><span>Деньги:</span><span class="conditions__money">${quest.spending.money}</span></div>`;
    };

    //сгенерировать требования
    let checking = '';
    if (quest.checking.fuel) {
      checking += `<div class="wrapper"><span>Топливо:</span><span class="conditions__fuel">${quest.checking.fuel}</span></div>`;
    };
    if (quest.checking.space) {
      checking += `<div class="wrapper"><span>Трюм:</span><span class="conditions__money">${quest.checking.space}</span></div>`;
    };
    if (quest.checking.speed) {
      checking += `<div class="wrapper"><span>Скорость:</span><span class="conditions__money">${quest.checking.speed}</span></div>`;
    };

    let opened = quest.open ? '' : 'visually-hidden';

    let template = `<li class="quest__item" data-id = "${quest.index}">
        <button class="quest__accordion" >
                  <h3 class="quest__title" >${quest.name}</h3>
                </button>
                <div class="quest__panel ${opened}">
          <span class="quest__type">Тип: ${quest.type}</span>
          <div class = "quest__about">
            <p class="quest__description">${quest.description}
          </div>
          </p>
          
          <div class="quest__bonuses conditions">
            <h4 class="quest__subtitle">Награды</h4>
            ${bonuses}
          </div>`
    if (spending) {
      template += `<div class="quest__spending conditions">
          <h4 class="quest__subtitle">Траты</h4>
          ${spending}
        </div>`
    }

    if (checking) {
      template += `<div class="quest__checking conditions">
          <h4 class="quest__subtitle">Требования</h4>
          ${checking}
        </div>`
    }
    template += `<div class="wrapper quest__menu">
          <button class = "quest__accept">Принять</button>
          <select class="quest__select quest__select--plane"></select>
          <button class = "quest__reset">Отказаться</button>
            </div>
          </div>
          </li>`;


    return template;
  }

  questInPlaneAction() {
    const quest = this.quest;
    //сгенерировать награды
    let bonuses = '';
    if (quest.bonuses.money) {
      bonuses += `<div class="wrapper"><span>Деньги:</span><span class="conditions__money">${quest.bonuses.money}</span></div>`;
    };
    if (quest.bonuses.exp) {
      bonuses += `<div class="wrapper"><span>Опыт:</span><span class="conditions__exp">${quest.bonuses.exp}</span></div>`;
    };
    for (const key in quest.bonuses.relationship) {
      const element = quest.bonuses.relationship[key];
      if (element) {
        bonuses += ` <div class="wrapper"><span>Репутация ${this.model.creatures[key].name}:</span><span class="conditions__rep">${element}</span></div>`;
      }
    }

    //сгенерировать траты
    let spending = '';
    if (quest.spending.fuel) {
      spending += `<div class="wrapper"><span>Топливо:</span><span class="conditions__fuel">${quest.spending.fuel}</span></div>`;
    };
    if (quest.spending.money) {
      spending += `<div class="wrapper"><span>Деньги:</span><span class="conditions__money">${quest.spending.money}</span></div>`;
    };

    //сгенерировать требования
    let checking = '';
    if (quest.checking.fuel) {
      checking += `<div class="wrapper"><span>Топливо:</span><span class="conditions__fuel">${quest.checking.fuel}</span></div>`;
    };
    if (quest.checking.space) {
      checking += `<div class="wrapper"><span>Трюм:</span><span class="conditions__money">${quest.checking.space}</span></div>`;
    };
    if (quest.checking.speed) {
      checking += `<div class="wrapper"><span>Скорость:</span><span class="conditions__money">${quest.checking.speed}</span></div>`;
    };

    let opened = quest.open ? '' : 'visually-hidden';

    let template = `<li class="quest__item" data-id = "${quest.index}">
        <button class="quest__accordion" >
                  <h3 class="quest__title" >${quest.name}</h3>
                </button>
                <div class="quest__panel ${opened}">
          <span class="quest__type">Тип: ${quest.type}</span>
          <p class="quest__description">${quest.description}
          </p>
          <div class="quest__bonuses conditions">
            <h4 class="quest__subtitle">Награды</h4>
            ${bonuses}
          </div>`
    if (spending) {
      template += `<div class="quest__spending conditions">
          <h4 class="quest__subtitle">Траты</h4>
          ${spending}
        </div>`
    }

    if (checking) {
      template += `<div class="quest__checking conditions">
          <h4 class="quest__subtitle">Требования</h4>
          ${checking}
        </div>`
    }
    template += `
          </div>
          </li>`;


    return template;
  }

  questInPlaneComplite() {
    let quest = this.quest;

    return `<li class="quest__item" data-id = "${quest.index}">
        <button class="quest__accordion" >
                  <h3 class="quest__title" >${quest.name}</h3>
                </button>
          </li>`

  }
}