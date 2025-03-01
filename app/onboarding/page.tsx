"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { useAuth, useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

// Enum options
const genders = ["Male", "Female"];
const roles = ["Student", "Counselor"];
const languages = [
  "English",
  "Hindi",
  "Bengali",
  "Gujarati",
  "Kannada",
  "Malayalam",
  "Marathi",
  "Tamil",
  "Telugu",
  "Urdu",
  "Punjabi",
];

const Onboarding = () => {
  const { isLoaded, isSignedIn, userId, sessionId, getToken } = useAuth();
  const { user } = useUser();
  console.log(user?.emailAddresses[0].emailAddress);
  console.log(user?.fullName);
  console.log(user?.id);

  const router = useRouter();

  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    gender: "",
    role: "",
    mentalHealthGoals: [] as string[],
    preferredLanguage: "English",
  });
  const [goalInput, setGoalInput] = useState("");

  // Only check authentication after the auth state is loaded
  useEffect(() => {
    if (isLoaded && !isSignedIn) {
      router.push("/");
    }
  }, [isLoaded, isSignedIn, router]);

  // Log user data only when it's available
  useEffect(() => {
    if (user) {
      console.log("User data loaded:", user);
    }
  }, [user]);

  const handleNext = () => setStep(step + 1);
  const handleBack = () => setStep(step - 1);

  const handleChange = (field: string, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleAddGoal = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && goalInput.trim()) {
      e.preventDefault();
      setFormData((prev) => ({
        ...prev,
        mentalHealthGoals: [...prev.mentalHealthGoals, goalInput.trim()],
      }));
      setGoalInput("");
    }
  };

  const handleRemoveGoal = (goalToRemove: string) => {
    setFormData((prev) => ({
      ...prev,
      mentalHealthGoals: prev.mentalHealthGoals.filter(
        (goal) => goal !== goalToRemove
      ),
    }));
  };

  // Inside your handleSubmit function in the Onboarding component
  // Update this part:

  const handleSubmit = async () => {
    if (!isSignedIn || !userId || !user) {
      console.error("User not authenticated or user data not loaded");
      return;
    }

    try {
      const token = await getToken();

      const res = await axios.post(
        "/api/onboarding",
        {
          ...formData,
          userId,
          // Add these fields from Clerk user object
          name: user.fullName,
          email: user.emailAddresses[0].emailAddress,
          onboardingComplete: true,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (res.status === 200) {
        console.log("Onboarding completed!");
        router.push("/dashboard");
      } else {
        console.error("Failed to submit onboarding data");
      }
    } catch (error) {
      console.error("Error submitting:", error);
    }
  };

  // Validation functions for each step
  const isStep1Valid = () => {
    return formData.gender !== "" && formData.role !== "";
  };

  const isStep2Valid = () => {
    return formData.mentalHealthGoals.length > 0;
  };

  const isStep3Valid = () => {
    return formData.preferredLanguage !== "";
  };

  // Show loading state while auth is being determined
  if (!isLoaded) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="bg-white p-8 rounded-xl shadow-xl">
          <p className="text-center text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      {step === 1 && (
        <Modal title="Tell us about yourself">
          <div className="space-y-6">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Gender
              </label>
              <select
                value={formData.gender}
                onChange={(e) => handleChange("gender", e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-gray-900"
              >
                <option value="">Select your gender</option>
                {genders.map((gender) => (
                  <option
                    key={gender.toLowerCase()}
                    value={gender.toLowerCase()}
                  >
                    {gender}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Role
              </label>
              <select
                value={formData.role}
                onChange={(e) => handleChange("role", e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-gray-900"
              >
                <option value="">Select your role</option>
                {roles.map((role) => (
                  <option key={role.toLowerCase()} value={role.toLowerCase()}>
                    {role}
                  </option>
                ))}
              </select>
            </div>

            <button
              onClick={handleNext}
              disabled={!isStep1Valid()}
              className={`w-full py-3 px-4 ${
                isStep1Valid()
                  ? "bg-indigo-600 hover:bg-indigo-700"
                  : "bg-indigo-300 cursor-not-allowed"
              } text-white font-medium rounded-lg shadow transition duration-200 ease-in-out`}
            >
              Continue
            </button>
          </div>
        </Modal>
      )}

      {step === 2 && (
        <Modal title="What are your mental health goals?">
          <div className="space-y-6">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Add your goals (press Enter after each goal)
              </label>
              <input
                type="text"
                value={goalInput}
                onChange={(e) => setGoalInput(e.target.value)}
                onKeyDown={handleAddGoal}
                placeholder="Type a goal and press Enter"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-gray-900"
              />

              <div className="flex flex-wrap gap-2 mt-4">
                {formData.mentalHealthGoals.map((goal, index) => (
                  <div
                    key={index}
                    className="bg-indigo-100 text-indigo-800 px-3 py-2 rounded-full flex items-center text-sm font-medium shadow-sm"
                  >
                    <span>{goal}</span>
                    <button
                      onClick={() => handleRemoveGoal(goal)}
                      className="ml-2 text-indigo-500 hover:text-indigo-800 focus:outline-none"
                      aria-label="Remove goal"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </button>
                  </div>
                ))}
                {formData.mentalHealthGoals.length === 0 && (
                  <p className="text-sm text-gray-500 italic">
                    No goals added yet. Add some to continue.
                  </p>
                )}
              </div>
            </div>

            <div className="flex gap-4">
              <button
                onClick={handleBack}
                className="flex-1 py-3 px-4 bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium rounded-lg shadow transition duration-200 ease-in-out"
              >
                Back
              </button>
              <button
                onClick={handleNext}
                disabled={!isStep2Valid()}
                className={`flex-1 py-3 px-4 ${
                  isStep2Valid()
                    ? "bg-indigo-600 hover:bg-indigo-700"
                    : "bg-indigo-300 cursor-not-allowed"
                } text-white font-medium rounded-lg shadow transition duration-200 ease-in-out`}
              >
                Continue
              </button>
            </div>
          </div>
        </Modal>
      )}

      {step === 3 && (
        <Modal title="Choose your preferred language">
          <div className="space-y-6">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Language preference
              </label>
              <select
                value={formData.preferredLanguage}
                onChange={(e) =>
                  handleChange("preferredLanguage", e.target.value)
                }
                className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-gray-900"
              >
                {languages.map((language) => (
                  <option key={language} value={language}>
                    {language}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex gap-4">
              <button
                onClick={handleBack}
                className="flex-1 py-3 px-4 bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium rounded-lg shadow transition duration-200 ease-in-out"
              >
                Back
              </button>
              <button
                onClick={handleSubmit}
                disabled={!isStep3Valid()}
                className={`flex-1 py-3 px-4 ${
                  isStep3Valid()
                    ? "bg-green-600 hover:bg-green-700"
                    : "bg-green-300 cursor-not-allowed"
                } text-white font-medium rounded-lg shadow transition duration-200 ease-in-out`}
              >
                Complete
              </button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

const Modal = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => {
  return (
    <div className="bg-white p-8 rounded-xl shadow-xl w-full max-w-md border border-gray-100">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">{title}</h2>
      {children}
    </div>
  );
};

export default Onboarding;
