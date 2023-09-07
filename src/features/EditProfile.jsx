import {
  Container,
  Form,
  Button,
  Image,
  InputGroup,
  FormControl,
  Badge,
} from "react-bootstrap";
import Profile from "../assets/images/Profile Photo.png";
import { useEffect, useRef, useState } from "react";
import { FaRegUser } from "react-icons/fa";
import "../App.css";
import { useForm, Controller } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { getProfile, updateUser, uploadImageUser } from "./users/usersSlice";
import { logout } from "./auth/authSlice";
import { HiPencil } from "react-icons/hi";
const EditProfile = () => {
  const {
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm();
  const [edit, setEdit] = useState(false);
  const dispatch = useDispatch();
  const profile = useSelector(getProfile);

  useEffect(() => {
    setValue("email", profile?.data?.email);
    setValue("first_name", profile?.data?.first_name);
    setValue("last_name", profile?.data?.last_name);
  }, [profile, setValue]);

  const onSubmit = (data) => {
    dispatch(updateUser(data));
    setEdit(false);
  };

  const handleEdit = () => {
    setEdit(true);
  };

  const fileInputRef = useRef(null);

  const handleFileUpload = () => {
    fileInputRef.current.click();
  };

  const handleUploadImage = (file) => {
    try {
      const formData = new FormData();
      formData.set("profile_image", file);
      dispatch(uploadImageUser(formData));
    } catch (error) {
      console.log(error);
    }
  };

  const handleLogout = () => {
    dispatch(logout());
  };
  const profileImageSrc = profile?.data?.profile_image || Profile;

  return (
    <Container className="w-50">
      <div className="d-flex justify-content-center">
        <Image src={profileImageSrc} alt="icon" roundedCircle />
        <div className="mt-5">
          <Badge bg="light" text="dark">
            <HiPencil
              className="text-dark fs-6"
              style={{ cursor: "pointer" }}
              onClick={handleFileUpload}
            />
          </Badge>
          <input
            type="file"
            name="profile_image"
            ref={fileInputRef}
            style={{ display: "none" }} // Hide the file input
            onChange={(e) => {
              // Handle file selection here
              const selectedFile = e.target.files[0];
              if (selectedFile) {
                handleUploadImage(selectedFile);
              }
            }}
          />
        </div>
      </div>
      <h4 className="mx-2 text-center my-2">
        {profile?.data?.first_name} {profile?.data?.last_name}
      </h4>

      <Form>
        <Form.Group className="mb-3" controlId="formGroupEmail">
          <InputGroup>
            <InputGroup.Text>
              <b>@</b>
            </InputGroup.Text>
            <Controller
              name="email"
              control={control}
              render={({ field }) => (
                <FormControl
                  {...field}
                  type="email"
                  disabled={!edit}
                  style={{
                    height: "45px",
                    backgroundColor: "white",
                  }}
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
            <InputGroup.Text>
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
                  type="text"
                  style={{
                    height: "45px",
                    backgroundColor: "white",
                  }}
                  placeholder="nama depan"
                  disabled={!edit}
                />
              )}
            />
          </InputGroup>
          {errors.first_name && (
            <p className="text-danger">{errors.first_name.message}</p>
          )}
        </Form.Group>
        <Form.Group className="mb-3" controlId="formGroupLname">
          <InputGroup>
            <InputGroup.Text>
              <FaRegUser />
            </InputGroup.Text>
            <Controller
              name="last_name"
              control={control}
              rules={{ required: "Last name wajib diisi" }}
              render={({ field }) => (
                <FormControl
                  {...field}
                  type="text"
                  style={{
                    height: "45px",
                    backgroundColor: "white",
                  }}
                  placeholder="nama belakang"
                  disabled={!edit}
                />
              )}
            />
          </InputGroup>{" "}
          {errors.last_name && (
            <p className="text-danger">{errors.last_name.message}</p>
          )}
        </Form.Group>

        <div className="text-center">
          {!edit ? (
            <Button
              variant="outline"
              className="w-100 my-3 fw-bold"
              style={{
                backgroundColor: "#f13b2f",
                color: "white",
                height: "45px",
              }}
              onClick={handleEdit}
            >
              Edit profile
            </Button>
          ) : (
            <Button
              variant="outline"
              className="w-100 my-3 fw-bold"
              style={{
                backgroundColor: "#f13b2f",
                color: "white",
                height: "45px",
              }}
              onClick={handleSubmit(onSubmit)}
            >
              Simpan
            </Button>
          )}
        </div>

        <Button
          variant="outline"
          className="w-100 my-3 fw-bold"
          style={{ borderColor: "#f13b2f", color: "#f13b2f", height: "45px" }}
          onClick={handleLogout}
        >
          Logout
        </Button>
      </Form>
    </Container>
  );
};

export default EditProfile;
