import app from './src/app.js'
import { PORT } from './src/config.js'
import { sequelize } from './src/database/database.js'


async function main (){
    try {
        await sequelize.sync({force: false});
        app.listen(PORT)
        console.log('server running on port', PORT)
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }    
}
main()

export default app