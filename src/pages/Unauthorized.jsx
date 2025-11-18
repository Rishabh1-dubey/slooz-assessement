import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";

const Unauthorized = () => {
  const navigate = useNavigate();
  return (
    <Box textAlign="center" mt={10}>
      <Typography variant="h4">Access Denied</Typography>
      <Typography>You do not have permission to view this page.</Typography>
      <Button onClick={() => navigate("/")} sx={{ mt: 2 }}>
        Go to Login
      </Button>
    </Box>
  );
};

export default Unauthorized;
