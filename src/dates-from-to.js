export function datesFromTo(dateString1, dateString2) {
  let locale = {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  };

  if(dateString1 === dateString2) {
    return new Date(dateString1).toLocaleString('it-IT', locale);

  } else {
    const [y1, m1, d1] = dateString1.substring(0, 10).split('-')
      ,[y2, m2, d2] = dateString2.substring(0, 10).split('-')
    ;

    if(y1 !== y2) {
      return new Date(dateString1).toLocaleString('it-IT', locale) +
        ' &ndash; ' +
        new Date(dateString2).toLocaleString('it-IT', locale);

    } else if (m1 !== m2) {


      locale = {
        month: 'short',
        day: 'numeric'
      };
      return new Date(dateString1).toLocaleString('it-IT', locale) +
        ' &ndash; ' +
        new Date(dateString2).toLocaleString('it-IT', locale) +
        ` ${y1}`;

    } else {
      locale = {
        year: 'numeric',
        month: 'short'
      };
      return `${d1}&ndash;${d2} ` + new Date(dateString1).toLocaleString('it-IT', locale);
    }

  }

}
