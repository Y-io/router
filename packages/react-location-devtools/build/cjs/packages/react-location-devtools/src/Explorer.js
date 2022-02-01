/**
 * react-location-devtools
 *
 * Copyright (c) TanStack
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var _extends = require('../../../node_modules/@babel/runtime/helpers/esm/extends.js');
var objectWithoutPropertiesLoose = require('../../../node_modules/@babel/runtime/helpers/esm/objectWithoutPropertiesLoose.js');
var React = require('react');
var utils = require('./utils.js');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

var _excluded = ["expanded", "style"],
    _excluded2 = ["value", "defaultExpanded", "renderer", "pageSize", "depth"];
var Entry = utils.styled('div', {
  fontFamily: 'Menlo, monospace',
  fontSize: '0.9em',
  lineHeight: '1.7',
  outline: 'none',
  wordBreak: 'break-word'
});
var Label = utils.styled('span', {
  cursor: 'pointer',
  color: 'white'
});
var Value = utils.styled('span', function (props, theme) {
  return {
    color: theme.danger
  };
});
var SubEntries = utils.styled('div', {
  marginLeft: '.1em',
  paddingLeft: '1em',
  borderLeft: '2px solid rgba(0,0,0,.15)'
});
var Info = utils.styled('span', {
  color: 'grey',
  fontSize: '.7em'
});
var Expander = function Expander(_ref) {
  var expanded = _ref.expanded,
      _ref$style = _ref.style,
      style = _ref$style === void 0 ? {} : _ref$style;
      objectWithoutPropertiesLoose["default"](_ref, _excluded);

  return /*#__PURE__*/React__default["default"].createElement("span", {
    style: _extends["default"]({
      display: 'inline-block',
      transition: 'all .1s ease',
      transform: "rotate(" + (expanded ? 90 : 0) + "deg) " + (style.transform || '')
    }, style)
  }, "\u25B6");
};

var DefaultRenderer = function DefaultRenderer(_ref2) {
  var handleEntry = _ref2.handleEntry,
      label = _ref2.label,
      value = _ref2.value,
      subEntries = _ref2.subEntries,
      subEntryPages = _ref2.subEntryPages,
      type = _ref2.type,
      expanded = _ref2.expanded,
      toggle = _ref2.toggle,
      pageSize = _ref2.pageSize;

  var _React$useState = React__default["default"].useState([]),
      expandedPages = _React$useState[0],
      setExpandedPages = _React$useState[1];

  return /*#__PURE__*/React__default["default"].createElement(Entry, {
    key: label
  }, subEntryPages != null && subEntryPages.length ? /*#__PURE__*/React__default["default"].createElement(React__default["default"].Fragment, null, /*#__PURE__*/React__default["default"].createElement(Label, {
    onClick: function onClick() {
      return toggle();
    }
  }, /*#__PURE__*/React__default["default"].createElement(Expander, {
    expanded: expanded
  }), " ", label, ' ', /*#__PURE__*/React__default["default"].createElement(Info, null, String(type).toLowerCase() === 'iterable' ? '(Iterable) ' : '', subEntries.length, " ", subEntries.length > 1 ? "items" : "item")), expanded ? subEntryPages.length === 1 ? /*#__PURE__*/React__default["default"].createElement(SubEntries, null, subEntries.map(function (entry) {
    return handleEntry(entry);
  })) : /*#__PURE__*/React__default["default"].createElement(SubEntries, null, subEntryPages.map(function (entries, index) {
    return /*#__PURE__*/React__default["default"].createElement("div", {
      key: index
    }, /*#__PURE__*/React__default["default"].createElement(Entry, null, /*#__PURE__*/React__default["default"].createElement(Label, {
      onClick: function onClick() {
        return setExpandedPages(function (old) {
          return old.includes(index) ? old.filter(function (d) {
            return d !== index;
          }) : [].concat(old, [index]);
        });
      }
    }, /*#__PURE__*/React__default["default"].createElement(Expander, {
      expanded: expanded
    }), " [", index * pageSize, " ...", ' ', index * pageSize + pageSize - 1, "]"), expandedPages.includes(index) ? /*#__PURE__*/React__default["default"].createElement(SubEntries, null, entries.map(function (entry) {
      return handleEntry(entry);
    })) : null));
  })) : null) : /*#__PURE__*/React__default["default"].createElement(React__default["default"].Fragment, null, /*#__PURE__*/React__default["default"].createElement(Label, null, label, ":"), ' ', /*#__PURE__*/React__default["default"].createElement(Value, null, JSON.stringify(value, Object.getOwnPropertyNames(Object(value))))));
};

function Explorer(_ref3) {
  var value = _ref3.value,
      defaultExpanded = _ref3.defaultExpanded,
      _ref3$renderer = _ref3.renderer,
      renderer = _ref3$renderer === void 0 ? DefaultRenderer : _ref3$renderer,
      _ref3$pageSize = _ref3.pageSize,
      pageSize = _ref3$pageSize === void 0 ? 100 : _ref3$pageSize,
      _ref3$depth = _ref3.depth,
      depth = _ref3$depth === void 0 ? 0 : _ref3$depth,
      rest = objectWithoutPropertiesLoose["default"](_ref3, _excluded2);

  var _React$useState2 = React__default["default"].useState(defaultExpanded),
      expanded = _React$useState2[0],
      setExpanded = _React$useState2[1];

  var toggle = function toggle(set) {
    setExpanded(function (old) {
      return typeof set !== 'undefined' ? set : !old;
    });
  };

  var path = [];
  var type = typeof value;
  var subEntries;
  var subEntryPages = [];

  var makeProperty = function makeProperty(sub) {
    var _ref4;

    var newPath = path.concat(sub.label);
    var subDefaultExpanded = defaultExpanded === true ? (_ref4 = {}, _ref4[sub.label] = true, _ref4) : defaultExpanded == null ? void 0 : defaultExpanded[sub.label];
    return _extends["default"]({}, sub, {
      path: newPath,
      depth: depth + 1,
      defaultExpanded: subDefaultExpanded
    });
  };

  if (Array.isArray(value)) {
    type = 'array';
    subEntries = value.map(function (d, i) {
      return makeProperty({
        label: i,
        value: d
      });
    });
  } else if (value !== null && typeof value === 'object' && typeof value[Symbol.iterator] === 'function') {
    type = 'Iterable';
    subEntries = Array.from(value, function (val, i) {
      return makeProperty({
        label: i,
        value: val
      });
    });
  } else if (typeof value === 'object' && value !== null) {
    type = 'object'; // eslint-disable-next-line no-shadow

    subEntries = Object.entries(value).map(function (_ref5) {
      var label = _ref5[0],
          value = _ref5[1];
      return makeProperty({
        label: label,
        value: value
      });
    });
  }

  if (subEntries) {
    var i = 0;

    while (i < subEntries.length) {
      subEntryPages.push(subEntries.slice(i, i + pageSize));
      i = i + pageSize;
    }
  }

  return renderer(_extends["default"]({
    handleEntry: function handleEntry(entry) {
      return /*#__PURE__*/React__default["default"].createElement(Explorer, _extends["default"]({
        key: entry.label,
        renderer: renderer
      }, rest, entry));
    },
    type: type,
    subEntries: subEntries,
    subEntryPages: subEntryPages,
    depth: depth,
    value: value,
    path: path,
    expanded: expanded,
    toggle: toggle,
    pageSize: pageSize
  }, rest));
}

exports.Entry = Entry;
exports.Expander = Expander;
exports.Info = Info;
exports.Label = Label;
exports.SubEntries = SubEntries;
exports.Value = Value;
exports["default"] = Explorer;
//# sourceMappingURL=Explorer.js.map
