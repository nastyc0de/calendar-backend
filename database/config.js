const {connect} = require('mongoose');

const dbConnection = async() =>{
    try {
        connect(
            process.env.DB_CONNECTION,{
                useNewUrlParser: true, 
                useUnifiedTopology: true,
                useCreateIndex: true
            }
        );
        console.log('DB conectada');

    } catch (error) {
        console.log(error);
        throw new Error('Error al momento de iniciar la BD');
    }
}
module.exports = {dbConnection}