
import axios from "axios";
import { BASE_URL } from "./config";

// CUSTOMER SIGNUP
export async function signupCustomer(data) {
    const response = await axios.post(
        `${BASE_URL}/users/signup/customer`,
        data
    );
    return response.data;
}

// LOGIN
export async function signinUser(credentials) {
    const response = await axios.post(
        `${BASE_URL}/users/signin`,
        credentials
    );
    return response.data;
}