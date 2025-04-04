import React, { useState } from "react";
import { Card, CardContent, Typography, List, ListItem, ListItemText } from "@mui/material";
import PoemView from "./PoemView"; // New Component
import poems from "./poems"; // Sample data

function PoemList({ viewMode, title, ListWidth, ListHeight }) {
  const [selectedPoem, setSelectedPoem] = useState(null);

  if (selectedPoem) {
    return <PoemView poem={selectedPoem} onClose={() => setSelectedPoem(null)} />;
  }

  return (
    <div style={{
        height:{ListHeight},
        width:{ListWidth},
        backgroundColor:'lightgray',
        }}>
      <Typography variant="h6" gutterBottom style={{ textAlign: "center", marginTop: 10 }}> 
            {title}
      </Typography>
      {viewMode === "list" ? (
        <List>
          {poems.map((poem) => (
            <ListItem key={poem.id} divider button onClick={() => setSelectedPoem(poem)}>
              <ListItemText
                primary={poem.title}
                secondary={`By ${poem.author} • ${poem.datePosted} • ${poem.views} views • ${poem.comments} comments • ⭐ ${poem.rating}`}
              />
            </ListItem>
          ))}
        </List>
      ) : (
        poems.map((poem) => (
          <Card key={poem.id} sx={{ marginBottom: 2, cursor: "pointer" }} onClick={() => setSelectedPoem(poem)}>
            <CardContent>
              <Typography variant="h6">{poem.title}</Typography>
              <Typography variant="subtitle2" color="text.secondary">
                By {poem.author} • {poem.datePosted}
              </Typography>
              <Typography variant="body2" sx={{ marginTop: 1 }}>
                {poem.snippet}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                {poem.views} views • {poem.comments} comments • ⭐ {poem.rating}
              </Typography>
            </CardContent>
          </Card>
        ))
      )}
    </div>
  );
}

export default PoemList;
