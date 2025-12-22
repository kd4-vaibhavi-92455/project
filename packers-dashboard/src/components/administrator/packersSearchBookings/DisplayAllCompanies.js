import React, { useState } from "react";
import { Avatar, IconButton } from "@mui/material";
import { useNavigate } from "react-router";
import CommonTable from "../common/CommonTable";
import { DeleteForever, DomainAdd, Edit } from "@mui/icons-material";
import { deleteSingleData, imgBaseURL } from "../../../services/ServerServices";

const DisplayAllCompanies = () => {
  const navigate = useNavigate();
  const Swal = require("sweetalert2");
  const [refresh,setRefresh]=useState(false);
  // table data...
  const columns = [
    { field: "id", headerName: "S.No", width: 70 },
    { field: "companyname", headerName: "Company name", width: 130 },
    { field: "createdby", headerName: "Created by", width: 130 },
    { field: "statename", headerName: "State", width: 130 },
    { field: "cityname", headerName: "City", width: 130 },
    { field: "status", headerName: "Status", width: 130 },
    {
      field: "logo",
      headerName: "Logo",
      width: 130,
      description: "Company Logo",
      renderCell: (params) => {
        return(<Avatar alt="Logo" variant="square" src={`${imgBaseURL}/${params?.row?.logo}`} />)
      }
    },
    {
      field: "modify",
      headerName: "Modify",
      width: 130,
      renderCell: (params) => {
        // console.log("params data..", params);
        return (
            <>
              <IconButton 
              aria-label="delete"
              onClick={() =>
                navigate("/dashboard/add-company", { state: { id: params?.row?.companyid } })
              }
            >
              <Edit color="primary" />
            </IconButton>
            <IconButton 
              aria-label="delete"
              // onClick={()=>handleDeleteSingle(params?.row?.companyid)}
              onClick={()=>confirmDeleteSingle(params?.row?.companyid)}
            >
              <DeleteForever color="error" />
            </IconButton>
            </>
        );
      },
    },
  ];

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

  const handleDeleteSingle=async(companyid)=>{
    try{
      const payload={
        "companyid":companyid
      }
      const response = await deleteSingleData("company/delete-company",payload);
      console.log("response of delete",response);
      if(response.data.status){
        Swal.fire("Deleted!", "The record has been deleted.","", "info");
        setRefresh(!refresh)
      }else{
        Swal.fire("Failed!", "Failed to delete the record.","", "error");
      }

    }catch(e){
      console.error("Error deleting company:", e);
      Swal.fire("Error", "An error occurred while deleting the record.", "error");  
    }
  }

  return (
    <CommonTable
      title="All Companies"
      columns={columns}
      getURL="company/fetch-companies"
      addRoute="/dashboard/add-company"
      actions={{ addIcon: <DomainAdd sx={{ color: "#000" }} /> }}
      searchPlaceholder="Search companies..."
    />
  );
};

export default DisplayAllCompanies;
