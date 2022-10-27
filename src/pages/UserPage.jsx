import React, { useEffect, useState } from "react";
import { WithRouter } from "../utils/navigation";
import Layout from "../components/Layout";
import { useTitle } from "../utils/hooks/useTitle";
import Navbar from "../components/Navbar";
import { FormAccount } from "../components/FormAccount";
import { ListSelling } from "../components/ListSelling";
import CardUser from "../components/CardUser";
import Footer from "../components/Footer";
import Modal from "../components/Modal";
import ModalSell from "../components/ModalSell";
import { apiRequest } from "../utils/apiRequest";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { handleAuth } from "../utils/reducers/reducer";

const UserPage = () => {
  useTitle("Kelontongpedia");

  const [users, setUsers] = useState()
  const [loading, setLoading] = useState([]);

  const fetchData = () => {
    apiRequest("users","get",{})
    .then(res => setUsers(res.data))

    .catch((err) => {
      alert(data.message);
    })
    .finally(() => {
      setLoading(false);
    });
  }

  useEffect(() => {
    fetchData()
  },[])
  

//   const [sells, setSells] = useState([
//   {
//     name: "Sepatu",
//     price: "64.000",
//     detail: "sepatu ini mahal",
//   },

//   {
//     name: "Baju",
//     price: "100.000",
//     detail: "baju ini bagus",
//   },
// ])

const navigate = useNavigate()
  const dispatch = useDispatch()

const handleDelete = async () => {
  localStorage.removeItem("token")
  dispatch(handleAuth(true))
  navigate("/")
  alert("Are you sure you want to delete the account? ")
}

  return (
    <Layout>
      <Navbar />
      <Modal />
      <ModalSell/>
      <div className="grid grid-cols-3">
        <div className="w-full">
          <CardUser data={users} />
        </div>
        <div className="w-full">
          <FormAccount data={users} />
            <div>
              <label onClick={()=> handleDelete()} className="w-32 ml-10 mt-10 justify-center px-4 py-2 font-bold bg-[#F41111] border-2 border-[#F41111] rounded-md text-white shadow-lg transform active:scale-75 transition-transform mx-5 flex hover:bg-white hover:text-primary">
                <span>Deactive</span>
              </label>
            </div>
        </div>
        <div className="w-full">
          <div className="ml-10 mt-6 w-80 h-96 bg-white rounded-lg border border-gray-200 shadow-md sm:p-6 md:p-6 dark:bg-gray-800 dark:border-gray-700">
            <form className="space-y-6" action="#">
              <h5 className="text-xl font-bold text-primary dark:text-white">
                Selling Product
              </h5>
              <ListSelling/>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </Layout>
  );
};

export default WithRouter(UserPage);
