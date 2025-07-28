import { faker } from "@faker-js/faker"

const placeholders = Object.freeze({
  getName() {
    return faker.person.fullName()
  },
  getEmail() {
    return faker.internet.email()
  },
  getCompanyName() {
    return faker.company.name()
  }
})

export { placeholders }
