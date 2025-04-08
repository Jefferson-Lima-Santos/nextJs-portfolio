"use client";
import { tokens } from "@/src/locales/tokens";
import { SectionTitle } from "@/src/components/section-title";
import { Box, Stack, Typography, useMediaQuery, useTheme } from "@mui/material";
import { useTranslation } from "react-i18next";
import { ExperienceItem } from "./work-experience-item";
import { motion } from 'framer-motion'
import { WorkExperienceItem } from "@/src/types/workExperienceItemType";

interface WorkExperienceProps {
    experiences: WorkExperienceItem[];
}

export const WorkExperience = ({ experiences }: WorkExperienceProps) => {
    const theme = useTheme();
    const { t } = useTranslation();
    const mdDown = useMediaQuery(theme.breakpoints.down('md'));
    return (
        <section id="work-experience" className="section">
            <Box
                sx={{
                    display: "flex",
                    alignItems: "flex-start",
                    justifyContent: "space-between",
                    padding: mdDown ? "none" : "1rem",
                    width: "100%",
                    flexDirection: mdDown ? "column" : "row",
                }}
            >
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        padding: "1rem",
                        width: "100%",
                        marginBottom: 2,
                    }}
                >
                    <Stack
                        direction="row"
                        justifyContent="space-between"
                        alignItems="center"
                        spacing={2}
                        sx={{
                            padding: "1rem",
                            alignItems: "start",
                            justifyContent: "center",
                            flexDirection: "column",
                            display: "flex",
                        }}
                    >
                        <SectionTitle
                            title={t(tokens.sections.workSectionTitle)}
                            subtitle={t(tokens.sections.workSectionSubtitle)}
                        />
                        <motion.div
                            initial= {{ opacity: 0, x: -100 }}
                            whileInView= {{ opacity: 1, x: 0 }}
                            exit= {{ opacity: 0, x: -100 }}
                            transition={{ duration: 1 }}
                        >
                            <Typography
                                variant="h6"
                                sx={{
                                    maxWidth: "420px",
                                    color: theme.palette.grey[600],
                                    marginBottom: 1,
                                }}
                            >
                                {t(tokens.common.workSectionDescription)}
                            </Typography>
                        </motion.div>
                    </Stack>
                </Box>
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        gap: 2,
                        marginBottom: 2,
                        marginLeft: "1rem !important",
                        maxWidth: "780px",
                    }}
                >
                    {experiences.map((experience, index) => (
                        <Box
                            key={index}
                            sx={{
                                paddingLeft: "1rem",
                                paddingRight: "1rem",
                            }}
                        >
                            <ExperienceItem
                                experience={experience}
                            />
                        </Box>
                    ))}
                </Box>
            </Box>
        </section>
    )
}