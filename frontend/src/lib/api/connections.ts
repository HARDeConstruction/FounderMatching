import useAuthenticatedAxios from "@/hooks/useAuthenticatedAxios";  

export const useConnectionsAPI = () => {
  const { makeAuthenticatedRequest } = useAuthenticatedAxios();
  // const BASE_URL = "https://183a55d8-c8e7-4746-bded-20ded523434a.mock.pstmn.io/";
  const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
  const getConnectedProfiles = async (profileId: string, page: number) => {
    return await makeAuthenticatedRequest(`${BASE_URL}/api/discover/getConnections/`, "GET", {}, false, { profileID: profileId, page});
  };

  const getSuggestedProfiles = async (profileId: string) => {
    return await makeAuthenticatedRequest(`${BASE_URL}/api/discover/discover/`, "GET", {}, false, { profileID: profileId });
  };

 const connectProfile = async (fromID: string, toID: string) => {
    return await makeAuthenticatedRequest(`${BASE_URL}/api/discover/connect/`, "POST", {}, false, { fromID, toID });
 }

 const saveProfile = async (fromID: string, toID: string) => {
  return await makeAuthenticatedRequest(`${BASE_URL}/api/discover/save/`, "POST", {}, false, { fromID, toID });
}

 const getSavedProfiles = async (profileId: string, page: number) => {
  return await makeAuthenticatedRequest(`${BASE_URL}/api/revisit/getSaved/`, "GET", {}, false, { profileID: profileId, page});
}

  return { getConnectedProfiles, getSuggestedProfiles, connectProfile, saveProfile, getSavedProfiles };
};
