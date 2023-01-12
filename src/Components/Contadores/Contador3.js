import React, { useContext, useState, useEffect } from "react";
import MyContext from "../../context/myContext";
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TableSortLabel,
} from "@material-ui/core";

const Contador3 = () => {
  const { usuarios } = useContext(MyContext);
  const [contador, setContador] = useState([]);
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("username");

  const [totalValue, setTotalValue] = useState(0);

  // agrupar informações de status por username
  const [statusCountByUsername, setStatusCountByUsername] = useState({});

  useEffect(() => {
    const total = usuarios.reduce(
      (acc, item) => acc + parseFloat(item.value),
      0
    );
    setTotalValue(total);

    const groupedStatus = usuarios.reduce((acc, item) => {
      if (!acc[item.username]) {
        acc[item.username] = {
          received: 0,
          expired: 0,
          sent: 0,
        };
      }
      if (item.status === "Boleto Recebido") {
        acc[item.username].received++;
      } else if (item.status === "Boleto vencido") {
        acc[item.username].expired++;
      } else if (item.status === "Emitido o boleto") {
        acc[item.username].sent++;
      }
      return acc;
    }, {});
    setStatusCountByUsername(groupedStatus);
    setContador(usuarios);
  }, [usuarios]);

  const groupedValues = contador.reduce((acc, item) => {
    if (!acc[item.username]) {
      acc[item.username] = 0;
    }
    acc[item.username] += parseFloat(item.value);
    return acc;
  }, {});

  const handleSort = (property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const data = Object.keys(groupedValues).map((key) => {
    return { username: key, value: groupedValues[key] };
  });

  const stableSort = (array, cmp) => {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
      const order = cmp(a[0], b[0]);
      if (order !== 0) return order;
      return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
  };

  const getSorting = (order, orderBy) => {
    return order === "desc"
      ? (a, b) => desc(a, b, orderBy)
      : (a, b) => -desc(a, b, orderBy);
  };

  const desc = (a, b, orderBy) => {
    if (b[orderBy] < a[orderBy]) {
      return -1;
    }
    if (b[orderBy] > a[orderBy]) {
      return 1;
    }
    return 0;
  };

  return (
    <div>
      <h1>Valor total por usuário</h1>
      <Table className="tabela">
        <TableHead>
          <TableRow>
            <TableCell>
              <TableSortLabel
                active={orderBy === "username"}
                direction={order}
                onClick={() => handleSort("username")}
              >
                Usuário
              </TableSortLabel>
            </TableCell>
            <TableCell>
              <TableSortLabel
                active={orderBy === "value"}
                direction={order}
                onClick={() => handleSort("value")}
              >
                Valor
              </TableSortLabel>
            </TableCell>

            <TableCell>Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {stableSort(data, getSorting(order, orderBy)).map((item) => {
            if (item.username !== "") {
              return (
                <TableRow key={item.username}>
                  <TableCell>{item.username}</TableCell>
                  <TableCell>
                    {new Intl.NumberFormat("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                    }).format(item.value)}
                  </TableCell>

                  <TableCell>
                    Boleto Recebido:{" "}
                    {statusCountByUsername[item.username]
                      ? statusCountByUsername[item.username].received
                      : 0}
                    , Boleto Vencido:{" "}
                    {statusCountByUsername[item.username]
                      ? statusCountByUsername[item.username].expired
                      : 0}
                    , Boleto Enviado:{" "}
                    {statusCountByUsername[item.username]
                      ? statusCountByUsername[item.username].sent
                      : 0}
                  </TableCell>
                </TableRow>
              );
            }
            return null;
          })}
        </TableBody>
      </Table>
    </div>
  );
};

export default Contador3;
