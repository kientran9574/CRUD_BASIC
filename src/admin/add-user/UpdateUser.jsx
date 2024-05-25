import React, { useEffect } from "react";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import "./AddUser.scss";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { putUser } from "../../service/ApiService";
import _, { isEmpty } from "lodash";
const UpdateUser = (props) => {
  const { fetcherAllUser, item } = props;
  const [show, setShow] = useState(false);
  //-----------------
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [role, setRole] = useState("");
  const [image, setImage] = useState("");
  const [previewImg, setPreviewImg] = useState("");
  const [dataUser, setDataUser] = useState(item);
  const handleClose = () => {
    setShow(false);
    setEmail("");
    setPassword("");
    setUsername("");
    setRole("");
    setImage("");
    setPreviewImg("");
    setDataUser({});
  };
  useEffect(() => {
    if (!_.isEmpty(item)) {
      setEmail(item.email);
      setUsername(item.username);
      setRole(item.role);
      if (item.image) {
        setPreviewImg(`data:image/jpeg;base64,${item.image}`);
      }
    }
  }, [item, dataUser]);
  const handleShow = () => {
    setShow(true);
  };

  const handleChangeImage = (event) => {
    if (event.target && event.target.files && event.target.files[0])
      setPreviewImg(URL.createObjectURL(event.target.files[0]));
    //  lấy ra được dữ liệu và gửi cho back-end không bị null
    setImage(event.target.files[0]);
  };
  const handleSubmitUser = async () => {
    // call api and submit data
    // call api truc tiep
    // const data = new FormData();
    // data.append("email", email);
    // data.append("password", password);
    // data.append("username", username);
    // data.append("role", role);
    // data.append("userImage", image);
    // call api gian tiep truyen tham so
    let res = await putUser(item.id, username, role, image);
    // check data này có trả về hay không và check tài khoản có bị trùng hay không
    if (res.data && res.data.EC === 0) {
      toast.success("Edit User thành công ");
      handleClose();
      await fetcherAllUser();
    }
    if (res.data && res.data.EC !== 0) {
      toast.error(res.data.EM);
    }
  };
  return (
    <>
      <Button variant="warning" onClick={handleShow} className="text-white">
        Update User
      </Button>

      <Modal show={show} onHide={handleClose} backdrop={"static"}>
        <Modal.Header closeButton>
          <Modal.Title>Update user</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form className="row g-3">
            <div className="col-md-6">
              <label className="form-label">Email</label>
              <input
                type="email"
                className="form-control"
                value={email}
                disabled
                onChange={(event) => setEmail(event.target.value)}
              />
            </div>
            <div className="col-md-6">
              <label className="form-label">Password</label>
              <input
                type="password"
                className="form-control"
                value={password}
                disabled
                onChange={(event) => setPassword(event.target.value)}
              />{" "}
            </div>
            <div className="col-12">
              <label className="form-label">Username</label>
              <input
                type="text"
                className="form-control"
                placeholder="Username..."
                value={username}
                onChange={(event) => setUsername(event.target.value)}
              />
            </div>
            <div className="col-md-4">
              <label className="form-label">Role</label>
              <select
                className="form-select"
                onChange={(event) => setRole(event.target.value)}
                value={role}
              >
                <option value="ADMIN">ADMIN</option>
                <option value="USER">USER</option>
              </select>
            </div>
            <div className="col-md-12">
              <label className="form-label">Upload file Image</label>
              <input
                type="file"
                className="form-control"
                onChange={(event) => handleChangeImage(event)}
              />
            </div>
            <div className="col-md-12 img-preview">
              {previewImg ? (
                <img src={previewImg} alt="not img" />
              ) : (
                <span>Not is Img</span>
              )}
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button
            className="text-white"
            variant="warning"
            onClick={() => handleSubmitUser()}
          >
            Update Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default UpdateUser;
