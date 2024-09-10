import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

export default function useFormHook(initialValues, schema, ...rest) {
  return useForm({
    defaultValues: initialValues,
    resolver: zodResolver(schema),
    ...rest,
  });
}
