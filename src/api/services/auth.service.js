import { authService } from "../axios";

// LOAD USER
export const loadUserSvc = async () => {
  try {
    const response = await authService.get("/users/session");
    if (response.status >= 400) throw new Error(response.errors[0]);

    return response.data.user;
  } catch (error) {
    throw new Error(error);
  }
};

// REFRESH VERIFICATION CODE
export const refreshVCodeSvc = async () => {
  try {
    const response = await authService.get("/auth/refresh-code");
    if (response.status >= 400) throw new Error(response.errors[0]);
  } catch (error) {
    throw new Error(error);
  }
};

// GET AFFILIATES
export const getAffiliatesSvc = async () => {
  try {
    const response = await authService.get("/users/affiliates");
    if (response.status >= 400) throw new Error(response.errors[0]);

    return response.data.affiliates;
  } catch (error) {
    throw new Error(error);
  }
};

// GET PROFILES
export const getProfilesSvc = async () => {
  try {
    const response = await authService.get("/users/profiles");
    if (response.status >= 400) throw new Error(response.errors[0]);

    return response.data;
  } catch (error) {
    throw new Error(error);
  }
};

// GENERATE TOKEN
export const generateTokenSvc = async () => {
  try {
    const response = await authService.get("/users/generate-token");
    if (response.status >= 400) throw new Error(response.errors[0]);

    return response.data.accessToken;
  } catch (error) {
    throw new Error(error);
  }
}

// REFRESH TOKEN
export const refreshTokenSvc = async () => {
  try {
    const response = await authService.post("/auth/refresh");
    if (response.status >= 400) throw new Error(response.errors[0]);

    return response.data.accessToken;
  } catch (error) {
    throw new Error(error);
  }
};

// SIGN IN
export const signinSvc = async (values) => {
  try {
    const response = await authService.post("/auth/signin", values);
    if (response.status >= 400) throw new Error(response.errors[0]);

    return response.data.accessToken;
  } catch (error) {
    throw new Error(error);
  }
}

// SIGN IN WITH GOOGLE
export const signinGoogleSvc = async (token) => {
  try {
    const response = await authService.post("/auth/google", { token });
    if (response.status >= 400) throw new Error(response.errors[0]);

    return response.data.accessToken;
  } catch (error) {
    throw new Error(error);
  }
};

// SIGN UP
export const signupSvc = async (values) => {
  try {
    const response = await authService.post("/auth/signup", values);
    if (response.status >= 400) throw new Error(response.errors[0]);

    return response.data.accessToken;
  } catch (error) {
    throw new Error(error);
  }
};

// COMPLETE PROFILE
export const completeProfileSvc = async (values) => {
  try {
    const response = await authService.post("/users/profiles", values);
    if (response.status >= 400) throw new Error(response.errors[0]);
  } catch (error) {
    throw new Error(error);
  }
}

// VALIDATE EMAIL
export const validateEmailSvc = async (validateValues) => {
  try {
    const response = await authService.post("/auth/verify-code", validateValues);
    if (response.status >= 400) throw new Error(response.errors[0]);

    return response.data.accessToken;
  } catch (error) {
    throw new Error(error);
  }
};

// RECOVER PASSWORD
export const recoverPswdSvc = async (values) => {
  try {
    const response = await authService.post("/users/recover-password", values);
    if (response.status >= 400) throw new Error(response.errors[0]);

    return response.data.accessToken;
  } catch (error) {
    throw new Error(error);
  }
};

// RESET PASSWORD
export const resetPswdSvc = async (values) => {
  try {
    const response = await authService.post("/users/reset-password", values);
    if (response.status >= 400) throw new Error(response.errors[0]);
  } catch (error) {
    throw new Error(error);
  }
};

// LOGOUT
export const logoutSvc = async () => {
  try {
    const response = await authService.post("/auth/logout");
    if (response.status >= 400) throw new Error(response.errors[0]);
  } catch (error) {
    throw new Error(error);
  }
};

// EDIT BASIC INFO
export const editBasicInfoSvc = async (URL, values) => {
  try {
    const response = await authService.put(URL, values);
    if (response.status >= 400) throw new Error(response.errors[0]);
  } catch (error) {
    throw new Error(error);
  }
};

// EDIT ADDITIONAL INFO
export const editAddInfoSvc = async (values) => {
  try {
    const response = await authService.put("/users/profiles", values);
    if (response.status >= 400) throw new Error(response.errors[0]);
  } catch (error) {
    throw new Error(error);
  }
};

// USERCODE
export const userCodeSvc = async (values) => {
  try {
    let response = undefined;
    values
      ? response = await authService.put("/users/username", values)
      : response = await authService.get("/users/username");

    if (response.status >= 400) throw new Error(response.errors[0]);

    if (!values) return response.data.username;
  } catch (error) {
    throw new Error(error);
  }
};

// DELETE PROFILE
export const deleteProfileSvc = async (id) => {
  try {
    const response = await authService.delete(`/users/active/${id}`, { data: { active: false } });
    if (response.status >= 400) throw new Error(response.errors[0]);
  } catch (error) {
    throw new Error(error);
  }
}