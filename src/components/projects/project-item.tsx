'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { fadeUpAnimation, techBadgeAnimation } from '@/src/utils/animations'
import { Box, Chip, Stack, Typography, useTheme, useMediaQuery, Theme } from '@mui/material'
import { ProjectItemType } from '@/src/types/projectType'


export const ProjectItem = (project: ProjectItemType) => {
    const {
        name,
        gitHubUrl,
        image,
        frameworksUsed,
        languagesUsed,
        techsUsed
    } = project;

    const theme = useTheme();
    const smUp = useMediaQuery((theme: Theme) => theme.breakpoints.down('sm'));

    const allTechs = [...frameworksUsed, ...languagesUsed, ...techsUsed]

    return (
        <motion.div
            {...fadeUpAnimation}
            transition={{ duration: 0.5 }}
            whileHover={{
                scale: 1.05,
                transition: { duration: 0.3 },
                cursor: 'pointer',
            }}
            style={{
                width: smUp ? '90%' : '500px',
                margin: smUp ? '0 auto' : '0 1rem 1rem 0',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
            }}
            onClick={() => window.open(gitHubUrl, '_blank')}
        >
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: smUp ? '90% !important' : '500px',
                    height: 'auto',
                    maxHeight: smUp ? '280px' : '500px',
                    overflow: 'hidden',
                    borderRadius: smUp ? 2 : 4,
                    backgroundColor: theme.palette.background.paper,
                }}
            >
                <Image
                    src={image}
                    alt={name}
                    width={smUp ? 300 : 500}
                    height={smUp ? 180 : 280}
                    style={{
                        width: '100%',
                        minHeight: '190px',
                        objectFit: 'cover',
                    }}
                />
                <Stack
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                    spacing={1}
                    sx={{
                        padding: '1rem',
                        width: '100%',
                        flexWrap: 'wrap',
                        backgroundColor: theme.palette.background.default,
                    }}
                >
                    <Typography
                        variant="h6"
                        sx={{
                            fontWeight: 700,
                            color: theme.palette.text.primary,
                            marginTop: '1rem',
                        }}
                    >
                        {name}
                    </Typography>
                    <Stack
                        direction="row"
                        justifyContent="flex-end"
                        alignItems="center"
                        spacing={1}
                        sx={{
                            flexWrap: 'wrap',
                            marginTop: '1rem',
                            position: 'relative',
                        }}
                    >
                        {allTechs.slice(0, 3).map((tech, index) => {
                            index = allTechs.length > 3 ? index + 1 : index
                            return (
                                <motion.div
                                    key={index}
                                    {...techBadgeAnimation}
                                    transition={{ duration: 0.5, delay: index * 0.1 }}
                                    style={{
                                        position: 'absolute',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        backgroundColor: theme.palette.background.default,
                                        border: `2px solid ${theme.palette.primary.main}`,
                                        borderRadius: '50%',
                                        width: '34px',
                                        height: '34px',
                                        display: 'flex',
                                        color: theme.palette.text.primary,
                                        zIndex: 3 - index,
                                        right: `${index * 20}px`,
                                    }}
                                    whileHover={{
                                        scale: 1.2,
                                        backgroundColor: theme.palette.primary.main,
                                        color: theme.palette.background.default,
                                        zIndex: 5,
                                        transition: { duration: 0.3 },
                                    }}
                                >
                                    {tech.icon}
                                </motion.div>
                        )})}
                        {allTechs.length > 3 && (
                            <Chip
                                label={`+${allTechs.length - 3}`}
                                variant="outlined"
                                size="small"
                                sx={{
                                    backgroundColor: theme.palette.background.default,
                                    color: theme.palette.text.primary,
                                    border: `2px solid ${theme.palette.primary.main}`,
                                    position: 'absolute',
                                    maxWidth: 'none',
                                    right: '0px',
                                    zIndex: 4,
                                    width: '34px',
                                    height: '34px',
                                    display: 'flex',
                                }}
                            />
                        )}
                    </Stack>
                </Stack>
            </Box>
        </motion.div>
    )
}