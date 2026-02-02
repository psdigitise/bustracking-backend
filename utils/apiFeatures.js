class APIFeatures {
    constructor(query, queryStr) {
        this.query = query;
        this.queryStr = queryStr;
    }

   
    filter() {
        const queryStrCopy = { ...this.queryStr };
        let queryStr = JSON.stringify(queryStrCopy)
        this.query.find(JSON.parse(queryStr))
        return this;
    }
    

}
module.exports = APIFeatures