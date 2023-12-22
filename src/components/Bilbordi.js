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
import BilbordiFilter from "./BilbordiFilter"
import { Spinner, Container, Row, Col } from 'react-bootstrap';

import localForage from "localforage";

import { fetchBilbordi, fetchBilbordiAndFilter } from '../utils/api'


const Bilbordi = () => {

  let initData = { data: {}, strana: 0, totalPages: 0, perPage: 50 }

  const [isLoading, setIsLoading] = useState(true);
  const [strana, setStrana] = useState(0);
  const [perPage, setPerPage] = useState(50);

  const [gradFilter, setGradFilter] = useState(0);

  const [bilbordiData, setBilbordiData] = useState(initData);

  useEffect(() => {
    setIsLoading(true)
    handleData()
  }, [strana, perPage, gradFilter])

  async function handleData() {
    let newData = await fetchBilbordiAndFilter({ strana, perPage, gradFilter });
    console.log(newData);
    console.log('gradFilter');
    console.log(gradFilter);
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

  if(isLoading) return <Preloader />
  return (
    <>
      <BilbordiFilter filterGrad={e => setGradFilter(parseInt(e))} gradFilter={gradFilter} />
      <LokacijeTabela {...bilbordiData} handleData={e => setStrana(e)} />
    </>
  )
}

export default Bilbordi