import {
  Button,
  Divider,
  FormHelperText,
  Grid,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import { Formik } from "formik";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { FormInput, FormPassword } from "../components/FormComponents";
import useAuthStore from "../store/useAuthStore";
import * as Yup from "yup";

function SignUp() {
  const { user, setUser } = useAuthStore();

  const router = useRouter();

  return (
    <Stack alignItems="center" justifyContent="center" height={"100vh"}>
      <Paper
        sx={{
          width: "35%",
          px: 5,
          py: 4,
          border: "1px solid #ccc",
          borderRadius: 3,
        }}
      >
        <Typography variant="h5" mb={2}>
          Sign Up to continue
        </Typography>
        <Divider sx={{ mb: 3 }} />
        <Formik
          initialValues={{
            name: {
              first: "",
              last: "",
            },
            email: "",
            userName: "",
            password: "",
            confirmPassword: "",
          }}
          onSubmit={(values, { setSubmitting }) => {
            setUser(values);
            router.push("/");
            // setSubmitting(false)
          }}
          validationSchema={Yup.object({
            password: Yup.string()
              .required("Please Enter your password")
              .matches(
                /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
                "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character"
              ),
            userName: Yup.string().required("User Name Required"),
            name: Yup.object().shape({
              first: Yup.string().required("First Name Required"),
              last: Yup.string().required("Last Name Required"),
            }),
            email: Yup.string()
              .email("Invalid email address")
              .required("User Email Required"),
            confirmPassword: Yup.string()
              .required("Password confirmation required")
              .oneOf([Yup.ref("password"), null], "Passwords must match"),
          })}
        >
          {({ handleSubmit, isSubmitting }) => {
            return (
              <form onSubmit={handleSubmit}>
                <Grid container spacing={3}>
                  <Grid item xs={6}>
                    <FormInput
                      label="First Name"
                      placeholder="Enter first name"
                      name="name.first"
                      boxProps={{ py: 2 }}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <FormInput
                      label="Last Name"
                      placeholder="Enter last name"
                      name="name.last"
                      boxProps={{ py: 2 }}
                    />
                  </Grid>
                </Grid>

                <FormInput
                  label="Email"
                  placeholder="Enter email address"
                  name="email"
                  boxProps={{ py: 2 }}
                />

                <FormInput
                  label="User Name"
                  placeholder="Enter user name"
                  name="userName"
                  boxProps={{ py: 2 }}
                />

                <FormPassword
                  label="Password"
                  placeholder="Enter secret password"
                  name="password"
                  boxProps={{ py: 2 }}
                />
                {/* <FormHelperText>
                  Must Contain 8 Characters, One Uppercase, One Lowercase, One
                  Number and one special case Character
                </FormHelperText> */}
                <FormPassword
                  label="Confirm Password"
                  placeholder="Confirm secret password"
                  name="confirmPassword"
                  boxProps={{ py: 2 }}
                />

                <Stack
                  direction="row"
                  alignItems="center"
                  justifyContent={"space-between"}
                  mt={2}
                >
                  <Typography
                    color="primary.main"
                    component={Link}
                    href={"/login"}
                  >
                    Login
                  </Typography>

                  <Button
                    disabled={isSubmitting}
                    type="submit"
                    variant="contained"
                    color="primary"
                  >
                    {isSubmitting ? "Verifying..." : "LOGIN"}
                  </Button>
                </Stack>
              </form>
            );
          }}
        </Formik>
      </Paper>
    </Stack>
  );
}

export default SignUp;
