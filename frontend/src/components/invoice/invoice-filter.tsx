import cn from "classnames";
import Label from "@components/ui/label";
import { EStatus } from "@types";
import { ActionMeta } from "react-select";
import { DatePicker, Space } from "antd";
import Select from "@components/ui/select/select";

type Props = {
  className?: string;
  onFGStatusFilter?: (newValue: any, actionMeta: ActionMeta<unknown>) => void;
  onFinanceStatusFilter?: (
    newValue: any,
    actionMeta: ActionMeta<unknown>
  ) => void;
    onDateRangeFilter?: (dates: [Date | null, Date | null]) => void;

  enableDateRange?: boolean;
  enableFGStatus?: boolean;
  enableFinanceStatus?: boolean;
};

export default function InvoiceFilter({
  className,
  onFGStatusFilter,
  onFinanceStatusFilter,
    onDateRangeFilter,
  enableDateRange,
  enableFGStatus,
  enableFinanceStatus,
}: Props) {
  const { RangePicker } = DatePicker;

    const handleDateChange = (
    dates: [Date, Date],
    dateStrings: [string, string],
  ) => {
    // Call the onDateRangeFilter callback if provided
    if (onDateRangeFilter) {
      onDateRangeFilter(dates);
    }
  };

  const fgStatusOptions = [
    { name: "Pending", value: EStatus.PENDING },
    { name: "Completed", value: EStatus.COMPLETED },
  ];
  const financeStatusOptions = [
    { name: "Pending", value: EStatus.PENDING },
    { name: "Completed", value: EStatus.COMPLETED },
  ];

  return (
    <div
      className={cn(
        "flex w-full flex-col space-y-5 rtl:space-x-reverse md:flex-row md:items-end md:space-x-5 md:space-y-0",
        className
      )}
    >
      {enableFGStatus && (
        <div className="w-full">
          <Label>FG Status</Label>
          <Select
            options={fgStatusOptions}
            getOptionLabel={(option: any) => option.name}
            getOptionValue={(option: any) => option.value}
            // placeholder={t("common:filter-by-group-placeholder")}
            onChange={onFGStatusFilter}
            isClearable={true}
          />
        </div>
      )}
      {enableFinanceStatus && (
        <div className="w-full">
          <Label>Finance Status</Label>
          <Select
            options={financeStatusOptions}
            getOptionLabel={(option: any) => option.name}
            getOptionValue={(option: any) => option.value}
            // placeholder={t("common:filter-by-group-placeholder")}
            onChange={onFinanceStatusFilter}
            isClearable={true}
          />
        </div>
      )}
      {enableDateRange && (
        <div className="w-full">
          <Label>CreatedAt</Label>
          <Space direction="vertical">
            <RangePicker
              // @ts-ignore
              onChange={handleDateChange}
              className="h-12"
            />
          </Space>
        </div>
      )}
    </div>
  );
}
