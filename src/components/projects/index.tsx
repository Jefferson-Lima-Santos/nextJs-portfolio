import React from 'react';
import { ProjectProps } from '../../types/projectType';

const Project: React.FC<ProjectProps> = ({ image, name, date, techsUsed, url }) => {
    return (
        <section id='projects'>
            {image}
            {name}
            {date}
            {techsUsed.map((tech, index) => (
                <div key={index}>
                    {tech}
                </div>
            ))}
            {url}
        </section>
    );
};

export default Project;