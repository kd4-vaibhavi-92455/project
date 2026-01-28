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
  Dialog,
  DialogContent,
  IconButton,
  Divider,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import DownloadIcon from "@mui/icons-material/Download";
import CloseIcon from "@mui/icons-material/Close";

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

const FormWrapper = styled(Box)({ flex: 1 });

const ImageContainer = styled(Box)({
  width: "420px",
  flexShrink: 0,
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
});

const FormRow = styled(Box)({
  display: "grid",
  gridTemplateColumns: "repeat(3, 1fr)",
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

const QuoteForm = () => {
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
  });

  const [open, setOpen] = useState(false);
  const [invoice, setInvoice] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((p) => ({ ...p, [name]: value }));
  };

  /* ===============================
     COST CALCULATION (SIMPLE)
================================ */
  const calculateCost = () => {
    const baseMap = {
      VEHICLE: 4000,
      HOUSE: 9000,
      OFFICE: 14000,
    };

    let base = baseMap[formData.serviceCategory] || 0;

    if (
      formData.pickupState &&
      formData.dropState &&
      formData.pickupState !== formData.dropState
    ) {
      base += 3000;
    }

    const handling = 700;
    const gst = Math.round((base + handling) * 0.18);
    const total = base + handling + gst;

    return { base, handling, gst, total };
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const cost = calculateCost();
    setInvoice(cost);
    setOpen(true);
  };

  return (
    <>
      <MainContainer
        component="form"
        sx={{
          flexDirection: { xs: "column", lg: "row" },
          px: { xs: 1, sm: 2, lg: 0 },
        }}
        onSubmit={handleSubmit}
      >
        <FormWrapper sx={{ px: 4, py: 4 }}>
          {/* ---- FORM (UNCHANGED – SAME AS YOUR CODE) ---- */}
          {/* tumhara poora form yahin rahega */}
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

          <SubmitButton type="submit">Calculate Moving Cost</SubmitButton>
        </FormWrapper>

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

      {/* ================= INVOICE DIALOG ================= */}
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogContent>
          {/* HEADER */}
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Box>
              <Typography fontWeight={700} fontSize={18}>
                Packers & Movers Pvt. Ltd.
              </Typography>
              <Typography fontSize={12} color="gray">
                Estimated Invoice
              </Typography>
            </Box>

            <Box>
              <IconButton size="small" sx={{ color: "#000" }}>
                <DownloadIcon fontSize="small" />
              </IconButton>
              <IconButton size="small" onClick={() => setOpen(false)}>
                <CloseIcon fontSize="small" />
              </IconButton>
            </Box>
          </Box>

          <Divider sx={{ my: 2 }} />

          {/* FROM → TO */}
          <Box display="flex" justifyContent="space-between" mb={2}>
            <Box>
              <Typography fontWeight={600}>Pickup</Typography>
              <Typography fontSize={13}>{formData.pickupLabel}</Typography>
              <Typography fontSize={12} color="gray">
                {formData.pickupCity}, {formData.pickupState}
              </Typography>
            </Box>

            <Box textAlign="right">
              <Typography fontWeight={600}>Drop</Typography>
              <Typography fontSize={13}>{formData.dropLabel}</Typography>
              <Typography fontSize={12} color="gray">
                {formData.dropCity}, {formData.dropState}
              </Typography>
            </Box>
          </Box>

          <Divider sx={{ mb: 2 }} />

          {/* COST TABLE */}
          {invoice && (
            <>
              {[
                ["Base Service Cost", invoice.base],
                ["Handling Charges", invoice.handling],
                ["GST (18%)", invoice.gst],
              ].map(([label, value]) => (
                <Box
                  key={label}
                  display="flex"
                  justifyContent="space-between"
                  mb={1}
                >
                  <Typography fontSize={14}>{label}</Typography>
                  <Typography fontSize={14}>₹ {value}</Typography>
                </Box>
              ))}

              <Divider sx={{ my: 2 }} />

              <Box
                display="flex"
                justifyContent="space-between"
                sx={{
                  background: "#f9fafb",
                  p: 1.5,
                }}
              >
                <Typography fontWeight={700}>Total Amount</Typography>
                <Typography fontWeight={700}>₹ {invoice.total}</Typography>
              </Box>
            </>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default QuoteForm;
