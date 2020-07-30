const initData = {
    refreshArticles: false,
};


const homeReducer = (state = initData, { type, payload }) => {
    switch (type) {
        case 'REFRESH_ARTICLES':
            console.log("REFRESH_ARTICLES")
            return {
                refreshArticles: true
            };
        case 'STOP_REFRESH_ARTICLES':
            console.log("STOP_REFRESH_ARTICLES")
            return {
                refreshArticles: false
            };

        default:
            return state;
    }
}
export default homeReducer;