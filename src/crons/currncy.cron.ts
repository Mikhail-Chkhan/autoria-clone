import { CronJob } from "cron";

import { currencyHelper } from "../helpers/currency.helper";

const handler = async () => {
  try {
    await currencyHelper.fetchRates();
    console.log("currency update");
  } catch (error) {
    console.error(error);
  }
};

export const currencyOldCronJob = new CronJob("30 0,12 * * *", handler);
