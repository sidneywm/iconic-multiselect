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
 * IconicMultiSelect v0.7.0
 * Licence:  MIT
 * (c) 2021 Sidney Wimart.
 */

var IconicMultiSelect = function () {
  function IconicMultiSelect(_ref) {
    var data = _ref.data,
        itemTemplate = _ref.itemTemplate,
        noData = _ref.noData,
        noResults = _ref.noResults,
        placeholder = _ref.placeholder,
        select = _ref.select,
        tagTemplate = _ref.tagTemplate,
        textField = _ref.textField,
        valueField = _ref.valueField;

    _classCallCheck(this, IconicMultiSelect);

    _defineProperty(this, "_data", void 0);

    _defineProperty(this, "_domElements", void 0);

    _defineProperty(this, "_event", function () {});

    _defineProperty(this, "_itemTemplate", void 0);

    _defineProperty(this, "_multiselect", void 0);

    _defineProperty(this, "_noData", void 0);

    _defineProperty(this, "_noResults", void 0);

    _defineProperty(this, "_options", []);

    _defineProperty(this, "_placeholder", void 0);

    _defineProperty(this, "_select", void 0);

    _defineProperty(this, "_selectContainer", void 0);

    _defineProperty(this, "_selectedOptions", []);

    _defineProperty(this, "_tagTemplate", void 0);

    _defineProperty(this, "_textField", void 0);

    _defineProperty(this, "_valueField", void 0);

    _defineProperty(this, "_cross", "\n    <svg\n      width=\"24\"\n      height=\"24\"\n      viewBox=\"0 0 24 24\"\n      fill=\"none\"\n      xmlns=\"http://www.w3.org/2000/svg\"\n    >\n      <path\n        d=\"M6.2253 4.81108C5.83477 4.42056 5.20161 4.42056 4.81108 4.81108C4.42056 5.20161 4.42056 5.83477 4.81108 6.2253L10.5858 12L4.81114 17.7747C4.42062 18.1652 4.42062 18.7984 4.81114 19.1889C5.20167 19.5794 5.83483 19.5794 6.22535 19.1889L12 13.4142L17.7747 19.1889C18.1652 19.5794 18.7984 19.5794 19.1889 19.1889C19.5794 18.7984 19.5794 18.1652 19.1889 17.7747L13.4142 12L19.189 6.2253C19.5795 5.83477 19.5795 5.20161 19.189 4.81108C18.7985 4.42056 18.1653 4.42056 17.7748 4.81108L12 10.5858L6.2253 4.81108Z\"\n        fill=\"currentColor\"\n      />\n    </svg>\n    ");

    this._data = data !== null && data !== void 0 ? data : [];
    this._itemTemplate = itemTemplate !== null && itemTemplate !== void 0 ? itemTemplate : null;
    this._noData = noData !== null && noData !== void 0 ? noData : "No data found.";
    this._noResults = noResults !== null && noResults !== void 0 ? noResults : "No results found.";
    this._placeholder = placeholder !== null && placeholder !== void 0 ? placeholder : "Select...";
    this._select = select;
    this._selectContainer = document.querySelector(select);
    this._tagTemplate = tagTemplate !== null && tagTemplate !== void 0 ? tagTemplate : null;
    this._textField = textField !== null && textField !== void 0 ? textField : null;
    this._valueField = valueField !== null && valueField !== void 0 ? valueField : null;
  }
  _createClass(IconicMultiSelect, [{
    key: "init",
    value: function init() {
      if (this._selectContainer && this._selectContainer.nodeName === "SELECT") {
        if (this._itemTemplate && this._data.length === 0) throw new Error("itemTemplate must be initialized with data from the component settings");
        if (this._tagTemplate && this._data.length === 0) throw new Error("tagTemplate must be initialized with data from the component settings");
        this._options = this._data.length > 0 ? this._getDataFromSettings() : this._getDataFromSelectTag();

        this._renderMultiselect();

        this._renderOptionsList();

        this._domElements = {
          clear: this._multiselect.querySelector(".multiselect__clear-btn"),
          input: this._multiselect.querySelector(".multiselect__input"),
          optionsContainer: this._multiselect.querySelector(".multiselect__options"),
          optionsContainerList: this._multiselect.querySelector(".multiselect__options > ul"),
          options: {
            list: this._multiselect.querySelectorAll(".multiselect__options > ul > li"),
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

        this._initSelectedList();
      } else {
        throw new Error("The selector '".concat(this._select, "' did not select any valid select tag."));
      }
    }
  }, {
    key: "subscribe",
    value: function subscribe(callback) {
      if (typeof callback === "function") {
        this._event = callback;
      } else {
        throw new Error("parameter in the subscribe method is not a function");
      }
    }
  }, {
    key: "_addOptionToList",
    value: function _addOptionToList(option, index) {
      var _this = this;

      var html = "<span class=\"multiselect__selected\" data-value=\"".concat(option.value, "\">").concat(this._tagTemplate ? this._processTemplate(this._tagTemplate, index) : option.text, "<span class=\"multiselect__remove-btn\">").concat(this._cross, "</span></span>");

      this._domElements.input.insertAdjacentHTML("beforebegin", html);

      var _this$_multiselect$qu = this._multiselect.querySelector("span[data-value=\"".concat(option.value, "\"]")),
          removeBtn = _this$_multiselect$qu.lastElementChild;

      removeBtn.addEventListener("click", function () {
        var target = _this._domElements.options.find(function (el) {
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
        var option = _this2._selectedOptions[i];

        var target = _this2._domElements.options.find(function (el) {
          return el.dataset.value == option.value;
        });

        target.classList.remove("multiselect__options--selected");

        _this2._removeOptionFromList(target.dataset.value);
      };

      for (var i = 0; i < this._selectedOptions.length; i++) {
        _loop(i);
      }

      this._selectedOptions = [];

      this._handleClearSelectionBtn();

      this._handlePlaceholder();

      this._dispatchEvent({
        action: "CLEAR_ALL_OPTIONS",
        selection: this._selectedOptions
      });
    }
  }, {
    key: "_closeList",
    value: function _closeList() {
      this._domElements.input.value = "";

      this._domElements.optionsContainer.classList.remove("visible");

      this._filterOptions("");

      this._removeAllArrowSelected();
    }
  }, {
    key: "_dispatchEvent",
    value: function _dispatchEvent(event) {
      this._event(event);
    }
  }, {
    key: "_enableEventListenners",
    value: function _enableEventListenners() {
      var _this3 = this;

      document.addEventListener("mouseup", function (_ref2) {
        var target = _ref2.target;

        if (!_this3._multiselect.contains(target)) {
          _this3._filterOptions("");

          _this3._closeList();

          _this3._handlePlaceholder();
        }
      });

      this._domElements.clear.addEventListener("click", function () {
        _this3._clearSelection();
      });

      for (var i = 0; i < this._domElements.options.list.length; i++) {
        var option = this._domElements.options.list[i];
        option.addEventListener("click", function (_ref3) {
          var target = _ref3.target;

          _this3._handleOption(target);

          _this3._closeList();
        });
      }

      this._domElements.input.addEventListener("focus", function () {
        _this3._domElements.optionsContainer.classList.add("visible");

        _this3._domElements.input.placeholder = "";
      });

      this._domElements.input.addEventListener("input", function (_ref4) {
        var value = _ref4.target.value;

        if (_this3._domElements.options.list.length > 0) {
          _this3._filterOptions(value);
        }
      });

      this._domElements.input.addEventListener("keydown", function (e) {
        _this3._handleArrows(e);

        _this3._handleBackspace(e);

        _this3._handleEnter(e);
      });
    }
  }, {
    key: "_filterOptions",
    value: function _filterOptions(value) {
      var _this4 = this;

      var isOpen = this._domElements.optionsContainer.classList.contains("visible");

      var valueLowerCase = value.toLowerCase();

      if (!isOpen && value.length > 0) {
        this._domElements.optionsContainer.classList.add("visible");
      }

      if (this._domElements.options.list.length > 0) {
        for (var i = 0; i < this._domElements.options.list.length; i++) {
          var el = this._domElements.options.list[i];
          var text = this._itemTemplate ? this._data[i][this._textField] : el.textContent;

          if (text.toLowerCase().substring(0, valueLowerCase.length) === valueLowerCase) {
            this._domElements.optionsContainerList.appendChild(el);
          } else {
            el.parentNode && el.parentNode.removeChild(el);
          }
        }

        var hasResults = this._domElements.options.some(function (el, index) {
          return (_this4._itemTemplate ? _this4._data[index][_this4._textField] : el.textContent).toLowerCase().substring(0, valueLowerCase.length) === valueLowerCase;
        });

        this._showNoResults(!hasResults);
      }
    }
  }, {
    key: "_generateId",
    value: function _generateId(length) {
      var result = "";
      var characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
      var charactersLength = characters.length;

      for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
      }

      return result;
    }
  }, {
    key: "_getDataFromSelectTag",
    value: function _getDataFromSelectTag() {
      var arr = [];
      var options = this._selectContainer.options;

      for (var i = 0; i < options.length; i++) {
        var item = options[i];
        arr.push({
          text: item.text,
          value: item.value,
          selected: item.hasAttribute('selected')
        });
      }

      return arr;
    }
  }, {
    key: "_getDataFromSettings",
    value: function _getDataFromSettings() {
      if (this._data.length > 0 && this._valueField && this._textField) {
        var isValueFieldValid = typeof this._valueField === "string";
        var isTextFieldValid = typeof this._textField === "string";
        var arr = [];

        if (!isValueFieldValid || !isTextFieldValid) {
          throw new Error("textField and valueField must be of type string");
        }

        for (var i = 0; i < this._data.length; i++) {
          var item = this._data[i];
          arr.push({
            value: item[this._valueField],
            text: item[this._textField],
            selected: typeof item.selected === "boolean" ? item.selected : false
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
        event.preventDefault();

        var isOpen = this._domElements.optionsContainer.classList.contains("visible"); 


        var optionsContainerList = this._multiselect.querySelector(".multiselect__options > ul");

        if (!isOpen) {
          this._domElements.optionsContainer.classList.add("visible");

          optionsContainerList.firstElementChild.classList.add("arrow-selected");
          optionsContainerList.firstElementChild.scrollIntoView(false);
        } else {
          var selected = this._multiselect.querySelector(".multiselect__options ul li.arrow-selected");

          var action = {
            ArrowUp: "previous",
            Up: "previous",
            ArrowDown: "next",
            Down: "next"
          };

          if (!selected) {
            optionsContainerList.firstElementChild.classList.add("arrow-selected");
            optionsContainerList.firstElementChild.scrollIntoView(false);
            return;
          }

          selected.classList.remove("arrow-selected");
          selected = selected[action[event.key] + "ElementSibling"]; 

          if (!selected) {
            selected = optionsContainerList.children[action[event.key] === "next" ? 0 : optionsContainerList.children.length - 1];
            selected.classList.add("arrow-selected");

            this._scrollIntoView(optionsContainerList, selected);

            return;
          }

          selected.classList.add("arrow-selected");

          this._scrollIntoView(optionsContainerList, selected);
        }
      }
    }
  }, {
    key: "_handleBackspace",
    value: function _handleBackspace(e) {
      if (e.keyCode === 8 && e.target.value === "") {
        var lastSelectedOption = this._selectedOptions.length > 0 ? this._selectedOptions[this._selectedOptions.length - 1] : null;

        if (lastSelectedOption) {
          var targetLastSelectedOption = this._multiselect.querySelector("li[data-value=\"".concat(lastSelectedOption.value, "\"]"));

          this._handleOption(targetLastSelectedOption);

          if (this._selectedOptions.length === 0) {
            this._domElements.optionsContainer.classList.remove("visible");
          }
        }
      }
    }
  }, {
    key: "_handleClearSelectionBtn",
    value: function _handleClearSelectionBtn() {
      if (this._selectedOptions.length > 0) {
        this._domElements.clear.style.display = "flex";
      } else {
        this._domElements.clear.style.display = "none";
      }
    }
  }, {
    key: "_handleEnter",
    value: function _handleEnter(event) {
      if (event.keyCode === 13) {
        var selected = this._multiselect.querySelector(".multiselect__options ul li.arrow-selected");

        if (selected) {
          this._handleOption(selected);

          this._closeList();
        }
      }
    }
  }, {
    key: "_handleOption",
    value: function _handleOption(target) {
      var dispatchEvent = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

      for (var i = 0; i < this._selectedOptions.length; i++) {
        var el = this._selectedOptions[i];

        if (el.value == target.dataset.value) {
          target.classList.remove("multiselect__options--selected");

          this._selectedOptions.splice(i, 1);

          this._removeOptionFromList(target.dataset.value);

          this._handleClearSelectionBtn();

          this._handlePlaceholder();

          return dispatchEvent && this._dispatchEvent({
            action: "REMOVE_OPTION",
            value: target.dataset.value,
            selection: this._selectedOptions
          });
        }
      } 


      for (var _i = 0; _i < this._options.length; _i++) {
        var option = this._options[_i];

        if (option.value == target.dataset.value) {
          target.classList.add("multiselect__options--selected");
          this._selectedOptions = [].concat(_toConsumableArray(this._selectedOptions), [option]);

          this._addOptionToList(option, _i);

          this._handleClearSelectionBtn();

          this._handlePlaceholder();

          return dispatchEvent && this._dispatchEvent({
            action: "ADD_OPTION",
            value: target.dataset.value,
            selection: this._selectedOptions
          });
        }
      }
    }
  }, {
    key: "_handlePlaceholder",
    value: function _handlePlaceholder() {
      if (this._selectedOptions.length > 0) {
        this._domElements.input.placeholder = "";
      } else {
        this._domElements.input.placeholder = this._placeholder;
      }
    }
  }, {
    key: "_initSelectedList",
    value: function _initSelectedList() {
      var _this5 = this;

      var hasItemsSelected = false;

      var _loop2 = function _loop2(i) {
        var option = _this5._options[i];

        if (option.selected) {
          hasItemsSelected = true;

          var target = _this5._domElements.options.find(function (el) {
            return el.dataset.value == option.value;
          });

          target.classList.add("multiselect__options--selected");
          _this5._selectedOptions = [].concat(_toConsumableArray(_this5._selectedOptions), [option]);

          _this5._addOptionToList(option, i);
        }
      };

      for (var i = 0; i < this._options.length; i++) {
        _loop2(i);
      }

      if (hasItemsSelected) this._handleClearSelectionBtn();

      this._handlePlaceholder();
    }
  }, {
    key: "_processTemplate",
    value: function _processTemplate(template, index) {
      var processedTemplate = template;
      var objAttr = template.match(/\$\{(\w+)\}/g).map(function (e) {
        return e.replace(/\$\{|\}/g, "");
      });

      for (var i = 0; i < objAttr.length; i++) {
        var _this$_data$index$att;

        var attr = objAttr[i];
        processedTemplate = processedTemplate.replace("${".concat(attr, "}"), (_this$_data$index$att = this._data[index][attr]) !== null && _this$_data$index$att !== void 0 ? _this$_data$index$att : "");
      }

      return processedTemplate;
    }
  }, {
    key: "_removeAllArrowSelected",
    value: function _removeAllArrowSelected() {
      var className = "arrow-selected";

      var target = this._domElements.options.find(function (el) {
        return el.classList.contains(className);
      });

      target && target.classList.remove(className);
    }
  }, {
    key: "_removeOptionFromList",
    value: function _removeOptionFromList(value) {
      var optionDom = this._multiselect.querySelector("span[data-value=\"".concat(value, "\"]"));

      optionDom && optionDom.parentNode && optionDom.parentNode.removeChild(optionDom);
    }
  }, {
    key: "_renderOptionsList",
    value: function _renderOptionsList() {
      var _this6 = this;

      var html = "\n        <div class=\"multiselect__options\">\n          <ul>\n          ".concat(this._options.length > 0 && !this._itemTemplate ? this._options.map(function (option) {
        return "\n              <li data-value=\"".concat(option.value, "\">").concat(option.text, "</li>\n            ");
      }).join("") : "", "\n\n          ").concat(this._options.length > 0 && this._itemTemplate ? this._options.map(function (option, index) {
        return "\n              <li data-value=\"".concat(option.value, "\">").concat(_this6._processTemplate(_this6._itemTemplate, index), "</li>\n            ");
      }).join("") : "", "\n          ").concat(this._showNoData(this._options.length === 0), "\n          </ul>\n        </div>\n      ");

      this._multiselect.insertAdjacentHTML("beforeend", html);
    }
  }, {
    key: "_renderMultiselect",
    value: function _renderMultiselect() {
      this._selectContainer.style.display = "none";

      var id = "iconic-" + this._generateId(20);

      var html = "\n      <div id=\"".concat(id, "\" class=\"multiselect__container\">\n        <div class=\"multiselect__wrapper\">\n          <input class=\"multiselect__input\" placeholder=\"").concat(this._placeholder, "\" />\n        </div>\n        <span style=\"display: none;\" class=\"multiselect__clear-btn\">").concat(this._cross, "</span>\n      </div>\n    ");

      this._selectContainer.insertAdjacentHTML("afterend", html);

      this._multiselect = document.querySelector("#".concat(id));
    }
  }, {
    key: "_scrollIntoView",
    value: function _scrollIntoView(parent, child) {
      var rectParent = parent.getBoundingClientRect();
      var rectChild = child.getBoundingClientRect(); 

      if (!(rectParent.top < rectChild.bottom - child.offsetHeight)) {
        parent.scrollTop = child.clientHeight + (child.offsetTop - child.offsetHeight);
      } 


      if (!(rectParent.bottom > rectChild.top + child.offsetHeight)) {
        parent.scrollTop = child.clientHeight + (child.offsetTop - child.offsetHeight) - (parent.offsetHeight - (child.offsetHeight + (child.offsetHeight - child.clientHeight)));
      }
    }
  }, {
    key: "_showNoData",
    value: function _showNoData(condition) {
      return condition ? "<p class=\"multiselect__options--no-data\">".concat(this._noData, "</p>") : "";
    }
  }, {
    key: "_showNoResults",
    value: function _showNoResults(condition) {
      var dom = this._multiselect.querySelector(".multiselect__options--no-results");

      if (condition) {
        var html = "<p class=\"multiselect__options--no-results\">".concat(this._noResults, "</p>");
        !dom && this._domElements.optionsContainerList.insertAdjacentHTML("beforeend", html);
      } else {
        dom && dom.parentNode && dom.parentNode.removeChild(dom);
      }
    }
  }]);

  return IconicMultiSelect;
}();