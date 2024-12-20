import mongoose from "mongoose"

export class Apifeature {
    constructor(mongooseQuery, searchQuery) {
        this.mongooseQuery = mongooseQuery,
            this.searchQuery = searchQuery
    }

    pagination(pageSize = 7) {
        let page = +this.searchQuery?.page || 1
        if (page < 1) page = 1
        this.mongooseQuery = this.mongooseQuery.skip((page - 1) * pageSize).limit(pageSize)
        return this
    }

    filter() {
        let filterObj = { ...this.searchQuery }

        let excludedFields = ['sort', 'page', 'flieds', 'keyword', 'category' ,'brand']
        excludedFields.forEach(val => delete filterObj[val])

        filterObj = JSON.stringify(filterObj)
        filterObj = filterObj.replace(/(gte|gt|lt|lte)/, match => '$' + match)

        filterObj = JSON.parse(filterObj)
        this.mongooseQuery.find(filterObj)
        return this
    }

    sort() {
        if (this.searchQuery.sort) {
            let sortBy = this.searchQuery.sort.split(',').join(' ')
            this.mongooseQuery.sort(sortBy)
        }
        return this
    }

    search() {
        if (this.searchQuery.keyword) {
            this.mongooseQuery.find({
                $or: [
                    { title: { $regex: this.searchQuery.keyword, $options: "si" } },
                    { name: { $regex: this.searchQuery.keyword, $options: "si" } },
                    { description: { $regex: this.searchQuery.keyword, $options: "si" } }
                ]
            })
        }
        return this
    }

    categoryFilter(){
        if(this.searchQuery.category){
            let categortId = new mongoose.Types.ObjectId(this.searchQuery.category)
            this.mongooseQuery = this.mongooseQuery.find({ category: categortId})
        }
        return this
    }

    brandFilter(){
        if(this.searchQuery.brand){
            let brandId = new mongoose.Types.ObjectId(this.searchQuery.brand)
            this.mongooseQuery = this.mongooseQuery.find({ brand: brandId})
        }
        return this
    }

}