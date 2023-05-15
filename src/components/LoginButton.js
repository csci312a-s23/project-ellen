import { signIn, signOut, useSession } from "next-auth/react";
import Button from "@mui/material/Button";

export default function LoginButton() {
  const { data: session } = useSession();

  if (session) {
    return (
      <Button
        sx={{ backgroundColor: "grey" }}
        variant="contained"
        onClick={() => signOut()}
      >
        Sign out
      </Button>
    );
  } else {
    return (
      <Button
        sx={{ backgroundColor: "grey" }}
        variant="contained"
        onClick={() => signIn("google")}
      >
        Sign in
      </Button>
    );
  }
}
