import {Page} from "@playwright/test";
import {SignUpPage} from "./signUpPage";
import { SignInPage } from "./signInPage";
import { AccountPage } from "./accountPage";
import { SettingsPage } from "./settingsPage";
import { BankAccountPage } from "./bankAccountPage";
import { UploadDownloadPage } from "./uploadDownloadPage";
import { HelperBase } from "./helperBase";

export class PageManager extends HelperBase{

    private readonly signUp: SignUpPage;
    private readonly signIn: SignInPage;
    private readonly account: AccountPage;
    private readonly settings: SettingsPage;
    private readonly bankAccount: BankAccountPage;
    private readonly uploadDownload: UploadDownloadPage;

    constructor(page: Page) {
        super(page);
        this.signUp = new SignUpPage(page);
        this.signIn = new SignInPage(page);
        this.account = new AccountPage(page);
        this.settings = new SettingsPage(page);
        this.bankAccount = new BankAccountPage(page);
        this.uploadDownload = new UploadDownloadPage(page);
    }

    get signInPage(): SignInPage {
        return this.signIn;
    }

    get signUpPage(): SignUpPage {
        return this.signUp;
    }

    get accountPage(): AccountPage {
        return this.account;
    }

    get settingsPage(): SettingsPage {
        return this.settings;
    }

    get bankAccountPage(): BankAccountPage {
        return this.bankAccount;
    }

    get uploadDownloadPage(): UploadDownloadPage {
        return this.uploadDownload;
    }

}