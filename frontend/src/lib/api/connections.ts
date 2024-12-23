import useAuthenticatedAxios from "@/hooks/useAuthenticatedAxios";  

export const useConnectionsAPI = () => {
  const { makeAuthenticatedRequest } = useAuthenticatedAxios();
  const BASE_URL = "https://183a55d8-c8e7-4746-bded-20ded523434a.mock.pstmn.io/";
  // const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
  const getConnectedProfiles = async (profileId: string, page: number) => {
    return await makeAuthenticatedRequest(`${BASE_URL}/getConnections/`, "GET", {}, false, { profileID: profileId, page});
  };

  const getSuggestedProfiles = async (profileId: string) => {
    return await makeAuthenticatedRequest(`${BASE_URL}/discover/`, "GET", {}, false, { profileID: profileId });
  };

//  const getSkippedProfiles = async () => {
//     return await makeAuthenticatedRequest(`${BASE_URL}/api/skip/`, "GET", {}, false, );
//  }
 
 const connectProfile = async (fromID: string, toID: string) => {
    return await makeAuthenticatedRequest(`${BASE_URL}/connect/`, "POST", {}, false, { fromID, toID });
 }

  return { getConnectedProfiles, getSuggestedProfiles, connectProfile };
};
