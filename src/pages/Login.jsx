import { useState } from "react";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import InputAdornment from "@mui/material/InputAdornment";
import Typography from "@mui/material/Typography";
import MenuItem from "@mui/material/MenuItem";
import Alert from "@mui/material/Alert";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Email from "@mui/icons-material/Email";
import Lock from "@mui/icons-material/Lock";
import { useNavigate } from "react-router-dom";
import { users } from "../api/dummyData";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [err, setErr] = useState("");
  const navigate = useNavigate();

  const validate = () => {
    if (!email.trim()) return "Email is required";
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) return "Enter a valid email";

    if (!password.trim()) return "Password is required";

    if (!role.trim()) return "Please select a role";

    return null;
  };

  const handleLogin = () => {
    const validationError = validate();
    if (validationError) {
      setErr(validationError);
      return;
    }

    const found = users.find(
      (u) => u.email === email && u.password === password && u.role === role
    );

    if (!found) {
      setErr("Invalid email, password, or role");
      return;
    }

    localStorage.setItem("user", JSON.stringify(found));

    if (found.role === "manager") navigate("/dashboard");
    else navigate("/products");
  };

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          my: 4,
          p: 4,
          border: "1px solid #ddd",
          borderRadius: 2,
          boxShadow: 2,
          display: "flex",
          flexDirection: "column",
          gap: 3,
        }}
      >
        <Typography variant="h4" textAlign="center">
          Log in
        </Typography>

        <TextField
          label="Email"
          variant="outlined"
          fullWidth
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            setErr("");
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Email />
              </InputAdornment>
            ),
          }}
        />
        <TextField
          label="Password"
          variant="outlined"
          type="password"
          fullWidth
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
            setErr("");
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Lock />
              </InputAdornment>
            ),
          }}
        />
        <TextField
          select
          label="Role"
          fullWidth
          value={role}
          onChange={(e) => {
            setRole(e.target.value);
            setErr("");
          }}
        >
          <MenuItem value="manager">Manager</MenuItem>
          <MenuItem value="storekeeper">Store Keeper</MenuItem>
        </TextField>
        {err && <Alert severity="error">{err}</Alert>}
        <Button
          variant="contained"
          color="primary"
          size="large"
          fullWidth
          onClick={handleLogin}
        >
          Log in
        </Button>
        <Box sx={{ mt: 3 }}>
          <Grid container spacing={3} justifyContent="center">
            <Grid size={6} item>
              <Card sx={{ boxShadow: 3, borderRadius: 2 }}>
                <CardContent>
                  <Typography
                    variant="h6"
                    sx={{ fontWeight: 600, mb: 1, color: "primary.main" }}
                  >
                    Role: Manager
                  </Typography>
                  <Typography variant="body1">
                    <strong>Email:</strong> manager@slooze.com
                  </Typography>
                  <Typography variant="body1">
                    <strong>Password:</strong> 123456
                  </Typography>
                </CardContent>
              </Card>
            </Grid>

            <Grid size={6} item>
              <Card sx={{ boxShadow: 3, borderRadius: 2 }}>
                <CardContent>
                  <Typography
                    variant="h6"
                    sx={{ fontWeight: 600, mb: 1, color: "secondary.main" }}
                  >
                    Role: Shop Keeper
                  </Typography>
                  <Typography variant="body1">
                    <strong>Email:</strong> keeper@slooze.com
                  </Typography>
                  <Typography variant="body1">
                    <strong>Password:</strong> 123456
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};

export default Login;
