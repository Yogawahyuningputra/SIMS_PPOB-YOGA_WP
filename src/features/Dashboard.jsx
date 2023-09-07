import { useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";

import Categories from "../components/Categories";
import "./dashboard.scss";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchBanner,
  fetchServices,
  getBanner,
  getServices,
} from "./datas/datasSlice";
import Banner from "../components/Banner";
import Hero from "../components/Hero";
const Dashboard = () => {
  const dispatch = useDispatch();

  const services = useSelector(getServices);
  const banner = useSelector(getBanner);

  // console.log("services:", services);
  // console.log("banner:", banner);
  useEffect(() => {
    dispatch(fetchBanner());
    dispatch(fetchServices());
  }, [dispatch]);

  return (
    <Container>
      <Hero />
      <Row>
        <Col>
          <Categories services={services} />
        </Col>
      </Row>
      <Row>
        <Col>
          <Banner banner={banner} />
        </Col>
      </Row>
    </Container>
  );
};

export default Dashboard;
