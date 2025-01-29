// eslint-disable-next-line filenames-simple/pluralize
"use client";
import { QueryClientProvider } from "@tanstack/react-query";
// import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import type * as React from "react";
import { getQueryClient } from "@/src/adapter/query-client/get-query-client";

export default function Providers({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const queryClient = getQueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      {/*<ReactQueryDevtools />*/}
    </QueryClientProvider>
  );
}
