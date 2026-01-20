import React from "react";
import { Box, Typography, Grid, Card, CardContent, useTheme } from "@mui/material";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
// import Illustration from "./Illustration"; // Placeholder for an illustration component or image

const mockCategories = [
  { name: "Electronics", value: Math.random() * 100 },
  { name: "Fashion", value: Math.random() * 100 },
  { name: "Home Decor", value: Math.random() * 100 },
  { name: "Beauty", value: Math.random() * 100 },
  { name: "Sports", value: Math.random() * 100 },
];

// Define a color palette for the chart
const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#A28AE5"];

const CategoryDistribution = () => {
  const theme = useTheme();

  return (
    <Box mt={4} p={3} style={{ border: "2px solid #ccc", borderRadius: "12px", backgroundColor: "#f9f9f9" }}>
      {/* <Typography variant="h5" gutterBottom style={{ fontWeight: "bold", textAlign: "center" }}>
        Category Insights
      </Typography> */}
       <Typography variant="h6" fontFamily={'Poppins'} fontWeight={500} gutterBottom>
       Category Insights
      </Typography>
      <Grid container spacing={3} style={{display:'flex',alignItems:"center"}}>
        {/* Left Side: Pie Chart */}
        <Grid item xs={12} md={5}>
          <ResponsiveContainer width="100%" height={350}>
            <PieChart>
              <Pie
                data={mockCategories}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={120}
                innerRadius={60} // Adds a doughnut effect
                paddingAngle={5} // Adds spacing between slices
                fill={theme.palette.primary.main}
              >
                {mockCategories.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: "#fff",
                  border: "1px solid #ccc",
                  borderRadius: "8px",
                }}
                formatter={(value) => `${value.toFixed(1)}%`}
              />
              <Legend
                layout="horizontal"
                verticalAlign="bottom"
                align="center"
                iconType="circle"
              />
            </PieChart>
          </ResponsiveContainer>
        </Grid>

        {/* Right Side: Illustration or Additional Info */}
        <Grid item xs={12} md={7}>
          <Card
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              padding: "16px",
              flexGrow: 1, 
      minHeight: "250px",
              border: `2px dashed ${theme.palette.primary.main}`,
              backgroundColor: "#ffffff",
            }}
          >
            <Typography variant="h6" style={{ marginTop: "16px", textAlign: "center" }}>
              Explore Your Categories
            </Typography>
            <Typography
              variant="body2"
              style={{ marginTop: "8px", textAlign: "center", color: theme.palette.text.secondary }}
            >
              Analyze the performance of various categories and make informed decisions for your business growth.
            </Typography>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default CategoryDistribution;
