import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Box from "@mui/material/Box";

export const renderActions = (row = {}) => (
  <Box>
    <IconButton
      size="small"
      color="info"
      onClick={() => console.log("Edit", row)}
      title="Edit"
    >
      <EditIcon fontSize="small" />
    </IconButton>
    <IconButton
      size="small"
      color="error"
      onClick={() => console.log("Delete", row)}
      title="Delete"
    >
      <DeleteIcon fontSize="small" />
    </IconButton>
  </Box>
);
