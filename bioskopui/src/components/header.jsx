import React, { useState } from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from 'reactstrap';
import {Link} from 'react-router-dom'


const Header = (props) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <div>
      <Navbar color="dark" dark expand="md">
        <NavbarBrand href="/">BIOSKOP JC11</NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="ml-auto" navbar>
            <NavItem className='pt-2 pr-2' >
              <input type="text" placeholder='Cari Film'/>
            </NavItem>
            <NavItem className='pt-2 pr-2'>
              <Link to="/manageAdmin" className='' style={{textDecoration:"none" ,color:'#9a9da0'}}>Manage Admin</Link>
            </NavItem>
            <NavItem className='pt-2'>
              <Link to="/Login" className='' style={{textDecoration:"none" ,color:'#9a9da0'}}>Login</Link>
            </NavItem>
            <UncontrolledDropdown nav inNavbar>
              <DropdownToggle nav >
                My Account
              </DropdownToggle>
              <DropdownMenu right>
                <DropdownItem>
                  View Profile
                </DropdownItem>
                <DropdownItem>
                  View Cart
                </DropdownItem>
                <DropdownItem divider />
                <DropdownItem>
                  Sign Out
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
}

export default Header;