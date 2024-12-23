import useAuthenticatedAxios from "@/hooks/useAuthenticatedAxios";  

export const useConnectionsAPI = () => {
  const { makeAuthenticatedRequest } = useAuthenticatedAxios();
  const BASE_URL = "https://183a55d8-c8e7-4746-bded-20ded523434a.mock.pstmn.io/";
  // const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
  const getConnectedProfiles = async () => {
    return await makeAuthenticatedRequest(`${BASE_URL}/api/getConnections/`, "GET", {}, false);
  };

  const getSuggestedProfiles = async (profileId: string) => {
    return await makeAuthenticatedRequest(`${BASE_URL}/discover/`, "GET", {}, false, { profile_id: profileId });
  };

 const getSkippedProfiles = async () => {
    return await makeAuthenticatedRequest(`${BASE_URL}/api/skip/`, "GET", {}, false, );
 }
//   const getCurrentUserProfile = async (profileId: string) => {
//     return await makeAuthenticatedRequest(`${BASE_URL}/api/profile/me/?profileId=${profileId}`, "GET", {}, false);
//   };

//   const updateUserProfile = async (profileData: any, profileId: string) => {
//     const formData = profileData;
//     return await makeAuthenticatedRequest(`${BASE_URL}/api/profile/me/update/?profileId=${profileId}`, "PATCH", formData, true);
//   };

//   const createUserProfile = async (profileData: any) => {
//     const formData = profileData;
//     return await makeAuthenticatedRequest(`${BASE_URL}/api/profile/create/`, "POST", formData, true);
//   };

  return { getConnectedProfiles, getSuggestedProfiles, getSkippedProfiles };
};
