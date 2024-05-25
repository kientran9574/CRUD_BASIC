import React from "react";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import "./AddUser.scss";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ApiService } from "../../service/ApiService";
const AddUser = (props) => {
  const { fetcherAllUser } = props;
  const [show, setShow] = useState(false);
  const handleClose = () => {
    setShow(false);
    setEmail("");
    setPassword("");
    setUsername("");
    setRole("");
    setImage("");
    setPreviewImg("");
  };
  const handleShow = () => setShow(true);
  //-----------------
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [role, setRole] = useState("");
  const [image, setImage] = useState("");
  const [previewImg, setPreviewImg] = useState("");

  const handleChangeImage = (event) => {
    if (event.target && event.target.files && event.target.files[0])
      setPreviewImg(URL.createObjectURL(event.target.files[0]));
    //  lấy ra được dữ liệu và gửi cho back-end không bị null
    setImage(event.target.files[0]);
  };
  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };
  const handleSubmitUser = async () => {
    // validate
    const isEmail = validateEmail(email);
    if (!isEmail) {
      toast.error("Email Invalid");
      return;
    }
    if (!password) {
      toast.error("Password Invalid");
      return;
    }

    // call api and submit data
    // call api truc tiep
    // const data = new FormData();
    // data.append("email", email);
    // data.append("password", password);
    // data.append("username", username);
    // data.append("role", role);
    // data.append("userImage", image);
    // call api gian tiep truyen tham so
    let res = await ApiService(email, password, username, role, image);
    // check data này có trả về hay không và check tài khoản có bị trùng hay không
    if (res.data && res.data.EC === 0) {
      toast.success("Tạo User thành công ");
      handleClose();
      await fetcherAllUser();
    }
    if (res.data && res.data.EC !== 0) {
      toast.error(res.data.EM);
    }
  };
  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Add User
      </Button>

      <Modal show={show} onHide={handleClose} backdrop={"static"}>
        <Modal.Header closeButton>
          <Modal.Title>Create User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form className="row g-3">
            <div className="col-md-6">
              <label className="form-label">Email</label>
              <input
                type="email"
                className="form-control"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
              />
            </div>
            <div className="col-md-6">
              <label className="form-label">Password</label>
              <input
                type="password"
                className="form-control"
                value={password}
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
                <option selected value="USER">
                  USER
                </option>
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
          <Button variant="primary" onClick={() => handleSubmitUser()}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default AddUser;
