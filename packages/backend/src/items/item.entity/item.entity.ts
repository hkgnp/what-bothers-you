import { Entity, ObjectId, ObjectIdColumn, Column } from 'typeorm';

@Entity({ name: 'comments' })
export class ItemEntity {
  @ObjectIdColumn()
  _id: ObjectId;

  @Column()
  date: Date;

  @Column()
  value: string;

  @Column()
  discussed: boolean;

  @Column()
  discussed_date: Date;
}
