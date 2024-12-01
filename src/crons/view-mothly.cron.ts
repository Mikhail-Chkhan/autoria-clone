import { CronJob } from "cron";

import { ViewPeriodEnum } from "../enums/view.period.enum";
import { reportService } from "../services/report.service";

const handler = async () => {
  await reportService.resetViews(ViewPeriodEnum.MONTHLY);
  console.log("Monthly views reset.");
};

export const viewsMonthlyCronJob = new CronJob("0 0 1 * *", handler);
