'use strict';

;(function () {
  var directive = {
    bind: function bind(tr, binding, vnode) {
      var _tr$dataset = tr.dataset,
          sortColumn = _tr$dataset.sortColumn,
          defaultSort = _tr$dataset.defaultSort,
          sortDirection = _tr$dataset.sortDirection;


      Object.assign(tr.dataset, {
        sortDirection: sortDirection || 1,
        sortColumn: sortColumn || defaultSort || null,
        defaultSort: defaultSort || null
      });

      var _loop = function _loop() {
        if (_isArray) {
          if (_i >= _iterator.length) return 'break';
          _ref = _iterator[_i++];
        } else {
          _i = _iterator.next();
          if (_i.done) return 'break';
          _ref = _i.value;
        }

        var th = _ref;

        init(th).addEventListener('click', function () {
          syncDatasets(th);
          syncIcons(th);
          vnode.context[binding.expression] = doSort(th.parentNode, vnode.context[binding.expression]);
          var _th$parentNode$datase = th.parentNode.dataset,
              direction = _th$parentNode$datase.sortDirection,
              column = _th$parentNode$datase.sortColumn;

          vnode.context.$emit('table-sorted', { column: column, direction: direction });

          return true;
        });
      };

      for (var _iterator = tr.children, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
        var _ref;

        var _ret = _loop();

        if (_ret === 'break') break;
      }
    }
  };

  directive.install = function (Vue, options) {
    options = options || { name: 'sortable' }
    Vue.directive(options.name, directive)
  }

  if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
    module.exports = directive;
  } else {
    window.vSortable = directive;
  }

  function syncDatasets(th) {
    var tr = th.parentNode;
    if (tr.dataset.sortColumn === th.dataset.column) {
      tr.dataset.sortDirection = -1 * Number(tr.dataset.sortDirection) || 1;
    } else {
      tr.dataset.sortColumn = th.dataset.column;
      tr.dataset.sortDirection = 1;
    }
  }
  function init(th) {
    th.style.cursor = 'pointer';
    th.classList.add('is-unselectable');
    syncDatasets(th);
    return th;
  }
  function createSortIconElement() {
    var itag = document.createElement('i');
    itag.className = 'fa fa-sort';
    return itag;
  }
  function syncIcons(el) {
    var tr = el.tagName === 'TR' ? el : el.parentNode;
    if (tr.tagName !== 'TR') return false;

    var dataset = tr.dataset;
    var sortedIconClass = 'i.fa.fa-sort';
    var sortedColumnClass = 'is-sorted';
    for (var _iterator2 = tr.children, _isArray2 = Array.isArray(_iterator2), _i2 = 0, _iterator2 = _isArray2 ? _iterator2 : _iterator2[Symbol.iterator]();;) {
      var _ref2;

      if (_isArray2) {
        if (_i2 >= _iterator2.length) break;
        _ref2 = _iterator2[_i2++];
      } else {
        _i2 = _iterator2.next();
        if (_i2.done) break;
        _ref2 = _i2.value;
      }

      var col = _ref2;

      if (col.dataset.column === dataset.sortColumn) {
        col.classList.add(sortedColumnClass);
        if (!col.querySelector(sortedIconClass)) {
          col.prepend(createSortIconElement());
        }
      } else {
        col.classList.remove(sortedColumnClass);
        var itag = col.querySelector(sortedIconClass);
        if (itag) col.removeChild(itag);
      }
    }
  }
  function doSort(tr, array) {
    var dataset = tr.dataset;
    if (!dataset.sortColumn) dataset.sortColumn = dataset.defaultSort;
    var sortKey = dataset.sortColumn;
    var sortDirection = Number(dataset.sortDirection);
    return array.slice(0).sort(function (a, b) {
      var aval = parse(a[sortKey]);
      var bval = parse(b[sortKey]);

      if (sortDirection >= 0) {
        if (aval > bval) return 1;
        if (aval < bval) return -1;else return 0;
      } else {
        if (aval > bval) return -1;
        if (aval < bval) return 1;else return 0;
      }
    });
  }

  function parse(val) {
    return typeof val === 'string' ? val.toUpperCase() : val;
  }
})();
