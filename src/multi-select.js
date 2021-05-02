/*!
 * IconicMultiSelect v0.4.0
 * Licence:  MIT
 * (c) 2021 Sidney Wimart.
 */

/**
 * @version IconicMultiSelect v0.4.0
 * @licence  MIT
 */
class IconicMultiSelect {
  customCss;
  data;
  domElements = {};
  event = () => {};
  noData;
  noResults;
  options = [];
  placeholder;
  prefix = "iconic" + Math.floor(1000 + Math.random() * 9000) + "-";
  selectContainer;
  selectedOptions = [];
  textField;
  valueField;

  /**
   * Iconic Multiselect constructor.
   * @param { boolean } customCss - Determines if the component should inject its own css.
   * @param { Object[] } data - Array of objects.
   * @param { string } noData - Defines the message when there is no data input.
   * @param { string } noResults - Defines the message when there is no result if options are filtered.
   * @param { string } placeholder -  Defines the placeholder's text.
   * @param { string } select - DOM element to be selected. It must be a HTML Select tag - https://developer.mozilla.org/en-US/docs/Web/HTML/Element/select
   * @param { string } textField - Field to select in the object for the text.
   * @param { string } valueField - Field to select in the object for the value.
   */
  constructor({ customCss, data, noData, noResults, placeholder, select, textField, valueField }) {
    this.customCss = customCss;
    this.data = data ?? [];
    this.noData = noData ?? "No data found.";
    this.noResults = noResults ?? "No results found.";
    this.placeholder = placeholder ?? "Select...";
    this.selectContainer = document.querySelector(select);
    this.textField = textField ?? null;
    this.valueField = valueField ?? null;
  }

  /**
   * Initialize the Iconic Multiselect component.
   * @public
   */
  init() {
    if (this.selectContainer && this.selectContainer.nodeName === "SELECT") {
      this.options = this._getDataFromSettings() || this._getDataFromSelectTag();

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

  /**
   * Add an option to the selection list.
   * @param { Object: { text: string; value: string; }} option
   * @private
   */
  _addOptionToList(option) {
    const html = `<span class="${this.prefix + "multiselect__selected"}" data-value="${option.value}">${
      option.text
    }<span class="${this.prefix + "multiselect__remove-btn"}">&#10006;</span></span>`;

    this.domElements.input.insertAdjacentHTML("beforebegin", html);

    const { firstElementChild: removeBtn } = document.querySelector(`span[data-value="${option.value}"]`);
    removeBtn.addEventListener("click", () => {
      const target = Array.from(this.domElements.options).find((el) => el.dataset.value == option.value);
      this._handleOption(target);
    });
  }

  /**
   * Clears all selected options.
   * @private
   */
  _clearSelection() {
    this.selectedOptions.forEach((el) => {
      const targetLastSelectedOption = Array.from(this.domElements.options).find((t) => t.dataset.value == el.value);
      this._handleOption(targetLastSelectedOption, false);
    });

    this._dispatchEvent({
      action: "CLEAR_ALL_OPTIONS",
      selection: this.selectedOptions,
    });
  }

  /**
   * Close the options container.
   * @private
   */
  _closeList() {
    this.domElements.input.value = "";
    this.domElements.optionsContainer.style.display = "none";
    this._filterOptions("");
    this._removeAllArrowSelected();
  }

  /**
   * Dispatches new events.
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
        this._closeList();
      });
    });

    this.domElements.input.addEventListener("focus", () => {
      this.domElements.optionsContainer.style.display = "block";
      this.domElements.input.placeholder = "";
    });

    this.domElements.input.addEventListener("input", ({ target: { value } }) => {
      this._filterOptions(value);
    });

    this.domElements.input.addEventListener("keydown", (e) => {
      this._handleArrows(e);
      this._handleBackspace(e);
      this._handleEnter(e);
    });
  }

  /**
   * Filters user input.
   * @param { string } value
   * @private
   */
  _filterOptions(value) {
    const isOpen = this.domElements.optionsContainer.style.display === "block";

    if (!isOpen && value.length > 0) {
      this.domElements.optionsContainer.style.display = "block";
    }

    const valueLowerCase = value.toLowerCase();

    this.domElements.options.forEach((el) => {
      if (el.textContent.toLowerCase().startsWith(valueLowerCase)) {
        this.domElements.optionsContainerList.append(el);
      } else {
        el.remove();
      }
    });

    const hasResults = Array.from(this.domElements.options).some((el) =>
      el.textContent.toLowerCase().startsWith(valueLowerCase)
    );
    this._showNoResults(!hasResults);
  }

  /**
   * Gets data from select tag.
   * @private
   */
  _getDataFromSelectTag() {
    return Array.from(this.selectContainer.options).map((option) => ({
      text: option.text,
      value: option.value,
    }));
  }

  /**
   * Gets data from settings.
   * @private
   */
  _getDataFromSettings() {
    if (this.data.length > 0 && this.valueField && this.textField) {
      const isValueFieldValid = typeof this.valueField === "string";
      const isTextFieldValid = typeof this.textField === "string";

      if (!isValueFieldValid || !isTextFieldValid) {
        throw new Error("textField and valueField must be of type string");
      }

      return this.data.map((item) => ({
        value: item[this.valueField],
        text: item[this.textField],
      }));
    } else {
      return null;
    }
  }

  /**
   * Handles Arrow up & Down. Selection of an option is also possible with these keys.
   * @param { Event } event
   * @private
   */
  _handleArrows(event) {
    if (event.keyCode === 40 || event.keyCode === 38) {
      const isOpen = this.domElements.optionsContainer.style.display === "block";
      // An updated view of the container is needed because of the filtering option
      const optionsContainerList = document.querySelector(`.${this.prefix + "multiselect__options > ul"}`);

      if (!isOpen) {
        this.domElements.optionsContainer.style.display = "block";
        optionsContainerList.firstElementChild.classList.add("arrow-selected");
        optionsContainerList.firstElementChild.scrollIntoView();
      } else {
        let selected = document.querySelector(`.${this.prefix}multiselect__options ul li.arrow-selected`);
        const scrollIntoViewOption = { block: "nearest", inline: "nearest" };
        const action = { ArrowUp: "previous", Up: "previous", ArrowDown: "next", Down: "next" };

        if (!selected) {
          optionsContainerList.firstElementChild.classList.add("arrow-selected");
          optionsContainerList.firstElementChild.scrollIntoView();
          return;
        }

        selected.classList.remove("arrow-selected");

        selected = selected[action[event.key] + "ElementSibling"];

        // Go to start or end of the popup list
        if (!selected) {
          selected =
            optionsContainerList.children[action[event.key] === "next" ? 0 : optionsContainerList.children.length - 1];
          selected.classList.add("arrow-selected");
          selected.scrollIntoView(scrollIntoViewOption);
          return;
        }

        selected.classList.add("arrow-selected");
        selected.scrollIntoView(scrollIntoViewOption);
      }
    }
  }

  /**
   * Handles the backspace key event - Deletes the preceding option in the selection list.
   * @param { Event } e
   * @private
   */
  _handleBackspace(e) {
    if (e.keyCode === 8 && e.target.value === "") {
      const lastSelectedOption =
        this.selectedOptions.length > 0 ? this.selectedOptions[this.selectedOptions.length - 1] : null;

      if (lastSelectedOption) {
        const targetLastSelectedOption = document.querySelector(`li[data-value="${lastSelectedOption.value}"]`);
        this._handleOption(targetLastSelectedOption);

        if (this.selectedOptions.length === 0) {
          this.domElements.optionsContainer.style.display = "none";
        }
      }
    }
  }

  /**
   * Handles the enter key event.
   * @param { Event } event
   * @private
   */
  _handleEnter(event) {
    if (event.keyCode === 13) {
      const selected = document.querySelector(`.${this.prefix}multiselect__options ul li.arrow-selected`);
      if (selected) {
        this._handleOption(selected);
        this._closeList();
      }
    }
  }

  /**
   * Shows clear selection button if some options are selected.
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
    if (this.selectedOptions.some((el) => el.value == target.dataset.value)) {
      target.classList.remove(`${this.prefix}multiselect__options--selected`);
      this.selectedOptions = this.selectedOptions.filter((el) => el.value != target.dataset.value);
      this._removeOptionFromList(target.dataset.value);

      dispatchEvent &&
        this._dispatchEvent({
          action: "REMOVE_OPTION",
          value: target.dataset.value,
          selection: this.selectedOptions,
        });
    } else {
      const option = this.options.find((el) => el.value == target.dataset.value);
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

  /**
   * Shows the placeholder if no options are selected.
   * @private
   */
  _handlePlaceholder() {
    if (this.selectedOptions.length > 0) {
      this.domElements.input.placeholder = "";
    } else {
      this.domElements.input.placeholder = this.placeholder;
    }
  }

  _removeAllArrowSelected() {
    const className = "arrow-selected";
    this.domElements.options.forEach((el) => {
      if (el.classList.contains(className)) {
        el.classList.remove(className);
      }
    });
  }

  /**
   * Removes an option from the list.
   * @param { string } value
   * @private
   */
  _removeOptionFromList(value) {
    const optionDom = document.querySelector(`span[data-value="${value}"]`);
    optionDom.remove();
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
              <li data-value="${option.value}">${option.text}</li>
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

  /**
   * Shows a no data message.
   * @param { boolean } condition
   * @private
   */
  _showNoData(condition) {
    return condition ? `<p class="${this.prefix}multiselect__options--no-data">${this.noData}</p>` : "";
  }

  /**
   * Shows a no results message.
   * @param { boolean } condition
   * @private
   */
  _showNoResults(condition) {
    const dom = document.querySelector(`.${this.prefix}multiselect__options--no-results`);
    if (condition) {
      const html = `<p class="${this.prefix}multiselect__options--no-results">${this.noResults}</p>`;
      !dom && this.domElements.optionsContainerList.insertAdjacentHTML("beforeend", html);
    } else {
      dom && dom.remove();
    }
  }

  /**
   * Injects required CSS class properties in the <head></head>, if customCss param is not true.
   * @private
   */
  _injectCss() {
    const css = `
      <style>
        .${this.prefix}multiselect__container {
          -webkit-box-align: center;
          -ms-flex-align: center;
              align-items: center;
          background-color: #fff;
          border-radius: 2px;
          -webkit-box-shadow: 0 1px 3px 0 #d1d1d2, 0 0 0 1px #d1d1d2;
                  box-shadow: 0 1px 3px 0 #d1d1d2, 0 0 0 1px #d1d1d2;
          -webkit-box-sizing: border-box;
                  box-sizing: border-box;
          display: -webkit-box;
          display: -ms-flexbox;
          display: flex;
          font-family: Arial,Helvetica,sans-serif;
          min-height: 36px;
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
          display: -webkit-box;
          display: -ms-flexbox;
          display: flex;
          -ms-flex-wrap: wrap;
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
          -webkit-box-shadow: 0 1px 3px 0 #d1d1d2, 0 0 0 1px #d1d1d2;
          box-shadow: 0 1px 3px 0 #d1d1d2, 0 0 0 1px #d1d1d2;
          left: -1px;
          position: absolute;
          top: calc(100% + 3px);
          width: 100%;
        }

        .${this.prefix}multiselect__options ul {
          list-style: none;
          margin: 0;
          padding: 2px 0;
          max-height: 120px;
          overflow: auto;
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

        .${this.prefix}multiselect__options ul li.arrow-selected {
          border: 2px solid rgba(101, 101, 101, 0.5);
        }

        .${this.prefix}multiselect__selected {
          background-color: #656565;
          border-radius: 2px;
          color: #fff;
          margin-bottom: 4px;
          margin-right: 4px;
          padding: 4px 8px;
          display: -webkit-box;
          display: -ms-flexbox;
          display: flex;
          -webkit-box-align: center;
              -ms-flex-align: center;
                  align-items: center;
        }

        .${this.prefix}multiselect__selected .${this.prefix}multiselect__remove-btn {
          cursor: pointer;
          margin-left: 6px;
        }

        .${this.prefix}multiselect__input {
          border: none;
          -ms-flex-preferred-size: 40px;
              flex-basis: 40px;
          -webkit-box-flex: 1;
              -ms-flex-positive: 1;
                  flex-grow: 1;
          height: 24px;        
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
