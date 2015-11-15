"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

var CollectionTable = (function () {
  function CollectionTable(options) {
    var _this = this;

    _classCallCheck(this, CollectionTable);

    this.collection = options.collection;
    this.container = options.container;

    this.render(this.collection);
    this.table = this.container.querySelector("table");

    this.editButton = document.querySelector("button#edit");
    this.doneButton = document.querySelector("button#done");

    this.editButton.addEventListener("click", function (ev) {
      return _this.edit();
    });
    this.doneButton.addEventListener("click", function (ev) {
      return _this.unedit();
    });
    this.container.addEventListener("dblclick", function (ev) {
      return _this.edit();
    });
  }

  _createClass(CollectionTable, {
    render: {
      value: function render(collection, editable) {
        this.container.innerHTML = "";
        var html = json2table(collection, editable);
        this.container.appendChild(html);
        this.table = this.container.querySelector("table");
      }
    },
    edit: {
      value: function edit() {
        this.render(this.collection, true);
      }
    },
    unedit: {
      value: function unedit() {
        this.collection = readTable(this.table);
        this.render(this.collection, false);
      }
    },
    toJSON: {
      value: function toJSON() {
        return JSON.stringify(this.collection);
      }
    }
  });

  return CollectionTable;
})();
"use strict";

var json2table = function (data, editable) {
  var table = document.createElement("table");

  var headers = Object.keys(data[0]);
  var thead = "<thead><tr><th>" + headers.join("</th><th>") + "</th></tr></thead>";
  table.insertAdjacentHTML("afterbegin", thead);
  var tbody = table.appendChild(document.createElement("tbody"));

  data.forEach(function (d) {
    var tr = document.createElement("tr");
    headers.forEach(function (header) {
      if (!editable) {
        var td = document.createElement("td");
        td.textContent = d[header];
      } else {
        var td = document.createElement("td"),
            input = document.createElement("input");
        input.dataset.omfg = 1;

        input.setAttribute("value", d[header]);
        td.appendChild(input);
      }
      tr.appendChild(td);
    });
    tbody.appendChild(tr);
  });

  return table;
};
"use strict";

var readTable = function (table) {
  var collection = [],
      headers = Array.from(table.querySelectorAll("thead tr th")).map(function (th) {
    return th.textContent.trim();
  });

  var rows = Array.from(table.querySelectorAll("tbody tr"));

  rows.forEach(function (tr) {
    var o = {},
        inputs = Array.from(tr.querySelectorAll("input"));

    headers.forEach(function (key, i) {
      return o[key] = inputs[i].value.trim();
    });
    collection.push(o);
  });

  return collection;
};
