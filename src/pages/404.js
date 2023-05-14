import { Typography } from "@mui/material";
import Link from "next/link";
import styles from "../styles/NotFound.module.css";

export default function NotFound() {
  return (
    <div className={styles.container}>
      <Typography variant="h2" align="center">
        Looks like you&apos;re lost!
      </Typography>
      <Typography variant="h5" align="center">
        Let&apos;s get you back <Link href="/">home</Link>.
      </Typography>
    </div>
  );
}
