import React, { useEffect } from "react";
import { getAllServiceThunk } from "../../stores/serviceManager/thunk";
import { useAppDispatch } from "@/stores";
import { useService } from "../../hooks/useService";
import { ChevronRight } from "@mui/icons-material";
import { useRouter } from "next/navigation";

// Define the props type for ServiceCard
interface ServiceCardProps {
  image: string;
  title: string;
  description: string;
}

// ServiceCard component with typed props
const ServiceCard: React.FC<ServiceCardProps> = ({
  image,
  title,
  description,
}) => {
  return (
    <div className="w-[32%] max-md:w-full">
      {" "}
      {/* Giảm nhẹ từ 33% để có chỗ cho gap */}
      <div className="flex relative flex-col grow pt-80 min-h-[679px] rounded-[100px_0px_0px_0px] max-md:pt-24 max-md:max-w-full">
        <img
          loading="lazy"
          src={image}
          alt={title}
          className="object-cover absolute inset-0 size-full rounded-t-[100px]"
        />
        <div className="flex relative flex-col justify-center px-8 py-9 mt-40 bg-white rounded-none max-md:px-5 max-md:mt-10 max-md:max-w-full">
          <h3 className="text-xl font-bold leading-tight">{title}</h3>
          <p className="mt-2.5 text-base font-medium">{description}</p>
        </div>
      </div>
    </div>
  );
};

// Define the type for a single service
interface Service {
  _id: string;
  image: string;
  serviceName: string;
  description: string;
}

export const Services = () => {
  const dispatch = useAppDispatch();
  const { services } = useService();
  const router = useRouter();

  useEffect(() => {
    dispatch(getAllServiceThunk());
  }, [dispatch]);

  return (
    <section className="flex flex-col pt-36 pb-20 px-20 mt-36 w-full bg-red-400 max-md:pt-24 max-md:pl-5 max-md:mt-10 max-md:max-w-full">
      <div className="self-center ml-4 max-w-full w-[1232px]">
        <div className="flex gap-5 max-md:flex-col">
          <div className="w-[26%] max-md:w-full">
            <h2 className="text-5xl font-bold text-rose-50 leading-[55px] max-md:mt-10">
              Our Services
            </h2>
          </div>
          <div className="ml-5 w-[74%] max-md:w-full">
            <div className="flex flex-wrap gap-10 self-stretch my-auto w-full text-base max-md:mt-10 max-md:max-w-full">
              <p className="flex-auto font-medium text-rose-50 w-[386px] max-md:max-w-full">
                Whether you're new to skincare or experienced, our services are
                always ready to help you achieve your healthiest skin.
              </p>
              <button
                className="flex gap-2.5 justify-center items-center px-10 py-3 my-auto font-bold text-red-400 bg-red-50 hover:bg-red-100 rounded-none max-md:px-5 group transition-all duration-300 rounded-se-3xl"
                onClick={() => router.push("/treatment")}
              >
                <span className="mr-2">See all</span>
                <span className="transform transition-transform duration-300 group-hover:translate-x-2">
                  <ChevronRight />
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="self-end mt-12 w-full max-w-[1560px] max-md:mt-10 max-md:max-w-full">
        <div className="flex gap-4 flex-nowrap max-md:flex-col">
          {" "}
          {/* Sử dụng flex-nowrap để giữ trên một hàng */}
          {services.slice(0, 3).map((service: Service) => (
            <ServiceCard
              key={service._id}
              image={service.image}
              title={service.serviceName}
              description={service.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
