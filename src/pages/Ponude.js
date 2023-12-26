import { useState, useEffect } from 'react'
import { Link, Outlet, useLoaderData, useParams, defer, Await } from "react-router-dom";

import PonudeTabela from '../components/PonudeTabela';
import Preloader from "../components/Preloader";

import localForage from "localforage";
import { nanoid } from 'nanoid'
import { fetchPonude } from '../utils/api'



const Ponude = () => {

  let initData = { data: {}, strana: 0, totalPages: 0, perPage: 50, status: true, grad: 0, selected: {}, id: nanoid(10) }

  const [isLoading, setIsLoading] = useState(true);
  const [strana, setStrana] = useState(0);
  const [perPage, setPerPage] = useState(50);

  const [klijentFilter, setKlijentFilter] = useState(0);
  const [sifraFilter, setSifraFilter] = useState('');

  const [ponudeData, setPonudeData] = useState(initData);

  useEffect(() => {
    setIsLoading(true)
    handleData()
  }, [strana, perPage])

  async function handleData() {
    let newData = await fetchPonude({ strana, perPage, klijentFilter });
    console.log(newData);
    await setPonudeData(newData.data);
    setIsLoading(false);
    setLocalForage(newData.data)
  }

  function setLocalForage(pageData) {
    let newPageData = {};

    for(const key in pageData) {
      if(key !== 'data') newPageData[key] = pageData[key]
    }

    localForage.setItem('ponude_listing_props', newPageData)
      .then(val => console.log(val))
      .catch(err => console.log(err));
  }

  if(isLoading) return <Preloader />

  return (
    <PonudeTabela {...ponudeData} handleData={e => setStrana(e)} />
  )
}

export default Ponude