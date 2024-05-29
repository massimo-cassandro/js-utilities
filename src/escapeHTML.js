const characters_to_escape = {
  '&': '&amp;',
  '"': '&quot;',
  '\'': '&#039;',
  '<': '&lt;',
  '>': '&gt;'
};
export function escapeHTML(str) {
  return str?.replace(/[<>&"']/g, m => characters_to_escape[m])?? '';
}

export function unescapeHTML(str) {
  const regexp = new RegExp(Object.values(characters_to_escape).join('|'), 'g'),
    entities_to_unescape = Object.fromEntries(Object.entries(characters_to_escape).map(a => a.reverse()));

  return str?.replace(regexp, function(m){
    return entities_to_unescape[m];
  })?? '';
}
