import { Model } from '../db';

const User = Model.extend({
  tableName: 'users',
  hasTimestamps: ['created_at', 'updated_at']
});

export default User;
