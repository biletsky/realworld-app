import { expect, test } from "@playwright/test";
import { PageManager } from "../../pageObjects/pageManager";
import faker from "@faker-js/faker";


test.describe("api tests", () => {

  const url = "http://localhost:3002";

  test.beforeEach(async ({ page }) => {
    const response = await page.request.post(url + "/login", {
      data: {
        "type": "LOGIN",
        "username": "TestUser",
        "password": "123123",
      },
      headers: {
        "Content-Type": "application/json",
      },
    });
    expect(response.status()).toBe(200);
  });


  test("Gets a list of bank accounts for user", async ({ page }) => {
    const response = await page.request.get(url + "/bankAccounts");
    const responseBody = await response.json();
    console.log(response);
    console.log(responseBody);
    expect(response.status()).toBe(200);
    expect(responseBody.results[0].bankName).toBe("Test_Bank");
  });

  test("Create and delete bank", async ({ page }) => {
    const bankName = faker.company.companyName();
    const pm = new PageManager(page);
    const createBankAccountQueryPath = "../graphql/createBankAccount.graphql";
    const deleteBankAccountMutationPath = "../graphql/deleteBankAccount.graphql";
    const listBankAccountPath = "../graphql/listBankAccount.graphql";

    //Create new bank account
    const createPayload = {
      "operationName": "CreateBankAccount",
      "query": await pm.loadGraphQL(createBankAccountQueryPath),
      "variables": {
        "userId": "h2CvoBsTn",
        "bankName": bankName,
        "accountNumber": "121212122",
        "routingNumber": "1232134er",
      },
    };

    const createResponse = await page.request.post(url + "/graphql", {
      data: createPayload,
      headers: {
        "Content-Type": "application/json",
      },
    });


    expect(createResponse.ok()).toBeTruthy();
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
      "query": await pm.loadGraphQL(deleteBankAccountMutationPath),
      "variables": {
        "id": bankAccountId,
      },
    };

    const deleteResponse = await page.request.post(url + "/graphql", {
      data: deletePayload,
      headers: {
        "Content-Type": "application/json",
      },
    });

    expect(deleteResponse.ok()).toBeTruthy();
    expect(deleteResponse.status()).toBe(200);

    const deleteBody = await deleteResponse.json();
    console.log(deleteResponse);
    expect(deleteBody.data).toBeDefined();
    expect(deleteBody.data.deleteBankAccount).toBe(true);

    //Check the bank account list
    const bankAccountList = {
      "operationName": "ListBankAccount",
      "query": await pm.loadGraphQL(listBankAccountPath),
    };

    const bankAccountListResponse = await page.request.post(url + "/graphql", {
      data: bankAccountList,
      headers: {
        "Content-Type": "application/json",
      },
    });

    expect(bankAccountListResponse.ok()).toBeTruthy();
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
    const response = await page.request.post(url + "/comments/4AvM8cN1DdS", {
      data: {
      "transactionId": "4AvM8cN1DdS",
      "content": content
      },
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log(response);
    expect(response.status()).toBe(200);
  });

});
