/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import {
  Col,
  Row,
  Container,
  Form,
  Stack,
  InputGroup,
  FormControl,
  Button,
  Image,
} from "react-bootstrap";

import { useForm, Controller } from "react-hook-form";
import { MdOutlineMoney } from "react-icons/md";
import { useDispatch } from "react-redux";
import { Transaction } from "../features/datas/datasSlice";
import ModalMessage from "./ModalMessage";
import { useNavigate } from "react-router-dom";
import ModalPayment from "./ModalPayment";

const Payment = ({ selectedService }) => {
  const {
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const [showSuccess, setShowSuccess] = useState(false);
  const [showFailed, setShowFailed] = useState(false);
  const [showPayment, setShowPayment] = useState(false);
  const dispatch = useDispatch();
  const onSubmit = () => {
    const data = {
      service_code: selectedService?.service_code,
      service_tariff: selectedService?.service_tariff,
    };
    dispatch(Transaction(data))
      .then((result) => {
        if (result.payload.status === 0) {
          setShowSuccess(true);
          setShowPayment(false);
        }
      })
      .catch((error) => {
        console.error("Error dispatching transaction:", error);
        setShowFailed(true);
        setShowPayment(false);
      });
  };

  useEffect(() => {
    setValue("service_tariff", selectedService?.service_tariff);
    setValue("service_code", selectedService?.service_code);
  }, [selectedService, setValue]);

  return (
    <>
      <ModalPayment
        show={showPayment}
        onHide={() => setShowPayment(false)}
        message={selectedService?.service_name}
        actionHandler={handleSubmit(onSubmit)}
        nominal={selectedService?.service_tariff}
      />
      <ModalMessage
        show={showSuccess}
        onHide={() => setShowSuccess(false)}
        message="Pembayaran berhasil!"
        messageType="success"
        actionText="Kembali ke beranda"
        actionHandler={() => navigate("/dashboard")}
        nominal={selectedService?.service_tariff}
      />
      <ModalMessage
        show={showFailed}
        onHide={() => setShowFailed(false)}
        message="Pembayaran gagal!"
        messageType="failed"
        actionText="Kembali ke beranda"
        actionHandler={() => navigate("/dashboard")}
        nominal={selectedService?.service_tariff}
      />
      <Container>
        <Row>
          <div className="fw-bold mt-5">
            <p>Pembayaran</p>

            <Stack
              direction="horizontal"
              className="flex justify-content-start"
            >
              <Image
                src={selectedService?.service_icon}
                alt={`Icon for ${selectedService?.service_name}`}
                width={30}
              />
              <p className="m-2">{selectedService?.service_name}</p>
            </Stack>
          </div>
          <Col sm={12}>
            <div>
              <Form>
                <Form.Group className="mb-3" controlId="formGroupEmail">
                  <InputGroup>
                    <InputGroup.Text
                      id="inputGroupPrepend"
                      className="bg-transparent"
                    >
                      <MdOutlineMoney />
                    </InputGroup.Text>
                    <Controller
                      name="service_tariff"
                      control={control}
                      defaultValue={selectedService?.service_tariff}
                      rules={{
                        required: "Nominal wajib diisi",
                      }}
                      render={({ field }) => (
                        <FormControl
                          {...field}
                          style={{
                            borderLeft: "none",
                            height: "45px",
                            backgroundColor: "white",
                          }}
                          type="number"
                          disabled
                        />
                      )}
                    />
                  </InputGroup>
                  {errors.top_up_amount && (
                    <p className="text-danger">
                      {errors.top_up_amount.message}
                    </p>
                  )}
                </Form.Group>
                <div className="text-center">
                  <Button
                    variant="outline"
                    className="w-100 my-2 fw-bold"
                    style={{
                      backgroundColor: "#f13b2f",
                      color: "white",
                      height: "43px",
                    }}
                    onClick={() => setShowPayment(true)}
                  >
                    Bayar
                  </Button>
                </div>
              </Form>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Payment;
