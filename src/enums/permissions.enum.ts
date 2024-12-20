export enum AdminPermissions {
  CHANGE_ROLE = "CHANGE_ROLE",
  UPDATE_USER = "UPDATE_USER",
  GET_USER = "GET_USER",
  REMOVE_USER = "REMOVE_USER",
  VIEW_ALL_USERS = "VIEW_ALL_USERS",
  VIEW_USER_LIST = "VIEW_USER_LIST",
  BLOCKED_USER = "BLOCKED_USER",
}

export enum UserPermissions {
  VIEW_OWN_PROFILE = "VIEW_OWN_PROFILE",
  UPDATE_OWN_PROFILE = "UPDATE_OWN_PROFILE",
  UPDATE_ROLE_TEMPLATE = "UPDATE_ROLE_TEMPLATE",
  UPLOAD_LOGO = "UPLOAD_LOGO",
  CHANGE_EMAIL = "CHANGE_EMAIL",
  CHANGE_PASSWORD = "CHANGE_PASSWORD",
  LOGOUT = "LOGOUT",
  REPORT = "REPORT",
  DELETE_ACCOUNT = "DELETE_ACCOUNT",
}

export enum CarPermissions {
  CREATE_CAR = "CREATE_CAR",
  UPDATE_CAR = "UPDATE_CAR",
  ADMIN_UPDATE_CAR = "ADMIN_UPDATE_CAR",
  GET_CARS = "GET_CARS",
  DELETE_CAR = "DELETE_CAR",
  DEACTIVATE_CAR = "DEACTIVATE_CAR",
  VIEW_CATALOG_BRAND = "VIEW_CATALOG_BRAND",
}
