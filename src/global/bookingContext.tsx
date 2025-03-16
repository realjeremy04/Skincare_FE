"use client";

import {
  createContext,
  useState,
  ReactNode,
  Dispatch,
  SetStateAction,
  useContext,
} from "react";
import { Therapist } from "@/types/therapist";
import { Slot } from "@/types/slots";
import { ServiceDetail } from "@/types/services";

type BookingData = {
  serviceDetail: ServiceDetail | null;
  price: number | null;
  therapist: Therapist | null;
  date: string | null;
  slot: Slot | null;
};

interface BookingContextType {
  bookingData: BookingData;
  setBookingData: Dispatch<SetStateAction<BookingData>>;
  updateBookingData: (data: Partial<BookingData>) => void;
  clearBookingData: () => void;
}

const BookingContext = createContext<BookingContextType | undefined>(undefined);

const initialBookingData: BookingData = {
  serviceDetail: null,
  price: null,
  therapist: null,
  date: null,
  slot: null,
};

export const BookingProvider = ({ children }: { children: ReactNode }) => {
  const [bookingData, setBookingData] =
    useState<BookingData>(initialBookingData);

  const updateBookingData = (data: Partial<BookingData>) => {
    setBookingData((prev) => ({ ...prev, ...data }));
  };

  const clearBookingData = () => {
    setBookingData(initialBookingData);
  };

  return (
    <BookingContext.Provider
      value={{
        bookingData,
        setBookingData,
        updateBookingData,
        clearBookingData,
      }}
    >
      {children}
    </BookingContext.Provider>
  );
};

export const useBookingContext = () => {
  const context = useContext(BookingContext);
  if (!context) {
    throw new Error("useBookingContext must be used within a BookingProvider");
  }
  return context;
};
