import react, { useEffect, useState, useContext } from "react";
import PropTypes from "prop-types";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import DashboardIcon from "@mui/icons-material/Dashboard";
import TaskIcon from "@mui/icons-material/Task";
import FaceIcon from "@mui/icons-material/Face";
import LeaderboardIcon from "@mui/icons-material/Leaderboard";
import WysiwygIcon from "@mui/icons-material/Wysiwyg";
import Menu from "@mui/material/Menu";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import Diversity2Icon from "@mui/icons-material/Diversity2";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import UserContext from "../../UserContext.js";

const drawerWidth = 240;
const settings = [
  { name: "Dashboard", route: "/portal", sign: false },
  { name: "Logout", route: "/", sign: true },
];
const SideData = [
  {
    title: "Dashboard",
    icon: <DashboardIcon />,
    route: "",
    Admin: window.localStorage.getItem("Admin") ? false : true,
  },
  {
    title: "Project",
    icon: <WysiwygIcon />,
    route: "projectList",
    Admin: window.localStorage.getItem("Admin") ? false : true,
  },
  {
    title: "People",
    icon: <FaceIcon />,
    route: "userList",
  },
  {
    title: "Task",
    icon: <TaskIcon />,
    route: "task",
    Admin: window.localStorage.getItem("Admin") ? false : true,
  },
  {
    title: "Report",
    icon: <LeaderboardIcon />,
    route: "report",
  },
];
function ResponsiveDrawer(props) {
  let context = useContext(UserContext);
  const [storage, setStorage] = useState("");
  const { window } = props;
  let navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const { admin } = context;

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const logout = (e) => {
    e.preventDefault();
    navigate("/");
    localStorage.clear();
  };

  const drawer = (
    <div>
      <h2 className="mx-5 mt-4">{admin ? "Admin" : " User"}</h2>
      <Divider />
      <List>
        {admin
          ? SideData.map((text, index) => (
              <ListItem key={index} disablePadding>
                <ListItemButton
                  sx={{ color: "black" }}
                  as={Link}
                  to={`${text.route}`}
                >
                  <ListItemIcon>{text.icon}</ListItemIcon>
                  <ListItemText primary={text.title} />
                </ListItemButton>
              </ListItem>
            ))
          : SideData.map((text, index) => (
              <ListItem key={index} disablePadding>
                {text.Admin ? (
                  <ListItemButton
                    sx={{ color: "black" }}
                    as={Link}
                    to={`${text.route}`}
                  >
                    <ListItemIcon>{text.icon}</ListItemIcon>
                    <ListItemText primary={text.title} />
                  </ListItemButton>
                ) : (
                  ""
                )}
              </ListItem>
            ))}
      </List>
    </div>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
          fontFamily: "poppins",
        }}
        elevation={0}
      >
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            noWrap
            component="a"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "poppins",
              fontWeight: 700,
              color: "Black",
              textDecoration: "none",
              fontSize: "1.7rem",
            }}
          >
            Csynergy
          </Typography>
          <Typography
            variant="h5"
            noWrap
            component="a"
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "poppins",
              fontWeight: 700,
              color: "black",
              textDecoration: "none",
            }}
          >
            Csynergy
          </Typography>
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Diversity2Icon
                  sx={{
                    color: "Black",
                    fontSize: "40px",
                  }}
                />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <ListItemButton
                  key={setting.name}
                  onClick={setting.sign ? logout : ""}
                  sx={{ color: "black" }}
                  as={Link}
                  to={`${setting.route}`}
                >
                  <Typography sx={{ fontFamily: "poppins" }} textAlign="center">
                    {setting.name}
                  </Typography>
                </ListItemButton>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </AppBar>

      {/* SideBar */}
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
    </Box>
  );
}

ResponsiveDrawer.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

export default ResponsiveDrawer;
