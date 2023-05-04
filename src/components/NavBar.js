import Link from "next/link";
import { useSession } from "next-auth/react";
import { AppBar, Box, Toolbar, Typography, Button } from "@mui/material";
// import MenuIcon from "@mui/icons-material/Menu";
import LoginButton from "./LoginButon";
// import { useState } from "react";
// import Menu from "@mui/material";

export default function NavBar() {
  const { data: session } = useSession();

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

          {session && (
            <Button color="inherit">
              <Link href={`/profile/${session.user.name}`}>Profile</Link>
            </Button>
          )}

          <LoginButton />
        </Toolbar>
      </AppBar>
    </Box>
  );
}
