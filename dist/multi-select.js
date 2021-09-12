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
 * IconicMultiSelect v0.6.0
 * Licence:  MIT
 * (c) 2021 Sidney Wimart.
 */

var cross = "\n<svg\n  width=\"24\"\n  height=\"24\"\n  viewBox=\"0 0 24 24\"\n  fill=\"none\"\n  xmlns=\"http://www.w3.org/2000/svg\"\n>\n  <path\n    d=\"M6.2253 4.81108C5.83477 4.42056 5.20161 4.42056 4.81108 4.81108C4.42056 5.20161 4.42056 5.83477 4.81108 6.2253L10.5858 12L4.81114 17.7747C4.42062 18.1652 4.42062 18.7984 4.81114 19.1889C5.20167 19.5794 5.83483 19.5794 6.22535 19.1889L12 13.4142L17.7747 19.1889C18.1652 19.5794 18.7984 19.5794 19.1889 19.1889C19.5794 18.7984 19.5794 18.1652 19.1889 17.7747L13.4142 12L19.189 6.2253C19.5795 5.83477 19.5795 5.20161 19.189 4.81108C18.7985 4.42056 18.1653 4.42056 17.7748 4.81108L12 10.5858L6.2253 4.81108Z\"\n    fill=\"currentColor\"\n  />\n</svg>\n";
var scrollIntoView = function scrollIntoView(parent, child) {
  var rectParent = parent.getBoundingClientRect();
  var rectChild = child.getBoundingClientRect(); 

  if (!(rectParent.top < rectChild.bottom - child.offsetHeight)) {
    parent.scrollTop = child.clientHeight + (child.offsetTop - child.offsetHeight);
  } 


  if (!(rectParent.bottom > rectChild.top + child.offsetHeight)) {
    parent.scrollTop = child.clientHeight + (child.offsetTop - child.offsetHeight) - (parent.offsetHeight - (child.offsetHeight + (child.offsetHeight - child.clientHeight)));
  }
};

var IconicMultiSelect = function () {
  function IconicMultiSelect(_ref) {
    var data = _ref.data,
        itemTemplate = _ref.itemTemplate,
        noData = _ref.noData,
        noResults = _ref.noResults,
        placeholder = _ref.placeholder,
        prefix = _ref.prefix,
        select = _ref.select,
        tagTemplate = _ref.tagTemplate,
        textField = _ref.textField,
        valueField = _ref.valueField;

    _classCallCheck(this, IconicMultiSelect);

    _defineProperty(this, "customCss", void 0);

    _defineProperty(this, "data", void 0);

    _defineProperty(this, "domElements", {});

    _defineProperty(this, "event", function () {});

    _defineProperty(this, "itemTemplate", void 0);

    _defineProperty(this, "noData", void 0);

    _defineProperty(this, "noResults", void 0);

    _defineProperty(this, "options", []);

    _defineProperty(this, "placeholder", void 0);

    _defineProperty(this, "prefix", void 0);

    _defineProperty(this, "selectContainer", void 0);

    _defineProperty(this, "selectedOptions", []);

    _defineProperty(this, "tagTemplate", void 0);

    _defineProperty(this, "textField", void 0);

    _defineProperty(this, "valueField", void 0);

    this.data = data !== null && data !== void 0 ? data : [];
    this.itemTemplate = itemTemplate !== null && itemTemplate !== void 0 ? itemTemplate : null;
    this.noData = noData !== null && noData !== void 0 ? noData : "No data found.";
    this.noResults = noResults !== null && noResults !== void 0 ? noResults : "No results found.";
    this.placeholder = placeholder !== null && placeholder !== void 0 ? placeholder : "Select...";
    this.prefix = prefix !== null && prefix !== void 0 ? prefix : "iconic-";
    this.selectContainer = document.querySelector(select);
    this.tagTemplate = tagTemplate !== null && tagTemplate !== void 0 ? tagTemplate : null;
    this.textField = textField !== null && textField !== void 0 ? textField : null;
    this.valueField = valueField !== null && valueField !== void 0 ? valueField : null;
  }
  _createClass(IconicMultiSelect, [{
    key: "init",
    value: function init() {
      if (this.selectContainer && this.selectContainer.nodeName === "SELECT") {
        if (this.itemTemplate && this.data.length === 0) throw new Error("itemTemplate must be initialized with data from the component settings");
        this.options = this.data.length > 0 ? this._getDataFromSettings() : this._getDataFromSelectTag();

        this._renderMultiselect();

        this._renderOptionsList();

        this.domElements = {
          clear: document.querySelector(".".concat(this.prefix + "multiselect__clear-btn")),
          input: document.querySelector(".".concat(this.prefix + "multiselect__input")),
          optionsContainer: document.querySelector(".".concat(this.prefix + "multiselect__options")),
          optionsContainerList: document.querySelector(".".concat(this.prefix + "multiselect__options > ul")),
          options: {
            list: document.querySelectorAll(".".concat(this.prefix + "multiselect__options", " > ul > li")),
            find: function find(callbackFn) {
              for (var i = 0; i < this.list.length; i++) {
                var node = this.list[i];
                if (callbackFn(node)) return node;
              }

              return undefined;
            },
            some: function some(callbackFn) {
              for (var i = 0; i < this.list.length; i++) {
                var node = this.list[i];
                if (callbackFn(node, i)) return true;
              }

              return false;
            }
          }
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
    value: function _addOptionToList(option, index) {
      var _this = this;

      var html = "<span class=\"".concat(this.prefix + "multiselect__selected", "\" data-value=\"").concat(option.value, "\">").concat(this.tagTemplate ? this._processTemplate(this.tagTemplate, index) : option.text, "<span class=\"").concat(this.prefix + "multiselect__remove-btn", "\">").concat(cross, "</span></span>");
      this.domElements.input.insertAdjacentHTML("beforebegin", html);

      var _document$querySelect = document.querySelector("span[data-value=\"".concat(option.value, "\"]")),
          removeBtn = _document$querySelect.lastElementChild;

      removeBtn.addEventListener("click", function () {
        var target = _this.domElements.options.find(function (el) {
          return el.dataset.value == option.value;
        });

        _this._handleOption(target);
      });
    }
  }, {
    key: "_clearSelection",
    value: function _clearSelection() {
      var _this2 = this;

      var _loop = function _loop(i) {
        var option = _this2.selectedOptions[i];

        var target = _this2.domElements.options.find(function (el) {
          return el.dataset.value == option.value;
        });

        target.classList.remove("".concat(_this2.prefix, "multiselect__options--selected"));

        _this2._removeOptionFromList(target.dataset.value);
      };

      for (var i = 0; i < this.selectedOptions.length; i++) {
        _loop(i);
      }

      this.selectedOptions = [];

      this._handleClearSelectionBtn();

      this._handlePlaceholder();

      this._dispatchEvent({
        action: "CLEAR_ALL_OPTIONS",
        selection: this.selectedOptions
      });
    }
  }, {
    key: "_closeList",
    value: function _closeList() {
      this.domElements.input.value = "";
      this.domElements.optionsContainer.classList.remove("visible");

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

      document.addEventListener("mouseup", function (_ref2) {
        var target = _ref2.target;
        var container = document.getElementById("iconic5656-multiselect");

        if (!container.contains(target)) {
          _this3._filterOptions("");

          _this3._closeList();

          _this3._handlePlaceholder();
        }
      });
      this.domElements.clear.addEventListener("click", function () {
        _this3._clearSelection();
      });

      for (var i = 0; i < this.domElements.options.list.length; i++) {
        var option = this.domElements.options.list[i];
        option.addEventListener("click", function (_ref3) {
          var target = _ref3.target;

          _this3._handleOption(target);

          _this3._closeList();
        });
      }

      this.domElements.input.addEventListener("focus", function () {
        _this3.domElements.optionsContainer.classList.add("visible");

        _this3.domElements.input.placeholder = "";
      });
      this.domElements.input.addEventListener("input", function (_ref4) {
        var value = _ref4.target.value;

        if (_this3.domElements.options.list.length > 0) {
          _this3._filterOptions(value);
        }
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

      var isOpen = this.domElements.optionsContainer.classList.contains("visible");
      var valueLowerCase = value.toLowerCase();

      if (!isOpen && value.length > 0) {
        this.domElements.optionsContainer.classList.add("visible");
      }

      if (this.domElements.options.list.length > 0) {
        for (var i = 0; i < this.domElements.options.list.length; i++) {
          var el = this.domElements.options.list[i];
          var text = this.itemTemplate ? this.data[i][this.textField] : el.textContent;

          if (text.toLowerCase().substring(0, valueLowerCase.length) === valueLowerCase) {
            this.domElements.optionsContainerList.appendChild(el);
          } else {
            el.parentNode && el.parentNode.removeChild(el);
          }
        }

        var hasResults = this.domElements.options.some(function (el, index) {
          return (_this4.itemTemplate ? _this4.data[index][_this4.textField] : el.textContent).toLowerCase().substring(0, valueLowerCase.length) === valueLowerCase;
        });

        this._showNoResults(!hasResults);
      }
    }
  }, {
    key: "_getDataFromSelectTag",
    value: function _getDataFromSelectTag() {
      var arr = [];
      var options = this.selectContainer.options;

      for (var i = 0; i < options.length; i++) {
        arr.push({
          text: options[i].text,
          value: options[i].value
        });
      }

      return arr;
    }
  }, {
    key: "_getDataFromSettings",
    value: function _getDataFromSettings() {
      if (this.data.length > 0 && this.valueField && this.textField) {
        var isValueFieldValid = typeof this.valueField === "string";
        var isTextFieldValid = typeof this.textField === "string";
        var arr = [];

        if (!isValueFieldValid || !isTextFieldValid) {
          throw new Error("textField and valueField must be of type string");
        }

        for (var i = 0; i < this.data.length; i++) {
          var item = this.data[i];
          arr.push({
            value: item[this.valueField],
            text: item[this.textField]
          });
        }

        return arr;
      } else {
        return null;
      }
    }
  }, {
    key: "_handleArrows",
    value: function _handleArrows(event) {
      if (event.keyCode === 40 || event.keyCode === 38) {
        var isOpen = this.domElements.optionsContainer.classList.contains("visible"); 

        var optionsContainerList = document.querySelector(".".concat(this.prefix + "multiselect__options > ul"));

        if (!isOpen) {
          this.domElements.optionsContainer.classList.add("visible");
          optionsContainerList.firstElementChild.classList.add("arrow-selected");
          optionsContainerList.firstElementChild.scrollIntoView();
        } else {
          var selected = document.querySelector(".".concat(this.prefix, "multiselect__options ul li.arrow-selected"));
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
            scrollIntoView(optionsContainerList, selected);
            return;
          }

          selected.classList.add("arrow-selected");
          scrollIntoView(optionsContainerList, selected);
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

          if (this.selectedOptions.length === 0) {
            this.domElements.optionsContainer.classList.remove("visible");
          }
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
        this.domElements.clear.style.display = "flex";
      } else {
        this.domElements.clear.style.display = "none";
      }
    }
  }, {
    key: "_handleOption",
    value: function _handleOption(target) {
      var dispatchEvent = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

      for (var i = 0; i < this.selectedOptions.length; i++) {
        var el = this.selectedOptions[i];

        if (el.value == target.dataset.value) {
          target.classList.remove("".concat(this.prefix, "multiselect__options--selected"));
          this.selectedOptions.splice(i, 1);

          this._removeOptionFromList(target.dataset.value);

          this._handleClearSelectionBtn();

          this._handlePlaceholder();

          return dispatchEvent && this._dispatchEvent({
            action: "REMOVE_OPTION",
            value: target.dataset.value,
            selection: this.selectedOptions
          });
        }
      } 


      for (var _i = 0; _i < this.options.length; _i++) {
        var option = this.options[_i];

        if (option.value == target.dataset.value) {
          target.classList.add("".concat(this.prefix, "multiselect__options--selected"));
          this.selectedOptions = [].concat(_toConsumableArray(this.selectedOptions), [option]);

          this._addOptionToList(option, _i);

          this._handleClearSelectionBtn();

          this._handlePlaceholder();

          return dispatchEvent && this._dispatchEvent({
            action: "ADD_OPTION",
            value: target.dataset.value,
            selection: this.selectedOptions
          });
        }
      }
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
    key: "_processTemplate",
    value: function _processTemplate(template, index) {
      var processedTemplate = template;
      var objAttr = template.match(/\$\{(\w+)\}/g).map(function (e) {
        return e.replace(/\$\{|\}/g, "");
      });

      for (var i = 0; i < objAttr.length; i++) {
        var _this$data$index$attr;

        var attr = objAttr[i];
        processedTemplate = processedTemplate.replace("${".concat(attr, "}"), (_this$data$index$attr = this.data[index][attr]) !== null && _this$data$index$attr !== void 0 ? _this$data$index$attr : "");
      }

      return processedTemplate;
    }
  }, {
    key: "_removeAllArrowSelected",
    value: function _removeAllArrowSelected() {
      var className = "arrow-selected";
      var target = this.domElements.options.find(function (el) {
        return el.classList.contains(className);
      });
      target && target.classList.remove(className);
    }
  }, {
    key: "_removeOptionFromList",
    value: function _removeOptionFromList(value) {
      var optionDom = document.querySelector("span[data-value=\"".concat(value, "\"]"));
      optionDom && optionDom.parentNode && optionDom.parentNode.removeChild(optionDom);
    }
  }, {
    key: "_renderOptionsList",
    value: function _renderOptionsList() {
      var _this5 = this;

      var html = "\n        <div class=\"".concat(this.prefix, "multiselect__options\">\n          <ul>\n          ").concat(this.options.length > 0 && !this.itemTemplate ? this.options.map(function (option) {
        return "\n              <li data-value=\"".concat(option.value, "\">").concat(option.text, "</li>\n            ");
      }).join("") : "", "\n\n          ").concat(this.options.length > 0 && this.itemTemplate ? this.options.map(function (option, index) {
        return "\n              <li data-value=\"".concat(option.value, "\">").concat(_this5._processTemplate(_this5.itemTemplate, index), "</li>\n            ");
      }).join("") : "", "\n          ").concat(this._showNoData(this.options.length === 0), "\n          </ul>\n        </div>\n      ");
      document.querySelector(".".concat(this.prefix + "multiselect__container")).insertAdjacentHTML("beforeend", html);
    }
  }, {
    key: "_renderMultiselect",
    value: function _renderMultiselect() {
      this.selectContainer.style.display = "none";
      var html = "\n      <div id=\"iconic5656-multiselect\" class=\"".concat(this.prefix + "multiselect__container", "\">\n        <div class=\"").concat(this.prefix + "multiselect__wrapper", "\">\n          <input class=\"").concat(this.prefix + "multiselect__input", "\" placeholder=\"").concat(this.placeholder, "\" />\n        </div>\n        <span style=\"display: none;\" class=\"").concat(this.prefix + "multiselect__clear-btn", "\">").concat(cross, "</span>\n      </div>\n    ");
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
        dom && dom.parentNode && dom.parentNode.removeChild(dom);
      }
    }
  }]);

  return IconicMultiSelect;
}();