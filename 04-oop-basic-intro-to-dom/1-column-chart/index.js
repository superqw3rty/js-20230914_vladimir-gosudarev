export default class ColumnChart {
  chartHeight = 50;

  checkValue(props, valueName, defaultValue = null) {
    return !!props && props[valueName] ? props[valueName] : defaultValue
  }

  constructor(props) {
    this.data = this.checkValue(props, 'data', []);
    this.label = this.checkValue(props, 'label', '');
    this.value = this.checkValue(props, 'value', 0);
    this.link = this.checkValue(props, 'link', '');
    this.formatHeading = this.checkValue(props, 'formatHeading');

    this.element = this.render();
  }

  chartTitleTemplate() {
    return this.link ? `
      <div class="column-chart__title">
        Total ${this.label}
        <a href="/${this.link}" class="column-chart__link">View all</a>
      </div>
    ` : `
       <div class="column-chart__title">
        Total ${this.label}
      </div>
      `
  }

  chartHeaderElement() {
    if (this.formatHeading) {
      this.value = this.formatHeading(this.value)
    }

    return `<div data-element="header" class="column-chart__header">${this.value}</div>`;
  }

  getColumnProps() {
    const maxValue = Math.max(...this.data);
    const scale = 50 / maxValue;

    return this.data.map(item => {
      return {
        percent: (item / maxValue * 100).toFixed(0) + '%',
        value: String(Math.floor(item * scale))
      };
    });
  }

  chartGraphTemplate() {
    const chartValues = this.getColumnProps();
    return this.data.reduce((acc, item, idx) => {
      return acc += `<div style="--value: ${chartValues[idx].value}" data-tooltip="${chartValues[idx].percent}"></div> `
    }, ``)
  }

  chartDataTemplate() {
    const chartElements = this.chartGraphTemplate();

    return (`
      <div data-element="body" class="column-chart__chart">
          ${chartElements}
      </div>`
    )
  }

  containerTemplate() {
    const header = this.chartHeaderElement();
    const chart = this.chartDataTemplate();

    return `
      <div class="column-chart__container">
        ${header}
        ${chart}
      </div>`
  }

  render() {
    const component = document.createElement('div');
    component.classList.add('column-chart');
    component.style = `--chart-height: ${this.chartHeight}`;
    const title = this.chartTitleTemplate();

    if (!this.data.length) {
      component.classList.add('column-chart_loading')
    }

    const body = this.containerTemplate();

    component.innerHTML = `
      ${title}
      ${body}
    `;

    return component;
  }

  update(data) {
    if (!!data && this.element) {
      this.data = data
      this.element.querySelector('.column-chart__chart').innerHTML = this.chartGraphTemplate();
    }
  }

  remove() {
    this.element.remove();
  }

  destroy() {
    this.remove();
  }
}
