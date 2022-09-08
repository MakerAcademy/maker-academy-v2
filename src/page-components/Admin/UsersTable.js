import GreenButton from "@components/buttons/GreenButton";
import DashboardPaper from "@components/DashboardPaper";
import { useAppSelector } from "@hooks/useRedux";
import {
  approveRejectContent,
  deleteContent,
  listenUserContent,
} from "@lib/content";
import EditIcon from "@mui/icons-material/Edit";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import { Box, Button, Stack, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import moment from "moment";
import useTranslation from "next-translate/useTranslation";
import { useEffect, useState } from "react";

const buildRows = (data, t) => {
  const rows = data?.map?.(({ ...item }, i) => ({
    id: item.id,
    count: i,
    displayName: item.displayName,
    email: item.email,
    uid: item.uid,
    cid: item.cid,
    trustLevel: item.trustLevel,
    created: moment(item.created?.toDate?.()).format("MMM DD, YY - HH:mm"),
    data: item,
  }));

  return rows || [];
};

const buildColumns = (t) => {
  return [
    { field: "displayName", headerName: t("display_name"), width: 250 },
    { field: "email", headerName: t("email"), width: 300 },
    {
      field: "trustLevel",
      headerName: t("trust_level"),
      align: "center",
      width: 120,
    },
    { field: "uid", headerName: t("uid"), width: 150 },
    { field: "cid", headerName: t("cid"), width: 150 },
    {
      field: "created",
      headerName: t("created"),
      // type: "date",
      width: 170,
    },
    {
      field: "actions",
      headerName: "",
      width: 200,
      align: "right",
      sortable: false,
      filterable: false,
      renderCell: (params) => (
        <Stack direction="row" alignItems="center" spacing={1}>
          <GreenButton
            size="small"
            variant="outlined"
            // href={`/preview/${params.row.contentType}/${params.id}`}
            // target="_black"
            icon={<EditIcon sx={{ fontSize: 16 }} />}
          >
            {t("edit")}
          </GreenButton>

          {/* <GreenButton
            size="small"
            icon={<OpenInNewIcon sx={{ fontSize: 16 }} />}
            onClick={() =>
              approveRejectContent({ id: params.id, approve: true })
            }
          >
            {t("accept")}
          </GreenButton> */}

          {params.row.data.status === "pending" && (
            <Button
              variant="contained"
              size="small"
              color="error"
              onClick={() =>
                approveRejectContent({ id: params.id, approve: false })
              }
              sx={{ height: 38, px: 3, borderRadius: "8px", fontWeight: 600 }}
            >
              {t("reject")}
            </Button>
          )}
        </Stack>
      ),
    },
  ];
};

const UsersTable = ({ data }) => {
  const [pageSize, setPageSize] = useState(10);
  const { t } = useTranslation("creator-studio");

  return (
    <DashboardPaper sx={{ minHeight: 600 }}>
      <Typography sx={{ mb: 3 }}>Users</Typography>

      <DataGrid
        autoHeight
        rowHeight={70}
        rows={buildRows(data || [], t)}
        columns={buildColumns(t)}
        pageSize={pageSize}
        onPageSizeChange={(i) => setPageSize(i)}
        rowsPerPageOptions={[5, 10, 20, 50]}
        sx={{
          "& .MuiDataGrid-root": {
            border: "none !important",
            backgroundColor: "red",
          },
          "& .MuiDataGrid-columnHeaders": {
            bgcolor: "grey.grey1",
          },
          "& .MuiDataGrid-columnSeparator": {
            color: "grey.grey1",
          },
          "& .MuiDataGrid-columnHeaderTitle": {
            textTransform: "uppercase",
            fontSize: 14,
          },
          "& .MuiDataGrid-cellContent": {
            //   fontSize: 15,
          },
        }}
      />
    </DashboardPaper>
  );
};

export default UsersTable;
