import { Fragment, useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faBars } from "@fortawesome/free-solid-svg-icons";

import { List, IconButton, Box, Toolbar } from "@mui/material";

import NavItem from "./NavItem";
import { useLocation } from "react-router-dom";
import NavItems, { getActiveNavId } from "../../config/navbar.config";

const Navbar = (props) => {
    const location = useLocation();
    const [activeNav, setNavActive] = useState(null);

    useEffect(() => {
        setNavActive(getActiveNavId(location.pathname));
    }, [setNavActive, location]);

    function handleNavItemClick(id) {
        setNavActive(id);
    }

    return (
        <Fragment>
            <Toolbar
                id="navbar"
                disableGutters={true}
                sx={{
                    display: "flex",
                    flexFlow: "column nowrap",
                    minWidth: "10rem",
                    height: "100%",
                    boxShadow: "1px 0 4px rgba(0, 0, 0, 0.1)",
                    backgroundColor: "rgb(255, 255, 255)",
                }}
            >
                <Box
                    sx={{
                        display: "flex",
                        alignItems: "flex-end",
                        width: "100%",
                        height: "4rem",
                        padding: "0 12px",
                    }}
                >
                    {false && (
                        <IconButton>
                            <FontAwesomeIcon icon={faBars} />
                        </IconButton>
                    )}
                </Box>
                <List sx={{ width: "100%" }}>
                    {NavItems.map((item, idx) => (
                        <Fragment key={item.id}>
                            <NavItem
                                id={item.id}
                                to={item.to}
                                icon={item.icon}
                                title={item.title}
                                isActive={activeNav === item.id}
                                handleNavItemClick={handleNavItemClick}
                            />
                        </Fragment>
                    ))}
                </List>
            </Toolbar>
        </Fragment>
    );
};

export default Navbar;
