var readTable = table => {
  var 
    collection = [], 
    headers = Array.from(table.querySelectorAll('thead tr th'))
    .map(th => th.textContent.trim());

  var rows = Array.from(table.querySelectorAll('tbody tr'));

  rows.forEach(tr => {
    var 
      o = {},
      inputs = Array.from(tr.querySelectorAll('input'));

    headers.forEach((key, i) => o[key] = inputs[i].value.trim());
    collection.push(o); 
  })

  return collection;
}
