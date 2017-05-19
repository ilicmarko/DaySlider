'use strict';

class DateSlider {

  constructor(selector, config) {
    this.classes = {
      DAYSLIDER:    'ds',
      TITLE:        'ds__title',
      DAYSGROUP:    'ds__days',
      DAY:          'day',
      CURRENTDATE:  'day--current',
      NAV:          'ds__nav',
      ARROW:        'ds__nav__arrow'
    }

    this.config = {
      visibleItems: 7,
      showTitle: true,
      showNav: true,
      navText: ['left', 'right'],
      language: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
    }

    Object.assign(this.config, config);

    this.now = new Date();
    console.log(this.config);

    if (this.config.visibleItems % 2 == 0) {
      console.error('The number of visible items has to be a odd number');
    }

    if (document.querySelector(selector) == null) {
      console.error('Element not found');
    }

    this.element = document.querySelector(selector);
    this.element.classList.add(this.classes.DAYSLIDER);

    if (this.config.showTitle)
      this.createTitle();

    this.createDays();

    if (this.config.showNav)
      this.createNav();
  }

  createTitle() {

    this.title = document.createElement('div');
    this.title.classList.add(this.classes.TITLE);
    this.title.innerHTML = this.config.language[this.now.getMonth()] + ' - ' + this.now.getFullYear();

    this.element.appendChild(this.title);
  }

  createDays() {
    let today = this.now.getDate();
    let days = new Date(this.now.getFullYear(), this.now.getMonth() + 1, 0).getDate();
    this.currentDate = today;
    let countFrom = today - Math.floor(this.config.visibleItems / 2);

    this.daysGroup = document.createElement('div');
    this.daysGroup.classList.add(this.classes.DAYSGROUP);

    for(let i = 0; i < this.config.visibleItems; ++i) {
      let span = document.createElement('span');
      if (countFrom == today) span.classList.add(this.classes.CURRENTDATE);
      span.classList.add(this.classes.DAY);
      span.innerHTML = countFrom++;
      this.daysGroup.appendChild(span);
    }

    this.element.appendChild(this.daysGroup);

  }

  prevDay() {
    let first = this.daysGroup.firstChild;
    let span = document.createElement('span');
    span.classList.add(this.classes.DAY);
    span.innerText = Number(first.innerText) - 1;
    this.daysGroup.insertBefore(span, first);
    this.daysGroup.removeChild(this.daysGroup.lastChild);

    let midCurr = Math.ceil(this.config.visibleItems / 2);
    this.daysGroup.children[midCurr].classList.remove(this.classes.CURRENTDATE);
    this.daysGroup.children[midCurr - 1].classList.add(this.classes.CURRENTDATE);
  }

  nextDay() {
    let last = this.daysGroup.lastChild;
    let span = document.createElement('span');
    let days = new Date(this.now.getFullYear(), this.now.getMonth() + 1, 0).getDate();

    let lastDay = Number(last.innerText) + 1;
    let newDay = (lastDay > days) ? 1 : lastDay;
    span.classList.add(this.classes.DAY);
    span.innerText = newDay;
    this.daysGroup.removeChild(this.daysGroup.firstChild);
    this.daysGroup.appendChild(span);

    let midCurr = Math.floor(this.config.visibleItems / 2);
    console.log(midCurr);
    console.log(this.daysGroup.children);
    this.daysGroup.children[midCurr - 1].classList.remove(this.classes.CURRENTDATE);
    this.daysGroup.children[midCurr].classList.add(this.classes.CURRENTDATE);
  }

  createNav() {
    let div = document.createElement('div');
    div.classList.add(this.classes.NAV);

    let span = document.createElement('span');
    span.classList.add(this.classes.ARROW, this.classes.ARROW + '--left');
    span.innerHTML = this.config.navText[0];
    span.addEventListener('click', this.prevDay.bind(this));
    div.appendChild(span);

    span = document.createElement('span');
    span.classList.add(this.classes.ARROW, this.classes.ARROW + '--right');
    span.innerHTML = this.config.navText[1];
    span.addEventListener('click', this.nextDay.bind(this));
    div.appendChild(span);

    this.element.appendChild(div);

  }
}
