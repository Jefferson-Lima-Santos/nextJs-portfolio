import { Typography, useTheme } from "@mui/material";
import Link from "next/link";
import {tokens} from "@/src/locales/tokens";
import { useTranslation } from "react-i18next";

type NavItemProps = {
    label: "home" | "carrer" | "projects" | "activities" | "contact";
    href: string;
}

export const NavItem = ({label, href}: NavItemProps) => {
    const theme = useTheme();
    const { t } = useTranslation();
    return (
        <Link 
            href={href}
            style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
            }}
        >
            <Typography
                variant="h6"
                sx={{
                    color: "gray",
                    textDecoration: "none",
                    marginX: 1,
                    "& span": {
                        color: "#2DCC70",
                    },
                    "&:hover": {
                        color: theme.palette.primary.main,
                    },
                }}
            >
                <span># </span>
                {t(tokens.layout.topNav[label])}
            </Typography>
        </Link>
    )
}