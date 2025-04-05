import styles from "./page.module.css";
import Author from "../src/components/author";
import { WorkExperience } from "@/src/components/work-experience";

const experiences = [
  {
    companyLogo: {
      url: "https://media.licdn.com/dms/image/v2/C4D0BAQHqRN_t2Qx64w/company-logo_200_200/company-logo_200_200/0/1639058991800/gruposeb_logo?e=1749081600&v=beta&t=ngbxNmXpq0M1PsmGp2m_0BPtuoqJaM25_gcrsqQsR1g",
      alt: "Company Logo",
    },
    companyName: "Company Name",
    companyUrl: "https://example.com",
    startDate: "2022-01-01",
    endDate: "2023-01-01",
    role: "Software Engineer",
    // Adicionar um texto bem grande, falando que mexi com CRM, ERP, etc.
    description: "Worked on various projects including CRM and ERP systems, focusing on full-stack development and team collaboration. Involved in the entire software development lifecycle, from requirements gathering to deployment and maintenance. Utilized Agile methodologies to ensure timely delivery of high-quality software solutions.",
    technologies: ["React", "Node.js", "TypeScript"]
  },
  {
    companyLogo: {
      url: "https://media.licdn.com/dms/image/v2/C4D0BAQHqRN_t2Qx64w/company-logo_200_200/company-logo_200_200/0/1639058991800/gruposeb_logo?e=1749081600&v=beta&t=ngbxNmXpq0M1PsmGp2m_0BPtuoqJaM25_gcrsqQsR1g",
      alt: "Company Logo",
    },
    companyName: "Company Name",
    companyUrl: "https://example.com",
    startDate: "2022-01-01",
    endDate: "2023-01-01",
    role: "Software Engineer",
    // Adicionar um texto bem grande, falando que mexi com CRM, ERP, etc.
    description: "Worked on various projects including CRM and ERP systems, focusing on full-stack development and team collaboration. Involved in the entire software development lifecycle, from requirements gathering to deployment and maintenance. Utilized Agile methodologies to ensure timely delivery of high-quality software solutions.",
    technologies: ["React", "Node.js", "TypeScript"]
  }
]

export default function Home() {
  return (
    <div className={styles.page}>
      <Author />
      <WorkExperience
        experiences={experiences}
      />
    </div>
  );
}
