// QuoteForm.jsx
import React, { useState } from "react";
import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { styled } from "@mui/material/styles";

const MainContainer = styled(Box)({
  display: "flex",
  flexDirection: "row",
  maxWidth: "1200px",
  margin: "0 auto",
  backgroundColor: "#fff",
  position: "relative",
});

const FormWrapper = styled(Box)({
  flex: 1,
  padding: "2.5rem 2rem",
});

const ImageContainer = styled(Box)({
  width: "420px",
  flexShrink: 0,
  position: "relative",
  display: { xs: "none", lg: "block" }, // hide on mobile/tablet
});

const ImageBox = styled(Box)({
  position: "absolute",
  bottom: 0,
  right: 0,
  width: "100%",
  height: "100%",
});

const SectionTitle = styled(Typography)({
  fontSize: "1.5rem",
  fontWeight: 700,
  marginBottom: "1.75rem",
  color: "#000",
});

const FormRow = styled(Box)({
  display: "grid",
  gridTemplateColumns: "repeat(3, 1fr)",
  gap: "1.5rem",
  marginBottom: "1.5rem",
});

const FullRow = styled(Box)({
  gridColumn: "1 / -1",
  display: "grid",
  gridTemplateColumns: "repeat(5, 1fr)", // for the 5 dimension fields
  gap: "1.5rem",
});

const CheckboxGroup = styled(FormGroup)({
  display: "flex",
  flexDirection: "row",
  flexWrap: "wrap",
  gap: "2rem 3rem",
  marginTop: "1.5rem",
  marginBottom: "2.5rem",
});

const SubmitButton = styled(Button)({
  backgroundColor: "#000",
  color: "#fff",
  padding: "14px 40px",
  fontSize: "1.125rem",
  fontWeight: 600,
  borderRadius: "0",
  textTransform: "none",
  width: "100%",
  maxWidth: "380px",
  margin: "0 auto",
  display: "block",
  "&:hover": {
    backgroundColor: "#222",
  },
});

// Responsive adjustments using sx prop where needed
const QuoteForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    parcelType: "",
    departureCity: "",
    deliveryCity: "",
    packageType: "",
    weight: "",
    height: "",
    width: "",
    length: "",
    delicate: false,
    instant: false,
    insurance: false,
    packaging: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
  };

  return (
    <MainContainer
      component="form"
      onSubmit={handleSubmit}
      sx={{
        flexDirection: { xs: "column", lg: "row" },
        maxWidth: { xs: "100%", lg: "1200px" },
      }}
    >
      <FormWrapper
        sx={{
          padding: { xs: "1.5rem 1rem", sm: "2rem 1.5rem", md: "2.5rem 2rem" },
        }}
      >
        <SectionTitle>Personal Data</SectionTitle>
        <FormRow
          sx={{
            gridTemplateColumns: {
              xs: "1fr",
              sm: "repeat(2, 1fr)",
              md: "repeat(3, 1fr)",
            },
          }}
        >
          <TextField
            required
            fullWidth
            label="Name*"
            name="name"
            value={formData.name}
            onChange={handleChange}
            variant="outlined"
          />
          <TextField
            required
            fullWidth
            label="Email*"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            variant="outlined"
          />
          <TextField
            required
            fullWidth
            label="Phone*"
            name="phone"
            type="tel"
            value={formData.phone}
            onChange={handleChange}
            variant="outlined"
          />
        </FormRow>

        <SectionTitle sx={{ mt: 5 }}>Object Details</SectionTitle>
        <FormRow
          sx={{
            gridTemplateColumns: {
              xs: "1fr",
              sm: "repeat(2, 1fr)",
              md: "repeat(3, 1fr)",
            },
          }}
        >
          <FormControl fullWidth variant="outlined">
            <InputLabel>Parcel Type</InputLabel>
            <Select
              name="parcelType"
              value={formData.parcelType}
              label="Parcel Type"
              onChange={handleChange}
            >
              <MenuItem value="">Parcel Type</MenuItem>
              <MenuItem value="document">Document</MenuItem>
              <MenuItem value="package">Package</MenuItem>
              <MenuItem value="pallet">Pallet</MenuItem>
            </Select>
          </FormControl>

          <TextField
            fullWidth
            label="City of Departure"
            name="departureCity"
            value={formData.departureCity}
            onChange={handleChange}
            variant="outlined"
          />

          <TextField
            fullWidth
            label="Delivery City"
            name="deliveryCity"
            value={formData.deliveryCity}
            onChange={handleChange}
            variant="outlined"
          />
        </FormRow>

        <FullRow
          sx={{
            gridTemplateColumns: {
              xs: "1fr",
              sm: "repeat(2, 1fr)",
              md: "repeat(3, 1fr)",
              lg: "repeat(5, 1fr)",
            },
          }}
        >
          <FormControl fullWidth variant="outlined">
            <InputLabel>Package</InputLabel>
            <Select
              name="packageType"
              value={formData.packageType}
              label="Package"
              onChange={handleChange}
            >
              <MenuItem value="">Package</MenuItem>
              <MenuItem value="box">Box</MenuItem>
              <MenuItem value="envelope">Envelope</MenuItem>
              <MenuItem value="bag">Bag</MenuItem>
            </Select>
          </FormControl>

          <TextField
            fullWidth
            label="Weight (kg)"
            name="weight"
            type="number"
            value={formData.weight}
            onChange={handleChange}
            variant="outlined"
            InputProps={{ inputProps: { min: 0, step: 0.1 } }}
          />

          <TextField
            fullWidth
            label="Height (cm)"
            name="height"
            type="number"
            value={formData.height}
            onChange={handleChange}
            variant="outlined"
            InputProps={{ inputProps: { min: 0 } }}
          />

          <TextField
            fullWidth
            label="Width (cm)"
            name="width"
            type="number"
            value={formData.width}
            onChange={handleChange}
            variant="outlined"
            InputProps={{ inputProps: { min: 0 } }}
          />

          <TextField
            fullWidth
            label="Length (cm)"
            name="length"
            type="number"
            value={formData.length}
            onChange={handleChange}
            variant="outlined"
            InputProps={{ inputProps: { min: 0 } }}
          />
        </FullRow>

        <CheckboxGroup row>
          <FormControlLabel
            control={
              <Checkbox
                checked={formData.delicate}
                onChange={handleChange}
                name="delicate"
                sx={{ color: "#f59e0b", "&.Mui-checked": { color: "#f59e0b" } }}
              />
            }
            label="Delicate"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={formData.instant}
                onChange={handleChange}
                name="instant"
                sx={{ color: "#1976d2", "&.Mui-checked": { color: "#1976d2" } }}
              />
            }
            label="Instant Delivery"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={formData.insurance}
                onChange={handleChange}
                name="insurance"
              />
            }
            label="Insurance"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={formData.packaging}
                onChange={handleChange}
                name="packaging"
                sx={{ color: "#f59e0b", "&.Mui-checked": { color: "#f59e0b" } }}
              />
            }
            label="Packaging"
          />
        </CheckboxGroup>

        <SubmitButton type="submit" size="large">
          Request A Quote
        </SubmitButton>
      </FormWrapper>

      {/* Courier Image - visible only on large screens */}
      <ImageContainer>
        <ImageBox>
          <img
            src="images/form-img.png"
            alt="Happy courier with clipboard"
            style={{
              width: "80%",
              height: "100%",
              objectFit: "contain",
              objectPosition: "bottom right",
            }}
          />
        </ImageBox>
      </ImageContainer>
    </MainContainer>
  );
};

export default QuoteForm;
