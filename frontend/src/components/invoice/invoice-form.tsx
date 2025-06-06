import { Controller, useForm } from "react-hook-form";
import Input from "@components/form/input/InputField";
import Label from "@components/form/Label";
import Button from "@components/ui/button/Button";
import { ERole, Invoice, EStatus, ERequestType } from "@types";
import SelectInput from "@components/form/select-input";
import { useAuth } from "../../context/AuthContext";
import { useCreateRequestMutation } from "@data/request";
import { useUpdateInvoiceMutation } from "@data/invoice";

type FormValues = {
  invoiceNumber: string;
  value: number;
  fgsStatus: EStatus;
  financeStatus: EStatus;
  remarks: string;
};

const defaultValues = {
  invoiceNumber: "",
  value: "",
  fgsStatus: "",
  financeStatus: "",
};

const invoiceStatus = [
  { label: "Pending", value: EStatus.PENDING },
  { label: "Completed", value: EStatus.COMPLETED },
];

interface Props {
  initialValues?: Invoice;
}

export default function CreateOrUpdateInvoiceForm({ initialValues }: Props) {
  const { user } = useAuth();

  const { mutate: createRequest, isLoading: creating } =
    useCreateRequestMutation();
  const { mutate: updateInvoice, isLoading: updating } =
    useUpdateInvoiceMutation();

  const {
    control,
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormValues>({
    // @ts-ignore
    defaultValues: initialValues
      ? {
          ...initialValues,
        }
      : defaultValues,
    //@ts-ignore
    // resolver: yupResolver(validationSchema),
  });

  const onSubmit = async (values: FormValues) => {
    const input = {
      invoiceNumber: values.invoiceNumber,
      value: values.value,
      fgsStatus: values.fgsStatus,
      financeStatus: values.financeStatus,
      remarks: values.remarks,
    };

    if (initialValues) {
      updateInvoice({ ...input, id: initialValues.id });
    }
  };

  const enableFGStatusEdit = (): boolean => {
    const fgsStatus = watch("fgsStatus");
    const financeStatus = watch("financeStatus");

    return (
      user?.roles?.includes(ERole.ROLE_FINISH_GOOD) &&
      !(fgsStatus == EStatus.COMPLETED && financeStatus == EStatus.COMPLETED)
    );
  };

  const enableFinanceStatusEdit = (): boolean => {
    const fgsStatus = watch("fgsStatus");
    const financeStatus = watch("financeStatus");

    return (
      user?.roles?.includes(ERole.ROLE_FINANCE) &&
      !(fgsStatus == EStatus.COMPLETED && financeStatus == EStatus.COMPLETED)
    );
  };

  const showEditButton = (): boolean => {
    return (
      user?.roles?.includes(ERole.ROLE_FINISH_GOOD) ||
      user?.roles?.includes(ERole.ROLE_FINANCE)
    );
  };

  const showRequestEditFgStatusButton = (): boolean => {
    return (
      user?.roles?.includes(ERole.ROLE_FINISH_GOOD_HEAD) &&
      initialValues?.fgsStatus == EStatus.COMPLETED
    );
  };

  const showRequestEditFinanceStatusButton = (): boolean => {
    return (
      user?.roles?.includes(ERole.ROLE_FINANCE_HEAD) &&
      initialValues?.financeStatus == EStatus.COMPLETED
    );
  };

  const handleRequestEditFgStatus = () => {
    if (initialValues) {
      const input = {
        invoiceId: initialValues?.id,
        requestType: ERequestType.FG_REQUEST,
      };
      createRequest(input);
    }
  };

  const handleRequestEditFinanceStatus = () => {
    if (initialValues) {
      const input = {
        invoiceId: initialValues?.id,
        requestType: ERequestType.FINANCE_REQUEST,
      };
      createRequest(input);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="space-y-6">
          <div>
            <Label>
              Inovice Number <span className="text-error-500">*</span>{" "}
            </Label>
            <Input
              disabled
              placeholder="Inovice Number"
              {...register("invoiceNumber")}
              errorMessage={errors.invoiceNumber?.message!}
            />
          </div>
          <div>
            <Label>
              Value <span className="text-error-500">*</span>{" "}
            </Label>
            <Input
              disabled
              placeholder="Value"
              {...register("value")}
              errorMessage={errors.value?.message!}
            />
          </div>
          <div>
            <Label>
              FG(Status) <span className="text-error-500">*</span>
            </Label>
            <Controller
              name="fgsStatus"
              control={control}
              rules={{ required: "Role is required" }}
              render={({ field }) => (
                <SelectInput
                  disabled={!enableFGStatusEdit()}
                  options={invoiceStatus}
                  placeholder="Select Option"
                  value={field.value}
                  onChange={field.onChange}
                  className="dark:bg-dark-900"
                />
              )}
            />
            {errors.fgsStatus && (
              <p className="text-error-500 text-sm mt-1">
                {errors.fgsStatus.message}
              </p>
            )}
          </div>
          <div>
            <Label>
              Finance(Status) <span className="text-error-500">*</span>
            </Label>
            <Controller
              name="financeStatus"
              control={control}
              rules={{ required: "Role is required" }}
              render={({ field }) => (
                <SelectInput
                  disabled={!enableFinanceStatusEdit()}
                  options={invoiceStatus}
                  placeholder="Select Option"
                  value={field.value}
                  onChange={field.onChange}
                  className="dark:bg-dark-900"
                />
              )}
            />
            {errors.financeStatus && (
              <p className="text-error-500 text-sm mt-1">
                {errors.financeStatus.message}
              </p>
            )}
          </div>
          <div>
            <Label>Remarks</Label>
            <Input
              // placeholder="Inovice Number"
              {...register("remarks")}
              errorMessage={errors.remarks?.message!}
            />
          </div>
          {showEditButton() && (
            <Button size="sm">
              {initialValues ? "Update" : "Create"} Invoice
            </Button>
          )}
        </div>
      </form>
      {showRequestEditFgStatusButton() && (
        <Button
          className="mt-5"
          size="sm"
          onClick={() => handleRequestEditFgStatus()}
        >
          Request FG status Edit
        </Button>
      )}

      {showRequestEditFinanceStatusButton() && (
        <Button
          // loading={creating || updating}
          disabled={creating || updating}
          className="mt-5"
          size="sm"
          onClick={() => handleRequestEditFinanceStatus()}
        >
          Request Finance status Edit
        </Button>
      )}
    </>
  );
}
