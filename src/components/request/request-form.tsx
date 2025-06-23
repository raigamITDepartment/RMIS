import { useForm } from "react-hook-form";
import Input from "../form/input/InputField";
import Label from "../form/Label";
import Button from "../ui/button/Button";
import { ERequestType, Request } from "../../types";
import { useUpdateRequestMutation } from "../../data/request";

type FormValues = {
  invoiceNumber: string;
  requestType: ERequestType;
  response: EResponse;
};

export enum EResponse {
  Accept = "ACCEPT",
  Decline = "DECLINE",
}

interface Props {
  initialValues?: Request;
}

export default function CreateOrUpdateRequestForm({ initialValues }: Props) {
  const { mutate: updateRequest, isLoading: updating } =
    useUpdateRequestMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    // @ts-ignore
    defaultValues: initialValues
      ? {
          ...initialValues,
        }
      : {
          invoiceNumber: "",
          requestType: "",
          response: EResponse.Accept, // default fallback
        },
    //@ts-ignore
    // resolver: yupResolver(validationSchema),
  });

  const onSubmit = async (values: FormValues) => {
    const input = {
      invoiceId: initialValues?.invoiceId,
      requestType: values.requestType,
      response: values.response,
    };

    if (initialValues) {
      updateRequest({ id: initialValues.id, ...input });
    }
  };

  const handleAccept = () => {
    // setValue("response", EResponse.Accept);

    if (initialValues) {
      const input = {
        requestType: initialValues.requestType,
        invoiceId: initialValues?.invoiceId,
        response: EResponse.Accept,
      };
      updateRequest({ id: initialValues.id, ...input });
    }
  };

  const handleDecline = () => {
    // setValue("response", EResponse.Decline);

    if (initialValues) {
      const input = {
        requestType: initialValues.requestType,
        invoiceId: initialValues?.invoiceId,
        response: EResponse.Decline,
      };
      updateRequest({ id: initialValues.id, ...input });
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="space-y-6">
          <div>
            <Label>Invoice Number</Label>
            <Input
              disabled
              placeholder="Inovice Number"
              {...register("invoiceNumber")}
              errorMessage={errors.invoiceNumber?.message!}
            />
          </div>
          <div>
            <Label>Request Type</Label>
            <Input
              disabled
              // placeholder="Value"
              {...register("requestType")}
              errorMessage={errors.requestType?.message!}
            />
          </div>
        </div>
      </form>
      <div className="flex gap-5 mt-2">
        <Button disabled={updating} size="sm" onClick={handleAccept}>
          Accept
        </Button>
        <Button
          disabled={updating}
          size="sm"
          className="bg-red-500"
          onClick={handleDecline}
        >
          Decline
        </Button>
      </div>
    </>
  );
}
