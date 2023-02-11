import mongoose from 'mongoose'

export const ConnectMongoDB = async () => {
  try {
    mongoose.set("strictQuery", false)
    
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })

    global.DBConnect = true
  }
  catch (err) {
    global.DBConnect = false
  }
}