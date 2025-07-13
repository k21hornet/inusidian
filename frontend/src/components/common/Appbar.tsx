import { Breadcrumbs } from "@mui/material";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import Link from "next/link";

export default function Appbar() {
  return (
    <Breadcrumbs
      separator={<NavigateNextIcon />}
      sx={{ mb: 1, fontSize: "small" }}
    >
      <Link
        href="/dashboard"
        style={{ textDecoration: "none", color: "inherit" }}
      >
        ダッシュボード
      </Link>
      <Link href="/deck/1" style={{ textDecoration: "none", color: "inherit" }}>
        サンプルデッキ１
      </Link>
    </Breadcrumbs>
  );
}
