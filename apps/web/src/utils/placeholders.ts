import { faker } from "@faker-js/faker"

const placeholders = Object.freeze({
  getName() {
    return faker.person.fullName()
  },
  getEmail(opts?: { firstName: string; lastName: string }) {
    if (opts === undefined) {
      const fName = faker.person.firstName()
      const lName = faker.person.lastName()

      return faker.internet.email({ firstName: fName, lastName: lName }).toLowerCase()
    }
    return faker.internet.email(opts).toLowerCase()
  },
  getPassword() {
    return faker.internet.password({ memorable: true })
  },
  getCompanyName() {
    return faker.company.name()
  }
})

export { placeholders }
