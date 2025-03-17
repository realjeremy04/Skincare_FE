"use client";

import TableDisplay from "@/libs/components/TableDisplayer";
import api from "@/libs/hooks/axiosInstance";
import { useEffect, useState } from "react";

import { role } from "@/libs/constants/role";
import {
  filterAccountByRole,
  removeUneccessaryColumns,
} from "@/libs/helpers/FitlterAccountData";
import { renderActions } from "@/libs/components/RenderActionButton";

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

  const filterData = filterAccountByRole(accounts, [role.CUSTOMER]);
  const columns = removeUneccessaryColumns(filterData);

  return (
    <TableDisplay
      data={filterData}
      columns={columns}
      title="Customer Accounts"
      idField="_id"
      defaultRowsPerPage={5}
      actions={renderActions}
    />
  );
}
