import {
  FullLogoWhite,
  RoleFullstack,
  RoleFrontend,
  RoleBackend,
  RoleSolidity,
  RoleDatascientist,
  RoleFinancialengineer,
  RoleUiux,
  RoleProductmanager,
  RoleStudent,
} from "@utils/images";

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

export const BACKLOG_TYPES = ["bug_fix", "improvement", "feature"];

export const BACKLOG_PRIORITIES = ["low", "medium", "high", "urgent"];

export const ASSESSMENT_QUESTION_TYPES = [
  "radio",
  "checkbox",
  "text",
  // "file",
];

export const CONTENT_CATEGORIES = [
  "tokenomics",
  "governance",
  "network_economics",
  "trading",
  "privacy",
  "consensus",
  "blockchain",
  "history",
  "cryptography",
  "smart_contracts",
  "news",
  "scaling",
  "maker",
  "insurance",
];

export const DASHBOARD_BREADCRUMBS = {
  "/app": "dashboard",
  "/app/studio": "dashboard_studio_content",
  "/app/studio/new/document": "dashboard_studio_new_document",
  "/app/studio/new/course": "dashboard_studio_new_course",
  "/app/studio/new/assessment": "dashboard_studio_new_assessment",
  "/app/admin": "dashboard_admin",
  "/app/admin/locales": "localizations",
  "/app/settings": "dashboard_settings",
};

export const LANGUAGES = ["en", "fr", "es", "ru", "ar", "zh", "hi", "sw"];

export const FIREBASE_ERRORS = {
  "Firebase: Error (auth/wrong-password).":
    "Wrong Password. Please try again or login with Google",
};

export const CONTACT_ROLES = [
  { name: "full_stack_developer", icon: RoleFullstack },
  { name: "frontend_developer", icon: RoleFrontend },
  { name: "backend_developer", icon: RoleBackend },
  { name: "solidity_engineer", icon: RoleSolidity },
  { name: "data_scientist", icon: RoleDatascientist },
  { name: "financial_engineer", icon: RoleFinancialengineer },
  { name: "uiux_designer", icon: RoleUiux },
  { name: "product_manager", icon: RoleProductmanager },
  { name: "student", icon: RoleStudent },
];

export const BRANDS = [
  "maker_academy",
  "sustainable_ecosystem_scaling",
  "protocol_engineering",
  "risk",
  "oracles",
  "real_world_finance",
  "Growth",
  "protocol_engineering",
  "govalpha",
  "sustainable_ecosystem_scaling",
  "governance_communications",
  "dai_foundation",
  "development_ux",
  "starknet_engineering",
  "strategic_happiness",
  "collateral_engineering_services",
  "data_insights",
  "deco_fixed_rate",
  "immunefi_security",
  "sidestream_auction_services",
  "techops",
  "strategic_finance",
  "core_unit_archive",
  "events",
];

export const CONTENT_CARD_BRAND_STYLES = {
  maker_academy: {
    color: "#1AAB9B",
    logo: FullLogoWhite,
  },
  sustainable_ecosystem_scaling: {
    color: "#000000",
    logo: FullLogoWhite,
  },
  protocol_engineering: {
    color: "#555555",
    logo: FullLogoWhite,
  },
};
