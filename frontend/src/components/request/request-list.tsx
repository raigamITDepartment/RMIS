import { useNavigate } from "react-router";
import {
  ERequestType,
  ERole,
  EStatus,
  MappedPaginatorInfo,
  Request,
} from "../../types";
import Badge from "../ui/badge/Badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../ui/table";
import { LockIcon, PencilIcon } from "../../icons";
import { useAuth } from "../../context/AuthContext";
import Pagination from "../ui/pagination";

export type IProps = {
  requests: Request[];
  paginatorInfo: MappedPaginatorInfo | null;
  onPagination: (key: number) => void;
  onSort: (current: any) => void;
  onOrder: (current: string) => void;
};
export default function RequestList({
  requests,
  onPagination,
  paginatorInfo,
}: IProps) {
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleEdit = (id: number) => {
    navigate(`/requests/${id}/edit`);
  };

  // const enableActionSection = (requestType: ERequestType) => {
  //   if (requestType == ERequestType.FG_REQUEST) {
  //     if (user?.roles?.includes(ERole.ROLE_FINANCE_HEAD)) {
  //       return true;
  //     } else if (user?.roles?.includes(ERole.ROLE_FINISH_GOOD_HEAD)) {
  //       return false;
  //     }
  //   } else if (requestType == ERequestType.FINANCE_REQUEST) {
  //     if (user?.roles?.includes(ERole.ROLE_FINISH_GOOD_HEAD)) {
  //       return true;
  //     } else if (user?.roles?.includes(ERole.ROLE_FINANCE_HEAD)) {
  //       return false;
  //     }
  //   }
  // };

  const enableActionSection = (request: Request): boolean => {
    if (!user?.roles) return false;

    // ✅ Disable if request is completed
    if (request.status === EStatus.COMPLETED) {
      return false;
    }

    const hasRole = (role: ERole) => user.roles.includes(role);

    return (
      (request.requestType === ERequestType.FG_REQUEST &&
        hasRole(ERole.ROLE_FINANCE_HEAD)) ||
      (request.requestType === ERequestType.FINANCE_REQUEST &&
        hasRole(ERole.ROLE_FINISH_GOOD_HEAD))
    );
  };

  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
      <div className="max-w-full overflow-x-auto">
        <Table>
          {/* Table Header */}
          <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
            <TableRow>
              <TableCell
                isHeader
                className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                Invoice Number
              </TableCell>
              <TableCell
                isHeader
                className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                Type
              </TableCell>
              <TableCell
                isHeader
                className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                Status
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
            {requests.map((request) => (
              <TableRow key={request.id}>
                <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                  {request.invoiceNumber}
                </TableCell>
                <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                  {request.requestType}
                </TableCell>
                <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                  <Badge
                    size="sm"
                    color={
                      request.status === EStatus.COMPLETED
                        ? "success"
                        : request.status === EStatus.PENDING
                        ? "warning"
                        : "error"
                    }
                  >
                    {request.status}
                  </Badge>
                </TableCell>
                {/* <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                  <Badge
                    size="sm"
                    color={
                      request.territoryStatus === InvoiceStatus.COMPLETED
                        ? "success"
                        : request.territoryStatus === InvoiceStatus.PENDING
                        ? "warning"
                        : "error"
                    }
                  >
                    {request.territoryStatus}
                  </Badge>
                </TableCell> */}
                <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                  {enableActionSection(request) ? (
                    <button onClick={() => handleEdit(request.id)}>
                      <PencilIcon className="text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 size-6" />
                    </button>
                  ) : (
                    <LockIcon className="text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 size-6" />
                  )}
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
    </div>
  );
}
