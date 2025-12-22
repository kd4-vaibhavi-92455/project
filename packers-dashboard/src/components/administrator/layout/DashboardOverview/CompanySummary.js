import React from "react";
import { Grid, Typography } from "@mui/material";

const mockCompanies = [
  {
    id: 1,
    owner: "Arvind Sharma",
    email: "arvind.sharma@example.com",
    phone: "+91 98765 43210",
    location: "Mumbai, Maharashtra",
    logo: "/assets/images/logo.png",
    industry: "Technology",
    establishedYear: 2010,
    website: "https://www.arvindtech.com",
    employeesCount: 250,
    services: "Software Development, Web Design, IT Consulting",
  },
  {
    id: 2,
    owner: "Priya Patel",
    email: "priya.patel@example.com",
    phone: "+91 91234 56789",
    location: "Bengaluru, Karnataka",
    logo: "/assets/images/logo.png",
    industry: "E-commerce",
    establishedYear: 2015,
    website: "https://www.priyashop.com",
    employeesCount: 120,
    services: "Online Retail, Product Sales, Logistics",
  },
  {
    id: 3,
    owner: "Rahul Mehta",
    email: "rahul.mehta@example.com",
    phone: "+91 98987 65432",
    location: "Delhi, India",
    logo: "/assets/images/logo.png",
    industry: "Education",
    establishedYear: 2012,
    website: "https://www.rahuledu.com",
    employeesCount: 80,
    services: "Online Courses, Tutoring, Educational Consultancy",
  },
  {
    id: 4,
    owner: "Neha Gupta",
    email: "neha.gupta@example.com",
    phone: "+91 87654 32109",
    location: "Chennai, Tamil Nadu",
    logo: "/assets/images/logo.png",
    industry: "Healthcare",
    establishedYear: 2008,
    website: "https://www.nehacare.com",
    employeesCount: 350,
    services: "Medical Services, Healthcare Consultancy, Diagnostics",
  },
  {
    id: 5,
    owner: "Suresh Kumar",
    email: "suresh.kumar@example.com",
    phone: "+91 99000 11223",
    location: "Kolkata, West Bengal",
    logo: "/assets/images/logo.png",
    industry: "Manufacturing",
    establishedYear: 2005,
    website: "https://www.sureshmfg.com",
    employeesCount: 500,
    services: "Product Manufacturing, Industrial Equipment, Export",
  },
];

const CompanySummary = () => {
  return (
    <>
      <Typography
        variant="h6"
        fontFamily={"Poppins"}
        fontWeight={500}
        gutterBottom
      >
        Company Summary
      </Typography>
      <Grid container spacing={4}>
        {mockCompanies?.map((company) => (
          <Grid item xs={12} md={4} key={company.id}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                boxShadow:
                  "0px 2px 4px rgba(0, 0, 0, 0.1), 0px 6px 20px rgba(0, 0, 0, 0.1)",
                borderRadius: "8px",
                overflow: "hidden",
                backgroundColor: "#fff",
                //  marginTop:20
              }}
            >
              {/* Left Section: Image Container */}
              <div
                style={{
                  width: "100px",
                  height: "100px",
                  //  borderRight: "2px solid #ddd",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  //  background: "linear-gradient(145deg, #f0f0f0, #d9d9d9)",
                  marginLeft: "10px",
                  borderRadius: "7px",
                  //  backgroundColor:'#fff'
                }}
              >
                <img
                  src="/assets/images/logo.png"
                  alt="Company Logo"
                  style={{
                    width: "80%",
                    height: "80%",
                    borderRadius: "8px",
                    boxShadow: "0px 3px 6px rgba(0, 0, 0, 0.2)",
                  }}
                />
              </div>

              {/* Right Section: Details */}
              <div
                style={{
                  flex: 1,
                  padding: "12px 16px",
                  backgroundColor: "#f8f9fa",
                }}
              >
                <Typography
                  variant="h6"
                  style={{ marginBottom: "4px", fontWeight: "600" }}
                >
                  Owner: John Doe
                </Typography>
                <Typography
                  variant="body2"
                  style={{ marginBottom: "4px", color: "#555" }}
                >
                  Email: john@example.com
                </Typography>
                <Typography
                  variant="body2"
                  style={{ marginBottom: "4px", color: "#555" }}
                >
                  Mobile: +123 456 7890
                </Typography>
                <Typography variant="body2" style={{ color: "#555" }}>
                  Location: Los Angeles, CA
                </Typography>
              </div>
            </div>
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default CompanySummary;
