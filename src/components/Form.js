import React, { useState, useRef } from "react";
import Container from "@mui/material/Container";
import { Button, Paper, Typography } from "@mui/material";
import Input from "./Input";
import { makeStyles } from "@mui/styles";
import ReCAPTCHA from "react-google-recaptcha";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import userApi from "../api/userApi";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";

const useStyles = makeStyles({
  formWaper: {
    padding: "34px 54px",
  },
  button: {
    marginTop: "16px",
  },
});

function Form() {
  const history = useHistory();
  const classes = useStyles();

  const [token, setToken] = useState();
  const [errorsRe, setErrorsRe] = useState();

  const schema = yup.object().shape({
    name: yup.string().required("Name không được để trống"),
    phone: yup.string().required("Phone không được để trống"),
    address: yup.string().required("Address không được để trống"),
    email: yup
      .string()
      .required("Email không được để trống")
      .email("Không đúng định dạng email"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const onChange = (value) => {
    setToken(value);
  };

  const refCaptcha = useRef();

  const onSubmit = async (data) => {
    if (!token) {
      setErrorsRe({ message: "Phải xác thực Captcha" });
      return;
    }
    try {
      await userApi.createUser({
        token,
        data,
      });
      refCaptcha.current.reset();

      history.push("/list-user");
    } catch (error) {
      if (error.response) {
        setErrorsRe(error.response.data);
      }
    }
  };
  return (
    <div className="form">
      <Container>
        <Paper className={classes.formWaper} elevation={2}>
          <Button variant="outlined" component={Link} to="/list-user">
            LIST USERS
          </Button>
          <Typography
            variant="h3"
            color="secondary"
            style={{ textAlign: "center", fontSize: "34px", fontWeight: 600 }}
          >
            REGISTER
          </Typography>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Input
              name="name"
              register={register}
              errors={errors}
              type="text"
              label="Name"
              autoFocus
            />
            <Input
              name="phone"
              register={register}
              errors={errors}
              type="text"
              label="Phone"
            />
            <Input
              name="email"
              register={register}
              errors={errors}
              type="text"
              label="Email"
            />
            <Input
              name="address"
              register={register}
              errors={errors}
              type="text"
              label="Address"
            />
            <ReCAPTCHA
              ref={refCaptcha}
              sitekey="6LfFwf8cAAAAAKfxWLtzKzgdGy-5N2ZAqdKhp0K0"
              onChange={onChange}
              onExpired={() => setToken("")}
            />

            <Typography variant="inherit" color="secondary">
              {errorsRe && errorsRe.message}
            </Typography>

            <Button
              fullWidth
              variant="contained"
              color="primary"
              size="large"
              className={classes.button}
              style={{ marginTop: "16px" }}
              type="submit"
            >
              REGISTER
            </Button>
          </form>
        </Paper>
      </Container>
    </div>
  );
}

export default Form;
