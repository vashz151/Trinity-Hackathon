import axios from "axios";
export const getDetail = async () => {
  const accno = localStorage.getItem("id");
  const url = "/getdetails?accno=" + accno;
  const response = await axios.get(url);
  console.log(response.data);
  return response.data;
};
