import { Box, Typography } from "@mui/material";
import React from "react";
import Monkey404 from "../svgs/monkey.png";
import YoutubeIcon from "../svgs/YoutubeLight.svg";

const Page404 = () => {
  return (
    <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column", height: "100%" }}>
      <Box sx={{ marginBottom: "20px", display: "flex", alignItems: "center", flexDirection: "column" }}>
        <img src={Monkey404} alt="error404" />
        <Typography variant="h5" sx={{ marginTop: "10px" }}>
          This page isn't available. Sorry about that. <br />
          Try searching for something else.
        </Typography>
      </Box>
      <img style={{ transform: "scale(1.5)" }} src={YoutubeIcon} alt="youtube-icon"/>
    </Box>
  );
};

export default Page404;
