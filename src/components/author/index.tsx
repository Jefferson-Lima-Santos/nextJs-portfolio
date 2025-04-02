"use client";
import Image from "next/image";
import Link from "next/link";
import useMediaQuery from "@mui/material/useMediaQuery";
import { Box, Chip, Stack, Typography, useTheme } from "@mui/material";

import { tokens } from '@/src/locales/tokens';
import { useTranslation } from "react-i18next";
import { authorInfo } from "@/src/utils/author";
import Typewriter from "typewriter-effect";

export const Author = () => {

    const { t } = useTranslation();
    const theme = useTheme();
    const lgUp = useMediaQuery(theme.breakpoints.up('lg'));
    const mdDown = useMediaQuery(theme.breakpoints.down('md'));
    console.log('lgUp')
    console.log(lgUp)
    console.log('mdDown')
    console.log(mdDown)
    return (
        <Box
            sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: "1rem",
                width: "100%",
                flexDirection: lgUp ? "row" : "column",
            }}
        >
            <Box
                display={"flex"}
                flexDirection={"column"}
                sx={{
                    width: lgUp ? "50%" : "100%",
                }}
            >
                <Stack
                    direction="row"
                    spacing={2}
                    sx={{
                        padding: "1rem",
                        alignItems: "start",
                        justifyContent: "center",
                        flexDirection: "column",
                        display: "flex",
                    }}
                >
                    <Typography
                        variant="h6"
                        sx={{
                            fontSize: "1.5rem",
                            fontWeight: 400,
                            lineHeight: 2,
                            color: theme.palette.primary.main,
                            marginLeft: "1rem !important",
                        }}
                    >
                        {t(tokens.common.greeting) + ", " + t(tokens.common.mynameis)}
                    </Typography>
                    <Typography
                        variant="h4"
                        sx={{
                            fontSize: "2rem",
                            fontWeight: 700
                        }}
                    >
                        {authorInfo.name}
                    </Typography>
                    <Typography
                        variant="h4"
                        sx={{
                            fontSize: "2rem",
                            fontWeight: 700,
                            color: theme.palette.primary.main
                        }}
                    >
                        <Typewriter
                            options={{
                                strings: [t(tokens.common.webDeveloper), t(tokens.common.backendDeveloper), t(tokens.common.technologyEnthusiast)],
                                autoStart: true,
                                loop: true,
                                delay: 75,
                            }}
                            onInit={(typewriter) => {
                                typewriter.start();
                            }}
                        />
                    </Typography>
                    <Typography
                        variant="h6"
                        sx={{
                            fontSize: "1.5rem",
                            fontWeight: 100,
                            lineHeight: 1.5
                        }}
                        dangerouslySetInnerHTML={{ __html: t(tokens.author.description) }}
                    />
                </Stack>
                <Stack
                    direction={!lgUp ? mdDown ? "column" : "row" : "column"}
                    spacing={2}
                    sx={{
                        marginLeft: "1rem !important",
                    }}
                >
                    <Stack
                        direction="column"
                    >
                        <Typography
                            variant="h6"
                            sx={{
                                fontWeight: 400,
                                color: theme.palette.primary.main,
                                marginLeft: "1rem !important",
                            }}
                        >
                            {t(tokens.common.hardSkills)}
                        </Typography>
                        <Box
                            sx={{
                                marginTop: "0.5rem !important",
                                marginLeft: "1rem !important",
                            }}
                        >
                            {authorInfo?.hardSkills && authorInfo?.hardSkills.length && authorInfo.hardSkills.map((skill, index) => (
                                <Chip
                                    key={index}
                                    label={skill}
                                    sx={{
                                        margin: "0.5rem",
                                        backgroundColor: theme.palette.error.main,
                                        color: theme.palette.background.paper,
                                        fontWeight: 700,
                                        cursor: "pointer",
                                        "&:hover": {
                                            backgroundColor: theme.palette.error.dark,
                                        },
                                    }}
                                />
                            ))}
                        </Box>
                    </Stack>
                    <Stack
                        direction="column"
                    >
                        <Typography
                            variant="h6"
                            sx={{
                                fontWeight: 400,
                                color: theme.palette.primary.main,
                                marginLeft: "1rem !important",
                            }}
                        >
                            {t(tokens.common.softSkills)}
                        </Typography>
                        <Box
                            sx={{
                                marginTop: "0.5rem !important",
                                marginLeft: "1rem !important",
                            }}
                        >
                            {authorInfo?.softSkills && authorInfo?.softSkills.length && authorInfo.softSkills.map((skill, index) => (
                                <Chip
                                    key={index}
                                    label={t(tokens.common[skill as keyof typeof tokens.common])}
                                    sx={{
                                        margin: "0.5rem",
                                        backgroundColor: theme.palette.primary.main,
                                        color: theme.palette.background.paper,
                                        fontWeight: 700,
                                        cursor: "pointer",
                                        "&:hover": {
                                            backgroundColor: theme.palette.primary.dark,
                                        },
                                    }}
                                />
                            ))}
                        </Box>
                    </Stack>
                </Stack>
            </Box>
            <Stack
                direction="row"
                spacing={2}
                sx={{
                    padding: "1rem",
                    alignItems: "center",
                    justifyContent: "center",
                    flexDirection: lgUp ? "row" : "column",
                    width: lgUp ? "50%" : "100%",
                }}
            >
                <Image
                    src="/images/Author-Square.png"
                    alt="logo JS"
                    width={1024}
                    height={1024}
                    style={{
                        borderRadius: "1rem",
                        width: "80%",
                        height: "auto",
                        maxWidth: "100%",
                        maxHeight: "100%",
                    }}
                />
            </Stack>
        </Box>
    )
}


export default Author;