const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcryptjs');
const {
  Department,
  Office,
  Role,
  User,
  Admin,
  UserProfile,
  UserAuthIdentity
} = require('../models');

async function seed() {
  console.log('🌱 Seeding initial data...');

  // 1. Lookups – SYSTEM
  const [dept] = await Department.findOrCreate({
    where: { name: 'SYSTEM' },
    defaults: { id: uuidv4(), is_active: true }
  });
  const [office] = await Office.findOrCreate({
    where: { name: 'SYSTEM' },
    defaults: { id: uuidv4(), is_active: true }
  });
  const [role] = await Role.findOrCreate({
    where: { name: 'SYSTEM' },
    defaults: { id: uuidv4(), is_active: true }
  });

  // 2. User roles (fixed)
  const officialRole = await Role.findOrCreate({
    where: { name: 'officials' },
    defaults: { id: uuidv4(), is_active: true }
  });
  const staffRole = await Role.findOrCreate({
    where: { name: 'staff' },
    defaults: { id: uuidv4(), is_active: true }
  });
  const facultyRole = await Role.findOrCreate({
    where: { name: 'faculty' },
    defaults: { id: uuidv4(), is_active: true }
  });

  // 3. Admin user
  const adminPasswordHash = await bcrypt.hash('track_2026_pup_calendar', 10);
  const [adminUser, created] = await User.findOrCreate({
    where: { username: 'track_4dm1n' },
    defaults: {
      id: uuidv4(),
      username: 'track_4dm1n',
      password_hash: adminPasswordHash,
      email: null,
      account_code_id: null,
      status: 'active'
    }
  });

  // 4. Admin record
  await Admin.findOrCreate({
    where: { user_id: adminUser.id },
    defaults: {
      id: uuidv4(),
      user_id: adminUser.id,
      admin_level: 'superadmin',
      is_active: true
    }
  });

  // 5. Admin profile (points to SYSTEM)
  await UserProfile.findOrCreate({
    where: { user_id: adminUser.id },
    defaults: {
      user_id: adminUser.id,
      department_id: dept.id,
      office_id: office.id,
      role_id: role.id
    }
  });

  // 6. Auth identity (local)
  await UserAuthIdentity.findOrCreate({
    where: { user_id: adminUser.id, provider: 'local' },
    defaults: {
      id: uuidv4(),
      user_id: adminUser.id,
      provider: 'local',
      provider_identifier: 'track_4dm1n',
      is_primary: true,
      is_verified: true
    }
  });

  if (created) {
    console.log('✅ Default admin created: track_4dm1n / track_2026_pup_calendar');
  } else {
    console.log('ℹ️  Admin user already exists, skipped creation.');
  }
  console.log('✅ Seed complete.');
}

module.exports = seed;