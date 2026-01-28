import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
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
        <div className="flex items-center pl-2.5">
          <img
            src="images/form-img.png"
            alt="Courier"
            style={{
              height: "50px",
              objectFit: "contain",
              objectPosition: "bottom right",
            }}
          />
          <span>
            <strong className="pl-2.5">Book a Move</strong>
          </span>
        </div>
        {/* </ImageContainer> */}

        <IconButton onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      {/* ===== Content ===== */}
      <DialogContent dividers className="space-y-4">
        <BookAMoveForm onClose={onClose} />
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
