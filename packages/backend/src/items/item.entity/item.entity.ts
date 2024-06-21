import { Column,Entity, ObjectId, ObjectIdColumn } from 'typeorm';

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
