import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useLogoutMutation } from "../slices/userApiSlice";
import { logout } from "../slices/authSlice";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import IconButton from "@mui/material/IconButton";
import AccountCircle from "@mui/icons-material/AccountCircle";

const Header = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [logoutApiCall] = useLogoutMutation();

  // State for dropdown menu
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      navigate("/");
    } catch (err) {
      console.error(err);
    } finally {
      setAnchorEl(null); // Close the menu after logout
    }
  };

  return (
    <AppBar position="static" sx={{ bgcolor: "blue" }}>
      <Toolbar className="flex justify-between">
        {/* Left Side - Title */}
        <Typography variant="h6" component="div">
          MERN AUTH BLOGS
        </Typography>

        {/* Right Side - User Info or Login/Signup Links */}
        {userInfo ? (
          <div>
            <IconButton
              size="large"
              edge="end"
              color="inherit"
              onClick={handleMenu}
            >
              <AccountCircle />
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
            >
              <MenuItem disabled>
                <Typography variant="body2">
                  <strong>Email:</strong> {userInfo.user.email}
                </Typography>
              </MenuItem>
              <MenuItem disabled>
                <Typography variant="body2">
                  <strong>Role:</strong> {userInfo.user.role}
                </Typography>
              </MenuItem>
              <MenuItem onClick={handleLogout}>
                <Typography variant="body2">Logout</Typography>
              </MenuItem>
            </Menu>
          </div>
        ) : (
          <div>
            <Button color="inherit" onClick={() => navigate("/")}>
              Login
            </Button>
            <Button color="inherit" onClick={() => navigate("/signup")}>
              Signup
            </Button>
          </div>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Header;
