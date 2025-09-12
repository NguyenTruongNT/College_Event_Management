import React, { createContext, useState, useEffect } from "react";

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  // Trạng thái người dùng (user) và loading
  const [user, setUser] = useState(null); // { role: 'student'|'organizer'|'admin', email: string }
  const [loading, setLoading] = useState(true);

  // Kiểm tra người dùng đã đăng nhập khi ứng dụng khởi động
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false); // Kết thúc loading sau khi kiểm tra
  }, []);

  // Hàm đăng nhập (giả lập)
  const login = async (email, password) => {
    // Giả lập phản hồi từ server (sau này thay bằng API)
    let role;
    if (email === "admin@demo.com" && password === "123456") {
      role = "admin";
    } else if (email === "organizer@demo.com" && password === "123456") {
      role = "organizer";
    } else if (email === "student@demo.com" && password === "123456") {
      role = "student";
    } else {
      throw new Error("Email hoặc mật khẩu không đúng");
    }

    const newUser = { role, email };
    setUser(newUser);
    localStorage.setItem("user", JSON.stringify(newUser)); // Lưu vào localStorage
    return role; // Trả về role để frontend điều hướng
  };

  // Hàm đăng xuất
  const logout = () => {
    setUser(null);
    localStorage.removeItem("user"); // Xóa thông tin người dùng khỏi localStorage
  };

  // Hàm đăng ký (giả lập)
  const register = async (formData) => {
    // Giả lập đăng ký (sau này thay bằng API)
    console.log("Đăng ký với dữ liệu:", formData);
    if (formData.password !== formData.confirmPassword) {
      throw new Error("Mật khẩu không khớp");
    }
    const newUser = { role: "student", email: formData.email }; // Mặc định role là student
    setUser(newUser);
    localStorage.setItem("user", JSON.stringify(newUser));
  };

  // Cung cấp context value
  return (
    <AuthContext.Provider value={{ user, login, logout, register, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
