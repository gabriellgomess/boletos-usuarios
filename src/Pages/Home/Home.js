import React from "react";
import Contador1 from "../../Components/Contadores/Contador1";
import Contador2 from "../../Components/Contadores/Contador2";
import Contador3 from "../../Components/Contadores/Contador3";
import Contador4 from "../../Components/Contadores/Contador4";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

const Home = () => {
  return (
    <>
      <Contador1 />
      <Contador2 />
      <Card>
        <CardContent>
          <Contador4 />
        </CardContent>
        {/* <Contador3 /> */}
      </Card>
    </>
  );
};

export default Home;
