/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                dark: '#0a0a0f',
                surface: '#12121a',
                border: '#1e1e2e',
                'text-primary': '#f0f0f5',
                'text-secondary': '#b0b0c0',
                'text-muted': '#6b6b80',
                accent: '#6c63ff',
                'accent-2': '#00d4aa',
                'accent-3': '#ff6b9d',
            },
            fontFamily: {
                sans: ['var(--font-geist-sans)', 'system-ui', 'sans-serif'],
                mono: ['var(--font-geist-mono)', 'monospace'],
            },
        },
    },
    plugins: [],
}
