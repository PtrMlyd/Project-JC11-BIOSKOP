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
import {connect} from 'react-redux'


const Header = (props) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <div>
      <Navbar color="dark" dark expand="md">
        <NavbarBrand href="/">BIOSKOP JC11</NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className=" ml-auto" navbar>
            <NavItem className='pt-2'>
              <Link to="/manageAdmin"  style={{textDecoration:"none" ,color:'#9a9da0'}}>Manage Admin</Link>
            </NavItem>
            {props.namauser===''?
              <NavItem className='menu'>
                <Link to="/Login" className='' style={{textDecoration:"none" ,color:'#9a9da0'}}>Login</Link>
              </NavItem>
              :
              null
            }
            {
              props.namauser===''?
              null
              :
              <UncontrolledDropdown nav inNavbar>
                <DropdownToggle nav caret>
                  {props.namauser}
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
            }
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
}

const mapStateToProps=(state)=>{
  return{
    namauser:state.auth.userName
  } 
}

export default connect(mapStateToProps)(Header);