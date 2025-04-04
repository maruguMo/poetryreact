// Sidebar.js
import React, { useState } from 'react';
import { Drawer, List, ListItem, ListItemIcon, ListItemText, Collapse, IconButton, Divider } from '@mui/material';
import { Home, Edit, MenuBook, EmojiEvents, AccountCircle, Inbox, Logout, ExpandLess, ExpandMore } from '@mui/icons-material';

function AppSidebar({ isOpen, onClose }) {
    const [profileOpen, setProfileOpen] = useState(true);

    const handleProfileClick = () => {
        setProfileOpen(profileOpen);
    };

    return (
        <Drawer anchor="left" open={isOpen} onClose={onClose}>
            <List>
                <ListItem button>
                    <ListItemIcon><Home /></ListItemIcon>
                    <ListItemText primary="Home" />
                </ListItem>
                <ListItem button>
                    <ListItemIcon><Edit /></ListItemIcon>
                    <ListItemText primary="Submit Poems" />
                </ListItem>
                <ListItem button>
                    <ListItemIcon><MenuBook /></ListItemIcon>
                    <ListItemText primary="Famous Poems" />
                </ListItem>
                <ListItem button>
                    <ListItemIcon><EmojiEvents /></ListItemIcon>
                    <ListItemText primary="Contests" />
                </ListItem>
                <ListItem button>
                    <ListItemIcon><AccountCircle /></ListItemIcon>
                    <ListItemText primary="Blogs" />
                </ListItem>
                <Divider />
                <ListItem button onClick={handleProfileClick}>
                    <ListItemIcon><AccountCircle /></ListItemIcon>
                    <ListItemText primary="Profile" />
                    {profileOpen ? <ExpandLess /> : <ExpandMore />}
                </ListItem>
                <Collapse in={profileOpen} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                        <ListItem button>
                            <ListItemIcon><AccountCircle /></ListItemIcon>
                            <ListItemText primary="My Poems" />
                        </ListItem>
                        <ListItem button>
                            <ListItemIcon><Inbox /></ListItemIcon>
                            <ListItemText primary="Inbox" />
                        </ListItem>
                        <ListItem button>
                            <ListItemIcon><Inbox /></ListItemIcon>
                            <ListItemText primary="Outbox" />
                        </ListItem>
                        <ListItem button>
                            <ListItemIcon><Logout /></ListItemIcon>
                            <ListItemText primary="Logout" />
                        </ListItem>
                    </List>
                </Collapse>
            </List>
        </Drawer>
    );
}

export default React.memo(AppSidebar);
