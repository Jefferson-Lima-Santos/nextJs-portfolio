"use client";
import Image from "next/image";
import useMediaQuery from "@mui/material/useMediaQuery";
import { Box, Button, Chip, IconButton, Stack, Typography, useTheme } from "@mui/material";
import { ArrowForward, GitHub, LinkedIn, WhatsApp } from '@mui/icons-material';

import { tokens } from '@/src/locales/tokens';
import { useTranslation } from "react-i18next";
import { authorInfo } from "@/src/utils/author";
import Typewriter from "typewriter-effect";
import { motion } from 'framer-motion'

export const Author = () => {

    const { t } = useTranslation();
    const theme = useTheme();
    const lgUp = useMediaQuery(theme.breakpoints.up('lg'));
    const mdDown = useMediaQuery(theme.breakpoints.down('md'));
    return (
        <Box
            sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "1rem",
                width: "100%",
                flexDirection: lgUp ? "row" : "column-reverse",
            }}
        >
            <Box
                display={"flex"}
                flexDirection={"column"}
                sx={{
                    width: lgUp ? "50%" : "100%",
                }}
            >
                <motion.div
                    className="w-full lg:max-w-[530px]"
                    initial={{ opacity: 0, x: -100 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -100 }}
                    transition={{ duration: 0.5 }}
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
                            sx={{
                                flex: 1
                            }}
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
                                            cursor: "default",
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
                            sx={{
                                flex: 1
                            }}
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
                                            cursor: "default",
                                            "&:hover": {
                                                backgroundColor: theme.palette.primary.dark,
                                            },
                                        }}
                                    />
                                ))}
                            </Box>
                        </Stack>
                    </Stack>
                    <Stack
                        direction="row"
                        alignItems="center"
                        sx={{
                            flex: 1,
                            marginTop: "2rem !important",
                            marginLeft: "1rem !important",
                            gap: "1rem",
                        }}
                    >
                        <Button
                            variant="contained"
                            color="info"
                            sx={{
                                marginLeft: "1rem !important",
                                backgroundColor: theme.palette.primary.main,
                                "&:hover": {
                                    backgroundColor: theme.palette.primary.dark,
                                },
                            }}
                            href="/#contact"
                            target="_blank"
                            rel="noopener noreferrer"
                            endIcon={<ArrowForward />}
                            size="large"
                        >
                            {t(tokens.common.contactMe)}
                        </Button>
                        <IconButton
                            href={authorInfo.linkedin}
                            target="_blank"
                            rel="noopener noreferrer"
                            sx={{
                                marginLeft: "1rem",
                                color: theme.palette.primary.main,
                                "&:hover": {
                                    color: theme.palette.primary.dark,
                                },
                            }}
                        >
                            <LinkedIn />
                        </IconButton>
                        <IconButton
                            href={authorInfo.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            sx={{
                                marginLeft: "1rem",
                                color: theme.palette.primary.main,
                                "&:hover": {
                                    color: theme.palette.primary.dark,
                                },
                            }}
                        >
                            <GitHub />
                        </IconButton>
                        <IconButton
                            href={`https://api.whatsapp.com/send?phone=55${authorInfo.whatsapp}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            sx={{
                                marginLeft: "1rem",
                                color: theme.palette.primary.main,
                                "&:hover": {
                                    color: theme.palette.primary.dark,
                                },
                            }}
                        >
                            <WhatsApp />
                        </IconButton>
                    </Stack>
                </motion.div>
            </Box>
            <Stack
                direction="row"
                spacing={2}
                sx={{
                    padding: "1rem",
                    alignItems: "center",
                    justifyContent: "center",
                    flexDirection: lgUp ? "row" : "column",
                    width: lgUp ? "35%" : "100%",
                }}
            >
                <motion.div
                    className="w-full lg:max-w-[530px]"
                    initial={{ opacity: 0, x: +100 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: +100 }}
                    transition={{ duration: 0.5 }}
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
                </motion.div>
            </Stack>
        </Box>
    )
}


export default Author;