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
  },

  getSignUpForm() {
    const password = this.getPassword()
    const firstName = faker.person.firstName()
    const lastName = faker.person.lastName()

    const email = this.getEmail({ firstName, lastName })
    const name = firstName + " " + lastName

    return {
      name,
      email,
      password
    }
  }
})

export { placeholders }
