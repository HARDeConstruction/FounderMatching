import useAuthenticatedAxios from "@/hooks/useAuthenticatedAxios";  

export const useProfileAPI = () => {
  const { makeAuthenticatedRequest } = useAuthenticatedAxios();
  //const BASE_URL = "https://2347bb17-7489-41d1-8035-912e50be3857.mock.pstmn.io/";
  const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
  const getUserProfiles = async () => {
    return await makeAuthenticatedRequest(`${BASE_URL}/api/profile/getUserProfiles/`, "GET", {}), true;
  };

  const getCurrentUserProfile = async () => {
    return await makeAuthenticatedRequest(`${BASE_URL}/api/profile/me/`, "GET", {}, true);
  };

  const updateUserProfile = async (profileData: any) => {
    const formData = profileData;
    return await makeAuthenticatedRequest(`${BASE_URL}/api/profile/me`, "PATCH", formData, true);
  };

  const createUserProfile = async (profileData: any) => {
    const formData = profileData;
    return await makeAuthenticatedRequest(`${BASE_URL}/api/profile/create/`, "POST", formData, true);
  };

  return { getUserProfiles, getCurrentUserProfile, updateUserProfile, createUserProfile };
};