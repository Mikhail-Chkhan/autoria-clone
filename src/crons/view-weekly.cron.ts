import { CronJob } from "cron";

import { ViewPeriodEnum } from "../enums/view.period.enum";
import { reportService } from "../services/report.service";

const handler = async () => {
  await reportService.resetViews(ViewPeriodEnum.WEEKLY);
  console.log("Weekly views reset.");
};

export const viewsWeeklyCronJob = new CronJob("0 0 * * 1", handler);
