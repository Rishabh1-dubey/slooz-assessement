import { useState, useEffect } from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Alert from "@mui/material/Alert";
import { useParams, useNavigate } from "react-router-dom";

const EditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [stock, setStock] = useState("");
  const [price, setPrice] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const products = JSON.parse(sessionStorage.getItem("customProducts")) || [];
    const product = products.find((p) => p.id === Number(id));

    if (product) {
      setName(product.title);
      setStock(product.stock);
      setPrice(product.price);
      setImageUrl(product.thumbnail || "");
      setLoading(false);
    } else {
      async function fetchProduct() {
        try {
          const res = await fetch(`https://dummyjson.com/products/${id}`);
          const data = await res.json();

          setName(data.title);
          setStock(data.stock);
          setPrice(data.price);
          setImageUrl(data.thumbnail || "");
          setLoading(false);
        } catch (err) {
          console.error("Error fetching product:", err);
          setLoading(false);
        }
      }
      fetchProduct();
    }
  }, [id]);

  const handleEdit = () => {
    if (!name || !stock || !price) {
      alert("Please fill all required fields.");
      return;
    }

    const existing = JSON.parse(sessionStorage.getItem("customProducts")) || [];

    const updated = existing.map((p) =>
      p.id === Number(id)
        ? {
            ...p,
            title: name,
            stock: Number(stock),
            price: Number(price),
            thumbnail:
              imageUrl ||
              "https://img.freepik.com/premium-vector/pencil-vector-illustration-isolated-white-background_1044048-1006.jpg",
          }
        : p
    );

    sessionStorage.setItem("customProducts", JSON.stringify(updated));

    setSuccess(`Product "${name}" updated successfully!`);

    setTimeout(() => navigate("/products"), 500);
  };

  if (loading) {
    return (
      <Container sx={{ mt: 3 }}>
        <Typography variant="h5">Loading product...</Typography>
      </Container>
    );
  }

  return (
    <Container sx={{ mt: 3 }}>
      <Typography variant="h4">Edit Product</Typography>

      <Box
        sx={{
          mt: 2,
          display: "flex",
          flexDirection: "column",
          gap: 2,
          maxWidth: 400,
        }}
      >
        {success && <Alert severity="success">{success}</Alert>}

        <TextField
          label="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <TextField
          label="Stock"
          type="number"
          value={stock}
          onChange={(e) => setStock(e.target.value)}
        />

        <TextField
          label="Price"
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />

        <TextField
          label="Image URL (optional)"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
        />

        <Button variant="contained" onClick={handleEdit}>
          Save Changes
        </Button>
      </Box>
    </Container>
  );
};

export default EditProduct;
