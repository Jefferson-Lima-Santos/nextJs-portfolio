import type { FC } from 'react';
import { useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-hot-toast';
import { useTranslation } from 'react-i18next';
import Box from '@mui/material/Box';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MenuItem from '@mui/material/MenuItem';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';

import { tokens } from '@/src/locales/tokens';
import { useAtom } from 'jotai';
import { languageState } from '@/src/atoms/languageState';

type Language = 'en' | 'ptBR';

type LanguageOptions = {
  [key in Language]: {
    icon: string;
    label: string;
    uuid: string;
  };
}

const languageOptions: LanguageOptions = {
  en: {
    icon: '/assets/flags/flag-uk.svg',
    label: 'English',
    uuid: '71F5C12B-FCAF-49D4-B5EF-DA514FA63414'
  },
  ptBR: {
    icon: '/assets/flags/flag-pt-br.svg',
    label: 'Português (Brasil)',
    uuid: '77F13729-60F5-4E30-AFAE-CCCA4E087249'
  }
};

interface LanguagePopoverProps {
  anchorEl: null | Element;
  onClose?: () => void;
  open?: boolean;
}

export const LanguagePopover: FC<LanguagePopoverProps> = (props) => {
  const { anchorEl, onClose, open = false, ...other } = props;
  const { i18n, t } = useTranslation();
  const [language, setLanguage] = useAtom(languageState);

  const handleChange = useCallback(
    async (language: Language): Promise<void> => {
      onClose?.();
      await i18n.changeLanguage(language);
      if (languageOptions[language]) {
        console.log('setted language', language);
        console.log(languageOptions[language]);
        setLanguage({
          uuid: languageOptions[language]?.uuid,
          code: language,
          name: languageOptions[language]?.label,
        });
      }
      const message = t(tokens.common.languageChanged) as string;
      toast.success(message);
    },
    [onClose, i18n, t]
  );

  useEffect(() => {
    if (language && language.code !== i18n.language) {
      if (language.code === 'en' || language.code === 'ptBR') {
        handleChange(language.code as Language);
      } else {
        handleChange('ptBR');
      }
    }
    if (language) {
      document.documentElement.lang = String(language ?? '').replace('_', '-');
    }
  }, [language]);

  return (
    <Popover
      anchorEl={anchorEl}
      anchorOrigin={{
        horizontal: 'right',
        vertical: 'bottom'
      }}
      disableScrollLock
      transformOrigin={{
        horizontal: 'right',
        vertical: 'top'
      }}
      onClose={onClose}
      open={open}
      PaperProps={{ sx: { width: 220 } }}
      {...other}
    >
      {(Object.keys(languageOptions) as Language[]).map((language) => {
        const option = languageOptions[language];

        return (
          <MenuItem
            onClick={() => handleChange(language)}
            key={language}
          >
            <ListItemIcon>
              <Box
                sx={{
                  width: 28,
                  '& img': {
                    width: '100%'
                  }
                }}
              >
                <img
                  alt={option.label}
                  src={option.icon}
                />
              </Box>
            </ListItemIcon>
            <ListItemText
              primary={(
                <Typography variant="subtitle2">
                  {option.label}
                </Typography>
              )}
            />
          </MenuItem>
        );
      })}
    </Popover>
  );
};

LanguagePopover.propTypes = {
  anchorEl: PropTypes.any,
  onClose: PropTypes.func,
  open: PropTypes.bool
};
