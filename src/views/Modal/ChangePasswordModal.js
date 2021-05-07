import AvField from "availity-reactstrap-validation/lib/AvField";
import AvForm from "availity-reactstrap-validation/lib/AvForm";
import { onLogout } from "boostrap/auth";
import { changePassword } from "boostrap/auth";
import { passwordValidator } from "constants/form.consants";
import { useState } from "react";
import { useHistory } from "react-router";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Label,
} from "reactstrap";
import ConfirmModal from "./ConfirmModal";

const ChangePasswordModal = (props) => {
  const { isOpen, toggle, backdrop = true } = props;

  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [formData, setFormData] = useState({});

  const handleChangePassword = (event, errors, values) => {
    event.preventDefault();
    if (!formData.password) return;
    if (errors.includes("password")) return;
    setShowConfirm(true);
  };

  const onConfirm = async () => {
    // Submit change password
    setLoading(true);
    const result = await changePassword({ payload: formData });
    if (result) {
      setLoading(false);
      toggle();
      onLogout();
      history.push("/auth");
    } else {
      setLoading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} backdrop={backdrop}>
      <ModalHeader toggle={toggle}>Đổi mật khẩu </ModalHeader>
      <AvForm onSubmit={handleChangePassword}>
        <ModalBody>
          <Label for="password"> Mật khẩu mới</Label>
          <AvField
            placeholder="Mật khẩu muốn thay đổi"
            className="input-group-alternative"
            name="password"
            type="password"
            validate={passwordValidator}
            onChange={(event) =>
              setFormData({ ...formData, password: event.target.value })
            }
          />
          <ConfirmModal
            isOpen={showConfirm}
            okAction={onConfirm}
            loading={loading}
            title="Xác nhận đổi mật khẩu"
            content="Bạn có muốn thay đổi mật khẩu mới ?"
            toggle={() => setShowConfirm(!showConfirm)}
          ></ConfirmModal>
        </ModalBody>
        <ModalFooter>
          <Button color="primary">Đồng ý</Button>
          <Button color="secondary" type="button" onClick={toggle}>
            hủy
          </Button>
        </ModalFooter>
      </AvForm>
    </Modal>
  );
};
export default ChangePasswordModal;
