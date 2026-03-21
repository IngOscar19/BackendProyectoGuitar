import db from './config/db'
import Guitar from './models/Guitar.model'

const guitars = [
    { name: 'Lukather',  image: '/img/guitarra_01.jpg', description: 'Morbi ornare augue nisl, vel elementum dui mollis vel. Curabitur non ex id eros fermentum hendrerit.', price: 299 },
    { name: 'SRV',       image: '/img/guitarra_02.jpg', description: 'Morbi ornare augue nisl, vel elementum dui mollis vel. Curabitur non ex id eros fermentum hendrerit.', price: 349 },
    { name: 'Borland',   image: '/img/guitarra_03.jpg', description: 'Morbi ornare augue nisl, vel elementum dui mollis vel. Curabitur non ex id eros fermentum hendrerit.', price: 329 },
    { name: 'VAI',       image: '/img/guitarra_04.jpg', description: 'Morbi ornare augue nisl, vel elementum dui mollis vel. Curabitur non ex id eros fermentum hendrerit.', price: 299 },
    { name: 'Thompson',  image: '/img/guitarra_05.jpg', description: 'Morbi ornare augue nisl, vel elementum dui mollis vel. Curabitur non ex id eros fermentum hendrerit.', price: 399 },
    { name: 'White',     image: '/img/guitarra_06.jpg', description: 'Morbi ornare augue nisl, vel elementum dui mollis vel. Curabitur non ex id eros fermentum hendrerit.', price: 329 },
    { name: 'Cobain',    image: '/img/guitarra_07.jpg', description: 'Morbi ornare augue nisl, vel elementum dui mollis vel. Curabitur non ex id eros fermentum hendrerit.', price: 349 },
    { name: 'Dale',      image: '/img/guitarra_08.jpg', description: 'Morbi ornare augue nisl, vel elementum dui mollis vel. Curabitur non ex id eros fermentum hendrerit.', price: 379 },
    { name: 'Krieger',   image: '/img/guitarra_09.jpg', description: 'Morbi ornare augue nisl, vel elementum dui mollis vel. Curabitur non ex id eros fermentum hendrerit.', price: 289 },
    { name: 'Campbell',  image: '/img/guitarra_10.jpg', description: 'Morbi ornare augue nisl, vel elementum dui mollis vel. Curabitur non ex id eros fermentum hendrerit.', price: 349 },
    { name: 'Reed',      image: '/img/guitarra_11.jpg', description: 'Morbi ornare augue nisl, vel elementum dui mollis vel. Curabitur non ex id eros fermentum hendrerit.', price: 399 },
    { name: 'Hazel',     image: '/img/guitarra_12.jpg', description: 'Morbi ornare augue nisl, vel elementum dui mollis vel. Curabitur non ex id eros fermentum hendrerit.', price: 379 },
]

const seedDB = async () => {
    try {
        await db.authenticate()
        console.log('✅ Conexión establecida')

        await db.sync({ force: true })
        console.log('✅ Tablas sincronizadas')

        await Guitar.bulkCreate(guitars)
        console.log('✅ 12 guitarras insertadas')

        process.exit(0)
    } catch (error) {
        console.error('❌ Error:', error)
        process.exit(1)
    }
}

seedDB()