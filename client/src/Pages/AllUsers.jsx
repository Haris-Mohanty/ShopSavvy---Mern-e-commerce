import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { hideLoading, showLoading } from "../redux/spinnerSlice";
import { deleteUser, getAllUsers, updateUser } from "../api/api";
import { CiSearch } from "react-icons/ci";
import { FaUserCircle } from "react-icons/fa";
import { toast } from "react-toastify";
import { IoCloseSharp } from "react-icons/io5";
import moment from "moment";
import { GoArrowLeft, GoArrowRight } from "react-icons/go";

const AllUsers = () => {
  const dispatch = useDispatch();
  const [allUsers, setAllUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  // ******** FETCH ALL USERS ************/
  const fetchAllUsers = async (page) => {
    try {
      dispatch(showLoading());
      const res = await getAllUsers(page); //pass page for API call
      dispatch(hideLoading());
      if (res.success) {
        setAllUsers(res.allUsers);
        setTotalPages(res.totalPages);
        setCurrentPage(res.currentPage);
      }
    } catch (err) {
      dispatch(hideLoading());
      toast.error(err?.response?.data?.message);
    }
  };

  // ******** UPDATE USER ************/
  const handleUpdateUser = async (e) => {
    e.preventDefault();
    const data = { name, email, isAdmin };
    try {
      dispatch(showLoading());
      const res = await updateUser(selectedUser._id, data);
      dispatch(hideLoading());
      if (res.success) {
        setIsModalOpen(false);
        toast.success(res?.message);
        fetchAllUsers();
      }
    } catch (err) {
      dispatch(hideLoading());
      toast.error(err?.response?.data?.message);
    }
  };

  // ******** DELETE USER ************/
  const handleDeleteUser = async () => {
    try {
      dispatch(showLoading());
      const res = await deleteUser(selectedUser._id);
      dispatch(hideLoading());
      if (res.success) {
        setIsModalOpen(false);
        toast.success(res?.message);
        fetchAllUsers();
      }
    } catch (err) {
      dispatch(hideLoading());
      toast.error(err?.response?.data?.message);
    }
  };

  //********* SEARCH USER **************/
  const filteredUsers = allUsers.filter((user) =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Open Modal
  const openModal = (user) => {
    setSelectedUser(user);
    setName(user.name);
    setEmail(user.email);
    setIsAdmin(user.isAdmin);
    setIsModalOpen(true);
  };

  // Close modal
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedUser(null);
  };

  // Pagination handler
  const nextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };
  const prevPage = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };

  useEffect(() => {
    fetchAllUsers(currentPage);
    //eslint-disable-next-line
  }, [currentPage]);

  return (
    <>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        {/************ SEARCH USER ************************/}
        <div className="flex justify-between items-center py-4 px-2 bg-white">
          <h1 className="text-3xl font-semibold text-indigo-500">
            ALL USERS LIST
          </h1>
          <label htmlFor="table-search" className="sr-only">
            Search
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <CiSearch />
            </div>
            <input
              type="text"
              id="table-search-users"
              className="block pl-10 pr-4 py-2 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:outline-none"
              placeholder="Search for users"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/***************** TABLE DESIGN ******************/}
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Name
              </th>
              <th scope="col" className="px-6 py-3">
                Role
              </th>
              <th scope="col" className="px-6 py-3">
                Joined At
              </th>
              <th scope="col" className="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user) => (
              <tr
                key={user?._id}
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
              >
                <th
                  scope="row"
                  className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {user.profilePhoto ? (
                    <img
                      className="w-10 h-10 rounded-full"
                      src={user.profilePhoto}
                      alt={user.name}
                    />
                  ) : (
                    <FaUserCircle className="w-10 h-10 text-gray-400" />
                  )}
                  <div className="ps-3">
                    <div className="text-base font-semibold">{user?.name}</div>
                    <div className="font-normal text-gray-500">
                      {user?.email}
                    </div>
                  </div>
                </th>
                <td className="px-6 py-4">
                  {user?.isAdmin ? "admin" : "user"}
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center">
                    {moment(user?.createdAt).format("MMMM Do YYYY")}
                  </div>
                </td>
                <td className="px-6 py-4">
                  {/* Modal toggle */}
                  <button
                    type="button"
                    onClick={() => openModal(user)}
                    className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                  >
                    Edit User
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/*************** Edit User Modal *************/}
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-50">
            <div
              id="editUserModal"
              tabIndex={-1}
              aria-hidden="true"
              className="relative w-full max-w-2xl max-h-full"
            >
              <div className="relative w-full max-w-2xl max-h-full">
                {/************** Modal content ***************/}
                <form
                  onSubmit={handleUpdateUser}
                  className="relative bg-white rounded-lg shadow"
                >
                  {/************* Modal header ***********/}
                  <div className="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600">
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                      Edit user
                    </h3>
                    <button
                      type="button"
                      onClick={closeModal}
                      className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center"
                    >
                      <IoCloseSharp size={22} />
                      <span className="sr-only">Close modal</span>
                    </button>
                  </div>
                  {/*********** Modal body ***********/}
                  <div className="p-6 space-y-6">
                    <div className="grid grid-cols-6 gap-6">
                      <div className="col-span-6 sm:col-span-3">
                        <label
                          htmlFor="name"
                          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                          Name
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5"
                          placeholder="Enter name"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                        />
                      </div>
                      <div className="col-span-6 sm:col-span-3">
                        <label
                          htmlFor="email"
                          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                          Email
                        </label>
                        <input
                          type="email"
                          name="email"
                          id="email"
                          className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5"
                          placeholder="Enter email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                        />
                      </div>
                      <div className="col-span-6">
                        <label
                          htmlFor="role"
                          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                          Change Role
                        </label>
                        <select
                          name="role"
                          id="role"
                          className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5"
                          value={isAdmin ? "admin" : "user"}
                          onChange={(e) =>
                            setIsAdmin(e.target.value === "admin")
                          }
                        >
                          <option value="admin">Admin</option>
                          <option value="user">User</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  {/*********** Modal footer ***********/}
                  <div className="flex justify-end p-6 space-x-3 rtl:space-x-reverse border-t border-gray-200 rounded-b dark:border-gray-600">
                    <button
                      type="submit"
                      className="text-white bg-indigo-700 hover:bg-indigo-800 focus:ring-4 focus:outline-none focus:ring-indigo-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                    >
                      Save User
                    </button>
                    <button
                      type="button"
                      className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                      onClick={handleDeleteUser}
                    >
                      Delete User
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>

      {/**************** PAGINATION ********************/}
      <div className="flex justify-end mt-3 gap-4">
        <button
          className="flex items-center gap-2 px-6 py-3 font-sans text-xs font-bold text-center text-gray-900 uppercase align-middle transition-all rounded-lg select-none hover:bg-gray-900/10 active:bg-gray-900/20 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
          type="button"
          onClick={prevPage}
          disabled={currentPage === 1}
        >
          <GoArrowLeft size={20} />
          Previous
        </button>
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((number) => (
          <button
            key={number}
            className={`relative h-10 max-h-[40px] w-10 max-w-[40px] select-none rounded-lg ${
              currentPage === number
                ? "bg-gray-900 text-white"
                : "bg-white text-gray-900 dark:text-gray-400"
            } text-center align-middle font-sans text-xs font-medium uppercase shadow-md shadow-gray-900/10 transition-all hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none`}
            type="button"
            onClick={() => fetchAllUsers(number)}
          >
            <span className="absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
              {number}
            </span>
          </button>
        ))}

        <button
          className="flex items-center gap-2 px-6 py-3 font-sans text-xs font-bold text-center text-gray-900 uppercase align-middle transition-all rounded-lg select-none hover:bg-gray-900/10 active:bg-gray-900/20 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
          type="button"
          onClick={nextPage}
          disabled={currentPage === totalPages}
        >
          Next
          <GoArrowRight size={20} />
        </button>
      </div>
    </>
  );
};

export default AllUsers;
