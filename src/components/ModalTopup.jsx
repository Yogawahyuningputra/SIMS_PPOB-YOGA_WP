import { useState } from "react";
import { Image, Modal } from "react-bootstrap";
import Logo from "../assets/icons/Logo.png";
import { useDispatch } from "react-redux";
import { formatIDR, topUp } from "../features/datas/datasSlice";
import ModalTopupSuccess from "./ModalTopupSuccess";
import ModalTopupFailed from "./ModalTopupFailed";

function ModalTopup({ show, onHide, nominal }) {
  const [showFailed, setShowFailed] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const dispatch = useDispatch();
  const handleTopup = (data) => {
    dispatch(topUp(data))
      .then((result) => {
        // console.log("result:=>", result);
        if (result.payload.status === 0) {
          setShowSuccess(true);
          onHide();
        }
      })
      .catch((error) => {
        console.error("Error dispatching top up:", error);
        setShowFailed(true);
        onHide();
      });
  };

  return (
    <>
      <ModalTopupFailed
        show={showFailed}
        onHide={() => setShowFailed(false)}
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
              onClick={() => handleTopup(nominal)}
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
