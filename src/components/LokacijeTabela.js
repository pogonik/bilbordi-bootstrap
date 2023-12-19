import { useState, useEffect, Suspense } from 'react'
import { Table, FormCheck, Badge, Image, Container, Row, Col, Form, FormText, FormSelect } from "react-bootstrap"
import Preloader from "./Preloader";
import BilbordiFilter from "./BilbordiFilter";
import { klase } from '../utils/lib'
import { gradoviLista } from '../utils/api'
import ReactPaginate from "react-paginate";

import { SunIcon, XCircleIcon } from '@heroicons/react/24/outline'


const TableRow = ({row}) => {

  let slikaSplit = row.slika.split('.');
  let thumbUrl = `https://bilbordi.rs/${slikaSplit[0]}_thumb.${slikaSplit[1]}`

  let osvetljenje = row.osvetljenje
    ? <SunIcon stroke="#59a211" strokeWidth=".125rem" width="20" />
    : <XCircleIcon stroke="#fd7e14" strokeWidth=".125rem" width="20" />

  return (
    <tr onClick={e => console.log(row)}>
      <td className="checkboxCol"><FormCheck label={false} className="checkbox text-center" /></td>
      <td className="avatarCol d-none d-md-table-cell">
        <Image src={thumbUrl} thumbnail roundedCircle />
      </td>
      <td className="sifraCol">{row.sifra}</td>
      <td className="gradCol">{row.grad.naziv_grada}</td>
      <td className="dimenzijeCol">{row.dimenzije}</td>
      <td className="osvetljenjeCol d-none d-md-table-cell">{osvetljenje}</td>
      <td className="klasaCol d-none d-md-table-cell">
        <Badge className={klase[row.klasa].text.toLowerCase()} bg={klase[row.klasa].bg}>{klase[row.klasa].text}</Badge>
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

const LokacijeTabela = props => {

  const filterGrad = (val) => {
    props.filterLokacije({ grad: val })
  }

  const filterSifra = (val) => {
    props.filterLokacije({ url: `%${val}%` })
  }

  return (
    <Container fluid="md">
      
      <BilbordiFilter filterSifra={e => console.log(e)} filterGrad={e => console.log(e)} />

      <Row>
        <Col>
          <Table striped className="lokacije">
            <thead>
              <tr>
                <th className="checkboxHeadCol" />
                <th className="avatarHeadCol d-none d-md-table-cell">Slika</th>
                <th className="sifraHeadCol">Šifra</th>
                <th className="gradHeadCol">Grad</th>
                <th className="dimenzijeHeadCol">Dimenzije</th>
                <th className="osvetljenjeHeadCol d-none d-md-table-cell">Osvetljenje</th>
                <th className="klasaHeadCol d-none d-md-table-cell">Klasa</th>
              </tr>
            </thead>

            <tbody>
              {props.data.map(row => <TableRow key={row.url} row={row} id={row.url} />)}
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

export default LokacijeTabela