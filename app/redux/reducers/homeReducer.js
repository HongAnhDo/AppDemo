const initData = {
    refreshArticles: false,
};


const homeReducer = (state = initData, { type, payload }) => {
    switch (type) {
        case 'REFRESH_ARTICLES':
            console.log("NNNNNNNNNNNN")
            return {
                refreshArticles: true
            };
        case 'STOP_REFRESH_ARTICLES':
            console.log("aaaaaaaaaa")
            return {
                refreshArticles: false
            };

        default:
            return state;
    }
}
export default homeReducer;