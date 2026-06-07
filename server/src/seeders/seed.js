const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcryptjs');
const {
  Department, Office, Role, User, Admin, UserProfile, UserAuthIdentity
} = require('../models');

async function seed() {
  console.log('🌱 Seeding initial data...');

  // Lookups
  const [dept] = await Department.findOrCreate({ where: { name: 'SYSTEM' }, defaults: { id: uuidv4(), is_active: true } });
  const [office] = await Office.findOrCreate({ where: { name: 'SYSTEM' }, defaults: { id: uuidv4(), is_active: true } });
  const [role] = await Role.findOrCreate({ where: { name: 'SYSTEM' }, defaults: { id: uuidv4(), is_active: true } });

  await Role.findOrCreate({ where: { name: 'officials' }, defaults: { id: uuidv4(), is_active: true } });
  await Role.findOrCreate({ where: { name: 'staff' }, defaults: { id: uuidv4(), is_active: true } });
  await Role.findOrCreate({ where: { name: 'faculty' }, defaults: { id: uuidv4(), is_active: true } });

  // Admin user (username + email + password)
  const adminPasswordHash = await bcrypt.hash('admin123', 10);
  const [adminUser, created] = await User.findOrCreate({
    where: { username: 'admin' },
    defaults: {
      id: uuidv4(),
      username: 'admin',
      email: 'admin@trackv2.local',        // admin now has an email too
      password_hash: adminPasswordHash,
      account_code_id: null,
      status: 'active'
    }
  });

  await Admin.findOrCreate({ where: { user_id: adminUser.id }, defaults: { id: uuidv4(), user_id: adminUser.id, admin_level: 'superadmin', is_active: true } });
  await UserProfile.findOrCreate({ where: { user_id: adminUser.id }, defaults: { user_id: adminUser.id, department_id: dept.id, office_id: office.id, role_id: role.id } });
  await UserAuthIdentity.findOrCreate({ where: { user_id: adminUser.id, provider: 'local' }, defaults: { id: uuidv4(), user_id: adminUser.id, provider: 'local', provider_identifier: 'admin', is_primary: true, is_verified: true } });

  if (created) {
    console.log('✅ Default admin created: admin / admin123');
  } else {
    console.log('ℹ️ Admin already exists.');
  }
  console.log('✅ Seed complete.');
}

module.exports = seed;