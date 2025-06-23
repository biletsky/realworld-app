import { expect } from "@playwright/test";
import { test } from "../../fixtures/base";
import faker from "@faker-js/faker";


test.describe("api tests", () => {

  const url = "http://localhost:3002";
  const headers = { "Content-Type": "application/json" };

  test.beforeEach(async ({ page }) => {
    const response = await page.request.post(url + "/login", {
      data: {
        "type": "LOGIN",
        "username": "TestUser",
        "password": "123123",
      },
      headers: headers,
    });
    expect(response.status()).toBe(200);
  });


  test("Gets a list of bank accounts for user", async ({ page}) => {
    const response = await page.request.get(url + "/bankAccounts");
    const responseBody = await response.json();
    console.log(response);
    console.log(responseBody);
    expect(response.status()).toBe(200);
    expect(responseBody.results[0].bankName).toBe("Test_Bank");
  });

  test("Create and delete bank", async ({ page, pageManager }) => {
    const bankName = faker.company.companyName();
    const createBankAccountQueryPath = "../graphql/createBankAccount.graphql";
    const deleteBankAccountMutationPath = "../graphql/deleteBankAccount.graphql";
    const listBankAccountPath = "../graphql/listBankAccount.graphql";

    //Create new bank account
    const createPayload = {
      "operationName": "CreateBankAccount",
      "query": await pageManager.loadGraphQL(createBankAccountQueryPath),
      "variables": {
        "userId": "h2CvoBsTn",
        "bankName": bankName,
        "accountNumber": "121212122",
        "routingNumber": "1232134er",
      },
    };

    const createResponse = await page.request.post(url + "/graphql", {
      data: createPayload,
      headers: headers,
    });


    expect(createResponse.status()).toBe(200);
    const createBody = await createResponse.json();
    console.log(createBody);
    expect(createBody.data).toBeDefined();
    expect(createBody.data.createBankAccount).toBeDefined();
    expect(createBody.data.createBankAccount).toHaveProperty("id");
    const bankAccountId = createBody.data.createBankAccount.id;

    //Delete bank account
    const deletePayload = {
      "operationName": "DeleteBankAccount",
      "query": await pageManager.loadGraphQL(deleteBankAccountMutationPath),
      "variables": {
        "id": bankAccountId,
      },
    };

    const deleteResponse = await page.request.post(url + "/graphql", {
      data: deletePayload,
      headers: headers,
    });

    expect(deleteResponse.status()).toBe(200);

    const deleteBody = await deleteResponse.json();
    console.log(deleteResponse);
    expect(deleteBody.data).toBeDefined();
    expect(deleteBody.data.deleteBankAccount).toBe(true);

    //Check the bank account list
    const bankAccountList = {
      "operationName": "ListBankAccount",
      "query": await pageManager.loadGraphQL(listBankAccountPath),
    };

    const bankAccountListResponse = await page.request.post(url + "/graphql", {
      data: bankAccountList,
      headers: headers,
    });

    expect(bankAccountListResponse.status()).toBe(200);
    const bankAccountListBody = await bankAccountListResponse.json();
    expect(bankAccountListBody.data.listBankAccount.find(bank => bank.bankName === bankName).isDeleted).toBe(true);

    console.log(bankAccountListBody.data.listBankAccount);
  });

  test("Gets list of users", async ({ page }) => {
    const response = await page.request.get(url + "/users");
    const responseBody = await response.json();
    console.log(response);
    console.log(responseBody);
    expect(response.status()).toBe(200);
  });

  test("Get a user profile by username", async ({ page }) => {
    const response = await page.request.get(url + "/users/profile/TestUser");
    const responseBody = await response.json();
    console.log(response);
    console.log(responseBody);
    expect(response.status()).toBe(200);
    expect(responseBody.user.firstName).toBe('Jack');
    expect(responseBody.user.lastName).toBe('Lowrence');
  });

  test("Creates a new comment for a transactions", async ({ page }) => {
    const content = faker.lorem.lines();
    const data = {
      "transactionId": "4AvM8cN1DdS",
      "content": content,
    };
    const response = await page.request.post(url + "/comments/4AvM8cN1DdS", {
      data: data,
      headers: headers,
    });
    console.log(response);
    expect(response.status()).toBe(200);
  });

});
