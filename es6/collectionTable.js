class CollectionTable {
  constructor(options){
    this.collection = options.collection;
    this.container = options.container;

    this.render(this.collection);
    this.table = this.container.querySelector('table');

    this.editButton = document.querySelector('button#edit');
    this.doneButton = document.querySelector('button#done');
    
    this.editButton.addEventListener('click', ev => this.edit());
    this.doneButton.addEventListener('click', ev => this.unedit());
    this.container.addEventListener('dblclick', ev => this.edit());
  }
  
  render(collection, editable){
    this.container.innerHTML = '';
    var html = json2table(collection, editable);
    this.container.appendChild(html);
    this.table = this.container.querySelector('table');
  }

  edit(){
    this.render(this.collection, true);
  }

  unedit(){
    this.collection = readTable(this.table);
    this.render(this.collection, false);
  }

  toJSON(){
    return JSON.stringify(this.collection)
  }
}
