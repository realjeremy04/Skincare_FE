"use client";
import React, { useState } from "react";
import { useBookingContext } from "@/global/bookingContext";
import { useRouter } from "next/navigation";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc"; // Import plugin UTC
import { createTransactionThunk } from "@/stores/transactionManager/thunk";
import { useAppDispatch } from "@/stores";

dayjs.extend(utc); // Kích hoạt plugin UTC

export const PaymentPage = () => {
  const { bookingData } = useBookingContext();
  const router = useRouter();
  const [note, setNote] = useState("");
  const dispatch = useAppDispatch();

  if (!bookingData || !bookingData.serviceDetail || !bookingData.slot) {
    return (
      <div className="min-h-screen bg-rose-50 flex items-center justify-center p-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-red-400 mb-4">
            Payment Details
          </h1>
          <p className="text-lg text-gray-600 mb-6">
            No booking data available.
          </p>
          <button
            onClick={() => router.push("/")}
            className="px-6 py-3 bg-red-400 text-white font-semibold rounded-lg shadow-md hover:bg-red-500 transition-all duration-200"
          >
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  const { serviceDetail, price, therapist, date, slot } = bookingData;

  // Chuyển đổi thời gian sang định dạng AM/PM
  const startTimeDisplay = new Date(slot.startTime).toLocaleTimeString(
    "en-US",
    {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
      timeZone: "UTC",
    }
  );
  const endTimeDisplay = new Date(slot.endTime).toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
    timeZone: "UTC",
  });

  // Hàm xử lý khi nhấn Confirm Payment
  const handleConfirmPayment = () => {
    const paymentData = {
      therapistId: therapist?._id || therapist?.accountId?._id || "N/A",
      slotsId: slot?._id || "N/A",
      serviceId: serviceDetail?._id || "N/A",
      notes: note || "",
      date: date ?? "",
      paymentMethod: "Cash",
    };

    dispatch(createTransactionThunk(paymentData));
  };

  return (
    <div className="min-h-screen bg-rose-50 p-8">
      {/* Header */}
      <header className="bg-red-400 py-12 text-center rounded-b-lg shadow-lg">
        <h1 className="text-4xl md:text-5xl font-bold text-rose-50">
          Payment Confirmation
        </h1>
        <p className="text-lg text-rose-100 mt-2">
          Review your booking details below
        </p>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto mt-8 bg-white p-6 rounded-lg shadow-xl border border-gray-100">
        <h2 className="text-3xl font-bold text-red-400 mb-8 border-b-2 border-red-200 pb-2">
          Booking Summary
        </h2>

        {/* Service Details */}
        <section className="mb-8">
          <h3 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center">
            <span className="mr-2">✨</span> Your Selected Service
          </h3>
          <div className="flex flex-col md:flex-row gap-6">
            {serviceDetail.image && (
              <img
                src={serviceDetail.image}
                alt={serviceDetail.serviceName}
                className="w-full md:w-1/3 h-auto rounded-lg object-cover shadow-md max-w-[250px]"
              />
            )}
            <div className="flex-1">
              <p className="text-2xl font-semibold text-gray-900">
                {serviceDetail.serviceName}
              </p>
              <p className="text-gray-600 mt-2">{serviceDetail.description}</p>
              <p className="text-xl font-bold text-red-400 mt-3">
                Price: ${price?.toFixed(2)}
              </p>
            </div>
          </div>
        </section>

        {/* Therapist */}
        {therapist && (
          <section className="mb-8">
            <h3 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center">
              <span className="mr-2">👩‍⚕️</span> Your Therapist
            </h3>
            <p className="text-lg text-gray-700 bg-gray-50 p-4 rounded-lg shadow-sm">
              <span className="font-medium text-gray-900">
                {therapist.accountId?.username || "Unnamed Therapist"}
              </span>
            </p>
          </section>
        )}

        {/* Appointment */}
        <section className="mb-8">
          <h3 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center">
            <span className="mr-2">📅</span> Appointment Details
          </h3>
          <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
            <p className="text-lg text-gray-700">
              <span className="font-medium">Date:</span>{" "}
              {dayjs(date).format("dddd, MMMM D, YYYY")}
            </p>
            <p className="text-lg text-gray-700 mt-2">
              <span className="font-medium">Time:</span> Slot {slot.slotNum}:{" "}
              {startTimeDisplay} - {endTimeDisplay}
            </p>
          </div>
        </section>

        {/* User Notes Section */}
        <section className="mb-8">
          <h3 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center">
            <span className="mr-2">📝</span> Your Notes
          </h3>
          <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
            <textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="Add any special requests or notes here (e.g., 'Please prepare a quiet room' or 'I have allergies')"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400 text-gray-700 resize-y min-h-[100px]"
            />
          </div>
        </section>

        {/* Action Buttons */}
        <div className="flex justify-end gap-4 mt-10">
          <button
            onClick={() => router.push("/")}
            className="px-6 py-3 bg-gray-200 text-gray-700 font-semibold rounded-lg shadow-md hover:bg-gray-300 transition-all duration-200"
          >
            Cancel
          </button>
          <button
            onClick={handleConfirmPayment}
            className="px-8 py-3 bg-red-400 text-rose-50 font-semibold rounded-lg shadow-md hover:bg-red-500 transform hover:scale-105 transition-all duration-200"
          >
            Confirm Payment
          </button>
        </div>
      </main>
    </div>
  );
};

export default PaymentPage;
