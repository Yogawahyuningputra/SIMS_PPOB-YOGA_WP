import Logo from "../assets/icons/Logo.png";
import { formatIDR } from "../features/datas/datasSlice";
import { useNavigate } from "react-router-dom";
import { Image, Modal } from "react-bootstrap";

function ModalTopupSuccess({ show, onHide, nominal }) {
  const navigate = useNavigate();

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
          <Image src={Logo} alt="icon" width={50} />{" "}
        </Modal.Title>
        <Modal.Body>
          <div className="text-center mt-1 fw-bold">
            <p>top up sebesar</p>
            <p className="fs-3">{formatIDR(nominal?.top_up_amount)}</p>
            <p style={{ color: "#gray", cursor: "pointer" }}>berhasil !</p>
            <p
              style={{ color: "#f13b2f", cursor: "pointer" }}
              onClick={() => navigate("/dashboard")}
            >
              Kembali ke beranda
            </p>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default ModalTopupSuccess;
