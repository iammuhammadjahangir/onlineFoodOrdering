class ApiFeatures {
    constructor(query , querystr){
        this.query = query;
        this.querystr = querystr;
    }

    //For Products
    search()
    {
        const keyword = this.querystr.keyword ? {
            name:{
                $regex :this.querystr.keyword,
                $options:"i",
            },
        } : {};

        this.query = this.query.find({...keyword})
        return this;
    }


    //For Category
    filter(){
        const querycopy = {...this.querystr};

        const removeFields = ["keyword", "page", "limit"];

        //to remove extra field other than category
        removeFields.forEach((key)=>delete querycopy[key]);

        let querystr = JSON.stringify(querycopy);
        querystr= querystr.replace(/\b(gt|gte|lt|lte)\b/g, key =>`$${key}`);

        this.query = this.query.find(JSON.parse(querystr))

        return this;
    }

    pagination(productPerPage){
        const currentpage = Number(this.querystr.page) || 1;
        const skip = productPerPage * (currentpage-1)

        this.query = this.query.limit(productPerPage).skip(skip)

        return this
    }

}

module.exports = ApiFeatures