import { Button, Divider, Link, Stack } from "@mui/material";
import {
  AccountPopoverFooter,
  AccountPreview,
  SignOutButton,
} from "@toolpad/core";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";

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
        <Link href="/">
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
