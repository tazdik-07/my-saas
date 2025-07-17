"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { format } from "date-fns";
import { Home, Phone, Trash2, Pencil } from "lucide-react";
import { useSession } from "next-auth/react";

export default function ProfileClient({ user: initialUser, familyMembers: initialFamilyMembers }) {
  const [user, setUser] = useState(initialUser);
  const [familyMembers, setFamilyMembers] = useState(initialFamilyMembers);
  const [initialLoading, setInitialLoading] = useState(!initialUser); // New state for initial data fetch
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [dateOfBirthError, setDateOfBirthError] = useState("");
  const [phoneNumberError, setPhoneNumberError] = useState("");
  const [familyMemberDateOfBirthError, setFamilyMemberDateOfBirthError] = useState("");
  const [familyMemberPhoneNumberError, setFamilyMemberPhoneNumberError] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    dateOfBirth: "",
    bloodGroup: "",
    gender: "",
  });
  const [familyMemberFormData, setFamilyMemberFormData] = useState({
    id: null,
    firstName: "",
    lastName: "",
    phoneNumber: "",
    dateOfBirth: "",
    bloodGroup: "",
    gender: "",
    relation: "",
  });
  const [showAddFamilyMemberModal, setShowAddFamilyMemberModal] = useState(false);
  const [isViewingFamilyMember, setIsViewingFamilyMember] = useState(false);
  const router = useRouter();
  const { data: session, status } = useSession();

  useEffect(() => {
    if (initialUser) {
      setUser(initialUser);
      setInitialLoading(false);
      setFormData({
        firstName: initialUser.firstName || "",
        lastName: initialUser.lastName || "",
        phoneNumber: initialUser.phoneNumber || "",
        dateOfBirth: initialUser.dateOfBirth ? format(new Date(initialUser.dateOfBirth), "yyyy-MM-dd") : "", // Ensure correct format for date input
        bloodGroup: initialUser.bloodGroup || "",
        gender: initialUser.gender || "",
      });
    } else if (status === "authenticated" && session?.user?.id) {
      // If initialUser is null but client-side session is authenticated, fetch user data
      const fetchUserData = async () => {
        try {
          const res = await fetch("/api/profile");
          if (!res.ok) {
            throw new Error("Failed to fetch user data");
          }
          const data = await res.json();
          setUser(data);
          setFamilyMembers(data.familyMembers);
          setFormData({
            firstName: data.firstName || "",
            lastName: data.lastName || "",
            phoneNumber: data.phoneNumber || "",
            dateOfBirth: data.dateOfBirth ? format(new Date(data.dateOfBirth), "yyyy-MM-dd") : "",
            bloodGroup: data.bloodGroup || "",
            gender: data.gender || "",
          });
        } catch (err) {
          setError(err.message);
        } finally {
          setInitialLoading(false);
        }
      };
      fetchUserData();
    } else if (status === "unauthenticated") {
      setInitialLoading(false);
      // Optionally redirect to login if unauthenticated and no initial user
      // router.push("/auth/signin");
    }
  }, [initialUser, initialFamilyMembers, session, status]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "phoneNumber") {
      // Only allow numeric input
      if (/^\d*$/.test(value)) {
        setFormData((prev) => ({ ...prev, [name]: value }));
        if (value.length !== 10) {
          setPhoneNumberError("Phone number must be 10 digits long.");
        } else {
          setPhoneNumberError("");
        }
      }
    } else if (name === "dateOfBirth") {
      const year = value.substring(0, 4);
      if (year.length === 4 && /^[0-9]{4}$/.test(year)) {
        setDateOfBirthError("");
      } else {
        setDateOfBirthError("Enter a valid 4-digit birth year.");
      }
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
    else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleFamilyMemberInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "phoneNumber") {
      // Only allow numeric input
      if (/^\d*$/.test(value)) {
        setFamilyMemberFormData((prev) => ({ ...prev, [name]: value }));
        if (value.length !== 10) {
          setFamilyMemberPhoneNumberError("Phone number must be 10 digits long.");
        } else {
          setFamilyMemberPhoneNumberError("");
        }
      }
    } else if (name === "dateOfBirth") {
      const year = value.substring(0, 4);
      if (year.length === 4 && /^[0-9]{4}$/.test(year)) {
        setFamilyMemberDateOfBirthError("");
      } else {
        setFamilyMemberDateOfBirthError("Enter a valid 4-digit birth year.");
      }
      setFamilyMemberFormData((prev) => ({ ...prev, [name]: value }));
    } else {
      setFamilyMemberFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleProfileSubmit = async (e) => {
    e.preventDefault();

    if (dateOfBirthError || phoneNumberError) {
      return; // Prevent form submission if there's a date of birth or phone number error
    }

    setLoading(true);
    try {
      const res = await fetch("/api/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (!res.ok) {
        throw new Error(`Error: ${res.status}`);
      }
      const data = await res.json();
      setUser(data.user);
      setIsEditing(false);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleViewFamilyMember = (member) => {
    setFamilyMemberFormData({
      id: member.id,
      firstName: member.firstName,
      lastName: member.lastName,
      phoneNumber: member.phoneNumber || "",
      dateOfBirth: member.dateOfBirth ? format(new Date(member.dateOfBirth), "dd-MM-yyyy") : "",
      bloodGroup: member.bloodGroup || "",
      gender: member.gender || "",
      relation: member.relation || "",
    });
    setIsViewingFamilyMember(true);
    setShowAddFamilyMemberModal(true);
  };

  const handleSubmitFamilyMemberForm = async (e) => {
    e.preventDefault();

    if (familyMemberDateOfBirthError || familyMemberPhoneNumberError) {
      return; // Prevent form submission if there's a family member date of birth or phone number error
    }

    try {
      const method = familyMemberFormData.id ? "PUT" : "POST";
      const url = familyMemberFormData.id ? `/api/profile/family-members/${familyMemberFormData.id}` : "/api/profile/family-members";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(familyMemberFormData),
      });
      if (!res.ok) {
        throw new Error(`Error: ${res.status}`);
      }
      const data = await res.json();

      if (familyMemberFormData.id) {
        // Update existing family member in the list
        setFamilyMembers((prev) =>
          prev.map((member) => (member.id === data.familyMember.id ? data.familyMember : member))
        );
      } else {
        // Add new family member to the list
        setFamilyMembers((prev) => [...prev, data.familyMember]);
      }
      setFamilyMemberFormData({
        id: null,
        firstName: "",
        lastName: "",
        phoneNumber: "",
        dateOfBirth: "",
        bloodGroup: "",
        gender: "",
        relation: "",
      });
      setShowAddFamilyMemberModal(false);
    } catch (err) {
      setError(err.message);
    }
  };

  const capitalizeFirstLetter = (string) => {
    if (!string) return "";
    return string.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  };

  const handleDeleteFamilyMember = async (id) => {
    try {
      const res = await fetch(`/api/profile/family-members/${id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      });
      if (!res.ok) {
        throw new Error(`Error: ${res.status}`);
      }
      setFamilyMembers((prev) => prev.filter((member) => member.id !== id));
    } catch (err) {
      setError(err.message);
    }
  };

  

  
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-[#0B1220] via-[#0F1629] to-[#0B1220] pt-8 pb-0 text-white">
      {/* Overlays - these should be conditionally rendered on top */}
      {(initialLoading || loading) && (
        <div className="fixed inset-0 flex justify-center items-center bg-blur z-50">
          <div className="flex flex-col items-center">
            <div className="loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-12 w-12 mb-4"></div>
            <div className="text-white text-xl font-semibold">Loading...</div>
          </div>
        </div>
      )}

      {error && (
        <div className="fixed inset-0 flex justify-center items-center bg-blur z-50">
          <div className="text-red-500 text-xl font-semibold">Error: {error}</div>
        </div>
      )}

      {!user && !initialLoading && !loading && !error && (
        <div className="fixed inset-0 flex justify-center items-center bg-blur z-50">
          <div className="text-white text-xl font-semibold">No user data found. Please ensure you are logged in.</div>
        </div>
      )}

      {/* Main content - only show if user data is available and not in a loading/error state */}
      {user && !initialLoading && !loading && !error && (
        <>
          <div className="absolute top-8 left-8">
            <button
              onClick={() => {
                setLoading(true);
                router.push("/");
              }}
              className="btn-primary px-4 py-2 rounded-md text-sm font-semibold flex items-center space-x-2 cursor-pointer"
            >
              <Home size={18} />
              <span>Go to Home</span>
            </button>
          </div>
          <div className="max-w-6xl mx-auto text-center mb-8">
            <h1 className="text-2xl font-bold mb-2 heading">Patient Profile</h1>
            <p className="text-sm text-gray-400">Manage your personal information and family members</p>
          </div>
          <div className="max-w-6xl mx-auto flex flex-wrap lg:flex-nowrap gap-8">
            {/* User Profile Card */}
            <div className="w-full lg:w-1/2 bg-[#1E2741] p-8 pb-0 rounded-lg shadow-xl border border-gray-700 mb-8 lg:mb-0">
              <h1 className="text-2xl font-bold mb-6 text-center heading">Your Profile</h1>

              <section className="mb-8">
                {!isEditing ? (
                  <div className="space-y-3">
                    <div className="flex space-x-4">
                      <div className="flex-1">
                        <label htmlFor="firstName" className="block text-sm font-medium ">First Name</label>
                        <input type="text" id="firstName" name="firstName" value={capitalizeFirstLetter(user?.firstName) || ""} className="mt-1 block w-full p-2 rounded-md bg-gray-700 border border-gray-600" readOnly />
                      </div>
                      <div className="flex-1">
                        <label htmlFor="lastName" className="block text-sm font-medium">Last Name</label>
                        <input type="text" id="lastName" name="lastName" value={capitalizeFirstLetter(user?.lastName) || ""} className="mt-1 block w-full p-2 rounded-md bg-gray-700 border border-gray-600" readOnly />
                      </div>
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium">Email</label>
                      <input type="text" id="email" name="email" value={user?.email || ""} className="mt-1 block w-full p-2 rounded-md bg-gray-700 border border-gray-600" readOnly />
                    </div>
                    <div>
                      <label htmlFor="phoneNumber" className="block text-sm font-medium">Phone Number</label>
                      <div className="relative mt-1">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <Phone size={18} className="text-gray-400" />
                        </div>
                        <input type="tel" id="phoneNumber" name="phoneNumber" value={user?.phoneNumber || ""} className=" border block w-full pl-10 pr-3 py-2 rounded-md bg-gray-700 border-gray-600" readOnly inputMode="numeric" pattern="[0-9]*" />
                      </div>
                    </div>
                    <div className="flex space-x-4">
                      <div className="flex-1">
                        <label htmlFor="gender" className="block text-sm font-medium">Gender</label>
                        <input type="text" id="gender" name="gender" value={user?.gender || ""} className="border mt-1 block w-full p-2 rounded-md bg-gray-700 border-gray-600" readOnly />
                      </div>
                      <div className="flex-1">
                        <label htmlFor="bloodGroup" className="block text-sm font-medium">Blood Group</label>
                        <input type="text" id="bloodGroup" name="bloodGroup" value={user?.bloodGroup || ""} className="border mt-1 block w-full p-2 rounded-md bg-gray-700 border-gray-600" readOnly />
                      </div>
                    </div>
                    <div>
                      <label htmlFor="dateOfBirth" className="block text-sm font-medium">Date of Birth</label>
                      <input type="text" id="dateOfBirth" name="dateOfBirth" value={user?.dateOfBirth ? format(new Date(user.dateOfBirth), "dd-MM-yyyy") : ""} className="border mt-1 block w-full p-2 rounded-md bg-gray-700 border-gray-600" readOnly />
                    </div>
                    <button
                      onClick={() => setIsEditing(true)}
                      className="mt-4 btn-primary px-4 py-2 rounded-md text-sm font-semibold"
                    >
                      Edit Profile
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleProfileSubmit} className="space-y-4">
                    <div className="flex space-x-4">
                      <div className="flex-1">
                        <label htmlFor="firstName" className="block text-sm font-medium">First Name</label>
                        <input type="text" id="firstName" name="firstName" value={capitalizeFirstLetter(formData.firstName)} onChange={handleInputChange} className="mt-1 block w-full p-2 rounded-md bg-gray-700 border-gray-600" required />
                      </div>
                      <div className="flex-1">
                        <label htmlFor="lastName" className="block text-sm font-medium">Last Name</label>
                        <input type="text" id="lastName" name="lastName" value={capitalizeFirstLetter(formData.lastName)} onChange={handleInputChange} className="mt-1 block w-full p-2 rounded-md bg-gray-700 border-gray-600" required />
                      </div>
                    </div>
                    <div>
                      <label htmlFor="phoneNumber" className="block text-sm font-medium">Phone Number</label>
                      <div className="relative mt-1">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <Phone size={18} className="text-gray-400" />
                        </div>
                        <input type="tel" id="phoneNumber" name="phoneNumber" value={formData.phoneNumber} onChange={handleInputChange} className="block w-full pl-10 pr-3 py-2 rounded-md bg-gray-700 border-gray-600" inputMode="numeric" pattern="[0-9]*" />
                      </div>
                      {phoneNumberError && <span className="text-red-500 text-xs mt-1">{phoneNumberError}</span>}
                    </div>
                    <div className="flex space-x-4">
                      <div className="flex-1">
                        <label htmlFor="gender" className="block text-sm font-medium">Gender</label>
                        <select id="gender" name="gender" value={formData.gender} onChange={handleInputChange} className="mt-1 block w-full p-2 rounded-md bg-gray-700 border-gray-600 text-xs text-gray-400">
                          <option value="">Select Gender</option>
                          <option value="Male">Male</option>
                          <option value="Female">Female</option>
                          <option value="Other">Other</option>
                        </select>
                      </div>
                      <div className="flex-1">
                        <label htmlFor="bloodGroup" className="block text-sm font-medium">Blood Group</label>
                        <select id="bloodGroup" name="bloodGroup" value={formData.bloodGroup} onChange={handleInputChange} className="mt-1 block w-full p-2 rounded-md bg-gray-700 border-gray-600 text-xs text-gray-400">
                          <option value="">Select Blood Group</option>
                          <option value="A+">A+</option>
                          <option value="A-">A-</option>
                          <option value="B+">B+</option>
                          <option value="B-">B-</option>
                          <option value="AB+">AB+</option>
                          <option value="AB-">AB-</option>
                          <option value="O+">O+</option>
                          <option value="O-">O-</option>
                        </select>
                      </div>
                    </div>
                    <div>
                      <label htmlFor="dateOfBirth" className="block text-sm font-medium">Date of Birth</label>
                      <input type="date" id="dateOfBirth" name="dateOfBirth" value={formData.dateOfBirth} onChange={handleInputChange} className="mt-1 block w-full p-2 rounded-md bg-gray-700 border-gray-600 text-xs text-gray-400" />
                      {dateOfBirthError && <span className="text-red-500 text-xs mt-1">{dateOfBirthError}</span>}
                    </div>
                    <div className="flex space-x-4">
                      <button type="submit" className="btn-primary px-4 py-2 rounded-md text-sm font-semibold">Save Changes</button>
                      <button type="button" onClick={() => setIsEditing(false)} className="px-4 py-2 rounded-md text-sm font-semibold bg-gray-600 hover:bg-gray-700">Cancel</button>
                    </div>
                  </form>
                )}
              </section>
            </div>

            {/* Family Members Card */}
            <div className="lg:w-1/2 bg-[#1E2741] p-8 rounded-lg shadow-xl border border-gray-700">
              <h1 className="text-2xl font-bold mb-6 text-center heading">Family Members</h1>

              <section>
              
                {familyMembers.length === 0 ? (
                  <p>No family members added yet.</p>
                ) : (
                  <div className="space-y-4">
                    {familyMembers.map((member) => (
                      <div key={member.id} className="w-full flex items-center justify-between bg-[#364153] p-4 rounded-lg shadow border border-gray-600 cursor-pointer"
                        onClick={() => handleViewFamilyMember(member)}>
                        <div className="flex flex-col ">
                          <p className="text-lg font-sans">{capitalizeFirstLetter(member.firstName)} {capitalizeFirstLetter(member.lastName)}</p>
                          <p className="text-sm text-gray-400">{member.relation}</p>
                        </div>
                        <div className="flex space-x-2">
                          <button
                            onClick={(e) => {
                              e.stopPropagation(); // Prevent card click from firing
                              handleDeleteFamilyMember(member.id);
                            }}
                            className="text-red-500 hover:text-red-700 p-1 rounded-full"
                            title="Delete Family Member"
                          >
                            <Trash2 size={18} />
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation(); // Prevent card click from firing
                              setFamilyMemberFormData({
                                id: member.id,
                                firstName: member.firstName,
                                lastName: member.lastName,
                                phoneNumber: member.phoneNumber || "",
                                dateOfBirth: member.dateOfBirth ? format(new Date(member.dateOfBirth), "dd-MM-yyyy") : "",
                                bloodGroup: member.bloodGroup || "",
                                gender: member.gender || "",
                                relation: member.relation || "",
                              });
                              setIsViewingFamilyMember(false); // Ensure it's not in view mode if editing
                              setShowAddFamilyMemberModal(true);
                            }}
                            className="text-gray-400 hover:text-gray-200 p-1 rounded-full"
                            title="Edit Family Member"
                          >
                            <Pencil size={18} />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                <button
                  onClick={() => {
                    setFamilyMemberFormData({
                      id: null,
                      firstName: "",
                      lastName: "",
                      phoneNumber: "",
                      dateOfBirth: "",
                      bloodGroup: "",
                      gender: "",
                      relation: "",
                    });
                    setShowAddFamilyMemberModal(true);
                  }}
                  className="mt-4 btn-primary px-4 py-2 rounded-md text-sm font-semibold"
                >
                  Add Family Member
                </button>

                {showAddFamilyMemberModal && (
                  <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-50">
                    <div className="bg-[#1E2741] p-8 rounded-lg shadow-xl border border-gray-700 w-full max-w-md">
                      <h2 className="text-2xl font-bold mb-4 heading">
                        {isViewingFamilyMember
                          ? "Family Member Details"
                          : familyMemberFormData.id
                          ? "Edit Family Member"
                          : "Add New Family Member"}
                      </h2>
                      <form onSubmit={handleSubmitFamilyMemberForm} className="space-y-4">
                        <div className="flex space-x-4">
                          <div className="flex-1">
                            <label htmlFor="newFirstName" className="block text-sm font-medium">First Name</label>
                            <input type="text" id="newFirstName" name="firstName" value={capitalizeFirstLetter(familyMemberFormData.firstName)} onChange={handleFamilyMemberInputChange} className="mt-1 block w-full p-2 rounded-md bg-gray-700 border-gray-600" required={!isViewingFamilyMember} readOnly={isViewingFamilyMember} />
                          </div>
                          <div className="flex-1">
                            <label htmlFor="newLastName" className="block text-sm font-medium">Last Name</label>
                            <input type="text" id="newLastName" name="lastName" value={capitalizeFirstLetter(familyMemberFormData.lastName)} onChange={handleFamilyMemberInputChange} className="mt-1 block w-full p-2 rounded-md bg-gray-700 border-gray-600" required={!isViewingFamilyMember} readOnly={isViewingFamilyMember} />
                          </div>
                        </div>
                        <div>
                          <label htmlFor="newPhoneNumber" className="block text-sm font-medium">Phone Number</label>
                          <div className="relative mt-1">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                              <Phone size={18} className="text-gray-400" />
                            </div>
                            <input type="tel" id="newPhoneNumber" name="phoneNumber" value={familyMemberFormData.phoneNumber} onChange={handleFamilyMemberInputChange} className="block w-full pl-10 pr-3 py-2 rounded-md bg-gray-700 border-gray-600" readOnly={isViewingFamilyMember} inputMode="numeric" pattern="[0-9]*" />
                          </div>
                          {familyMemberPhoneNumberError && <span className="text-red-500 text-xs mt-1">{familyMemberPhoneNumberError}</span>}
                        </div>
                        <div className="flex space-x-4">
                          <div className="flex-1">
                            <label htmlFor="newGender" className="block text-sm font-medium">Gender</label>
                            <select id="newGender" name="gender" value={familyMemberFormData.gender} onChange={handleFamilyMemberInputChange} className="mt-1 block w-full p-2 rounded-md bg-gray-700 border-gray-600 text-xs text-gray-400" disabled={isViewingFamilyMember}>
                              <option value="">Select Gender</option>
                              <option value="Male">Male</option>
                              <option value="Female">Female</option>
                              <option value="Other">Other</option>
                            </select>
                          </div>
                          <div className="flex-1">
                            <label htmlFor="newBloodGroup" className="block text-sm font-medium">Blood Group</label>
                            <select id="newBloodGroup" name="bloodGroup" value={familyMemberFormData.bloodGroup} onChange={handleFamilyMemberInputChange} className="mt-1 block w-full p-2 rounded-md bg-gray-700 border-gray-600 text-xs text-gray-400" disabled={isViewingFamilyMember}>
                                <option value="">Select Blood Group</option>
                                <option value="A+">A+</option>
                                <option value="A-">A-</option>
                                <option value="B+">B+</option>
                                <option value="B-">B-</option>
                                <option value="AB+">AB+</option>
                                <option value="AB-">AB-</option>
                                <option value="O+">O+</option>
                                <option value="O-">O-</option>
                              </select>
                            </div>
                          </div>
                          <div>
                            <label htmlFor="newRelation" className="block text-sm font-medium">Relation</label>
                            <select id="newRelation" name="relation" value={familyMemberFormData.relation} onChange={handleFamilyMemberInputChange} className="mt-1 block w-full p-2 rounded-md bg-gray-700 border-gray-600 text-xs text-gray-400" required={!isViewingFamilyMember} disabled={isViewingFamilyMember}>
                              <option value="">Select Relation</option>
                              <option value="Spouse">Spouse</option>
                              <option value="Child">Child</option>
                              <option value="Parent">Parent</option>
                              <option value="Sibling">Sibling</option>
                              <option value="Other">Other</option>
                            </select>
                          </div>
                          <div>
                            <label htmlFor="newDateOfBirth" className="block text-sm font-medium">Date of Birth</label>
                            <input type="date" id="newDateOfBirth" name="dateOfBirth" value={familyMemberFormData.dateOfBirth} onChange={handleFamilyMemberInputChange} className="mt-1 block w-full p-2 rounded-md bg-gray-700 border-gray-600 text-xs text-gray-400" readOnly={isViewingFamilyMember} />
                            {familyMemberDateOfBirthError && <span className="text-red-500 text-xs mt-1">{familyMemberDateOfBirthError}</span>}
                          </div>
                          <div className="flex justify-end space-x-4">
                            <button type="button" onClick={() => {
                              setShowAddFamilyMemberModal(false);
                              setIsViewingFamilyMember(false); // Reset view mode on close
                              setFamilyMemberFormData({
                                id: null,
                                firstName: "",
                                lastName: "",
                                phoneNumber: "",
                                dateOfBirth: "",
                                bloodGroup: "",
                                gender: "",
                                relation: "",
                              });
                            }} className="px-4 py-2 rounded-md text-sm font-semibold bg-gray-600 hover:bg-gray-700">{isViewingFamilyMember ? "Close" : "Cancel"}</button>
                            {!isViewingFamilyMember && (
                              <button type="submit" className="btn-primary px-4 py-2 rounded-md text-sm font-semibold">{familyMemberFormData.id ? "Save Changes" : "Add Family Member"}</button>
                            )}
                          </div>
                        </form>
                      </div>
                    </div>
                  )}
                </section>
              </div>
            </div>
          </>
      )}
    </div>
  );
}
