/*!
 * IconicMultiSelect v0.6.0
 * Licence:  MIT
 * (c) 2021 Sidney Wimart.
 */

/**
 * @version IconicMultiSelect v0.6.0
 * @licence  MIT
 */

class IconicMultiSelect {
  #data;
  #domElements;
  #event = () => {};
  #itemTemplate;
  #multiselect;
  #noData;
  #noResults;
  #options = [];
  #placeholder;
  #selectContainer;
  #selectedOptions = [];
  #tagTemplate;
  #textField;
  #valueField;

  #cross = `
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M6.2253 4.81108C5.83477 4.42056 5.20161 4.42056 4.81108 4.81108C4.42056 5.20161 4.42056 5.83477 4.81108 6.2253L10.5858 12L4.81114 17.7747C4.42062 18.1652 4.42062 18.7984 4.81114 19.1889C5.20167 19.5794 5.83483 19.5794 6.22535 19.1889L12 13.4142L17.7747 19.1889C18.1652 19.5794 18.7984 19.5794 19.1889 19.1889C19.5794 18.7984 19.5794 18.1652 19.1889 17.7747L13.4142 12L19.189 6.2253C19.5795 5.83477 19.5795 5.20161 19.189 4.81108C18.7985 4.42056 18.1653 4.42056 17.7748 4.81108L12 10.5858L6.2253 4.81108Z"
        fill="currentColor"
      />
    </svg>
    `;

  /**
   * Iconic Multiselect constructor.
   * @param { Object[] } data - Array of objects.
   * @param { string } noData - Defines the message when there is no data input.
   * @param { string } noResults - Defines the message when there is no result if options are filtered.
   * @param { string } placeholder -  Defines the placeholder's text.
   * @param { string } select - DOM element to be selected. It must be a HTML Select tag - https://developer.mozilla.org/en-US/docs/Web/HTML/Element/select
   * @param { string } textField - Field to select in the object for the text.
   * @param { string } valueField - Field to select in the object for the value.
   */
  constructor({ data, itemTemplate, noData, noResults, placeholder, select, tagTemplate, textField, valueField }) {
    this.#data = data ?? [];
    this.#itemTemplate = itemTemplate ?? null;
    this.#noData = noData ?? "No data found.";
    this.#noResults = noResults ?? "No results found.";
    this.#placeholder = placeholder ?? "Select...";
    this.#selectContainer = document.querySelector(select);
    this.#tagTemplate = tagTemplate ?? null;
    this.#textField = textField ?? null;
    this.#valueField = valueField ?? null;
  }

  /**
   * Initialize the Iconic Multiselect component.
   * @public
   */
  init() {
    if (this.#selectContainer && this.#selectContainer.nodeName === "SELECT") {
      if (this.#itemTemplate && this.#data.length === 0)
        throw new Error("itemTemplate must be initialized with data from the component settings");

      this.#options = this.#data.length > 0 ? this.#getDataFromSettings() : this.#getDataFromSelectTag();

      this.#renderMultiselect();
      this.#renderOptionsList();

      this.#domElements = {
        clear: this.#multiselect.querySelector(`.multiselect__clear-btn`),
        input: this.#multiselect.querySelector(`.multiselect__input`),
        optionsContainer: this.#multiselect.querySelector(`.multiselect__options`),
        optionsContainerList: this.#multiselect.querySelector(`.multiselect__options > ul`),
        options: {
          list: this.#multiselect.querySelectorAll(`.multiselect__options > ul > li`),
          find: function (callbackFn) {
            for (let i = 0; i < this.list.length; i++) {
              const node = this.list[i];
              if (callbackFn(node)) return node;
            }
            return undefined;
          },
          some: function (callbackFn) {
            for (let i = 0; i < this.list.length; i++) {
              const node = this.list[i];
              if (callbackFn(node, i)) return true;
            }
            return false;
          },
        },
      };

      this.#enableEventListenners();
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
      this.#event = callback;
    } else {
      throw new Error(`parameter in the subscribe method is not a function`);
    }
  }

  /**
   * Add an option to the selection list.
   * @param { Object: { text: string; value: string; }} option
   * @private
   */
  #addOptionToList(option, index) {
    const html = `<span class="multiselect__selected" data-value="${option.value}">${
      this.#tagTemplate ? this.#processTemplate(this.#tagTemplate, index) : option.text
    }<span class="multiselect__remove-btn">${this.#cross}</span></span>`;

    this.#domElements.input.insertAdjacentHTML("beforebegin", html);

    const { lastElementChild: removeBtn } = this.#multiselect.querySelector(`span[data-value="${option.value}"]`);
    removeBtn.addEventListener("click", () => {
      const target = this.#domElements.options.find((el) => el.dataset.value == option.value);
      this.#handleOption(target);
    });
  }

  /**
   * Clears all selected options.
   * @private
   */
  #clearSelection() {
    for (let i = 0; i < this.#selectedOptions.length; i++) {
      const option = this.#selectedOptions[i];
      const target = this.#domElements.options.find((el) => el.dataset.value == option.value);
      target.classList.remove(`multiselect__options--selected`);
      this.#removeOptionFromList(target.dataset.value);
    }
    this.#selectedOptions = [];
    this.#handleClearSelectionBtn();
    this.#handlePlaceholder();
    this.#dispatchEvent({
      action: "CLEAR_ALL_OPTIONS",
      selection: this.#selectedOptions,
    });
  }

  /**
   * Close the options container.
   * @private
   */
  #closeList() {
    this.#domElements.input.value = "";
    this.#domElements.optionsContainer.classList.remove("visible");
    this.#filterOptions("");
    this.#removeAllArrowSelected();
  }

  /**
   * Dispatches new events.
   * @param { object : { action: string; selection: { option: string; text: string; }[]; value?: string; } } event
   * @private
   */
  #dispatchEvent(event) {
    this.#event(event);
  }

  /**
   * Enables all main event listenners.
   * @private
   */
  #enableEventListenners() {
    document.addEventListener("mouseup", ({ target }) => {
      if (!this.#multiselect.contains(target)) {
        this.#filterOptions("");
        this.#closeList();
        this.#handlePlaceholder();
      }
    });

    this.#domElements.clear.addEventListener("click", () => {
      this.#clearSelection();
    });

    for (let i = 0; i < this.#domElements.options.list.length; i++) {
      const option = this.#domElements.options.list[i];
      option.addEventListener("click", ({ target }) => {
        this.#handleOption(target);
        this.#closeList();
      });
    }

    this.#domElements.input.addEventListener("focus", () => {
      this.#domElements.optionsContainer.classList.add("visible");
      this.#domElements.input.placeholder = "";
    });

    this.#domElements.input.addEventListener("input", ({ target: { value } }) => {
      if (this.#domElements.options.list.length > 0) {
        this.#filterOptions(value);
      }
    });

    this.#domElements.input.addEventListener("keydown", (e) => {
      this.#handleArrows(e);
      this.#handleBackspace(e);
      this.#handleEnter(e);
    });
  }

  /**
   * Filters user input.
   * @param { string } value
   * @private
   */
  #filterOptions(value) {
    const isOpen = this.#domElements.optionsContainer.classList.contains("visible");
    const valueLowerCase = value.toLowerCase();

    if (!isOpen && value.length > 0) {
      this.#domElements.optionsContainer.classList.add("visible");
    }

    if (this.#domElements.options.list.length > 0) {
      for (let i = 0; i < this.#domElements.options.list.length; i++) {
        const el = this.#domElements.options.list[i];
        const text = this.#itemTemplate ? this.#data[i][this.#textField] : el.textContent;

        if (text.toLowerCase().substring(0, valueLowerCase.length) === valueLowerCase) {
          this.#domElements.optionsContainerList.appendChild(el);
        } else {
          el.parentNode && el.parentNode.removeChild(el);
        }
      }

      const hasResults = this.#domElements.options.some(
        (el, index) =>
          (this.#itemTemplate ? this.#data[index][this.#textField] : el.textContent)
            .toLowerCase()
            .substring(0, valueLowerCase.length) === valueLowerCase
      );
      this.#showNoResults(!hasResults);
    }
  }

  #generateId(length) {
    let result = "";
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }

  /**
   * Gets data from select tag.
   * @private
   */
  #getDataFromSelectTag() {
    const arr = [];
    const { options } = this.#selectContainer;
    for (let i = 0; i < options.length; i++) {
      arr.push({
        text: options[i].text,
        value: options[i].value,
      });
    }
    return arr;
  }

  /**
   * Gets data from settings.
   * @private
   */
  #getDataFromSettings() {
    if (this.#data.length > 0 && this.#valueField && this.#textField) {
      const isValueFieldValid = typeof this.#valueField === "string";
      const isTextFieldValid = typeof this.#textField === "string";
      const arr = [];

      if (!isValueFieldValid || !isTextFieldValid) {
        throw new Error("textField and valueField must be of type string");
      }

      for (let i = 0; i < this.#data.length; i++) {
        const item = this.#data[i];
        arr.push({
          value: item[this.#valueField],
          text: item[this.#textField],
        });
      }
      return arr;
    } else {
      return null;
    }
  }

  /**
   * Handles Arrow up & Down. Selection of an option is also possible with these keys.
   * @param { Event } event
   * @private
   */
  #handleArrows(event) {
    if (event.keyCode === 40 || event.keyCode === 38) {
      event.preventDefault()
      const isOpen = this.#domElements.optionsContainer.classList.contains("visible");
      // An updated view of the container is needed because of the filtering option
      const optionsContainerList = this.#multiselect.querySelector(`.multiselect__options > ul`);

      if (!isOpen) {
        this.#domElements.optionsContainer.classList.add("visible");
        optionsContainerList.firstElementChild.classList.add("arrow-selected");
        optionsContainerList.firstElementChild.scrollIntoView(false);
      } else {
        let selected = this.#multiselect.querySelector(`.multiselect__options ul li.arrow-selected`);
        const action = {
          ArrowUp: "previous",
          Up: "previous",
          ArrowDown: "next",
          Down: "next",
        };

        if (!selected) {
          optionsContainerList.firstElementChild.classList.add("arrow-selected");
          optionsContainerList.firstElementChild.scrollIntoView(false);
          return;
        }

        selected.classList.remove("arrow-selected");

        selected = selected[action[event.key] + "ElementSibling"];

        // Go to start or end of the popup list
        if (!selected) {
          selected =
            optionsContainerList.children[action[event.key] === "next" ? 0 : optionsContainerList.children.length - 1];
          selected.classList.add("arrow-selected");
          this.#scrollIntoView(optionsContainerList, selected);
          return;
        }

        selected.classList.add("arrow-selected");
        this.#scrollIntoView(optionsContainerList, selected);
      }
    }
  }

  /**
   * Handles the backspace key event - Deletes the preceding option in the selection list.
   * @param { Event } e
   * @private
   */
  #handleBackspace(e) {
    if (e.keyCode === 8 && e.target.value === "") {
      const lastSelectedOption =
        this.#selectedOptions.length > 0 ? this.#selectedOptions[this.#selectedOptions.length - 1] : null;

      if (lastSelectedOption) {
        const targetLastSelectedOption = this.#multiselect.querySelector(
          `li[data-value="${lastSelectedOption.value}"]`
        );
        this.#handleOption(targetLastSelectedOption);

        if (this.#selectedOptions.length === 0) {
          this.#domElements.optionsContainer.classList.remove("visible");
        }
      }
    }
  }

  /**
   * Shows clear selection button if some options are selected.
   * @private
   */
  #handleClearSelectionBtn() {
    if (this.#selectedOptions.length > 0) {
      this.#domElements.clear.style.display = "flex";
    } else {
      this.#domElements.clear.style.display = "none";
    }
  }

  /**
   * Handles the enter key event.
   * @param { Event } event
   * @private
   */
  #handleEnter(event) {
    if (event.keyCode === 13) {
      const selected = this.#multiselect.querySelector(`.multiselect__options ul li.arrow-selected`);
      if (selected) {
        this.#handleOption(selected);
        this.#closeList();
      }
    }
  }

  #handleOption(target, dispatchEvent = true) {
    // Remove
    for (let i = 0; i < this.#selectedOptions.length; i++) {
      const el = this.#selectedOptions[i];
      if (el.value == target.dataset.value) {
        target.classList.remove(`multiselect__options--selected`);
        this.#selectedOptions.splice(i, 1);
        this.#removeOptionFromList(target.dataset.value);
        this.#handleClearSelectionBtn();
        this.#handlePlaceholder();

        return (
          dispatchEvent &&
          this.#dispatchEvent({
            action: "REMOVE_OPTION",
            value: target.dataset.value,
            selection: this.#selectedOptions,
          })
        );
      }
    }

    // Add
    for (let i = 0; i < this.#options.length; i++) {
      const option = this.#options[i];
      if (option.value == target.dataset.value) {
        target.classList.add(`multiselect__options--selected`);
        this.#selectedOptions = [...this.#selectedOptions, option];
        this.#addOptionToList(option, i);
        this.#handleClearSelectionBtn();
        this.#handlePlaceholder();

        return (
          dispatchEvent &&
          this.#dispatchEvent({
            action: "ADD_OPTION",
            value: target.dataset.value,
            selection: this.#selectedOptions,
          })
        );
      }
    }
  }

  /**
   * Shows the placeholder if no options are selected.
   * @private
   */
  #handlePlaceholder() {
    if (this.#selectedOptions.length > 0) {
      this.#domElements.input.placeholder = "";
    } else {
      this.#domElements.input.placeholder = this.#placeholder;
    }
  }

  /**
   * Process the custom template.
   * @param { string } template
   * @private
   */
  #processTemplate(template, index) {
    let processedTemplate = template;
    const objAttr = template.match(/\$\{(\w+)\}/g).map((e) => e.replace(/\$\{|\}/g, ""));

    for (let i = 0; i < objAttr.length; i++) {
      const attr = objAttr[i];
      processedTemplate = processedTemplate.replace(`\$\{${attr}\}`, this.#data[index][attr] ?? "");
    }

    return processedTemplate;
  }

  #removeAllArrowSelected() {
    const className = "arrow-selected";
    const target = this.#domElements.options.find((el) => el.classList.contains(className));
    target && target.classList.remove(className);
  }

  /**
   * Removes an option from the list.
   * @param { string } value
   * @private
   */
  #removeOptionFromList(value) {
    const optionDom = this.#multiselect.querySelector(`span[data-value="${value}"]`);
    optionDom && optionDom.parentNode && optionDom.parentNode.removeChild(optionDom);
  }

  /**
   * Renders the multiselect options list view.
   * @private
   */
  #renderOptionsList() {
    const html = `
        <div class="multiselect__options">
          <ul>
          ${
            this.#options.length > 0 && !this.#itemTemplate
              ? this.#options
                  .map((option) => {
                    return `
              <li data-value="${option.value}">${option.text}</li>
            `;
                  })
                  .join("")
              : ""
          }

          ${
            this.#options.length > 0 && this.#itemTemplate
              ? this.#options
                  .map((option, index) => {
                    return `
              <li data-value="${option.value}">${this.#processTemplate(this.#itemTemplate, index)}</li>
            `;
                  })
                  .join("")
              : ""
          }
          ${this.#showNoData(this.#options.length === 0)}
          </ul>
        </div>
      `;

    this.#multiselect.insertAdjacentHTML("beforeend", html);
  }

  /**
   * Renders the multiselect view.
   * @private
   */
  #renderMultiselect() {
    this.#selectContainer.style.display = "none";
    const id = "iconic-" + this.#generateId(20);
    const html = `
      <div id="${id}" class="multiselect__container">
        <div class="multiselect__wrapper">
          <input class="multiselect__input" placeholder="${this.#placeholder}" />
        </div>
        <span style="display: none;" class="multiselect__clear-btn">${this.#cross}</span>
      </div>
    `;

    this.#selectContainer.insertAdjacentHTML("afterend", html);
    this.#multiselect = document.querySelector(`#${id}`);
  }

  /**
   * ScrollIntoView - This small utility reproduces the behavior of .scrollIntoView({ block: "nearest", inline: "nearest" })
   * This is for IE compatibility without a need of a polyfill
   * @private
   */
  #scrollIntoView(parent, child) {
    const rectParent = parent.getBoundingClientRect();
    const rectChild = child.getBoundingClientRect();

    // Detect if not visible at top and then scroll to the top
    if (!(rectParent.top < rectChild.bottom - child.offsetHeight)) {
      parent.scrollTop = child.clientHeight + (child.offsetTop - child.offsetHeight);
    }

    // Detect if not visible at bottom and then scroll to the bottom
    if (!(rectParent.bottom > rectChild.top + child.offsetHeight)) {
      parent.scrollTop =
        child.clientHeight +
        (child.offsetTop - child.offsetHeight) -
        (parent.offsetHeight - (child.offsetHeight + (child.offsetHeight - child.clientHeight)));
    }
  }

  /**
   * Shows a no data message.
   * @param { boolean } condition
   * @private
   */
  #showNoData(condition) {
    return condition ? `<p class="multiselect__options--no-data">${this.#noData}</p>` : "";
  }

  /**
   * Shows a no results message.
   * @param { boolean } condition
   * @private
   */
  #showNoResults(condition) {
    const dom = this.#multiselect.querySelector(`.multiselect__options--no-results`);
    if (condition) {
      const html = `<p class="multiselect__options--no-results">${this.#noResults}</p>`;
      !dom && this.#domElements.optionsContainerList.insertAdjacentHTML("beforeend", html);
    } else {
      dom && dom.parentNode && dom.parentNode.removeChild(dom);
    }
  }
}
