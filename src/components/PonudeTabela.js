import { useState, useEffect, Suspense } from 'react'
import { Table, FormCheck, Badge, Image, Container, Row, Col, Form, FormText, FormSelect } from "react-bootstrap"
import ReactPaginate from "react-paginate";

import Preloader from "./Preloader";

import { formatDatum, slugify, unserializeLokacije } from '../utils/lib';

const PonudeTableRow = ({row}) => {

  
  let unserLokacije = unserializeLokacije(row.lokacije)
  let urlLokacija = unserLokacije.map(lok => slugify(lok))
  console.log(urlLokacija);

  return (
    <tr onClick={e => console.log(row)}>
      <td className="klijentCol">{row.klijent}</td>
      <td className="kampanjaCol">{row.naziv_kampanje}</td>
      <td className="pocetakCol">{formatDatum(row.pocetak)}</td>
      <td className="krajCol">{formatDatum(row.kraj)}</td>
      <td className="lokacijeCol">
        <div className='text-truncate' style={{maxWidth:'200px'}}>{unserLokacije.join(', ')}</div>
      </td>
    </tr>
  )
}

const paginationAttributes = {
  className: "pagination",
  pageClassName: "page-item",
  pageLinkClassName: "page-link",
  previousClassName: "page-item",
  previousLinkClassName: "page-link",
  nextClassName: "page-item",
  nextLinkClassName: "page-link",
  breakClassName: "page-item",
  breakLinkClassName: "page-link",
  activeClassName: "page-item active",
  activeLinkClassName: "page-link"
}

const PonudeTabela = props => {

  // const filterGrad = (val) => {
  //   props.filterLokacije({ grad: val })
  // }

  // const filterSifra = (val) => {
  //   props.filterLokacije({ url: `%${val}%` })
  // }

  return (
    <Container fluid="md">
      
      {/* <BilbordiFilter filterSifra={e => console.log(e)} filterGrad={e => console.log(e)} /> */}

      <Row>
        <Col>
          <Table striped className="ponude">
            <thead>
              <tr>
                <th className="klijentHeadCol">Klijent</th>
                <th className="kampanjaHeadCol">Kampanja</th>
                <th className="pocetakHeadCol">Početak</th>
                <th className="krajHeadCol">Kraj</th>
                <th className="lokacijeHeadCol">Lokacije</th>
              </tr>
            </thead>

            <tbody>
              {props.data.map(row => <PonudeTableRow key={row.id} row={row} id={row.id} />)}
            </tbody>
          </Table>
        </Col>
      </Row>
      <Row>
        <Col className="d-flex justify-content-center">
          <ReactPaginate {...paginationAttributes} onPageChange={e => props.handleData(e.selected)} pageCount={props.totalPages} initialPage={props.strana} />
        </Col>
      </Row>
    </Container>
  )
}

export default PonudeTabela