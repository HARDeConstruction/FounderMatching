import { useAuth } from "@clerk/nextjs";
import axios from "axios";
import { useCallback } from "react";

const useAuthenticatedAxios = () => {
  const { getToken } = useAuth();

  const makeAuthenticatedRequest = useCallback(
    async (url: string, method: string = "GET", data: any = null) => {
      try {
        const token = await getToken();
        console.log(token);
        if (!token) {
          throw new Error("Failed to retrieve the token");
        }

        const response = await axios({
          url,
          method,
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          data,
        });

        return response.data;
      } catch (error: any) {
        console.error("Error making authenticated request:", error.message);
        throw error;
      }
    },
    [getToken] // Memoize with dependency on getToken
  );

  return { makeAuthenticatedRequest };
};

export default useAuthenticatedAxios;
