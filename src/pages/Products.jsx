import { useEffect, useState } from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Pagination from "@mui/material/Pagination";
import { useNavigate, Link as RouterLink } from "react-router-dom";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const itemsPerPage = 10;

  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchProducts() {
      const sessionData = sessionStorage.getItem("customProducts");
      if (sessionData) {
        setProducts(JSON.parse(sessionData));
        return;
      }

      try {
        const res = await fetch("https://dummyjson.com/products?limit=100");
        const data = await res.json();
        setProducts(data.products);

        sessionStorage.setItem(
          "customProducts",
          JSON.stringify(data?.products)
        );
      } catch (err) {
        console.error("Fetch error:", err);
      }
    }

    fetchProducts();
  }, []);

  const start = (page - 1) * itemsPerPage;
  const paginatedProducts = products.slice(start, start + itemsPerPage);
  const pageCount = Math.ceil(products.length / itemsPerPage);

  return (
    <Container sx={{ mt: 3 }}>
      <Typography variant="h4" sx={{ mb: 2 }}>
        Products
      </Typography>

      {["manager", "storekeeper"].includes(user.role) && (
        <Button
          component={RouterLink}
          to="/add-product"
          variant="contained"
          sx={{ mb: 3 }}
        >
          Add Product
        </Button>
      )}

      <Grid container spacing={3} justifyContent="center">
        {paginatedProducts.map((p) => (
          <Grid
            item
            key={p?.id}
            sx={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Card
              sx={{
                width: 250,
                height: 380,
                borderRadius: 2,
                boxShadow: 3,
                display: "flex",
                flexDirection: "column",
              }}
            >
              <CardMedia
                component="img"
                image={p?.thumbnail}
                alt={p?.title}
                sx={{
                  height: 220,
                  objectFit: "cover",
                }}
              />

              <CardContent
                sx={{
                  flexGrow: 1,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  paddingBottom: 0,
                }}
              >
                <Typography
                  variant="subtitle1"
                  sx={{
                    fontWeight: 600,
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}
                >
                  {p?.title}
                </Typography>

                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    mb: 0,
                    flexShrink: 0,
                  }}
                >
                  <Typography
                    variant="body2"
                    sx={{
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}
                  >
                    <strong>Stock:</strong> {p?.stock}
                  </Typography>

                  <Typography
                    variant="body2"
                    sx={{
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}
                  >
                    <strong>${p?.price}</strong>
                  </Typography>
                </Box>

                {["manager", "storekeeper"].includes(user.role) && (
                  <Button
                    variant="outlined"
                    fullWidth
                    size="small"
                    onClick={() => navigate(`/edit-product/${p.id}`)}
                  >
                    Edit
                  </Button>
                )}
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Box sx={{ mt: 4, display: "flex", justifyContent: "center" }}>
        <Pagination
          count={pageCount}
          page={page}
          onChange={(e, value) => setPage(value)}
          color="primary"
        />
      </Box>
    </Container>
  );
};

export default Products;
