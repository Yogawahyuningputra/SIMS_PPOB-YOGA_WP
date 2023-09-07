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
import Hero from "./Hero";
import { useForm, Controller } from "react-hook-form";
import { MdOutlineMoney } from "react-icons/md";
import { useDispatch } from "react-redux";
import { Transaction } from "../features/datas/datasSlice";

const Payment = ({ selectedService }) => {
  const {
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm();
  const [code, setCode] = useState("");

  const dispatch = useDispatch();
  const onSubmit = () => {
    const data = {
      service_code: selectedService?.service_code,
      service_tariff: selectedService?.service_tariff,
    };
    dispatch(Transaction(data));
  };

  useEffect(() => {
    setValue("service_tariff", selectedService?.service_tariff);
    setValue("service_code", selectedService?.service_code);
    setCode(selectedService?.service_code);
  }, [selectedService, setValue]);

  return (
    <>
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
              <Form onSubmit={handleSubmit(onSubmit)}>
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
                          style={{ borderLeft: "none", height: "45px" }}
                          type="number"
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
                    type="submit"
                    variant="outline"
                    className="w-100 my-2 fw-bold"
                    style={{
                      backgroundColor: "#f13b2f",
                      color: "white",
                      height: "43px",
                    }}
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
