/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import Logo from "../assets/icons/Logo.png";
import { formatIDR } from "../features/datas/datasSlice";
import { Image, Modal } from "react-bootstrap";

function ModalMessage({
  show,
  onHide,
  message,
  messageType,
  actionText,
  actionHandler,
  nominal,
}) {
  return (
    <>
      <Modal
        size="sm"
        show={show}
        onHide={onHide}
        centered
        aria-labelledby={messageType}
      >
        <Modal.Title
          id={messageType}
          className="d-flex justify-content-center mt-3"
        >
          <Image src={Logo} alt="icon" width={50} />
        </Modal.Title>
        <Modal.Body>
          <div className="text-center mt-1 fw-bold">
            <p>{messageType === "success" ? "Sukses!" : "Gagal!"}</p>
            <p>{message}</p>

            <p className="fs-3">{formatIDR(nominal)}</p>

            <p style={{ color: "#gray", cursor: "pointer" }} onClick={onHide}>
              Tutup
            </p>
            {actionText && (
              <p
                style={{ color: "#f13b2f", cursor: "pointer" }}
                onClick={actionHandler}
              >
                {actionText}
              </p>
            )}
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default ModalMessage;
