import React, { createContext, useState } from "react";

export const EventContext = createContext();

export const EventProvider = ({ children }) => {
  // Sample events list
  const [events] = useState([
    { id: "1", name: "Technology Conference 2024" },
    { id: "2", name: "Startup Workshop" },
  ]);

  // Sample participants
  const [participants, setParticipants] = useState({
    1: [
      {
        id: "p1",
        name: "Tran Thi B",
        email: "tran.b@email.com",
        phone: "0123456789",
        registered: "10/12/2024",
        status: "Approved",
      },
      {
        id: "p2",
        name: "Le Van C",
        email: "le.c@email.com",
        phone: "0987654321",
        registered: "11/12/2024",
        status: "Pending",
      },
    ],
    2: [
      {
        id: "p3",
        name: "Nguyen Van A",
        email: "nguyen.a@email.com",
        phone: "0911222333",
        registered: "09/12/2024",
        status: "Pending",
      },
    ],
  });

  // Function to update participant info
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
