import axios from "axios";
export const sendOtp = async (mobile) => {
  const url = `/sendotp?mobile=${mobile}`;
  const response = await axios.get(url);
  console.log("response", response);
  return response.data;
};
