import React, { useState } from "react";
import { Link, NavLink, useParams, useNavigate} from "react-router-dom";
import { logo_large, hamburger, close } from "../../assets";
import { navLinks } from "../../constants";
import Button from "../Button";
import * as N from "./styles";
import { useEffect } from "react";

const Navbar = ({ onLogout }) => {
  const [openMobileNav, setOpenMobileNav] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();

  const handleLogout = () => {
    // Remove the token from localStorage
    localStorage.removeItem("token");
    // Call the onLogout function passed from App.jsx
    if (onLogout) {
      onLogout();
    }
    navigate('/login');
  };


  return (
    <>
      <N.NavbarStyled>
        <N.NavContainer>
          <N.LogoContainer href="/">
            <N.Logo src={logo_large} alt="logo" />
          </N.LogoContainer>

          <N.MobileMenu onClick={() => setOpenMobileNav(!openMobileNav)}>
            <N.MenuIconContainer>
              <N.MenuIcon
                src={openMobileNav ? close : hamburger}
                alt="menu"
                openMobileNav={openMobileNav}
              />
            </N.MenuIconContainer>
          </N.MobileMenu>

          <N.DesktopMenu>
            <N.NavList>
              {navLinks.map((link) => (
                <N.NavItem key={link.id}>
                  <NavLink
                    to={link.link}
                    style={({ isActive }) => {
                      return {
                        color: isActive ? "var(--color-primary-1)" : "inherit",
                      };
                    }}
                  >
                    {link.title}
                  </NavLink>
                </N.NavItem>
              ))}
            </N.NavList>

            <N.Container>
              <N.ButtonContainer>
                {/* <a href="/jobs"> */}
                <NavLink to={"/jobs"}>
                  <Button 
                  type1="primary" 
                  type2="default" 
                  value="Browse Jobs" />
                </NavLink>
                {/* </a> */}
              </N.ButtonContainer>
            </N.Container>
          </N.DesktopMenu>
        </N.NavContainer>
      </N.NavbarStyled>

      <N.MobileNav openMobileNav={openMobileNav}>
        <N.MobileNavContainer openMobileNav={openMobileNav}>
          <N.NavList>
            {navLinks.map((link) => (
              <N.NavItem key={link.id}>
                <NavLink
                  to={link.link}
                  style={({ isActive }) => {
                    return {
                      color: isActive ? "var(--color-primary-1)" : "inherit",
                    };
                  }}
                >
                  {link.title}
                </NavLink>
              </N.NavItem>
            ))}
          </N.NavList>

          <N.Container>
            <N.ButtonContainer>
              <NavLink to={"/jobs"} style={{ width: '100%' }}>
                <Button
                  type1="primary"
                  type2="default"
                  value="Browse Jobs"
                  width="100%"
                />
              </NavLink>
              </N.ButtonContainer>
          </N.Container>
        </N.MobileNavContainer>
      </N.MobileNav>
    </>
  );
};

export default Navbar;
