// TODO: Make a reusable package
// as the data's originally from the monorepo
import { DateTime } from 'luxon';

const PlanStatus = {
  ACTIVE: 'ACTIVE',
  DRAFT: 'DRAFT',
  DEPRECATED: 'DEPRECATED',
};

const plan = {
  christmas: {
    id: 'clgkisla0000108mefl1l4ahh',
    name: 'christmas',
    internalName: 'christmas_deprecated',
    status: PlanStatus.DEPRECATED,
    public: true,
    serviceFeePercentage: 2.5,
    validFrom: DateTime.fromISO('2022-12-23').toJSDate(),
    validTo: DateTime.fromISO('2022-12-24').toJSDate(),
    createdAt: DateTime.fromISO('2022-12-23T08:05:13.641Z').toJSDate(),
    updatedAt: DateTime.fromISO('2022-12-23T08:05:13.641Z').toJSDate(),
  },
  basic: {
    id: 'clgkitoi1000208meeu4h0u1o',
    name: 'basic',
    internalName: 'internal_basic',
    status: PlanStatus.ACTIVE,
    public: true,
    serviceFeePercentage: 3.555,
    validFrom: DateTime.fromISO('2023-03-24').toJSDate(),
    validTo: DateTime.fromISO('2023-03-27').toJSDate(),
    createdAt: DateTime.fromISO('2023-03-23T08:05:13.641Z').toJSDate(),
    updatedAt: DateTime.fromISO('2023-03-23T08:05:13.641Z').toJSDate(),
  },
  vipPrivate: {
    id: 'clgkiu24g000308me1owkf9wn',
    name: 'vip',
    internalName: 'internal_vip_private',
    status: PlanStatus.ACTIVE,
    public: false,
    serviceFeePercentage: 2.023,
    validFrom: DateTime.fromISO('2023-03-24').toJSDate(),
    validTo: DateTime.fromISO('2023-03-27').toJSDate(),
    createdAt: DateTime.fromISO('2023-03-23T09:05:13.641Z').toJSDate(),
    updatedAt: DateTime.fromISO('2023-03-23T09:05:13.641Z').toJSDate(),
  },
  premium: {
    id: 'clgkiu962000408me31edakjn',
    name: 'premium',
    internalName: 'internal_premium_draft',
    status: PlanStatus.DRAFT,
    public: true,
    serviceFeePercentage: 3.029,
    validFrom: DateTime.fromISO('2023-03-24').toJSDate(),
    validTo: DateTime.fromISO('2023-03-27').toJSDate(),
    createdAt: DateTime.fromISO('2023-03-23T10:05:13.641Z').toJSDate(),
    updatedAt: DateTime.fromISO('2023-03-23T10:05:13.641Z').toJSDate(),
  },
  campaign: {
    id: 'clgkiufzy000508me17al96u6',
    name: 'campaign',
    internalName: 'internal_campaign_future',
    status: PlanStatus.ACTIVE,
    public: true,
    serviceFeePercentage: 3.333,
    validFrom: DateTime.fromISO('2023-03-29').toJSDate(),
    validTo: DateTime.fromISO('2023-03-31').toJSDate(),
    createdAt: DateTime.fromISO('2023-03-23T11:05:13.641Z').toJSDate(),
    updatedAt: DateTime.fromISO('2023-03-23T11:05:13.641Z').toJSDate(),
  },
};

const billingPlans = {
  free: {
    id: 'clgkisla0000108mefl1l4ahh',
    name: 'Free',
    version: 1,
    isActive: true,
    price: 0.0,
    billingPartnerId: null,
    disabledAt: null,
    planLevel: 'FREE',
    isPublicPlan: true,
    description: 'Free plan, no credit card required',
    createdAt: DateTime.fromISO('2024-03-11T08:05:13.641Z').toJSDate(),
    updatedAt: DateTime.fromISO('2024-03-11T08:05:13.641Z').toJSDate(),
  },
};

const billing = {
  plan,
  billingPlans,
};

const project = {
  vegetableCo: {
    id: 'clgkivku7000a08me9coi0civ',
    name: 'vegetableCo',
    planId: billing.plan.basic.id,
    billingPlanId: billing.billingPlans.free.id,
    avatarCid: '3b893b0517bda6895a160fa9a0cba76da382859d',
    createdAt: DateTime.fromISO('2023-03-20T08:05:13.641Z').toJSDate(),
    updatedAt: DateTime.fromISO('2023-03-20T08:05:13.641Z').toJSDate(),
    backupStorageOnArweave: false,
    backupStorageOnFilecoin: false,
    allowAccessFromOfacCountries: true,
    status: 'CREATED',
    deletedAt: null,
  },
  vegetableLtd: {
    id: 'clmjalnal000008l343fz7ips',
    name: 'vegetableLtd',
    avatarCid: null,
    planId: null,
    billingPlanId: billing.billingPlans.free.id,
    createdAt: DateTime.fromISO('2023-02-23T08:05:13.641Z').toJSDate(),
    updatedAt: DateTime.fromISO('2023-03-20T08:05:13.641Z').toJSDate(),
    backupStorageOnArweave: false,
    backupStorageOnFilecoin: false,
    allowAccessFromOfacCountries: true,
    status: 'DELETING',
    deletedAt: DateTime.fromISO('2023-03-20T08:05:13.641Z').toJSDate(),
  },
  electronicCo: {
    id: 'clgkiwjd8000c08mefyco2eoo',
    name: 'electronicCo',
    avatarCid: null,
    planId: billing.plan.basic.id,
    billingPlanId: billing.billingPlans.free.id,
    createdAt: DateTime.fromISO('2023-03-23T08:05:13.641Z').toJSDate(),
    updatedAt: DateTime.fromISO('2023-03-23T08:05:13.641Z').toJSDate(),
    backupStorageOnArweave: false,
    backupStorageOnFilecoin: false,
    allowAccessFromOfacCountries: true,
    status: 'CREATED',
    deletedAt: null,
  },
  electronicLtd: {
    id: 'clgukvjww000108kw2h8n09nx',
    name: 'electronicLtd',
    avatarCid: null,
    planId: billing.plan.basic.id,
    billingPlanId: billing.billingPlans.free.id,
    createdAt: DateTime.fromISO('2023-03-30T08:05:13.641Z').toJSDate(),
    updatedAt: DateTime.fromISO('2023-03-30T08:05:13.641Z').toJSDate(),
    backupStorageOnArweave: false,
    backupStorageOnFilecoin: false,
    allowAccessFromOfacCountries: true,
    status: 'CREATED',
    deletedAt: null,
  },
  butcherCo: {
    id: 'clmynnltk0000ma08i44ie984',
    name: 'butcherCo',
    avatarCid: null,
    planId: billing.plan.basic.id,
    billingPlanId: billing.billingPlans.free.id,
    createdAt: DateTime.fromISO('2023-03-30T08:05:13.641Z').toJSDate(),
    updatedAt: DateTime.fromISO('2023-03-30T08:05:13.641Z').toJSDate(),
    backupStorageOnArweave: false,
    backupStorageOnFilecoin: false,
    allowAccessFromOfacCountries: true,
    status: 'CREATED',
    deletedAt: null,
  },
  dreamTeam: {
    id: 'clt5ter6y000008jxd9lp8vez',
    name: 'dreamTeam',
    avatarCid: null,
    planId: billing.plan.basic.id,
    billingPlanId: billing.billingPlans.free.id,
    createdAt: DateTime.fromISO('2024-01-04T12:05:13.641Z').toJSDate(),
    updatedAt: DateTime.fromISO('2024-01-04T12:05:13.641Z').toJSDate(),
    backupStorageOnArweave: false,
    backupStorageOnFilecoin: false,
    allowAccessFromOfacCountries: true,
    status: 'CREATED',
    deletedAt: null,
  },
};

export const application = {
  electronicCoWebApp: {
    id: 'cli2ymucu000108l81grqhzcp',
    name: 'electronicCoWebApp',
    clientId: 'client_ZRacrn3b1ForrjK5u8VD',
    projectId: project.electronicCo.id,
    createdAt: DateTime.fromISO('2023-03-23T11:05:13.641Z').toJSDate(),
    updatedAt: DateTime.fromISO('2023-03-23T11:05:13.641Z').toJSDate(),
  },
  electronicCoMobileApp: {
    id: 'cli2ymypd000208l86gjd6p17',
    name: 'electronicCoMobileApp',
    clientId: 'client_SCmayempJ1d953yjn1yx',
    projectId: project.electronicCo.id,
    createdAt: DateTime.fromISO('2023-03-23T12:05:13.641Z').toJSDate(),
    updatedAt: DateTime.fromISO('2023-03-23T12:05:13.641Z').toJSDate(),
  },
};

export const auth = {
  project,
  application,
};

export const commitHash = '0fabad88415cedb2c3c21548afa14a949a088954';

export default {
  auth,
};
