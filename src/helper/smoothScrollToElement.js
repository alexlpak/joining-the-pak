export const smoothScrollToElement = (selector) => {
    const element = document.querySelector(selector).getBoundingClientRect().top;
    window.scrollTo({ behavior: 'smooth', top: element });
};

export const smoothScrollToTop = () => window.scrollTo({ behavior: 'smooth', top: 0 });