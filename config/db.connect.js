const mongoose=require('mongoose')

function Connection(){
    mongoose.connect(process.env.MONGODB_URL)
    console.log('mongodb connected...')
}

module.exports=Connection