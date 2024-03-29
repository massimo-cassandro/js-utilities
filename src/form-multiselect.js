/*
This file must be included in projects that implement the
`bs*_form_layout.html.twig` template, if you are using the multiselect option

https://github.com/massimo-cassandro/symfony-bootstrap-form-theme


ES6:
-------------------------
import { formMultiselect } from '@massimo-cassandro/js-utilities';

formMultiselect();

NB: this version dropped the dependance from bootstrap 5 Dropdown JS Element

*/

// multiselect widget
// import { createPopper } from '@popperjs/core/dist/esm/popper-lite';
// import flip from '@popperjs/core/dist/esm/modifiers/flip';
// import preventOverflow from '@popperjs/core/dist/esm/modifiers/preventOverflow';

export function formMultiselect(container=document) {

  const multiselects = container.querySelectorAll('.form-multiselect'),
    setMultiselectPlaceholder = multiselect_item => {
      let selected_labels = [];
      multiselect_item.querySelectorAll('[type="checkbox"]:checked, [type="radio"]:checked')
        .forEach( checked_el => {
          selected_labels.push(
            checked_el.closest ('.form-check').querySelector('label').innerText.trim()
          );
        });
      multiselect_item
        .querySelector('.form-multiselect-placeholder').innerText =
          selected_labels.length? selected_labels.join(', ') : '—';
    };

  multiselects.forEach( item => {

    const btn = item.querySelector('.btn'),
      drpdown = item.querySelector('.dropdown-menu'),
      closeOnClick = item.hasAttribute('data-close-on-click');

    item.addEventListener('click', e => {

      if(['checkbox', 'radio'].indexOf(e.target.type) !== -1) {
        setMultiselectPlaceholder(item);
        if(closeOnClick) {
          btn.click();
        }
      }

    }, false);


    btn.addEventListener('click', () => {
      drpdown.classList.toggle('show');
      let menu_on = drpdown.classList.contains('show');
      btn.classList.toggle('show', menu_on);
      btn.setAttribute('aria-expanded', menu_on);
    }, false);

    // click outside
    document.body.addEventListener('click', e => {

      if(drpdown.classList.contains('show') && e.target.closest('.form-multiselect') !== item) {
        btn.click();
        setMultiselectPlaceholder(item);
      }

    }, false);


    // createPopper(btn, drpdown, {
    //   // placement: 'bottom',
    //   modifiers: [flip, preventOverflow]
    // });

    setMultiselectPlaceholder(item);
  });

}
