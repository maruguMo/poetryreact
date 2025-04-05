import React from "react";
import { Box, Typography, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useAppContext } from "./AppContext";
function PoemView({ poem, onClose }) {
  const { isSmallScreen } = useAppContext();
  return (
    <Box
      sx={{
        position: "fixed",
        zIndex: 1000,
        top: 0,
        left: '50%',
        transform: 'translateX(-50%)',
        width: isSmallScreen?"100dvw" :"70dvw",
        height: isSmallScreen?"100dvh":"95dvh",
        backgroundColor: "rgba(255, 255, 255, 0.95)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        cursor: "pointer",
        // justifyContent: "center",
        padding: 4,
        overflowY: "auto",
      }}
    >
      <IconButton onClick={onClose} sx={{ position: "fixed", top: 12, right: 20, zIndex:1000 }}>
        <CloseIcon />
      </IconButton>
      
      <Typography variant="h4" gutterBottom>{poem.title}</Typography>
      <Typography variant="subtitle1" color="text.secondary">{`By ${poem.author} • ${poem.datePosted}`}</Typography>
      
      <Typography variant="body1" sx={{ marginTop: 2, maxWidth: "600px",padding:'10px', textAlign: "justify" }}>
        {poem.fullText}
      </Typography>
      
      <Box sx={{ marginTop: 4 }}>
        <Typography variant="subtitle2">⭐ {poem.rating} | {poem.views} views | {poem.comments} comments</Typography>
      </Box>
    </Box>
  );
}

export default React.memo(PoemView);
