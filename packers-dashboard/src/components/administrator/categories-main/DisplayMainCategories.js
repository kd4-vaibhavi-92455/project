import React from "react";
import { Avatar, IconButton } from "@mui/material";
import { useNavigate } from "react-router";
import CommonTable from "../common/CommonTable";
import { DeleteForever, DomainAdd, Edit } from "@mui/icons-material";
import Swal from "sweetalert2";
import { deleteSingleData, imgBaseURL } from "../../../services/ServerServices";

const DisplayMainCategories = () => {
  const navigate = useNavigate();
  
  const confirmDeleteSingle = (id)=>{
    Swal.fire({
      title: "Are you sure you want to delete this record?",
      icon:"warning",
      showCancelButton: true,
      confirmButtonText: `Delete`,
      cancelButtonText: `Cancel`,
      confirmButtonColor: "#d33",
    }).then((result) => {
      if (result.isConfirmed) {
        handleDeleteSingle(id);        
      } else{
        Swal.fire("Action canceled","your record is safe.", "", "info");
      }
    });
  }

  const handleDeleteSingle=async(maincategoryid)=>{
    try{
      const payload={
        "maincategoryid":maincategoryid
      }
      const response = await deleteSingleData("maincategory/delete",payload);
      if(response.data.status){
        Swal.fire("Deleted!", "The record has been deleted.","", "info");
      }else{
        Swal.fire("Failed!", "Failed to delete the record.","", "error");
      }

    }catch(e){
      console.error("Error deleting category:", e);
      Swal.fire("Error", "An error occurred while deleting the record.", "error");  
    }
  }

  const columns = [
    { field: "maincategoryid", headerName: "S.No", width: 50 },
    { field: "title", headerName: "Main Category", width: 180 },
    { field: "description", headerName: "Description", width: 400 },
    { field: "created_by", headerName: "Created By", width: 170 },
    // {
    //   field: "icon",
    //   headerName: "Icon",
    //   width: 100,
    //   description: "Category Icon",
    // },
    {
      field: "icon",
      headerName: "Icon",
      width: 80,
      description: "Category Icon",
      renderCell: (params) => {
        return(<Avatar alt="Remy Sharp" variant="rounded" src={`${imgBaseURL}/${params?.row?.icon}`} />)
      }
    },
    {
      field: "modify",
      headerName: "Modify",
      width: 130,
      renderCell: (params) => {
        return (
          <>
            <IconButton
            aria-label="delete"
            onClick={() =>
              navigate("/dashboard/add-main-category", { state: { id: params?.row?.maincategoryid } })
            }
          >
            <Edit color="primary" />
          </IconButton>
          <IconButton 
            aria-label="delete"
            onClick={()=>confirmDeleteSingle(params?.row?.maincategoryid)}
          >
            <DeleteForever color="error" />
          </IconButton>
          </>
      );
      }

    },
  ];

  return (
    <CommonTable
      title="All Categories"
      columns={columns}
      getURL="maincategory/fetch-maincategories"
      addRoute="/dashboard/add-main-category"
      actions={{ addIcon: <DomainAdd sx={{ color: "#000" }} /> }}
      searchPlaceholder="Search categories..."
    />
  );
};

export default DisplayMainCategories;
