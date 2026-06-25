import StyledComponentsRegistry from '@/lib/registry';
import { ThemeProvider } from '@/context/ThemeContext';
import { LanguageProvider } from '@/context/LanguageContext';
import GlobalStyles from '@/styles/GlobalStyles';

export const metadata = {
    title: 'Shubham Kumar — AI Automation Developer',
    description: 'Portfolio of Shubham Kumar, an AI Automation Developer specializing in n8n workflows, OpenAI API integration, React.js, and Python automation. Building intelligent systems that scale businesses.',
    keywords: ['AI automation', 'n8n developer', 'OpenAI API', 'React developer', 'Python automation', 'Streamlit', 'Shubham Kumar', 'remote developer India'],
    authors: [{ name: 'Shubham Kumar' }],
    openGraph: {
        title: 'Shubham Kumar — AI Automation Developer',
        description: 'AI Automation Developer specializing in n8n, OpenAI API & React.js.',
        type: 'website',
    },
};

export default function RootLayout({ children }) {
    return (
        <html lang="en" dir="ltr">
            <head>
                <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
                <link rel="dns-prefetch" href="https://fonts.gstatic.com" />
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
                <link
                    rel="stylesheet"
                    href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Space+Grotesk:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap"
                />
            </head>
            <body>
                <StyledComponentsRegistry>
                    <ThemeProvider>
                        <LanguageProvider>
                            <GlobalStyles />
                            {children}
                        </LanguageProvider>
                    </ThemeProvider>
                </StyledComponentsRegistry>
            </body>
        </html>
    );
}
