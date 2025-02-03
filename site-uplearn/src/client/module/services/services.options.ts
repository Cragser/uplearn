// eslint-disable-next-line filenames-simple/pluralize
import { queryOptions } from "@tanstack/react-query";
import { fetchServices } from "./services.api.service";
import { Services } from "@/src/shared/@types/services.types";

export const servicesOptions = queryOptions({
  queryFn: () => fetchServices<Services>(),
  queryKey: ["services"],
});
