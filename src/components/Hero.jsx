import { useEffect, useState } from "react";
import { Col, Image, Row } from "react-bootstrap";
import Profile from "../assets/images/Profile Photo.png";
import BgSaldo from "../assets/images/Background Saldo.png";
import { useDispatch, useSelector } from "react-redux";
import { fetchProfile, getProfile } from "../features/users/usersSlice";
import {
  fetchBalance,
  formatIDR,
  getBalance,
} from "../features/datas/datasSlice";
const Hero = () => {
  const dispatch = useDispatch();
  const profile = useSelector(getProfile);
  const saldo = useSelector(getBalance);
  const [showBalance, setShowBalance] = useState(false);
  useEffect(() => {
    dispatch(fetchProfile());
    dispatch(fetchBalance());
  }, [dispatch]);
  const toggleBalance = () => {
    setShowBalance(!showBalance);
  };
  const saldoLength = saldo?.data?.balance.toString();
  const point = "•".repeat(saldoLength?.length);
  const profileImageSrc = profile?.data?.profile_image || Profile;
  return (
    <div>
      {" "}
      <Row>
        <Col>
          <Image src={profileImageSrc} alt="img-profile" />
          {/* <Image src={profile?.data?.profile_image} alt="img-profile" /> */}
          <div className="text-start">
            <p className="fs-5 mt-1">Selamat Datang,</p>
            <p className="fs-3 fw-bold">
              {profile?.data?.first_name} {profile?.data?.last_name}
            </p>
          </div>
        </Col>
        <Col>
          <div className="col position-relative">
            <Image src={BgSaldo} alt="img-saldo" />
            <div className="text-white position-absolute top-0 text-start mx-2">
              <p className="fs-6 fw-bold mt-3">Saldo Anda</p>
              {showBalance ? (
                saldo.status === 0 ? (
                  <p className="fs-2 fw-bold my-2">
                    {formatIDR(saldo.data.balance)}
                  </p>
                ) : (
                  <p className="fs-2 fw-bold my-2">Gagal mendapatkan saldo</p>
                )
              ) : (
                <p className="fs-2 fw-bold my-2">Rp {point}</p>
              )}{" "}
              <p
                className="fw-bold"
                onClick={toggleBalance}
                style={{ cursor: "pointer", fontSize: 15 }}
              >
                {showBalance ? "Tutup Saldo" : "Lihat Saldo"}
              </p>
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default Hero;
