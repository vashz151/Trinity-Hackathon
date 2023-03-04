import axios from "axios";
export const sendOtp = async (mobileNumber) => {
  const url = `/sendOtp?mobileNumber=${mobileNumber}`;
  console.log("sendOtp url: ", url);
  const response = await axios.get(url);
  console.log("sendOtp response: ", response);
  return response;
};
