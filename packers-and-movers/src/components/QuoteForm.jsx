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

/* ===============================
   COMMON INPUT STYLES (KEY PART)
================================ */
const commonInputSx = {
  "& .MuiOutlinedInput-root": {
    height: "44px",
    fontSize: "14px",
    borderRadius: "2px",
    backgroundColor: "#fff",
    "& fieldset": {
      borderColor: "#e5e7eb",
    },
    "&:hover fieldset": {
      borderColor: "#d1d5db",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#000",
      borderWidth: "1px",
    },
  },
  "& .MuiInputLabel-root": {
    fontSize: "13px",
    color: "#9ca3af",
    top: "-2px",
  },
  "& .MuiInputLabel-root.Mui-focused": {
    color: "#000",
  },
};

/* ===============================
   LAYOUT STYLES
================================ */
const MainContainer = styled(Box)({
  display: "flex",
  backgroundColor: "#fff",
  position: "relative",
});

const FormWrapper = styled(Box)({
  flex: 1,
  padding: "40px 32px",
});

const ImageContainer = styled(Box)({
  width: "420px",
  flexShrink: 0,
  display: "block",
  position: "relative",
});

const ImageBox = styled(Box)({
  position: "absolute",
  bottom: 0,
  right: 0,
  width: "100%",
  height: "100%",
});

const SectionTitle = styled(Typography)({
  fontSize: "18px",
  fontWeight: 700,
  marginBottom: "20px",
  color: "#000",
});

const FormRow = styled(Box)({
  display: "grid",
  gridTemplateColumns: "repeat(3, 1fr)",
  gap: "20px",
  marginBottom: "20px",
});

const FullRow = styled(Box)({
  display: "grid",
  gridTemplateColumns: "repeat(5, 1fr)",
  gap: "20px",
  marginBottom: "20px",
});

const CheckboxGroup = styled(FormGroup)({
  display: "flex",
  flexDirection: "row",
  gap: "24px",
  marginTop: "16px",
  marginBottom: "32px",
  "& .MuiFormControlLabel-label": {
    fontSize: "13px",
    color: "#6b7280",
  },
});

const SubmitButton = styled(Button)({
  backgroundColor: "#111827",
  color: "#fff",
  height: "48px",
  fontSize: "14px",
  fontWeight: 600,
  borderRadius: "0",
  textTransform: "uppercase",
  letterSpacing: "0.04em",
  width: "100%",
  maxWidth: "420px",
  margin: "0 auto",
  display: "block",
  "&:hover": {
    backgroundColor: "#000",
  },
});

/* ===============================
   COMPONENT
================================ */
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
    console.log(formData);
  };

  return (
    <MainContainer
      component="form"
      onSubmit={handleSubmit}
      sx={{
        flexDirection: { xs: "column", lg: "row" },
      }}
    >
      {/* FORM */}
      <FormWrapper>
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
            size="small"
            label="Name*"
            name="name"
            value={formData.name}
            onChange={handleChange}
            sx={commonInputSx}
          />
          <TextField
            size="small"
            label="Email*"
            name="email"
            value={formData.email}
            onChange={handleChange}
            sx={commonInputSx}
          />
          <TextField
            size="small"
            label="Phone*"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            sx={commonInputSx}
          />
        </FormRow>

        <SectionTitle sx={{ mt: 4 }}>Object Details</SectionTitle>

        <FormRow
          sx={{
            gridTemplateColumns: {
              xs: "1fr",
              sm: "repeat(2, 1fr)",
              md: "repeat(3, 1fr)",
            },
          }}
        >
          <FormControl size="small" sx={commonInputSx}>
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
            size="small"
            label="City of Departure"
            name="departureCity"
            value={formData.departureCity}
            onChange={handleChange}
            sx={commonInputSx}
          />

          <TextField
            size="small"
            label="Delivery City"
            name="deliveryCity"
            value={formData.deliveryCity}
            onChange={handleChange}
            sx={commonInputSx}
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
          <FormControl size="small" sx={commonInputSx}>
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
            size="small"
            label="Weight"
            name="weight"
            value={formData.weight}
            onChange={handleChange}
            sx={commonInputSx}
          />
          <TextField
            size="small"
            label="Height"
            name="height"
            value={formData.height}
            onChange={handleChange}
            sx={commonInputSx}
          />
          <TextField
            size="small"
            label="Width"
            name="width"
            value={formData.width}
            onChange={handleChange}
            sx={commonInputSx}
          />
          <TextField
            size="small"
            label="Length"
            name="length"
            value={formData.length}
            onChange={handleChange}
            sx={commonInputSx}
          />
        </FullRow>

        <CheckboxGroup>
          <FormControlLabel
            control={
              <Checkbox
                size="small"
                checked={formData.delicate}
                onChange={handleChange}
                name="delicate"
                sx={{ "&.Mui-checked": { color: "#f59e0b" } }}
              />
            }
            label="Delicate"
          />
          <FormControlLabel
            control={
              <Checkbox
                size="small"
                checked={formData.instant}
                onChange={handleChange}
                name="instant"
                sx={{ "&.Mui-checked": { color: "#2563eb" } }}
              />
            }
            label="Instant Delivery"
          />
          <FormControlLabel
            control={
              <Checkbox
                size="small"
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
                size="small"
                checked={formData.packaging}
                onChange={handleChange}
                name="packaging"
                sx={{ "&.Mui-checked": { color: "#f59e0b" } }}
              />
            }
            label="Packaging"
          />
        </CheckboxGroup>

        <SubmitButton type="submit">Request A Quote</SubmitButton>
      </FormWrapper>

      {/* IMAGE */}
      <ImageContainer sx={{ display: { xs: "none", lg: "block" } }}>
        <ImageBox>
          <img
            src="images/form-img.png"
            alt="Courier"
            style={{
              width: "70%",
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
