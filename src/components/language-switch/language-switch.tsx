import type { FC } from 'react';
import { useTranslation } from 'react-i18next';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';

import { usePopover } from '@/src/hooks/use-popover';

import { LanguagePopover } from './language-popover';
import { tokens } from "@/src/locales/tokens";
import Image from 'next/image';

type Language = 'en' | 'ptBR';

const languages: Record<Language, string> = {
  en: '/assets/flags/flag-uk.svg',
  ptBR: '/assets/flags/flag-pt-br.svg'
};

export const LanguageSwitch: FC = () => {
  const { i18n, t } = useTranslation();
  const popover = usePopover<HTMLButtonElement>();

  const flag = languages[i18n.language as Language];

  return (
    <>
      <Tooltip title={t(tokens.layout.language)}>
        <IconButton
          onClick={popover.handleOpen}
          ref={popover.anchorRef}
        >
          <Box
            sx={{
              width: 28,
              '& img': {
                width: '100%'
              }
            }}
          >
            <Image
              src={flag}
              alt="language flag"
              width={28}
              height={20}
            />
          </Box>
        </IconButton>
      </Tooltip>
      <LanguagePopover
        anchorEl={popover.anchorRef.current}
        onClose={popover.handleClose}
        open={popover.open}
      />
    </>
  );
};
