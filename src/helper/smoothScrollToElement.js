export const smoothScrollToElement = (selector) => {
    const element = document.querySelector(selector)
    const elementTop = element.getBoundingClientRect().top;
    window.scrollTo({ behavior: 'smooth', top: elementTop });
};

export const smoothScrollToTop = () => window.scrollTo({ behavior: 'smooth', top: 0 });