import { Typography } from "@mui/material";
import Link from "next/link";
import styles from "../styles/NotFound.module.css";

export default function ErrorOccurred() {
  return (
    <div className={styles.container}>
      <Typography variant="h2" align="center">
        Looks like something went wrong!
      </Typography>
      <Typography variant="h5" align="center">
        Let&apos;s get you back <Link href="/">home</Link>.
      </Typography>
    </div>
  );
}
