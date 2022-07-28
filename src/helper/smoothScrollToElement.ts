export const smoothScrollToElement = (selector: string) => {
    const element = document.querySelector(selector);
    if (!element) return;
    if (element) {
        const elementTop = element.getBoundingClientRect().top;
        window.scrollTo({ behavior: 'smooth', top: elementTop });
    };
};

export const smoothScrollToTop = () => window.scrollTo({ behavior: 'smooth', top: 0 });