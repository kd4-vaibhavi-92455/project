import React, { useState } from "react";
import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import { DeleteForever, Visibility } from "@mui/icons-material";
import Swal from "sweetalert2";

/* ---------------- DUMMY DATA ---------------- */
const dummyBookings = [
  {
    id: 1,
    requestNumber: "BR001",
    name: "Rahul Sharma",
    email: "rahul.sharma@gmail.com",
    mobile: "9876543210",
    requestDate: "2025-01-01",
    shiftingDate: "2025-01-05",
    status: "Approved",
  },
  {
    id: 2,
    requestNumber: "BR002",
    name: "Neha Verma",
    email: "neha.verma@yahoo.com",
    mobile: "9123456780",
    requestDate: "2025-01-02",
    shiftingDate: "2025-01-07",
    status: "Rejected",
  },
  {
    id: 3,
    requestNumber: "BR003",
    name: "Amit Joshi",
    email: "amit.joshi@outlook.com",
    mobile: "9988776655",
    requestDate: "2025-01-04",
    shiftingDate: "2025-01-10",
    status: "Approved",
  },
  {
    id: 4,
    requestNumber: "BR004",
    name: "Pooja Singh",
    email: "pooja.singh@gmail.com",
    mobile: "9012345678",
    requestDate: "2025-01-06",
    shiftingDate: "2025-01-12",
    status: "Pending",
  },
];

/* ---------------- COMPONENT ---------------- */
const BookingReport = () => {
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [searchText, setSearchText] = useState("");
  const [rows, setRows] = useState(dummyBookings);
  const [open, setOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);

  /* -------- SEARCH BY DATE -------- */
  const handleDateSearch = () => {
    if (!fromDate || !toDate) {
      Swal.fire("Error", "Please select both From and To dates", "error");
      return;
    }

    const filtered = dummyBookings.filter(
      (item) => item.requestDate >= fromDate && item.requestDate <= toDate
    );

    setRows(filtered);
  };

  /* -------- SEARCH BY TEXT -------- */
  const handleTextSearch = () => {
    if (!searchText) {
      Swal.fire("Error", "Please enter Name / Request No / Mobile", "error");
      return;
    }

    const keyword = searchText.toLowerCase();

    const filtered = dummyBookings.filter(
      (item) =>
        item.name.toLowerCase().includes(keyword) ||
        item.requestNumber.toLowerCase().includes(keyword) ||
        item.mobile.includes(keyword)
    );

    setRows(filtered);
  };

  const handleView = (row) => {
    setSelectedRow(row);
    setOpen(true);
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This record will be deleted",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      confirmButtonText: "Delete",
    }).then((result) => {
      if (result.isConfirmed) {
        setRows((prev) => prev.filter((item) => item.id !== id));
        Swal.fire("Deleted!", "Record deleted successfully", "success");
      }
    });
  };

  const renderStatusButton = (status) => {
    const color =
      status === "Approved"
        ? "success"
        : status === "Rejected"
        ? "error"
        : "warning";

    return (
      <Button variant="contained" color={color} size="small">
        {status}
      </Button>
    );
  };

  return (
    <Box sx={{ backgroundColor: "#f4f6f8", minHeight: "100vh", p: 3 }}>
      <Box
        sx={{
          backgroundColor: "#fff",
          borderRadius: 2,
          p: 3,
          boxShadow: "0 2px 10px rgba(0,0,0,0.08)",
        }}
      >
        <Typography variant="h5" gutterBottom>
          Booking Report
        </Typography>

        {/* -------- FILTER SECTION -------- */}
        <Grid container spacing={2} mb={3}>
          <Grid item xs={12} md={2}>
            <TextField
              fullWidth
              type="date"
              label="From Date"
              InputLabelProps={{ shrink: true }}
              value={fromDate}
              onChange={(e) => setFromDate(e.target.value)}
            />
          </Grid>

          <Grid item xs={12} md={2}>
            <TextField
              fullWidth
              type="date"
              label="To Date"
              InputLabelProps={{ shrink: true }}
              value={toDate}
              onChange={(e) => setToDate(e.target.value)}
            />
          </Grid>

          <Grid
            item
            xs={12}
            md={2}
            sx={{ display: "flex", alignItems: "center" }}
          >
            <Button
              fullWidth
              variant="contained"
              size="small"
              onClick={handleDateSearch}
            >
              Search by Date
            </Button>
          </Grid>

          <Grid item xs={12} md={3}>
            <TextField
              fullWidth
              label="Search (Name / Req / Mobile)"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />
          </Grid>

          <Grid
            item
            xs={12}
            md={2}
            sx={{ display: "flex", alignItems: "center" }}
          >
            <Button
              fullWidth
              variant="outlined"
              size="small"
              onClick={handleTextSearch}
            >
              Search by Text
            </Button>
          </Grid>
        </Grid>

        {/* -------- TABLE -------- */}
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>S.No</TableCell>
              <TableCell>Request No</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Mobile</TableCell>
              <TableCell>Request Date</TableCell>
              <TableCell>Shifting Date</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {rows.length === 0 ? (
              <TableRow>
                <TableCell colSpan={9} align="center">
                  No records found
                </TableCell>
              </TableRow>
            ) : (
              rows.map((row, index) => (
                <TableRow key={row.id}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{row.requestNumber}</TableCell>
                  <TableCell>{row.name}</TableCell>
                  <TableCell>{row.email}</TableCell>
                  <TableCell>{row.mobile}</TableCell>
                  <TableCell>{row.requestDate}</TableCell>
                  <TableCell>{row.shiftingDate}</TableCell>
                  <TableCell>{renderStatusButton(row.status)}</TableCell>
                  <TableCell>
                    <IconButton onClick={() => handleView(row)}>
                      <Visibility color="primary" />
                    </IconButton>
                    <IconButton onClick={() => handleDelete(row.id)}>
                      <DeleteForever color="error" />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>

        {/* -------- VIEW DIALOG -------- */}
        <Dialog
          open={open}
          onClose={() => setOpen(false)}
          maxWidth="sm"
          fullWidth
        >
          <DialogTitle>Booking Details</DialogTitle>
          <DialogContent>
            {selectedRow && (
              <Grid container spacing={2}>
                {Object.entries(selectedRow).map(([key, value]) => (
                  <Grid item xs={6} key={key}>
                    <Typography variant="subtitle2">
                      {key.toUpperCase()}
                    </Typography>
                    <Typography>{value}</Typography>
                  </Grid>
                ))}
              </Grid>
            )}
          </DialogContent>
        </Dialog>
      </Box>
    </Box>
  );
};

export default BookingReport;
