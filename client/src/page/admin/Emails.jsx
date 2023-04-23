import { useParams } from "react-router-dom";
import NotFound from "../404";
import { useDispatch, useSelector } from "react-redux";
import { useTheme } from "@emotion/react";
import { useEffect, useState } from "react";
import { setContactData } from "../../state/contact";
import { Box, Divider, Typography } from "@mui/material";
import moment from "moment";
import { DataGrid } from "@mui/x-data-grid";
import View from "../../component/adminComponents/contact/View";
import Delete from "../../component/adminComponents/contact/Delete";

const Emails = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const { adminname } = useParams();
  const [loading, setLoading] = useState(true);
  const getData = useSelector((state) => state);

  const fname = getData.user.user.fname.toLowerCase();
  const emailList = getData.contact.contact;
  console.log(emailList);

  useEffect(() => {
    const fetchContacts = async () => {
      const contactData = await fetch(
        `${process.env.REACT_APP_SERVER_DOMAIN}/admin/getcontacts`
      );
      const resData = await contactData.json();
      dispatch(setContactData(resData));
      setLoading(false);
    };

    return () => fetchContacts();
  }, []);

  if (adminname !== fname) {
    return <NotFound />;
  }

  const rows =
    emailList &&
    emailList.map((email) => {
      return {
        id: email._id,
        name: email.name,
        email: email.email,
        createdAtDate: moment(email.createdAt).fromNow(),
      };
    });

  const columns = [
    { field: "id", headerName: "Email ID", flex:1 },
    { field: "name", headerName: "Name", flex: 0.7 },
    { field: "email", headerName: "Email", flex: 1 },
    { field: "createdAtDate", headerName: "Date", flex: 0.7 },
    {
      field: "actions",
      headerName: "Actions",
      sortable: false,
      flex: 1,
      renderCell(params) {
        return (
          <Box
            component="div"
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: "10px",
            }}
          >
            <View emailId={params.row.id} />
            <Delete emailId={params.row.id} />
          </Box>
        );
      },
    },
  ];

  return (
    <Box
      width="100%"
      sx={{
        backgroundColor: theme.palette.primary.light,
        p: "20px",
        minHeight: "calc(100vh)",
      }}
    >
      <Box
        sx={{
          backgroundColor: theme.palette.background.default,
          borderRadius: "16px",
          p: 4,
          boxShadow: 2,
        }}
      >
        <Typography
          sx={{
            color: theme.palette.grey[900],
            fontWeight: "500",
            fontSize: theme.typography.h5.fontSize,
            mb: "26px",
          }}
        >
          Email list
        </Typography>
        <Divider
          sx={{
            color: theme.palette.grey[900],
            mb: "24px",
          }}
        />
        <div style={{ height: 400, width: "100%", overflow: "auto" }}>
          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[5]}
            loading={loading}
            checkboxSelection
          />
        </div>
      </Box>
    </Box>
  );
};

export default Emails;
