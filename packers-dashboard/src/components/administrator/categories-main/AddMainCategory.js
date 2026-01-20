import React, { useEffect, useState } from "react";
import { Avatar, Button, Grid, IconButton, TextField } from "@mui/material";
import { useStyles } from "../CompanyCss";
import { CameraAlt, FormatListBulleted } from "@mui/icons-material";
import {
  imgBaseURL,
  postData,
  updateData,
} from "../../../services/ServerServices";
import { useLocation, useNavigate } from "react-router";

const ImageButtons = ({ handleImageUpdate, imageMessage }) => {
  const classes = useStyles()
  return (
    <div className={classes.mainCatBox}>
      <Button onClick={handleImageUpdate}>Change icon</Button>
      {imageMessage && (
        <div className={classes.imgMsg}>
          {imageMessage}
        </div>
      )}
    </div>
  );
};

const AddMainCategory = () => {
  const location = useLocation();
  const Swal = require("sweetalert2");
  const navigate = useNavigate();
  const isEdit = Boolean(location?.state?.id);

  // all const states and variables
  const [imageMessage, setImageMessage] = useState("");
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    icon: { fileName: "/assets/images/cart.png", bytes: "" },
  });
  const [error, setError] = useState();

  const classes = useStyles();
  const storedCompanyId = localStorage?.getItem("global_companyid");
console.log("storedCompanyId./storedCompanyId..",storedCompanyId)
  useEffect(() => {
    if (location?.state?.id) {
      let id_ = location?.state?.id;
      getMainCategoryDataByID(id_);
    }
  }, [location?.state?.maincategoryid]);

  const getMainCategoryDataByID = async (id_) => {
    const payload = {
      maincategoryid: id_,
    };
    const response = await postData("maincategory/fetch-maincategory-by-id", payload);
    if (response) {
      let categoryDetails = response?.data?.data[0];
      setFormData((prev) => ({
        ...prev,
        ...categoryDetails,
        icon: {
          fileName: `${imgBaseURL}/${categoryDetails.icon}`,
          bytes: "",
        },
      }));
    } else {
      Swal.fire({
        title: "Error fetching company details",
        icon: "error",
        text: response?.message || "Something went wrong!",
      });
    }
  };

  // functions and logic
  const handleUpdate = async () => {
    const dd = new Date();
    let cd = dd.getFullYear() + "-" + (dd.getMonth() + 1) + "-" + dd.getDate();
    const payload = {
      maincategoryid: formData?.maincategoryid,
      title: formData?.title,
      description: formData?.description,
      updated_at: cd,
    };

    const response = await updateData("maincategory/modify", payload);
    if (response) {
      Swal.fire({
        title: "Success!",
        icon: "success",
        text: response?.message || "Category details updated!",
      });
      navigate("/dashboard/main-categories");
    } else {
      Swal.fire({
        title: "Error fetching category details",
        icon: "error",
        text: response?.message || "Something went wrong!",
      });
    }
  };

  const handleError = (key, value) => {
    setError((prev) => ({ ...prev, [key]: value }));
  };

  // validation function
  const ValidateAll = () => {
    var isValid = true;
    if (!formData.title) {
      handleError("title", "This field is required");
      isValid = false;
    }
    if (!formData.description) {
      handleError("description", "This field is required");
      isValid = false;
    }
    if (!formData.icon) {
      handleError("icon", "This field is required");
      isValid = false;
    }
    return isValid;
  };

  // submit function
  const handleSubmit = async () => {
    if (ValidateAll()) {
      const cd = new Date();
      const date_ = `${cd.getFullYear()}-${cd.getMonth() + 1}-${cd.getDate()}`;
      const submissionData = new FormData();

      for (const key in formData) {
        if (key === "icon") {
          submissionData.append("icon", formData.icon.bytes);
        } else {
          submissionData.append(key, formData[key]);
        }
      }

      submissionData.append("created_at", date_);
      submissionData.append("created_by", "Admin");

      const response = await postData(
        "maincategory/add-new-maincategory",
        submissionData
      );

      if (response?.status) {
        Swal.fire({
          title: "Success!",
          icon: "success",
          text: "Saved category record !",
        });
        navigate("/dashboard/main-categories");
      } else {
        Swal.fire({
          title: "Server error!",
          icon: "error",
          draggable: false,
          text: "Sorry for the inconvenience, Please contact admin",
        });
      }
    } else {
      Swal.fire({
        title: "Error",
        icon: "error",
        draggable: false,
        text: "Please check all the Inputs",
      });
    }
  };

  const handleImageUpdate = async () => {
    const payload = new FormData();
    payload.append("maincategoryid", formData?.maincategoryid);
    payload.append("icon", formData.icon.bytes);
    const response = await updateData("maincategory/modify-icon", payload);
    if (response?.status) {
      setImageMessage("Success! Image updated.");
      setTimeout(() => {
        setImageMessage("");
      }, 5000);
    }
  };

  const onRevert = () => {
    console.log("revert process...");
  };

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleIcon = (e) => {
    const file = e.target.files[0];
    if (file) {
      const allowedTypes = ["image/png", "image/jpeg", "image/jpg"];
      if (!allowedTypes.includes(file.type)) {
        Swal.fire("Invalid file type! Please upload a PNG or JPEG.");
        return;
      }
      if (file.size > 2 * 1024 * 1024) {
        Swal.fire("File size exceeds 2MB limit.");
        return;
      }
      handleChange("icon", {
        fileName: URL.createObjectURL(file),
        bytes: file,
      });
    }
  };

  const clearFormData = () => {
    setFormData({
      title: "",
      description: "",
      icon: { fileName: "/assets/images/cart.png", bytes: "" },
    });
  };

  return (
    <div className={classes.mainContainer}>
      <div className={classes.box}>
        <Grid container spacing={2}>
          {/* heading */}
          <Grid item xs={12} className={classes.topHeading}>
            <div className={classes.headingStyle}>
              <div>
                <img src="/assets/images/logo.png" width={50} />
              </div>
              <div style={{ marginLeft: 10 }}>Add main Category</div>
            </div>
            <div>
              <IconButton
                onClick={() => {
                  navigate("/dashboard/main-categories");
                }}
              >
                <FormatListBulleted style={{ color: "#000" }} />
              </IconButton>
            </div>
          </Grid>

          {/* category name */}
          <Grid item xs={12}>
            <TextField
              fullWidth
              type="text"
              id="outlined-basic"
              label="Main Category name"
              variant="outlined"
              value={formData.title}
              onChange={(e) => handleChange("title", e.target.value)}
              error={error?.title}
              onFocus={() => handleError("title", "")}
              helperText={error?.title}
            />
          </Grid>

          {/* description */}
          <Grid item xs={12}>
            <TextField
              multiline
              minRows={3}
              maxRows={4}
              fullWidth
              type="text"
              id="outlined-basic"
              label="Description"
              variant="outlined"
              value={formData.description}
              onChange={(e) => handleChange("description", e.target.value)}
              error={error?.description}
              onFocus={() => handleError("description", "")}
              helperText={error?.description}
            />
          </Grid>

          {/* icon */}
          <Grid item xs={12} lg={12} className={classes.dflex}>
            <div>
              <IconButton color="primary" component="label">
                <input
                  hidden
                  onChange={handleIcon}
                  accept="image/*"
                  type="file"
                />
                <CameraAlt fontSize="inherit" />
              </IconButton>
            </div>
            {/* avatar */}
            <div>
              <Avatar
                alt="Icon"
                variant="rounded"
                src={formData?.icon.fileName}
                sx={{ width: 56, height: 56 }}
              />
            </div>
            {isEdit && (
              <ImageButtons
                handleImageUpdate={handleImageUpdate}
                onRevert={onRevert}
                imageMessage={imageMessage}
              />
            )}
          </Grid>

          {/* button */}
          <Grid item xs={6}>
            <Button
              onClick={isEdit ? handleUpdate : handleSubmit}
              fullWidth
              variant="contained"
            >
              {isEdit ? "update" : "Submit"}
            </Button>
          </Grid>
          <Grid item xs={6}>
            <Button onClick={clearFormData} fullWidth variant="contained">
              Reset
            </Button>
          </Grid>
        </Grid>
      </div>
    </div>
  );
};

export default AddMainCategory;
