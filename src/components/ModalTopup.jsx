import React, { useEffect, useState } from "react";
import { Button, Image, Modal } from "react-bootstrap";
import Logo from "../assets/icons/Logo.png";
import { useDispatch, useSelector } from "react-redux";
import { formatIDR, getStatusTopup, topUp } from "../features/datas/datasSlice";
import ModalTopupSuccess from "./ModalTopupSuccess";
import ModalTopupFailed from "./ModalTopupFailed";

function ModalTopup({ show, onHide, nominal }) {
  const [showError, setShowError] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const dispatch = useDispatch();
  const statusTopup = useSelector(getStatusTopup);

  const handleTopup = (nominal) => {
    dispatch(topUp(nominal));
  };

  useEffect(() => {
    if (statusTopup === "failed") {
      setShowError(true);
      onHide();
    } else if (statusTopup === "succeeded") {
      setShowSuccess(true);
      onHide();
    }
  }, [statusTopup]);

  return (
    <>
      <ModalTopupFailed
        show={showError}
        onHide={() => setShowError(false)}
        nominal={nominal}
      />
      <ModalTopupSuccess
        show={showSuccess}
        onHide={() => setShowSuccess(false)}
        nominal={nominal}
      />
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
            <p>Anda yakin untuk top up sebesar</p>
            <p className="fs-3">{formatIDR(nominal?.top_up_amount)}</p>
            <p
              style={{ color: "#f13b2f", cursor: "pointer" }}
              onClick={() => handleTopup(nominal?.top_up_amount)}
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
}

export default ModalTopup;
