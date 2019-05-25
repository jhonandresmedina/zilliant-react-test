const getCurrentDate = () => {
    return process.env.NODE_ENV === 'test' ? new Date(2019, 12, 7) : new Date();
};

export { getCurrentDate };
