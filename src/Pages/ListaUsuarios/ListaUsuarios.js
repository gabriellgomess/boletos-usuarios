import React, { useState, useContext } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import MyContext from "../../context/myContext";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

const ListaUsuarios = () => {
  const { usuarios } = useContext(MyContext);
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const totalPages = Math.ceil(usuarios.length / rowsPerPage);

  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-evenly",
          marginTop: 2,
        }}
      >
        {usuarios
          .slice(
            (page - 1) * rowsPerPage,
            (page - 1) * rowsPerPage + rowsPerPage
          )
          .map((usuario) => {
            const dateCreated = new Date(usuario.dateCreated);
            const formattedDateCreated =
              dateCreated.toLocaleDateString("pt-BR");
            const dueDate = new Date(usuario.dueDate);
            const formattedDueDate = dueDate.toLocaleDateString("pt-BR");
            const value = new Intl.NumberFormat("pt-BR", {
              style: "currency",
              currency: "BRL",
            }).format(usuario.value);
            return (
              <Card key={usuario.customer} sx={{ maxWidth: 275, margin: 1 }}>
                <CardContent>
                  <Typography
                    sx={{ fontSize: 14 }}
                    color="text.secondary"
                    gutterBottom
                  >
                    {usuario.username}
                  </Typography>
                  <Typography variant="h5" component="div">
                    {usuario.status}
                  </Typography>
                  <Typography
                    sx={{ mb: 1.5 }}
                    color="text.secondary"
                    variant="p"
                  >
                    Criação {formattedDateCreated} - Vencimento{" "}
                    {formattedDueDate}
                  </Typography>
                  <Typography variant="body2">{value}</Typography>
                  <Link
                    target="blank"
                    href={usuario.invoiceUrl}
                    underline="none"
                  >
                    <PictureAsPdfIcon />
                  </Link>
                </CardContent>
              </Card>
            );
          })}
      </Box>
      <Stack sx={{ display: "flex", alignItems: "center" }} spacing={2}>
        <Typography>Página: {page}</Typography>
        <Pagination
          count={totalPages}
          page={page}
          onChange={handleChangePage}
        />
      </Stack>
    </>
  );
};

export default ListaUsuarios;
