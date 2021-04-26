/*!  Polyfill service v3.104.0
 * 
 * For detailed credits and licence information see https://github.com/financial-times/polyfill-service.
 * 
 * Features requested: Array.from,Array.prototype.find,String.prototype.startsWith
 * 
 * - _ESAbstract.ArrayCreate, License: CC0 (required by "Array.from")
 * - _ESAbstract.Call, License: CC0 (required by "String.prototype.startsWith", "_ESAbstract.ToString", "_ESAbstract.ToPrimitive", "_ESAbstract.OrdinaryToPrimitive")
 * - _ESAbstract.CreateDataProperty, License: CC0 (required by "Array.from", "Set", "_ESAbstract.CreateIterResultObject")
 * - _ESAbstract.CreateDataPropertyOrThrow, License: CC0 (required by "Array.from")
 * - _ESAbstract.CreateMethodProperty, License: CC0 (required by "Array.from", "Set", "Symbol", "Object.getOwnPropertyNames", "Array.prototype.includes")
 * - _ESAbstract.Get, License: CC0 (required by "Array.from", "Set", "Symbol", "Object.getOwnPropertyNames", "Array.prototype.includes")
 * - _ESAbstract.HasOwnProperty, License: CC0 (required by "Array.from", "Set", "Symbol", "Object.getOwnPropertyDescriptor")
 * - _ESAbstract.IsCallable, License: CC0 (required by "String.prototype.startsWith", "_ESAbstract.ToString", "_ESAbstract.ToPrimitive", "_ESAbstract.OrdinaryToPrimitive")
 * - _ESAbstract.RequireObjectCoercible, License: CC0 (required by "String.prototype.startsWith")
 * - _ESAbstract.SameValueNonNumber, License: CC0 (required by "Array.from", "Set", "_ESAbstract.SameValueZero")
 * - _ESAbstract.ToBoolean, License: CC0 (required by "Array.from", "Set", "_ESAbstract.IteratorComplete")
 * - _ESAbstract.ToObject, License: CC0 (required by "Array.from", "Set", "Symbol", "Object.getOwnPropertyNames", "Array.prototype.includes")
 * - _ESAbstract.GetV, License: CC0 (required by "Array.from", "_ESAbstract.GetIterator")
 * - _ESAbstract.GetMethod, License: CC0 (required by "String.prototype.startsWith", "_ESAbstract.ToString", "_ESAbstract.ToPrimitive")
 * - _ESAbstract.Type, License: CC0 (required by "Array.from", "Set", "Symbol", "Object.getOwnPropertyDescriptor", "_ESAbstract.ToPropertyKey")
 * - _ESAbstract.CreateIterResultObject, License: CC0 (required by "Array.from", "Set")
 * - _ESAbstract.GetPrototypeFromConstructor, License: CC0 (required by "Array.from", "Set", "_ESAbstract.OrdinaryCreateFromConstructor")
 * - _ESAbstract.OrdinaryCreateFromConstructor, License: CC0 (required by "Array.from", "Set")
 * - _ESAbstract.IsConstructor, License: CC0 (required by "Array.from", "_ESAbstract.Construct")
 * - _ESAbstract.Construct, License: CC0 (required by "Array.from")
 * - _ESAbstract.IsRegExp, License: CC0 (required by "String.prototype.startsWith")
 * - _ESAbstract.IteratorClose, License: CC0 (required by "Array.from", "Set")
 * - _ESAbstract.IteratorComplete, License: CC0 (required by "Array.from", "Set")
 * - _ESAbstract.IteratorNext, License: CC0 (required by "Array.from", "Set")
 * - _ESAbstract.IteratorStep, License: CC0 (required by "Array.from", "Set")
 * - _ESAbstract.IteratorValue, License: CC0 (required by "Array.from", "Set")
 * - _ESAbstract.OrdinaryToPrimitive, License: CC0 (required by "String.prototype.startsWith", "_ESAbstract.ToString", "_ESAbstract.ToPrimitive")
 * - _ESAbstract.SameValueZero, License: CC0 (required by "Array.from", "Set", "Symbol", "Object.getOwnPropertyNames", "Array.prototype.includes")
 * - _ESAbstract.ToInteger, License: CC0 (required by "Array.from", "Set", "Symbol", "Object.getOwnPropertyNames", "Array.prototype.includes")
 * - _ESAbstract.ToLength, License: CC0 (required by "Array.from", "Set", "Symbol", "Object.getOwnPropertyNames", "Array.prototype.includes")
 * - _ESAbstract.ToPrimitive, License: CC0 (required by "Array.from", "Set", "Symbol", "Object.getOwnPropertyDescriptor", "_ESAbstract.ToPropertyKey")
 * - _ESAbstract.ToString, License: CC0 (required by "Array.from", "Set", "Symbol", "Object.getOwnPropertyDescriptor", "_ESAbstract.ToPropertyKey")
 * - _ESAbstract.ToPropertyKey, License: CC0 (required by "Array.from", "Set", "Symbol", "Object.getOwnPropertyDescriptor")
 * - Array.prototype.find, License: CC0
 * - Array.prototype.includes, License: MIT (required by "Array.from", "Set", "Symbol", "Object.getOwnPropertyNames")
 * - Object.getOwnPropertyDescriptor, License: CC0 (required by "Array.from", "Set", "Symbol")
 * - Object.isExtensible, License: CC0 (required by "Array.from", "Map")
 * - Object.keys, License: MIT (required by "Array.from", "Set", "Symbol", "Object.getOwnPropertyNames")
 * - Object.getOwnPropertyNames, License: CC0 (required by "Array.from", "Set", "Symbol")
 * - String.prototype.startsWith, License: CC0
 * - Symbol, License: MIT (required by "Array.from", "Set", "Symbol.species")
 * - Symbol.iterator, License: MIT (required by "Array.from", "Set")
 * - _ESAbstract.GetIterator, License: CC0 (required by "Array.from", "Set")
 * - Symbol.species, License: MIT (required by "Array.from", "Set")
 * - Map, License: CC0 (required by "Array.from")
 * - Set, License: CC0 (required by "Array.from")
 * - Array.from, License: CC0 */

(function(self, undefined) {

function ArrayCreate(length ) { 
	if (1 / length === -Infinity) {
		length = 0;
	}
	if (length > (Math.pow(2, 32) - 1)) {
		throw new RangeError('Invalid array length');
	}
	var A = [];
	A.length = length;
	return A;
}

function Call(F, V ) { 
	var argumentsList = arguments.length > 2 ? arguments[2] : [];
	if (IsCallable(F) === false) {
		throw new TypeError(Object.prototype.toString.call(F) + 'is not a function.');
	}
	return F.apply(V, argumentsList);
}

function CreateDataProperty(O, P, V) { 
	var newDesc = {
		value: V,
		writable: true,
		enumerable: true,
		configurable: true
	};
	try {
		Object.defineProperty(O, P, newDesc);
		return true;
	} catch (e) {
		return false;
	}
}

function CreateDataPropertyOrThrow(O, P, V) { 
	var success = CreateDataProperty(O, P, V);
	if (!success) {
		throw new TypeError('Cannot assign value `' + Object.prototype.toString.call(V) + '` to property `' + Object.prototype.toString.call(P) + '` on object `' + Object.prototype.toString.call(O) + '`');
	}
	return success;
}

function CreateMethodProperty(O, P, V) { 
	var newDesc = {
		value: V,
		writable: true,
		enumerable: false,
		configurable: true
	};
	Object.defineProperty(O, P, newDesc);
}

function Get(O, P) { 
	return O[P];
}

function HasOwnProperty(o, p) { 
	return Object.prototype.hasOwnProperty.call(o, p);
}

function IsCallable(argument) { 
	return typeof argument === 'function';
}

function RequireObjectCoercible(argument) { 
	if (argument === null || argument === undefined) {
		throw TypeError(Object.prototype.toString.call(argument) + ' is not coercible to Object.');
	}
  return argument;
}

function SameValueNonNumber(x, y) { 
	return x === y;
}

function ToBoolean(argument) { 
	return Boolean(argument);
}

function ToObject(argument) { 
	if (argument === null || argument === undefined) {
		throw TypeError();
	}
  return Object(argument);
}

function GetV(v, p) { 
	var o = ToObject(v);
	return o[p];
}

function GetMethod(V, P) { 
	var func = GetV(V, P);
	if (func === null || func === undefined) {
		return undefined;
	}
	if (IsCallable(func) === false) {
		throw new TypeError('Method not callable: ' + P);
	}
	return func;
}

function Type(x) { 
	switch (typeof x) {
		case 'undefined':
			return 'undefined';
		case 'boolean':
			return 'boolean';
		case 'number':
			return 'number';
		case 'string':
			return 'string';
		case 'symbol':
			return 'symbol';
		default:
			if (x === null) return 'null';
			if ('Symbol' in self && (x instanceof self.Symbol || x.constructor === self.Symbol)) return 'symbol';

			return 'object';
	}
}

function CreateIterResultObject(value, done) { 
	if (Type(done) !== 'boolean') {
		throw new Error();
	}
	var obj = {};
	CreateDataProperty(obj, "value", value);
	CreateDataProperty(obj, "done", done);
	return obj;
}

function GetPrototypeFromConstructor(constructor, intrinsicDefaultProto) { 
	var proto = Get(constructor, "prototype");
	if (Type(proto) !== 'object') {
		proto = intrinsicDefaultProto;
	}
	return proto;
}

function OrdinaryCreateFromConstructor(constructor, intrinsicDefaultProto) { 
	var internalSlotsList = arguments[2] || {};
	var proto = GetPrototypeFromConstructor(constructor, intrinsicDefaultProto);

	var obj = Object.create(proto);
	for (var name in internalSlotsList) {
		if (Object.prototype.hasOwnProperty.call(internalSlotsList, name)) {
			Object.defineProperty(obj, name, {
				configurable: true,
				enumerable: false,
				writable: true,
				value: internalSlotsList[name]
			});
		}
	}
	return obj;
}

function IsConstructor(argument) { 
	if (Type(argument) !== 'object') {
		return false;
	}
	return typeof argument === 'function' && !!argument.prototype;
}

function Construct(F ) { 
	var newTarget = arguments.length > 2 ? arguments[2] : F;

	var argumentsList = arguments.length > 1 ? arguments[1] : [];

	if (!IsConstructor(F)) {
		throw new TypeError('F must be a constructor.');
	}

	if (!IsConstructor(newTarget)) {
		throw new TypeError('newTarget must be a constructor.');
	}

	if (newTarget === F) {
		return new (Function.prototype.bind.apply(F, [null].concat(argumentsList)))();
	} else {
		var obj = OrdinaryCreateFromConstructor(newTarget, Object.prototype);
		return Call(F, obj, argumentsList);
	}
}

function IsRegExp(argument) { 
	if (Type(argument) !== 'object') {
		return false;
	}
	var matcher = 'Symbol' in self && 'match' in self.Symbol ? Get(argument, self.Symbol.match) : undefined;
	if (matcher !== undefined) {
		return ToBoolean(matcher);
	}
	try {
		var lastIndex = argument.lastIndex;
		argument.lastIndex = 0;
		RegExp.prototype.exec.call(argument);
		return true;
	} catch (e) {} finally {
		argument.lastIndex = lastIndex;
	}
	return false;
}

function IteratorClose(iteratorRecord, completion) { 
	if (Type(iteratorRecord['[[Iterator]]']) !== 'object') {
		throw new Error(Object.prototype.toString.call(iteratorRecord['[[Iterator]]']) + 'is not an Object.');
	}
	var iterator = iteratorRecord['[[Iterator]]'];
	var returnMethod = GetMethod(iterator, "return");
	if (returnMethod === undefined) {
		return completion;
	}
	try {
		var innerResult = Call(returnMethod, iterator);
	} catch (error) {
		var innerException = error;
	}
	if (completion) {
		return completion;
	}
	if (innerException) {
		throw innerException;
	}
	if (Type(innerResult) !== 'object') {
		throw new TypeError("Iterator's return method returned a non-object.");
	}
	return completion;
}

function IteratorComplete(iterResult) { 
	if (Type(iterResult) !== 'object') {
		throw new Error(Object.prototype.toString.call(iterResult) + 'is not an Object.');
	}
	return ToBoolean(Get(iterResult, "done"));
}

function IteratorNext(iteratorRecord ) { 
	if (arguments.length < 2) {
		var result = Call(iteratorRecord['[[NextMethod]]'], iteratorRecord['[[Iterator]]']);
	} else {
		result = Call(iteratorRecord['[[NextMethod]]'], iteratorRecord['[[Iterator]]'], [arguments[1]]);
	}
	if (Type(result) !== 'object') {
		throw new TypeError('bad iterator');
	}
	return result;
}

function IteratorStep(iteratorRecord) { 
	var result = IteratorNext(iteratorRecord);
	var done = IteratorComplete(result);
	if (done === true) {
		return false;
	}
	return result;
}

function IteratorValue(iterResult) { 
	if (Type(iterResult) !== 'object') {
		throw new Error(Object.prototype.toString.call(iterResult) + 'is not an Object.');
	}
	return Get(iterResult, "value");
}

function OrdinaryToPrimitive(O, hint) { 
	if (hint === 'string') {
		var methodNames = ['toString', 'valueOf'];
	} else {
		methodNames = ['valueOf', 'toString'];
	}
	for (var i = 0; i < methodNames.length; ++i) {
		var name = methodNames[i];
		var method = Get(O, name);
		if (IsCallable(method)) {
			var result = Call(method, O);
			if (Type(result) !== 'object') {
				return result;
			}
		}
	}
	throw new TypeError('Cannot convert to primitive.');
}

function SameValueZero (x, y) { 
	if (Type(x) !== Type(y)) {
		return false;
	}
	if (Type(x) === 'number') {
		if (isNaN(x) && isNaN(y)) {
			return true;
		}
		if (1/x === Infinity && 1/y === -Infinity) {
			return true;
		}
		if (1/x === -Infinity && 1/y === Infinity) {
			return true;
		}
		if (x === y) {
			return true;
		}
		return false;
	}
	return SameValueNonNumber(x, y);
}

function ToInteger(argument) { 
	if (Type(argument) === 'symbol') {
		throw new TypeError('Cannot convert a Symbol value to a number');
	}

	var number = Number(argument);
	if (isNaN(number)) {
		return 0;
	}
	if (1/number === Infinity || 1/number === -Infinity || number === Infinity || number === -Infinity) {
		return number;
	}
	return ((number < 0) ? -1 : 1) * Math.floor(Math.abs(number));
}

function ToLength(argument) { 
	var len = ToInteger(argument);
	if (len <= 0) {
		return 0;
	}
	return Math.min(len, Math.pow(2, 53) -1);
}

function ToPrimitive(input ) { 
	var PreferredType = arguments.length > 1 ? arguments[1] : undefined;
	if (Type(input) === 'object') {
		if (arguments.length < 2) {
			var hint = 'default';
		} else if (PreferredType === String) {
			hint = 'string';
		} else if (PreferredType === Number) {
			hint = 'number';
		}
		var exoticToPrim = typeof self.Symbol === 'function' && typeof self.Symbol.toPrimitive === 'symbol' ? GetMethod(input, self.Symbol.toPrimitive) : undefined;
		if (exoticToPrim !== undefined) {
			var result = Call(exoticToPrim, input, [hint]);
			if (Type(result) !== 'object') {
				return result;
			}
			throw new TypeError('Cannot convert exotic object to primitive.');
		}
		if (hint === 'default') {
			hint = 'number';
		}
		return OrdinaryToPrimitive(input, hint);
	}
	return input;
}
function ToString(argument) { 
	switch(Type(argument)) {
		case 'symbol':
			throw new TypeError('Cannot convert a Symbol value to a string');
		case 'object':
			var primValue = ToPrimitive(argument, String);
			return ToString(primValue); 
		default:
			return String(argument);
	}
}

function ToPropertyKey(argument) { 
	var key = ToPrimitive(argument, String);
	if (Type(key) === 'symbol') {
		return key;
	}
	return ToString(key);
}

CreateMethodProperty(Array.prototype, 'find', function find( predicate ) {
	var O = ToObject(this);
	var len = ToLength(Get(O, "length"));
	if (IsCallable(predicate) === false) {
		throw new TypeError(predicate + ' is not a function');
	}
	var T = arguments.length > 1 ? arguments[1] : undefined;
	var k = 0;
	while (k < len) {
		var Pk = ToString(k);
		var kValue = Get(O, Pk);
		var testResult = ToBoolean(Call(predicate, T, [kValue, k, O ]));
		if (testResult) {
			return kValue;
		}
		k = k + 1;
	}
	return undefined;
});

CreateMethodProperty(Array.prototype, 'includes', function includes(searchElement ) {
	'use strict';
	var O = ToObject(this);
	var len = ToLength(Get(O, "length"));
	if (len === 0) {
		return false;
	}
	var n = ToInteger(arguments[1]);
	if (n >= 0) {
		var k = n;
	} else {
		k = len + n;
		if (k < 0) {
			k = 0;
		}
	}
	while (k < len) {
		var elementK = Get(O, ToString(k));
		if (SameValueZero(searchElement, elementK)) {
			return true;
		}
		k = k + 1;
	}
	return false;
});

(function () {
	var nativeGetOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;

	var supportsDOMDescriptors = (function () {
		try {
			return Object.defineProperty(document.createElement('div'), 'one', {
				get: function () {
					return 1;
				}
			}).one === 1;
		} catch (e) {
			return false;
		}
	});

	var toString = ({}).toString;
	var split = ''.split;

	CreateMethodProperty(Object, 'getOwnPropertyDescriptor', function getOwnPropertyDescriptor(O, P) {
		var obj = ToObject(O);
		obj = (Type(obj) === 'string' || obj instanceof String) && toString.call(O) == '[object String]' ? split.call(O, '') : Object(O);

		var key = ToPropertyKey(P);

		if (supportsDOMDescriptors) {
			try {
				return nativeGetOwnPropertyDescriptor(obj, key);
			} catch (error) {}
		}
		if (HasOwnProperty(obj, key)) {
			return {
				enumerable: true,
				configurable: true,
				writable: true,
				value: obj[key]
			};
		}
	});
}());

(function (nativeIsExtensible) {
    CreateMethodProperty(Object, 'isExtensible', function isExtensible(O) {
        if (Type(O) !== "object") {
            return false;
        }
        return nativeIsExtensible ? nativeIsExtensible(O) : true;
    });
}(Object.isExtensible));

CreateMethodProperty(Object, "keys", (function() {
	'use strict';

	var has = Object.prototype.hasOwnProperty;
	var toStr = Object.prototype.toString;
	var isEnumerable = Object.prototype.propertyIsEnumerable;
	var hasDontEnumBug = !isEnumerable.call({ toString: null }, 'toString');
	var hasPrototypeEnumBug = isEnumerable.call(function () { }, 'prototype');
	function hasProtoEnumBug() {
		var createdObj;
		try {
			createdObj = Object.create({});
		} catch (e) {
			return true;
		}

		return isEnumerable.call(createdObj, '__proto__')
	}

	var dontEnums = [
		'toString',
		'toLocaleString',
		'valueOf',
		'hasOwnProperty',
		'isPrototypeOf',
		'propertyIsEnumerable',
		'constructor'
	];
	var equalsConstructorPrototype = function (o) {
		var ctor = o.constructor;
		return ctor && ctor.prototype === o;
	};
	var excludedKeys = {
		$console: true,
		$external: true,
		$frame: true,
		$frameElement: true,
		$frames: true,
		$innerHeight: true,
		$innerWidth: true,
		$outerHeight: true,
		$outerWidth: true,
		$pageXOffset: true,
		$pageYOffset: true,
		$parent: true,
		$scrollLeft: true,
		$scrollTop: true,
		$scrollX: true,
		$scrollY: true,
		$self: true,
		$webkitIndexedDB: true,
		$webkitStorageInfo: true,
		$window: true
	};
	var hasAutomationEqualityBug = (function () {
		if (typeof window === 'undefined') { return false; }
		for (var k in window) {
			try {
				if (!excludedKeys['$' + k] && has.call(window, k) && window[k] !== null && typeof window[k] === 'object') {
					try {
						equalsConstructorPrototype(window[k]);
					} catch (e) {
						return true;
					}
				}
			} catch (e) {
				return true;
			}
		}
		return false;
	}());
	var equalsConstructorPrototypeIfNotBuggy = function (o) {
		if (typeof window === 'undefined' || !hasAutomationEqualityBug) {
			return equalsConstructorPrototype(o);
		}
		try {
			return equalsConstructorPrototype(o);
		} catch (e) {
			return false;
		}
	};

	function isArgumentsObject(value) {
		var str = toStr.call(value);
		var isArgs = str === '[object Arguments]';
		if (!isArgs) {
			isArgs = str !== '[object Array]' &&
				value !== null &&
				typeof value === 'object' &&
				typeof value.length === 'number' &&
				value.length >= 0 &&
				toStr.call(value.callee) === '[object Function]';
		}
		return isArgs;
	}

	return function keys(object) {
		var isFunction = toStr.call(object) === '[object Function]';
		var isArguments = isArgumentsObject(object);
		var isString = toStr.call(object) === '[object String]';
		var theKeys = [];

		if (object === undefined || object === null) {
			throw new TypeError('Cannot convert undefined or null to object');
		}

		var skipPrototype = hasPrototypeEnumBug && isFunction;
		if (isString && object.length > 0 && !has.call(object, 0)) {
			for (var i = 0; i < object.length; ++i) {
				theKeys.push(String(i));
			}
		}

		if (isArguments && object.length > 0) {
			for (var j = 0; j < object.length; ++j) {
				theKeys.push(String(j));
			}
		} else {
			for (var name in object) {
				if (!(hasProtoEnumBug() && name === '__proto__') && !(skipPrototype && name === 'prototype') && has.call(object, name)) {
					theKeys.push(String(name));
				}
			}
		}

		if (hasDontEnumBug) {
			var skipConstructor = equalsConstructorPrototypeIfNotBuggy(object);

			for (var k = 0; k < dontEnums.length; ++k) {
				if (!(skipConstructor && dontEnums[k] === 'constructor') && has.call(object, dontEnums[k])) {
					theKeys.push(dontEnums[k]);
				}
			}
		}
		return theKeys;
	};
}()));

(function() {
  var toString = {}.toString;
  var split = "".split;
  var concat = [].concat;
  var hasOwnProperty = Object.prototype.hasOwnProperty;
  var nativeGetOwnPropertyNames = Object.getOwnPropertyNames || Object.keys;
  var cachedWindowNames =
    typeof self === "object" ? nativeGetOwnPropertyNames(self) : [];

  CreateMethodProperty(
    Object,
    "getOwnPropertyNames",
    function getOwnPropertyNames(O) {
      var object = ToObject(O);

      if (toString.call(object) === "[object Window]") {
        try {
          return nativeGetOwnPropertyNames(object);
        } catch (e) {
          return concat.call([], cachedWindowNames);
        }
      }

      object =
        toString.call(object) == "[object String]"
          ? split.call(object, "")
          : Object(object);

      var result = nativeGetOwnPropertyNames(object);
      var extraNonEnumerableKeys = ["length", "prototype"];
      for (var i = 0; i < extraNonEnumerableKeys.length; i++) {
        var key = extraNonEnumerableKeys[i];
        if (hasOwnProperty.call(object, key) && !result.includes(key)) {
          result.push(key);
        }
      }

      if (result.includes("__proto__")) {
        var index = result.indexOf("__proto__");
        result.splice(index, 1);
      }

      return result;
    }
  );
})();

CreateMethodProperty(String.prototype, 'startsWith', function startsWith(searchString ) {
	'use strict';
	var position = arguments.length > 1 ? arguments[1] : undefined;
	var O = RequireObjectCoercible(this);
	var S = ToString(O);
	var isRegExp = IsRegExp(searchString);
	if (isRegExp) {
		throw new TypeError('First argument to String.prototype.startsWith must not be a regular expression');
	}
	var searchStr = ToString(searchString);
	var pos = ToInteger(position);
	var len = S.length;
	var start = Math.min(Math.max(pos, 0), len);
	var searchLength = searchStr.length;
	if (searchLength + start > len) {
		return false;
	}
	if (S.substr(start).indexOf(searchString) === 0) {
		return true;
	}
	return false;
});

(function (Object,  GOPS, global) {
	'use strict'; 

	var supportsGetters = (function () {
		try {
			var a = {};
			Object.defineProperty(a, "t", {
				configurable: true,
				enumerable: false,
				get: function () {
					return true;
				},
				set: undefined
			});
			return !!a.t;
		} catch (e) {
			return false;
		}
	}());

	var	setDescriptor;
	var id = 0;
	var random = '' + Math.random();
	var prefix = '__\x01symbol:';
	var prefixLength = prefix.length;
	var internalSymbol = '__\x01symbol@@' + random;
	var emptySymbolLookup = {};
	var DP = 'defineProperty';
	var DPies = 'defineProperties';
	var GOPN = 'getOwnPropertyNames';
	var GOPD = 'getOwnPropertyDescriptor';
	var PIE = 'propertyIsEnumerable';
	var ObjectProto = Object.prototype;
	var hOP = ObjectProto.hasOwnProperty;
	var pIE = ObjectProto[PIE];
	var toString = ObjectProto.toString;
	var concat = Array.prototype.concat;
	var cachedWindowNames = Object.getOwnPropertyNames ? Object.getOwnPropertyNames(self) : [];
	var nGOPN = Object[GOPN];
	var gOPN = function getOwnPropertyNames (obj) {
		if (toString.call(obj) === '[object Window]') {
			try {
				return nGOPN(obj);
			} catch (e) {
				return concat.call([], cachedWindowNames);
			}
		}
		return nGOPN(obj);
	};
	var gOPD = Object[GOPD];
	var objectCreate = Object.create;
	var objectKeys = Object.keys;
	var freeze = Object.freeze || Object;
	var objectDefineProperty = Object[DP];
	var $defineProperties = Object[DPies];
	var descriptor = gOPD(Object, GOPN);
	var addInternalIfNeeded = function (o, uid, enumerable) {
		if (!hOP.call(o, internalSymbol)) {
			try {
				objectDefineProperty(o, internalSymbol, {
					enumerable: false,
					configurable: false,
					writable: false,
					value: {}
				});
			} catch (e) {
				o[internalSymbol] = {};
			}
		}
		o[internalSymbol]['@@' + uid] = enumerable;
	};
	var createWithSymbols = function (proto, descriptors) {
		var self = objectCreate(proto);
		gOPN(descriptors).forEach(function (key) {
			if (propertyIsEnumerable.call(descriptors, key)) {
				$defineProperty(self, key, descriptors[key]);
			}
		});
		return self;
	};
	var copyAsNonEnumerable = function (descriptor) {
		var newDescriptor = objectCreate(descriptor);
		newDescriptor.enumerable = false;
		return newDescriptor;
	};
	var get = function get(){};
	var onlyNonSymbols = function (name) {
		return name != internalSymbol &&
			!hOP.call(source, name);
	};
	var onlySymbols = function (name) {
		return name != internalSymbol &&
			hOP.call(source, name);
	};
	var propertyIsEnumerable = function propertyIsEnumerable(key) {
		var uid = '' + key;
		return onlySymbols(uid) ? (
			hOP.call(this, uid) &&
			this[internalSymbol] && this[internalSymbol]['@@' + uid]
		) : pIE.call(this, key);
	};
	var setAndGetSymbol = function (uid) {
		var descriptor = {
			enumerable: false,
			configurable: true,
			get: get,
			set: function (value) {
			setDescriptor(this, uid, {
				enumerable: false,
				configurable: true,
				writable: true,
				value: value
			});
			addInternalIfNeeded(this, uid, true);
			}
		};
		try {
			objectDefineProperty(ObjectProto, uid, descriptor);
		} catch (e) {
			ObjectProto[uid] = descriptor.value;
		}
		source[uid] = objectDefineProperty(
			Object(uid),
			'constructor',
			sourceConstructor
		);
		var description = gOPD(Symbol.prototype, 'description');
		if (description) {
			objectDefineProperty(
				source[uid],
				'description',
				description
			);
		}
		return freeze(source[uid]);
	};

	var symbolDescription = function (s) {
		var sym = thisSymbolValue(s);

		if (supportsInferredNames) {
			var name = getInferredName(sym);
			if (name !== "") {
				return name.slice(1, -1); 
			}
		}

		if (emptySymbolLookup[sym] !== undefined) {
			return emptySymbolLookup[sym];
		}

		var string = sym.toString();
		var randomStartIndex = string.lastIndexOf("0.");
		string = string.slice(10, randomStartIndex);

				if (string === "") {
			return undefined;
		}
		return string;
	};

	var Symbol = function Symbol() {
		var description = arguments[0];
		if (this instanceof Symbol) {
			throw new TypeError('Symbol is not a constructor');
		}

		var uid = prefix.concat(description || '', random, ++id);

		if (description !== undefined && (description === null || isNaN(description) || String(description) === "")) {
			emptySymbolLookup[uid] = String(description);
		}

		var that = setAndGetSymbol(uid);

		if (!supportsGetters) {
			Object.defineProperty(that, "description", {
				configurable: true,
				enumerable: false,
				value: symbolDescription(that)
			});
		}

		return that;
	};

	var source = objectCreate(null);
	var sourceConstructor = {value: Symbol};
	var sourceMap = function (uid) {
		return source[uid];
		};
	var $defineProperty = function defineProperty(o, key, descriptor) {
		var uid = '' + key;
		if (onlySymbols(uid)) {
			setDescriptor(o, uid, descriptor.enumerable ?
				copyAsNonEnumerable(descriptor) : descriptor);
			addInternalIfNeeded(o, uid, !!descriptor.enumerable);
		} else {
			objectDefineProperty(o, key, descriptor);
		}
		return o;
	};

	var onlyInternalSymbols = function (obj) {
		return function (name) {
			return hOP.call(obj, internalSymbol) && hOP.call(obj[internalSymbol], '@@' + name);
		};
	};
	var $getOwnPropertySymbols = function getOwnPropertySymbols(o) {
		return gOPN(o).filter(o === ObjectProto ? onlyInternalSymbols(o) : onlySymbols).map(sourceMap);
		}
	;

	descriptor.value = $defineProperty;
	objectDefineProperty(Object, DP, descriptor);

	descriptor.value = $getOwnPropertySymbols;
	objectDefineProperty(Object, GOPS, descriptor);

	descriptor.value = function getOwnPropertyNames(o) {
		return gOPN(o).filter(onlyNonSymbols);
	};
	objectDefineProperty(Object, GOPN, descriptor);

	descriptor.value = function defineProperties(o, descriptors) {
		var symbols = $getOwnPropertySymbols(descriptors);
		if (symbols.length) {
		objectKeys(descriptors).concat(symbols).forEach(function (uid) {
			if (propertyIsEnumerable.call(descriptors, uid)) {
			$defineProperty(o, uid, descriptors[uid]);
			}
		});
		} else {
		$defineProperties(o, descriptors);
		}
		return o;
	};
	objectDefineProperty(Object, DPies, descriptor);

	descriptor.value = propertyIsEnumerable;
	objectDefineProperty(ObjectProto, PIE, descriptor);

	descriptor.value = Symbol;
	objectDefineProperty(global, 'Symbol', descriptor);

	descriptor.value = function (key) {
		var uid = prefix.concat(prefix, key, random);
		return uid in ObjectProto ? source[uid] : setAndGetSymbol(uid);
	};
	objectDefineProperty(Symbol, 'for', descriptor);

	descriptor.value = function (symbol) {
		if (onlyNonSymbols(symbol))
		throw new TypeError(symbol + ' is not a symbol');
		return hOP.call(source, symbol) ?
		symbol.slice(prefixLength * 2, -random.length) :
		void 0
		;
	};
	objectDefineProperty(Symbol, 'keyFor', descriptor);

	descriptor.value = function getOwnPropertyDescriptor(o, key) {
		var descriptor = gOPD(o, key);
		if (descriptor && onlySymbols(key)) {
		descriptor.enumerable = propertyIsEnumerable.call(o, key);
		}
		return descriptor;
	};
	objectDefineProperty(Object, GOPD, descriptor);

	descriptor.value = function create(proto, descriptors) {
		return arguments.length === 1 || typeof descriptors === "undefined" ?
		objectCreate(proto) :
		createWithSymbols(proto, descriptors);
	};

	objectDefineProperty(Object, 'create', descriptor);

	var strictModeSupported = (function(){ 'use strict'; return this; }).call(null) === null;
	if (strictModeSupported) {
		descriptor.value = function () {
			var str = toString.call(this);
			return (str === '[object String]' && onlySymbols(this)) ? '[object Symbol]' : str;
		};
	} else {
		descriptor.value = function () {
			if (this === window) {
				return '[object Null]';
			}

			var str = toString.call(this);
			return (str === '[object String]' && onlySymbols(this)) ? '[object Symbol]' : str;
		};
	}
	objectDefineProperty(ObjectProto, 'toString', descriptor);

	setDescriptor = function (o, key, descriptor) {
		var protoDescriptor = gOPD(ObjectProto, key);
		delete ObjectProto[key];
		objectDefineProperty(o, key, descriptor);
		if (o !== ObjectProto) {
			objectDefineProperty(ObjectProto, key, protoDescriptor);
		}
	};

	function thisSymbolValue(value) {
		if (Type(value) === "symbol") {
			return value;
		}
		throw TypeError(value + " is not a symbol");
	}

	if (function () {
		try {
			var a = {};
			Object.defineProperty(a, "t", {
				configurable: true,
				enumerable: false,
				get: function() {
					return true;
				},
				set: undefined
			});
			return !!a.t;
		} catch (e) {
			return false;
		}
	}()) {
		var getInferredName;
		try {
			getInferredName = Function("s", "var v = s.valueOf(); return { [v]() {} }[v].name;");
		} catch (e) { }

		var inferred = function () { };
		var supportsInferredNames = getInferredName && inferred.name === "inferred" ? getInferredName : null;


		Object.defineProperty(global.Symbol.prototype, "description", {
			configurable: true,
			enumerable: false,
			get: function () {
				var s = this;
				return symbolDescription(s);
			}
		});
	}

}(Object, 'getOwnPropertySymbols', self));

Object.defineProperty(self.Symbol, 'iterator', { value: self.Symbol('iterator') });

function GetIterator(obj ) { 
	var method = arguments.length > 1 ? arguments[1] : GetMethod(obj, Symbol.iterator);
	var iterator = Call(method, obj);
	if (Type(iterator) !== 'object') {
		throw new TypeError('bad iterator');
	}
	var nextMethod = GetV(iterator, "next");
	var iteratorRecord = Object.create(null);
	iteratorRecord['[[Iterator]]'] = iterator;
	iteratorRecord['[[NextMethod]]'] = nextMethod;
	iteratorRecord['[[Done]]'] = false;
	return iteratorRecord;
}

Object.defineProperty(Symbol, 'species', { value: Symbol('species') });

(function (global) {
	var supportsGetters = (function () {
		try {
			var a = {};
			Object.defineProperty(a, 't', {
				configurable: true,
				enumerable: false,
				get: function () {
					return true;
				},
				set: undefined
			});
			return !!a.t;
		} catch (e) {
			return false;
		}
	}());

	var _uniqueHashId = 0;
	var _metaKey = Symbol('meta_' + ((Math.random() * 100000000) + '').replace('.', ''));

	var hashKey = function(recordKey) {
		if (typeof recordKey === 'object' ? recordKey !== null : typeof recordKey === 'function') {
			if (!Object.isExtensible(recordKey)) {
				return false;
			}
			if (!Object.prototype.hasOwnProperty.call(recordKey, _metaKey)) {
				var uniqueHashKey = typeof(recordKey)+'-'+(++_uniqueHashId);
				Object.defineProperty(recordKey, _metaKey, {
					configurable: false,
					enumerable: false,
					writable: false,
					value: uniqueHashKey
				});
			}
			return recordKey[_metaKey];
		}
		return ''+recordKey;
	};

	var getRecordIndex = function(map, recordKey) {
		var hashedKey = hashKey(recordKey); 
		if (hashedKey === false) {
			return getRecordIndexSlow(map, recordKey);
		}
		var recordIndex = map._table[hashedKey]; 
		return recordIndex !== undefined ? recordIndex : false;
	};

	var getRecordIndexSlow = function(map, recordKey) {
		for (var i = 0; i < map._keys.length; i++) {
			var _recordKey = map._keys[i];
			if (_recordKey !== undefMarker && SameValueZero(_recordKey, recordKey)) {
				return i;
			}
		}
		return false;
	};

	var setHashIndex = function(map, recordKey, recordIndex) {
		var hashedKey = hashKey(recordKey);
		if (hashedKey === false) {
			return false;
		}
		if (recordIndex === false) {
			delete map._table[hashedKey];
		} else {
			map._table[hashedKey] = recordIndex;
		}
		return true;
	};

	var undefMarker = Symbol('undef');
	var Map = function Map() {
		if (!(this instanceof Map)) {
			throw new TypeError('Constructor Map requires "new"');
		}
		var map = OrdinaryCreateFromConstructor(this, Map.prototype, {
			_table: {}, 
			_keys: [],
			_values: [],
			_size: 0,
			_es6Map: true
		});

		if (!supportsGetters) {
			Object.defineProperty(map, 'size', {
				configurable: true,
				enumerable: false,
				writable: true,
				value: 0
			});
		}

		var iterable = arguments.length > 0 ? arguments[0] : undefined;

		if (iterable === null || iterable === undefined) {
			return map;
		}

		var adder = map.set;

		if (!IsCallable(adder)) {
			throw new TypeError("Map.prototype.set is not a function");
		}

		try {
			var iteratorRecord = GetIterator(iterable);
			while (true) {
				var next = IteratorStep(iteratorRecord);
				if (next === false) {
					return map;
				}
				var nextItem = IteratorValue(next);
				if (Type(nextItem) !== 'object') {
					try {
						throw new TypeError('Iterator value ' + nextItem + ' is not an entry object');
					} catch (error) {
						return IteratorClose(iteratorRecord, error);
					}
				}
				try {
					var k = nextItem[0];
					var v = nextItem[1];
					adder.call(map, k, v);
				} catch (e) {
					return IteratorClose(iteratorRecord, e);
				}
			}
		} catch (e) {
			if (Array.isArray(iterable) ||
				Object.prototype.toString.call(iterable) === '[object Arguments]' ||
				(!!iterable.callee)) {
				var index;
				var length = iterable.length;
				for (index = 0; index < length; index++) {
					adder.call(map, iterable[index][0], iterable[index][1]);
				}
			}
		}
		return map;
	};

	Object.defineProperty(Map, 'prototype', {
		configurable: false,
		enumerable: false,
		writable: false,
		value: {}
	});

	if (supportsGetters) {
		Object.defineProperty(Map, Symbol.species, {
			configurable: true,
			enumerable: false,
			get: function () {
				return this;
			},
			set: undefined
		});
	} else {
		CreateMethodProperty(Map, Symbol.species, Map);
	}

	CreateMethodProperty(Map.prototype, 'clear', function clear() {
			var M = this;
			if (Type(M) !== 'object') {
				throw new TypeError('Method Map.prototype.clear called on incompatible receiver ' + Object.prototype.toString.call(M));
			}
			if (M._es6Map !== true) {
				throw new TypeError('Method Map.prototype.clear called on incompatible receiver ' + Object.prototype.toString.call(M));
			}
			var entries = M._keys;
			for (var i = 0; i < entries.length; i++) {
				M._keys[i] = undefMarker;
				M._values[i] = undefMarker;
			}
			this._size = 0;
			if (!supportsGetters) {
				this.size = this._size;
			}
			this._table = {};
			return undefined;
		}
	);

	CreateMethodProperty(Map.prototype, 'constructor', Map);

	CreateMethodProperty(Map.prototype, 'delete', function (key) {
			var M = this;
			if (Type(M) !== 'object') {
				throw new TypeError('Method Map.prototype.clear called on incompatible receiver ' + Object.prototype.toString.call(M));
			}
			if (M._es6Map !== true) {
				throw new TypeError('Method Map.prototype.clear called on incompatible receiver ' + Object.prototype.toString.call(M));
			}
			var recordIndex = getRecordIndex(M, key); 

			if (recordIndex !== false) {
				var recordKey = M._keys[recordIndex];
				if (recordKey !== undefMarker && SameValueZero(recordKey, key)) {
					this._keys[recordIndex] = undefMarker;
					this._values[recordIndex] = undefMarker;
					this._size = --this._size;
					if (!supportsGetters) {
						this.size = this._size;
					}
					setHashIndex(this, key, false);
					return true;
				}
			}

			return false;
		}
	);

	CreateMethodProperty(Map.prototype, 'entries', function entries () {
			var M = this;
			return CreateMapIterator(M, 'key+value');
		}
	);

	CreateMethodProperty(Map.prototype, 'forEach', function (callbackFn) {
			var M = this;
			if (Type(M) !== 'object') {
				throw new TypeError('Method Map.prototype.forEach called on incompatible receiver ' + Object.prototype.toString.call(M));
			}
			if (M._es6Map !== true) {
				throw new TypeError('Method Map.prototype.forEach called on incompatible receiver ' + Object.prototype.toString.call(M));
			}
			if (!IsCallable(callbackFn)) {
				throw new TypeError(Object.prototype.toString.call(callbackFn) + ' is not a function.');
			}
			if (arguments[1]) {
				var T = arguments[1];
			}
			var entries = M._keys;
			for (var i = 0; i < entries.length; i++) {
				if (M._keys[i] !== undefMarker && M._values[i] !== undefMarker ) {
					callbackFn.call(T, M._values[i], M._keys[i], M);
				}
			}
			return undefined;
		}
	);

	CreateMethodProperty(Map.prototype, 'get', function get(key) {
			var M = this;
			if (Type(M) !== 'object') {
				throw new TypeError('Method Map.prototype.get called on incompatible receiver ' + Object.prototype.toString.call(M));
			}
			if (M._es6Map !== true) {
				throw new TypeError('Method Map.prototype.get called on incompatible receiver ' + Object.prototype.toString.call(M));
			}
			var recordIndex = getRecordIndex(M, key); 
			if (recordIndex !== false) {
				var recordKey = M._keys[recordIndex];
				if (recordKey !== undefMarker && SameValueZero(recordKey, key)) {
					return M._values[recordIndex];
				}
			}

			return undefined;
		});

	CreateMethodProperty(Map.prototype, 'has', function has (key) {
			var M = this;
			if (typeof M !== 'object') {
				throw new TypeError('Method Map.prototype.has called on incompatible receiver ' + Object.prototype.toString.call(M));
			}
			if (M._es6Map !== true) {
				throw new TypeError('Method Map.prototype.has called on incompatible receiver ' + Object.prototype.toString.call(M));
			}
			var recordIndex = getRecordIndex(M, key); 
			if (recordIndex !== false) {
				var recordKey = M._keys[recordIndex];
				if (recordKey !== undefMarker && SameValueZero(recordKey, key)) {
					return true;
				}
			}

			return false;
		});

	CreateMethodProperty(Map.prototype, 'keys', function keys () {
			var M = this;
			return CreateMapIterator(M, "key");
		});

	CreateMethodProperty(Map.prototype, 'set', function set(key, value) {
			var M = this;
			if (Type(M) !== 'object') {
				throw new TypeError('Method Map.prototype.set called on incompatible receiver ' + Object.prototype.toString.call(M));
			}
			if (M._es6Map !== true) {
				throw new TypeError('Method Map.prototype.set called on incompatible receiver ' + Object.prototype.toString.call(M));
			}
			var recordIndex = getRecordIndex(M, key); 
			if (recordIndex !== false) {
				M._values[recordIndex] = value;
			} else {
				if (key === -0) {
					key = 0;
				}
				var p = {
					'[[Key]]': key,
					'[[Value]]': value
				};
				M._keys.push(p['[[Key]]']);
				M._values.push(p['[[Value]]']);
				setHashIndex(M, key, M._keys.length - 1); 
				++M._size;
				if (!supportsGetters) {
					M.size = M._size;
				}
			}
			return M;
		});

	if (supportsGetters) {
		Object.defineProperty(Map.prototype, 'size', {
			configurable: true,
			enumerable: false,
			get: function () {
				var M = this;
				if (Type(M) !== 'object') {
					throw new TypeError('Method Map.prototype.size called on incompatible receiver ' + Object.prototype.toString.call(M));
				}
				if (M._es6Map !== true) {
					throw new TypeError('Method Map.prototype.size called on incompatible receiver ' + Object.prototype.toString.call(M));
				}
				return this._size;
			},
			set: undefined
		});
	}

	CreateMethodProperty(Map.prototype, 'values', function values () {
			var M = this;
			return CreateMapIterator(M, 'value');
		}
	);

	CreateMethodProperty(Map.prototype, Symbol.iterator, Map.prototype.entries);

	if (!('name' in Map)) {
		Object.defineProperty(Map, 'name', {
			configurable: true,
			enumerable: false,
			writable: false,
			value: 'Map'
		});
	}

	function CreateMapIterator(map, kind) {
		if (Type(map) !== 'object') {
			throw new TypeError('createMapIterator called on incompatible receiver ' + Object.prototype.toString.call(map));
		}
		if (map._es6Map !== true) {
			throw new TypeError('createMapIterator called on incompatible receiver ' + Object.prototype.toString.call(map));
		}
		var iterator = Object.create(MapIteratorPrototype);
		Object.defineProperty(iterator, '[[Map]]', {
			configurable: true,
			enumerable: false,
			writable: true,
			value: map
		});
		Object.defineProperty(iterator, '[[MapNextIndex]]', {
			configurable: true,
			enumerable: false,
			writable: true,
			value: 0
		});
		Object.defineProperty(iterator, '[[MapIterationKind]]', {
			configurable: true,
			enumerable: false,
			writable: true,
			value: kind
		});
		return iterator;
	}

	var MapIteratorPrototype = {};
	Object.defineProperty(MapIteratorPrototype, 'isMapIterator', {
		configurable: false,
		enumerable: false,
		writable: false,
		value: true
	});

	CreateMethodProperty(MapIteratorPrototype, 'next', function next() {
			var O = this;
			if (Type(O) !== 'object') {
				throw new TypeError('Method %MapIteratorPrototype%.next called on incompatible receiver ' + Object.prototype.toString.call(O));
			}
			if (!O.isMapIterator) {
				throw new TypeError('Method %MapIteratorPrototype%.next called on incompatible receiver ' + Object.prototype.toString.call(O));
			}
			var m = O['[[Map]]'];
			var index = O['[[MapNextIndex]]'];
			var itemKind = O['[[MapIterationKind]]'];
			if (m === undefined) {
				return CreateIterResultObject(undefined, true);
			}
			if (!m._es6Map) {
				throw new Error(Object.prototype.toString.call(m) + ' has a [[MapData]] internal slot.');
			}
			var entries = m._keys;
			var numEntries = entries.length;
			while (index < numEntries) {
				var e = Object.create(null);
				e['[[Key]]'] = m._keys[index];
				e['[[Value]]'] = m._values[index];
				index = index + 1;
				O['[[MapNextIndex]]'] = index;
				if (e['[[Key]]'] !== undefMarker) {
					if (itemKind === 'key') {
						var result = e['[[Key]]'];
					} else if (itemKind === 'value') {
						result = e['[[Value]]'];
					} else {
						if (itemKind !== 'key+value') {
							throw new Error();
						}
						result = [
							e['[[Key]]'],
							e['[[Value]]']
						];
					}
					return CreateIterResultObject(result, false);
				}
			}
			O['[[Map]]'] = undefined;
			return CreateIterResultObject(undefined, true);
		}
	);

	CreateMethodProperty(MapIteratorPrototype, Symbol.iterator, function iterator() {
			return this;
		}
	);

	try {
		CreateMethodProperty(global, 'Map', Map);
	} catch (e) {
		global.Map = Map;
	}
}(self));

(function (global) {
	var supportsGetters = (function () {
		try {
			var a = {};
			Object.defineProperty(a, 't', {
				configurable: true,
				enumerable: false,
				get: function () {
					return true;
				},
				set: undefined
			});
			return !!a.t;
		} catch (e) {
			return false;
		}
	}());

	var undefMarker = Symbol('undef');
	var Set = function Set() {
		if (!(this instanceof Set)) {
			throw new TypeError('Constructor Set requires "new"');
		}
		var set = OrdinaryCreateFromConstructor(this, Set.prototype, {
			_values: [],
			_size: 0,
			_es6Set: true
		});

		if (!supportsGetters) {
			Object.defineProperty(set, 'size', {
				configurable: true,
				enumerable: false,
				writable: true,
				value: 0
			});
		}

		var iterable = arguments.length > 0 ? arguments[0] : undefined;

		if (iterable === null || iterable === undefined) {
			return set;
		}

		var adder = set.add;
		if (!IsCallable(adder)) {
			throw new TypeError("Set.prototype.add is not a function");
		}

		try {
			var iteratorRecord = GetIterator(iterable);
			while (true) {
				var next = IteratorStep(iteratorRecord);
				if (next === false) {
					return set;
				}
				var nextValue = IteratorValue(next);
				try {
					adder.call(set, nextValue);
				} catch (e) {
					return IteratorClose(iteratorRecord, e);
				}
			}
		} catch (e) {
			if (Array.isArray(iterable) ||
				Object.prototype.toString.call(iterable) === '[object Arguments]' ||
				(!!iterable.callee)) {
				var index;
				var length = iterable.length;
				for (index = 0; index < length; index++) {
					adder.call(set, iterable[index]);
				}
			} else {
				throw (e);
			}
		}
		return set;
	};

	Object.defineProperty(Set, 'prototype', {
		configurable: false,
		enumerable: false,
		writable: false,
		value: {}
	});

	if (supportsGetters) {
		Object.defineProperty(Set, Symbol.species, {
			configurable: true,
			enumerable: false,
			get: function () {
				return this;
			},
			set: undefined
		});
	} else {
		CreateMethodProperty(Set, Symbol.species, Set);
	}

	CreateMethodProperty(Set.prototype, 'add', function add(value) {
			var S = this;
			if (typeof S !== 'object') {
				throw new TypeError('Method Set.prototype.add called on incompatible receiver ' + Object.prototype.toString.call(S));
			}
			if (S._es6Set !== true) {
				throw new TypeError('Method Set.prototype.add called on incompatible receiver ' + Object.prototype.toString.call(S));
			}
			var entries = S._values;
			for (var i = 0; i < entries.length; i++) {
				var e = entries[i];
				if (e !== undefMarker && SameValueZero(e, value)) {
					return S;
				}
			}
			if (value === 0 && 1/value === -Infinity) {
				value = 0;
			}
			S._values.push(value);

			this._size = ++this._size;
			if (!supportsGetters) {
				this.size = this._size;
			}
			return S;
		});

	CreateMethodProperty(Set.prototype, 'clear', function clear() {
			var S = this;
			if (typeof S !== 'object') {
				throw new TypeError('Method Set.prototype.clear called on incompatible receiver ' + Object.prototype.toString.call(S));
			}
			if (S._es6Set !== true) {
				throw new TypeError('Method Set.prototype.clear called on incompatible receiver ' + Object.prototype.toString.call(S));
			}
			var entries = S._values;
			for (var i = 0; i < entries.length; i++) {
				entries[i] = undefMarker;
			}
			this._size = 0;
			if (!supportsGetters) {
				this.size = this._size;
			}
			return undefined;
		});

	CreateMethodProperty(Set.prototype, 'constructor', Set);

	CreateMethodProperty(Set.prototype, 'delete', function (value) {
			var S = this;
			if (typeof S !== 'object') {
				throw new TypeError('Method Set.prototype.delete called on incompatible receiver ' + Object.prototype.toString.call(S));
			}
			if (S._es6Set !== true) {
				throw new TypeError('Method Set.prototype.delete called on incompatible receiver ' + Object.prototype.toString.call(S));
			}
			var entries = S._values;
			for (var i = 0; i < entries.length; i++) {
				var e = entries[i];
				if (e !== undefMarker && SameValueZero(e, value)) {
					entries[i] = undefMarker;

					this._size = --this._size;
					if (!supportsGetters) {
						this.size = this._size;
					}
					return true;
				}
			}
			return false;
		}
	);

	CreateMethodProperty(Set.prototype, 'entries', function entries() {
			var S = this;
			return CreateSetIterator(S, 'key+value');
		}
	);

	CreateMethodProperty(Set.prototype, 'forEach', function forEach(callbackFn ) {
			var S = this;
			if (typeof S !== 'object') {
				throw new TypeError('Method Set.prototype.forEach called on incompatible receiver ' + Object.prototype.toString.call(S));
			}
			if (S._es6Set !== true) {
				throw new TypeError('Method Set.prototype.forEach called on incompatible receiver ' + Object.prototype.toString.call(S));
			}
			if (!IsCallable(callbackFn)) {
				throw new TypeError(Object.prototype.toString.call(callbackFn) + ' is not a function.');
			}
			if (arguments[1]) {
				var T = arguments[1];
			}
			var entries = S._values;
			for (var i = 0; i < entries.length; i++) {
				var e = entries[i];
				if (e !== undefMarker) {
					callbackFn.call(T, e, e, S);
				}
			}
			return undefined;
		}
	);

	CreateMethodProperty(Set.prototype, 'has', function has(value) {
			var S = this;
			if (typeof S !== 'object') {
				throw new TypeError('Method Set.prototype.forEach called on incompatible receiver ' + Object.prototype.toString.call(S));
			}
			if (S._es6Set !== true) {
				throw new TypeError('Method Set.prototype.forEach called on incompatible receiver ' + Object.prototype.toString.call(S));
			}
			var entries = S._values;
			for (var i = 0; i < entries.length; i++) {
				var e = entries[i];
				if (e !== undefMarker && SameValueZero(e, value)) {
					return true;
				}
			}
			return false;
		}
	);

	var values = function values() {
		var S = this;
		return CreateSetIterator(S, "value");
	};
	CreateMethodProperty(Set.prototype, 'values', values);

	CreateMethodProperty(Set.prototype, 'keys', values);

	if (supportsGetters) {
		Object.defineProperty(Set.prototype, 'size', {
			configurable: true,
			enumerable: false,
			get: function () {
				var S = this;
				if (typeof S !== 'object') {
					throw new TypeError('Method Set.prototype.size called on incompatible receiver ' + Object.prototype.toString.call(S));
				}
				if (S._es6Set !== true) {
					throw new TypeError('Method Set.prototype.size called on incompatible receiver ' + Object.prototype.toString.call(S));
				}
				var entries = S._values;
				var count = 0;
				for (var i = 0; i < entries.length; i++) {
					var e = entries[i];
					if (e !== undefMarker) {
						count = count + 1;
					}
				}
				return count;
			},
			set: undefined
		});
	}

	CreateMethodProperty(Set.prototype, Symbol.iterator, values);

	if (!('name' in Set)) {
		Object.defineProperty(Set, 'name', {
			configurable: true,
			enumerable: false,
			writable: false,
			value: 'Set'
		});
	}

	function CreateSetIterator(set, kind) {
		if (typeof set !== 'object') {
			throw new TypeError('createSetIterator called on incompatible receiver ' + Object.prototype.toString.call(set));
		}
		if (set._es6Set !== true) {
			throw new TypeError('createSetIterator called on incompatible receiver ' + Object.prototype.toString.call(set));
		}
		var iterator = Object.create(SetIteratorPrototype);
		Object.defineProperty(iterator, '[[IteratedSet]]', {
			configurable: true,
			enumerable: false,
			writable: true,
			value: set
		});
		Object.defineProperty(iterator, '[[SetNextIndex]]', {
			configurable: true,
			enumerable: false,
			writable: true,
			value: 0
		});
		Object.defineProperty(iterator, '[[SetIterationKind]]', {
			configurable: true,
			enumerable: false,
			writable: true,
			value: kind
		});
		return iterator;
	}

	var SetIteratorPrototype = {};
	Object.defineProperty(SetIteratorPrototype, 'isSetIterator', {
		configurable: false,
		enumerable: false,
		writable: false,
		value: true
	});

	CreateMethodProperty(SetIteratorPrototype, 'next', function next() {
		var O = this;
		if (typeof O !== 'object') {
			throw new TypeError('Method %SetIteratorPrototype%.next called on incompatible receiver ' + Object.prototype.toString.call(O));
		}
		if (!O.isSetIterator) {
			throw new TypeError('Method %SetIteratorPrototype%.next called on incompatible receiver ' + Object.prototype.toString.call(O));
		}
		var s = O['[[IteratedSet]]'];
		var index = O['[[SetNextIndex]]'];
		var itemKind = O['[[SetIterationKind]]'];
		if (s === undefined) {
			return CreateIterResultObject(undefined, true);
		}
		if (!s._es6Set) {
			throw new Error(Object.prototype.toString.call(s) + ' does not have [[SetData]] internal slot.');
		}
		var entries = s._values;
		var numEntries = entries.length;
		while (index < numEntries) {
			var e = entries[index];
			index = index + 1;
			O['[[SetNextIndex]]'] = index;
			if (e !== undefMarker) {
				if (itemKind === 'key+value') {
					return CreateIterResultObject([e, e], false);
				}
				return CreateIterResultObject(e, false);
			}
		}
		O['[[IteratedSet]]'] = undefined;
		return CreateIterResultObject(undefined, true);
	});

	CreateMethodProperty(SetIteratorPrototype, Symbol.iterator, function iterator() {
			return this;
		}
	);

	try {
		CreateMethodProperty(global, 'Set', Set);
	} catch (e) {
		global.Set = Set;
	}

}(self));

(function () {
	var toString = Object.prototype.toString;
	var stringMatch = String.prototype.match;
	function isString(value) {
		if (typeof value === 'string') { return true; }
		if (typeof value !== 'object') { return false; }
		return toString.call(value) === '[object String]';
	}

	CreateMethodProperty(Array, 'from', function from(items ) { 
		var C = this;
		var mapfn = arguments.length > 1 ? arguments[1] : undefined;
		if (mapfn === undefined) {
			var mapping = false;
		} else {
			if (IsCallable(mapfn) === false) {
				throw new TypeError(Object.prototype.toString.call(mapfn) + ' is not a function.');
			}
			var thisArg = arguments.length > 2 ? arguments[2] : undefined;
			if (thisArg !== undefined) {
				var T = thisArg;
			} else {
				T = undefined;
			}
			mapping = true;

		}
		var usingIterator = GetMethod(items, Symbol.iterator);
		if (usingIterator !== undefined) {
			if (IsConstructor(C)) {
				var A = Construct(C);
			} else {
				A = ArrayCreate(0);
			}
			var iteratorRecord = GetIterator(items, usingIterator);
			var k = 0;
			while (true) {
				if (k >= (Math.pow(2, 53) - 1)) {
					var error = new TypeError('Iteration count can not be greater than or equal 9007199254740991.');
					return IteratorClose(iteratorRecord, error);
				}
				var Pk = ToString(k);
				var next = IteratorStep(iteratorRecord);
				if (next === false) {
					A.length = k;
					return A;
				}
				var nextValue = IteratorValue(next);
				if (mapping) {
					try {
						var mappedValue = Call(mapfn, T, [nextValue, k]);
					} catch (e) {
						return IteratorClose(iteratorRecord, e);
					}

				} else {
					mappedValue = nextValue;
				}
				try {
					CreateDataPropertyOrThrow(A, Pk, mappedValue);
				} catch (e) {
					return IteratorClose(iteratorRecord, e);
				}
				k = k + 1;
			}
		}
		if (isString(items)) {
			var arrayLike = stringMatch.call(items, /[\uD800-\uDBFF][\uDC00-\uDFFF]?|[^\uD800-\uDFFF]|./g) || [];
		} else {
			arrayLike = ToObject(items);
		}
		var len = ToLength(Get(arrayLike, "length"));
		if (IsConstructor(C)) {
			A = Construct(C, [len]);
		} else {
			A = ArrayCreate(len);
		}
		k = 0;
		while (k < len) {
			Pk = ToString(k);
			var kValue = Get(arrayLike, Pk);
			if (mapping === true) {
				mappedValue = Call(mapfn, T, [kValue, k]);
			} else {
				mappedValue = kValue;
			}
			CreateDataPropertyOrThrow(A, Pk, mappedValue);
			k = k + 1;
		}
		A.length = len;
		return A;
	});
}());
})
('object' === typeof window && window || 'object' === typeof self && self || 'object' === typeof global && global || {});

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
 * IconicMultiSelect v0.1.0
 * Licence:  MIT
 * (c) 2021 Sidney Wimart.
 */
if (window.NodeList && !NodeList.prototype.forEach) {
  NodeList.prototype.forEach = Array.prototype.forEach;
}
var IconicMultiSelect = function () {
  function IconicMultiSelect(_ref) {
    var select = _ref.select,
        placeholder = _ref.placeholder,
        customCss = _ref.customCss,
        noData = _ref.noData,
        noResults = _ref.noResults;

    _classCallCheck(this, IconicMultiSelect);

    _defineProperty(this, "prefix", "iconic" + Math.floor(1000 + Math.random() * 9000) + "-");

    _defineProperty(this, "customCss", void 0);

    _defineProperty(this, "selectContainer", void 0);

    _defineProperty(this, "placeholder", void 0);

    _defineProperty(this, "noData", void 0);

    _defineProperty(this, "noResults", void 0);

    _defineProperty(this, "options", []);

    _defineProperty(this, "selectedOptions", []);

    _defineProperty(this, "domElements", {});

    _defineProperty(this, "event", function () {});

    this.selectContainer = document.querySelector(select);
    this.customCss = customCss;
    this.placeholder = placeholder !== null && placeholder !== void 0 ? placeholder : "Select...";
    this.noData = noData !== null && noData !== void 0 ? noData : "No data found.";
    this.noResults = noResults !== null && noResults !== void 0 ? noResults : "No results found.";
  }
  _createClass(IconicMultiSelect, [{
    key: "init",
    value: function init() {
      if (this.selectContainer && this.selectContainer.nodeName === "SELECT") {
        this.options = Array.from(this.selectContainer.options).map(function (option) {
          return {
            text: option.text,
            value: option.value
          };
        });

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
        var target = document.querySelector("li[data-value=\"".concat(option.value, "\"]"));

        _this._handleOption(target);
      });
    }
  }, {
    key: "_clearSelection",
    value: function _clearSelection() {
      var _this2 = this;

      this.selectedOptions.forEach(function (el) {
        var targetLastSelectedOption = document.querySelector("li[data-value=\"".concat(el.value, "\"]"));

        _this2._handleOption(targetLastSelectedOption, false);
      });

      this._dispatchEvent({
        action: "CLEAR_ALL_OPTIONS",
        selection: this.selectedOptions
      });
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

          _this3.domElements.input.value = "";
          _this3.domElements.optionsContainer.style.display = "none";

          _this3._filterOptions("");
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
        _this3._handleBackspace(e);
      });
    }
  }, {
    key: "_filterOptions",
    value: function _filterOptions(value) {
      var valueLowerCase = value.toLowerCase();
      this.domElements.options.forEach(function (el) {
        if (el.dataset.value.toLowerCase().startsWith(valueLowerCase)) {
          el.style.display = "block";
        } else {
          el.style.display = "none";
        }
      });
      var hasResults = Array.from(this.domElements.options).some(function (el) {
        return el.dataset.value.toLowerCase().startsWith(valueLowerCase);
      });

      this._showNoResults(!hasResults);
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
        return el.value === target.dataset.value;
      })) {
        target.classList.remove("".concat(this.prefix, "multiselect__options--selected"));
        this.selectedOptions = this.selectedOptions.filter(function (el) {
          return el.value !== target.dataset.value;
        });

        this._removeOptionFromList(target.dataset.value);

        dispatchEvent && this._dispatchEvent({
          action: "REMOVE_OPTION",
          value: target.dataset.value,
          selection: this.selectedOptions
        });
      } else {
        var option = this.options.find(function (el) {
          return el.value === target.dataset.value;
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
    key: "_renderOptionsList",
    value: function _renderOptionsList() {
      var html = "\n        <div style=\"display: none;\" class=\"".concat(this.prefix, "multiselect__options\">\n          <ul>\n          ").concat(this.options.length > 0 ? this.options.map(function (option) {
        return "\n              <li style=\"display: block;\" data-value=\"".concat(option.value, "\">").concat(option.text, "</li>\n            ");
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
    key: "_removeOptionFromList",
    value: function _removeOptionFromList(value) {
      var optionDom = document.querySelector("span[data-value=\"".concat(value, "\"]"));
      optionDom.parentNode && optionDom.parentNode.removeChild(optionDom);
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
  }, {
    key: "_showNoData",
    value: function _showNoData(condition) {
      return condition ? "<p class=\"".concat(this.prefix, "multiselect__options--no-data\">").concat(this.noData, "</p>") : "";
    }
  }, {
    key: "_injectCss",
    value: function _injectCss() {
      var css = "\n      <style>\n        .".concat(this.prefix, "multiselect__container {\n          align-items: center;\n          background-color: #fff;\n          border-radius: 2px;\n          border: 1px solid rgba(0,0,0,.08);\n          box-sizing: border-box;\n          display: flex;\n          font-family: Arial,Helvetica,sans-serif;\n          min-height: 40px;\n          padding: 4px 8px 0 8px;\n          position: relative;\n          width: 354px;\n        }\n\n        .").concat(this.prefix, "multiselect__container:after {\n          content:'';\n          min-height:inherit;\n          font-size:0;\n        }\n\n        .").concat(this.prefix, "multiselect__container > * {\n          color: #656565;\n          font-size: 14px;\n        }\n\n        .").concat(this.prefix + "multiselect__wrapper", " {\n          display: flex;\n          flex-wrap: wrap;\n          height: 100%;\n          width: 100%;\n        }\n\n        .").concat(this.prefix, "multiselect__clear-btn {\n           cursor: pointer;\n           margin-bottom: 4px;\n           margin-left: 4px;\n        }\n\n        .").concat(this.prefix, "multiselect__options {\n          background-color: #f6f6f6;\n          border-radius: 2px;\n          border: 1px solid rgba(0,0,0,.08);\n          left: -1px;\n          max-height: 120px;\n          overflow: auto;\n          position: absolute;\n          top: calc(100% + 2px);\n          width: 100%;\n        }\n\n        .").concat(this.prefix, "multiselect__options ul {\n          list-style: none;\n          margin: 0;\n          padding: 2px 0;\n        }\n\n        .").concat(this.prefix, "multiselect__options ul li {\n          cursor: pointer;\n          padding: 4px 8px;\n        }\n\n        .").concat(this.prefix, "multiselect__options ul p.").concat(this.prefix, "multiselect__options--no-results, \n        .").concat(this.prefix, "multiselect__options ul p.").concat(this.prefix, "multiselect__options--no-data {\n          margin: 0;\n          padding: 8px;\n          text-align: center;\n        }\n\n        .").concat(this.prefix, "multiselect__options ul li.").concat(this.prefix, "multiselect__options--selected {\n          background-color: #ff6358;\n          color: #fff;\n        }\n\n        .").concat(this.prefix, "multiselect__options ul li.").concat(this.prefix, "multiselect__options--selected:hover {\n          background-color: #eb5b51;\n        }\n\n        .").concat(this.prefix, "multiselect__options ul li:hover {\n          background-color: #dedede;\n        }\n\n        .").concat(this.prefix, "multiselect__selected {\n          background-color: #656565;\n          border-radius: 2px;\n          color: #fff;\n          margin-bottom: 4px;\n          margin-right: 4px;\n          padding: 4px 8px;\n          display: flex;\n          align-items: center;\n        }\n\n        .").concat(this.prefix, "multiselect__selected .").concat(this.prefix, "multiselect__remove-btn {\n          cursor: pointer;\n          margin-left: 6px;\n        }\n\n        .").concat(this.prefix, "multiselect__input {\n          border: none;\n          flex-basis: 40px;\n          flex-grow: 1;\n          margin-bottom: 4px;\n          min-width: 40px;\n          outline: none;            \n        }\n      </style>\n      ");
      if (!this.customCss) document.querySelector("head").insertAdjacentHTML("beforeend", css);
      if (this.customCss) this.prefix = "";
    }
  }]);

  return IconicMultiSelect;
}();