import {Page} from  "@playwright/test";
import * as fs from "fs/promises";
import path = require("node:path");

export class HelperBase {

    readonly page: Page;

    constructor(page:Page) {
        this.page = page;
    }

    async navigateToPage(url: string) {
        await this.page.goto(url)
    }

    async loadGraphQL(filePath: string): Promise<string> {
        const absolutePath = path.join('/Users/vbiletsky/IdeaProjects/realworld-app/playwright/graphql/', filePath);
        const buffer = await fs.readFile(absolutePath, "utf-8");
        return buffer.toString();
    }

}