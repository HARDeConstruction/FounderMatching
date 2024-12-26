import useAuthenticatedAxios from "@/hooks/useAuthenticatedAxios";  

export const useDashboardAPI = () => {
  const { makeAuthenticatedRequest } = useAuthenticatedAxios();
  // const BASE_URL = "https://183a55d8-c8e7-4746-bded-20ded523434a.mock.pstmn.io/";
  const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
   
  const getDashboardData = async (profileId: string) => {
    return await makeAuthenticatedRequest(`${BASE_URL}/api/dashboard`, "GET", {}, false, { profileID: profileId });
  };

  const countView = async (fromID: string, toID: string) => {
    return await makeAuthenticatedRequest(`${BASE_URL}/api/discover/countView/`, "POST", {}, false, { fromID, toID });
  };

  return { getDashboardData, countView };
};
