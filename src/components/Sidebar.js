import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import SidebarMenu from './SidebarMenu';
import Svg from './Svg';
import { Logo } from './Icons';

function Sidebar() {
  return (
    <Col className="sidebar-wrapper">
      <div className='sidebar'>
        <Row className="sidebar-header sticky-top">
          <Col>
            <Svg fill="#fff" viewBox="0 0 150 54" height="35" className='inline-block'><Logo /></Svg>
          </Col>
        </Row>
        <Row className="sidebar-body">
          <Col>
            <SidebarMenu />
          </Col>
        </Row>
        <Row className="sidebar-footer sticky-bottom">
          <Col></Col>
        </Row>
      </div>
    </Col>
  );
}

export default Sidebar;

