import { useState, useEffect, Suspense } from 'react'
import {
  Link,
  Outlet,
  useLoaderData,
  useParams,
  defer,
  Await,
  useNavigation
} from "react-router-dom";

import Preloader from "./Preloader";
import LokacijeTabela from "./LokacijeTabela";

import { Spinner, Container, Row, Col } from 'react-bootstrap';

import localForage from "localforage";

import { fetchBilbordi } from '../utils/api'

const BilbordiLista = props => {
  console.log(props.items);

  let { data, strana, totalPages } = props.items;

  return <LokacijeTabela data={data} strana={strana} totalPages={totalPages} />
}


const Bilbordi = () => {

  let initData = { data: {}, strana: 0, totalPages: 0, perPage: 50 }

  const [isLoading, setIsLoading] = useState(true);
  const [strana, setStrana] = useState(0);
  const [perPage, setPerPage] = useState(50);

  const [gradFilter, setGradFilter] = useState(0);
  const [sifraFilter, setSifraFilter] = useState('');

  const [bilbordiData, setBilbordiData] = useState(initData);

  useEffect(() => {
    setIsLoading(true)
    handleData()
  }, [strana, perPage])

  async function handleData() {
    let newData = await fetchBilbordi({ strana, perPage, gradFilter, sifraFilter });
    console.log(newData);
    await setBilbordiData(newData.data);
    setIsLoading(false);
    setLocalForage(newData.data)
  }

  function setLocalForage(pageData) {
    let newPageData = {};

    for(const key in pageData) {
      if(key !== 'data') newPageData[key] = pageData[key]
    }

    localForage.setItem('bilbordi_table_props', newPageData)
      .then(val => console.log(val))
      .catch(err => console.log(err));
  }

  // function filterLokacije()

  if(isLoading) return <Preloader />
  return (
    <LokacijeTabela {...bilbordiData} handleData={e => setStrana(e)} />
    // <Suspense fallback={<Preloader />}>
    //   <LokacijeTabela {...bilbordiData} handleData={handleData} />
    // </Suspense>
  )
}

export default Bilbordi