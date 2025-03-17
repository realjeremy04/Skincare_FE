"use client";

import { renderActions } from "@/libs/components/RenderActionButton";
import TableDisplay from "@/libs/components/TableDisplayer";
import { role } from "@/libs/constants/role";
import {
  filterAccountByRole,
  removeUneccessaryColumns,
} from "@/libs/helpers/FitlterAccountData";
import api from "@/libs/hooks/axiosInstance";
import React, { useEffect, useState } from "react";

export default function EmployeePage() {
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

  const filterData = filterAccountByRole(accounts, [
    role.STAFF,
    role.ADMIN,
    role.THERAPIST,
  ]);
  const columns = removeUneccessaryColumns(filterData, [
    "avatar",
    "password",
    "__v",
    "updatedAt",
  ]);
  console.log(columns);

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
