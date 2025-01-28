import { useGetUserByIdQuery } from "../../state/api/reducer";
import { useParams } from "react-router-dom";
import { FadeLoader } from "react-spinners";
import ImageOne from "../../assets/register.jpg";

export default function () {
  const { id } = useParams();
  const { data, isLoading } = useGetUserByIdQuery(id);
  const user = data?.details;

  const back = () => {
    window.history.back();
  };

  return (
    <>
      {isLoading ? (
        <div className="flex items-center justify-center">
          <FadeLoader color="#808080" loading={true} height={15} width={5} />
        </div>
      ) : (
        <div className="relative flex flex-col w-full h-screen md:flex-row">
          <h3
            onClick={back}
            className="absolute ml-1 text-sm font-bold cursor-pointer top-1 left-1 md:text-2xl"
          >
            <i className="mr-1 fa-solid fa-arrow-left"></i>Go Back
          </h3>

          <div className="hidden h-screen border md:block md:w-1/2">
            <img
              src={ImageOne}
              alt="Image"
              className="object-cover w-full h-[42rem] overflow-hidden"
            />
          </div>

          <div className="flex flex-col justify-center w-full h-full p-4 md:w-1/2">
            <h3 className="mb-1 text-2xl font-semibold">User Detail</h3>

            <div className="flex justify-center mb-1">
              <img
                src={
                  user?.image[Math.floor(Math.random() * user?.image?.length)]
                    .url
                }
                alt={
                  user?.image[Math.floor(Math.random() * user?.image?.length)]
                    .originalname
                }
                className="object-contain w-20 h-20 rounded-sm md:w-40 md:h-40"
              />
            </div>

            <div className="flex flex-col mb-1">
              <label
                htmlFor="fullname"
                className="text-sm font-medium text-black md:text-base"
              >
                Full Name
              </label>
              <input
                type="text"
                name="fullname"
                id="fullname"
                readOnly
                placeholder={user?.fullname}
                className="p-2 text-sm border-b border-gray-700 rounded-sm md:text-base placeholder:text-black"
              />
            </div>

            <div className="flex flex-col mb-1">
              <label
                htmlFor="contact_number"
                className="text-sm font-medium text-black md:text-base"
              >
                Contact Number
              </label>
              <input
                type="text"
                name="contact_number"
                id="contact_number"
                readOnly
                placeholder={user?.contact_number}
                className="p-2 text-sm border-b border-gray-700 rounded-sm md:text-base placeholder:text-black"
              />
            </div>

            <div className="flex flex-col mb-1">
              <label
                htmlFor="address"
                className="text-sm font-medium text-black md:text-base"
              >
                Address
              </label>
              <input
                type="text"
                name="address"
                id="address"
                readOnly
                placeholder={user?.address}
                className="p-2 text-sm border-b border-gray-700 rounded-sm md:text-base placeholder:text-black"
              />
            </div>

            <div className="flex flex-col mb-1">
              <label
                htmlFor="city"
                className="text-sm font-medium text-black md:text-base"
              >
                City
              </label>
              <input
                type="text"
                name="city"
                id="city"
                readOnly
                placeholder={user?.city}
                className="p-2 text-sm border-b border-gray-700 rounded-sm md:text-base placeholder:text-black"
              />
            </div>

            <div className="flex flex-col mb-1">
              <label
                htmlFor="email"
                className="text-sm font-medium text-black md:text-base"
              >
                Email
              </label>
              <input
                type="text"
                name="email"
                id="email"
                readOnly
                placeholder={user?.email}
                className="p-2 text-sm border-b border-gray-700 rounded-sm md:text-base placeholder:text-black"
              />
            </div>

            <div className="flex flex-col mb-1">
              <label
                htmlFor="role"
                className="text-sm font-medium text-black md:text-base"
              >
                User Role
              </label>
              <input
                type="text"
                name="role"
                id="role"
                readOnly
                placeholder={user?.role}
                className="p-2 text-sm border-b border-gray-700 rounded-sm md:text-base placeholder:text-black"
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
