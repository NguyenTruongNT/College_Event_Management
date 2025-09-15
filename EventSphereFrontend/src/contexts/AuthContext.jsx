import React, { createContext, useState, useEffect } from "react";

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Load user từ localStorage khi mount
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const storedToken = localStorage.getItem("token");

    if (storedUser && storedToken) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  // Hàm fetch thông tin profile
  const fetchUserProfile = async (token) => {
    try {
      const res = await fetch("http://localhost:5000/profile", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (!res.ok) throw new Error("Cannot fetch user profile");

      const data = await res.json();
      return data.profile;
    } catch (err) {
      console.error("Fetch profile error:", err);
      throw err;
    }
  };

  // Hàm đăng nhập
  const login = async (email, password) => {
    try {
      const res = await fetch("http://localhost:5000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Login failed");
      }

      const { token } = await res.json();

      const profile = await fetchUserProfile(token);

      const roleMap = { 1: "admin", 2: "organizer", 3: "student" };
      const role = roleMap[profile.RoleId] || "student";

      const newUser = {
        email: profile.Email,
        token,
        role,
        roleId: profile.RoleId,
        userId: profile.UserId || null,
        fullName: profile.FullName,
        enrollmentNo: profile.EnrollmentNo || null,
        departmentId: profile.DepartmentId || null,
      };

      setUser(newUser);
      localStorage.setItem("user", JSON.stringify(newUser));
      localStorage.setItem("token", token);

      return role;
    } catch (err) {
      console.error("Login error:", err);
      throw new Error(err.message || "Cannot connect to server");
    }
  };

  // Hàm đăng xuất
  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  };

  // Hàm đăng ký
  const register = async (formData) => {
    try {
      const res = await fetch("http://localhost:5000/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Registration failed");
      }

      // Tự động login sau khi đăng ký thành công
      const { email, password } = formData;
      const role = await login(email, password);

      return { success: true, message: "Registration successful", role };
    } catch (err) {
      console.error("Registration error:", err);
      throw new Error(err.message || "Cannot connect to server");
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        logout,
        register,
        fetchUserProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
