import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Box from "@mui/material/Box";
import api from "@/libs/hooks/axiosInstance";
import Swal from "sweetalert2";

export const renderActions = (row: RowType) => {
  const handleEdit = () => {
    // Implement edit functionality if needed
    console.log("Edit", row);
  };

  const handleDelete = async () => {
    // Check if we have a valid ID
    if (!row._id) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Cannot delete account: Missing account ID",
      });
      return;
    }

    // Show confirmation with account details for clarity
    const result = await Swal.fire({
      title: "Are you sure?",
      html: `
        You are about to delete account:<br>
        <strong>${row.username || row.email || "Unknown user"}</strong><br>
        ID: ${row._id}<br><br>
        This action cannot be undone!
      `,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      try {
        await api.delete(`/account/${row._id}?confirm=true`);

        Swal.fire({
          icon: "success",
          title: "Deleted!",
          text: "Account has been deleted successfully.",
          timer: 1500,
          showConfirmButton: false,
        });

        // You might need to refresh the data here
        // This would require restructuring to use context or props
        window.location.reload(); // Temporary solution
      } catch (error) {
        console.error("Error deleting account:", error);

        Swal.fire({
          icon: "error",
          title: "Error",
          text: error.response?.data?.message || "Failed to delete account",
        });
      }
    }
  };

  return (
    <Box>
      <IconButton
        disabled
        size="small"
        color="info"
        onClick={handleEdit}
        title="Edit"
      >
        <EditIcon fontSize="small" />
      </IconButton>
      <IconButton
        size="small"
        color="error"
        onClick={handleDelete}
        title="Delete"
      >
        <DeleteIcon fontSize="small" />
      </IconButton>
    </Box>
  );
};
