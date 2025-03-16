"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useService } from "@/hooks/useService";
import { useTherapist } from "@/hooks/useTherapist";
import { useShift } from "@/hooks/useShift";
import { useSlot } from "@/hooks/useSlot";
import { useAppDispatch } from "@/stores";
import { getAllTherapistByServiceThunk } from "@/stores/therapistManager/thunk";
import { getDetailServiceThunk } from "@/stores/serviceManager/thunk";
import { getAllShiftByTherapistThunk } from "@/stores/shiftManager/thunk";
import { getAllSlotThunk } from "@/stores/slotManager/thunk";
import { Therapist } from "@/types/therapist";
import { Slot } from "@/types/slots";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";

export const BookingPage = () => {
  const { id } = useParams<{ id: string }>();
  const { serviceDetail } = useService();
  const { therapist } = useTherapist();
  const { shift } = useShift(); // Shifts are occupied slots
  const { slot } = useSlot(); // All possible slots
  const dispatch = useAppDispatch();
  const router = useRouter();

  const [selectedTherapist, setSelectedTherapist] = useState<Therapist | null>(
    null
  );
  const [selectedSlot, setSelectedSlot] = useState<Slot | null>(null);
  const [selectedDate, setSelectedDate] = useState(dayjs());

  // Fetch service details, therapists, and slots on mount
  useEffect(() => {
    if (!id) return;
    dispatch(getAllSlotThunk()); // Fetch all possible slots
    dispatch(getDetailServiceThunk(id));
    dispatch(getAllTherapistByServiceThunk(id));
  }, [dispatch, id]);

  // Fetch shifts when a therapist is selected
  useEffect(() => {
    if (selectedTherapist) {
      dispatch(getAllShiftByTherapistThunk(selectedTherapist._id));
    }
  }, [dispatch, selectedTherapist]);

  // Handle therapist selection
  const handleTherapistSelect = (therapist: Therapist) => {
    setSelectedTherapist(therapist);
    setSelectedSlot(null); // Reset slot when therapist changes
  };

  // Handle slot selection
  const handleSlotSelect = (slot: Slot) => {
    const timezoneOffset = new Date().getTimezoneOffset(); // Get timezone offset in minutes
    const slotData = {
      _id: slot._id,
      slotNum: slot.slotNum,
      startTime: dayjs(selectedDate)
        .set("hour", parseInt(slot.startTime.split(":")[0]))
        .set("minute", parseInt(slot.startTime.split(":")[1]))
        .set("second", 0)
        .subtract(timezoneOffset, "minute")
        .toISOString(),
      endTime: dayjs(selectedDate)
        .set("hour", parseInt(slot.endTime.split(":")[0]))
        .set("minute", parseInt(slot.endTime.split(":")[1]))
        .set("second", 0)
        .subtract(timezoneOffset, "minute")
        .toISOString(),
    };
    setSelectedSlot(slotData);
  };

  // Filter occupied shifts by selected date
  const occupiedShifts = shift.filter((shift) => {
    const shiftDate = shift.date
      ? dayjs(shift.date)
      : dayjs(shift.slotsId.startTime);
    return shiftDate.isSame(selectedDate, "day");
  });

  // Determine available slots
  const availableSlots = slot.map((slot) => {
    const isOccupied = occupiedShifts.some(
      (shift) => shift.slotsId.slotNum === slot.slotNum
    );
    return { ...slot, isAvailable: !isOccupied };
  });

  // Handle Book Now click
  const handleBookNow = () => {
    if (selectedTherapist && selectedSlot) {
      const bookingData = {
        therapistId: selectedTherapist._id,
        slotsId: selectedSlot._id,
        serviceId: id,
        notes: "", // Placeholder; add input field if needed
        date: selectedSlot.startTime, // Combines selected date with slot start time
      };
      console.log("Booking Details:", bookingData);
    }
  };

  return (
    <div className="min-h-screen bg-rose-50">
      {/* Header */}
      <header className="bg-red-400 py-12 text-center">
        <h1 className="text-4xl font-bold text-rose-50">
          Book Your Appointment
        </h1>
      </header>

      {/* Main Content */}
      <main className="max-w-[1570px] mx-auto p-8">
        {/* Service Details */}
        {serviceDetail ? (
          <div className="bg-white p-6 rounded-lg shadow-md mb-8">
            <div className="flex flex-col md:flex-row gap-6">
              {serviceDetail.image && (
                <img
                  src={serviceDetail.image}
                  alt={serviceDetail.serviceName}
                  className="w-full md:w-1/3 h-auto rounded-lg object-cover max-w-[300px]"
                />
              )}
              <div className="flex-1">
                <h2 className="text-2xl font-semibold text-red-400">
                  {serviceDetail.serviceName}
                </h2>
                <p className="mt-2 text-gray-700">
                  {serviceDetail.description}
                </p>
                <p className="mt-2 text-gray-600">
                  <span className="font-medium">Price:</span> $
                  {serviceDetail.price.toFixed(2)}
                </p>
              </div>
            </div>
          </div>
        ) : (
          <p className="text-gray-600 text-center">
            Loading service details...
          </p>
        )}

        {/* Therapist List */}
        <div className="mb-8">
          <h3 className="text-xl font-bold text-red-400 mb-4">
            Choose a Therapist
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {therapist && therapist.length > 0 ? (
              therapist.map((t) => (
                <div
                  key={t._id}
                  onClick={() => handleTherapistSelect(t)}
                  className={`p-4 border rounded-lg cursor-pointer transition-colors duration-200 ${
                    selectedTherapist?._id === t._id
                      ? "border-red-400 bg-red-50"
                      : "border-gray-200 hover:bg-gray-50"
                  }`}
                >
                  <h4 className="text-lg font-semibold text-gray-800">
                    {t.accountId?.username || "Unnamed Therapist"}
                  </h4>
                </div>
              ))
            ) : (
              <p className="text-gray-600">
                No therapists available for this service.
              </p>
            )}
          </div>
        </div>

        {/* Selected Therapist Details */}
        {selectedTherapist && (
          <div className="mb-8 bg-white p-6 rounded-xl shadow-lg border border-gray-100">
            <h3 className="text-2xl font-bold text-red-400 mb-6 border-b-2 border-red-200 pb-2">
              Therapist Details: {selectedTherapist.accountId?.username}
            </h3>
            <div className="space-y-6">
              {/* Specialization */}
              {selectedTherapist.specialization &&
                selectedTherapist.specialization.length > 0 && (
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="text-xl font-semibold text-gray-800 mb-3 flex items-center">
                      <svg
                        className="w-5 h-5 mr-2 text-red-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M12 8c-1.657 0-3 1.343-3 3s1.343 3 3 3 3-1.343 3-3-1.343-3-3-3zm0-4c-3.86 0-7 3.14-7 7s3.14 7 7 7 7-3.14 7-7-3.14-7-7-7z"
                        />
                      </svg>
                      Specializations
                    </h4>
                    <ul className="space-y-3">
                      {selectedTherapist.specialization.map((spec, index) => (
                        <li
                          key={index}
                          className="text-gray-700 bg-white p-4 rounded-md shadow-sm hover:shadow-md transition-shadow duration-200 flex justify-between items-center"
                        >
                          <div>
                            <span className="font-medium text-gray-900">
                              {spec.serviceName}
                            </span>{" "}
                            - {spec.description}
                          </div>
                          <button
                            onClick={() =>
                              router.push(`/treatment/${spec._id}`)
                            }
                            className="ml-4 px-4 py-2 bg-red-400 text-white rounded-md hover:bg-red-500 transition-colors duration-200"
                          >
                            View Details
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

              {/* Certification */}
              {selectedTherapist.certification &&
                selectedTherapist.certification.length > 0 && (
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="text-xl font-semibold text-gray-800 mb-3 flex items-center">
                      <svg
                        className="w-5 h-5 mr-2 text-red-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      Certifications
                    </h4>
                    <ul className="space-y-3">
                      {selectedTherapist.certification.map((cert, index) => (
                        <li
                          key={index}
                          className="text-gray-700 bg-white p-4 rounded-md shadow-sm hover:shadow-md transition-shadow duration-200"
                        >
                          <span className="font-medium text-gray-900">
                            {cert.name}
                          </span>{" "}
                          (Issuer: {cert.issuedBy}, Date:{" "}
                          {cert.issuedDate
                            ? dayjs(cert.issuedDate).format("MMMM YYYY")
                            : "N/A"}
                          )
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

              {/* Experience */}
              {selectedTherapist.experience && (
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="text-xl font-semibold text-gray-800 mb-3 flex items-center">
                    <svg
                      className="w-5 h-5 mr-2 text-red-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    Experience
                  </h4>
                  <p className="text-gray-700 text-lg bg-white p-4 rounded-md shadow-sm">
                    {selectedTherapist.experience} years
                  </p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Calendar and Slots */}
        {selectedTherapist && (
          <div className="mb-8">
            <h3 className="text-xl font-bold text-red-400 mb-4">
              Select a Date and Time
            </h3>
            <div className="flex flex-col md:flex-row gap-6">
              {/* MUI Calendar */}
              <div className="bg-white p-4 rounded-lg shadow-md">
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DateCalendar
                    value={selectedDate}
                    onChange={(newValue) => setSelectedDate(newValue)}
                    minDate={dayjs()} // Disable past dates
                  />
                </LocalizationProvider>
              </div>

              {/* Slot List */}
              <div className="flex-1">
                <div className="grid grid-cols-2 gap-4">
                  {availableSlots.map((slot) => {
                    const isSelected = selectedSlot?.slotNum === slot.slotNum;
                    return (
                      <button
                        key={slot.slotNum}
                        onClick={() =>
                          slot.isAvailable && handleSlotSelect(slot)
                        }
                        className={`p-3 border rounded-lg text-center transition-colors duration-200 ${
                          !slot.isAvailable
                            ? "border-gray-300 bg-gray-200 text-gray-500 cursor-not-allowed"
                            : isSelected
                            ? "border-red-400 bg-red-50 text-red-400"
                            : "border-gray-200 hover:bg-gray-50 text-gray-700"
                        }`}
                        disabled={!slot.isAvailable}
                      >
                        Slot {slot.slotNum}: {slot.startTime} - {slot.endTime}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex justify-end gap-4">
          <button
            className="px-6 py-3 bg-gray-200 text-gray-700 font-semibold rounded-md hover:bg-gray-300 transition-colors duration-200"
            onClick={() => {
              setSelectedTherapist(null);
              setSelectedSlot(null);
            }}
          >
            Cancel
          </button>
          <button
            className={`px-6 py-3 font-semibold rounded-md transition-colors duration-200 ${
              selectedTherapist && selectedSlot
                ? "bg-red-400 text-rose-50 hover:bg-red-500"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }`}
            disabled={!selectedTherapist || !selectedSlot}
            onClick={handleBookNow}
          >
            Book Now
          </button>
        </div>
      </main>
    </div>
  );
};

export default BookingPage;
