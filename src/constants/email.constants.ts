import { EmailTypeEnum } from "../enums/email-type.enum";

export const emailConstants = {
  [EmailTypeEnum.WELCOME]: {
    subject: "Welcome to our platform",
    template: "register",
  },
  [EmailTypeEnum.FORGOT_PASSWORD]: {
    subject: "Forgot password",
    template: "forgot-password",
  },
  [EmailTypeEnum.OLD_VISIT]: {
    subject: "Old visit",
    template: "old-visit",
  },
  [EmailTypeEnum.LOGOUT]: {
    subject: "Logout",
    template: "logout",
  },
  [EmailTypeEnum.VERIFY_EMAIL]: {
    subject: "VERIFY EMAIL",
    template: "verify",
  },
};
