import { useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";

import Categories from "../components/Categories";
import "./dashboard.scss";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchBanner,
  fetchServices,
  getBannerData,
  getServicesData,
} from "./datas/datasSlice";
import Banner from "../components/Banner";
import Hero from "../components/Hero";
const Dashboard = () => {
  const dispatch = useDispatch();

  const services = useSelector(getServicesData);
  const banner = useSelector(getBannerData);

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
