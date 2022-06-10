import { Button, Divider, Paper, Stack, Typography } from "@mui/material";
import { Formik } from "formik";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { FormInput, FormPassword } from "../components/FormComponents";
import useAuthStore from "../store/useAuthStore";
import * as Yup from "yup";
import { isEmpty } from "lodash";

function Login() {
  const { user, setUser } = useAuthStore();

  const router = useRouter();

  // useEffect(() => {
  //   !isEmpty(user) && router.push("/", undefined, { shallow: true });
  // }, [user]);

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
          Login to continue
        </Typography>
        <Divider sx={{ mb: 3 }} />
        <Formik
          initialValues={{
            email: "",
            password: "",
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
            email: Yup.string()
              .email("Invalid email address")
              .required("User Email Required"),
          })}
        >
          {({ handleSubmit, isSubmitting }) => {
            return (
              <form onSubmit={handleSubmit}>
                <FormInput
                  label="Email"
                  placeholder="Enter email address"
                  name="email"
                  boxProps={{ py: 2 }}
                />

                <FormPassword
                  label="Password"
                  placeholder="Enter secret password"
                  name="password"
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
                    href={"/sign-up"}
                  >
                    Sign In
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

export default Login;
