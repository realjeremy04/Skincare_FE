"use client";

import React, { useEffect } from "react";
import { useAppDispatch } from "@/stores";
import { getAllShiftByAccountThunk } from "@/stores/shiftManager/thunk";
import { useShift } from "@/hooks/useShift";
import useAuth from "@/libs/context/AuthContext";
import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";
import { useRouter } from "next/navigation";

export default function Page() {
  const dispatch = useAppDispatch();
  const { user } = useAuth();
  const { shift } = useShift();
  const router = useRouter();

  useEffect(() => {
    if (!user) return;
    dispatch(getAllShiftByAccountThunk(user?._id));
  }, [dispatch, user]);

  useEffect(() => {
    console.log("Shift data:", shift);
  }, [shift]);

  // Define fixed slots, excluding 12:00-13:00
  const slots = [
    { slotNum: 1, startTime: "07:30", endTime: "09:00" },
    { slotNum: 2, startTime: "09:00", endTime: "10:30" },
    { slotNum: 3, startTime: "10:30", endTime: "12:00" },
    { slotNum: 4, startTime: "13:00", endTime: "14:30" },
    { slotNum: 5, startTime: "14:30", endTime: "16:00" },
    { slotNum: 6, startTime: "16:00", endTime: "17:30" },
  ];

  // Transform shift data into events
  const events = shift.map((s) => {
    const startDate = new Date(s.date);
    const [startHours, startMinutes] = s.slotsId.startTime.split(":");
    const [endHours, endMinutes] = s.slotsId.endTime.split(":");

    startDate.setHours(parseInt(startHours), parseInt(startMinutes), 0, 0);
    const endDate = new Date(startDate);
    endDate.setHours(parseInt(endHours), parseInt(endMinutes), 0, 0);

    return {
      id: s.appointmentId || s._id, // Dùng appointmentId nếu có, fallback về _id nếu không
      title: `Slot ${s.slotsId.slotNum}`,
      start: startDate.toISOString(),
      end: endDate.toISOString(),
      backgroundColor: "#ff4d4d",
      borderColor: "#ff4d4d",
      textColor: "#fff",
    };
  });

  return (
    <div className="calendar-container">
      <FullCalendar
        plugins={[timeGridPlugin]}
        initialView="timeGridWeek"
        headerToolbar={{
          left: "prev,next today",
          center: "title",
          right: "timeGridWeek,timeGridDay",
        }}
        initialDate="2025-03-17"
        events={events}
        slotMinTime="07:30:00"
        slotMaxTime="17:30:00"
        slotDuration="00:30:00"
        slotLabelInterval="00:30:00"
        allDaySlot={false}
        height="auto"
        eventTimeFormat={{
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        }}
        dayHeaderFormat={{
          weekday: "short",
          month: "numeric",
          day: "numeric",
        }}
        slotLabelContent={(arg) => {
          const timeStr = `${arg.date
            .getHours()
            .toString()
            .padStart(2, "0")}:${arg.date.getMinutes().toString().padStart(2, "0")}`;

          if (timeStr >= "12:00" && timeStr < "13:00") {
            return { html: "" };
          }

          const slot = slots.find((s) => s.startTime === timeStr);

          if (slot) {
            return {
              html: `
                <div class="slot-label">
                  <div class="slot-num">Slot ${slot.slotNum}</div>
                  <div class="slot-time">${slot.startTime} - ${slot.endTime}</div>
                </div>
              `,
            };
          }
          return { html: "" };
        }}
        eventClick={(info) => {
          const eventId = info.event.id; // Lấy ID từ sự kiện (lúc này là appointmentId)
          if (eventId) {
            router.push(`/therapist/appointments/${eventId}`); // Chuyển hướng dùng appointmentId
          } else {
            console.error("No appointment ID found for this event");
          }
        }}
      />
      <style jsx>{`
        .calendar-container {
          max-width: 1200px;
          margin: 20px auto;
          padding: 20px;
          background: #fff;
          border-radius: 10px;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        }

        :global(.fc-header-toolbar) {
          padding: 10px 0;
          border-bottom: 1px solid #e0e0e0;
          margin-bottom: 20px;
        }

        :global(.fc-toolbar-title) {
          font-size: 1.5rem;
          font-weight: 600;
          color: #333;
        }

        :global(.fc-button) {
          background-color: #007bff;
          border: none;
          padding: 6px 12px;
          font-size: 0.9rem;
          transition: background-color 0.2s;
        }

        :global(.fc-button:hover) {
          background-color: #0056b3;
        }

        :global(.slot-label) {
          text-align: center;
          padding: 5px 0;
          font-family: 'Arial', sans-serif;
        }

        :global(.slot-num) {
          font-size: 1rem;
          font-weight: 500;
          color: #333;
        }

        :global(.slot-time) {
          font-size: 0.85rem;
          color: #888;
        }

        :global(.fc-event) {
          border-radius: 5px;
          padding: 4px 8px;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
          transition: transform 0.2s;
          cursor: pointer;
        }

        :global(.fc-event:hover) {
          transform: scale(1.02);
        }

        :global(.fc-timegrid-slot[data-time^="12:"]) {
          display: none;
        }

        :global(.fc-timegrid-slot) {
          height: 40px !important;
        }

        :global(.fc-col-header-cell) {
          background-color: #f8f9fa;
          font-weight: 600;
          color: #444;
          border-bottom: 2px solid #e0e0e0;
        }
      `}</style>
    </div>
  );
}