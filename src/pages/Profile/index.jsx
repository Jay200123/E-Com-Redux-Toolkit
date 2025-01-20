import { useSelector } from "react-redux";

export default function () {
  const auth = useSelector((state) => state.auth);  
  const randomImage = auth?.user?.image[Math.floor(Math.random() * auth?.user.image.length)];
    
  return (
    <div className="flex items-center justify-center w-full h-full p-4 overflow-hidden">
      <div className="flex flex-col transition-all duration-700 md:flex-row w-[75rem] border border-gray-500 shadow-lg rounded-lg h-[48rem] md:h-[24rem]">
        <div className="w-full h-full md:w-[30%]">
          <div className="flex flex-col items-center justify-center w-full h-full p-4">
            <img
              src={randomImage.url}
              alt={randomImage.originalname}   
              className="object-contain border border-gray-500 rounded-full w-36 h-36 md:w-60 md:h-60"
            />
            <button className="w-full p-2 mt-2 text-sm text-white bg-black rounded-md md:mt-4 md:text-lg">Edit Profile</button>
          </div>
        </div>
        <div className="flex flex-col w-full h-full md:w-[70%] p-2">
          <h3 className="font-bold md:text-3xl">Profile Information</h3>
          <div className="flex flex-col w-full md:flex-row">
            <div className="w-full p-2 md:w-1/2">
              <p className="font-semibold">First Name</p>
              <p>{auth?.user?.fullname}</p>
            </div>
            <div className="w-full p-2 md:w-1/2">
              <p className="font-semibold">Contact Number</p>
              <p>{auth?.user?.contact_number}</p>
            </div>
          </div>
          <div className="flex flex-col w-full md:flex-row ">
            <div className="w-full p-2 md:w-1/2">
              <p className="font-semibold">Address</p>
              <p>{auth?.user?.address}</p>
            </div>
            <div className="w-full p-2 md:w-1/2">
              <p className="font-semibold">City</p>
              <p>{auth?.user?.city}</p>
            </div>
          </div>
          <div className="flex flex-col w-full md:flex-row">
            <div className="w-full p-2 md:w-1/2">
              <p className="font-semibold">Email</p>
              <p>{auth?.user?.email}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
