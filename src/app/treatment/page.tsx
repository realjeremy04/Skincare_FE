"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getAllServiceThunk } from "@/stores/serviceManager/thunk";
import { useAppDispatch } from "@/stores";
import { useService } from "@/hooks/useService";
import { Services } from "@/types/services";
import { Router } from "next/router";

// ServiceCard component
const ServiceCard: React.FC<Services> = ({
  _id,
  image,
  serviceName,
  description,
  price,
  isActive,
}) => {
  const router = useRouter();

  return (
    <div className="w-[32%] max-md:w-full bg-white rounded-lg shadow-lg overflow-hidden transition-transform duration-300 hover:scale-105">
      <div className="relative h-64">
        <img
          loading="lazy"
          src={image}
          alt={serviceName}
          className="object-cover w-full h-full transition-opacity duration-300 hover:opacity-90"
        />
      </div>
      <div className="p-6">
        <h3 className="text-xl font-bold text-red-400 leading-tight">
          {serviceName}
        </h3>
        <p className="mt-3 text-base text-gray-700 line-clamp-2">
          {description}
        </p>
        <div className="mt-4 flex justify-between items-center">
          <p className="text-lg font-semibold text-rose-600">
            ${price.toFixed(2)}
          </p>
          <span
            className={`text-sm font-medium px-2 py-1 rounded-full ${
              isActive
                ? "bg-green-100 text-green-600"
                : "bg-red-100 text-red-600"
            }`}
          >
            {isActive ? "Available" : "Unavailable"}
          </span>
        </div>
        <div className="mt-4 flex space-x-4">
          <button
            className={`w-full py-2 font-semibold rounded-md text-rose-50 transition-colors duration-200 ${
              isActive
                ? "bg-red-400 hover:bg-red-500"
                : "bg-gray-300 cursor-not-allowed opacity-70"
            }`}
            disabled={!isActive}
          >
            Book Now
          </button>
          {isActive && (
            <button
              className="w-full py-2 font-semibold rounded-md transition-colors duration-200 border text-red-500 border-red-400 hover:bg-red-500 hover:text-rose-50"
              disabled={false}
              onClick={() => router.push(`/treatment/${_id}`)}
            >
              Detail
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export const TreatmentPage = () => {
  const dispatch = useAppDispatch();
  const { services } = useService();
  const [filteredServices, setFilteredServices] = useState<Services[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState<
    "low-to-high" | "high-to-low" | null
  >(null);

  // Fetch services from API
  useEffect(() => {
    dispatch(getAllServiceThunk());
  }, [dispatch]);

  // Update filtered services based on search and sort
  useEffect(() => {
    let result = [...services];

    // Filter by search term
    if (searchTerm) {
      result = result.filter((service) =>
        service.serviceName.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Sort by price
    if (sortOrder === "low-to-high") {
      result.sort((a, b) => a.price - b.price);
    } else if (sortOrder === "high-to-low") {
      result.sort((a, b) => b.price - a.price);
    }

    setFilteredServices(result);
  }, [services, searchTerm, sortOrder]);

  // Handle search input change
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  // Handle sort change
  const handleSortChange = (order: "low-to-high" | "high-to-low") => {
    setSortOrder(order);
  };

  // Clear all filters
  const clearFilters = () => {
    setSearchTerm("");
    setSortOrder(null);
    setFilteredServices(services);
  };

  return (
    <div className="flex flex-col min-h-screen bg-rose-50">
      {/* Header Section */}
      <div className="bg-red-400 py-12 text-center">
        <h1 className="text-4xl font-bold text-rose-50">Our Treatments</h1>
        <p className="mt-2 text-lg text-red-100 max-w-2xl mx-auto">
          Discover personalized skincare solutions tailored to your needs.
        </p>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8 max-w-[1570px] mx-auto w-full">
        {/* Filter Section */}
        <div className="flex flex-wrap gap-4 mb-10">
          <input
            type="text"
            placeholder="Search treatments..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="px-4 py-2 rounded-md border border-red-200 w-[300px] focus:outline-none focus:ring-2 focus:ring-red-400 bg-white text-gray-700 placeholder-gray-400"
          />
          <button
            onClick={() => handleSortChange("low-to-high")}
            className={`px-4 py-2 rounded-md font-medium transition-colors duration-200 ${
              sortOrder === "low-to-high"
                ? "bg-red-400 text-rose-50"
                : "bg-red-100 text-red-400 hover:bg-red-200"
            }`}
          >
            Price: Low to High
          </button>
          <button
            onClick={() => handleSortChange("high-to-low")}
            className={`px-4 py-2 rounded-md font-medium transition-colors duration-200 ${
              sortOrder === "high-to-low"
                ? "bg-red-400 text-rose-50"
                : "bg-red-100 text-red-400 hover:bg-red-200"
            }`}
          >
            Price: High to Low
          </button>
          <button
            onClick={clearFilters}
            className="px-4 py-2 rounded-md bg-gray-200 text-gray-700 font-medium hover:bg-gray-300 transition-colors duration-200"
          >
            Clear Filters
          </button>
        </div>

        {/* Treatment List */}
        {filteredServices.length > 0 ? (
          <div className="flex gap-6 flex-wrap">
            {filteredServices.map((service) => (
              <ServiceCard
                key={service._id}
                _id={service._id}
                image={service.image}
                serviceName={service.serviceName}
                description={service.description}
                price={service.price}
                isActive={service.isActive}
              />
            ))}
          </div>
        ) : (
          <p className="text-gray-600 text-lg text-center">
            No treatments found.
          </p>
        )}
      </div>
    </div>
  );
};

export default TreatmentPage;
