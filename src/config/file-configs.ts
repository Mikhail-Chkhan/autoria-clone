export const logoConfigs: {
  MIMETYPE: string[];
  MAX_SIZE: number;
} = {
  MIMETYPE: ["image/png", "image/jpeg"],
  MAX_SIZE: 2 * 10224 * 1024,
};

export const imgCarConfigs: {
  MIMETYPE: string[];
  MAX_SIZE: number;
  MAX_COUNT: number;
} = {
  MIMETYPE: ["image/png", "image/jpeg"],
  MAX_SIZE: 5 * 1024 * 1024,
  MAX_COUNT: 3,
};
