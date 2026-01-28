import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import BookAMoveForm from "../BookAMoveForm";

const BookMoveDialog = ({ open, onClose }) => {
  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      {/* ===== Header ===== */}
      <DialogTitle className="flex justify-between items-center">
        Book a Move
        <IconButton onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      {/* ===== Content ===== */}
      <DialogContent dividers className="space-y-4">
        {/* <TextField
          label="Pickup Location"
          placeholder="Enter pickup address"
          fullWidth
        />

        <TextField
          label="Drop Location"
          placeholder="Enter drop address"
          fullWidth
        />

        <TextField
          label="Moving Date"
          type="date"
          InputLabelProps={{ shrink: true }}
          fullWidth
        /> */}
        <BookAMoveForm />
      </DialogContent>

      {/* ===== Footer ===== */}
      <DialogActions className="p-4">
        <Button onClick={onClose} color="inherit">
          Cancel
        </Button>
        <Button variant="contained">Submit</Button>
      </DialogActions>
    </Dialog>
  );
};

export default BookMoveDialog;
