const Formations = require('../models/formationModel')


class APIfeatures {
    constructor(query, queryString){
        this.query = query;
        this.queryString = queryString;
    }

filtering(){
    const queryObj = {...this.queryString} //queryString = req.query


    const excludedFields = ['page', 'sort', 'limit']
    excludedFields.forEach(el => delete(queryObj[el]))
    let queryStr = JSON.stringify(queryObj)
    queryStr = queryStr.replace(/\b(gte|gt|lt|lte|regex)\b/g, match => '$' + match)

  //    gte = greater than or equal
    //    lte = lesser than or equal
    //    lt = lesser than
    //    gt = greater than
    this.query.find(JSON.parse(queryStr))
      
    return this;

}
sorting(){
    if(this.queryString.sort){
        const sortBy = this.queryString.sort.split(',').join(' ')
      
        this.query = this.query.sort(sortBy)
    }else{
        this.query = this.query.sort('-createdAt')
    }

    return this;
}
paginating(){
    const page = this.queryString.page * 1 || 1
    const limit = this.queryString.limit * 1 || 9
    const skip = (page - 1) * limit;
    this.query = this.query.skip(skip).limit(limit)
    return this;
}


}

const formationCtrl = {
    getformations: async(req, res) =>{
        try {
        
            const features = new APIfeatures(Formations.find(), req.query).filtering().sorting().paginating()
            const formations = await features.query
            res.json({
                status: 'success',
                result: formations .length,
                formations: formations })
            
            
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    }
    ,
    createFormation: async(req, res) =>{
        try {
            const {formation_id, title, price, description, nomFormateur, images, category} = req.body;
            if(!images) return res.status(400).json({msg: "No image upload"})

            const formation = await Formations.findOne({formation_id})
            if(formation)
                return res.status(400).json({msg: "This formation already exists."})

            const newFormation = new Formations({
                formation_id, title: title.toLowerCase(), price, description, nomFormateur, images, category
            })

            await  newFormation.save()
            res.json({msg: "Created a formation"})

        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    
    deleteFormation: async(req, res) =>{
        try {
            await Formations.findByIdAndDelete(req.params.id)
            res.json({msg: "Deleted a formation"})
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    updateFormation: async(req, res) =>{
        try {
            const {title, description, price, nomFormateur, images, category} = req.body;
            if(!images) return res.status(400).json({msg: "No image upload"})

            await Formations.findOneAndUpdate({_id: req.params.id}, {
                title: title.toLowerCase(), description, price, nomFormateur, images, category
            })

            res.json({msg: "Updated a formation"})
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    }





}

module.exports = formationCtrl