"use client";

import TableDisplay from "@/libs/components/TableDisplayer";
import api from "@/libs/hooks/axiosInstance";
import { useEffect, useState } from "react";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Box from "@mui/material/Box";

export default function CustomerPage() {
  const [accounts, setAccounts] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await api.get("/account");
        setAccounts(res.data);
      } catch (error) {
        console.error("Error fetching customer data:", error);
      }
    }
    fetchData();
  }, []);

  // Create proper column definitions from the account data
  const columns =
    accounts.length > 0
      ? Object.keys(accounts[0])
          .filter(
            (key) =>
              key !== "avatar" &&
              key !== "password" &&
              key !== "__v" &&
              key !== "updatedAt"
          )
          .map((key) => ({
            field: key,
            header: key.toUpperCase(),
            width: "auto",
          }))
      : [];

  const renderActions = (row) => (
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

  return (
    <TableDisplay
      data={accounts}
      columns={columns}
      title="Customer Accounts"
      idField="_id"
      defaultRowsPerPage={5}
      actions={renderActions}
    />
  );
}
