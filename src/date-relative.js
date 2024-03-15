export default function (date, options = {}) {

  // date: data da elaborare (oggetto date o stringa iso)
  // options oggetto per la persopnalizzazione del risultato

  const default_options = {

    // La prima parola della stringa ha l'iniziale maiuscola?
    firstLetterUppercaseCase: false,

    // formato data non relativa (oltre 'dopodomani')
    dateFormat: {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour12: false,
      hour:'2-digit',
      minute:'2-digit'
    },

    // formato ora date relative
    timeFormat: {
      hour12: false,
      hour:'2-digit',
      minute:'2-digit'
    }

  };

  options = {...options, ...default_options};

  const d = typeof date === 'string'? new Date(date) : date,
    now = new Date(),
    dayDiff = d.getDate() - now.getDate();

  let result;

  if(dayDiff >= -1 && dayDiff <= 2) {

    const relativeStrings = [ // NB: in sequenza secondo il valore di dayDiff
      'ieri', 'oggi', 'domani', 'dopodomani'
    ];
    result = relativeStrings[dayDiff+1] + ' alle ' + d.toLocaleString('it-IT', options.timeFormat);

  } else {
    result = d.toLocaleString('it-IT', options.dateFormat);
  }


  if(options.firstLetterUppercaseCase) {
    result = result.at(0).toUpperCase() + result.substring(1).toLowerCase();
  }

  return result;
}
