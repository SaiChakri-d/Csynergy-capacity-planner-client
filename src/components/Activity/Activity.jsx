import React, { useState, useContext } from "react";
import Avatar from "../project/Avatar";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import TimelapseIcon from "@mui/icons-material/Timelapse";
import Menu from "@mui/material/Menu";
import Typography from "@mui/material/Typography";
import { Link, useNavigate } from "react-router-dom";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import ListItemButton from "@mui/material/ListItemButton";
import Box from "@mui/material/Box";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import axios from "axios";
import { env } from "../../config";
import UserContext from "../../UserContext";

const Activity = ({ active }) => {
  let context = useContext(UserContext);
  let navigate = useNavigate();
  const [anchorElUser, setAnchorElUser] = useState(null);
  const { refresh, setRefresh, projectId, setProjectId } =
    useContext(UserContext);
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const settings = [
    {
      name: "Edit",
      route: `/portal/editActivity/${active.activityId}`,
      sign: false,
    },
    { name: "Delete", route: "/", sign: true },
  ];

  let activityDelete = async (id) => {
    try {
      let response = await axios.delete(`${env.api}/task/activityDel/${id}`);
      if (response.status === 200) {
        navigate(`/portal/projectList`);
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      {active.startTime === undefined ? (
        <></>
      ) : (
        <div className="card m-3 p-2">
          <div className="  d-flex d-inline mb-3 ">
            <Avatar pic={active.profile} />
            <span className="align-items-start">
              <b>{active.employee}</b>
              <div>
                <small>
                  <CalendarMonthIcon />
                  {`
            ${active.date}`}
                </small>
              </div>
            </span>

            <span className="align-items-start mx-3">
              <b>{active.description}</b>
              <div>
                <small>
                  <TimelapseIcon />
                  {` Start:${active.startTime}${
                    active.startTime > 12 ? "AM" : "PM"
                  } || End:${active.endTime} ${
                    active.startTime > 12 ? "AM" : "PM"
                  }
          `}
                </small>
              </div>
            </span>
            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <MoreVertIcon
                    sx={{
                      color: "Black",
                    }}
                  />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {settings.map((setting) => (
                  <ListItemButton
                    key={setting.name}
                    onClick={
                      setting.sign
                        ? () => activityDelete(active.activityId)
                        : ""
                    }
                    sx={{ color: "black" }}
                    as={Link}
                    to={setting.sign ? "" : setting.route}
                  >
                    <Typography
                      sx={{ fontFamily: "poppins" }}
                      textAlign="center"
                    >
                      {setting.name}
                    </Typography>
                  </ListItemButton>
                ))}
              </Menu>
            </Box>
          </div>
          <div>{active.activeDescription}</div>
        </div>
      )}
    </>
  );
};

export default Activity;
