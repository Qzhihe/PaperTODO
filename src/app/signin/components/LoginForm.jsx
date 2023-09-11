"use client";

import axios from "axios";
import { Fragment } from "react";
import { useRouter } from "next/navigation";
import { Box, TextField, Button, Grid, Link } from "@mui/material";

export default function LoginForm() {
  const router = useRouter();

  async function handleSubmit(ev) {
    ev.preventDefault();

    try {
      const result = await axios.post("/api/login", {
        email: "admin1",
        password: "admin",
      });
      console.log(result);
      if (result.status === 200) {
        localStorage.setItem("token", result.data.token); // 这个实际上是登陆成功后返回的token
        router.replace("/views/today");
      }
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <Fragment>
      <Box
        component="form"
        noValidate
        onSubmit={handleSubmit}
        sx={{ mt: 1 }}
        name="login-form"
      >
        <TextField
          margin="normal"
          required
          fullWidth
          id="name"
          label="用户名"
          name="name"
          autoComplete="email"
          autoFocus
        />
        <TextField
          fullWidth
          required
          margin="normal"
          name="password"
          label="用户密码"
          type="password"
          id="password"
          autoComplete="current-password"
        />

        <Button
          className="bg-[#1976d2]"
          fullWidth
          type="submit"
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          登录
        </Button>

        <Grid container>
          <Grid item xs>
            <Link href="signup" variant="body2">
              {"没有账号,免费注册"}
            </Link>
          </Grid>
          <Grid item>
            <Link href="/" variant="body2">
              {"返回首页"}
            </Link>
          </Grid>
        </Grid>
      </Box>
    </Fragment>
  );
}
