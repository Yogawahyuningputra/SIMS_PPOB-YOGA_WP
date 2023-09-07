import {
  Container,
  Row,
  Col,
  Form,
  Button,
  Image,
  InputGroup,
  FormControl,
  Stack,
} from "react-bootstrap";
import IlustrasiLogin from "../assets/images/Illustrasi Login.png";
import Logo from "../assets/icons/Logo.png";
import { useState } from "react";
import { BiLock, BiShow, BiHide } from "react-icons/bi";
import { FaRegUser } from "react-icons/fa";
import "../App.css";
import { useNavigate } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import { useDispatch } from "react-redux";
import { registerUser } from "./users/usersSlice";

const Registration = () => {
  const navigate = useNavigate();
  const {
    handleSubmit,
    control,
    getValues,
    formState: { errors },
  } = useForm();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const dispatch = useDispatch();

  const onSubmit = (data) => {
    dispatch(registerUser(data));
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };
  return (
    <Container fluid>
      <Row>
        <Col xs={12} md={6} style={{ marginTop: "10rem" }}>
          <div className="fw-bold mb-5">
            <Stack
              direction="horizontal"
              className="d-flex justify-content-center"
            >
              <Image src={Logo} alt="icon" />
              <h4 className="mx-2">SIMS PPOB</h4>
            </Stack>
            <h4 className="mx-auto my-3 w-50 text-center">
              Lengkapi data untuk membuat akun
            </h4>
          </div>

          <Form className="px-5 mx-5" onSubmit={handleSubmit(onSubmit)}>
            <Form.Group className="mb-3" controlId="formGroupEmail">
              <InputGroup>
                <InputGroup.Text
                  className={
                    errors.email
                      ? "bg-transparent invalid-input"
                      : "bg-transparent"
                  }
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
                      style={{
                        borderLeft: errors.email ? "none" : "none",
                        borderColor: errors.email && "red",
                        height: "45px",
                      }}
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
            <Form.Group className="mb-3" controlId="formGroupFname">
              <InputGroup>
                <InputGroup.Text
                  className={
                    errors.fname
                      ? "bg-transparent invalid-input"
                      : "bg-transparent"
                  }
                >
                  <FaRegUser />
                </InputGroup.Text>
                <Controller
                  name="first_name"
                  control={control}
                  rules={{
                    required: "First name wajib diisi",
                  }}
                  render={({ field }) => (
                    <FormControl
                      {...field}
                      style={{
                        borderLeft: errors.fname ? "none" : "none",
                        borderColor: errors.fname && "red",
                        height: "45px",
                      }}
                      type="text"
                      placeholder="nama depan"
                    />
                  )}
                />
              </InputGroup>
              {errors.fname && (
                <p className="text-danger">{errors.fname.message}</p>
              )}
            </Form.Group>
            <Form.Group className="mb-3" controlId="formGroupLname">
              <InputGroup>
                <InputGroup.Text
                  className={
                    errors.lname
                      ? "bg-transparent invalid-input"
                      : "bg-transparent"
                  }
                >
                  <FaRegUser />
                </InputGroup.Text>
                <Controller
                  name="last_name"
                  control={control}
                  rules={{ required: "Last name wajib diisi" }}
                  render={({ field }) => (
                    <FormControl
                      {...field}
                      style={{
                        borderLeft: errors.lname ? "none" : "none",
                        borderColor: errors.lname && "red",
                        height: "45px",
                      }}
                      type="text"
                      placeholder="nama belakang"
                    />
                  )}
                />
              </InputGroup>{" "}
              {errors.lname && (
                <p className="text-danger">{errors.lname.message}</p>
              )}
            </Form.Group>
            <Form.Group className="mb-3" controlId="formGroupPassword">
              <InputGroup>
                <InputGroup.Text
                  className={
                    errors.password
                      ? "bg-transparent invalid-input"
                      : "bg-transparent"
                  }
                >
                  <BiLock />
                </InputGroup.Text>
                <Controller
                  name="password"
                  control={control}
                  defaultValue=""
                  rules={{
                    required: "Password wajib diisi",
                    minLength: 8,
                  }}
                  render={({ field }) => (
                    <FormControl
                      {...field}
                      style={{
                        borderLeft: errors.password ? "none" : "none",
                        borderRight: errors.password ? "none" : "none",
                        borderColor: errors.password && "red",
                        height: "45px",
                      }}
                      type={showPassword ? "text" : "password"}
                      placeholder="buat password"
                    />
                  )}
                />
                <InputGroup.Text
                  onClick={togglePasswordVisibility}
                  className={
                    errors.password
                      ? "bg-transparent invalid-input"
                      : "bg-transparent"
                  }
                >
                  {showPassword ? <BiHide /> : <BiShow />}
                </InputGroup.Text>
              </InputGroup>
              {errors.password && (
                <p className="text-danger">{errors.password.message}</p>
              )}
            </Form.Group>
            <Form.Group className="mb-3" controlId="formGroupConfirmPassword">
              <InputGroup>
                <InputGroup.Text
                  className={
                    errors.confirmPassword
                      ? "bg-transparent invalid-input"
                      : "bg-transparent"
                  }
                >
                  <BiLock color={errors.confirmPassword && "red"} />
                </InputGroup.Text>
                <Controller
                  name="confirmPassword"
                  control={control}
                  defaultValue=""
                  rules={{
                    required: "Konfirmasi password wajib diisi",
                    validate: (value) => {
                      const password = getValues("password");
                      return value === password || "Password tidak sama";
                    },
                  }}
                  render={({ field }) => (
                    <FormControl
                      {...field}
                      style={{
                        borderLeft: errors.confirmPassword ? "none" : "none",
                        borderRight: errors.confirmPassword ? "none" : "none",
                        borderColor: errors.confirmPassword && "red",
                        height: "45px",
                      }}
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="konfirmasi password"
                    />
                  )}
                />

                <InputGroup.Text
                  onClick={toggleConfirmPasswordVisibility}
                  className={
                    errors.confirmPassword
                      ? "bg-transparent invalid-input"
                      : "bg-transparent"
                  }
                >
                  {showConfirmPassword ? <BiHide /> : <BiShow />}
                </InputGroup.Text>
              </InputGroup>
              {errors.confirmPassword && (
                <p className="text-danger">{errors.confirmPassword.message}</p>
              )}
            </Form.Group>
            <div className="text-center">
              <Button
                variant="outline"
                className="w-100 my-3 fw-bold"
                style={{ backgroundColor: "#f13b2f", color: "white" }}
                type="submit"
              >
                Registrasi
              </Button>
              <p>
                sudah punya akun? login{" "}
                <span
                  onClick={() => navigate("/login")}
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
        </Col>
        <Col xs={12} md={6} className="p-0">
          <Image
            src={IlustrasiLogin}
            alt="img"
            className="w-100"
            style={{ objectFit: "cover", maxHeight: "100%" }}
          />
        </Col>
      </Row>
    </Container>
  );
};

export default Registration;
