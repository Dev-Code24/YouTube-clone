/* eslint-disable array-callback-return */
import React, { createContext } from "react";
import { Box, Typography } from "@mui/material";
import { useTheme } from "@emotion/react";
import { useGetVideosQuery } from "../../state/api";
import { useMediaQuery } from "@mui/material";

import VideoRow from "./VideoRow";
const GridSizeContext = createContext(null);
const Home = () => {
  const theme = useTheme();
  const { data, isLoading } = useGetVideosQuery();
  const moreThan1500 = useMediaQuery("(min-width:1590px)");
  // gives true when window size > 1500 grid size 4
  const moreThan1100 = useMediaQuery("(min-width:1100px)");
  // gives true when window size > 1500 grid size 3
  const moreThan700 = useMediaQuery("(min-width:700px)");
  // gives true when window size > 1500 grid size 2
  // anything less than 700 then grid size 1
  let gridSize = 1;
  if (moreThan700) gridSize = 2;
  if (moreThan1100) gridSize = 3;
  if (moreThan1500) gridSize = 4;
  const videos = !isLoading
    ? data.videos.filter((video) => video.videoType === "video")
    : [];
  return (
    // Need to apply Youtube like logic to make the grids and only two rows before the shorts
    <GridSizeContext.Provider value={gridSize}>
      <Box sx={{ position: "relative" }}>
        <Box
          className="video-box-container"
          sx={{
            display: "flex",
            flexWrap: "wrap",
          }}>
          {isLoading ? (
            <Typography
              variant="h3"
              sx={{ color: theme.palette.textPrimaryDark }}>
              Loading...
            </Typography>
          ) : (
            videos.map((videoData, idx, array) => {
              if (idx % gridSize === 0) {
                // Calculate the start index for each chunk
                const startIndex = idx;
                const endIndex = Math.min(idx + gridSize, array.length);
                const chunkArr = array.slice(startIndex, endIndex);
                // console.log(idx, chunkArr);
                return (
                  <VideoRow
                    videoDataArr={chunkArr}
                    theme={theme}
                    key={startIndex}
                  />
                );
              }
            })
          )}
        </Box>
      </Box>
    </GridSizeContext.Provider>
  );
};

export default Home;
export { GridSizeContext };
