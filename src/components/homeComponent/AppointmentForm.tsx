import React, { useState } from "react";
import {
  PersonOutline,
  PhoneOutlined,
  EmailOutlined,
  EditNoteOutlined,
  SendOutlined,
} from "@mui/icons-material";

const AppointmentForm = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    phoneNumber: "",
    appointmentDate: "",
    email: "",
    service: "",
    appointmentTime: "",
    message: "",
  });

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col p-12 w-full bg-red-100 rounded-none max-md:px-5 max-md:max-w-full"
    >
      <h2 className="self-start text-red-400 ml-3 text-3xl font-bold leading-tight text-center max-md:ml-2.5">
        Book an appointment now
      </h2>
      <div className="flex flex-wrap gap-8 mt-10 w-full text-center max-md:mt-10 max-md:max-w-full">
        <div className="flex flex-1 gap-1.5 items-center p-2.5 bg-red-50">
          <PersonOutline sx={{ color: "#f87171" }} />
          <label htmlFor="fullName" className="sr-only">
            Full name
          </label>
          <input
            type="text"
            id="fullName"
            name="fullName"
            value={formData.fullName}
            onChange={handleInputChange}
            placeholder="Full name"
            className="self-stretch my-auto bg-transparent w-full focus:outline-none text-red-400"
            aria-label="Full name"
            required
          />
        </div>
        <div className="flex flex-1 gap-1.5 items-center p-2.5 bg-red-50">
          <PhoneOutlined sx={{ color: "#f87171" }} />
          <label htmlFor="phoneNumber" className="sr-only">
            Phone number
          </label>
          <input
            type="tel"
            id="phoneNumber"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleInputChange}
            placeholder="Phone number"
            className="self-stretch my-auto bg-transparent w-full focus:outline-none text-red-400"
            aria-label="Phone number"
            required
          />
        </div>
      </div>
      <div className="flex flex-wrap gap-8 mt-5 w-full text-center whitespace-nowrap max-md:max-w-full">
        <div className="flex flex-1 gap-10 justify-between items-center p-2.5 bg-red-50">
          <label htmlFor="appointmentDate" className="sr-only">
            Select date
          </label>
          <input
            type="date"
            id="appointmentDate"
            name="appointmentDate"
            value={formData.appointmentDate}
            onChange={handleInputChange}
            className="self-stretch my-auto bg-transparent w-full focus:outline-none text-red-400"
            aria-label="Select date"
            required
          />
        </div>
        <div className="flex flex-1 gap-1.5 items-center p-2.5 bg-red-50">
          <EmailOutlined sx={{ color: "#f87171" }} />
          <label htmlFor="email" className="sr-only">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            placeholder="Email"
            className="self-stretch my-auto bg-transparent w-full focus:outline-none text-red-400"
            aria-label="Email"
            required
          />
        </div>
      </div>
      <div className="flex flex-wrap gap-8 mt-5 w-full max-md:max-w-full">
        <div className="flex flex-1 gap-2.5 items-center py-2.5 pr-1.5 pl-2.5 bg-red-50">
          <label htmlFor="service" className="sr-only">
            Select service
          </label>
          <select
            id="service"
            name="service"
            value={formData.service}
            onChange={handleInputChange}
            className="self-stretch my-auto w-full bg-transparent focus:outline-none text-red-400"
            aria-label="Select service"
            required
          >
            <option value="">Select service</option>
            <option value="haircut">Haircut</option>
            <option value="coloring">Coloring</option>
            <option value="styling">Styling</option>
          </select>
        </div>
        <div className="flex flex-1 gap-1.5 items-center p-2.5 text-center bg-red-50">
          <label htmlFor="appointmentTime" className="sr-only">
            Appointment time
          </label>
          <input
            type="time"
            id="appointmentTime"
            name="appointmentTime"
            value={formData.appointmentTime}
            onChange={handleInputChange}
            className="self-stretch my-auto bg-transparent w-full focus:outline-none text-red-400"
            aria-label="Appointment time"
            required
          />
        </div>
      </div>
      <div className="flex gap-1.5 items-start p-2.5 mt-5 whitespace-nowrap bg-red-50">
        <EditNoteOutlined sx={{ color: "#f87171" }} />
        <label htmlFor="message" className="sr-only">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleInputChange}
          rows={5}
          placeholder="Notes"
          className="flex-1 w-full bg-transparent focus:outline-none text-red-400 min-h-28"
          aria-label="Message"
        ></textarea>
      </div>
      <button
        type="submit"
        className="flex gap-3 justify-center items-center self-start px-10 py-3 mt-10 font-bold whitespace-nowrap bg-rose-50 text-red-400 hover:bg-red-200 duration-200 rounded-none max-md:px-5"
      >
        <SendOutlined sx={{ color: "#f87171" }} />
        <span className="self-stretch my-auto">Book now</span>
      </button>
    </form>
  );
};

export default AppointmentForm;
