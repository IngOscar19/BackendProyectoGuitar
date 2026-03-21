import { Table, Column, Model, DataType, Default } from 'sequelize-typescript'

// Tipo para cada item dentro de la orden
type OrderItem = {
    id: number
    name: string
    image: string
    price: number
    quantity: number
}

@Table({
    tableName: 'orders'
})
class Order extends Model {

    @Column({
        type: DataType.JSONB
    })
    items!: OrderItem[]

    @Column({
        type: DataType.FLOAT
    })
    total!: number

    @Default('pending')
    @Column({
        type: DataType.ENUM('pending', 'completed', 'cancelled')
    })
    status!: string

}

export default Order