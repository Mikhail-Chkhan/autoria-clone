import { CronJob } from "cron";

import { configs } from "../config/configs";
import { timeHelper } from "../helpers/time.helper";
import { verifyCodeRepository } from "../repositories/verify-code.repository";

const handler = async () => {
  try {
    const { value, unit } = timeHelper.parseConfigString(
      configs.VERIFY_CODE_EXPIRATION,
    );

    const date = timeHelper.subtractByParams(value, unit);
    console.log(date);
    const deletedCount = await verifyCodeRepository.deleteBeforeDate(date);
    console.log(`Deleted ${deletedCount} old verify code`);
  } catch (error) {
    console.error(error);
  }
};

export const removeOldVerifyCodeCronJob = new CronJob("0 15 * * * *", handler);
// export const removeOldVerifyCodeCronJob = new CronJob(
//   "*/20 * * * * *",
//   handler,
// );
