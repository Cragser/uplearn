"use client";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertTriangle } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { servicesOptions } from "@/src/client/module/services/services.options";

export function ServicesWarning() {
  const { data: services } = useQuery(servicesOptions);

  if (!services) return null;

  return (
    <section className="flex justify-between gap-4 mt-3 max-w-[60rem]">
      {!services.anki && (
        <Alert variant="warning" className="mb-4">
          <AlertTriangle className="h-4 w-4" />
          <AlertTitle>Anki Service Disabled</AlertTitle>
          <AlertDescription>
          The Anki service is not available on server deployment. Using mock data instead.
          </AlertDescription>
        </Alert>
      )}
      {!services.ai && (
        <Alert variant="warning" className="mb-4">
          <AlertTriangle className="h-4 w-4" />
          <AlertTitle>AI Service Disabled</AlertTitle>
          <AlertDescription>
            The AI service has been temporarily disabled to avoid API usage limits. Please contact support to enable this feature.
          </AlertDescription>
        </Alert>
      )}
    </section>
  );
}