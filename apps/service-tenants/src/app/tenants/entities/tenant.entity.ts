import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  VersionColumn,
} from 'typeorm';

export abstract class BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  // @Column()
  // createdBy?: string;

  @CreateDateColumn()
  createdAt?: Date;

  @UpdateDateColumn()
  updatedAt?: Date;

  @DeleteDateColumn()
  deletedAt?: Date = null;

  // @Column()
  // deleted?: boolean = false;

  @VersionColumn()
  version?: number;
}

@Entity('tenants')
export class Tenant extends BaseEntity {
  @Column()
  name: string;

  @Column({ unique: true })
  normalizedName: string;

  // settings?: TenantSettingsEmbed;

  // billing?: BillingSettingEmbed;

  // members: TenantMemberEmbed[];

  // currentPlan!: string;
}
