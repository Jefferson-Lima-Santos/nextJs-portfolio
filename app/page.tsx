'use client';

import { useTranslation } from 'react-i18next';
import styles from './page.module.css';
import Author from '../src/components/author';
import { WorkExperience } from '@/src/components/work-experience';
import Contact from '@/src/components/contact';
import Project from '@/src/components/projects';
import experiences from '@/src/data/experiences.json';
import { WorkExperienceItem } from '@/src/types/workExperienceItemType';
import { FaReact } from 'react-icons/fa';
import { AiOutlineDotNet, AiOutlineConsoleSql } from 'react-icons/ai';
import { SiTypescript, SiGraphql, SiI18Next, SiMui, SiRedux } from 'react-icons/si';
import { RiNextjsLine } from 'react-icons/ri';
import { TbBrandFramerMotion, TbBrandCSharp, TbSql } from 'react-icons/tb';
import { DiDotnet } from 'react-icons/di';

const projects = [
  {
    name: 'Portfolio',
    image: 'https://i.ibb.co/nMn8sDcb/Portfolio.png',
    languagesUsed: [
      {
        name: 'JavaScript',
        icon: <FaReact />
      },
      {
        name: 'TypeScript',
        icon: <SiTypescript />
      }
    ],
    frameworksUsed: [
      {
        name: 'Next.js',
        icon: <RiNextjsLine />
      }
    ],
    techsUsed: [
      {
        name: 'React',
        icon: <FaReact />
      },
      {
        name: 'Node.js',
        icon: <RiNextjsLine />
      },
      {
        name: 'GraphQL -> ApolloClient',
        icon: <SiGraphql />
      },
      {
        name: 'Internationalization -> i18next',
        icon: <SiI18Next />
      },
      {
        name: 'Jotai',
        icon: <SiRedux />
      },
      {
        name: 'MUI',
        icon: <SiMui />
      },
      {
        name: 'Framer Motion',
        icon: <TbBrandFramerMotion />
      }
    ],
    gitHubUrl: 'https://github.com/Jefferson-Lima-Santos/nextJs-portfolio'
  },
  {
    name: '.NET API - For portfolio',
    image: 'https://i.ibb.co/NhFPxQ6/projectdotnetdarkimage.png',
    languagesUsed: [
      {
        name: 'C#',
        icon: <TbBrandCSharp />
      },
      {
        name: 'SQL',
        icon: <TbSql />
      }
    ],
    frameworksUsed: [
      {
        name: '.NET',
        icon: <AiOutlineDotNet />
      }
    ],
    techsUsed: [
      {
        name: 'Entity Framework',
        icon: <DiDotnet />
      },
      {
        name: 'SQL Server',
        icon: <AiOutlineConsoleSql />
      }
    ],
    gitHubUrl: 'https://github.com/Jefferson-Lima-Santos/portfolio-dotnet-api'
  }
];

type SupportedLanguage = keyof typeof experiences;

const getExperiencesByLanguage = (language: string): WorkExperienceItem[] => {
  if (language === 'en') {
    return experiences.en as WorkExperienceItem[];
  }

  return experiences.ptBR as WorkExperienceItem[];
};

export default function Home() {
  const { i18n } = useTranslation();
  const localizedExperiences = getExperiencesByLanguage(i18n.language as SupportedLanguage);

  return (
    <div className={styles.page}>
      <Author />
      <WorkExperience experiences={localizedExperiences} />
      <Project projects={projects} />
      <Contact />
    </div>
  );
}
