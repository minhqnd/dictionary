import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const LANGUAGES = [
    { name: 'Tiếng Việt', flag: '' },
    { name: 'Tiếng Anh', flag: '' },
    { name: 'Tiếng Pháp', flag: '' },
    { name: 'Tiếng Trung', flag: '' },
    { name: 'Tiếng Nhật', flag: '' },
    { name: 'Tiếng Hàn', flag: '' },
    { name: 'Tiếng Đức', flag: '' },
    { name: 'các nước', flag: '' }
];

export default function DictionaryHeader() {
    const [index, setIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setIndex((prev) => (prev + 1) % LANGUAGES.length);
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    return (
        <header className="pt-12 pb-6 sm:pt-12 sm:pb-12 text-center select-none overflow-hidden">
            <div className="absolute top-4 right-8">
                <a
                    href="https://github.com/minhqnd/dictionary"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-gray-100 dark:bg-[#1a1a1a] text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors border border-gray-200 dark:border-gray-800 group"
                >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                    </svg>
                    <span className="text-sm font-medium hidden sm:inline">GitHub Repository</span>
                </a>
            </div>

            <motion.h1
                layout
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className="text-4xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-gray-900 dark:text-white mb-4 flex flex-wrap justify-center items-center gap-x-3 px-4"
            >
                <motion.span
                    layout
                    transition={{ duration: 0.5 }}
                    className="w-full sm:w-auto flex-shrink-0"
                >
                    API Từ Điển
                </motion.span>

                <div className="flex items-center gap-3">
                    <motion.span
                        layout
                        transition={{
                            layout: { duration: 0.6, ease: [0.4, 0, 0.2, 1] }
                        }}
                        className="relative inline-flex items-center text-blue-600 dark:text-blue-400 min-h-[1.2em] whitespace-nowrap flex-shrink-0 overflow-visible"
                    >
                        <AnimatePresence mode="popLayout" initial={false}>
                            <motion.span
                                key={index}
                                initial={{ y: 10, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                exit={{ y: -10, opacity: 0 }}
                                transition={{
                                    opacity: { duration: 0.4, ease: "easeInOut" },
                                    y: { duration: 0.4, ease: "easeInOut" }
                                }}
                                className="inline-flex items-center gap-2 whitespace-nowrap"
                            >
                                {LANGUAGES[index].name}
                                <span className="text-2xl sm:text-3xl md:text-4xl leading-none drop-shadow-sm">{LANGUAGES[index].flag}</span>
                            </motion.span>
                        </AnimatePresence>
                    </motion.span>

                    <motion.span
                        layout
                        transition={{
                            layout: { duration: 0.2, ease: "easeInOut" }
                        }}
                        className="flex-shrink-0"
                    >
                        Free
                    </motion.span>
                </div>
            </motion.h1>

            <p className="text-lg text-gray-500 dark:text-gray-400 mb-8 max-w-2xl mx-auto px-4">
                API tra cứu từ điển miễn phí với hơn 357,000 từ và 443,000 định nghĩa.
            </p>
        </header>
    );
}
