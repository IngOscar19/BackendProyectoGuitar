import { Table, Column, Model, DataType } from 'sequelize-typescript'

@Table({
    tableName: 'guitars'
})
class Guitar extends Model {

    @Column({
        type: DataType.STRING(100)
    })
    name!: string

    @Column({
        type: DataType.STRING(255)
    })
    image!: string

    @Column({
        type: DataType.TEXT
    })
    description!: string

    @Column({
        type: DataType.FLOAT
    })
    price!: number

}

export default Guitar