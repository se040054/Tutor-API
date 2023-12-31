'use strict'
const bcryptjs = require('bcryptjs')
const { faker } = require('@faker-js/faker')
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    let transaction
    try {
      transaction = await queryInterface.sequelize.transaction()
      const usersArray = Array.from({ length: 15 }, (_, i) => ({
        id: i + 2,
        email: `user${i + 1}@example.com`,
        name: faker.person.fullName(),
        password: bcryptjs.hashSync('12345678', 10),
        created_at: new Date(),
        updated_at: new Date(),
        is_teacher: i > 4,
        avatar: `https://loremflickr.com/320/240/human/?random=${Math.random() * 100}`
      }))
      const teachersArray = Array.from({ length: 10 }, (_, i) => ({
        id: i + 1,
        course_introduce: faker.lorem.sentence(),
        course_url: faker.internet.url(),
        teach_style: faker.lorem.sentence(),
        user_id: i + 7,
        created_at: new Date(),
        updated_at: new Date()
      }))

      await queryInterface.bulkInsert('Users', [{
        id: 1,
        name: 'root',
        email: 'root@example.com',
        password: bcryptjs.hashSync('12345678', 10),
        is_admin: true,
        is_teacher: false,
        avatar: `https://loremflickr.com/320/240/human/?random=${Math.random() * 100}`,
        created_at: new Date(),
        updated_at: new Date()
      }], { transaction })
      await queryInterface.sequelize.query('ALTER TABLE Users AUTO_INCREMENT = 1;', { transaction })
      await queryInterface.sequelize.query('ALTER TABLE Teachers AUTO_INCREMENT = 1;', { transaction })
      await queryInterface.bulkInsert('Users', usersArray, { transaction })
      await queryInterface.bulkInsert('Teachers', teachersArray, { transaction })
      await transaction.commit()
    } catch (err) {
      if (transaction) {
        console.log(err)
        await transaction.rollback()
      }
    }
  },

  async down (queryInterface, Sequelize) {
    let transaction
    try {
      transaction = await queryInterface.sequelize.transaction()
      await queryInterface.bulkDelete('Users', null, { transaction })
      await queryInterface.bulkDelete('Teachers', null, { transaction })
      await transaction.commit()
    } catch (err) {
      if (transaction) {
        console.log(err)
        await transaction.rollback()
      }
    }
  }

}
