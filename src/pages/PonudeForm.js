import { useState, useEffect } from 'react'
import { Outlet } from "react-router-dom";


import { Spinner, Container, Row, Col, Tab, Tabs, Form } from 'react-bootstrap'
import DatePicker from "react-datepicker";
import { nanoid } from 'nanoid'
import localForage from 'localforage'

import { 
  supabaseUrl, 
  supabaseKey, 
  supabaseRestBaseUrl, 
  supabase, 
  setLocalForage, 
  getLocalForage,
  fetchData, fetchData2 } from '../utils/api'


import LokacijePonuda from '../components/LokacijePonuda';


const PonudeForm = props => {

  let initData = { strana: 0, totalPages: 0, perPage: 50, status: true, grad: 0, limit: 50, selected: [], selectedData: [], id: props.id || nanoid(10) }

  initData.offset = initData.strana * initData.limit;

  const [tabelaSettings, setTabelaSettings] = useState(initData)
  const [startDate, setStartDate] = useState(new Date())
  const [endDate, setEndDate] = useState(new Date(Date.now() + 7 * 86400000))
  const [lokacije, setLokacije] = useState([])
  const [selected, setSelected] = useState([])
  const [dataOfSelected, setDataOfSelected] = useState([])

  useEffect(() => {

    handleData()

  }, [])

  async function handleData() {
    let { status, limit, offset, strana, selected, grad } = tabelaSettings;
    let settings = { 
      limit: limit, 
      offset: strana * limit, 
      status: `is.${status}`,
      apikey: supabaseKey,
      // strana: strana
    }
    if(grad) { settings.grad = `eq.${grad}` };

    settings.select = '*,grad!inner(id,naziv_grada,url_grada)'

    let newData = await fetchData('bilbordi', settings, { 'Prefer': 'count=exact' });
    console.log(newData);
    setLokacije(newData);

    let newData2 = await fetchData2('bilbordi', settings, { 'Prefer': 'count=exact' });
    console.log(newData2);

    let newSettings = {...tabelaSettings, ...settings, strana }

    setTabelaSettings(newSettings)

    localForage.setItem('ponuda_lokacije', newSettings)
      .then(val => console.log(val))
      .catch(err => console.log(err))
  }


  const handleCheck = async (newSelect) => {

    setSelected(newSelect);
    
    let newSelectData = lokacije.filter(e => newSelect.includes(e.url));
    setDataOfSelected(newSelectData);

    let newSettings = await Object.assign({}, {...tabelaSettings}, {selected: newSelect}, { dataOfSelected: newSelectData })

    setTabelaSettings(newSettings)

    localForage.setItem('ponuda_lokacije', newSettings)
      .then(val => console.log(val))
      .catch(err => console.log(err))
  }


  return (
    <Container className="container mx-auto max-w-full">
      <Row className='justify-content-center'>
        <Col className='col-8'>
          <h2 className='mt-2 my-3'>Nova ponuda</h2>
        </Col>
      </Row>
      <Row className='justify-content-center'>
        <Col className='col-8'>
          <Form>

            <Form.Group className="mb-4" controlId="">
              <Form.Label>Klijent</Form.Label>
              <Form.Control type="text" placeholder="" />
            </Form.Group>

            <Form.Group className="mb-4" controlId="">
              <Form.Label>Naziv kampanje</Form.Label>
              <Form.Control type="text" placeholder="" />
            </Form.Group>

            <Form.Group className='row mb-4'>

              <Col className='col-6'>
                <Form.Label className='d-block'>Početak kampanje</Form.Label>
                <DatePicker
                  selected={startDate}
                  onChange={(date) => setStartDate(date)}
                  selectsStart
                  startDate={startDate}
                  endDate={endDate}
                  dateFormat='dd. MM. yyyy'
                  className='form-control start-date'
                />
              </Col>
              <Col className='col-6'>
                <Form.Label className='d-block'>Kraj kampanje</Form.Label>
                <DatePicker
                  selected={endDate}
                  onChange={(date) => setEndDate(date)}
                  selectsEnd
                  startDate={startDate}
                  endDate={endDate}
                  minDate={startDate}
                  dateFormat='dd. MM. yyyy'
                  className='form-control end-date'
                />
              </Col>
            </Form.Group>

            <Form.Group className="mb-3" controlId="">
              <Form.Label>Napomena</Form.Label>
              <Form.Control as="textarea" placeholder="" rows={5} />
            </Form.Group>

          </Form>
        </Col>
      </Row>
      <Row>
        <Col>
          <Tabs defaultActiveKey="all" variant='underline'>
            <Tab eventKey="all" title="Sve Lokacije">
              <h3 className='m-3'>Sve Lokacije</h3>
              {lokacije.length ? <LokacijePonuda key="loc-1" data={lokacije} selected={selected} handleCheck={handleCheck} type="all" /> : null}
            </Tab>
            <Tab eventKey="selected" title="Izabrane lokacije">
              <h3 className='m-3'>Izabrane lokacije</h3>
              {lokacije.length ? <LokacijePonuda key="loc-2" data={dataOfSelected} selected={selected} handleCheck={handleCheck} type="selected" /> : null}
            </Tab>
          </Tabs>
        </Col>
      </Row>
      <Outlet />
    </Container>
  )
}

export default PonudeForm