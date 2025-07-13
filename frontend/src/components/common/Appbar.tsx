import { Breadcrumbs, Link } from "@mui/material";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";

export default function Appbar() {
  return (
    <Breadcrumbs
      separator={<NavigateNextIcon />}
      sx={{ mb: 1, fontSize: "small" }}
    >
      <Link underline="hover" color="inherit" href="#">
        ホーム
      </Link>
      <Link underline="hover" color="inherit" href="#">
        サンプルデッキ１
      </Link>
      <Link underline="hover" color="inherit" href="#">
        復習 or 単語A
      </Link>
    </Breadcrumbs>
  );
}
