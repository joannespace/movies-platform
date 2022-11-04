import React from "react";
import useInitialize from "../hooks/useInitialize";
import {
  Alert,
  Dialog,
  IconButton,
  InputAdornment,
  Typography,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { Stack } from "@mui/system";
import { FormProvider, FTextField } from "./forms";
import { LoadingButton } from "@mui/lab";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useLocation, useNavigate } from "react-router-dom";

const defaultValues = {
  username: "",
  password: "",
};
function LoginForm() {
  const methods = useForm({ defaultValues });
  const {
    handleSubmit,
    formState: { errors, isSubmitting },
  } = methods;

  const { login, open, setOpen } = useInitialize();

  const location = useLocation();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    let from = location.state?.from?.pathname || "/";
    let username = data.username;
    let password = data.password;

    login(username, password, () => {
      navigate(from, { replace: true });
    });

    setOpen(false);
  };

  //TextField Password
  const [showPassword, setShowPassword] = React.useState(false);

  return (
    <Dialog open={open} onClose={() => setOpen(false)} fullWidth maxWidth="xs">
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={2} sx={{ m: 4 }}>
          {!!errors.afterSubmit && (
            <Alert severity="error">{errors.afterSubmit.message}</Alert>
          )}
          <Typography variant="h5" fontWeight="bolder">
            Login Form
          </Typography>

          <FTextField name="username" label="Username" {...methods} />

          <FTextField
            name="password"
            label="Password"
            type={showPassword ? "password" : "text"}
            {...methods}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    color="primary"
                    aria-label="toggle password visibility"
                    onClick={() => setShowPassword(!showPassword)}
                    onMouseDown={(e) => e.preventDefault()}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          <LoadingButton
            size="large"
            type="submit"
            variant="contained"
            color="primary"
            loading={isSubmitting}
          >
            Login
          </LoadingButton>
        </Stack>
      </FormProvider>
    </Dialog>
  );
}

export default LoginForm;
