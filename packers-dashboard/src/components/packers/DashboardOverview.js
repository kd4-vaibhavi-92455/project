import React from "react";
import { Box, Grid, Card, CardContent, Typography } from "@mui/material";

const DashboardOverview = () => {
  // Dummy summary data
  const summary = [
    { title: "Total Bookings", value: 120 },
    { title: "Pending Approvals", value: 15 },
    { title: "Completed Bookings", value: 95 },
    { title: "Registered Customers", value: 80 },
    { title: "Drivers Available", value: 20 },
    { title: "Vehicles Available", value: 10 },
  ];

  return (
    <Box sx={{ p: 3, backgroundColor: "#f4f6f8", minHeight: "100vh" }}>
      <Typography variant="h5" gutterBottom>
        Dashboard Overview
      </Typography>

      <Grid container spacing={3}>
        {summary.map((item, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card sx={{ minHeight: 120 }}>
              <CardContent>
                <Typography variant="subtitle2" color="textSecondary">
                  {item.title}
                </Typography>
                <Typography variant="h4" color="primary">
                  {item.value}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Box sx={{ mt: 4 }}>
        <Typography variant="h6" gutterBottom>
          Recent Bookings
        </Typography>
        <Card>
          <CardContent>
            <Typography>No recent bookings yet (dummy data)</Typography>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
};

export default DashboardOverview;
