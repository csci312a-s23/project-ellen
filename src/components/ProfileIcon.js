import { signIn, signOut, useSession } from "next-auth/react";
import PortraitIcon from "@mui/icons-material/Portrait";
import PersonOffIcon from "@mui/icons-material/PersonOff";
import React, { useState } from "react";
import { Menu, MenuItem } from "@mui/material";
import Link from "next/link";

export default function ProfileIcon() {
  const { data: session } = useSession();

  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  if (!session) {
    return (
      <div>
        <PersonOffIcon sx={{ fontSize: 48 }} onClick={handleMenuClick} />

        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
        >
          <MenuItem
            sx={{ backgroundColor: "grey" }}
            variant="contained"
            onClick={() => signIn("google")}
          >
            Sign in
          </MenuItem>
        </Menu>
      </div>
    );
  } else {
    return (
      <div>
        <PortraitIcon sx={{ fontSize: 48 }} onClick={handleMenuClick} />

        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
        >
          <MenuItem onClick={handleMenuClose}>
            {session && (
              <Link
                href={`/profile/${session.user.name}`}
                style={{ textDecoration: "none" }}
              >
                Profile
              </Link>
            )}
          </MenuItem>

          <MenuItem
            sx={{ backgroundColor: "grey" }}
            variant="contained"
            onClick={() => signOut()}
          >
            Sign Out
          </MenuItem>
        </Menu>
      </div>
    );
  }
}
