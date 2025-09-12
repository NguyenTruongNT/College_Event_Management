import React, { createContext, useState } from "react";

export const EventContext = createContext();

export const EventProvider = ({ children }) => {
  // Danh sách sự kiện mẫu
  const [events] = useState([
    { id: "1", name: "Hội thảo Công nghệ 2024" },
    { id: "2", name: "Workshop Khởi nghiệp" },
  ]);

  // Người tham gia mẫu
  const [participants, setParticipants] = useState({
    1: [
      {
        id: "p1",
        name: "Trần Thị B",
        email: "tran.b@email.com",
        phone: "0123456789",
        registered: "10/12/2024",
        status: "Đã phê duyệt",
      },
      {
        id: "p2",
        name: "Lê Văn C",
        email: "le.c@email.com",
        phone: "0987654321",
        registered: "11/12/2024",
        status: "Chờ phê duyệt",
      },
    ],
    2: [
      {
        id: "p3",
        name: "Nguyễn Văn A",
        email: "nguyen.a@email.com",
        phone: "0911222333",
        registered: "09/12/2024",
        status: "Chờ phê duyệt",
      },
    ],
  });

  // Hàm cập nhật trạng thái
  const updateParticipant = (eventId, participantId, updates) => {
    setParticipants((prev) => {
      const updated = prev[eventId].map((p) =>
        p.id === participantId ? { ...p, ...updates } : p
      );
      return { ...prev, [eventId]: updated };
    });
  };

  return (
    <EventContext.Provider value={{ events, participants, updateParticipant }}>
      {children}
    </EventContext.Provider>
  );
};
