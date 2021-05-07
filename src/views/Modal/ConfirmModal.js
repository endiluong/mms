import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Spinner,
} from "reactstrap";

const ConfirmModal = (props) => {
  const {
    isOpen,
    toggle,
    title,
    content,
    loading = false,
    okText = "Đồng ý",
    cancelText = "Hủy",
    okAction = () => {},
    cancelAction = () => {},
  } = props;

  return (
    <Modal isOpen={isOpen}>
      <ModalHeader toggle={toggle}>{title}</ModalHeader>
      <ModalBody>{content}</ModalBody>
      <ModalFooter>
        <Button color="primary" onClick={okAction} disabled={loading}>
          {loading && <Spinner color="light" className="mr-3" />}
          {okText}
        </Button>
        <Button color="secondary" onClick={cancelAction ? toggle : toggle}>
          {cancelText}
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default ConfirmModal;
