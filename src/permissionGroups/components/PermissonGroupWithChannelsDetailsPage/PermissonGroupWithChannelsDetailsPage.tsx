// @ts-strict-ignore
import { useUser } from "@dashboard/auth";
import AccountPermissions from "@dashboard/components/AccountPermissions";
import { TopNav } from "@dashboard/components/AppLayout/TopNav";
import { ChannelPermission } from "@dashboard/components/ChannelPermission";
import Form from "@dashboard/components/Form";
import FormSpacer from "@dashboard/components/FormSpacer";
import { DetailPageLayout } from "@dashboard/components/Layouts";
import Savebar from "@dashboard/components/Savebar";
import {
  ChannelFragment,
  PermissionEnum,
  PermissionGroupDetailsFragment,
  PermissionGroupErrorFragment,
  UserPermissionFragment,
} from "@dashboard/graphql";
import { PermissionGroupWithContextDetailsFragment } from "@dashboard/graphql/types.channelPermissions.generated";
import { FormChange, SubmitPromise } from "@dashboard/hooks/useForm";
import useNavigator from "@dashboard/hooks/useNavigator";
import { buttonMessages } from "@dashboard/intl";
import {
  MembersListUrlSortField,
  permissionGroupListUrl,
} from "@dashboard/permissionGroups/urls";
import { ListActions, SortPage } from "@dashboard/types";
import { getFormErrors } from "@dashboard/utils/errors";
import getPermissionGroupErrorMessage from "@dashboard/utils/errors/permissionGroups";
import { Box } from "@saleor/macaw-ui/next";
import React from "react";
import { useIntl } from "react-intl";

import {
  checkIfUserHasRestictedChannels,
  extractPermissionCodes,
  getChannelsOptions,
  getInitialChannels,
  isGroupFullAccess,
} from "../../utils";
import PermissionGroupInfo from "../PermissionGroupInfo";
import PermissionGroupMemberList from "../PermissionGroupMemberList";

export interface PermissionGroupWithChannelsDetailsPageFormData {
  name: string;
  hasFullAccess: boolean;
  hasAllChannels: boolean;
  isActive: boolean;
  permissions: PermissionEnum[];
  users: PermissionGroupDetailsFragment["users"];
  channels: string[];
}

export interface PermissionWithChannelsData
  extends Omit<UserPermissionFragment, "__typename"> {
  lastSource?: boolean;
  disabled?: boolean;
}

export interface PermissonGroupWithChannelsDetailsPageProps
  extends ListActions,
    SortPage<MembersListUrlSortField> {
  channels: ChannelFragment[];
  disabled: boolean;
  isUserAbleToEditChannesl: boolean;
  errors: PermissionGroupErrorFragment[];
  members: PermissionGroupDetailsFragment["users"];
  permissionGroup: PermissionGroupWithContextDetailsFragment;
  permissions: PermissionWithChannelsData[];
  permissionsExceeded: boolean;
  saveButtonBarState: "loading" | "success" | "error" | "default";
  onAssign: () => void;
  onUnassign: (ids: string[]) => void;
  onSubmit: (
    data: PermissionGroupWithChannelsDetailsPageFormData,
  ) => SubmitPromise;
}

export const PermissonGroupWithChannelsDetailsPage: React.FC<
  PermissonGroupWithChannelsDetailsPageProps
> = ({
  disabled,
  errors,
  members,
  onSubmit,
  permissionGroup,
  permissions,
  permissionsExceeded,
  saveButtonBarState,
  channels,
  isUserAbleToEditChannesl,
  ...listProps
}) => {
  const intl = useIntl();
  const navigate = useNavigator();
  const user = useUser();

  const channelsOptions = getChannelsOptions(channels, user.user);
  const hasUserRestrictedChannels = checkIfUserHasRestictedChannels(user.user);

  const initialForm: PermissionGroupWithChannelsDetailsPageFormData = {
    hasFullAccess: isGroupFullAccess(permissionGroup, permissions),
    hasAllChannels: !permissionGroup?.restrictedAccessToChannels ?? false,
    channels: getInitialChannels(permissionGroup, channels?.length ?? 0),
    isActive: false,
    name: permissionGroup?.name || "",
    permissions: extractPermissionCodes(permissionGroup),
    users: members,
  };

  const formErrors = getFormErrors(["addPermissions"], errors);
  const permissionsError = getPermissionGroupErrorMessage(
    formErrors.addPermissions,
    intl,
  );

  return (
    <Form confirmLeave initial={initialForm} onSubmit={onSubmit}>
      {({ data, change, submit }) => {
        const handleChannelChange: FormChange = event => {
          change({
            target: {
              name: "channels",
              value: event.target.value,
            },
          });
        };

        const handleHasAllChannelsChange = () => {
          change({
            target: {
              name: "hasAllChannels",
              value: !data.hasAllChannels,
            },
          });
        };

        return (
          <DetailPageLayout>
            <TopNav
              href={permissionGroupListUrl()}
              title={permissionGroup?.name}
            />
            <DetailPageLayout.Content>
              <PermissionGroupInfo
                data={data}
                disabled={disabled}
                errors={errors}
                onChange={change}
              />
              {channelsOptions.length > 0 && (
                <>
                  <FormSpacer />
                  <Box paddingX={9}>
                    <ChannelPermission
                      allChannels={
                        // I pass all channels because Multiselect components based on ids,
                        // and need data that will take information about channel
                        !isUserAbleToEditChannesl ? channels : channelsOptions
                      }
                      hasAllChannels={data.hasAllChannels}
                      selectedChannels={data.channels}
                      onHasAllChannelsChange={handleHasAllChannelsChange}
                      onChannelChange={handleChannelChange}
                      disabled={!isUserAbleToEditChannesl}
                      disabledSelectAllChannels={hasUserRestrictedChannels}
                    />
                  </Box>
                </>
              )}

              <FormSpacer />
              <PermissionGroupMemberList
                disabled={disabled}
                {...listProps}
                users={data?.users || []}
              />
            </DetailPageLayout.Content>
            <DetailPageLayout.RightSidebar>
              <AccountPermissions
                permissionsExceeded={permissionsExceeded}
                data={data}
                disabled={disabled}
                permissions={permissions}
                onChange={change}
                errorMessage={permissionsError}
                fullAccessLabel={intl.formatMessage(buttonMessages.selectAll)}
                description={intl.formatMessage({
                  id: "CYZse9",
                  defaultMessage:
                    "Expand or restrict group's permissions to access certain part of saleor system.",
                  description: "card description",
                })}
              />
            </DetailPageLayout.RightSidebar>
            <div>
              <Savebar
                onCancel={() => navigate(permissionGroupListUrl())}
                onSubmit={submit}
                state={saveButtonBarState}
                disabled={disabled}
              />
            </div>
          </DetailPageLayout>
        );
      }}
    </Form>
  );
};
