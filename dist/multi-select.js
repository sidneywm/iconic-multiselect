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

function _classPrivateMethodGet(receiver, privateSet, fn) { if (!privateSet.has(receiver)) { throw new TypeError("attempted to get private field on non-instance"); } return fn; }

function _classPrivateFieldGet(receiver, privateMap) { var descriptor = _classExtractFieldDescriptor(receiver, privateMap, "get"); return _classApplyDescriptorGet(receiver, descriptor); }

function _classApplyDescriptorGet(receiver, descriptor) { if (descriptor.get) { return descriptor.get.call(receiver); } return descriptor.value; }

function _classPrivateFieldSet(receiver, privateMap, value) { var descriptor = _classExtractFieldDescriptor(receiver, privateMap, "set"); _classApplyDescriptorSet(receiver, descriptor, value); return value; }

function _classExtractFieldDescriptor(receiver, privateMap, action) { if (!privateMap.has(receiver)) { throw new TypeError("attempted to " + action + " private field on non-instance"); } return privateMap.get(receiver); }

function _classApplyDescriptorSet(receiver, descriptor, value) { if (descriptor.set) { descriptor.set.call(receiver, value); } else { if (!descriptor.writable) { throw new TypeError("attempted to set read only private field"); } descriptor.value = value; } }

var _data = new WeakMap();

var _domElements = new WeakMap();

var _event = new WeakMap();

var _itemTemplate = new WeakMap();

var _multiselect = new WeakMap();

var _noData = new WeakMap();

var _noResults = new WeakMap();

var _options = new WeakMap();

var _placeholder = new WeakMap();

var _selectContainer = new WeakMap();

var _selectedOptions = new WeakMap();

var _tagTemplate = new WeakMap();

var _textField = new WeakMap();

var _valueField = new WeakMap();

var _cross = new WeakMap();

var _addOptionToList = new WeakSet();

var _clearSelection = new WeakSet();

var _closeList = new WeakSet();

var _dispatchEvent = new WeakSet();

var _enableEventListenners = new WeakSet();

var _filterOptions = new WeakSet();

var _generateId = new WeakSet();

var _getDataFromSelectTag = new WeakSet();

var _getDataFromSettings = new WeakSet();

var _handleArrows = new WeakSet();

var _handleBackspace = new WeakSet();

var _handleClearSelectionBtn = new WeakSet();

var _handleEnter = new WeakSet();

var _handleOption = new WeakSet();

var _handlePlaceholder = new WeakSet();

var _processTemplate = new WeakSet();

var _removeAllArrowSelected = new WeakSet();

var _removeOptionFromList = new WeakSet();

var _renderOptionsList = new WeakSet();

var _renderMultiselect = new WeakSet();

var _scrollIntoView = new WeakSet();

var _showNoData = new WeakSet();

var _showNoResults = new WeakSet();

/*!
 * IconicMultiSelect v0.6.0
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

    _showNoResults.add(this);

    _showNoData.add(this);

    _scrollIntoView.add(this);

    _renderMultiselect.add(this);

    _renderOptionsList.add(this);

    _removeOptionFromList.add(this);

    _removeAllArrowSelected.add(this);

    _processTemplate.add(this);

    _handlePlaceholder.add(this);

    _handleOption.add(this);

    _handleEnter.add(this);

    _handleClearSelectionBtn.add(this);

    _handleBackspace.add(this);

    _handleArrows.add(this);

    _getDataFromSettings.add(this);

    _getDataFromSelectTag.add(this);

    _generateId.add(this);

    _filterOptions.add(this);

    _enableEventListenners.add(this);

    _dispatchEvent.add(this);

    _closeList.add(this);

    _clearSelection.add(this);

    _addOptionToList.add(this);

    _data.set(this, {
      writable: true,
      value: void 0
    });

    _domElements.set(this, {
      writable: true,
      value: void 0
    });

    _event.set(this, {
      writable: true,
      value: function value() {}
    });

    _itemTemplate.set(this, {
      writable: true,
      value: void 0
    });

    _multiselect.set(this, {
      writable: true,
      value: void 0
    });

    _noData.set(this, {
      writable: true,
      value: void 0
    });

    _noResults.set(this, {
      writable: true,
      value: void 0
    });

    _options.set(this, {
      writable: true,
      value: []
    });

    _placeholder.set(this, {
      writable: true,
      value: void 0
    });

    _selectContainer.set(this, {
      writable: true,
      value: void 0
    });

    _selectedOptions.set(this, {
      writable: true,
      value: []
    });

    _tagTemplate.set(this, {
      writable: true,
      value: void 0
    });

    _textField.set(this, {
      writable: true,
      value: void 0
    });

    _valueField.set(this, {
      writable: true,
      value: void 0
    });

    _cross.set(this, {
      writable: true,
      value: "\n    <svg\n      width=\"24\"\n      height=\"24\"\n      viewBox=\"0 0 24 24\"\n      fill=\"none\"\n      xmlns=\"http://www.w3.org/2000/svg\"\n    >\n      <path\n        d=\"M6.2253 4.81108C5.83477 4.42056 5.20161 4.42056 4.81108 4.81108C4.42056 5.20161 4.42056 5.83477 4.81108 6.2253L10.5858 12L4.81114 17.7747C4.42062 18.1652 4.42062 18.7984 4.81114 19.1889C5.20167 19.5794 5.83483 19.5794 6.22535 19.1889L12 13.4142L17.7747 19.1889C18.1652 19.5794 18.7984 19.5794 19.1889 19.1889C19.5794 18.7984 19.5794 18.1652 19.1889 17.7747L13.4142 12L19.189 6.2253C19.5795 5.83477 19.5795 5.20161 19.189 4.81108C18.7985 4.42056 18.1653 4.42056 17.7748 4.81108L12 10.5858L6.2253 4.81108Z\"\n        fill=\"currentColor\"\n      />\n    </svg>\n    "
    });

    _classPrivateFieldSet(this, _data, data !== null && data !== void 0 ? data : []);

    _classPrivateFieldSet(this, _itemTemplate, itemTemplate !== null && itemTemplate !== void 0 ? itemTemplate : null);

    _classPrivateFieldSet(this, _noData, noData !== null && noData !== void 0 ? noData : "No data found.");

    _classPrivateFieldSet(this, _noResults, noResults !== null && noResults !== void 0 ? noResults : "No results found.");

    _classPrivateFieldSet(this, _placeholder, placeholder !== null && placeholder !== void 0 ? placeholder : "Select...");

    _classPrivateFieldSet(this, _selectContainer, document.querySelector(select));

    _classPrivateFieldSet(this, _tagTemplate, tagTemplate !== null && tagTemplate !== void 0 ? tagTemplate : null);

    _classPrivateFieldSet(this, _textField, textField !== null && textField !== void 0 ? textField : null);

    _classPrivateFieldSet(this, _valueField, valueField !== null && valueField !== void 0 ? valueField : null);
  }
  _createClass(IconicMultiSelect, [{
    key: "init",
    value: function init() {
      if (_classPrivateFieldGet(this, _selectContainer) && _classPrivateFieldGet(this, _selectContainer).nodeName === "SELECT") {
        if (_classPrivateFieldGet(this, _itemTemplate) && _classPrivateFieldGet(this, _data).length === 0) throw new Error("itemTemplate must be initialized with data from the component settings");

        _classPrivateFieldSet(this, _options, _classPrivateFieldGet(this, _data).length > 0 ? _classPrivateMethodGet(this, _getDataFromSettings, _getDataFromSettings2).call(this) : _classPrivateMethodGet(this, _getDataFromSelectTag, _getDataFromSelectTag2).call(this));

        _classPrivateMethodGet(this, _renderMultiselect, _renderMultiselect2).call(this);

        _classPrivateMethodGet(this, _renderOptionsList, _renderOptionsList2).call(this);

        _classPrivateFieldSet(this, _domElements, {
          clear: _classPrivateFieldGet(this, _multiselect).querySelector(".multiselect__clear-btn"),
          input: _classPrivateFieldGet(this, _multiselect).querySelector(".multiselect__input"),
          optionsContainer: _classPrivateFieldGet(this, _multiselect).querySelector(".multiselect__options"),
          optionsContainerList: _classPrivateFieldGet(this, _multiselect).querySelector(".multiselect__options > ul"),
          options: {
            list: _classPrivateFieldGet(this, _multiselect).querySelectorAll(".multiselect__options > ul > li"),
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
        });

        _classPrivateMethodGet(this, _enableEventListenners, _enableEventListenners2).call(this);
      } else {
        throw new Error("The selector '".concat(element, "' did not select any valid select tag."));
      }
    }
  }, {
    key: "subscribe",
    value: function subscribe(callback) {
      if (typeof callback === "function") {
        _classPrivateFieldSet(this, _event, callback);
      } else {
        throw new Error("parameter in the subscribe method is not a function");
      }
    }
  }]);

  return IconicMultiSelect;
}();

function _addOptionToList2(option, index) {
  var _this = this;

  var html = "<span class=\"multiselect__selected\" data-value=\"".concat(option.value, "\">").concat(_classPrivateFieldGet(this, _tagTemplate) ? _classPrivateMethodGet(this, _processTemplate, _processTemplate2).call(this, _classPrivateFieldGet(this, _tagTemplate), index) : option.text, "<span class=\"multiselect__remove-btn\">").concat(_classPrivateFieldGet(this, _cross), "</span></span>");

  _classPrivateFieldGet(this, _domElements).input.insertAdjacentHTML("beforebegin", html);

  var _classPrivateFieldGet2 = _classPrivateFieldGet(this, _multiselect).querySelector("span[data-value=\"".concat(option.value, "\"]")),
      removeBtn = _classPrivateFieldGet2.lastElementChild;

  removeBtn.addEventListener("click", function () {
    var target = _classPrivateFieldGet(_this, _domElements).options.find(function (el) {
      return el.dataset.value == option.value;
    });

    _classPrivateMethodGet(_this, _handleOption, _handleOption2).call(_this, target);
  });
}

function _clearSelection2() {
  var _this2 = this;

  var _loop = function _loop(i) {
    var option = _classPrivateFieldGet(_this2, _selectedOptions)[i];

    var target = _classPrivateFieldGet(_this2, _domElements).options.find(function (el) {
      return el.dataset.value == option.value;
    });

    target.classList.remove("multiselect__options--selected");

    _classPrivateMethodGet(_this2, _removeOptionFromList, _removeOptionFromList2).call(_this2, target.dataset.value);
  };

  for (var i = 0; i < _classPrivateFieldGet(this, _selectedOptions).length; i++) {
    _loop(i);
  }

  _classPrivateFieldSet(this, _selectedOptions, []);

  _classPrivateMethodGet(this, _handleClearSelectionBtn, _handleClearSelectionBtn2).call(this);

  _classPrivateMethodGet(this, _handlePlaceholder, _handlePlaceholder2).call(this);

  _classPrivateMethodGet(this, _dispatchEvent, _dispatchEvent2).call(this, {
    action: "CLEAR_ALL_OPTIONS",
    selection: _classPrivateFieldGet(this, _selectedOptions)
  });
}

function _closeList2() {
  _classPrivateFieldGet(this, _domElements).input.value = "";

  _classPrivateFieldGet(this, _domElements).optionsContainer.classList.remove("visible");

  _classPrivateMethodGet(this, _filterOptions, _filterOptions2).call(this, "");

  _classPrivateMethodGet(this, _removeAllArrowSelected, _removeAllArrowSelected2).call(this);
}

function _dispatchEvent2(event) {
  _classPrivateFieldGet(this, _event).call(this, event);
}

function _enableEventListenners2() {
  var _this3 = this;

  document.addEventListener("mouseup", function (_ref2) {
    var target = _ref2.target;

    if (!_classPrivateFieldGet(_this3, _multiselect).contains(target)) {
      _classPrivateMethodGet(_this3, _filterOptions, _filterOptions2).call(_this3, "");

      _classPrivateMethodGet(_this3, _closeList, _closeList2).call(_this3);

      _classPrivateMethodGet(_this3, _handlePlaceholder, _handlePlaceholder2).call(_this3);
    }
  });

  _classPrivateFieldGet(this, _domElements).clear.addEventListener("click", function () {
    _classPrivateMethodGet(_this3, _clearSelection, _clearSelection2).call(_this3);
  });

  for (var i = 0; i < _classPrivateFieldGet(this, _domElements).options.list.length; i++) {
    var option = _classPrivateFieldGet(this, _domElements).options.list[i];

    option.addEventListener("click", function (_ref3) {
      var target = _ref3.target;

      _classPrivateMethodGet(_this3, _handleOption, _handleOption2).call(_this3, target);

      _classPrivateMethodGet(_this3, _closeList, _closeList2).call(_this3);
    });
  }

  _classPrivateFieldGet(this, _domElements).input.addEventListener("focus", function () {
    _classPrivateFieldGet(_this3, _domElements).optionsContainer.classList.add("visible");

    _classPrivateFieldGet(_this3, _domElements).input.placeholder = "";
  });

  _classPrivateFieldGet(this, _domElements).input.addEventListener("input", function (_ref4) {
    var value = _ref4.target.value;

    if (_classPrivateFieldGet(_this3, _domElements).options.list.length > 0) {
      _classPrivateMethodGet(_this3, _filterOptions, _filterOptions2).call(_this3, value);
    }
  });

  _classPrivateFieldGet(this, _domElements).input.addEventListener("keydown", function (e) {
    _classPrivateMethodGet(_this3, _handleArrows, _handleArrows2).call(_this3, e);

    _classPrivateMethodGet(_this3, _handleBackspace, _handleBackspace2).call(_this3, e);

    _classPrivateMethodGet(_this3, _handleEnter, _handleEnter2).call(_this3, e);
  });
}

function _filterOptions2(value) {
  var _this4 = this;

  var isOpen = _classPrivateFieldGet(this, _domElements).optionsContainer.classList.contains("visible");

  var valueLowerCase = value.toLowerCase();

  if (!isOpen && value.length > 0) {
    _classPrivateFieldGet(this, _domElements).optionsContainer.classList.add("visible");
  }

  if (_classPrivateFieldGet(this, _domElements).options.list.length > 0) {
    for (var i = 0; i < _classPrivateFieldGet(this, _domElements).options.list.length; i++) {
      var el = _classPrivateFieldGet(this, _domElements).options.list[i];

      var text = _classPrivateFieldGet(this, _itemTemplate) ? _classPrivateFieldGet(this, _data)[i][_classPrivateFieldGet(this, _textField)] : el.textContent;

      if (text.toLowerCase().substring(0, valueLowerCase.length) === valueLowerCase) {
        _classPrivateFieldGet(this, _domElements).optionsContainerList.appendChild(el);
      } else {
        el.parentNode && el.parentNode.removeChild(el);
      }
    }

    var hasResults = _classPrivateFieldGet(this, _domElements).options.some(function (el, index) {
      return (_classPrivateFieldGet(_this4, _itemTemplate) ? _classPrivateFieldGet(_this4, _data)[index][_classPrivateFieldGet(_this4, _textField)] : el.textContent).toLowerCase().substring(0, valueLowerCase.length) === valueLowerCase;
    });

    _classPrivateMethodGet(this, _showNoResults, _showNoResults2).call(this, !hasResults);
  }
}

function _generateId2(length) {
  var result = "";
  var characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  var charactersLength = characters.length;

  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }

  return result;
}

function _getDataFromSelectTag2() {
  var arr = [];

  var _classPrivateFieldGet3 = _classPrivateFieldGet(this, _selectContainer),
      options = _classPrivateFieldGet3.options;

  for (var i = 0; i < options.length; i++) {
    arr.push({
      text: options[i].text,
      value: options[i].value
    });
  }

  return arr;
}

function _getDataFromSettings2() {
  if (_classPrivateFieldGet(this, _data).length > 0 && _classPrivateFieldGet(this, _valueField) && _classPrivateFieldGet(this, _textField)) {
    var isValueFieldValid = typeof _classPrivateFieldGet(this, _valueField) === "string";
    var isTextFieldValid = typeof _classPrivateFieldGet(this, _textField) === "string";
    var arr = [];

    if (!isValueFieldValid || !isTextFieldValid) {
      throw new Error("textField and valueField must be of type string");
    }

    for (var i = 0; i < _classPrivateFieldGet(this, _data).length; i++) {
      var item = _classPrivateFieldGet(this, _data)[i];

      arr.push({
        value: item[_classPrivateFieldGet(this, _valueField)],
        text: item[_classPrivateFieldGet(this, _textField)]
      });
    }

    return arr;
  } else {
    return null;
  }
}

function _handleArrows2(event) {
  if (event.keyCode === 40 || event.keyCode === 38) {
    var isOpen = _classPrivateFieldGet(this, _domElements).optionsContainer.classList.contains("visible"); 


    var optionsContainerList = _classPrivateFieldGet(this, _multiselect).querySelector(".multiselect__options > ul");

    if (!isOpen) {
      _classPrivateFieldGet(this, _domElements).optionsContainer.classList.add("visible");

      optionsContainerList.firstElementChild.classList.add("arrow-selected");
      optionsContainerList.firstElementChild.scrollIntoView();
    } else {
      var selected = _classPrivateFieldGet(this, _multiselect).querySelector(".multiselect__options ul li.arrow-selected");

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

        _classPrivateMethodGet(this, _scrollIntoView, _scrollIntoView2).call(this, optionsContainerList, selected);

        return;
      }

      selected.classList.add("arrow-selected");

      _classPrivateMethodGet(this, _scrollIntoView, _scrollIntoView2).call(this, optionsContainerList, selected);
    }
  }
}

function _handleBackspace2(e) {
  if (e.keyCode === 8 && e.target.value === "") {
    var lastSelectedOption = _classPrivateFieldGet(this, _selectedOptions).length > 0 ? _classPrivateFieldGet(this, _selectedOptions)[_classPrivateFieldGet(this, _selectedOptions).length - 1] : null;

    if (lastSelectedOption) {
      var targetLastSelectedOption = _classPrivateFieldGet(this, _multiselect).querySelector("li[data-value=\"".concat(lastSelectedOption.value, "\"]"));

      _classPrivateMethodGet(this, _handleOption, _handleOption2).call(this, targetLastSelectedOption);

      if (_classPrivateFieldGet(this, _selectedOptions).length === 0) {
        _classPrivateFieldGet(this, _domElements).optionsContainer.classList.remove("visible");
      }
    }
  }
}

function _handleClearSelectionBtn2() {
  if (_classPrivateFieldGet(this, _selectedOptions).length > 0) {
    _classPrivateFieldGet(this, _domElements).clear.style.display = "flex";
  } else {
    _classPrivateFieldGet(this, _domElements).clear.style.display = "none";
  }
}

function _handleEnter2(event) {
  if (event.keyCode === 13) {
    var selected = _classPrivateFieldGet(this, _multiselect).querySelector(".multiselect__options ul li.arrow-selected");

    if (selected) {
      _classPrivateMethodGet(this, _handleOption, _handleOption2).call(this, selected);

      _classPrivateMethodGet(this, _closeList, _closeList2).call(this);
    }
  }
}

function _handleOption2(target) {
  var dispatchEvent = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

  for (var i = 0; i < _classPrivateFieldGet(this, _selectedOptions).length; i++) {
    var el = _classPrivateFieldGet(this, _selectedOptions)[i];

    if (el.value == target.dataset.value) {
      target.classList.remove("multiselect__options--selected");

      _classPrivateFieldGet(this, _selectedOptions).splice(i, 1);

      _classPrivateMethodGet(this, _removeOptionFromList, _removeOptionFromList2).call(this, target.dataset.value);

      _classPrivateMethodGet(this, _handleClearSelectionBtn, _handleClearSelectionBtn2).call(this);

      _classPrivateMethodGet(this, _handlePlaceholder, _handlePlaceholder2).call(this);

      return dispatchEvent && _classPrivateMethodGet(this, _dispatchEvent, _dispatchEvent2).call(this, {
        action: "REMOVE_OPTION",
        value: target.dataset.value,
        selection: _classPrivateFieldGet(this, _selectedOptions)
      });
    }
  } 


  for (var _i = 0; _i < _classPrivateFieldGet(this, _options).length; _i++) {
    var option = _classPrivateFieldGet(this, _options)[_i];

    if (option.value == target.dataset.value) {
      target.classList.add("multiselect__options--selected");

      _classPrivateFieldSet(this, _selectedOptions, [].concat(_toConsumableArray(_classPrivateFieldGet(this, _selectedOptions)), [option]));

      _classPrivateMethodGet(this, _addOptionToList, _addOptionToList2).call(this, option, _i);

      _classPrivateMethodGet(this, _handleClearSelectionBtn, _handleClearSelectionBtn2).call(this);

      _classPrivateMethodGet(this, _handlePlaceholder, _handlePlaceholder2).call(this);

      return dispatchEvent && _classPrivateMethodGet(this, _dispatchEvent, _dispatchEvent2).call(this, {
        action: "ADD_OPTION",
        value: target.dataset.value,
        selection: _classPrivateFieldGet(this, _selectedOptions)
      });
    }
  }
}

function _handlePlaceholder2() {
  if (_classPrivateFieldGet(this, _selectedOptions).length > 0) {
    _classPrivateFieldGet(this, _domElements).input.placeholder = "";
  } else {
    _classPrivateFieldGet(this, _domElements).input.placeholder = _classPrivateFieldGet(this, _placeholder);
  }
}

function _processTemplate2(template, index) {
  var processedTemplate = template;
  var objAttr = template.match(/\$\{(\w+)\}/g).map(function (e) {
    return e.replace(/\$\{|\}/g, "");
  });

  for (var i = 0; i < objAttr.length; i++) {
    var _classPrivateFieldGet4;

    var attr = objAttr[i];
    processedTemplate = processedTemplate.replace("${".concat(attr, "}"), (_classPrivateFieldGet4 = _classPrivateFieldGet(this, _data)[index][attr]) !== null && _classPrivateFieldGet4 !== void 0 ? _classPrivateFieldGet4 : "");
  }

  return processedTemplate;
}

function _removeAllArrowSelected2() {
  var className = "arrow-selected";

  var target = _classPrivateFieldGet(this, _domElements).options.find(function (el) {
    return el.classList.contains(className);
  });

  target && target.classList.remove(className);
}

function _removeOptionFromList2(value) {
  var optionDom = _classPrivateFieldGet(this, _multiselect).querySelector("span[data-value=\"".concat(value, "\"]"));

  optionDom && optionDom.parentNode && optionDom.parentNode.removeChild(optionDom);
}

function _renderOptionsList2() {
  var _this5 = this;

  var html = "\n        <div class=\"multiselect__options\">\n          <ul>\n          ".concat(_classPrivateFieldGet(this, _options).length > 0 && !_classPrivateFieldGet(this, _itemTemplate) ? _classPrivateFieldGet(this, _options).map(function (option) {
    return "\n              <li data-value=\"".concat(option.value, "\">").concat(option.text, "</li>\n            ");
  }).join("") : "", "\n\n          ").concat(_classPrivateFieldGet(this, _options).length > 0 && _classPrivateFieldGet(this, _itemTemplate) ? _classPrivateFieldGet(this, _options).map(function (option, index) {
    return "\n              <li data-value=\"".concat(option.value, "\">").concat(_classPrivateMethodGet(_this5, _processTemplate, _processTemplate2).call(_this5, _classPrivateFieldGet(_this5, _itemTemplate), index), "</li>\n            ");
  }).join("") : "", "\n          ").concat(_classPrivateMethodGet(this, _showNoData, _showNoData2).call(this, _classPrivateFieldGet(this, _options).length === 0), "\n          </ul>\n        </div>\n      ");

  _classPrivateFieldGet(this, _multiselect).insertAdjacentHTML("beforeend", html);
}

function _renderMultiselect2() {
  _classPrivateFieldGet(this, _selectContainer).style.display = "none";

  var id = "iconic-" + _classPrivateMethodGet(this, _generateId, _generateId2).call(this, 20);

  var html = "\n      <div id=\"".concat(id, "\" class=\"multiselect__container\">\n        <div class=\"multiselect__wrapper\">\n          <input class=\"multiselect__input\" placeholder=\"").concat(_classPrivateFieldGet(this, _placeholder), "\" />\n        </div>\n        <span style=\"display: none;\" class=\"multiselect__clear-btn\">").concat(_classPrivateFieldGet(this, _cross), "</span>\n      </div>\n    ");

  _classPrivateFieldGet(this, _selectContainer).insertAdjacentHTML("afterend", html);

  _classPrivateFieldSet(this, _multiselect, document.querySelector("#".concat(id)));
}

function _scrollIntoView2(parent, child) {
  var rectParent = parent.getBoundingClientRect();
  var rectChild = child.getBoundingClientRect(); 

  if (!(rectParent.top < rectChild.bottom - child.offsetHeight)) {
    parent.scrollTop = child.clientHeight + (child.offsetTop - child.offsetHeight);
  } 


  if (!(rectParent.bottom > rectChild.top + child.offsetHeight)) {
    parent.scrollTop = child.clientHeight + (child.offsetTop - child.offsetHeight) - (parent.offsetHeight - (child.offsetHeight + (child.offsetHeight - child.clientHeight)));
  }
}

function _showNoData2(condition) {
  return condition ? "<p class=\"multiselect__options--no-data\">".concat(_classPrivateFieldGet(this, _noData), "</p>") : "";
}

function _showNoResults2(condition) {
  var dom = _classPrivateFieldGet(this, _multiselect).querySelector(".multiselect__options--no-results");

  if (condition) {
    var html = "<p class=\"multiselect__options--no-results\">".concat(_classPrivateFieldGet(this, _noResults), "</p>");
    !dom && _classPrivateFieldGet(this, _domElements).optionsContainerList.insertAdjacentHTML("beforeend", html);
  } else {
    dom && dom.parentNode && dom.parentNode.removeChild(dom);
  }
}