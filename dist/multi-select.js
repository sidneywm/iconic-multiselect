"use strict";

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/*!
 * IconicMultiSelect v0.3.2
 * Licence:  MIT
 * (c) 2021 Sidney Wimart.
 */

var IconicMultiSelect = function () {
  function IconicMultiSelect(_ref) {
    var customCss = _ref.customCss,
        data = _ref.data,
        noData = _ref.noData,
        noResults = _ref.noResults,
        placeholder = _ref.placeholder,
        select = _ref.select,
        textField = _ref.textField,
        valueField = _ref.valueField;

    _classCallCheck(this, IconicMultiSelect);

    _defineProperty(this, "customCss", void 0);

    _defineProperty(this, "data", void 0);

    _defineProperty(this, "domElements", {});

    _defineProperty(this, "event", function () {});

    _defineProperty(this, "noData", void 0);

    _defineProperty(this, "noResults", void 0);

    _defineProperty(this, "options", []);

    _defineProperty(this, "placeholder", void 0);

    _defineProperty(this, "prefix", "iconic" + Math.floor(1000 + Math.random() * 9000) + "-");

    _defineProperty(this, "selectContainer", void 0);

    _defineProperty(this, "selectedOptions", []);

    _defineProperty(this, "textField", void 0);

    _defineProperty(this, "valueField", void 0);

    this.customCss = customCss;
    this.data = data !== null && data !== void 0 ? data : [];
    this.noData = noData !== null && noData !== void 0 ? noData : "No data found.";
    this.noResults = noResults !== null && noResults !== void 0 ? noResults : "No results found.";
    this.placeholder = placeholder !== null && placeholder !== void 0 ? placeholder : "Select...";
    this.selectContainer = document.querySelector(select);
    this.textField = textField !== null && textField !== void 0 ? textField : null;
    this.valueField = valueField !== null && valueField !== void 0 ? valueField : null;
  }
  _createClass(IconicMultiSelect, [{
    key: "init",
    value: function init() {
      if (this.selectContainer && this.selectContainer.nodeName === "SELECT") {
        this.options = this._getDataFromSettings() || this._getDataFromSelectTag();

        this._injectCss();

        this._renderMultiselect();

        this._renderOptionsList();

        this.domElements = {
          clear: document.querySelector(".".concat(this.prefix + "multiselect__clear-btn")),
          input: document.querySelector(".".concat(this.prefix + "multiselect__input")),
          optionsContainer: document.querySelector(".".concat(this.prefix + "multiselect__options")),
          optionsContainerList: document.querySelector(".".concat(this.prefix + "multiselect__options > ul")),
          options: document.querySelectorAll(".".concat(this.prefix + "multiselect__options", " > ul > li"))
        };

        this._enableEventListenners();
      } else {
        throw new Error("The selector '".concat(element, "' did not select any valid select tag."));
      }
    }
  }, {
    key: "subscribe",
    value: function subscribe(callback) {
      if (typeof callback === "function") {
        this.event = callback;
      } else {
        throw new Error("parameter in the subscribe method is not a function");
      }
    }
  }, {
    key: "_addOptionToList",
    value: function _addOptionToList(option) {
      var _this = this;

      var html = "<span class=\"".concat(this.prefix + "multiselect__selected", "\" data-value=\"").concat(option.value, "\">").concat(option.text, "<span class=\"").concat(this.prefix + "multiselect__remove-btn", "\">&#10006;</span></span>");
      this.domElements.input.insertAdjacentHTML("beforebegin", html);

      var _document$querySelect = document.querySelector("span[data-value=\"".concat(option.value, "\"]")),
          removeBtn = _document$querySelect.firstElementChild;

      removeBtn.addEventListener("click", function () {
        var target = Array.from(_this.domElements.options).find(function (el) {
          return el.dataset.value === option.value;
        });

        _this._handleOption(target);
      });
    }
  }, {
    key: "_clearSelection",
    value: function _clearSelection() {
      var _this2 = this;

      this.selectedOptions.forEach(function (el) {
        var targetLastSelectedOption = Array.from(_this2.domElements.options).find(function (t) {
          return t.dataset.value === el.value;
        });

        _this2._handleOption(targetLastSelectedOption, false);
      });

      this._dispatchEvent({
        action: "CLEAR_ALL_OPTIONS",
        selection: this.selectedOptions
      });
    }
  }, {
    key: "_closeList",
    value: function _closeList() {
      this.domElements.input.value = "";
      this.domElements.optionsContainer.style.display = "none";

      this._filterOptions("");

      this._removeAllArrowSelected();
    }
  }, {
    key: "_dispatchEvent",
    value: function _dispatchEvent(event) {
      this.event(event);
    }
  }, {
    key: "_enableEventListenners",
    value: function _enableEventListenners() {
      var _this3 = this;

      this.domElements.clear.addEventListener("click", function () {
        _this3._clearSelection();
      });
      this.domElements.options.forEach(function (option) {
        option.addEventListener("click", function (_ref2) {
          var target = _ref2.target;

          _this3._handleOption(target);

          _this3._closeList();
        });
      });
      this.domElements.input.addEventListener("focus", function () {
        _this3.domElements.optionsContainer.style.display = "block";
      });
      this.domElements.input.addEventListener("input", function (_ref3) {
        var value = _ref3.target.value;

        _this3._filterOptions(value);
      });
      this.domElements.input.addEventListener("keydown", function (e) {
        _this3._handleArrows(e);

        _this3._handleBackspace(e);

        _this3._handleEnter(e);
      });
    }
  }, {
    key: "_filterOptions",
    value: function _filterOptions(value) {
      var _this4 = this;

      var isOpen = this.domElements.optionsContainer.style.display === "block";

      if (!isOpen && value.length > 0) {
        this.domElements.optionsContainer.style.display = "block";
      }

      var valueLowerCase = value.toLowerCase();
      this.domElements.options.forEach(function (el) {
        if (el.dataset.value.toLowerCase().startsWith(valueLowerCase)) {
          _this4.domElements.optionsContainerList.append(el);
        } else {
          el.remove();
        }
      });
      var hasResults = Array.from(this.domElements.options).some(function (el) {
        return el.dataset.value.toLowerCase().startsWith(valueLowerCase);
      });

      this._showNoResults(!hasResults);
    }
  }, {
    key: "_getDataFromSelectTag",
    value: function _getDataFromSelectTag() {
      return Array.from(this.selectContainer.options).map(function (option) {
        return {
          text: option.text,
          value: option.value
        };
      });
    }
  }, {
    key: "_getDataFromSettings",
    value: function _getDataFromSettings() {
      var _this5 = this;

      if (this.data.length > 0 && this.valueField && this.textField) {
        var isValueFieldValid = typeof this.valueField === "string";
        var isTextFieldValid = typeof this.textField === "string";

        if (!isValueFieldValid || !isTextFieldValid) {
          throw new Error("textField and valueField must be of type string");
        }

        return this.data.map(function (item) {
          return {
            value: item[_this5.valueField],
            text: item[_this5.textField]
          };
        });
      } else {
        return null;
      }
    }
  }, {
    key: "_handleArrows",
    value: function _handleArrows(event) {
      if (event.keyCode === 40 || event.keyCode === 38) {
        var isOpen = this.domElements.optionsContainer.style.display === "block"; 

        var optionsContainerList = document.querySelector(".".concat(this.prefix + "multiselect__options > ul"));

        if (!isOpen) {
          this.domElements.optionsContainer.style.display = "block";
          optionsContainerList.firstElementChild.classList.add("arrow-selected");
          optionsContainerList.firstElementChild.scrollIntoView();
        } else {
          var selected = document.querySelector(".".concat(this.prefix, "multiselect__options ul li.arrow-selected"));
          var scrollIntoViewOption = {
            block: "nearest",
            inline: "nearest"
          };
          var action = {
            ArrowUp: "previous",
            Up: "previous",
            ArrowDown: "next",
            Down: "next"
          };

          if (!selected) {
            optionsContainerList.firstElementChild.classList.add("arrow-selected");
            optionsContainerList.firstElementChild.scrollIntoView();
            return;
          }

          selected.classList.remove("arrow-selected");
          selected = selected[action[event.key] + "ElementSibling"]; 

          if (!selected) {
            selected = optionsContainerList.children[action[event.key] === "next" ? 0 : optionsContainerList.children.length - 1];
            selected.classList.add("arrow-selected");
            selected.scrollIntoView(scrollIntoViewOption);
            return;
          }

          selected.classList.add("arrow-selected");
          selected.scrollIntoView(scrollIntoViewOption);
        }
      }
    }
  }, {
    key: "_handleBackspace",
    value: function _handleBackspace(e) {
      if (e.keyCode === 8 && e.target.value === "") {
        var lastSelectedOption = this.selectedOptions.length > 0 ? this.selectedOptions[this.selectedOptions.length - 1] : null;

        if (lastSelectedOption) {
          var targetLastSelectedOption = document.querySelector("li[data-value=\"".concat(lastSelectedOption.value, "\"]"));

          this._handleOption(targetLastSelectedOption);
        }
      }
    }
  }, {
    key: "_handleEnter",
    value: function _handleEnter(event) {
      if (event.keyCode === 13) {
        var selected = document.querySelector(".".concat(this.prefix, "multiselect__options ul li.arrow-selected"));

        if (selected) {
          this._handleOption(selected);

          this._closeList();
        }
      }
    }
  }, {
    key: "_handleClearSelectionBtn",
    value: function _handleClearSelectionBtn() {
      if (this.selectedOptions.length > 0) {
        this.domElements.clear.style.display = "block";
      } else {
        this.domElements.clear.style.display = "none";
      }
    }
  }, {
    key: "_handleOption",
    value: function _handleOption(target) {
      var dispatchEvent = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

      if (this.selectedOptions.some(function (el) {
        return el.value == target.dataset.value;
      })) {
        target.classList.remove("".concat(this.prefix, "multiselect__options--selected"));
        this.selectedOptions = this.selectedOptions.filter(function (el) {
          return el.value != target.dataset.value;
        });

        this._removeOptionFromList(target.dataset.value);

        dispatchEvent && this._dispatchEvent({
          action: "REMOVE_OPTION",
          value: target.dataset.value,
          selection: this.selectedOptions
        });
      } else {
        var option = this.options.find(function (el) {
          return el.value == target.dataset.value;
        });
        target.classList.add("".concat(this.prefix, "multiselect__options--selected"));
        this.selectedOptions = [].concat(_toConsumableArray(this.selectedOptions), [option]);

        this._addOptionToList(option);

        dispatchEvent && this._dispatchEvent({
          action: "ADD_OPTION",
          value: target.dataset.value,
          selection: this.selectedOptions
        });
      }

      this._handleClearSelectionBtn();

      this._handlePlaceholder();
    }
  }, {
    key: "_handlePlaceholder",
    value: function _handlePlaceholder() {
      if (this.selectedOptions.length > 0) {
        this.domElements.input.placeholder = "";
      } else {
        this.domElements.input.placeholder = this.placeholder;
      }
    }
  }, {
    key: "_removeAllArrowSelected",
    value: function _removeAllArrowSelected() {
      var className = "arrow-selected";
      this.domElements.options.forEach(function (el) {
        if (el.classList.contains(className)) {
          el.classList.remove(className);
        }
      });
    }
  }, {
    key: "_removeOptionFromList",
    value: function _removeOptionFromList(value) {
      var optionDom = document.querySelector("span[data-value=\"".concat(value, "\"]"));
      optionDom.remove();
    }
  }, {
    key: "_renderOptionsList",
    value: function _renderOptionsList() {
      var html = "\n        <div style=\"display: none;\" class=\"".concat(this.prefix, "multiselect__options\">\n          <ul>\n          ").concat(this.options.length > 0 ? this.options.map(function (option) {
        return "\n              <li data-value=\"".concat(option.value, "\">").concat(option.text, "</li>\n            ");
      }).join("") : "", "\n          ").concat(this._showNoData(this.options.length === 0), "\n          </ul>\n        </div>\n      ");
      document.querySelector(".".concat(this.prefix + "multiselect__container")).insertAdjacentHTML("beforeend", html);
    }
  }, {
    key: "_renderMultiselect",
    value: function _renderMultiselect() {
      this.selectContainer.style.display = "none";
      var html = "\n      <div class=\"".concat(this.prefix + "multiselect__container", "\">\n        <div class=\"").concat(this.prefix + "multiselect__wrapper", "\">\n          <input class=\"").concat(this.prefix + "multiselect__input", "\" placeholder=\"").concat(this.placeholder, "\" />\n        </div>\n        <span style=\"display: none;\" class=\"").concat(this.prefix + "multiselect__clear-btn", "\">&#10006;</span>\n      </div>\n    ");
      this.selectContainer.insertAdjacentHTML("afterend", html);
    }
  }, {
    key: "_showNoData",
    value: function _showNoData(condition) {
      return condition ? "<p class=\"".concat(this.prefix, "multiselect__options--no-data\">").concat(this.noData, "</p>") : "";
    }
  }, {
    key: "_showNoResults",
    value: function _showNoResults(condition) {
      var dom = document.querySelector(".".concat(this.prefix, "multiselect__options--no-results"));

      if (condition) {
        var html = "<p class=\"".concat(this.prefix, "multiselect__options--no-results\">").concat(this.noResults, "</p>");
        !dom && this.domElements.optionsContainerList.insertAdjacentHTML("beforeend", html);
      } else {
        dom && dom.remove();
      }
    }
  }, {
    key: "_injectCss",
    value: function _injectCss() {
      var css = "\n      <style>\n        .".concat(this.prefix, "multiselect__container {\n          align-items: center;\n          background-color: #fff;\n          border-radius: 2px;\n          border: 1px solid rgba(0,0,0,.08);\n          box-sizing: border-box;\n          display: flex;\n          font-family: Arial,Helvetica,sans-serif;\n          min-height: 40px;\n          padding: 4px 8px 0 8px;\n          position: relative;\n          width: 354px;\n        }\n\n        .").concat(this.prefix, "multiselect__container:after {\n          content:'';\n          min-height:inherit;\n          font-size:0;\n        }\n\n        .").concat(this.prefix, "multiselect__container > * {\n          color: #656565;\n          font-size: 14px;\n        }\n\n        .").concat(this.prefix + "multiselect__wrapper", " {\n          display: flex;\n          flex-wrap: wrap;\n          height: 100%;\n          width: 100%;\n        }\n\n        .").concat(this.prefix, "multiselect__clear-btn {\n           cursor: pointer;\n           margin-bottom: 4px;\n           margin-left: 4px;\n        }\n\n        .").concat(this.prefix, "multiselect__options {\n          background-color: #f6f6f6;\n          border-radius: 2px;\n          border: 1px solid rgba(0,0,0,.08);\n          left: -1px;\n          position: absolute;\n          top: calc(100% + 2px);\n          width: 100%;\n        }\n\n        .").concat(this.prefix, "multiselect__options ul {\n          list-style: none;\n          margin: 0;\n          padding: 2px 0;\n          max-height: 120px;\n          overflow: auto;\n        }\n\n        .").concat(this.prefix, "multiselect__options ul li {\n          cursor: pointer;\n          padding: 4px 8px;\n        }\n\n        .").concat(this.prefix, "multiselect__options ul p.").concat(this.prefix, "multiselect__options--no-results, \n        .").concat(this.prefix, "multiselect__options ul p.").concat(this.prefix, "multiselect__options--no-data {\n          margin: 0;\n          padding: 8px;\n          text-align: center;\n        }\n\n        .").concat(this.prefix, "multiselect__options ul li.").concat(this.prefix, "multiselect__options--selected {\n          background-color: #ff6358;\n          color: #fff;\n        }\n\n        .").concat(this.prefix, "multiselect__options ul li.").concat(this.prefix, "multiselect__options--selected:hover {\n          background-color: #eb5b51;\n        }\n\n        .").concat(this.prefix, "multiselect__options ul li:hover {\n          background-color: #dedede;\n        }\n\n        .").concat(this.prefix, "multiselect__options ul li.arrow-selected {\n          border: 2px solid rgb(101, 101, 101, 0.5);\n        }\n\n        .").concat(this.prefix, "multiselect__selected {\n          background-color: #656565;\n          border-radius: 2px;\n          color: #fff;\n          margin-bottom: 4px;\n          margin-right: 4px;\n          padding: 4px 8px;\n          display: flex;\n          align-items: center;\n        }\n\n        .").concat(this.prefix, "multiselect__selected .").concat(this.prefix, "multiselect__remove-btn {\n          cursor: pointer;\n          margin-left: 6px;\n        }\n\n        .").concat(this.prefix, "multiselect__input {\n          border: none;\n          flex-basis: 40px;\n          flex-grow: 1;\n          height: 24px;        \n          margin-bottom: 4px;\n          min-width: 40px;\n          outline: none;    \n        }\n      </style>\n      ");
      if (!this.customCss) document.querySelector("head").insertAdjacentHTML("beforeend", css);
      if (this.customCss) this.prefix = "";
    }
  }]);

  return IconicMultiSelect;
}();