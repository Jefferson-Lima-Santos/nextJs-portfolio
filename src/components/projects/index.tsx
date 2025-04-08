"use client";

import React, { ReactElement } from 'react';
import { Autocomplete, Box, Grid2, InputAdornment, Stack, TextField, useMediaQuery, useTheme } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { SectionTitle } from '../section-title';
import { tokens } from '@/src/locales/tokens';
import { SearchOutlined, CodeOff, Memory, Monitor } from '@mui/icons-material';
import { ProjectItemType } from '../../types/projectType';
import { ProjectItem } from './project-item';


export type ProjectProps = {
    projects: ProjectItemType[];
}

type SelectedFilterItem = {
    name: string;
    icon: ReactElement;
}

type SelectedFilters = {
    languages: SelectedFilterItem[];
    frameworks: SelectedFilterItem[];
    tech: SelectedFilterItem[];
    filterText: string;
}

export const Project: React.FC<ProjectProps> = ({ projects = [] }) => {
    const theme = useTheme();
    const { t } = useTranslation();
    const smDown = useMediaQuery(theme.breakpoints.down('sm'));
    const [selectedFilters, setSelectedFilters] = React.useState<SelectedFilters>({
        languages: [],
        frameworks: [],
        tech: [],
        filterText: "",
    });

    const languageOptions = projects
        .filter((tech, index, self) =>
            index === self.findIndex((t) => t.name === tech.name))
        .reduce((acc: SelectedFilterItem[], project) => {
        const languages = project.languagesUsed.map((language) => ({
            name: language.name,
            icon: language.icon,
        }))

        return [...acc, ...languages];
    }, []);

    const frameworkOptions = projects
        .filter((tech, index, self) =>
            index === self.findIndex((t) => t.name === tech.name))
        .reduce((acc: SelectedFilterItem[], project) => {
        const frameworks = project.frameworksUsed.map((framework) => ({
            name: framework.name,
            icon: framework.icon,
        })).filter((tech, index, self) =>
            index === self.findIndex((t) => t.name === tech.name));

        return [...acc, ...frameworks];
    }, []);

    const techOptions = projects
        .filter((tech, index, self) =>
            index === self.findIndex((t) => t.name === tech.name))
        .reduce((acc: SelectedFilterItem[], project) => {
        const techs = project.techsUsed.map((tech) => ({
            name: tech.name,
            icon: tech.icon,
        })).filter((tech, index, self) =>
            index === self.findIndex((t) => t.name === tech.name));
        
        return [...acc, ...techs];
    }, []);

    const filteredProjects = projects.filter((project) => {
        const languagesMatch = selectedFilters.languages.length === 0 || project.languagesUsed.some((language) => selectedFilters.languages.some((selected) => selected.name === language.name));
        const frameworksMatch = selectedFilters.frameworks.length === 0 || project.frameworksUsed.some((framework) => selectedFilters.frameworks.some((selected) => selected.name === framework.name));
        const techMatch = selectedFilters.tech.length === 0 || project.techsUsed.some((tech) => selectedFilters.tech.some((selected) => selected.name === tech.name));
        const filterTextMatch = project.name.toLowerCase().includes(selectedFilters.filterText.toLowerCase()) || project.languagesUsed.some((language) => language.name.toLowerCase().includes(selectedFilters.filterText.toLowerCase())) || project.frameworksUsed.some((framework) => framework.name.toLowerCase().includes(selectedFilters.filterText.toLowerCase())) || project.techsUsed.some((tech) => tech.name.toLowerCase().includes(selectedFilters.filterText.toLowerCase()));

        return languagesMatch && frameworksMatch && techMatch && filterTextMatch;
    });

    if (!projects.length)
        return
    return (
        <section id='projects'>
            <Box
                sx={{
                    display: "flex",
                    alignItems: "flex-start",
                    justifyContent: "space-between",
                    padding: "1rem",
                    width: "100%",
                    flexDirection: "column",
                }}
            >
                <SectionTitle
                    title={t(tokens.sections.projectsSectionTitle)}
                    subtitle={t(tokens.sections.projectsSectionSubtitle)}
                />
                <Grid2
                    container
                    spacing={2}
                    sx={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "center",
                        width: "100%",
                        marginBottom: 2,
                    }}
                >
                    {!smDown &&
                        <Grid2
                            size={{
                                xs: 12,
                                md: 9,
                            }}
                        >
                            <Stack
                                sx={{
                                    display: "flex",
                                    flexDirection: "row",
                                    gap: 2,
                                    width: "100%",
                                    marginBottom: 2,
                                }}
                            >
                                <Autocomplete
                                    multiple
                                    id="languages"
                                    fullWidth
                                    options={languageOptions.filter((option) => !selectedFilters.languages?.some((item) => item.name === option.name))}
                                    getOptionLabel={(option) => languageOptions?.find(u => u.name === option.name)?.name ?? ""}
                                    value={selectedFilters?.languages || []}
                                    renderOption={(props, option) => (
                                        <li 
                                            {...props} 
                                            key={option.name} 
                                            style={{gap: "0.5rem"}}
                                        >
                                            {option.icon}
                                            {option.name}
                                        </li>
                                    )}
                                    filterSelectedOptions
                                    onChange={(event, newValue) => setSelectedFilters((prev) => ({ ...prev, languages: newValue }))}
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            label={t(tokens.common.programLanguages)}
                                            placeholder={t(tokens.common.selectProgramLanguages).toString()}
                                            slotProps={{
                                                input: {
                                                    ...params.InputProps,
                                                    startAdornment: (
                                                        <>
                                                            <InputAdornment
                                                                position="start"
                                                                sx={{
                                                                    marginTop: '0 !important',
                                                                }}
                                                            >
                                                                <CodeOff />
                                                            </InputAdornment>
                                                            {params.InputProps.startAdornment}
                                                        </>
                                                    ),
                                                }
                                            }}
                                        />
                                    )}
                                />
                                <Autocomplete
                                    multiple
                                    id="frameworks"
                                    fullWidth
                                    options={frameworkOptions.filter((option) => !selectedFilters.frameworks?.some((item) => item.name === option.name))}
                                    getOptionLabel={(option) => frameworkOptions?.find(u => u.name === option.name)?.name ?? ""}
                                    value={selectedFilters?.frameworks || []}
                                    filterSelectedOptions
                                    onChange={(event, newValue) => setSelectedFilters((prev) => ({ ...prev, frameworks: newValue }))}
                                    renderOption={(props, option) => (
                                        <li 
                                            {...props} 
                                            key={option.name} 
                                            style={{gap: "0.5rem"}}
                                        >
                                            {option.icon}
                                            {option.name}
                                        </li>
                                    )}
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            label={t(tokens.common.frameworks)}
                                            placeholder={t(tokens.common.selectFrameworks).toString()}
                                            slotProps={{
                                                input: {
                                                    ...params.InputProps,
                                                    startAdornment: (
                                                        <>
                                                            <InputAdornment
                                                                position="start"
                                                                sx={{
                                                                    marginTop: '0 !important',
                                                                }}
                                                            >
                                                                <Memory />
                                                            </InputAdornment>
                                                            {params.InputProps.startAdornment}
                                                        </>
                                                    ),
                                                }
                                            }}
                                        />
                                    )}
                                />
                                <Autocomplete
                                    multiple
                                    id="languages"
                                    fullWidth
                                    options={techOptions.filter((option) => !selectedFilters.tech?.some((item) => item.name === option.name))}
                                    getOptionLabel={(option) => techOptions?.find(u => u.name === option.name)?.name ?? ""}
                                    value={selectedFilters?.tech || []}
                                    filterSelectedOptions
                                    onChange={(event, newValue) => setSelectedFilters((prev) => ({ ...prev, tech: newValue }))}
                                    renderOption={(props, option) => (
                                        <li 
                                            {...props} 
                                            key={option.name} 
                                            style={{gap: "0.5rem"}}
                                        >
                                            {option.icon}
                                            {option.name}
                                        </li>
                                    )}
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            label={t(tokens.common.tech)}
                                            placeholder={t(tokens.common.selectTech).toString()}
                                            slotProps={{
                                                input: {
                                                    ...params.InputProps,
                                                    startAdornment: (
                                                        <>
                                                            <InputAdornment
                                                                position="start"
                                                                sx={{
                                                                    marginTop: '0 !important',
                                                                }}
                                                            >
                                                                <Monitor />
                                                            </InputAdornment>
                                                            {params.InputProps.startAdornment}
                                                        </>
                                                    ),
                                                }
                                            }}
                                        />
                                    )}
                                />
                            </Stack>
                        </Grid2>
                    }
                    <Grid2
                        size={{
                            xs: 10,
                            sm: 8,
                            md: 3,
                        }}
                    >
                        <TextField
                            variant="outlined"
                            placeholder={t(tokens.common.searchPlaceHolder)}
                            sx={{
                                width: "100%",
                                marginBottom: 2,
                            }}
                            value={selectedFilters.filterText}
                            slotProps={{
                                input: {
                                    startAdornment: (
                                        <SearchOutlined />
                                    ),
                                }
                            }}
                            onChange={(e) => setSelectedFilters((prev) => ({ ...prev, filterText: e.target.value }))}
                        />
                    </Grid2>
                </Grid2>
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "row",
                        flexWrap: "wrap",
                        justifyContent: "center",
                        gap: 2,
                        width: "100%",
                        marginBottom: 2,
                        marginLeft: "1rem !important",
                    }}
                >
                    {filteredProjects?.length && filteredProjects.map((project, index) => (
                        <ProjectItem
                            key={index}
                            {...project}
                        />
                    ))}
                </Box>
            </Box>
        </section>
    );
};

export default Project;