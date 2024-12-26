import { useAuth } from "@clerk/nextjs";
import axios from "axios";
import { useCallback } from "react";

const useAuthenticatedAxios = () => {
  const { getToken } = useAuth();

  const makeAuthenticatedRequest = useCallback(
    async (
      url: string,
      method: string = "GET",
      data: any = null,
      isFormData: boolean = false,
      params: Record<string, any> = {}
    ) => {
      try {
        const token = await getToken();
        //console.log(token);
        //console.log("URL: ", url);

        if (!token) {
          throw new Error("Failed to retrieve the token");
        }

        const headers: Record<string, string> = {
          Authorization: `Bearer ${token}`,
        };

        if (!isFormData) {
          headers["Content-Type"] = "application/json";
        }

        const response = await axios({
          url,
          method,
          headers,
          data,
          params,
        });
        //onsole.log(response.data);
        return response.data;
      } catch (error: any) {
        // console.error("Error making authenticated request:", error.message);
        throw error;
      }
    },
    [getToken] // Memoize with dependency on getToken, so it doesnt re-render
  );

  return { makeAuthenticatedRequest };
};

export default useAuthenticatedAxios;
