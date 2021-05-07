import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

const ConfirmModal = (props) => {
  const {
    isOpen,
    toggle,
    title,
    content,
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
        <Button color="primary" onClick={okAction}>
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
