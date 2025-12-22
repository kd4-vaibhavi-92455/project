// Import necessary libraries and components
import React from 'react';
import { Box, Typography } from '@mui/material';
// import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import CategorySummary from './CategorySummary';
import CategoryDistribution from './CategoryDistribution';
import CompanySummary from './CompanySummary';

// Mock Data for the dashboard (replace with API calls)
// const mockCompanies = [
//   { id: 1, name: 'Tech Solutions', owner: 'John Doe', email: 'john@example.com', mobile: '1234567890', state: 'CA', city: 'Los Angeles' },
//   { id: 2, name: 'Retail Giants', owner: 'Jane Smith', email: 'jane@example.com', mobile: '0987654321', state: 'NY', city: 'New York' },
// ];

// const mockCategories = [
//   { id: 1, name: 'Electronics', description: 'Latest gadgets and devices' },
//   { id: 2, name: 'Home Appliances', description: 'Make your home smarter' },
// ];

// const mockProducts = [
//   { id: 1, name: 'Smartphone', category: 'Electronics', priceType: 'Fixed', trending: true },
//   { id: 2, name: 'Microwave', category: 'Home Appliances', priceType: 'Discounted', trending: false },
// ];

const DashboardOverview = () => {
  return (
    <Box sx={{ padding: 4 }}>
     
      {/* Company Summary Section */}
     <CompanySummary/>

      {/* Category Summary */}
      <CategorySummary/>

      {/* Visual Data Representation */}
      <CategoryDistribution/>
    </Box>
  );
};

export default DashboardOverview;
