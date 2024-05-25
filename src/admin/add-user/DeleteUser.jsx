import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import "bootstrap/dist/css/bootstrap.min.css";
import { deleteUser } from "../../service/ApiService";
import { toast } from "react-toastify";

function DeleteUser(props) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const { fetcherAllUser, item } = props;
  const handleDelete = async () => {
    let res = await deleteUser(item.id);
    if (res.data && res.data.EC === 0) {
      toast.success("Đã xóa thành công user");
      handleClose();
      await fetcherAllUser();
    } else {
      toast.error("xóa người dùng thất bại");
    }
  };
  return (
    <>
      <Button variant="danger" onClick={handleShow}>
        Delete
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Delete User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Bạn có muốn chắc là xóa người dùng{" "}
          <span className="text-danger">{item.email}</span> này ?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="danger" onClick={handleDelete}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default DeleteUser;
