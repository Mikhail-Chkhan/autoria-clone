import { CronJob } from "cron";

import { ViewPeriodEnum } from "../enums/view.period.enum";
import { reportService } from "../services/report.service";

const handler = async () => {
  await reportService.resetViews(ViewPeriodEnum.DAILY);
  console.log("Daily views reset.");
};

export const viewsDailyCronJob = new CronJob("0 0 * * *", handler);
