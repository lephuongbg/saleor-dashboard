// @ts-strict-ignore
import {
  extensionMountPoints,
  mapToMenuItems,
  mapToMenuItemsForCustomerOverviewActions,
  useExtensions,
} from "@dashboard/apps/hooks/useExtensions";
import { useUserPermissions } from "@dashboard/auth/hooks/useUserPermissions";
import { ListFilters } from "@dashboard/components/AppLayout/ListFilters";
import { TopNav } from "@dashboard/components/AppLayout/TopNav";
import { ButtonWithDropdown } from "@dashboard/components/ButtonWithDropdown";
import { FilterPresetsSelect } from "@dashboard/components/FilterPresetsSelect";
import { Customers } from "@dashboard/customers/types";
import {
  customerAddUrl,
  CustomerListUrlSortField,
  customerUrl,
} from "@dashboard/customers/urls";
import useNavigator from "@dashboard/hooks/useNavigator";
import { sectionNames } from "@dashboard/intl";
import { FilterPageProps, PageListProps, SortPage } from "@dashboard/types";
import { Box, Button, ChevronRightIcon } from "@saleor/macaw-ui/next";
import React, { useState } from "react";
import { FormattedMessage, useIntl } from "react-intl";

import { CustomerListDatagrid } from "../CustomerListDatagrid/CustomerListDatagrid";
import { CustomerListDeleteButton } from "../CustomerListDeleteButton";
import {
  createFilterStructure,
  CustomerFilterKeys,
  CustomerListFilterOpts,
} from "./filters";

export interface CustomerListPageProps
  extends PageListProps,
    Omit<
      FilterPageProps<CustomerFilterKeys, CustomerListFilterOpts>,
      "onTabDelete"
    >,
    SortPage<CustomerListUrlSortField> {
  customers: Customers;
  selectedCustomerIds: string[];
  onTabUpdate: (tabName: string) => void;
  loading: boolean;
  hasPresetsChange: () => boolean;
  onSelectCustomerIds: (rows: number[], clearSelection: () => void) => void;
  onCustomersDelete: () => void;
  onTabDelete: (id: number) => void;
}

const CustomerListPage: React.FC<CustomerListPageProps> = ({
  currentTab,
  filterOpts,
  initialSearch,
  onAll,
  onFilterChange,
  onSearchChange,
  onTabChange,
  onTabDelete,
  onTabSave,
  onTabUpdate,
  tabs,
  selectedCustomerIds,
  hasPresetsChange,
  onCustomersDelete,
  ...customerListProps
}) => {
  const intl = useIntl();
  const navigate = useNavigator();

  const userPermissions = useUserPermissions();
  const structure = createFilterStructure(intl, filterOpts, userPermissions);
  const [isFilterPresetOpen, setFilterPresetOpen] = useState(false);

  const { CUSTOMER_OVERVIEW_CREATE, CUSTOMER_OVERVIEW_MORE_ACTIONS } =
    useExtensions(extensionMountPoints.CUSTOMER_LIST);
  const extensionMenuItems = mapToMenuItemsForCustomerOverviewActions(
    CUSTOMER_OVERVIEW_MORE_ACTIONS,
    selectedCustomerIds,
  );
  const extensionCreateButtonItems = mapToMenuItems(CUSTOMER_OVERVIEW_CREATE);

  return (
    <>
      <TopNav
        title={intl.formatMessage(sectionNames.customers)}
        withoutBorder
        isAlignToRight={false}
      >
        <Box
          __flex={1}
          display="flex"
          justifyContent="space-between"
          alignItems="center"
        >
          <Box display="flex">
            <Box marginX={5} display="flex" alignItems="center">
              <ChevronRightIcon />
            </Box>
            <FilterPresetsSelect
              presetsChanged={hasPresetsChange()}
              onSelect={onTabChange}
              onRemove={onTabDelete}
              onUpdate={onTabUpdate}
              savedPresets={tabs}
              activePreset={currentTab}
              onSelectAll={onAll}
              onSave={onTabSave}
              isOpen={isFilterPresetOpen}
              onOpenChange={setFilterPresetOpen}
              selectAllLabel={intl.formatMessage({
                id: "D95l71",
                defaultMessage: "All customers",
                description: "tab name",
              })}
            />
          </Box>
          <Box display="flex" alignItems="center" gap={2}>
            {extensionMenuItems.length > 0 && (
              <TopNav.Menu items={extensionMenuItems} />
            )}
            {extensionCreateButtonItems.length > 0 ? (
              <ButtonWithDropdown
                options={extensionCreateButtonItems}
                data-test-id="create-customer"
                onClick={() => navigate(customerAddUrl)}
              >
                <FormattedMessage
                  id="QLVddq"
                  defaultMessage="Create customer"
                  description="button"
                />
              </ButtonWithDropdown>
            ) : (
              <Button
                data-test-id="create-customer"
                onClick={() => navigate(customerAddUrl)}
              >
                <FormattedMessage
                  id="QLVddq"
                  defaultMessage="Create customer"
                  description="button"
                />
              </Button>
            )}
          </Box>
        </Box>
      </TopNav>
      <Box>
        <ListFilters
          filterStructure={structure}
          initialSearch={initialSearch}
          searchPlaceholder={intl.formatMessage({
            id: "kdRcqU",
            defaultMessage: "Search customers...",
          })}
          onFilterChange={onFilterChange}
          onSearchChange={onSearchChange}
          actions={
            <Box display="flex" gap={4}>
              {selectedCustomerIds.length > 0 && (
                <CustomerListDeleteButton onClick={onCustomersDelete}>
                  <FormattedMessage
                    defaultMessage="Delete customers"
                    id="kFsTMN"
                  />
                </CustomerListDeleteButton>
              )}
            </Box>
          }
        />
        <CustomerListDatagrid
          {...customerListProps}
          hasRowHover={!isFilterPresetOpen}
          rowAnchor={customerUrl}
          onRowClick={id => navigate(customerUrl(id))}
        />
      </Box>
    </>
  );
};
CustomerListPage.displayName = "CustomerListPage";
export default CustomerListPage;
