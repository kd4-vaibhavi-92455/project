import { useState } from "react";
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { createBooking } from "../services/booking";
/* ===============================
   COMMON INPUT STYLES (UNCHANGED)
================================ */
const commonInputSx = {
  "& .MuiOutlinedInput-root": {
    height: "44px",
    fontSize: "14px",
    borderRadius: "2px",
    backgroundColor: "#fff",
    "& fieldset": { borderColor: "#e5e7eb" },
    "&:hover fieldset": { borderColor: "#d1d5db" },
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
   LAYOUT STYLES (UNCHANGED)
================================ */
const MainContainer = styled(Box)({
  display: "flex",
  backgroundColor: "#fff",
  position: "relative",
});

const FormWrapper = styled(Box)({
  flex: 1,
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

const SubmitButton = styled(Button)({
  backgroundColor: "#111827",
  color: "#fff",
  height: "48px",
  fontSize: "14px",
  fontWeight: 600,
  borderRadius: "0",
  width: "100%",
  maxWidth: "420px",
  margin: "0 auto",
  display: "block",
  "&:hover": { backgroundColor: "#000" },
});

/* ===============================
   COMPONENT
================================ */
const BookAMoveForm = ({ onClose }) => {
  const [formData, setFormData] = useState({
    serviceCategory: "",
    pickupLabel: "",
    pickupAddressLine: "",
    pickupState: "",
    pickupCity: "",
    pickupPincode: "",
    dropLabel: "",
    dropAddressLine: "",
    dropState: "",
    dropCity: "",
    dropPincode: "",
    moveDate: "",
    estimatedPrice: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((p) => ({ ...p, [name]: value }));
  };

  const handleSubmit = async (e) => {
    alert("clicked");
    e.preventDefault();
    console.log("form data: ", formData);
    const payload = {
      ...formData,
      estimatedPrice: 40000,
    };

    try {
      const res = await createBooking(payload);
      console.log("Booking success:", res);

      alert("Booking created successfully !");

      setFormData({
        serviceCategory: "",
        pickupLabel: "",
        pickupAddressLine: "",
        pickupState: "",
        pickupCity: "",
        pickupPincode: "",
        dropLabel: "",
        dropAddressLine: "",
        dropState: "",
        dropCity: "",
        dropPincode: "",
        moveDate: "",
        estimatedPrice: "",
      });
      onClose();
    } catch (err) {
      console.error("Booking failed:", err);
      alert("Something went wrong !");
    }
  };

  return (
    <MainContainer
      component="form"
      onSubmit={handleSubmit}
      sx={{
        flexDirection: { xs: "column", lg: "row" },
        px: { xs: 1, sm: 2, lg: 0 },
      }}
    >
      {/* ================= FORM ================= */}
      <FormWrapper
        sx={{
          px: { xs: 2, sm: 3, md: 4 },
          py: { xs: 3, sm: 4 },
        }}
      >
        {/* SERVICE */}
        <SectionTitle>Service Details and Schedule</SectionTitle>
        <FormRow>
          <FormControl size="small" sx={commonInputSx}>
            <InputLabel>Service Category</InputLabel>
            <Select
              name="serviceCategory"
              value={formData.serviceCategory}
              label="Service Category"
              onChange={handleChange}
            >
              <MenuItem value="VEHICLE">Vehicle</MenuItem>
              <MenuItem value="HOUSE">House</MenuItem>
              <MenuItem value="OFFICE">Office</MenuItem>
            </Select>
          </FormControl>
          <TextField
            type="date"
            label="Move Date"
            InputLabelProps={{ shrink: true }}
            name="moveDate"
            value={formData.moveDate}
            onChange={handleChange}
            sx={commonInputSx}
          />
        </FormRow>

        {/* PICKUP */}
        <SectionTitle>Pickup Details</SectionTitle>
        <FormRow>
          <TextField
            label="Pickup Label"
            name="pickupLabel"
            value={formData.pickupLabel}
            onChange={handleChange}
            sx={commonInputSx}
          />
          <FormControl size="small" sx={commonInputSx}>
            <InputLabel>State</InputLabel>
            <Select
              name="pickupState"
              value={formData.pickupState}
              label="State"
              onChange={handleChange}
            >
              <MenuItem value="Maharashtra">Maharashtra</MenuItem>
              <MenuItem value="Madhya Pradesh">Madhya Pradesh</MenuItem>
            </Select>
          </FormControl>
          <FormControl size="small" sx={commonInputSx}>
            <InputLabel>City</InputLabel>
            <Select
              name="pickupCity"
              value={formData.pickupCity}
              label="City"
              onChange={handleChange}
            >
              <MenuItem value="Pune">Pune</MenuItem>
              <MenuItem value="Mumbai">Mumbai</MenuItem>
              <MenuItem value="Nagpur">Nagpur</MenuItem>
            </Select>
          </FormControl>
        </FormRow>

        <FormRow>
          <TextField
            label="Pickup Pincode"
            name="pickupPincode"
            value={formData.pickupPincode}
            onChange={handleChange}
            sx={commonInputSx}
          />
          <TextField
            fullWidth
            label="Pickup Address"
            name="pickupAddressLine"
            value={formData.pickupAddressLine}
            onChange={handleChange}
            sx={{ ...commonInputSx, mb: 3 }}
          />
        </FormRow>

        {/* DROP */}
        <SectionTitle>Drop Details</SectionTitle>
        <FormRow>
          <TextField
            label="Drop Label"
            name="dropLabel"
            value={formData.dropLabel}
            onChange={handleChange}
            sx={commonInputSx}
          />
          <FormControl size="small" sx={commonInputSx}>
            <InputLabel>State</InputLabel>
            <Select
              name="dropState"
              value={formData.dropState}
              label="State"
              onChange={handleChange}
            >
              <MenuItem value="Madhya Pradesh">Madhya Pradesh</MenuItem>
            </Select>
          </FormControl>
          <FormControl size="small" sx={commonInputSx}>
            <InputLabel>City</InputLabel>
            <Select
              name="dropCity"
              value={formData.dropCity}
              label="City"
              onChange={handleChange}
            >
              <MenuItem value="Bhopal">Bhopal</MenuItem>
              <MenuItem value="Indore">Indore</MenuItem>
            </Select>
          </FormControl>
        </FormRow>

        <FormRow>
          <TextField
            label="Drop Pincode"
            name="dropPincode"
            value={formData.dropPincode}
            onChange={handleChange}
            sx={commonInputSx}
          />
          <TextField
            fullWidth
            label="Drop Address"
            name="dropAddressLine"
            value={formData.dropAddressLine}
            onChange={handleChange}
            sx={{ ...commonInputSx, mb: 3 }}
          />
        </FormRow>

        <SubmitButton
          type="submit"
          // onClick={() => handleSubmit()}
        >
          Book now
        </SubmitButton>
      </FormWrapper>
    </MainContainer>
  );
};

export default BookAMoveForm;
