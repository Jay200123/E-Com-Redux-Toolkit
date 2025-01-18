export default function () {
  return (
    <>
      <footer className="flex flex-col w-full text-white bg-gray-700">
        <div className="flex flex-wrap items-center justify-between w-full p-4 border-t border-b border-white">
          <div className="w-full text-center md:text-left md:w-1/2">
            <p>
              Get connected with us on{" "}
              <span className="text-blue-400 underline cursor-pointer hover:text-blue-500 underline-offset-4">
                Social Networks
              </span>
            </p>
          </div>
          <ul className="flex justify-center mt-4 space-x-4 md:mt-0">
            <li className="text-xl transition-colors hover:text-blue-500">
              <i className="fa-brands fa-facebook"></i>
            </li>
            <li className="text-xl transition-colors hover:text-blue-400">
              <i className="fa-brands fa-twitter"></i>
            </li>
            <li className="text-xl transition-colors hover:text-pink-500">
              <i className="fa-brands fa-instagram"></i>
            </li>
            <li className="text-xl transition-colors hover:text-blue-600">
              <i className="fa-brands fa-linkedin"></i>
            </li>
            <li className="text-xl transition-colors hover:text-red-500">
              <i className="fa-brands fa-google"></i>
            </li>
          </ul>
        </div>

        <div className="flex flex-wrap justify-between w-full gap-4 p-4">
          <ul className="flex flex-col w-full sm:w-1/2 md:w-1/4">
            <li className="mb-2 text-lg font-semibold">
              Important Information
            </li>
            <li className="flex items-center mb-2 text-sm">
              <i className="mr-2 fa-solid fa-house"></i>Home
            </li>
            <li className="flex items-center mb-2 text-sm">
              <i className="mr-2 fa-solid fa-circle-info"></i>About
            </li>
            <li className="flex items-center mb-2 text-sm">
              <i className="mr-2 fa-solid fa-phone"></i>Contact Us
            </li>
            <li className="flex items-center text-sm">
              <i className="mr-2 fa-solid fa-question"></i>FAQs
            </li>
          </ul>

          <ul className="flex flex-col w-full sm:w-1/2 md:w-1/4">
            <li className="mb-2 text-lg font-semibold">Social Media Links</li>
            <li className="flex items-center mb-2 text-sm">
              <i className="mr-2 fa-brands fa-facebook"></i>Facebook
            </li>
            <li className="flex items-center mb-2 text-sm">
              <i className="mr-2 fa-brands fa-twitter"></i>Twitter
            </li>
            <li className="flex items-center mb-2 text-sm">
              <i className="mr-2 fa-brands fa-instagram"></i>Instagram
            </li>
            <li className="flex items-center text-sm">
              <i className="mr-2 fa-brands fa-linkedin"></i>LinkedIn
            </li>
          </ul>

          <ul className="flex flex-col w-full sm:w-1/2 md:w-1/4">
            <li className="mb-2 text-lg font-semibold">Legal Information</li>
            <li className="flex items-center mb-2 text-sm">
              <i className="mr-2 fa-solid fa-headphones"></i>Customer Support
            </li>
            <li className="flex items-center mb-2 text-sm">
              <i className="mr-2 fa-solid fa-shield-halved"></i>Privacy Policy
            </li>
            <li className="flex items-center text-sm">
              <i className="mr-2 fa-solid fa-file-contract"></i>Terms &
              Conditions
            </li>
          </ul>
        </div>

        <div className="flex items-center justify-center w-full p-4 border-t border-white">
          <p className="text-sm text-center">
            Copyright <i className="mx-1 fa-regular fa-copyright"></i>2025 -
            Renyel Jay Sioc
          </p>
        </div>
      </footer>
    </>
  );
}