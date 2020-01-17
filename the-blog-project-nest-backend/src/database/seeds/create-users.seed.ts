import { Factory, Seeder } from 'typeorm-seeding'
import { Connection } from 'typeorm'
import { User } from '../../users/entities/user.entity'
import { passwordHash } from '../../lib/password-hash';

export default class CreateUsers implements Seeder {
    public async run(factory: Factory, connection: Connection): Promise<any> {
        await connection
            .createQueryBuilder()
            .insert()
            .into(User)
            .values([{ displayName: 'Administrator', password: passwordHash('1234'), mobileNumber: '0912341234' }])
            .execute();
    }
}