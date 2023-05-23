import * as config from "./config";

export const PROFILE_URL = `${config.apiBaseUrl}/api/user/me`;
export const USERS_URL = `${config.apiBaseUrl}/api/user`;
export const HEALTHCHECK_URL = `${config.apiBaseUrl}/api/healthcheck`;
export const LOGOUT_URL = `${config.apiBaseUrl}/auth/logout`;
export const LOGIN_URL = `${config.apiBaseUrl}/auth/login`;

// App specific URLS
export const PORTAL_URL = `${config.apiBaseUrl}/api/portal`;
export const APPLICATION_URL = `${PORTAL_URL}/application`;
export const STUDENT_URL = `${PORTAL_URL}/student`;
export const REFERENCE_URL = `${PORTAL_URL}/reference`;
