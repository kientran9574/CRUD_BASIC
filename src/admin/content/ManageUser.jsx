import React, { useEffect } from "react";
import Table from "react-bootstrap/Table";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import AddUser from "../add-user/AddUser";
import { getAllUser } from "../../service/ApiService";
import UpdateUser from "../add-user/UpdateUser";
import DeleteUser from "../add-user/DeleteUser";

const ManageUser = () => {
  const [listUser, setListUser] = useState([]);
  useEffect(() => {
    fetcherAllUser();
  }, []);
  const fetcherAllUser = async () => {
    let res = await getAllUser();
    if (res.data.EC === 0) {
      setListUser(res.data.DT);
    }
  };
  return (
    <>
      <div className="d-flex align-items-center justify-content-between mt-3 px-2 mb-3">
        <h1 className="text-lg">Manager User</h1>
        <AddUser fetcherAllUser={fetcherAllUser}></AddUser>
      </div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>No</th>
            <th>Username</th>
            <th>Email</th>
            <th>Role</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {listUser &&
            listUser.length > 0 &&
            listUser.map((item, index) => {
              return (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td>{item.username}</td>
                  <td>{item.email}</td>
                  <td>{item.role}</td>
                  <td className="d-flex gap-3">
                    <button className="btn btn-primary">View</button>
                    <UpdateUser
                      fetcherAllUser={fetcherAllUser}
                      item={item}
                    ></UpdateUser>
                    <DeleteUser
                      fetcherAllUser={fetcherAllUser}
                      item={item}
                    ></DeleteUser>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </Table>
    </>
  );
};

export default ManageUser;
