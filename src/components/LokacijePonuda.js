import { useState, useEffect, Suspense } from 'react'
import { Table, FormCheck, Badge, Image, Container, Row, Col, Form, FormText, FormSelect } from "react-bootstrap"
import Preloader from "./Preloader";
import { klase } from '../utils/lib'
import { gradoviLista } from '../utils/api'
import ReactPaginate from "react-paginate";

import { SunIcon, XCircleIcon } from '@heroicons/react/24/outline'


const TableRow = props => {

  let slikaSplit = props.row.slika.split('.');
  let thumbUrl = `https://bilbordi.rs/${slikaSplit[0]}_thumb.${slikaSplit[1]}`

  let osvetljenje = props.row.osvetljenje
    ? <SunIcon stroke="#59a211" strokeWidth=".125rem" width="20" />
    : <XCircleIcon stroke="#fd7e14" strokeWidth=".125rem" width="20" />

  let checked = Boolean(props.selected.indexOf(props.row.url) > -1);

  let handleCheck = () => {
    let newSelected = checked ? props.selected.filter(e => e !== props.row.url) : props.selected.concat(props.row.url);
    // let newSelectedData = props.row.filter(e => props.selected.includes(e.url));
    props.handleCheck(newSelected);
  }

  return (
    <tr onClick={e => console.log(e)}>
      <td className="checkboxCol">
        <FormCheck 
          label={false} 
          checked={checked}
          onChange={handleCheck}
          className="checkbox text-center" />
      </td>
      <td className="avatarCol d-none d-md-table-cell">
        <Image src={thumbUrl} thumbnail roundedCircle />
      </td>
      <td className="sifraCol">{props.row.sifra}</td>
      <td className="gradCol">{props.row.grad.naziv_grada}</td>
      <td className="dimenzijeCol">{props.row.dimenzije}</td>
      <td className="osvetljenjeCol d-none d-md-table-cell">{osvetljenje}</td>
      <td className="klasaCol d-none d-md-table-cell">
        <Badge className={klase[props.row.klasa].text.toLowerCase()} bg={klase[props.row.klasa].bg}>{klase[props.row.klasa].text}</Badge>
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

const LokacijePonuda = props => {

  return (
    <Container fluid="md">
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
              {props.data.map(row => <TableRow key={`${row.url}-${props.type}`} row={row} id={row.url} selected={props.selected} handleCheck={props.handleCheck} />)}
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

export default LokacijePonuda