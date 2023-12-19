import { useEffect } from 'react'
import { Outlet } from "react-router-dom";
import NavBar from './NavBar'
import Sidebar from './Sidebar'
// import MainHero from './MainHero'

import { Container, Row, Col } from 'react-bootstrap';

const Layout = props => {

  // useEffect(() => {
  //   window.addEventListener('resize', e => {
  //     console.log(e.currentTarget.innerWidth);
  //     console.log(e.currentTarget.innerHeight);
  //   })
  //   return () => {
  //     window.removeEventListener('resize', e => { console.log(e) })
  //   }
  // })

  return (
    <Container fluid>
      <Row>
        <Sidebar />
        <Col style={{padding:0}}>
          <NavBar />
          <Outlet />
        </Col>
      </Row>
    </Container>
  )
}

export default Layout