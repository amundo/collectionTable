var json2table = (data, editable) => {
  var table = document.createElement('table');
  
  var headers = Object.keys(data[0]);
  var thead = `<thead><tr><th>${headers.join('</th><th>')}</th></tr></thead>`;
  table.insertAdjacentHTML('afterbegin', thead);
  var tbody = table.appendChild(document.createElement('tbody'));
  
  data.forEach(d => {
    var tr = document.createElement('tr');
    headers.forEach(header => {
      if(!editable){
        var td = document.createElement('td');
        td.textContent = d[header];
      } else {
        var 
          td = document.createElement('td'),
          input = document.createElement('input');
          input.dataset.omfg = 1;
      
        input.setAttribute('value', d[header]);
        td.appendChild(input);
      }
      tr.appendChild(td)
    })
    tbody.appendChild(tr);
  });
  
  return table;
}

