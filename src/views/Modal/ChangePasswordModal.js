import { useState } from "react";
import { useHistory } from "react-router";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import ConfirmModal from "./ConfirmModal";

const ChangePasswordModal = (props) => {
  const { isOpen, toggle } = props;

  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [formData, setFormData] = useState({});

  const handleChangePassword = async (event, errors, values) => {
    event.preventDefault();
    if (!formData.password) return;
    // setLoading(true);
    //   setShowConfirm(true);
    // const result = await changePassword({
    //   payload: {
    //     password: formData.password,
    //   },
    // });

    // Process Access token

    // if (result?.code !== 200) {
    //   // toast error
    //   setLoading(false);
    //   window.alert(`${result.status}: ${result.message}`);
    // } else {
    //   setLoading(false);
    //   // navigate
    //   history.push("/auth");
    // }
  };

  const onConfirm = () => {};

  return (
    <Modal isOpen={isOpen}>
      <ModalHeader toggle={toggle}>Đổi mật khẩu </ModalHeader>
      <ModalBody>
        <ConfirmModal isOpen={showConfirm} okAction={onConfirm}></ConfirmModal>
      </ModalBody>
      <ModalFooter>
        <Button color="primary" onClick={handleChangePassword}>
          Đồng ý
        </Button>
        <Button color="secondary" onClick={toggle}>
          hủy
        </Button>
      </ModalFooter>
    </Modal>
  );
};
export default ChangePasswordModal;
