import {
  AdminPermissions,
  CarPermissions,
  UserPermissions,
} from "../enums/permissions.enum";

export const roleTemplates = {
  default: [
    UserPermissions.VIEW_OWN_PROFILE,
    UserPermissions.UPDATE_OWN_PROFILE,
    UserPermissions.UPLOAD_LOGO,
    UserPermissions.REMOVE_LOGO,
    UserPermissions.CHANGE_EMAIL,
    UserPermissions.DELETE_ACCOUNT,
  ],
  seller: [
    UserPermissions.VIEW_OWN_PROFILE,
    UserPermissions.UPDATE_OWN_PROFILE,
    UserPermissions.UPLOAD_LOGO,
    UserPermissions.REMOVE_LOGO,
    UserPermissions.CHANGE_EMAIL,
    UserPermissions.DELETE_ACCOUNT,

    CarPermissions.DELETE_CAR,
    CarPermissions.DEACTIVATE_CAR,
    CarPermissions.VIEW_CATALOG_BRAND,
  ],
  manager: [
    UserPermissions.VIEW_OWN_PROFILE,
    UserPermissions.UPDATE_OWN_PROFILE,
    UserPermissions.UPLOAD_LOGO,
    UserPermissions.REMOVE_LOGO,
    UserPermissions.CHANGE_EMAIL,
    UserPermissions.DELETE_ACCOUNT,

    CarPermissions.DELETE_CAR,
    CarPermissions.DEACTIVATE_CAR,
    CarPermissions.VIEW_CATALOG_BRAND,

    AdminPermissions.UPDATE_USER,
    AdminPermissions.GET_USER,
    AdminPermissions.REMOVE_USER,
    AdminPermissions.VIEW_ALL_USERS,
    AdminPermissions.VIEW_USER_LIST,
  ],
  administrator: [
    UserPermissions.VIEW_OWN_PROFILE,
    UserPermissions.UPDATE_OWN_PROFILE,
    UserPermissions.UPLOAD_LOGO,
    UserPermissions.REMOVE_LOGO,
    UserPermissions.CHANGE_EMAIL,
    UserPermissions.DELETE_ACCOUNT,

    CarPermissions.DELETE_CAR,
    CarPermissions.DEACTIVATE_CAR,
    CarPermissions.VIEW_CATALOG_BRAND,

    AdminPermissions.CHANGE_ROLE,
    AdminPermissions.UPDATE_USER,
    AdminPermissions.GET_USER,
    AdminPermissions.REMOVE_USER,
    AdminPermissions.VIEW_ALL_USERS,
    AdminPermissions.VIEW_USER_LIST,
  ],
};
