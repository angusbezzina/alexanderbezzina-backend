import { ListAccessArgs } from './types';
import { permissionsList } from './schemas/fields';

// At its simplest, the access control returns a yes or a no value depending on the users session

export function isSignedIn({ session }: ListAccessArgs) {
  return !!session;
}

const generatedPermissions = Object.fromEntries(
  permissionsList.map((permission) => [
    permission,
    function ({ session }: ListAccessArgs) {
      return !!session?.data.role?.[permission];
    },
  ])
);

// Permissions check, if someone meets a criteria (yes or no)
export const permissions = {
  ...generatedPermissions,
};

// Rule based functions

// Rules can return a boolean or a filter, which limits which products they can CRUD
export const rules = {
  canManageProducts({ session }: ListAccessArgs) {
    if (!isSignedIn({ session })) {
      return false;
    }

    // 1. Do they have the permission of canManageProducts?
    if (permissions.canManageProducts({ session })) {
      return true;
    }

    // 2. If not, do they own this item?
    return { user: { id: session?.itemId } };
  },
  canOrder({ session }: ListAccessArgs) {
    if (!isSignedIn({ session })) {
      return false;
    }

    // 1. Do they have the permission of canManageCart?
    if (permissions.canManageCart({ session })) {
      return true;
    }

    // 2. If not, do they own this item?
    return { user: { id: session?.itemId } };
  },
  canManageOrderItems({ session }: ListAccessArgs) {
    if (!isSignedIn({ session })) {
      return false;
    }

    // 1. Do they have the permission of canManageCart?
    if (permissions.canManageCart({ session })) {
      return true;
    }

    // 2. If not, do they own this item?
    return { order: { user: { id: session?.itemId } } };
  },
  canReadProducts({ session }: ListAccessArgs) {
    if (!isSignedIn({ session })) {
      return false;
    }

    // 1. Do they have the permission of canReadProducts?
    if (permissions.canManageProducts({ session })) {
      return true;
    }

    // 2. If not, they should only see available products
    return { status: 'AVAILABLE' };
  },
  canManageUsers({ session }: ListAccessArgs) {
    if (!isSignedIn({ session })) {
      return false;
    }

    // 1. Do they have the permission of canManageUsers?
    if (permissions.canManageUsers({ session })) {
      return true;
    }

    // 2. If not, they may only update themselves
    return { user: { id: session?.itemId } };
  },
};
