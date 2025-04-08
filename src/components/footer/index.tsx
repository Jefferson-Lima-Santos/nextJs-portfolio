"use client";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { GitHub, LinkedIn } from "@mui/icons-material";
import { authorInfo } from "@/src/utils/author";

const Footer = () => {
    const theme = useTheme();

    return (
        <Box
            component="footer"
            sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "1rem",
                borderTop: `1px solid ${theme.palette.divider}`,
            }}
        >
            <Typography
                variant="body2"
                sx={{
                    fontWeight: 400,
                    color: theme.palette.text.secondary,
                }}
            >
                {`${new Date().getFullYear()} © Jefferson Santos `}
            </Typography>
            <Box>
                <IconButton
                    href={authorInfo.linkedin}
                    target="_blank"
                    aria-label="LinkedIn"
                    rel="noopener noreferrer"
                    sx={{
                        color: theme.palette.text.secondary,
                        "&:hover": {
                            color: theme.palette.primary.main,
                        },
                    }}
                >
                    <LinkedIn />
                </IconButton>
                <IconButton
                    href={authorInfo.github}
                    target="_blank"
                    aria-label="GitHub"
                    rel="noopener noreferrer"
                    sx={{
                        color: theme.palette.text.secondary,
                        "&:hover": {
                            color: theme.palette.primary.main,
                        },
                    }}
                >
                    <GitHub />
                </IconButton>
            </Box>
        </Box>
    );
};

export default Footer;
