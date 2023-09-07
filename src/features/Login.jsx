import React from "react";
import {
  Container,
  Row,
  Col,
  Form,
  Button,
  Image,
  InputGroup,
  Stack,
  FormControl,
} from "react-bootstrap";
import { BiLock, BiShow, BiHide } from "react-icons/bi";
import { useForm, Controller } from "react-hook-form";
import IlustrasiLogin from "../assets/images/Illustrasi Login.png";
import Logo from "../assets/icons/Logo.png";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginUser } from "./users/usersSlice";
const Login = () => {
  const navigate = useNavigate();
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();
  const [showPassword, setShowPassword] = React.useState(false);
  const dispatch = useDispatch();

  const onSubmit = (data) => {
    dispatch(loginUser(data));
  };
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Container fluid>
      <Row>
        <Col xs={12} md={6} style={{ marginTop: "10rem" }}>
          <div className="mx-5">
            <div className="fw-bold mb-5">
              <Stack
                direction="horizontal"
                className="flex justify-content-center"
              >
                <Image src={Logo} alt="icon" />
                <h4 className="mx-2">SIMS PPOB</h4>
              </Stack>
              <h4 className="mx-auto my-3 w-50 text-center">
                Masuk atau buat akun untuk memulai
              </h4>
            </div>

            <Form className="px-5 mx-5" onSubmit={handleSubmit(onSubmit)}>
              <Form.Group className="mb-3" controlId="formGroupEmail">
                <InputGroup>
                  <InputGroup.Text
                    id="inputGroupPrepend"
                    className="bg-transparent"
                  >
                    <b>@</b>
                  </InputGroup.Text>
                  <Controller
                    name="email"
                    control={control}
                    defaultValue=""
                    rules={{
                      required: "Email wajib diisi",
                      pattern: {
                        value: /^\S+@\S+$/i,
                        message: "Masukkan email yang valid",
                      },
                    }}
                    render={({ field }) => (
                      <FormControl
                        {...field}
                        style={{ borderLeft: "none", height: "45px" }}
                        type="email"
                        placeholder="masukan email anda"
                      />
                    )}
                  />
                </InputGroup>
                {errors.email && (
                  <p className="text-danger">{errors.email.message}</p>
                )}
              </Form.Group>

              <Form.Group className="mb-3" controlId="formGroupPassword">
                <InputGroup>
                  <InputGroup.Text
                    id="inputGroupPrepend"
                    className="bg-transparent"
                  >
                    <BiLock />
                  </InputGroup.Text>
                  <Controller
                    name="password"
                    control={control}
                    defaultValue=""
                    rules={{
                      required: "Password wajib diisi",
                    }}
                    render={({ field }) => (
                      <FormControl
                        {...field}
                        style={{
                          borderLeft: "none",
                          borderRight: "none",
                          height: "45px",
                        }}
                        type={showPassword ? "text" : "password"}
                        placeholder="masukan password"
                      />
                    )}
                  />
                  <InputGroup.Text
                    onClick={togglePasswordVisibility}
                    className="bg-transparent"
                  >
                    {showPassword ? <BiHide /> : <BiShow />}
                  </InputGroup.Text>
                </InputGroup>
                {errors.password && (
                  <p className="text-danger">{errors.password.message}</p>
                )}
              </Form.Group>

              <div className="text-center">
                <Button
                  type="submit"
                  variant="outline"
                  className="w-100 my-3 fw-bold"
                  style={{ backgroundColor: "salmon", color: "white" }}
                >
                  Login
                </Button>
                <p>
                  Belum punya akun? register{" "}
                  <span
                    onClick={() => navigate("/registration")}
                    style={{
                      cursor: "pointer",
                      textDecoration: "none",
                      color: "#f13b2f",
                      fontWeight: "bold",
                      height: "50px",
                    }}
                  >
                    di sini
                  </span>
                </p>
              </div>
            </Form>
          </div>
        </Col>

        <Col xs={12} md={6} className="p-0">
          <div className="d-flex justify-content-center p-0 m-0">
            <Image src={IlustrasiLogin} alt="img" width="100%" />{" "}
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
