import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

const Header = ({ role, setRole}) => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  
  const toggleMenu = () => {
    setMenuOpen((prev) => !prev);
  };

  const handleLoginClick = () => {
    navigate("/login");
  };

  const handleLogout = () => {
    setRole(null);
    navigate("/");
  };

  const handleDashboardClick = () => {
    navigate("/dashboard");
  };


  return (
    <AppBar position="static" color="white">
      <Toolbar>
        {/* Toggle Menu Icon */}
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ mr: 2 }}
          onClick={toggleMenu}
        >
          {menuOpen ? <CloseIcon /> : <MenuIcon />}
        </IconButton>

        {/* App Title */}
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Enforce
        </Typography>

        {/* Conditional Button: Login or Profile */}
        {role ? (
          <>
            <Button
              color="inherit"
              onClick={handleLogout}
              startIcon={<AccountCircleIcon />}
            >
              Logout
            </Button>
            {role === "admin" && (
              <Button color="inherit" onClick={handleDashboardClick}>
                Dashboard
              </Button>
            )}
          </>
        ) : (
          <Button color="inherit" onClick={handleLoginClick}>
            Login
          </Button>
        )}
      </Toolbar>

      {/* Dropdown Menu */}
      {menuOpen && (
        <div
          style={{
            backgroundColor: "#f4f4f4",
            padding: "1rem",
            position: "absolute",
            top: "64px",
            width: "100%",
            zIndex: 1000,
          }}
        >
          <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
            <li>
              <Button onClick={() => navigate("/")}>Home</Button>
            </li>
            <li>
              <Button onClick={() => navigate("/query")}>Law Queries</Button>
            </li>
            <li>
              <Button onClick={() => navigate("/about")}>About</Button>
            </li>
            <li>
              <Button onClick={() => navigate("/contact")}>Contact</Button>
            </li>
          </ul>
        </div>
      )}
    </AppBar>
  );
};

export default Header;
