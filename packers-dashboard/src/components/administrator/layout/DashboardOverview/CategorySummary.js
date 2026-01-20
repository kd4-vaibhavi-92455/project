import React from "react";
import { Box, Typography, Grid, Card, CardContent, Avatar, useTheme } from "@mui/material";
import CategoryIcon from "@mui/icons-material/Category";

const mockCategories = [
  { id: 1, name: "Electronics", description: "Devices, gadgets, and more." },
  { id: 2, name: "Fashion", description: "Clothing and accessories." },
  { id: 3, name: "Home Decor", description: "Furniture and decorative items." },
  // Add more categories as needed
];

const CategorySummary = () => {
  const theme = useTheme();

  return (
    <Box mt={4}>
      <Typography variant="h6" fontFamily={'Poppins'} fontWeight={500} gutterBottom>
        Categories Details
      </Typography>
      <Grid container spacing={4}>
        {mockCategories.map((category) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={category.id}>
            <Card
              sx={{
                boxShadow: "0px 2px 6px rgba(0, 0, 0, 0.2)",
                borderRadius: "8px",
                overflow: "hidden",
                transition: "transform 0.3s, box-shadow 0.3s",
                height: "100%",
                "&:hover": {
                  transform: "scale(1.05)",
                  boxShadow: "0px 6px 16px rgba(0, 0, 0, 0.3)",
                },
              }}
            >
              <CardContent sx={{ textAlign: "center", padding: 3 }}>
                <Avatar
                  sx={{
                    margin: "0 auto",
                    backgroundColor: theme.palette.primary.main,
                    width: 72,
                    height: 72,
                    marginBottom: 2,
                  }}
                >
                  <CategoryIcon sx={{ color: "white", fontSize: 32 }} />
                </Avatar>
                <Typography
                  variant="h6"
                  sx={{ fontWeight: "bold", marginBottom: 1 }}
                >
                  {category.name}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    color: theme.palette.text.secondary,
                    lineHeight: "1.5",
                    fontSize: { xs: "0.875rem", sm: "1rem" },
                  }}
                >
                  {category.description}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default CategorySummary;
