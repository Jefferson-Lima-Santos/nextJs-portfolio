"use client";
import Image from "next/image";
import Link from "next/link";
import useMediaQuery from "@mui/material/useMediaQuery";
import { Box, useTheme } from "@mui/material";

const NAV_ITENS = [
    {
        label: "Home",
        href: "/"
    },
    {
        label: "Projetos",
        href: "/projetos"
    },
    {
        label: "Atividades",
        href: "/atividades"
    }
]

export const Header = () => {

    const theme = useTheme();
    const smUP = useMediaQuery(theme.breakpoints.up('sm'));
    return (
        <header>
            <Box 
                sx={{
                    display: "flex",
                    padding: "1rem",
                }}
            >
                <Link href="/">
                    <Image 
                        src="/images/JS-Logo.jpg" 
                        alt="logo JS" 
                        width={58} 
                        height={49} 
                    />
                </Link>
                <nav
                    style={{
                        display: "flex",
                        gap: smUP ? "4rem" : "2rem",
                        marginLeft: "auto",
                    }}
                >
                </nav>
            </Box>
        </header>
    )
}