import { useState, useEffect } from "react";
import { useMutation } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { createSectionMutation } from "@/src/client/module/moodle/course-selector/section.options";

export const useCreateSection = (
  courseIdSelected: number | null,
  cardSelected: string[],
) => {
  const { toast } = useToast();
  const [progress, setProgress] = useState(0);

  const createSectionMutationLocal = useMutation({
    mutationFn: () => {
      if (!courseIdSelected) {
        return Promise.resolve(null);
      }
      setProgress(10);
      const timeoutDuration = 5 * 60 * 1000; // 5 minutes in milliseconds

      return new Promise((resolve, reject) => {
        const timeoutId = setTimeout(() => {
          reject(
            new Error("Request timeout: Operation took longer than 5 minutes"),
          );
        }, timeoutDuration);

        createSectionMutation({
          courseId: courseIdSelected,
          cardSelected,
        })
          .then((result) => {
            clearTimeout(timeoutId);
            setProgress(100);
            resolve(result);
          })
          .catch((error) => {
            clearTimeout(timeoutId);
            reject(error);
          });
      });
    },
    onError: (error) => {
      toast({
        variant: "destructive",
        title: "Error",
        description:
          error instanceof Error
            ? error.message
            : "An error occurred while creating the section",
      });
      setProgress(0);
    },
    onSuccess: () => {
      toast({
        title: "Success",
        description: "Section created successfully",
      });
    },
  });

  useEffect(() => {
    if (createSectionMutationLocal.status === "pending" && progress < 90) {
      const interval = setInterval(() => {
        setProgress((prev) => Math.min(prev + 10, 90));
      }, 10000); // Increment progress every 10 seconds until 90%
      return () => clearInterval(interval);
    }
  }, [createSectionMutationLocal.status, progress]);

  return {
    progress,
    createSection: createSectionMutationLocal.mutate,
    isLoading: createSectionMutationLocal.status === "pending",
  };
};
