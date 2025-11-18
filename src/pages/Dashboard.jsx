import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import CircularProgress from "@mui/material/CircularProgress";
import People from "@mui/icons-material/People";
import Store from "@mui/icons-material/Store";
import AttachMoney from "@mui/icons-material/AttachMoney";
import TrendingUp from "@mui/icons-material/TrendingUp";

const Dashboard = () => {
  const [products, setProducts] = useState(null);
  const [users, setUsers] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [productsRes, usersRes] = await Promise.all([
          fetch("https://dummyjson.com/products?limit=20"),
          fetch("https://dummyjson.com/users?limit=20"),
        ]);
        const productsJson = await productsRes.json();
        const usersJson = await usersRes.json();
        setProducts(productsJson.products);
        setUsers(usersJson.users);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
      >
        <CircularProgress />
      </Box>
    );
  }

  if (!products || !users) return <Typography>Error loading data</Typography>;

  const totalUsers = users.length;
  const totalProducts = products.length;
  const totalRevenue = products.reduce((sum, p) => sum + p.price, 0).toFixed(2);
  const avgPrice = (totalRevenue / totalProducts).toFixed(2);
  const maxPrice = Math.max(...products.map((p) => p.price));

  const chartData = products.slice(0, 8);

  return (
    <Box p={4}>
      <Box mb={4}>
        <Typography variant="h4" sx={{ mb: 2 }}>
          Dashboard
        </Typography>
        <Typography>Welcome back! Here's your data overview.</Typography>
      </Box>

      <Grid container spacing={3} mb={5}>
        {[
          {
            title: "Users",
            value: totalUsers,
            icon: <People />,
            color: "primary.main",
          },
          {
            title: "Products",
            value: totalProducts,
            icon: <Store />,
            color: "secondary.main",
          },
          {
            title: "Revenue",
            value: `$${totalRevenue}`,
            icon: <TrendingUp />,
            color: "success.main",
          },
          {
            title: "Avg Price",
            value: `$${avgPrice}`,
            icon: <AttachMoney />,
            color: "warning.main",
          },
        ].map((card, idx) => (
          <Grid item xs={12} sm={6} md={3} key={idx}>
            <Card
              sx={{
                display: "flex",
                alignItems: "center",
                p: 2,
                borderRadius: 3,
                boxShadow: 3,
                transition: "0.3s",
                "&:hover": { boxShadow: 6 },
              }}
            >
              <Avatar
                sx={{ bgcolor: card.color, mr: 2, width: 56, height: 56 }}
              >
                {card.icon}
              </Avatar>
              <Box>
                <Typography variant="subtitle2" color="textSecondary">
                  {card.title}
                </Typography>
                <Typography variant="h6" fontWeight="bold">
                  {card.value}
                </Typography>
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Card sx={{ mb: 5, p: 3, borderRadius: 3, boxShadow: 3 }}>
        <Typography variant="h6" mb={3}>
          Top Products by Price
        </Typography>
        {chartData.map((item, idx) => {
          const widthPercent = (item.price / maxPrice) * 100;
          return (
            <Box key={idx} mb={2}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  mb: 0.5,
                }}
              >
                <Typography variant="body2" fontWeight="bold">
                  {item.title}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  ${item.price}
                </Typography>
              </Box>
              <Box
                sx={{
                  bgcolor: "#e0e0e0",
                  borderRadius: 2,
                  height: 18,
                  overflow: "hidden",
                }}
              >
                <Box
                  sx={{
                    width: `${widthPercent}%`,
                    bgcolor: "primary.main",
                    height: "100%",
                    borderRadius: 2,
                    transition: "width 0.5s",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "flex-end",
                    pr: 1,
                    color: "#fff",
                    fontSize: 12,
                    fontWeight: "bold",
                    "&:hover": { bgcolor: "primary.dark" },
                  }}
                >
                  {Math.round(widthPercent)}%
                </Box>
              </Box>
            </Box>
          );
        })}
      </Card>

      <Box>
        <Typography variant="h6" mb={3}>
          Recent Products
        </Typography>
        <Grid container spacing={3}>
          {products.slice(0, 6).map((product) => (
            <Grid item xs={12} sm={6} md={4} key={product.id}>
              <Card
                sx={{
                  borderRadius: 3,
                  boxShadow: 3,
                  transition: "0.3s",
                  "&:hover": { boxShadow: 6 },
                }}
              >
                <Box
                  component="img"
                  src={product.thumbnail}
                  alt={product.title}
                  sx={{
                    width: "100%",
                    height: 200,
                    objectFit: "cover",
                    borderTopLeftRadius: 12,
                    borderTopRightRadius: 12,
                  }}
                />
                <CardContent>
                  <Typography variant="subtitle1" fontWeight="bold">
                    {product.title}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Price: ${product.price}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Rating: {product.rating}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
};

export default Dashboard;
