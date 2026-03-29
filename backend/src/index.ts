import type { Core } from '@strapi/strapi';
import seed from './seed';

async function setPublicPermissions(strapi: Core.Strapi) {
  // Find the public role
  const publicRole = await strapi.db.query('plugin::users-permissions.role').findOne({
    where: { type: 'public' },
  });

  if (!publicRole) {
    console.warn('Public role not found, skipping permissions setup');
    return;
  }

  // Define which content types should be publicly readable
  const contentTypes = [
    'api::page.page',
    'api::blog-post.blog-post',
    'api::agency.agency',
    'api::service-category.service-category',
    'api::trust-partner.trust-partner',
    'api::global.global',
  ];

  for (const uid of contentTypes) {
    const actions = ['find', 'findOne'];
    for (const action of actions) {
      // Check if permission already exists
      const existing = await strapi.db.query('plugin::users-permissions.permission').findOne({
        where: {
          role: publicRole.id,
          action: `${uid}.${action}`,
        },
      });

      if (!existing) {
        await strapi.db.query('plugin::users-permissions.permission').create({
          data: {
            role: publicRole.id,
            action: `${uid}.${action}`,
            enabled: true,
          },
        });
      }
    }
  }

  console.log('🔓 Public API permissions configured');
}

export default {
  register(/* { strapi }: { strapi: Core.Strapi } */) {},

  async bootstrap({ strapi }: { strapi: Core.Strapi }) {
    await seed({ strapi });
    await setPublicPermissions(strapi);
  },
};
