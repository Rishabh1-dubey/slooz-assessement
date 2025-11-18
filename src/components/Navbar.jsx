import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import { Link as RouterLink, useLocation, useNavigate } from "react-router-dom";
import Brightness4 from "@mui/icons-material/Brightness4";
import Brightness7 from "@mui/icons-material/Brightness7";

const MENU = [
  { label: "Dashboard", path: "/dashboard", roles: ["manager"] },
  { label: "Products", path: "/products", roles: ["manager", "storekeeper"] },
  {
    label: "Add Product",
    path: "/add-product",
    roles: ["manager", "storekeeper"],
  },
];

const Navbar = ({ toggleTheme, currentMode }) => {
  const user = JSON.parse(localStorage.getItem("user") || "null");
  const navigate = useNavigate();
  const location = useLocation();

  if (location.pathname === "/login") return null;

  const logout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  const allowedMenu = user
    ? MENU.filter((item) => item.roles.includes(user.role))
    : [];

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Slooze Management
        </Typography>
        <Box sx={{ display: "flex", gap: 2 }}>
          {allowedMenu.map((item) => (
            <Button
              key={item.label}
              component={RouterLink}
              to={item.path}
              sx={{
                color:
                  location.pathname === item.path ? "#04ff15ff" : "inherit",
                fontWeight: location.pathname === item.path ? "bold" : "normal",
              }}
            >
              {item.label}
            </Button>
          ))}

          <IconButton color="inherit" onClick={toggleTheme}>
            {currentMode === "dark" ? <Brightness7 /> : <Brightness4 />}
          </IconButton>

          {user && (
            <Button color="inherit" onClick={logout}>
              Logout
            </Button>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
