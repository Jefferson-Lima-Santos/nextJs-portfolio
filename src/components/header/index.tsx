"use client";
import Image from "next/image";
import Link from "next/link";
import { NavItem } from "./nav-item";
import useMediaQuery from "@mui/material/useMediaQuery";
import TagIcon from "@mui/icons-material/Tag";
import MenuIcon from '@mui/icons-material/Menu';
import MenuOpen from '@mui/icons-material/MenuOpen';
import { Box, useTheme, IconButton, Menu, MenuItem, ListItemText, ListItemIcon } from "@mui/material";
import { LanguageSwitch } from "../language-switch";
import { MouseEvent, useState } from "react";

const NAV_ITENS: { label: "home" | "carrer" | "projects" | "activities"; href: string }[] = [
    {
        label: "home",
        href: "/#author",
    },
    {
        label: "carrer",
        href: "/#work-experience",
    },
    {
        label: "activities",
        href: "/activities",
    },
];

export const Header = () => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const theme = useTheme();
    const mobileMode = useMediaQuery(theme.breakpoints.up(700));

    return (
        <header>
            <Box
                sx={{
                    display: "flex",
                    padding: "1rem",
                    maxWidth: "1400px",
                    width: "100%",
                }}
            >
                <Link href="/">
                    <Image
                        src="/images/JS-Logo.jpg"
                        alt="logo JS"
                        width={80}
                        height={60}
                    />
                </Link>
                {mobileMode ? (
                    <nav
                        style={{
                            display: "flex",
                            gap: "4rem",
                            marginLeft: "auto",
                        }}
                    >
                        {NAV_ITENS.map((item) => (
                            <NavItem {...item} key={item.href} />
                        ))}
                        <LanguageSwitch />
                    </nav>
                ) : (
                    <>
                        <IconButton
                            onClick={handleClick}
                            sx={{
                                marginLeft: "auto",
                                color: theme.palette.primary.main,
                                marginRight: "1rem",
                            }}
                            aria-label="menu"
                        >
                            {open ? <MenuOpen /> : <MenuIcon />}
                        </IconButton>

                        <Menu
                            id="basic-menu"
                            anchorEl={anchorEl}
                            open={open}
                            onClose={handleClose}
                        >
                            {NAV_ITENS.map((item) => (
                                <MenuItem key={item.href} component={Link} href={item.href}>
                                    <ListItemIcon
                                        sx={{
                                            minWidth: 0,
                                            marginRight: "1rem",
                                            color: theme.palette.primary.main,
                                        }}
                                    >
                                        <TagIcon />
                                    </ListItemIcon>
                                    <ListItemText 
                                        primary={item.label.toLocaleUpperCase()}
                                        slotProps={{
                                            root: {
                                                sx: {
                                                    color: theme.palette.primary.main,
                                                    "&:hover": {
                                                        color: theme.palette.primary.dark,
                                                    },
                                                },
                                            },
                                        }}
                                    />
                                </MenuItem>
                            ))}
                        </Menu>
                        <LanguageSwitch />
                    </>
                )}
            </Box>
        </header>
    );
};