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

import { Button, Table, Badge, Image, Container, Row, Col, Form, FormCheck, FormText, FormSelect, FormControl, FormLabel } from "react-bootstrap"

import { gradoviLista } from '../utils/api'

import { ArrowUturnLeftIcon, ArrowPathIcon } from '@heroicons/react/24/outline'

const BilbordiFilter = props => {

  const [isLoading, setIsLoading] = useState(true);
  const [gradovi, setGradovi] = useState([]);
  // const [perPage, setPerPage] = useState(50);
  // const [bilbordiData, setBilbordiData] = useState(initData);

  useEffect(() => {
    getGradovi()
  }, [])

  async function getGradovi() {
    let listaGradova = await gradoviLista();
    console.log(listaGradova);
    setGradovi(listaGradova)
  }

  if(!gradovi.length) return <Preloader />

  return (
    <Container className='mb-3'>
      <Row>
        <Col>
          <h3 className='text-uppercase fs-5'><strong>Filtriranje i pretraga</strong></h3>
        </Col>
      </Row>
      <Form className='row'>
        <Col>
          <FormLabel>Šifra:</FormLabel>
          <FormControl onChange={e => props.filterSifra(e.target.value)} /> 
        </Col>
        <Col>
          <FormLabel>Grad:</FormLabel>
          <FormSelect id="filterGrad" onChange={e => props.filterGrad(e.target.value)} value={props.gradFilter}>
            <option value={0}>- Izaberite grad -</option>
            {gradovi.map(itm => <option key={itm.url_grada} value={itm.id}>{itm.naziv_grada}</option>)}
          </FormSelect>
        </Col>
        <Col>
          <FormLabel className="d-block">Reset:</FormLabel>
          <Button variant="primary" className='icon-link'>
            <ArrowUturnLeftIcon width="16" strokeWidth=".135rem" /> Reset
          </Button>
        </Col>
      </Form>
    </Container>
  )
}

export default BilbordiFilter