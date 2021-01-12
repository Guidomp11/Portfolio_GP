const db = require('../database/models');

async function askCategories(){
    let categories = await db.Category.findAll({
        include: [{association: 'sub_category'}]
    })
    if(categories){
        return categories;
    }else{
        return null;
    }
	
}

module.exports = askCategories;