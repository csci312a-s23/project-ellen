import Link from "next/link";
import { AppBar, Box, Toolbar, Typography, Button } from "@mui/material";
// import MenuIcon from "@mui/icons-material/Menu";
import LoginButton from "./LoginButon";
// import { useState } from "react";
// import Menu from "@mui/material";

export default function NavBar({ userID }) {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          {/* <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton> */}
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <Link href="/">StudentDirect</Link>
          </Typography>

          <Button color="inherit">
            <Link href={`/profile/${userID}`}>Profile</Link>
          </Button>
          <Button color="inherit">
            <Link href="/post">Post</Link>
          </Button>
          <Button color="inherit">
            <Link href="/posts">Feed</Link>
          </Button>
          <LoginButton />
        </Toolbar>
      </AppBar>
    </Box>
  );
}
