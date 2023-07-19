import { UserContext } from "@dashboard/auth/types";
import { MultiAutocompleteChoiceType } from "@dashboard/components/MultiAutocompleteSelectField";
import {
  ChannelFragment,
  PermissionFragment,
  PermissionGroupDetailsFragment,
  UserFragment,
} from "@dashboard/graphql";
import difference from "lodash/difference";

import { PermissionGroupDetailsPageFormData } from "./components/PermissonGroupDetailsPage";
/**
 * Will return true if group has all permissions available in shop assigned.
 */
export const isGroupFullAccess = (
  permissionGroup: PermissionGroupDetailsFragment | null | undefined,
  shopPermissions: Array<Omit<PermissionFragment, "__typename">>,
) => {
  if (!permissionGroup) {
    return false;
  }
  const assignedCodes = extractPermissionCodes(permissionGroup);

  if (assignedCodes.length !== shopPermissions?.length) {
    return false;
  }

  for (const permission of shopPermissions) {
    if (assignedCodes.indexOf(permission.code) === undefined) {
      return false;
    }
  }
  return true;
};

/**
 * Return list of codes which are assigned to the permission group.
 */
export const extractPermissionCodes = (
  permissionGroup: PermissionGroupDetailsFragment | null | undefined,
) => {
  if (!permissionGroup) {
    return [];
  }

  return permissionGroup?.permissions
    ? permissionGroup.permissions.map(perm => perm.code)
    : [];
};

/**
 * Return lists of permissions which have to be added and removed from group.
 */
export const permissionsDiff = (
  permissionGroup: PermissionGroupDetailsFragment | null | undefined,
  formData: PermissionGroupDetailsPageFormData,
) => {
  if (!permissionGroup) {
    return {
      addPermissions: [],
      removePermissions: [],
    };
  }

  const newPermissions = formData.permissions;
  const oldPermissions = extractPermissionCodes(permissionGroup);

  return {
    addPermissions: difference(newPermissions, oldPermissions),
    removePermissions: difference(oldPermissions, newPermissions),
  };
};

/**
 * Return lists of users which have to be added and removed from group.
 */
export const usersDiff = (
  permissionGroup: PermissionGroupDetailsFragment | null | undefined,
  formData: PermissionGroupDetailsPageFormData,
) => {
  if (!permissionGroup) {
    return {
      addUsers: [],
      removeUsers: [],
    };
  }

  const newUsers = formData?.users?.map(u => u.id) ?? [];
  const oldUsers = permissionGroup?.users?.map(u => u.id) ?? [];

  return {
    addUsers: difference(newUsers, oldUsers),
    removeUsers: difference(oldUsers, newUsers),
  };
};

/**
 * Return lists of channels which have to be added and removed from group.
 */
export const channelsDiff = (
  permissionGroup: PermissionGroupDetailsFragment | null | undefined,
  formData: PermissionGroupDetailsPageFormData,
  allChannels: ChannelFragment[],
  isUserAbleToEdit: boolean,
) => {
  if (!permissionGroup) {
    return {
      addChannels: [],
      removeChannels: [],
    };
  }

  const newChannels = formData.hasAllChannels
    ? allChannels.map(c => c.id)
    : formData.channels;
  const oldChannels = permissionGroup?.accessibleChannels?.map(c => c.id) ?? [];
  const hasRestrictedChannels =
    permissionGroup?.restrictedAccessToChannels ?? [];

  if (!isUserAbleToEdit) {
    return {
      addChannels: [],
      removeChannels: [],
    };
  }

  if (!hasRestrictedChannels) {
    return {
      addChannels: newChannels,
      removeChannels: [],
    };
  }

  return {
    addChannels: difference(newChannels, oldChannels),
    removeChannels: difference(oldChannels, newChannels),
  };
};

/**
 * Permissions are exceeded when group has permission which is not handled by user
 */
export const arePermissionsExceeded = (
  permissionGroup: PermissionGroupDetailsFragment | null | undefined,
  user: UserFragment | null | undefined,
) => {
  if (!permissionGroup || !user) {
    return false;
  }

  const groupPermissions = extractPermissionCodes(permissionGroup);
  const userPermissions = user?.userPermissions?.map(p => p.code) ?? [];
  return difference(groupPermissions, userPermissions).length > 0;
};

/**
 * Return lists of permission group accessible channels.
 */
export const mapAccessibleChannelsToChoice = (
  permissionGroup: PermissionGroupDetailsFragment,
  isUserAbleToEdit?: boolean,
): MultiAutocompleteChoiceType[] =>
  permissionGroup?.accessibleChannels?.map(
    channel =>
      ({
        label: channel.name,
        value: channel.id,
        disabled: isUserAbleToEdit !== undefined ? !isUserAbleToEdit : false,
      } as unknown as MultiAutocompleteChoiceType),
  ) ?? [];

/**
 * User is eligible to edit channels when he has access to all channels in permission group.
 */
export const checkIfUserIsEligibleToEditChannels = (
  user: UserContext["user"],
  permissionGroupAccessibleChannels: ChannelFragment[],
) => {
  const userChannels = getUserAccessibleChannels(user)?.map(c => c.id) ?? [];

  if (userChannels.length === 0) {
    return true;
  }

  return permissionGroupAccessibleChannels.every(permChan =>
    userChannels.includes(permChan.id),
  );
};

/**
 * Get channels options for select field.
 */
export const getChannelsOptions = (
  availableChannels: ChannelFragment[],
  user?: UserContext["user"],
): ChannelFragment[] => {
  if (!user) {
    return availableChannels;
  }

  if (
    "restrictedAccessToChannels" in user &&
    !user.restrictedAccessToChannels
  ) {
    return availableChannels;
  }

  if ("accessibleChannels" in user && user.accessibleChannels !== null) {
    return user.accessibleChannels;
  }

  return availableChannels;
};

/**
 * Check if user has restricted access to channels.
 */
export const checkIfUserHasRestictedChannels = (user?: UserContext["user"]) => {
  if (user && "restrictedAccessToChannels" in user) {
    return user.restrictedAccessToChannels;
  }

  return false;
};

/**
 * Get user accessible channels.
 */
const getUserAccessibleChannels = (user?: UserContext["user"] | null) => {
  if (user && "accessibleChannels" in user) {
    return user.accessibleChannels;
  }

  return [];
};

export const getInitialChannels = (
  permissionGroup: PermissionGroupDetailsFragment | null | undefined,
  allChannelsLength: number,
) => {
  if (!permissionGroup) {
    return [];
  }

  if (
    !permissionGroup?.restrictedAccessToChannels &&
    permissionGroup?.accessibleChannels?.length === allChannelsLength
  ) {
    return [];
  }

  return permissionGroup?.accessibleChannels?.map(channel => channel.id) ?? [];
};
