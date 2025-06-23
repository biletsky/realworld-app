import faker from "@faker-js/faker";

export class TestDataGenerator {

  generateFirstName() {
    return faker.name.firstName();
  }

  generateLastName() {
    return faker.name.firstName();
  }

  generateEmail() {
    return faker.internet.email();
  }

  generatePhoneNumber() {
    return faker.phone.phoneNumber("1234567890");
  }

  generateBankName() {
    return faker.company.companyName();
  }
}