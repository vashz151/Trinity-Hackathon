import axios from "axios";
import { API_URL } from "../config";
console.log("API_URL: ", API_URL);
export const sendOtp = async (mobileNumber) => {
  const url = `${API_URL}/sendotp?mobile=${mobileNumber}}`;
  console.log("sendOtp url: ", url);
  const response = await axios.get(url);
  console.log("sendOtp response: ", response);
  return response;
};
