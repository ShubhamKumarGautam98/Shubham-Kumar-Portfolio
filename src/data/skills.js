import { FaReact, FaNodeJs, FaGitAlt, FaPython, FaJava } from 'react-icons/fa';
import {
    SiNextdotjs, SiTypescript, SiJavascript, SiMongodb,
    SiTailwindcss, SiStreamlit, SiOpenai, SiMysql,
    SiPostman, SiGithub, SiVite, SiSpringboot
} from 'react-icons/si';

export const skillCategories = [
    {
        title: 'AI & Automation',
        description: 'Building intelligent workflows and AI-powered systems',
        icon: '🤖',
        skills: [
            { name: 'n8n Automation', icon: SiOpenai, level: 93, color: '#EA4B71' },
            { name: 'OpenAI API', icon: SiOpenai, level: 91, color: '#10A37F' },
            { name: 'AI-Assisted Dev', icon: SiOpenai, level: 90, color: '#6366F1' },
            { name: 'Prompt Engineering', icon: SiOpenai, level: 85, color: '#8B5CF6' },
            { name: 'Workflow Design', icon: SiOpenai, level: 88, color: '#F59E0B' },
            { name: 'Process Automation', icon: SiOpenai, level: 87, color: '#10B981' },
        ],
    },
    {
        title: 'Frontend',
        description: 'High-performance, responsive web interfaces',
        icon: '🎨',
        skills: [
            { name: 'React.js', icon: FaReact, level: 88, color: '#61DAFB' },
            { name: 'Next.js', icon: SiNextdotjs, level: 80, color: '#FFFFFF' },
            { name: 'TypeScript', icon: SiTypescript, level: 79, color: '#3178C6' },
            { name: 'JavaScript', icon: SiJavascript, level: 83, color: '#F7DF1E' },
            { name: 'Tailwind CSS', icon: SiTailwindcss, level: 90, color: '#06B6D4' },
            { name: 'Vite', icon: SiVite, level: 85, color: '#646CFF' },
        ],
    },
    {
        title: 'Python & Backend',
        description: 'Automation, data processing, and APIs',
        icon: '⚙️',
        skills: [
            { name: 'Python', icon: FaPython, level: 86, color: '#3776AB' },
            { name: 'Streamlit', icon: SiStreamlit, level: 84, color: '#FF4B4B' },
            { name: 'Pandas', icon: FaPython, level: 85, color: '#150458' },
            { name: 'Java Spring Boot', icon: SiSpringboot, level: 72, color: '#6DB33F' },
            { name: 'REST APIs', icon: SiPostman, level: 85, color: '#FF6C37' },
            { name: 'MySQL / MongoDB', icon: SiMysql, level: 78, color: '#4479A1' },
        ],
    },
];
