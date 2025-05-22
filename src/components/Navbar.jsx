// import React, { useState } from "react";
// import { Link } from "react-router-dom";
// import {
//   Menu,
//   X,
//   Home,
//   ShoppingBag,
//   Info,
//   Phone,
//   ChevronDown,
//   ShoppingCart,
//   Search,
//   Shirt,
//   Sparkles,
//   Palette,
//   Image,
// } from "lucide-react";
// import SearchModal from "./SearchModal";
// // import { useCart } from "../context/CartContext"; // Importing the CartContext to access cart items

// function Navbar() {
//   const [isOpen, setIsOpen] = useState(false);
//   const [isDropdownOpen, setIsDropdownOpen] = useState(false);
//   const [isMobileDropdownOpen, setIsMobileDropdownOpen] = useState(false);
//   const [isSearchOpen, setIsSearchOpen] = useState(false);
//   // const { cartItems } = useCart(); // Get cart items from context

//   // Calculate the total number of items in the cart
//   // const totalItems = cartItems.reduce(
//   //   (total, item) => total + item.quantity,
//   //   0
//   // );

//   const toggleSidebar = () => setIsOpen(!isOpen);
//   const closeSidebar = () => {
//     setIsOpen(false);
//     setIsMobileDropdownOpen(false);
//   };

//   return (
//     <>
//       <nav className="bg-white shadow-md fixed top-0 left-0 w-full z-50">
//         <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
//           {/* Left: Logo & Menu */}
//           <div className="flex items-center space-x-3">
//             <button
//               className="md:hidden text-amber-800"
//               onClick={toggleSidebar}
//             >
//               <Menu size={26} />
//             </button>
//             <Link to="/" className="flex items-center space-x-2">
//               <img
//                 src="https://img.freepik.com/free-photo/colorful-bracelets-dark-background-beads-bracelets-dark-background_1057-32146.jpg?t=st=1746705620~exp=1746709220~hmac=4aad0a957a0970ede8922b4ac3ca35825d00497c423dd869284ea39de2df30ec&w=1380"
//                 alt="logo"
//                 className="w-9 h-9 object-cover rounded-full border-2 border-amber-900"
//               />
//               <span className="text-xl font-bold text-amber-800 tracking-wide">
//                 Beadworks
//               </span>
//             </Link>
//           </div>

//           {/* Center: Nav Links */}
//           <div className="hidden md:flex space-x-4 items-center">
//             <Link
//               to="/"
//               className="flex items-center px-3 py-1 rounded-full text-amber-700 hover:bg-amber-100 transition font-semibold"
//             >
//               <Home size={18} className="mr-1" /> Home
//             </Link>
//             <Link
//               to="/shop"
//               className="flex items-center px-3 py-1 rounded-full text-amber-700 hover:bg-amber-100 transition font-semibold"
//             >
//               <ShoppingBag size={18} className="mr-1" /> Shop
//             </Link>

//             {/* Categories Dropdown */}
//             <div
//               className="relative"
//               onClick={() => setIsDropdownOpen(!isDropdownOpen)}
//             >
//               <button className="flex items-center px-3 py-1 rounded-full text-amber-700 hover:bg-amber-100 transition font-semibold">
//                 Categories <ChevronDown size={18} className="ml-1" />
//               </button>
//               {isDropdownOpen && (
//                 <div className="absolute top-10 left-0 bg-white border shadow-lg rounded-md w-52">
//                   <Link
//                     to="/category/Home & living"
//                     className="block px-4 py-2 text-amber-700 hover:bg-amber-50"
//                   >
//                     <Home size={14} className="inline mr-2" /> Home & Living
//                   </Link>
//                   <Link
//                     to="/category/Decor"
//                     className="block px-4 py-2 text-amber-700 hover:bg-amber-50"
//                   >
//                     <Palette size={14} className="inline mr-2" /> Decor
//                   </Link>
//                   <Link
//                     to="/category/Fashion"
//                     className="block px-4 py-2 text-amber-700 hover:bg-amber-50"
//                   >
//                     <Shirt size={14} className="inline mr-2" /> Fashion
//                   </Link>
//                   <Link
//                     to="/category/Accessories"
//                     className="block px-4 py-2 text-amber-700 hover:bg-amber-50"
//                   >
//                     <Sparkles size={14} className="inline mr-2" /> Accessories
//                   </Link>
//                   <Link
//                     to="/category/Art & collectibles"
//                     className="block px-4 py-2 text-amber-700 hover:bg-amber-50"
//                   >
//                     <Image size={14} className="inline mr-2" /> Art &
//                     Collectibles
//                   </Link>
//                 </div>
//               )}
//             </div>

//             <Link
//               to="/about"
//               className="flex items-center px-3 py-1 rounded-full text-amber-700 hover:bg-amber-100 transition font-semibold"
//             >
//               <Info size={18} className="mr-1" /> About
//             </Link>
//             <Link
//               to="/contact"
//               className="flex items-center px-3 py-1 rounded-full text-amber-700 hover:bg-amber-100 transition font-semibold"
//             >
//               <Phone size={18} className="mr-1" /> Contact
//             </Link>
//           </div>

//           {/* Right: Icons - Show even on mobile */}
//           <div className="flex space-x-4 items-center">
//             <button
//               className="text-amber-700 hover:text-amber-900 transition"
//               onClick={() => setIsSearchOpen(true)}
//             >
//               <Search size={20} />
//             </button>
//             <Link
//               to="/cart"
//               className="relative flex items-center text-amber-700 hover:text-amber-900"
//             >
//               <button className="text-amber-700 hover:text-amber-900 transition">
//                 <ShoppingCart size={22} />
//               </button>
//               {/* {totalItems > 0 && (
//                 <span className="absolute top-[-4px] right-[-6px] bg-red-500 text-white rounded-full text-xs font-semibold flex items-center justify-center w-5 h-5 md:w-5 md:h-5 shadow-md animate-pulse">
//                   {totalItems}
//                 </span>
//               )} */}
//             </Link>
//           </div>
//         </div>
//       </nav>

//       {/* Mobile Sidebar */}
//       <div
//         className={`fixed top-0 left-0 h-full w-4/5 max-w-xs bg-white shadow-xl z-50 transform transition-transform duration-300 ease-in-out rounded-r-2xl ${
//           isOpen ? "translate-x-0" : "-translate-x-full"
//         }`}
//       >
//         {/* Header */}
//         <div className="flex justify-between items-center p-5 border-b border-amber-200">
//           <span className="text-2xl font-extrabold text-amber-800 tracking-wide">
//             Menu
//           </span>
//           <button onClick={closeSidebar}>
//             <X size={28} className="text-amber-800 hover:text-amber-900" />
//           </button>
//         </div>

//         {/* Nav Links */}
//         <div className="flex flex-col gap-5 p-6">
//           <Link
//             to="/"
//             onClick={closeSidebar}
//             className="flex items-center text-amber-700 hover:text-amber-900 transition"
//           >
//             <Home size={20} className="mr-3" />{" "}
//             <span className="text-lg font-medium">Home</span>
//           </Link>

//           <Link
//             to="/shop"
//             onClick={closeSidebar}
//             className="flex items-center text-amber-700 hover:text-amber-900 transition"
//           >
//             <ShoppingBag size={20} className="mr-3" />{" "}
//             <span className="text-lg font-medium">Shop</span>
//           </Link>

//           {/* Dropdown */}
//           <button
//             onClick={() => setIsMobileDropdownOpen(!isMobileDropdownOpen)}
//             className="flex items-center justify-between text-amber-700 hover:text-amber-900 transition"
//           >
//             <div className="flex items-center">
//               <ChevronDown size={18} className="mr-3" />
//               <span className="text-lg font-medium">Categories</span>
//             </div>
//           </button>

//           {isMobileDropdownOpen && (
//             <div className="ml-6 flex flex-col gap-3 mt-1 text-base text-amber-700">
//               <Link
//                 to="/category/Home & living"
//                 onClick={closeSidebar}
//                 className="hover:text-amber-900"
//               >
//                 <Home size={16} className="inline mr-2" /> Home & Living
//               </Link>
//               <Link
//                 to="/category/Decor"
//                 onClick={closeSidebar}
//                 className="hover:text-amber-900"
//               >
//                 <Palette size={16} className="inline mr-2" /> Decor
//               </Link>
//               <Link
//                 to="/category/Fashion"
//                 onClick={closeSidebar}
//                 className="hover:text-amber-900"
//               >
//                 <Shirt size={16} className="inline mr-2" /> Fashion
//               </Link>
//               <Link
//                 to="/category/Accessories"
//                 onClick={closeSidebar}
//                 className="hover:text-amber-900"
//               >
//                 <Sparkles size={16} className="inline mr-2" /> Accessories
//               </Link>
//               <Link
//                 to="/category/Art & collectibles"
//                 onClick={closeSidebar}
//                 className="hover:text-amber-900"
//               >
//                 <Image size={16} className="inline mr-2" /> Art & Collectibles
//               </Link>
//             </div>
//           )}

//           <Link
//             to="/about"
//             onClick={closeSidebar}
//             className="flex items-center text-amber-700 hover:text-amber-900 transition"
//           >
//             <Info size={20} className="mr-3" />{" "}
//             <span className="text-lg font-medium">About</span>
//           </Link>

//           <Link
//             to="/contact"
//             onClick={closeSidebar}
//             className="flex items-center text-amber-700 hover:text-amber-900 transition"
//           >
//             <Phone size={20} className="mr-3" />{" "}
//             <span className="text-lg font-medium">Contact</span>
//           </Link>
//         </div>
//       </div>

//       {/* Backdrop */}
//       {isOpen && (
//         <div
//           className="fixed inset-0 bg-black bg-opacity-40 z-40"
//           onClick={closeSidebar}
//         />
//       )}

//       {/* Search Modal */}
//       {/* {isSearchOpen && <SearchModal onClose={() => setIsSearchOpen(false)} />} */}
//       <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />

//     </>
//   );
// }

// export default Navbar;

import React from 'react'

function Navbar() {
  return (
    <div className=''></div>
  )
}

export default Navbar