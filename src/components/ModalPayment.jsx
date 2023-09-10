/* eslint-disable react/prop-types */
import { Image, Modal } from "react-bootstrap";
import Logo from "../assets/icons/Logo.png";

import { formatIDR } from "../features/datas/datasSlice";

const ModalPayment = ({ show, onHide, message, actionHandler, nominal }) => {
  return (
    <>
      <Modal
        size="sm"
        show={show}
        onHide={onHide}
        centered
        aria-labelledby="topup"
      >
        <Modal.Title id="topup" className="d-flex justify-content-center mt-3">
          <Image src={Logo} alt="icon" width={50} />
        </Modal.Title>
        <Modal.Body>
          <div className="text-center mt-1 fw-bold">
            <p>beli {message} senilai</p>
            <p className="fs-3">{formatIDR(nominal)}</p>
            <p
              style={{ color: "#f13b2f", cursor: "pointer" }}
              onClick={() => actionHandler()}
            >
              Ya, lanjutkan
            </p>
            <p style={{ color: "gray", cursor: "pointer" }} onClick={onHide}>
              Batalkan
            </p>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default ModalPayment;
