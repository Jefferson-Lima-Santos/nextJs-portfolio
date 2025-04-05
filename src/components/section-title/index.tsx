'use client'
import { Box } from '@mui/material'
import { motion } from 'framer-motion'

type SectionTitleProps = {
  subtitle: string
  title: string
}

export const SectionTitle = ({
  subtitle,
  title,
}: SectionTitleProps) => {
  const animProps = {
    initial: { opacity: 0, x: -100 },
    whileInView: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -100 },
  }

  return (
    <Box
        sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
            marginBottom: '2rem !important',
            marginLeft: '1rem !important',
        }}
    >
      <motion.span
        style={{
            fontFamily: 'monospace',
            fontSize: '0.875rem',
            color: '#4ade80',
        }}
        {...animProps}
        transition={{ duration: 0.5 }}
      >{`../${subtitle}`}</motion.span>
      <motion.h3
        style={{
            fontSize: '2rem',
            fontWeight: 500,
            color: '#fff',
        }}
        {...animProps}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        {title}
      </motion.h3>
    </Box>
  )
}