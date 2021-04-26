/*!
 * IconicMultiSelect v0.1.0
 * Licence:  MIT
 * (c) 2021 Sidney Wimart.
 */

// Add the forEach method to the NodeList interface if not included (for IE11 compatibility)
if (window.NodeList && !NodeList.prototype.forEach) {
  NodeList.prototype.forEach = Array.prototype.forEach;
}

/**
 * @version IconicMultiSelect v0.1.0
 * @licence  MIT
 */
class IconicMultiSelect {
  prefix = "iconic" + Math.floor(1000 + Math.random() * 9000) + "-";

  customCss;

  selectContainer;
  placeholder;

  noData;
  noResults;

  options = [];
  selectedOptions = [];

  domElements = {};

  event = () => {};

  /**
   * Iconic Multiselect constructor.
   * @param { string } select - DOM element to be selected. It must be a HTML Select tag.
   * @see - https://developer.mozilla.org/en-US/docs/Web/HTML/Element/select
   * @param { string } placeholder -  Defines the placeholder's text.
   * @param { boolean } customCss - Determines if the component should inject its own css.
   * @param { string } noData - Defines the message when there is no data input.
   * @param { string } noResults - Defines the message when there is no result if options are filtered.
   */
  constructor({ select, placeholder, customCss, noData, noResults }) {
    this.selectContainer = document.querySelector(select);
    this.customCss = customCss;

    this.placeholder = placeholder ?? "Select...";
    this.noData = noData ?? "No data found.";
    this.noResults = noResults ?? "No results found.";
  }

  /**
   * Initialize the Iconic Multiselect component.
   * @public
   */
  init() {
    if (this.selectContainer && this.selectContainer.nodeName === "SELECT") {
      this.options = Array.from(this.selectContainer.options).map((option) => ({
        text: option.text,
        value: option.value,
      }));

      this._injectCss();
      this._renderMultiselect();
      this._renderOptionsList();

      this.domElements = {
        clear: document.querySelector(`.${this.prefix + "multiselect__clear-btn"}`),
        input: document.querySelector(`.${this.prefix + "multiselect__input"}`),
        optionsContainer: document.querySelector(`.${this.prefix + "multiselect__options"}`),
        optionsContainerList: document.querySelector(`.${this.prefix + "multiselect__options > ul"}`),
        options: document.querySelectorAll(`.${this.prefix + "multiselect__options"} > ul > li`),
      };

      this._enableEventListenners();
    } else {
      throw new Error(`The selector '${element}' did not select any valid select tag.`);
    }
  }

  /**
   * Subscribes to the emitted events.
   * @param { Function } callback - Callback function which emits a custom event object.
   * @public
   */
  subscribe(callback) {
    if (typeof callback === "function") {
      this.event = callback;
    } else {
      throw new Error(`parameter in the subscribe method is not a function`);
    }
  }

  _addOptionToList(option) {
    const html = `<span class="${this.prefix + "multiselect__selected"}" data-value="${option.value}">${
      option.text
    }<span class="${this.prefix + "multiselect__remove-btn"}">&#10006;</span></span>`;

    this.domElements.input.insertAdjacentHTML("beforebegin", html);

    const { firstElementChild: removeBtn } = document.querySelector(`span[data-value="${option.value}"]`);
    removeBtn.addEventListener("click", () => {
      const target = document.querySelector(`li[data-value="${option.value}"]`);
      this._handleOption(target);
    });
  }

  /**
   * Clears all selected options.
   * @private
   */
  _clearSelection() {
    this.selectedOptions.forEach((el) => {
      const targetLastSelectedOption = document.querySelector(`li[data-value="${el.value}"]`);
      this._handleOption(targetLastSelectedOption, false);
    });

    this._dispatchEvent({
      action: "CLEAR_ALL_OPTIONS",
      selection: this.selectedOptions,
    });
  }

  /**
   * Dispatches new events
   * @param { object : { action: string; selection: { option: string; text: string; }[]; value?: string; } } event
   * @private
   */
  _dispatchEvent(event) {
    this.event(event);
  }

  /**
   * Enables all main event listenners.
   * @private
   */
  _enableEventListenners() {
    this.domElements.clear.addEventListener("click", () => {
      this._clearSelection();
    });

    this.domElements.options.forEach((option) => {
      option.addEventListener("click", ({ target }) => {
        this._handleOption(target);
        this.domElements.input.value = "";
        this.domElements.optionsContainer.style.display = "none";
        this._filterOptions("");
      });
    });

    this.domElements.input.addEventListener("focus", () => {
      this.domElements.optionsContainer.style.display = "block";
    });

    this.domElements.input.addEventListener("input", ({ target: { value } }) => {
      this._filterOptions(value);
    });

    this.domElements.input.addEventListener("keydown", (e) => {
      this._handleBackspace(e);
    });
  }

  /**
   * Filters user input
   * @param { string } value
   * @private
   */
  _filterOptions(value) {
    const valueLowerCase = value.toLowerCase();
    this.domElements.options.forEach((el) => {
      if (el.dataset.value.toLowerCase().startsWith(valueLowerCase)) {
        el.style.display = "block";
      } else {
        el.style.display = "none";
      }
    });

    const hasResults = Array.from(this.domElements.options).some((el) =>
      el.dataset.value.toLowerCase().startsWith(valueLowerCase)
    );
    this._showNoResults(!hasResults);
  }

  _handleBackspace(e) {
    if (e.keyCode === 8 && e.target.value === "") {
      const lastSelectedOption =
        this.selectedOptions.length > 0 ? this.selectedOptions[this.selectedOptions.length - 1] : null;

      if (lastSelectedOption) {
        const targetLastSelectedOption = document.querySelector(`li[data-value="${lastSelectedOption.value}"]`);
        this._handleOption(targetLastSelectedOption);
      }
    }
  }

  /**
   * Shows clear selection button if some options are selected
   * @private
   */
  _handleClearSelectionBtn() {
    if (this.selectedOptions.length > 0) {
      this.domElements.clear.style.display = "block";
    } else {
      this.domElements.clear.style.display = "none";
    }
  }

  _handleOption(target, dispatchEvent = true) {
    if (this.selectedOptions.some((el) => el.value === target.dataset.value)) {
      target.classList.remove(`${this.prefix}multiselect__options--selected`);
      this.selectedOptions = this.selectedOptions.filter((el) => el.value !== target.dataset.value);
      this._removeOptionFromList(target.dataset.value);

      dispatchEvent &&
        this._dispatchEvent({
          action: "REMOVE_OPTION",
          value: target.dataset.value,
          selection: this.selectedOptions,
        });
    } else {
      const option = this.options.find((el) => el.value === target.dataset.value);
      target.classList.add(`${this.prefix}multiselect__options--selected`);
      this.selectedOptions = [...this.selectedOptions, option];
      this._addOptionToList(option);

      dispatchEvent &&
        this._dispatchEvent({
          action: "ADD_OPTION",
          value: target.dataset.value,
          selection: this.selectedOptions,
        });
    }

    this._handleClearSelectionBtn();
    this._handlePlaceholder();
  }

  _handlePlaceholder() {
    if (this.selectedOptions.length > 0) {
      this.domElements.input.placeholder = "";
    } else {
      this.domElements.input.placeholder = this.placeholder;
    }
  }

  /**
   * Renders the multiselect options list view.
   * @private
   */
  _renderOptionsList() {
    const html = `
        <div style="display: none;" class="${this.prefix}multiselect__options">
          <ul>
          ${
            this.options.length > 0
              ? this.options
                  .map((option) => {
                    return `
              <li style="display: block;" data-value="${option.value}">${option.text}</li>
            `;
                  })
                  .join("")
              : ""
          }
          ${this._showNoData(this.options.length === 0)}
          </ul>
        </div>
      `;

    document.querySelector(`.${this.prefix + "multiselect__container"}`).insertAdjacentHTML("beforeend", html);
  }

  /**
   * Renders the multiselect view.
   * @private
   */
  _renderMultiselect() {
    this.selectContainer.style.display = "none";
    const html = `
      <div class="${this.prefix + "multiselect__container"}">
        <div class="${this.prefix + "multiselect__wrapper"}">
          <input class="${this.prefix + "multiselect__input"}" placeholder="${this.placeholder}" />
        </div>
        <span style="display: none;" class="${this.prefix + "multiselect__clear-btn"}">&#10006;</span>
      </div>
    `;

    this.selectContainer.insertAdjacentHTML("afterend", html);
  }

  _removeOptionFromList(value) {
    const optionDom = document.querySelector(`span[data-value="${value}"]`);
    optionDom.parentNode && optionDom.parentNode.removeChild(optionDom);
  }

  _showNoResults(condition) {
    const dom = document.querySelector(`.${this.prefix}multiselect__options--no-results`);
    if (condition) {
      const html = `<p class="${this.prefix}multiselect__options--no-results">${this.noResults}</p>`;
      !dom && this.domElements.optionsContainerList.insertAdjacentHTML("beforeend", html);
    } else {
      dom && dom.parentNode && dom.parentNode.removeChild(dom);
    }
  }

  _showNoData(condition) {
    return condition ? `<p class="${this.prefix}multiselect__options--no-data">${this.noData}</p>` : "";
  }

  _injectCss() {
    const css = `
      <style>
        .${this.prefix}multiselect__container {
          align-items: center;
          background-color: #fff;
          border-radius: 2px;
          border: 1px solid rgba(0,0,0,.08);
          box-sizing: border-box;
          display: flex;
          font-family: Arial,Helvetica,sans-serif;
          min-height: 40px;
          padding: 4px 8px 0 8px;
          position: relative;
          width: 354px;
        }

        .${this.prefix}multiselect__container:after {
          content:'';
          min-height:inherit;
          font-size:0;
        }

        .${this.prefix}multiselect__container > * {
          color: #656565;
          font-size: 14px;
        }

        .${this.prefix + "multiselect__wrapper"} {
          display: flex;
          flex-wrap: wrap;
          height: 100%;
          width: 100%;
        }

        .${this.prefix}multiselect__clear-btn {
           cursor: pointer;
           margin-bottom: 4px;
           margin-left: 4px;
        }

        .${this.prefix}multiselect__options {
          background-color: #f6f6f6;
          border-radius: 2px;
          border: 1px solid rgba(0,0,0,.08);
          left: -1px;
          max-height: 120px;
          overflow: auto;
          position: absolute;
          top: calc(100% + 2px);
          width: 100%;
        }

        .${this.prefix}multiselect__options ul {
          list-style: none;
          margin: 0;
          padding: 2px 0;
        }

        .${this.prefix}multiselect__options ul li {
          cursor: pointer;
          padding: 4px 8px;
        }

        .${this.prefix}multiselect__options ul p.${this.prefix}multiselect__options--no-results, 
        .${this.prefix}multiselect__options ul p.${this.prefix}multiselect__options--no-data {
          margin: 0;
          padding: 8px;
          text-align: center;
        }

        .${this.prefix}multiselect__options ul li.${this.prefix}multiselect__options--selected {
          background-color: #ff6358;
          color: #fff;
        }

        .${this.prefix}multiselect__options ul li.${this.prefix}multiselect__options--selected:hover {
          background-color: #eb5b51;
        }

        .${this.prefix}multiselect__options ul li:hover {
          background-color: #dedede;
        }

        .${this.prefix}multiselect__selected {
          background-color: #656565;
          border-radius: 2px;
          color: #fff;
          margin-bottom: 4px;
          margin-right: 4px;
          padding: 4px 8px;
          display: flex;
          align-items: center;
        }

        .${this.prefix}multiselect__selected .${this.prefix}multiselect__remove-btn {
          cursor: pointer;
          margin-left: 6px;
        }

        .${this.prefix}multiselect__input {
          border: none;
          flex-basis: 40px;
          flex-grow: 1;
          margin-bottom: 4px;
          min-width: 40px;
          outline: none;            
        }
      </style>
      `;

    if (!this.customCss) document.querySelector("head").insertAdjacentHTML("beforeend", css);
    if (this.customCss) this.prefix = "";
  }
}
