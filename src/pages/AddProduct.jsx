import React, { useState } from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Alert from "@mui/material/Alert";
import { useNavigate } from "react-router-dom";

const AddProduct = () => {
  const [name, setName] = useState("");
  const [stock, setStock] = useState("");
  const [price, setPrice] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleAdd = () => {
    if (!name || !stock || !price) {
      alert("Please fill all required fields.");
      return;
    }

    const newProduct = {
      id: Date.now(),
      title: name,
      stock: Number(stock),
      price: Number(price),
      thumbnail:
        imageUrl ||
        "https://img.freepik.com/premium-vector/pencil-vector-illustration-isolated-white-background_1044048-1006.jpg?semt=ais_hybrid&w=740&q=80",
    };

    const existing = JSON.parse(sessionStorage.getItem("customProducts")) || [];

    const updated = [newProduct, ...existing];

    sessionStorage.setItem("customProducts", JSON.stringify(updated));

    setSuccess(`Product "${newProduct.title}" added successfully!`);

    setTimeout(() => {
      navigate("/products");
    }, 500);
  };

  return (
    <Container sx={{ mt: 3 }}>
      <Typography variant="h4">Add Product</Typography>
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

        <Button variant="contained" onClick={handleAdd}>
          Add Product
        </Button>
      </Box>
    </Container>
  );
};

export default AddProduct;
