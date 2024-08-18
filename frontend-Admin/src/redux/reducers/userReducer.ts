import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosResponse } from "axios";
import {
  ForgetPasswordInitialState,
  LoginInitialStateType,
  LoginResponse,
  LogoutResponse,
  ResetUser,
  signInUser,
  updatePasswordData,
} from "../../types/types";
import axiosInstance from "../axiosInstance";
import { NewUserData } from "../../types/apiTypes";
import { UserDetailInitialStateType } from "../../types/reducerTypes";

// Function to create initial state
const createInitialState = () => {
  const persistedUserData = localStorage.getItem("user");
  const user = persistedUserData ? JSON.parse(persistedUserData) : undefined;

  const initialState: LoginInitialStateType = {
    status: false,
    user,
    loading: false,
    error: null, // Added error field
    isAuthenticated: !!persistedUserData,
    token: "",
  };

  return initialState;
};

const initialState = createInitialState();

const initialForgetPasswordState: ForgetPasswordInitialState = {
  loading: false,
  error: null,
  message: "",
};

// Define an async thunk to handle the login action
export const loginUser = createAsyncThunk(
  `userReducer/loginReducer`,
  async (userData: signInUser, { rejectWithValue }) => {
    try {
      const { username, password } = userData;
      const response: AxiosResponse<LoginResponse> = await axiosInstance.post(
        `/api/v1/user/login`,
        {
          email: username,
          password,
        }
      );

      await setLocalStorage(response.data);

      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data.message);
    }
  }
);
// Define an async thunk to handle the Reset action
export const ResetUserPassword = createAsyncThunk(
  `userReducer/resetReducer`,
  async (userData: ResetUser, { rejectWithValue }) => {
    try {
      const { token, password, confirmPassword } = userData;
      const response: AxiosResponse<LoginResponse> = await axiosInstance.put(
        `/api/v1/user/password/reset/${token}`,
        {
          password,
          confirmPassword,
        }
      );

      await setLocalStorage(response.data);

      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

// Define an async thunk to handle the logout action
export const logoutUser = createAsyncThunk(
  `userReducer/logoutReducer`,
  async (_, { rejectWithValue }) => {
    try {
      const response: AxiosResponse<LogoutResponse> = await axiosInstance.get(
        `/api/v1/user/logout`
      );

      if (response.data.success === true) {
        // Clear local storage items
        localStorage.removeItem("user");
        localStorage.removeItem("role");
        localStorage.removeItem("userRoleId");
        localStorage.removeItem("isAdministrator");
        localStorage.removeItem("isSuperAdmin");
        localStorage.removeItem("isAdmin");
        localStorage.removeItem("isSalesman");
        localStorage.removeItem("username");
        localStorage.removeItem("avatar");
        localStorage.removeItem("token");
        localStorage.removeItem("loggedIn");
        localStorage.removeItem("status");
        localStorage.removeItem("posId");
        localStorage.removeItem("shopNo");
        localStorage.removeItem("godownNo");
        return true;
      } else {
        return false;
      }
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);
// Define an async thunk to handle the Reset Token action
export const resetToken = createAsyncThunk(
  `userReducer/resetToken`,
  async (_, { rejectWithValue }) => {
    try {
      const response: AxiosResponse<any> = await axiosInstance.get(
        `/api/v1/user/refreshToken`
      );
      // console.log(response);

      if (response.data.message === "Please Login to access this resource") {
        // Clear local storage items
        localStorage.removeItem("user");
        localStorage.removeItem("role");
        localStorage.removeItem("userRoleId");
        localStorage.removeItem("isAdministrator");
        localStorage.removeItem("isSuperAdmin");
        localStorage.removeItem("isAdmin");
        localStorage.removeItem("isSalesman");
        localStorage.removeItem("username");
        localStorage.removeItem("avatar");
        localStorage.removeItem("token");
        localStorage.removeItem("loggedIn");
        localStorage.removeItem("status");
        localStorage.removeItem("posId");
        localStorage.removeItem("shopNo");
        localStorage.removeItem("godownNo");
        return response.data;
      } else {
        return response.data;
      }
    } catch (error: any) {
      // console.log(error.response.data.message);
      return rejectWithValue(error.response.data.message);
    }
  }
);

// Forget Password
export const forgetPassword = createAsyncThunk(
  `userReducer/forgetPassword`,
  async (email: string, { rejectWithValue }) => {
    try {
      const response: AxiosResponse<LogoutResponse> = await axiosInstance.post(
        `/api/v1/user/password/forgot`,
        {
          email,
        }
      );
      console.log(response);

      // Optionally, you can handle the response here

      return response.data.message; // Indicate success
    } catch (error: any) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

// Update Password
export const updatePassword = createAsyncThunk(
  `userReducer/forgetPassword`,
  async (updatePasswordData: updatePasswordData, { rejectWithValue }) => {
    try {
      const { oldPassword, password, confirmPassword } = updatePasswordData;
      const response: AxiosResponse<LoginResponse> = await axiosInstance.put(
        `/api/v1/user/password/update`,
        {
          oldPassword,
          newPassword: password,
          confirmPassword,
        }
      );
      console.log(response);

      setLocalStorage(response.data);

      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const userReducer = createSlice({
  name: "userReducer",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.error = null; // Clear any previous error
        state.isAuthenticated = action.payload.isAuthenticated;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload!.toString();
        state.isAuthenticated = false;
      })

      // Logout User
      .addCase(logoutUser.pending, (state) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.loading = false;
        state.user = undefined;
        state.error = null;
        state.isAuthenticated = false;
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.toString()!;
      })

      // resetToken User
      .addCase(resetToken.pending, (state) => {
        // console.log(action);
        // console.log(state.user);
        state.loading = true;
        state.error = "";
      })
      .addCase(resetToken.fulfilled, (state, action) => {
        // console.log(action);
        state.loading = false;
        state.user = action.payload.user;
        state.error = null;
        state.isAuthenticated = true;
      })
      .addCase(resetToken.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.toString()!;
        state.isAuthenticated = false;
        state.user = undefined;
      })

      // Reset Password
      .addCase(ResetUserPassword.pending, (state) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(ResetUserPassword.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.error = null; // Clear any previous error
        state.isAuthenticated = action.payload.isAuthenticated;
      })
      .addCase(ResetUserPassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload!.toString();
        state.isAuthenticated = false;
      })

      // Update user password
      .addCase(updatePassword.pending, (state) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(updatePassword.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.error = null; // Clear any previous error
        state.isAuthenticated = action.payload.isAuthenticated;
      })
      .addCase(updatePassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload!.toString();
      });
  },
});
export const forgetPasswordReducer = createSlice({
  name: "forgetPasswordReducer",
  initialState: initialForgetPasswordState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(forgetPassword.pending, (state) => {
        state.loading = true;
      })
      .addCase(forgetPassword.fulfilled, (state, action) => {
        state.loading = false;
        state.message = action.payload!.toString();
        // Optionally, handle success state
      })
      .addCase(forgetPassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload!.toString();
      });
  },
});

const setLocalStorage = (response: LoginResponse) => {
  // console.log(response);
  // Presisting Data in local Storage
  // Extracting data from the response or state
  let user = response?.user;
  let role = response?.user?.role;
  let status = response?.user?.active;
  let posId = response?.user?.posId;
  let shopNo = response?.user?.shopNo?.shopCode;
  let godownNo = response?.user?.shopNo.wareHouseId;

  // Checking user roles
  let isSuperAdmin =
    role?.name?.toLocaleLowerCase() === "superadmin".toLocaleLowerCase();
  let isAdministrator =
    role?.name?.toLocaleLowerCase() === "administrator".toLocaleLowerCase();
  let isAdmin = role?.name?.toLocaleLowerCase() === "admin".toLocaleLowerCase();
  let isSalesman =
    role?.name?.toLocaleLowerCase() === "salesman".toLocaleLowerCase();

  // Extracting user details
  let name = response?.user?.name;
  let avatar = response?.user?.avatar;

  // Setting local storage items
  localStorage.setItem("user", JSON.stringify(user));
  localStorage.setItem("status", JSON.stringify(status));
  localStorage.setItem("posId", JSON.stringify(posId));
  localStorage.setItem("shopNo", JSON.stringify(shopNo));
  localStorage.setItem("godownNo", JSON.stringify(godownNo));
  localStorage.setItem("role", JSON.stringify(role?.name));
  localStorage.setItem("userRoleId", JSON.stringify(role?._id));
  localStorage.setItem("isAdministrator", JSON.stringify(isAdministrator));
  localStorage.setItem("isSuperAdmin", JSON.stringify(isSuperAdmin));
  localStorage.setItem("isAdmin", JSON.stringify(isAdmin));
  localStorage.setItem("isSalesman", JSON.stringify(isSalesman));
  localStorage.setItem("username", JSON.stringify(name));
  localStorage.setItem("avatar", JSON.stringify(avatar));
  localStorage.setItem("token", JSON.stringify(response?.token));
  localStorage.setItem("loggedIn", JSON.stringify(true));
};

// /////////////////////////////////////////
//For Handline user Data Locally
const UserDetailInitialState: UserDetailInitialStateType = {
  loading: true,
  user: null,
};
export const UserDetailReducer = createSlice({
  name: "UserDetailReducer",
  initialState: UserDetailInitialState,
  reducers: {
    updateLocalUser: (state, action: PayloadAction<NewUserData>) => {
      state.loading = true;
      state.user = action.payload;
    },
    deleteLocalUser: (state) => {
      state.loading = true;
      state.user = null;
    },
  },
});

export const { deleteLocalUser, updateLocalUser } = UserDetailReducer.actions;
