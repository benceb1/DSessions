import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { logout, reset } from "../features/auth/authSlice";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import { DrawerHeader, Main, AppBar } from "@/components/NavbarComponents";
import { DRAWER_WIDTH } from "@/utils/constants";

const Layout = ({ children }) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [open, setOpen] = React.useState(false);

  const { user } = useSelector((state) => state.auth);

  const onLogout = () => {
    dispatch(logout());
    dispatch(reset());
    navigate("/");
  };

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ display: "flex", height: "100vh" }}>
      <AppBar elevation={3} position="fixed" open={open}>
        <Toolbar>
          <Typography
            noWrap
            fontWeight="bold"
            fontSize="clamp(1rem, 2rem, 2.25rem)"
            onClick={() => navigate("/")}
            sx={{
              flexGrow: 1,
              "&:hover": {
                cursor: "pointer",
              },
            }}
          >
            🔥HabárApp🔥
          </Typography>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="end"
            onClick={handleDrawerOpen}
            sx={{ ...(open && { display: "none" }) }}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Main open={open}>
        <DrawerHeader />
        {children}
      </Main>

      <Drawer
        sx={{
          width: DRAWER_WIDTH,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: DRAWER_WIDTH,
          },
        }}
        variant="persistent"
        anchor="right"
        open={open}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "rtl" ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {navElements.map(({ text, link }, index) => (
            <ListItem key={text} disablePadding>
              <ListItemButton component={Link} to={link}>
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          ))}
          {user ? (
            <ListItem disablePadding>
              <ListItemButton onClick={onLogout}>
                <ListItemText primary="Logout" />
              </ListItemButton>
            </ListItem>
          ) : (
            <ListItem disablePadding>
              <ListItemButton component={Link} to="login">
                <ListItemText primary="Login" />
              </ListItemButton>
            </ListItem>
          )}
        </List>
      </Drawer>
    </Box>
  );
};

export default Layout;

const navElements = [
  {
    text: "Venues",
    link: "venues",
  },
  {
    text: "Products",
    link: "products",
  },
  {
    text: "Session",
    link: "Session",
  },
];
