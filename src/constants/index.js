export const COMMON_CONTEXT_STORAGE = "COMMON_STORAGE_PERSIST";
export const THEME_CONTEXT_STORAGE = "MAKER ACADEMY THEME";
export const NAVBAR_HEIGHT_DESKTOP = 80;
export const NAVBAR_HEIGHT_MOBILE = 80;

export const DASHBOARD_SIDE_DRAWER_WIDTH = 280;

export const CONTENT_SORT_ITEMS = [
  "newest",
  "oldest",
  "likes",
  "viewed",
  "highest_reading_time",
  "lowest_reading_time",
];

export const CONTENT_SORT_VALUES = {
  newest: { category: "timestamp", value: "-1" },
  oldest: { category: "timestamp", value: "1" },
  likes: { category: "likes", value: "-1" },
  viewed: { category: "views", value: "-1" },
  highest_reading_time: { category: "duration", value: "-1" },
  lowest_reading_time: { category: "duration", value: "1" },
};

export const TRUST_LEVELS = {
  1: "user",
  2: "internal",
  3: "admin",
};

export const CONTENT_DIFFICULTY_LEVELS = ["beginner", "intermediate", "expert"];

export const ASSESSMENT_QUESTION_TYPES = [
  "radio",
  "checkbox",
  "text",
  // "file",
];

export const BRANDS = ["maker_academy", "meta_analysis"];

export const CONTENT_CATEGORIES = [
  "makerdao",
  "academy",
  "defi",
  "dai",
  "blockchain",
  "crypto",
];

export const DASHBOARD_BREADCRUMBS = {
  "/app": "dashbaord",
  "/app/studio": "dashboard_studio_content",
  "/app/studio/new/document": "dashboard_studio_new_document",
  "/app/studio/new/course": "dashboard_studio_new_course",
  "/app/studio/new/assessment": "dashboard_studio_new_assessment",
  "/app/admin": "dashboard_admin",
  "/app/admin/locales": "localizations",
  "/app/settings": "dashboard_settings",
};

export const LANGUAGES = ["en", "fr", "es", "ru", "ar", "zh", "hi", "sw"];
