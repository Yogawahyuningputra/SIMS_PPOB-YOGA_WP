/* eslint-disable react/prop-types */
import { Col, Image } from "react-bootstrap";
import Payment from "./Payment";
import { useState } from "react";

const Categories = ({ services }) => {
  console.log(services);
  const [selectedService, setSelectedService] = useState(null);
  const handleServiceClick = (service) => {
    setSelectedService(service);
  };

  return (
    <>
      <div>
        <Col sm={12}>
          <div className="d-flex justify-content-between flex-wrap mt-5">
            {services?.data?.map((data, index) => (
              <div
                key={index}
                className="d-flex flex-column align-items-center"
                style={{ maxWidth: "100px", textAlign: "center" }}
              >
                <Image
                  src={data.service_icon}
                  alt={`Icon for ${data.service_name}`}
                  style={{ cursor: "pointer", maxWidth: "100%" }}
                  onClick={() => handleServiceClick(data)}
                />
                <p
                  style={{
                    wordWrap: "break-word",
                    marginBottom: "0",
                    fontSize: 12,
                  }}
                >
                  {data?.service_name}
                </p>
              </div>
            ))}
          </div>
        </Col>
      </div>
      <Payment selectedService={selectedService} />
    </>
  );
};

export default Categories;
