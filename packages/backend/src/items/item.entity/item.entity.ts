import { Column, Entity, ObjectId, ObjectIdColumn } from 'typeorm'

@Entity({ name: 'comments' })
export class ItemEntity {
  @ObjectIdColumn()
  _id: ObjectId

  @Column()
  date: Date

  @Column()
  value: string

  @Column({ nullable: true })
  discussed: boolean | null

  @Column({ nullable: true })
  discussed_date: Date | null
}
