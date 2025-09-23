// import { useState, useEffect } from 'react';
// import { X } from 'lucide-react';

// function RegisterModal({ isOpen, onClose, onSwitchToLogin }) {
//   const [formData, setFormData] = useState({
//     fullName: '',
//     email: '',
//     password: '',
//     confirmPassword: ''
//   });

//   // Scroll lock effect
//   useEffect(() => {
//     if (isOpen) {
//       // Save current scroll position
//       const scrollY = window.scrollY;
      
//       // Lock the scroll
//       document.body.style.position = 'fixed';
//       document.body.style.top = `-${scrollY}px`;
//       document.body.style.width = '100%';
//       document.body.style.overflow = 'hidden';
      
//       // Cleanup function to restore scroll when modal closes
//       return () => {
//         document.body.style.position = '';
//         document.body.style.top = '';
//         document.body.style.width = '';
//         document.body.style.overflow = '';
        
//         // Restore scroll position
//         window.scrollTo(0, scrollY);
//       };
//     }
//   }, [isOpen]);

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({
//       ...prev,
//       [name]: value
//     }));
//   };

//   const handleSubmit = () => {
//     // Basic validation
//     if (!formData.fullName || !formData.email || !formData.password || !formData.confirmPassword) {
//       alert('Please fill in all fields');
//       return;
//     }
    
//     // Password confirmation check
//     if (formData.password !== formData.confirmPassword) {
//       alert('Passwords do not match');
//       return;
//     }
    
//     // Handle registration logic here
//     console.log('Registration attempt:', formData);
    
//     // Reset form
//     setFormData({ 
//       fullName: '',
//       email: '', 
//       password: '',
//       confirmPassword: ''
//     });
    
//     // Close modal
//     onClose();
//   };

//   const handleLoginLink = () => {
//     // Switch to login modal if callback provided
//     if (onSwitchToLogin) {
//       onSwitchToLogin();
//     } else {
//       // Otherwise just close this modal
//       onClose();
//     }
//   };

//   const handleBackdropClick = (e) => {
//     if (e.target === e.currentTarget) {
//       onClose();
//     }
//   };

//   const handleKeyDown = (e) => {
//     if (e.key === 'Escape') {
//       onClose();
//     }
//     if (e.key === 'Enter' && ['fullName', 'email', 'password', 'confirmPassword'].includes(e.target.name)) {
//       handleSubmit();
//     }
//   };

//   if (!isOpen) return null;

//   return (
//     <div 
//       className="fixed inset-0 z-50 flex items-center justify-center"
//       onKeyDown={handleKeyDown}
//       tabIndex={-1}
//     >
//       {/* Backdrop */}
//       <div 
//         className="absolute inset-0 bg-[#D5D3D3]/60 transition-opacity"
//         onClick={handleBackdropClick}
//       ></div>
      
//       {/* Modal */}
//       <div className="relative bg-white rounded-lg shadow-xl w-full max-w-md mx-4 p-6">
//         {/* Close button */}
//         <button
//           onClick={onClose}
//           className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors duration-200"
//           aria-label="Close modal"
//         >
//           <X size={24} />
//         </button>

//         {/* Modal content */}
//         <div className="mb-6">
//           <h2 className="text-2xl font-semibold text-gray-900 mb-2">Register</h2>
//         </div>

//         <div className="space-y-4">
//           {/* Full Name field */}
//           <div>
//             <input
//               type="text"
//               name="fullName"
//               value={formData.fullName}
//               onChange={handleInputChange}
//               onKeyDown={handleKeyDown}
//               placeholder="Full name"
//               className="w-full px-4 py-3 bg-blue-50 border-0 rounded-md text-gray-700 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-colors"
//               autoComplete="name"
//             />
//           </div>

//           {/* Email field */}
//           <div>
//             <input
//               type="email"
//               name="email"
//               value={formData.email}
//               onChange={handleInputChange}
//               onKeyDown={handleKeyDown}
//               placeholder="Email address *"
//               className="w-full px-4 py-3 bg-blue-50 border-0 rounded-md text-gray-700 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-colors"
//               autoComplete="email"
//             />
//           </div>

//           {/* Password field */}
//           <div>
//             <input
//               type="password"
//               name="password"
//               value={formData.password}
//               onChange={handleInputChange}
//               onKeyDown={handleKeyDown}
//               placeholder="Password *"
//               className="w-full px-4 py-3 bg-blue-50 border-0 rounded-md text-gray-700 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-colors"
//               autoComplete="new-password"
//             />
//           </div>

//           {/* Confirm Password field */}
//           <div>
//             <input
//               type="password"
//               name="confirmPassword"
//               value={formData.confirmPassword}
//               onChange={handleInputChange}
//               onKeyDown={handleKeyDown}
//               placeholder="Confirm password *"
//               className="w-full px-4 py-3 bg-blue-50 border-0 rounded-md text-gray-700 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-colors"
//               autoComplete="new-password"
//             />
//           </div>

//           {/* Register button */}
//           <button
//             onClick={handleSubmit}
//             className="w-full bg-blue-700 hover:bg-blue-800 text-white font-medium py-3 px-4 rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
//           >
//             Register
//           </button>
//         </div>

//         {/* Login link */}
//         <div className="mt-6 text-center">
//           <button
//             onClick={handleLoginLink}
//             className="text-gray-700 hover:text-gray-900 text-sm transition-colors duration-200 border-b border-gray-300 hover:border-gray-500 focus:outline-none focus:border-gray-500"
//           >
//             Already have an account? login in here →
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default RegisterModal;


//////////////////////////////////////////////////////////////////////


// import { useState, useEffect } from "react";
// import { X } from "lucide-react";
// import axios from "axios";

// function RegisterModal({ isOpen, onClose, onSwitchToLogin }) {
//   const [formData, setFormData] = useState({
//     fullName: "",
//     email: "",
//     password: "",
//     confirmPassword: "",
//   });

//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");

//   // Scroll lock effect
//   useEffect(() => {
//     if (isOpen) {
//       const scrollY = window.scrollY;
//       document.body.style.position = "fixed";
//       document.body.style.top = `-${scrollY}px`;
//       document.body.style.width = "100%";
//       document.body.style.overflow = "hidden";

//       return () => {
//         document.body.style.position = "";
//         document.body.style.top = "";
//         document.body.style.width = "";
//         document.body.style.overflow = "";
//         window.scrollTo(0, scrollY);
//       };
//     }
//   }, [isOpen]);

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   const handleSubmit = async () => {
//     setError("");

//     if (
//       !formData.fullName ||
//       !formData.email ||
//       !formData.password ||
//       !formData.confirmPassword
//     ) {
//       setError("Please fill in all fields");
//       return;
//     }

//     if (formData.password !== formData.confirmPassword) {
//       setError("Passwords do not match");
//       return;
//     }

//     try {
//       setLoading(true);

//       // Map frontend fields to backend fields
//       const payload = {
//         username: formData.fullName,
//         email: formData.email,
//         password: formData.password,
//       };

//       const res = await axios.post("http://localhost:5000/api/auth/register", payload);

//       // Assuming backend sends { token, user }
//       localStorage.setItem("token", res.data.token);
//       localStorage.setItem("user", JSON.stringify(res.data.user));

//       // Reset form
//       setFormData({
//         fullName: "",
//         email: "",
//         password: "",
//         confirmPassword: "",
//       });

//       onClose();
//     } catch (err) {
//       console.error("Registration error:", err);
//       setError(err.response?.data?.message || "Registration failed. Try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleLoginLink = () => {
//     if (onSwitchToLogin) {
//       onSwitchToLogin();
//     } else {
//       onClose();
//     }
//   };

//   const handleBackdropClick = (e) => {
//     if (e.target === e.currentTarget) {
//       onClose();
//     }
//   };

//   const handleKeyDown = (e) => {
//     if (e.key === "Escape") {
//       onClose();
//     }
//     if (
//       e.key === "Enter" &&
//       ["fullName", "email", "password", "confirmPassword"].includes(e.target.name)
//     ) {
//       handleSubmit();
//     }
//   };

//   if (!isOpen) return null;

//   return (
//     <div
//       className="fixed inset-0 z-50 flex items-center justify-center"
//       onKeyDown={handleKeyDown}
//       tabIndex={-1}
//     >
//       {/* Backdrop */}
//       <div
//         className="absolute inset-0 bg-[#D5D3D3]/60 transition-opacity"
//         onClick={handleBackdropClick}
//       ></div>

//       {/* Modal */}
//       <div className="relative bg-white rounded-lg shadow-xl w-full max-w-md mx-4 p-6">
//         {/* Close button */}
//         <button
//           onClick={onClose}
//           className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors duration-200"
//           aria-label="Close modal"
//         >
//           <X size={24} />
//         </button>

//         {/* Modal content */}
//         <div className="mb-6">
//           <h2 className="text-2xl font-semibold text-gray-900 mb-2">Register</h2>
//         </div>

//         {error && (
//           <div className="mb-4 text-red-600 text-sm bg-red-50 p-2 rounded">
//             {error}
//           </div>
//         )}

//         <div className="space-y-4">
//           {/* Full Name */}
//           <div>
//             <input
//               type="text"
//               name="fullName"
//               value={formData.fullName}
//               onChange={handleInputChange}
//               placeholder="Full name"
//               className="w-full px-4 py-3 bg-blue-50 border-0 rounded-md text-gray-700 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white"
//               autoComplete="name"
//             />
//           </div>

//           {/* Email */}
//           <div>
//             <input
//               type="email"
//               name="email"
//               value={formData.email}
//               onChange={handleInputChange}
//               placeholder="Email address *"
//               className="w-full px-4 py-3 bg-blue-50 border-0 rounded-md text-gray-700 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white"
//               autoComplete="email"
//             />
//           </div>

//           {/* Password */}
//           <div>
//             <input
//               type="password"
//               name="password"
//               value={formData.password}
//               onChange={handleInputChange}
//               placeholder="Password *"
//               className="w-full px-4 py-3 bg-blue-50 border-0 rounded-md text-gray-700 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white"
//               autoComplete="new-password"
//             />
//           </div>

//           {/* Confirm Password */}
//           <div>
//             <input
//               type="password"
//               name="confirmPassword"
//               value={formData.confirmPassword}
//               onChange={handleInputChange}
//               placeholder="Confirm password *"
//               className="w-full px-4 py-3 bg-blue-50 border-0 rounded-md text-gray-700 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white"
//               autoComplete="new-password"
//             />
//           </div>

//           {/* Register button */}
//           <button
//             onClick={handleSubmit}
//             disabled={loading}
//             className="w-full bg-blue-700 hover:bg-blue-800 text-white font-medium py-3 px-4 rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
//           >
//             {loading ? "Registering..." : "Register"}
//           </button>
//         </div>

//         {/* Login link */}
//         <div className="mt-6 text-center">
//           <button
//             onClick={handleLoginLink}
//             className="text-gray-700 hover:text-gray-900 text-sm transition-colors duration-200 border-b border-gray-300 hover:border-gray-500 focus:outline-none focus:border-gray-500"
//           >
//             Already have an account? Login here →
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default RegisterModal;


//////////////////////working code in below//////////////////////


// import { useState, useEffect } from "react";
// import { X } from "lucide-react";
// import { registerUser } from "../services/auth"; // Adjust path as needed

// function RegisterModal({ isOpen, onClose, onSwitchToLogin }) {
//   const [formData, setFormData] = useState({
//     fullName: "",
//     email: "",
//     password: "",
//     confirmPassword: "",
//   });

//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");
//   const [success, setSuccess] = useState("");

//   // Scroll lock effect
//   useEffect(() => {
//     if (isOpen) {
//       const scrollY = window.scrollY;
//       document.body.style.position = "fixed";
//       document.body.style.top = `-${scrollY}px`;
//       document.body.style.width = "100%";
//       document.body.style.overflow = "hidden";

//       return () => {
//         document.body.style.position = "";
//         document.body.style.top = "";
//         document.body.style.width = "";
//         document.body.style.overflow = "";
//         window.scrollTo(0, scrollY);
//       };
//     }
//   }, [isOpen]);

//   // Reset form and messages when modal opens
//   useEffect(() => {
//     if (isOpen) {
//       setError("");
//       setSuccess("");
//       setFormData({
//         fullName: "",
//         email: "",
//         password: "",
//         confirmPassword: "",
//       });
//     }
//   }, [isOpen]);

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//     // Clear errors when user starts typing
//     if (error) setError("");
//     if (success) setSuccess("");
//   };

//   const validateForm = () => {
//     if (!formData.fullName.trim()) {
//       setError("Full name is required");
//       return false;
//     }
    
//     if (!formData.email.trim()) {
//       setError("Email is required");
//       return false;
//     }
    
//     if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
//       setError("Please enter a valid email address");
//       return false;
//     }
    
//     if (!formData.password) {
//       setError("Password is required");
//       return false;
//     }
    
//     if (formData.password.length < 6) {
//       setError("Password must be at least 6 characters long");
//       return false;
//     }
    
//     if (formData.password !== formData.confirmPassword) {
//       setError("Passwords do not match");
//       return false;
//     }
    
//     return true;
//   };

//   const handleSubmit = async () => {
//     setError("");
//     setSuccess("");

//     if (!validateForm()) {
//       return;
//     }

//     try {
//       setLoading(true);

//       // Make sure we're using the correct field mapping for your API
//       const userData = {
//         username: formData.fullName.trim(), // API expects 'username'
//         email: formData.email.trim(),
//         password: formData.password,
//       };

//       console.log('🚀 Submitting registration with:', userData);

//       const result = await registerUser(userData);

//       if (result.success) {
//         setSuccess(result.message);
        
//         // Reset form
//         setFormData({
//           fullName: "",
//           email: "",
//           password: "",
//           confirmPassword: "",
//         });

//         // Close modal after a short delay to show success message
//         setTimeout(() => {
//           onClose();
//           // Reload the page or update app state to reflect the logged-in user
//           // window.location.reload(); // Uncomment if needed
//         }, 1500);
//       } else {
//         setError(result.message);
//       }
//     } catch (err) {
//       console.error("Unexpected registration error:", err);
//       setError("An unexpected error occurred. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleLoginLink = () => {
//     if (onSwitchToLogin) {
//       onSwitchToLogin();
//     } else {
//       onClose();
//     }
//   };

//   const handleBackdropClick = (e) => {
//     if (e.target === e.currentTarget && !loading) {
//       onClose();
//     }
//   };

//   const handleKeyDown = (e) => {
//     if (e.key === "Escape" && !loading) {
//       onClose();
//     }
//     if (
//       e.key === "Enter" &&
//       ["fullName", "email", "password", "confirmPassword"].includes(e.target.name)
//     ) {
//       handleSubmit();
//     }
//   };

//   if (!isOpen) return null;

//   return (
//     <div
//       className="fixed inset-0 z-50 flex items-center justify-center"
//       onKeyDown={handleKeyDown}
//       tabIndex={-1}
//     >
//       {/* Backdrop */}
//       <div
//         className="absolute inset-0 bg-[#D5D3D3]/60 transition-opacity"
//         onClick={handleBackdropClick}
//       ></div>

//       {/* Modal */}
//       <div className="relative bg-white rounded-lg shadow-xl w-full max-w-md mx-4 p-6">
//         {/* Close button */}
//         <button
//           onClick={onClose}
//           disabled={loading}
//           className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors duration-200 disabled:opacity-50"
//           aria-label="Close modal"
//         >
//           <X size={24} />
//         </button>

//         {/* Modal content */}
//         <div className="mb-6">
//           <h2 className="text-2xl font-semibold text-gray-900 mb-2">Register</h2>
//         </div>

//         {/* Success message */}
//         {success && (
//           <div className="mb-4 text-green-600 text-sm bg-green-50 p-3 rounded-md border border-green-200">
//             {success}
//           </div>
//         )}

//         {/* Error message */}
//         {error && (
//           <div className="mb-4 text-red-600 text-sm bg-red-50 p-3 rounded-md border border-red-200">
//             {error}
//           </div>
//         )}

//         <div className="space-y-4">
//           {/* Full Name */}
//           <div>
//             <input
//               type="text"
//               name="fullName"
//               value={formData.fullName}
//               onChange={handleInputChange}
//               placeholder="Full name"
//               disabled={loading}
//               className="w-full px-4 py-3 bg-blue-50 border-0 rounded-md text-gray-700 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white disabled:opacity-50 disabled:cursor-not-allowed"
//               autoComplete="name"
//             />
//           </div>

//           {/* Email */}
//           <div>
//             <input
//               type="email"
//               name="email"
//               value={formData.email}
//               onChange={handleInputChange}
//               placeholder="Email address *"
//               disabled={loading}
//               className="w-full px-4 py-3 bg-blue-50 border-0 rounded-md text-gray-700 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white disabled:opacity-50 disabled:cursor-not-allowed"
//               autoComplete="email"
//             />
//           </div>

//           {/* Password */}
//           <div>
//             <input
//               type="password"
//               name="password"
//               value={formData.password}
//               onChange={handleInputChange}
//               placeholder="Password *"
//               disabled={loading}
//               className="w-full px-4 py-3 bg-blue-50 border-0 rounded-md text-gray-700 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white disabled:opacity-50 disabled:cursor-not-allowed"
//               autoComplete="new-password"
//             />
//           </div>

//           {/* Confirm Password */}
//           <div>
//             <input
//               type="password"
//               name="confirmPassword"
//               value={formData.confirmPassword}
//               onChange={handleInputChange}
//               placeholder="Confirm password *"
//               disabled={loading}
//               className="w-full px-4 py-3 bg-blue-50 border-0 rounded-md text-gray-700 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white disabled:opacity-50 disabled:cursor-not-allowed"
//               autoComplete="new-password"
//             />
//           </div>

//           {/* Register button */}
//           <button
//             onClick={handleSubmit}
//             disabled={loading}
//             className="w-full bg-blue-700 hover:bg-blue-800 text-white font-medium py-3 px-4 rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
//           >
//             {loading ? (
//               <span className="flex items-center justify-center">
//                 <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
//                   <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//                   <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
//                 </svg>
//                 Registering...
//               </span>
//             ) : (
//               "Register"
//             )}
//           </button>
//         </div>

//         {/* Login link */}
//         <div className="mt-6 text-center">
//           <button
//             onClick={handleLoginLink}
//             disabled={loading}
//             className="text-gray-700 hover:text-gray-900 text-sm transition-colors duration-200 border-b border-gray-300 hover:border-gray-500 focus:outline-none focus:border-gray-500 disabled:opacity-50"
//           >
//             Already have an account? Login here →
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default RegisterModal;

///////////////////////working code in between//////////////////////
import { useState, useEffect } from "react";
import { X } from "lucide-react";
import { registerUser } from "../services/auth"; // Adjust path as needed

function RegisterModal({ isOpen, onClose, onSwitchToLogin, onRegistrationSuccess }) {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Scroll lock effect
  useEffect(() => {
    if (isOpen) {
      const scrollY = window.scrollY;
      document.body.style.position = "fixed";
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = "100%";
      document.body.style.overflow = "hidden";

      return () => {
        document.body.style.position = "";
        document.body.style.top = "";
        document.body.style.width = "";
        document.body.style.overflow = "";
        window.scrollTo(0, scrollY);
      };
    }
  }, [isOpen]);

  // Reset form and messages when modal opens
  useEffect(() => {
    if (isOpen) {
      setError("");
      setSuccess("");
      setFormData({
        fullName: "",
        email: "",
        password: "",
        confirmPassword: "",
      });
    }
  }, [isOpen]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear errors when user starts typing
    if (error) setError("");
    if (success) setSuccess("");
  };

  const validateForm = () => {
    if (!formData.fullName.trim()) {
      setError("Full name is required");
      return false;
    }
    
    if (!formData.email.trim()) {
      setError("Email is required");
      return false;
    }
    
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      setError("Please enter a valid email address");
      return false;
    }
    
    if (!formData.password) {
      setError("Password is required");
      return false;
    }
    
    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters long");
      return false;
    }
    
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return false;
    }
    
    return true;
  };

  const handleSubmit = async () => {
    setError("");
    setSuccess("");

    if (!validateForm()) {
      return;
    }

    try {
      setLoading(true);

      // Map to match your API structure
      const userData = {
        username: formData.fullName.trim(), // API expects 'username'
        email: formData.email.trim(),
        password: formData.password,
      };

      console.log('🚀 Submitting registration with:', userData);

      const result = await registerUser(userData);

      if (result.success) {
        setSuccess(result.message || "Registration successful! Please log in.");
        
        // Reset form
        setFormData({
          fullName: "",
          email: "",
          password: "",
          confirmPassword: "",
        });

        // Show success message briefly, then redirect to login
        setTimeout(() => {
          setSuccess("");
          
          // Call success callback and switch to login modal
          if (onRegistrationSuccess) {
            onRegistrationSuccess();
          } else if (onSwitchToLogin) {
            onSwitchToLogin();
          } else {
            onClose();
          }
        }, 1500);
      } else {
        setError(result.message || "Registration failed. Please try again.");
      }
    } catch (err) {
      console.error("Unexpected registration error:", err);
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleLoginLink = () => {
    if (onSwitchToLogin) {
      onSwitchToLogin();
    } else {
      onClose();
    }
  };

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget && !loading) {
      onClose();
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Escape" && !loading) {
      onClose();
    }
    if (
      e.key === "Enter" &&
      ["fullName", "email", "password", "confirmPassword"].includes(e.target.name)
    ) {
      handleSubmit();
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      onKeyDown={handleKeyDown}
      tabIndex={-1}
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-[#D5D3D3]/60 transition-opacity"
        onClick={handleBackdropClick}
      ></div>

      {/* Modal */}
      <div className="relative bg-white rounded-lg shadow-xl w-full max-w-md mx-4 p-6">
        {/* Close button */}
        <button
          onClick={onClose}
          disabled={loading}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors duration-200 disabled:opacity-50"
          aria-label="Close modal"
        >
          <X size={24} />
        </button>

        {/* Modal content */}
        <div className="mb-6">
          <h2 className="text-2xl font-semibold text-gray-900 mb-2">Register</h2>
        </div>

        {/* Success message */}
        {success && (
          <div className="mb-4 text-green-600 text-sm bg-green-50 p-3 rounded-md border border-green-200">
            {success}
          </div>
        )}

        {/* Error message */}
        {error && (
          <div className="mb-4 text-red-600 text-sm bg-red-50 p-3 rounded-md border border-red-200">
            {error}
          </div>
        )}

        <div className="space-y-4">
          {/* Full Name */}
          <div>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleInputChange}
              placeholder="Full name"
              disabled={loading}
              className="w-full px-4 py-3 bg-blue-50 border-0 rounded-md text-gray-700 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white disabled:opacity-50 disabled:cursor-not-allowed"
              autoComplete="name"
            />
          </div>

          {/* Email */}
          <div>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="Email address *"
              disabled={loading}
              className="w-full px-4 py-3 bg-blue-50 border-0 rounded-md text-gray-700 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white disabled:opacity-50 disabled:cursor-not-allowed"
              autoComplete="email"
            />
          </div>

          {/* Password */}
          <div>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              placeholder="Password *"
              disabled={loading}
              className="w-full px-4 py-3 bg-blue-50 border-0 rounded-md text-gray-700 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white disabled:opacity-50 disabled:cursor-not-allowed"
              autoComplete="new-password"
            />
          </div>

          {/* Confirm Password */}
          <div>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleInputChange}
              placeholder="Confirm password *"
              disabled={loading}
              className="w-full px-4 py-3 bg-blue-50 border-0 rounded-md text-gray-700 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white disabled:opacity-50 disabled:cursor-not-allowed"
              autoComplete="new-password"
            />
          </div>

          {/* Register button */}
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="w-full bg-blue-700 hover:bg-blue-800 text-white font-medium py-3 px-4 rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Registering...
              </span>
            ) : (
              "Register"
            )}
          </button>
        </div>

        {/* Login link */}
        <div className="mt-6 text-center">
          <button
            onClick={handleLoginLink}
            disabled={loading}
            className="text-gray-700 hover:text-gray-900 text-sm transition-colors duration-200 border-b border-gray-300 hover:border-gray-500 focus:outline-none focus:border-gray-500 disabled:opacity-50"
          >
            Already have an account? Login here →
          </button>
        </div>
      </div>
    </div>
  );
}

export default RegisterModal;