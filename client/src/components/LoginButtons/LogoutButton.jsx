import React from "react";
import { useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logoutLogin } from "../../redux/actions";
import { IconButton, Menu, MenuItem, Button, Tooltip , Avatar } from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import PersonPinIcon from "@mui/icons-material/PersonPin";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";

const LogoutButton = () => {
  const { logout } = useAuth0();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector((state) => state.user);

  const [open, setOpen] = useState(false);
  const [element, setElement] = useState(null);

  const handleClick = (e) => {
    setOpen(!open);
    setElement(e.currentTarget);
  };

  const logoutHandler = () => {
    dispatch(logoutLogin());
    logout({ logoutParamns: { returnTo: window.location.origin } });
  };

  return (
    <>
      <Tooltip title={user.full_name}>
        <IconButton
          id="icon-button"
          onClick={handleClick}
          aria-controls={open ? "account-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
        >
          <Avatar 
            alt='user_avatar' 
            src={user.image} 
            sx={{ width: 32, height: 32 }}
          >
            <AccountCircleIcon sx={{ fontSize: 30 , color: 'gray' }} />
          </Avatar>
        </IconButton>
      </Tooltip>
      <Menu
        anchorEl={element}
        id="account-menu"
        open={open}
        onClose={handleClick}
        onClick={handleClick}
        disableScrollLock={true}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 1.5,
            "&:before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: 17,
              width: 10,
              height: 10,
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        {user.is_admin && (
          <MenuItem>
            <Button
              startIcon={<AdminPanelSettingsIcon />}
              onClick={() => navigate("/admin")}
            >
              Admin
            </Button>
          </MenuItem>
        )}
        <MenuItem>
          <Button
            startIcon={<PersonPinIcon />}
            onClick={() => navigate("/paciente")}
          >
            Perfil
          </Button>
        </MenuItem>
        <MenuItem>
          <Button startIcon={<LogoutIcon />} onClick={logoutHandler}>
            Salir
          </Button>
        </MenuItem>
      </Menu>
    </>
  );
};

export default LogoutButton;
