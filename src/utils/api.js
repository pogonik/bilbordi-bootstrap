import { defer } from 'react-router-dom'
import { createClient } from '@supabase/supabase-js'
import localForage from "localforage";

export const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
export const supabaseKey = process.env.REACT_APP_SUPABASE_KEY;

export const supabase = createClient(supabaseUrl, supabaseKey)


// svi gradovi iz istoimene tabele
export const gradoviLista = async () => {
  
  let { data, error } = await supabase
    .from('gradovi')
    .select('*')
    .order('naziv_grada', { ascending: true })
  
  return data;
}

// preuzimanje i filtriranje bilbord lokacija sa paginacijom
export const fetchBilbordi = async ({ strana = 0, perPage = 50, gradFilter = 0, sifraFilter = '' }) => {
  
  let rangeFrom = strana * perPage;
  let rangeTo = rangeFrom + perPage;

  let { data, error, count } = await supabase
  .from('bilbordi')
    .select(`*,
      grad!inner(id,naziv_grada,url_grada,
        regija!inner(id,naziv_regije,url_regije)
      )`, { count: 'exact' })
    .eq('status', true)
    .range(rangeFrom, rangeTo)
    .order('id', { ascending: true })

  let totalPages = await Math.ceil(count / perPage)
  
  return defer({ data, strana, totalPages, count });
}

export const fetchBilbordiAndFilter = async ({ strana = 0, perPage = 50, gradFilter = 0 }) => {
  
  let rangeFrom = strana * perPage;
  let rangeTo = rangeFrom + perPage;

  let supaQuery = supabase
    .from('bilbordi')
    .select(`*,
      grad!inner(id,naziv_grada,url_grada,
        regija!inner(id,naziv_regije,url_regije)
      )`, { count: 'exact' })
  
  supaQuery = supaQuery.eq('status', true);

  if(gradFilter) { supaQuery = supaQuery.eq('grad', gradFilter) }
    
  supaQuery = supaQuery.range(rangeFrom, rangeTo).order('id', { ascending: true })

  let { data, error, count } = await supaQuery

  let totalPages = await Math.ceil(count / perPage)
  
  return defer({ data, strana, totalPages, count });
}

export const lokacije = async (res) => {

  let strana = await Object.keys(res.params).includes('strana')
    ? parseInt(res.params.strana)
    : 0;
  
  let start = strana * 100;
  let end = strana * 100 + 99;

  let { data, error, count } = await supabase
  .from('bilbordi')
    .select(`*,
      grad!inner(id,naziv_grada,url_grada,
        regija!inner(id,naziv_regije,url_regije)
      )`, { count: 'exact' })
    .eq('status', true)
    .range(start, end)
    .order('id', { ascending: true })

  let totalPages = await Math.ceil(count / 100)
  console.log(strana);
  
  return defer({ data, strana, totalPages, count });
}

export const lokacijaSifra = async (res) => {
  let { sifra } = await res.params;
  console.log(sifra);

  let { data, error } = await supabase
    .from('bilbordi')
    .select(`*,
      grad (id,naziv_grada,url_grada,
        regija (id,naziv_regije,url_regije)
      )
    `)
    .eq('url', sifra)
    .single()

  return data;
}

export const lokacijePoGradu = async (res) => {

  let { grad } = await res.params;

  let { data, error, count } = await supabase
    .from('bilbordi')
    .select(`*, grad!inner(id,naziv_grada,url_grada)`, { count: 'exact'})
    .filter('status', 'eq', true)
    .filter('grad.url_grada', 'eq', grad)
  
  return data;
}

export const svePonude = async (res) => {

  let strana = await Object.keys(res.params).includes('strana')
    ? res.params.strana
    : 0;

  let data = await ponude(strana);
  
  return data;
}

export const ponude = async (strana) => {
  strana = await parseInt(strana);
  let page = strana * 100;
  let offset = strana * 100 + 99;

  let { data, error, count } = await supabase
    .from('ponude')
    .select('*', { count: 'exact' })
    .range(page, offset)
    .order('id', { ascending: true })

  let totalPages = await Math.ceil(count / 100)
  
  return defer({ data, strana, totalPages, count });
}

export const fetchPonude = async ({ strana = 0, perPage = 50, klijentFilter = 0 }) => {
  
  let rangeFrom = strana * perPage;
  let rangeTo = rangeFrom + perPage;

  let { data, error, count } = await supabase
  .from('ponude')
    .select('*', { count: 'exact' })
    .range(rangeFrom, rangeTo)
    .order('datum_izmene', { ascending: false })

  let totalPages = await Math.ceil(count / perPage)
  
  return defer({ data, strana, totalPages, count });
}

export const ponudaByID = async (id) => {

  let { data, error } = await supabase
    .from('ponude')
    .select('*')
    .eq('id', id)
    .single()
  
  return data;
}

export function setLocalForage(dbKey, dbValue, callback = null) {

  localForage.setItem(dbKey, dbValue)
    .then(val => console.log(val))
    .catch(err => console.log(err));
}

export const getLocalForage = async (dbKey, callback = null) => {
  try {
    let dbValue = await localForage.getItem(dbKey)
    return dbValue
  } catch (err) {
    console.log(err);
  }
}