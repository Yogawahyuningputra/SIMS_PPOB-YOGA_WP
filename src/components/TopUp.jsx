import { useState } from "react";
import {
  Col,
  Row,
  Container,
  Form,
  Stack,
  InputGroup,
  FormControl,
  Button,
} from "react-bootstrap";
import Hero from "./Hero";
import { useForm, Controller } from "react-hook-form";
import { MdOutlineMoney } from "react-icons/md";
import ModalTopup from "./ModalTopup";

const TopUp = () => {
  const {
    handleSubmit,
    control,
    setValue,
    getValues,
    formState: { errors },
  } = useForm();

  const [nominal, setNominal] = useState("");
  const [showTopUp, setShowTopUp] = useState(false);
  const onSubmit = (data) => {
    // dispatch(topUp(data));
    setNominal(data);
    setShowTopUp(!showTopUp);
  };
  const handleNominalTopUp = (top_up_amount) => {
    setValue("top_up_amount", top_up_amount);
    setNominal(getValues("top_up_amount"));
  };
console.log('top upnomonal :', nominal)
  return (
    <>
      <ModalTopup show={showTopUp} onHide={setShowTopUp} nominal={nominal} />
      <Container>
        <Hero />
        <Row>
          <div className="fw-bold mt-5">
            <Stack
              direction="horizontal"
              className="flex justify-content-start"
            >
              <p>Silahkan masukan</p>
            </Stack>
            <h4 className="w-50 text-start">Nominal Top Up</h4>
          </div>
          <Col sm={7}>
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
                      name="top_up_amount"
                      control={control}
                      defaultValue=""
                      rules={{
                        required: "Nominal wajib diisi",
                        min: {
                          value: 10000, // Set nilai minimal top-up ke 10.000
                          message: "Minimal top-up adalah Rp.10.000",
                        },
                        max: {
                          value: 1000000, // Set nilai minimal top-up ke 10.000
                          message: "Maksimal top-up adalah Rp.1000.000",
                        },
                      }}
                      render={({ field }) => (
                        <FormControl
                          {...field}
                          style={{ borderLeft: "none", height: "45px" }}
                          type="number"
                          placeholder="masukan nominal tup  up"
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
                    disabled={!getValues("top_up_amount")}
                  >
                    Top Up
                  </Button>
                </div>
              </Form>
            </div>
          </Col>

          <Col sm={4}>
            <div className=" d-flex justify-content-between">
              <Button
                variant="outline"
                style={{
                  height: "43px",
                  backgroundColor:
                    nominal === 10000 ? "#f13b2f" : "transparent",
                  color: nominal === 10000 ? "white" : "black",
                  border:
                    nominal === 10000 ? "transparent" : "1px solid #dee2e6",
                }}
                onClick={() => handleNominalTopUp(10000)}
              >
                Rp.10.000
              </Button>
              <Button
                variant="outline"
                style={{
                  height: "43px",

                  backgroundColor:
                    nominal === 20000 ? "#f13b2f" : "transparent",
                  color: nominal === 20000 ? "white" : "black",
                  border:
                    nominal === 20000 ? "transparent" : "1px solid #dee2e6",
                }}
                onClick={() => handleNominalTopUp(20000)}
              >
                Rp.20.000
              </Button>
              <Button
                variant="outline"
                style={{
                  backgroundColor:
                    nominal === 50000 ? "#f13b2f" : "transparent",
                  color: nominal === 50000 ? "white" : "black",
                  border:
                    nominal === 50000 ? "transparent" : "1px solid #dee2e6",
                }}
                onClick={() => handleNominalTopUp(50000)}
              >
                Rp.50.000
              </Button>
            </div>
            <div className="d-flex justify-content-between mt-4">
              <Button
                variant="outline"
                style={{
                  height: "43px",
                  backgroundColor:
                    nominal === 100000 ? "#f13b2f" : "transparent",
                  color: nominal === 100000 ? "white" : "black",
                  border:
                    nominal === 100000 ? "transparent" : "1px solid #dee2e6",
                }}
                onClick={() => handleNominalTopUp(100000)}
              >
                Rp.100.000
              </Button>
              <Button
                variant="outline"
                style={{
                  height: "43px",

                  backgroundColor:
                    nominal === 250000 ? "#f13b2f" : "transparent",
                  color: nominal === 250000 ? "white" : "black",
                  border:
                    nominal === 250000 ? "transparent" : "1px solid #dee2e6",
                }}
                onClick={() => handleNominalTopUp(250000)}
              >
                Rp.250.000
              </Button>
              <Button
                variant="outline"
                style={{
                  height: "43px",

                  backgroundColor:
                    nominal === 500000 ? "#f13b2f" : "transparent",
                  color: nominal === 500000 ? "white" : "black",
                  border:
                    nominal === 500000 ? "transparent" : "1px solid #dee2e6",
                }}
                onClick={() => handleNominalTopUp(500000)}
              >
                Rp.500.000
              </Button>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default TopUp;
