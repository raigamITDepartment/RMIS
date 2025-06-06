import { useNavigate } from "react-router";
import { Invoice, EStatus, MappedPaginatorInfo, ERole } from "@types";
import Badge from "@components/ui/badge/Badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "@components/ui/table";
import { PencilIcon } from "../../icons";
import Pagination from "@components/ui/pagination";
import "rc-pagination/assets/index.css";
import { useAuth } from "../../context/AuthContext";
import { useUpdateInvoiceMutation } from "@data/invoice";

export type IProps = {
  invoices: Invoice[];
  paginatorInfo: MappedPaginatorInfo | null;
  onPagination: (key: number) => void;
  onSort: (current: any) => void;
  onOrder: (current: string) => void;
};

// type FormValues = {
//   invoiceId: number;
//   invoiceNumber: string;
//   value: number;
//   fgsStatus: EStatus;
//   financeStatus: EStatus;
// };

export default function InvoiceList({
  invoices,
  onPagination,
  paginatorInfo,
}: IProps) {
  const { user } = useAuth();
  const navigate = useNavigate();
  // const { isOpen, openModal, closeModal } = useModal();
  // const [modalType, setModalType] = useState<"FG" | "FINANCE" | null>(null);
  // const { control, handleSubmit, register, setValue } = useForm<FormValues>();

  const { mutate: updateInvoice } = useUpdateInvoiceMutation();

  const handleEdit = (id: number) => {
    navigate(`/invoices/${id}/edit`);
  };

  const handleStatusClick = (
    invoice: Invoice,
    requiredRole: ERole,
    type: "FG" | "FINANCE"
  ) => {
    const hasPermission = user?.roles?.includes(requiredRole);
    const isFullyCompleted =
      invoice.fgsStatus === EStatus.COMPLETED &&
      invoice.financeStatus === EStatus.COMPLETED;

    if (!hasPermission || isFullyCompleted) return;

    const updatedStatus =
      type === "FG"
        ? invoice.fgsStatus === EStatus.COMPLETED
          ? EStatus.PENDING
          : EStatus.COMPLETED
        : invoice.financeStatus === EStatus.COMPLETED
        ? EStatus.PENDING
        : EStatus.COMPLETED;

    const input = {
      invoiceNumber: invoice.invoiceNumber,
      value: invoice.value,
      fgsStatus: type === "FG" ? updatedStatus : invoice.fgsStatus,
      financeStatus: type === "FINANCE" ? updatedStatus : invoice.financeStatus,
    };

    updateInvoice({ ...input, id: invoice.id });

    // Optional: if you decide to re-enable the modal code
    // setValue("invoiceId", invoice.id);
    // setValue("invoiceNumber", invoice.invoiceNumber);
    // setValue("value", invoice.value);
    // setValue("fgsStatus", input.fgsStatus);
    // setValue("financeStatus", input.financeStatus);
    // setModalType(type);
    // openModal();
  };

  // const invoiceStatus = [
  //   { label: "Pending", value: EStatus.PENDING },
  //   { label: "Completed", value: EStatus.COMPLETED },
  // ];

  // const onSubmit = async (values: FormValues) => {
  //   const input = {
  //     invoiceNumber: values.invoiceNumber,
  //     value: values.value,
  //     fgsStatus: values.fgsStatus,
  //     financeStatus: values.financeStatus,
  //   };
  //   updateInvoice({ ...input, id: values.invoiceId });
  //   closeModal();
  // };

  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
      <div className="max-w-full overflow-x-auto">
        <Table>
          {/* Table Header */}
          <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
            <TableRow>
              {/* <TableCell
                isHeader
                className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                Id
              </TableCell> */}
           <TableCell
  isHeader
  className="px-5 py-3 font-size-20xl text-gray-500 text-start text-theme-xs dark:text-gray-400"
  style={{ fontSize: '15px' }}
>
  Company Name
</TableCell>


              <TableCell
                isHeader
                className="px-5 py-3 text-max font-larger text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                Invoice Number
              </TableCell>
              <TableCell
                isHeader
                className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                Value
              </TableCell>
              <TableCell
                isHeader
                className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                Territory
              </TableCell>
              <TableCell
                isHeader
                className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                CreatedAt
              </TableCell>
              <TableCell
                isHeader
                className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                FGS(Status)
              </TableCell>
              <TableCell
                isHeader
                className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                Finance(Status)
              </TableCell>
              <TableCell
                isHeader
                className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                Actions
              </TableCell>
            </TableRow>
          </TableHeader>

          {/* Table Body */}
          <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
            {invoices.map((invoice) => (
              <TableRow key={invoice.id}>
                {/* <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                  {invoice.id}
                </TableCell> */}
                <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                  {invoice.companyName ? invoice.companyName : "_"}
                </TableCell>
                <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                  {invoice.invoiceNumber}
                </TableCell>
                <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                  {invoice.value}
                </TableCell>
                <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                  {invoice?.territory ? invoice.territory : "_"}
                </TableCell>
                <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                  {new Date(invoice.createdAt).toLocaleString()}
                </TableCell>
                <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                  <button
                    onClick={() =>
                      handleStatusClick(invoice, ERole.ROLE_FINISH_GOOD, "FG")
                    }
                  >
                    <Badge
                      size="sm"
                      color={
                        invoice.fgsStatus === EStatus.COMPLETED
                          ? "success"
                          : invoice.fgsStatus === EStatus.PENDING
                          ? "warning"
                          : "error"
                      }
                    >
                      {invoice.fgsStatus}
                    </Badge>
                  </button>
                </TableCell>
                <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                  <button
                    onClick={() =>
                      handleStatusClick(invoice, ERole.ROLE_FINANCE, "FINANCE")
                    }
                  >
                    <Badge
                      size="sm"
                      color={
                        invoice.financeStatus === EStatus.COMPLETED
                          ? "success"
                          : invoice.financeStatus === EStatus.PENDING
                          ? "warning"
                          : "error"
                      }
                    >
                      {invoice.financeStatus}
                    </Badge>
                  </button>
                </TableCell>
                <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                  <button onClick={() => handleEdit(invoice.id)}>
                    <PencilIcon className="text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 size-6" />
                  </button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        {!!paginatorInfo?.total && (
          <div className="flex items-center justify-end pb-2">
            <Pagination
              total={paginatorInfo.total}
              current={paginatorInfo.currentPage}
              pageSize={paginatorInfo.perPage}
              onChange={onPagination}
            />
          </div>
        )}
      </div>
      {/* <Modal
        isOpen={isOpen}
        onClose={() => {
          closeModal();
          setModalType(null);
        }}
        className="max-w-[700px] m-4"
      >
        <div className="relative w-full p-4 overflow-y-auto bg-white no-scrollbar rounded-3xl dark:bg-gray-900 lg:p-11">
          <div className="px-2 pr-14">
            <h4 className="mb-2 text-2xl font-semibold text-gray-800 dark:text-white/90">
              {`Edit ${modalType === "FG" ? "FGS" : "Finance"} Status`}
            </h4>
            <p className="mb-6 text-sm text-gray-500 dark:text-gray-400 lg:mb-7">
              Update your details to keep your profile up-to-date.
            </p>
          </div>
          <form className="flex flex-col">
            <div className="px-2 overflow-y-auto custom-scrollbar">
              <div className="grid grid-cols-1 gap-x-6 gap-y-5 lg:grid-cols-2">
                <Input hidden {...register("invoiceId")} />
                {modalType === "FG" && (
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
                          disabled={false}
                          options={invoiceStatus}
                          placeholder="Select Option"
                          value={field.value}
                          onChange={field.onChange}
                          className="dark:bg-dark-900"
                        />
                      )}
                    />
                  </div>
                )}

                {modalType === "FINANCE" && (
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
                          disabled={false}
                          options={invoiceStatus}
                          placeholder="Select Option"
                          value={field.value}
                          onChange={field.onChange}
                          className="dark:bg-dark-900"
                        />
                      )}
                    />
                  </div>
                )}
              </div>
            </div>
            <div className="flex items-center gap-3 px-2 mt-6 lg:justify-end">
              <Button size="sm" variant="outline" onClick={closeModal}>
                Close
              </Button>
              <Button size="sm" onClick={handleSubmit(onSubmit)}>
                Save Changes
              </Button>
            </div>
          </form>
        </div>
      </Modal> */}
    </div>
  );
}
