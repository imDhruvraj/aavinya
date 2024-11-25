import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

function Register() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [contact_number, setcontact] = useState("");
  const [region, setRegion] = useState("");
  const [user_type, setRole] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [passwordMatch, setPasswordMatch] = useState(null);
  
  const [emailError, setEmailError] = useState("");
  const [phoneError, setPhoneError] = useState("");
  
  const [otp, setOtp] = useState("");
  const [isOtpModalOpen, setIsOtpModalOpen] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const [otpError, setOtpError] = useState(""); // Added OTP error state
  
  // New state for field errors
  const [fieldErrors, setFieldErrors] = useState({});

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const validateEmail = (email) => {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailPattern.test(email);
  };

  const validatePhone = (phone) => {
    const phonePattern = /^[0-9]{10}$/;
    return phonePattern.test(phone);
  };

  const handleEmailBlur = () => {
    if (!email) {
      setEmailError("Email is required");
    } else if (!validateEmail(email)) {
      setEmailError("Please enter a valid email address");
    } else {
      setEmailError("");
    }
  };

  const handlePhoneBlur = () => {
    if (!contact_number) {
      setPhoneError("Phone number is required");
    } else if (!validatePhone(contact_number)) {
      setPhoneError("Please enter a valid 10-digit phone number");
    } else {
      setPhoneError("");
    }
  };

  const handleOtpChange = (e) => {
    setOtp(e.target.value);
    setOtpError(""); // Clear OTP error when user types
  };

  const verifyOtp = () => {
    if (otp === "123456") {
      setOtpVerified(true);
      setIsOtpModalOpen(false);
      // Show success popup
      alert("OTP verified successfully!");
    } else {
      // Show error message
      setOtpError("Incorrect OTP. Please try again.");
    }
  };

  const validateFields = () => {
    const errors = {};
    if (!firstName) errors.firstName = "First name is required";
    if (!lastName) errors.lastName = "Last name is required";
    if (!email) errors.email = "Email is required";
    if (!contact_number) errors.contact_number = "Phone number is required";
    if (!region) errors.region = "Region is required";
    if (!user_type) errors.user_type = "User type is required";
    if (!password) errors.password = "Password is required";
    if (!confirmPassword) errors.confirmPassword = "Confirm password is required";
    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!validateFields()) {
      return;
    }
    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    if (emailError || phoneError) {
      alert("Please fix the errors before submitting");
      return;
    }
    if (!otpVerified) {
      alert("Please verify OTP first!");
      return;
    }

    try {
      const full_name = `${firstName} ${lastName}`;
      let body = { full_name, email, password, contact_number, region, user_type };
      const response = await fetch("http://localhost:2426/register", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(body),
      });
      const data = await response.json();
      if (data.jwtToken) {
        window.location = "/";
      } else {
        alert("User Created");
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
    if (e.target.value === password) {
      setPasswordMatch(true);
    } else {
      setPasswordMatch(false);
    }
  };

  return (
    <div className="flex min-h-screen w-screen w-full items-center justify-center text-gray-600 bg-gray-50">
      <div className="relative">
        <div className="relative flex flex-col sm:w-full md:w-[30rem] lg:w-[30rem] xl:w-[30rem] 2xl:w-[30rem] rounded-lg border-gray-400 bg-white shadow-lg px-4">
          <div className="flex-auto p-6">
            <h4 className="mb-2 font-medium text-gray-700 xl:text-xl">Welcome!</h4>
            <p className="mb-6 text-gray-500">Please sign-in to access your account</p>

            <form className="mb-4" action="#" method="POST">
              <div className="mb-4 flex flex-wrap space-x-4">
                <div className="flex-1">
                  <label className="mb-2 inline-block text-xs font-medium uppercase text-gray-700">First Name</label>
                  <input
                    type="text"
                    className="block w-full rounded-md border border-gray-400 py-2 px-3 text-sm"
                    placeholder="Enter your first name"
                    onChange={(e) => setFirstName(e.target.value)}
                    required
                  />
                  {fieldErrors.firstName && <p className="text-red-500 text-sm">{fieldErrors.firstName}</p>}
                </div>
                <div className="flex-1">
                  <label className="mb-2 inline-block text-xs font-medium uppercase text-gray-700">Last Name</label>
                  <input
                    type="text"
                    className="block w-full rounded-md border border-gray-400 py-2 px-3 text-sm"
                    placeholder="Enter your last name"
                    onChange={(e) => setLastName(e.target.value)}
                    required
                  />
                  {fieldErrors.lastName && <p className="text-red-500 text-sm">{fieldErrors.lastName}</p>}
                </div>
              </div>

              <div className="mb-4 flex flex-wrap space-x-4">
                <div className="flex-1">
                  <label className="mb-2 inline-block text-xs font-medium uppercase text-gray-700">Email</label>
                  <input
                    type="email"
                    className="block w-full rounded-md border border-gray-400 py-2 px-3 text-sm"
                    placeholder="Enter your email"
                    onChange={(e) => setEmail(e.target.value)}
                    onBlur={handleEmailBlur}
                    required
                  />
                  {emailError && <p className="text-red-500 text-sm">{emailError}</p>}
                </div>
                <div className="flex-1">
                  <label className="mb-2 inline-block text-xs font-medium uppercase text-gray-700">Phone Number</label>
                  <input
                    type="text"
                    className="block w-full rounded-md border border-gray-400 py-2 px-3 text-sm"
                    placeholder="Enter your phone number"
                    onChange={(e) => setcontact(e.target.value)}
                    onBlur={handlePhoneBlur}
                    required
                  />
                  {phoneError && <p className="text-red-500 text-sm">{phoneError}</p>}
                </div>
              </div>

              <div className="mb-4 flex flex-wrap space-x-4">
                <div className="flex-1">
                  <label className="mb-2 inline-block text-xs font-medium uppercase text-gray-700">Region</label>
                  <select
                    className="block w-full rounded-md border border-gray-400 py-2 px-3 text-sm"
                    onChange={(e) => setRegion(e.target.value)}
                    required
                  >
                    <option value="">Select a region</option>
                    <option value="north">North</option>
                    <option value="south">South</option>
                    <option value="east">East</option>
                    <option value="west">West</option>
                  </select>
                  {fieldErrors.region && <p className="text-red-500 text-sm">{fieldErrors.region}</p>}
                </div>

                <div className="flex-1">
                  <label className="mb-2 inline-block text-xs font-medium uppercase text-gray-700">User Type</label>
                  <select
                    className="block w-full rounded-md border border-gray-400 py-2 px-3 text-sm"
                    onChange={(e) => setRole(e.target.value)}
                    required
                  >
                    <option value="">Select a user type</option>
                    <option value="admin">Admin</option>
                    <option value="user">User</option>
                  </select>
                  {fieldErrors.user_type && <p className="text-red-500 text-sm">{fieldErrors.user_type}</p>}
                </div>
              </div>

              <div className="mb-4 flex flex-wrap space-x-4">
                <div className="flex-1">
                  <label className="mb-2 inline-block text-xs font-medium uppercase text-gray-700">Password</label>
                  <div className="relative">
                    <input
                      type={passwordVisible ? "text" : "password"}
                      className="block w-full rounded-md border border-gray-400 py-2 px-3 text-sm"
                      placeholder="Enter your password"
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                    <button type="button" onClick={togglePasswordVisibility} className="absolute right-3 top-1/2 transform -translate-y-1/2">
                      {passwordVisible ? <FaEyeSlash /> : <FaEye />}
                    </button>
                  </div>
                  {fieldErrors.password && <p className="text-red-500 text-sm">{fieldErrors.password}</p>}
                </div>
                <div className="flex-1">
                  <label className="mb-2 inline-block text-xs font-medium uppercase text-gray-700">Confirm Password</label>
                  <div className="relative">
                    <input
                      type="password"
                      className="block w-full rounded-md border border-gray-400 py-2 px-3 text-sm"
                      placeholder="Confirm your password"
                      onChange={handleConfirmPasswordChange}
                      required
                    />
                    {passwordMatch === false && <p className="text-red-500 text-sm">Passwords do not match!</p>}
                  </div>
                  {fieldErrors.confirmPassword && <p className="text-red-500 text-sm">{fieldErrors.confirmPassword}</p>}
                </div>
              </div>

              <div className="mt-6 flex justify-center">
                <button
                  type="button"
                  onClick={() => {
                    if (validateFields()) {
                      setIsOtpModalOpen(true);
                    }
                  }}
                  className="w-full rounded-md bg-blue-500 py-2 text-white text-sm uppercase"
                >
                  Sign Up
                </button>
              </div>

            </form>
            <p className="mb-4 text-center">
              Already have an account? <a href="/login" className="text-indigo-500">Login</a>
            </p>
          </div>
        </div>
      </div>

      {isOtpModalOpen && (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-md w-96">
            <h4 className="mb-4 text-lg font-medium">Enter OTP</h4>
            <input
              type="text"
              className="block w-full rounded-md border border-gray-400 py-2 px-3 text-sm"
              placeholder="Enter OTP"
              onChange={handleOtpChange}
              value={otp}
            />
            {otpError && <p className="text-red-500 text-sm mt-2">{otpError}</p>} {/* Added OTP error display */}
            <div className="mt-4 flex justify-between">
              <button
                type="button"
                onClick={verifyOtp}
                className="bg-blue-500 text-white py-2 px-4 rounded-md"
              >
                Verify OTP
              </button>
              <button
                type="button"
                onClick={() => {
                  setIsOtpModalOpen(false);
                  setOtpError(""); // Clear OTP error on cancel
                }}
                className="bg-gray-500 text-white py-2 px-4 rounded-md"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Register;

