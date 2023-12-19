export const klase = [
  { text: 'Standard', bg: 'info' },
  { text: 'Select', bg: 'secondary' },
  { text: 'TOP', bg: 'primary' }
]

// formatiraj datum u standardni srpski format 
export const formatDatum = datumString => {
  let noviDatum = new Date(datumString);
  return noviDatum.toLocaleDateString('sr-RS')
}

// konvertuj string u slug - URL safe string
export function slugify(str) {
  return String(str)
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9 -]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
}

// konvertuj PHP serializovanu listu lokacija u JS niz
export const unserializeLokacije = str => {
  const splitString = str.split(':"');
  splitString.shift()

  let items = splitString.map(itm => {
    let indx = itm.indexOf('";')
    return itm.substring(indx, -1)
  })

  return items
}
