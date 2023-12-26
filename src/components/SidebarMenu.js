import Nav from 'react-bootstrap/Nav';
import { NavLink } from "react-router-dom";

import { HomeIcon, TvIcon, PlusCircleIcon, UserGroupIcon, UserPlusIcon, DocumentDuplicateIcon, DocumentPlusIcon } from '@heroicons/react/24/outline'


function SidebarMenu() {
  return (
    <Nav defaultActiveKey="/home" id="sidebar-menu" className="nav nav-pills flex-column sidebar-menu" as="nav">
      <NavLink className="nav-link icon-link" to="/home">
        <HomeIcon className='nav-icon' /><span className='nav-text'>Home</span>
      </NavLink>
      <NavLink className="nav-link icon-link" to="/bilbordi">
        <TvIcon className='nav-icon' /><span className='nav-text'>Bilbordi</span>
      </NavLink>
      <NavLink className="nav-link icon-link" to="/novi-bilbord">
        <PlusCircleIcon className='nav-icon' /><span className=''>Novi Bilbord</span>
      </NavLink>
      {/* <NavLink className="nav-link icon-link" to="/klijenti">
        <UserGroupIcon className='nav-icon' /><span className=''>Klijenti</span>
      </NavLink>
      <NavLink className="nav-link icon-link" to="/novi-klijent">
        <UserPlusIcon className='nav-icon' /><span className=''>Novi Klijent</span>
      </NavLink> */}
      <NavLink className="nav-link icon-link" to="/ponude">
        <DocumentDuplicateIcon className='nav-icon' /><span className=''>Ponude</span>
      </NavLink>
      <NavLink className="nav-link icon-link" to="/nova-ponuda">
        <DocumentPlusIcon className='nav-icon' /><span className=''>Nova Ponuda</span>
      </NavLink>
    </Nav>
  );
}

export default SidebarMenu;

