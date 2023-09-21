import Sequelize from 'sequelize'

import User from '../app/models/User'

import configDatabase from '../config/database'
import Products from '../app/models/Products'



const models = [User, Products]

class Database {
    constructor() {
        this.init()
    }

    init() {
        this.conection = new Sequelize(configDatabase)
        models.map(model => model.init(this.conection))
    }
}

export default new Database()