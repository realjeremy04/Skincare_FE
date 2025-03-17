import { Button, Divider, Stack } from "@mui/material";
import {
  AccountPopoverFooter,
  AccountPreview,
  SignOutButton,
} from "@toolpad/core";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import Link from "next/link";

export default function CustomerAccountMenu() {
  return (
    <Stack direction={"column"} spacing={2}>
      <AccountPreview variant="expanded" />
      <Divider />
      <AccountPopoverFooter
        sx={{
          display: "flex",
          justifyContent: "space-around",
          alignContent: "center",
        }}
      >
        <Link href="/profile">
          <Button
            variant="contained"
            color="primary"
            size="small"
            sx={{ color: "white", textTransform: "none" }}
          >
            <SettingsOutlinedIcon
              fontSize="small"
              sx={{ color: "white", marginRight: "10px" }}
            />
            Settings
          </Button>
        </Link>
        <SignOutButton />
      </AccountPopoverFooter>
    </Stack>
  );
}
