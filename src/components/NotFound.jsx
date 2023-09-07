import React from "react";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();
  return (
    <>
      <div className="d-flex justify-content-center">
        <h1>halaman tidak di temukan</h1>
      </div>
      <p
        onClick={() => navigate("/dashboard")}
        style={{ textDecoration: "none", textAlign: "center" }}
      >
        {" "}
        kembali ke home{" "}
      </p>
    </>
  );
};

export default NotFound;
