'use client'

import { differenceInMonths, differenceInYears, format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { fadeUpAnimation, techBadgeAnimation } from '@/src/utils/animations'
import { WorkExperienceItem } from '@/src/types/workExperienceItemType'
import { Box, Chip, Stack, Typography, useTheme } from '@mui/material'

type ExperienceItemProps = {
    experience: WorkExperienceItem
}

export const ExperienceItem = ({ experience }: ExperienceItemProps) => {
    const {
        endDate,
        companyName,
        companyLogo,
        companyUrl,
        description,
        role,
        technologies,
    } = experience

    const startDate = new Date(experience.startDate)

    const formattedStartDate = format(startDate, 'MMM yyyy', { locale: ptBR })
    const formattedEndDate = endDate
        ? format(new Date(endDate), 'MMM yyyy', { locale: ptBR })
        : 'O momento'

    const end = endDate ? new Date(endDate) : new Date()
    const theme = useTheme()
    const months = differenceInMonths(end, startDate)
    const years = differenceInYears(end, startDate)
    const monthsRemaining = months % 12

    const formattedDuration =
        years > 0
            ? `${years} ano${years > 1 ? 's' : ''}${monthsRemaining > 0
                ? ` e ${monthsRemaining} mes${monthsRemaining > 1 ? 'es' : ''}`
                : ''
            }`
            : `${months} mes${months > 1 ? 'es' : ''}`

    return (
        <motion.div
            style={{
                display: 'grid',
                gridTemplateColumns: '40px 1fr',
                gap: '1rem',
                marginBottom: '1rem',
                marginLeft: '1rem !important',
            }}
            {...fadeUpAnimation}
            transition={{ duration: 0.5 }}
        >
            <Stack
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    gap: 4,
                    flex: 1
                }}
            >
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        borderRadius: '50%',
                        border: `1px solid ${theme.palette.primary.main}`,
                        padding: '0.125rem',
                    }}
                >
                    <Image
                        src={companyLogo.url}
                        width={50}
                        height={50}
                        style={{
                            borderRadius: '50%',
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                        }}
                        alt={`Logo da empresa ${companyName}`}
                    />
                </Box>
                <Box
                    sx={{
                        height: '100%',
                        width: '2px',
                        backgroundColor: '#4ade80',
                    }}
                ></Box>
            </Stack>

            <Stack>
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 2,
                        marginBottom: 2,
                    }}
                >
                    <a
                        href={companyUrl}
                        target="_blank"
                        style={{
                            color: theme.palette.primary.main,
                            fontWeight: 'bold',
                            textDecoration: 'none',
                            transition: 'color 0.3s ease',
                        }}
                        rel="noreferrer"
                    >
                        @ {companyName}
                    </a>
                    <Typography
                        variant="h6"
                        sx={{
                            color: theme.palette.grey[400],
                            fontWeight: 500,
                            fontSize: '1.125rem',
                        }}
                    >
                        {role}
                    </Typography>
                    <Typography
                        variant="body1"
                        sx={{
                            color: theme.palette.grey[500],
                            fontSize: '0.875rem',
                        }}
                    >
                        {formattedStartDate} - {formattedEndDate} • {formattedDuration}
                    </Typography>
                    <Typography
                        variant="body1"
                        sx={{
                            color: theme.palette.grey[500],
                            fontSize: '0.875rem',
                        }}
                        dangerouslySetInnerHTML={{
                            __html: description,
                        }}
                    ></Typography>
                </Box>
                <Typography
                    variant="body1"
                    sx={{
                        color: theme.palette.grey[500],
                        fontSize: '0.875rem',
                    }}
                >
                    Tecnologias utilizadas
                </Typography>
                <Stack
                    sx={{
                        display: 'flex',
                        gap: 2,
                        flexDirection: 'row',
                        justifyContent: 'flex-start',
                        alignItems: 'center',
                        flexWrap: 'wrap',
                        marginBottom: 2,
                        marginTop: 1,
                        maxWidth: '350px',
                    }}
                >
                    {technologies && technologies.map((tech, i) => (
                        <motion.span
                            key={`experience-${companyName}-tech-${tech}`}
                            {...techBadgeAnimation}
                            transition={{ duration: 0.5, delay: i * 0.15 }}
                        >
                            <Chip
                                label={tech}
                                size="small"
                                variant="outlined"
                                sx={{
                                    color: theme.palette.primary.main,
                                    backgroundColor: theme.palette.background.paper,
                                    borderColor: theme.palette.primary.main,
                                    '&:hover': {
                                        cursor: 'default',
                                        backgroundColor: theme.palette.primary.main,
                                        color: '#fff',
                                    },
                                    marginRight: 1,
                                    marginBottom: 1,
                                }}
                            />
                        </motion.span>
                    ))}
                </Stack>
            </Stack>
        </motion.div>
    )
}