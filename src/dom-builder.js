/*
crea una struttura dom a partire da un array di questo tipo:

structure = [
  {
    // default `div`, può essere omesso, può essere un array di elementi nidificati
    // in questo caso gli altri elementi dell'oggetto in esame si applicano solo all'ultimo
    // elemento dell'array `tag`
    tag: 'div', | ['.divClass', 'table.class1', 'thead', 'tr.class2.class3']
    className: xxx,
    attrs: [  // attributi
      [attr_name, attr_value],
      ...
    ],
    content: xxx | func
    condition: true | false // se false il nodo non viene generato
    callback: el => ..., //callback da invocare quando l'elemnto viene aggiunto al dom, ha come argomento l'elemento appena creato
    children: [
      ...
    ]
  },

  ...
]

attrs può essere anche nella forma `[attr_name, attr_value]` (un solo attributo)
oppure {attr_name: attr_value, ...}

*/

// TODO impmentare sintassi stringa simile a pug per gli elementi children
// ad esempio: 'input.search-input(type="search" class="search-input" placeholder="Cerca..." autofocus) content'
// anche con children: `xxx\nyyy\n...` ?????

export function domBuilder(structureArray = [], parent) {
  let mainElement = null, el, grand_parent = null;

  structureArray.forEach(item => {
    if(item.condition ?? true) {


      // se tag è un array, vengono creati una serie di elementi nidificati e si utilizza l'ultimo
      // vengono anche applicate eventuali classi indicate dopo il nome del tag e separate dal punto
      // se il tag non è presente, si intende come `div`
      if(Array.isArray(item.tag)) {

        grand_parent = parent;

        item.tag.forEach((tag, idx) => {
          const isLast = idx === item.tag.length - 1;

          const [tagName, ...classes] = tag.split('.');
          el = document.createElement(tagName || 'div');
          if(classes.length) {
            el.classList.add(...classes);
          }

          if(!isLast) { // l'ultimo elemento è gestito dalla procedura "standard"
            if(parent) {
              parent.appendChild(el);
            }
            parent = el;
          }

        });

      } else {
        el = document.createElement(item.tag ?? 'div');
      }


      if(item.className) {
        el.className = item.className;
      }
      if(item.id) {
        el.id = item.id;
      }

      // se item.attrs è un array singolo viene trattato come singolo elemento
      if(item.attrs && Array.isArray(item.attrs) && !Array.isArray(item.attrs[0])) {
        item.attrs = [item.attrs];

      //item.attrs può essere un oggetto del tipo {attr_name: attr_value}
      } else if(typeof item.attrs === 'object' && !Array.isArray(item.attrs) && item.attrs !== null) {
        item.attrs = Object.entries(item.attrs);
      }

      (item.attrs?? []).forEach(attr => {
        if(attr[1] != null) {
          el.setAttribute(attr[0], String(attr[1]));
        }
      });

      if(item.content) {

        let content = '';
        if(typeof item.content === 'function')  {
          content = item.content();

        } else if(item.content != null) {
          content = String(item.content);
        }

        if(content instanceof HTMLElement) {
          el.appendChild(content);

        } else {
          el.innerHTML = content;
        }
      }


      if(item.callback && typeof item.callback === 'function') {
        item.callback(el);
      }

      if(item.children != null && !Array.isArray(item.children)) {
        // eslint-disable-next-line no-console
        console.error('Error: `item.children` must be an array → ' + item.children);
      }
      if(item.children && Array.isArray(item.children)) {
        domBuilder(item.children, el);
      }

      if(mainElement == null) {
        mainElement = el;
      }

      if(parent) {
        parent.appendChild(el);
      }

      if(grand_parent) {
        parent = grand_parent;
      }
    }

  });

  return mainElement;
}
