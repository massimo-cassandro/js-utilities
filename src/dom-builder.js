/*
crea una struttura dom a partire da un array di questo tipo:

structure = [
  {
    tag: 'div', // default `div`, può essere omesso
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
export function domBuilder(structureArray = [], parent) {
  let mainElement = null;
  structureArray.forEach(item => {
    if(item.condition ?? true) {


      // TODO completare
      // // se tag è un array, vengono creati una serie di elementi nidificati e si utilizza l'ultimo
      // if(!Array.isArray(item.tag)) {
      //   item.tag = [item.tag];
      // }
      // const el = item.tag.reduce((resultEl, tag, idx) => {
      //   const thisEl = document.createElement(tag ?? 'div');

      //   if(resultEl != null) {
      //     resultEl.appendChild(thisEl);
      //     parent = resultEl;
      //   } else {
      //     resultEl = thisEl;
      //   }

      //   if(idx < item.tag.length -1) {
      //     resultEl.appendChild(thisEl);

      //   }

      //   return resultEl;
      // }, null);

      // console.log(el);;

      const el = document.createElement(item.tag ?? 'div');

      if(item.className) {
        el.className = item.className;
      }
      if(item.id) {
        el.id = item.id;
      }

      // se item.attrs è un array singolo viene trattato cpome singolo elemento
      if(item.attrs && Array.isArray(item.attrs) && !Array.isArray(item.attrs[0])) {
        item.attrs = [item.attrs];
      }

      //item.sttrs può essere un oggetto del tipo {attr_name: attr_value}
      if(typeof item.attrs === 'object' && !Array.isArray(item.attrs) && item.attrs !== null) {
        item.attrs = Object.entries(item.attrs);
      }

      (item.attrs?? []).forEach(attr => {
        if(attr[1] != null) {
          el.setAttribute(attr[0], String(attr[1]));
        }
      });

      if(item.content) {

        if(item.content instanceof HTMLElement) {

          el.appendChild(item.content);

        } else {
          let content;
          if(typeof item.content === 'function')  {
            content = item.content();
          } else {
            content = String(item.content);

          }
          el.innerHTML = content;
        }

      }


      if(item.callback && typeof item.callback === 'function') {
        item.callback(el);
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
    }

  });

  return mainElement;
}
