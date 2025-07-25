import { faker } from "@faker-js/faker"

const placeholders = Object.freeze({
  getName() {
    return faker.person.fullName()
  },
  getCompanyName() {
    return faker.company.name()
  }
})

export { placeholders }
