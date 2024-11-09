import { useState, useEffect } from "react";

import { AsyncOp } from "@src/presentation/types/AsyncOp";
import { getMockPublications } from "@src/persistence/publications";
import { Publication } from "@src/domain/Publication";

export const useHomePublications = () => {
  const [publications, setPublications] = useState<AsyncOp<Publication[], Error>>({
    status: "pending",
  });

  useEffect(() => {
    const handleGetPlanetsData = async () => {
      const result = getMockPublications();

      if (result.error) {
        setPublications({
          status: "failed",
          error: result.error,
        });
        return;
      }

      setPublications({
        status: "successful",
        data: result.data.results,
      });
    };

    handleGetPlanetsData();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { publications };
};
