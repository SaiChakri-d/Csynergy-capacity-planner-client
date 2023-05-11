import React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

const DashboardCard = ({ card }) => {
  return (
    <div className="col-xl-2 col-md-6 mb-4 m-auto">
      <Card sx={{ minWidth: 200, maxWidth: 250, bgcolor: "#F7F7F7" }}>
        <CardContent>
          <Typography
            sx={{ fontFamily: "Poppins", fontSize: 16, fontWeight: 700 }}
            color="text.secondary"
            gutterBottom
          >
            {card.title}
          </Typography>
          <Typography
            sx={{
              fontFamily: "Poppins",
              fontWeight: 900,
              fontSize: 32,
            }}
            color="text.secondary"
            gutterBottom
          >
            {card.hours}
            {card.month ? (
              <small
                className="mx-2"
                style={{ fontWeight: "500", fontSize: "15px" }}
              >
                Months/hrs
              </small>
            ) : (
              ""
            )}
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
};

export default DashboardCard;
