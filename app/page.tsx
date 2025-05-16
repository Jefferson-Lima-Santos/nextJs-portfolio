import styles from "./page.module.css";
import Author from "../src/components/author";
import { WorkExperience } from "@/src/components/work-experience";
import Contact from "@/src/components/contact";
import Project from "@/src/components/projects";
import { FaReact } from "react-icons/fa";
import { AiOutlineDotNet } from "react-icons/ai";
import { SiTypescript, SiGraphql, SiI18Next, SiMui, SiRedux  } from "react-icons/si";
import { RiNextjsLine } from "react-icons/ri";
import { TbBrandFramerMotion, TbBrandCSharp } from "react-icons/tb";
import { AiOutlineConsoleSql } from "react-icons/ai";
import { TbSql } from "react-icons/tb";
import { DiDotnet } from "react-icons/di";

const experiences = [
  {
    companyLogo: {
      url: "https://media.licdn.com/dms/image/v2/C4D0BAQHqRN_t2Qx64w/company-logo_200_200/company-logo_200_200/0/1639058991800/gruposeb_logo?e=1749081600&v=beta&t=ngbxNmXpq0M1PsmGp2m_0BPtuoqJaM25_gcrsqQsR1g",
      alt: "Grupo SEB Logo",
    },
    companyName: "Grupo SEB",
    companyUrl: "https://www.linkedin.com/company/gruposeb",
    startDate: "2024-02-01",
    endDate: "",
    role: "Desenvolvedor Web",
    description: `Atuo como Desenvolvedor Web no time de Operações do Grupo SEB, focado na manutenção e evolução do principal produto da empresa. Trabalho com tecnologias como Next.js, React, TypeScript e GraphQL, com foco em performance e experiência do usuário. Também realizo tarefas no Back-End com .NET (C#), entregando soluções completas e colaborando com eficiência.`,
    technologies: ["Next.js", "React", "TypeScript", "GraphQL", ".NET", "C#"],
  },
  {
    companyLogo: {
      url: "https://media.licdn.com/dms/image/v2/C4D0BAQHqRN_t2Qx64w/company-logo_200_200/company-logo_200_200/0/1639058991800/gruposeb_logo?e=1749081600&v=beta&t=ngbxNmXpq0M1PsmGp2m_0BPtuoqJaM25_gcrsqQsR1g",
      alt: "Grupo SEB Logo",
    },
    companyName: "Grupo SEB",
    companyUrl: "https://www.linkedin.com/company/gruposeb",
    startDate: "2022-03-01",
    endDate: "2024-02-01",
    role: "Estagiário de Tecnologia",
    description: `Resolvia chamados técnicos e criava soluções para facilitar integrações, como uma aplicação para manipulação de objetos JSON. Posteriormente, transitei para o time de desenvolvimento, focando em interfaces e melhorias na experiência do usuário, além de participar de demandas de back-end.`,
    technologies: ["React", "TypeScript", "Node.js"],
  },
  {
    companyLogo: {
      url: "https://media.licdn.com/dms/image/v2/D4D0BAQHPlQ_FhpCMhQ/company-logo_200_200/company-logo_200_200/0/1727963557724/safe_ti_logo?e=1749686400&v=beta&t=aB_GWfyqreJqEGAoFpAQMySC700j4njbE-Xj7LtVdxI",
      alt: "SAFE-TI Logo",
    },
    companyName: "SAFE-TI",
    companyUrl: "https://www.linkedin.com/company/safe-ti/",
    startDate: "2021-09-01",
    endDate: "2022-04-01",
    role: "Estagiário em TI",
    description: `Resolvia problemas de redes, instalava equipamentos e realizava manutenção e gerenciamento de servidores Windows.`,
    technologies: ["Redes", "Windows Server"],
  },
];

const projects = [
  {
    name: "Portfolio",
    image: "https://i.ibb.co/nMn8sDcb/Portfolio.png",
    languagesUsed: [
      {
        name: "JavaScript",
        icon: <FaReact />
      }, 
      {
        name: "TypeScript",
        icon: <SiTypescript />
      }
    ],
    frameworksUsed: [
      {
        name: "Next.js",
        icon: <RiNextjsLine />
      }
    ],
    techsUsed: [
      {
        name: "React",
        icon: <FaReact />
      },
      {
        name: "Node.js",
        icon: <RiNextjsLine />
      },
      {
        name: "GraphQL -> ApolloClient",
        icon: <SiGraphql />
      },
      {
        name: "Internationalization -> i18next",
        icon: <SiI18Next />
      },
      {
        name: "Jotai",
        icon: <SiRedux />
      },
      {
        name: "MUI",
        icon: <SiMui />
      },
      {
        name: "Framer Motion",
        icon: <TbBrandFramerMotion />
      }
    ],
    gitHubUrl: "https://github.com/Jefferson-Lima-Santos/nextJs-portfolio"
  },
  {
    name: ".NET API - For portfolio",
    image: "https://i.ibb.co/Q322pZmV/dotnetprotecjimage.png",
    languagesUsed: [
      {
        name: "C#",
        icon: <TbBrandCSharp />
      },
      {
        name: "SQL",
        icon: <TbSql />
      }
    ],
    frameworksUsed: [
      {
        name: ".NET",
        icon: <AiOutlineDotNet />
      }
    ],
    techsUsed: [
      {
        name: "Entity Framework",
        icon: <DiDotnet />
      },
      {
        name: "SQL Server",
        icon: <AiOutlineConsoleSql />
      },
    ],
    gitHubUrl: "https://github.com/Jefferson-Lima-Santos/portfolio-dotnet-api"
  }
]

export default function Home() {
  return (
    <div className={styles.page}>
      <Author />
      <WorkExperience
        experiences={experiences}
      />
      <Project
        projects={projects}
      />
      <Contact />
    </div>
  );
}
