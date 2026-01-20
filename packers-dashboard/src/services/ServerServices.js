import axios from "axios"
export const imgBaseURL = "http://localhost:4000/images"
export const baseURL = "http://localhost:4000";

// const apiClient = axios.create({
//     baseURL, // Sets base URL for all requests
//     headers: {
//       "Content-Type": "application/json",
//     },
//   });

//   export const getData = async (url) => {
//     try {
//       const response = await apiClient.get(url);
//       return response.data;  // Returns only necessary data
//     } catch (error) {
//       console.error("Error in GET request:", error.message);
//       throw error;  // Ensure calling function handles errors
//     }
//   };

export const getData = async(url) =>{
    try{
        const response = await axios.get(`${baseURL}/${url}`);
        return response;
    }
    catch(e){
        console.log("error in fetching states..",e);
        // throw error; 
    }
}

export const postData = async(url,payload)=>{
    // console.log("url ...",url,"and payload is..",payload)
    try{
        const response = await axios.post(`${baseURL}/${url}`,payload);
        return response;
    }
    catch(e){
        console.log("Server services.. error fetching resource: ",e)
    }
}

export const updateData =async(url,payload)=>{
    console.log("url:",url,"payload",payload)
    try{
        const response = await axios.put(`${baseURL}/${url}`,payload);
        return response;
    }catch(error){
        console.log("Error while updating the data: ",error);
    }
}

export const deleteSingleData = async (url, payload) => {
    console.log("payload delete", payload, "and url", url);
    try {
        const response = await axios.delete(`${baseURL}/${url}`, {
            data: payload, // Pass payload as data
        });
        return response;
    }
    catch (e) {
        console.log("error..", e);
    }
};
