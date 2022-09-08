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
    profilePicture: item.profilePicture,
    firstName: item.firstName,
    lastName: item.lastName,
    email: item.email,
    title: item.title,
    enrolledCourses: item.enrolledCourses?.length || 0,
    readDocuments: item.readDocuments?.length || 0,
    created: moment(item.created?.toDate?.()).format("MMM DD, YY - HH:mm"),
    data: item,
  }));

  return rows || [];
};

const buildColumns = (t) => {
  return [
    {
      field: "profilePicture",
      headerName: t("profile_picture"),
      width: 140,
      sortable: false,
      filterable: false,
      renderCell: (params) => {
        return (
          <Box sx={{ height: "100%", py: 1 }}>
            <img
              src={params.value}
              alt={params.title}
              style={{
                height: "100%",
                width: "100%",
                objectFit: "cover",
                borderRadius: "5px",
              }}
            />
          </Box>
        );
      },
    },
    { field: "firstName", headerName: t("first_name"), width: 150 },
    { field: "lastName", headerName: t("last_name"), width: 150 },
    { field: "email", headerName: t("email"), width: 300 },
    { field: "title", headerName: t("title"), width: 150 },
    { field: "enrolledCourses", headerName: t("enrolled_courses"), width: 100 },
    { field: "readDocuments", headerName: t("read_documents"), width: 100 },
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

const ContactsTable = ({ data }) => {
  const [pageSize, setPageSize] = useState(10);
  const { t } = useTranslation("creator-studio");

  return (
    <DashboardPaper sx={{ minHeight: 600 }}>
      <Typography sx={{ mb: 3 }}>Contacts</Typography>

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
            bgcolor: "primary.grey1",
          },
          "& .MuiDataGrid-columnSeparator": {
            color: "primary.grey1",
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

export default ContactsTable;
