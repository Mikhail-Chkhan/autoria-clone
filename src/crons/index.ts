import { currencyOldCronJob } from "./currncy.cron";
import { oldVisitorCronJob } from "./old-visitor";
import { removeOldPasswordsCronJob } from "./remove-old-passwords.cron";
import { removeOldTokensCronJob } from "./remove-old-tokens.cron";
import { removeOldVerifyCodeCronJob } from "./remove-old-verify-code.cron";
import { testCronJob } from "./test.cron";
import { viewsDailyCronJob } from "./view-daily.cron";
import { viewsMonthlyCronJob } from "./view-mothly.cron";
import { viewsWeeklyCronJob } from "./view-weekly.cron";

export const cronRunner = () => {
  testCronJob.start();
  removeOldTokensCronJob.start();
  removeOldPasswordsCronJob.start();
  oldVisitorCronJob.start();
  removeOldVerifyCodeCronJob.start();
  currencyOldCronJob.start();
  viewsDailyCronJob.start();
  viewsWeeklyCronJob.start();
  viewsMonthlyCronJob.start();
};
