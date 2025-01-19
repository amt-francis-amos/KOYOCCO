import React, { useState } from "react"; 
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const PropertySales = () => {
  const [isPropertyOwner, setIsPropertyOwner] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    location: "",
    price: "",
    photos: [],
    video: null,
    propertyType: "", // propertyType is part of the form data state
  });
  const [error, setError] = useState(""); // Error state to display form validation errors
  const [showPaymentForm, setShowPaymentForm] = useState(false);

  const handleFileChange = (e) => {
    const { name, files } = e.target;

    if (name === "photos") {
      setFormData((prevData) => ({
        ...prevData,
        photos: [...prevData.photos, ...files],
      }));
    } else if (name === "video") {
      setFormData((prevData) => ({
        ...prevData,
        video: files[0],
      }));
    }
  };

  const handlePostListing = async () => {
    const { name, description, location, price, photos, video, propertyType } = formData;
  
    // Validate if all fields are filled, including the propertyType
    if (!name || !description || !location || !price || !propertyType) {
      setError("All fields are required.");
      toast.error("All fields are required!");
      return;
    }
  
    if (photos.length === 0) {
      setError("Please upload at least one photo.");
      toast.error("Please upload at least one photo!");
      return;
    }
  
    if (!video) {
      setError("Please upload a video.");
      toast.error("Please upload a video!");
      return;
    }

    // Reset error state when all fields are validated
    setError("");

    const formDataToSend = new FormData();
    formDataToSend.append("name", name);
    formDataToSend.append("description", description);
    formDataToSend.append("location", location);
    formDataToSend.append("price", price);
    formDataToSend.append("propertyType", propertyType);  // Appending the propertyType to the form data
    photos.forEach((photo) => formDataToSend.append("photos", photo));
    formDataToSend.append("video", video);
  
    if (isPropertyOwner) {
      formDataToSend.append("promotionFeePaid", true);
      formDataToSend.append("isPropertyOwner", true);
    } else {
      formDataToSend.append("agentSubscription", true);
      formDataToSend.append("isPropertyOwner", false);
    }
  
    try {
      const response = await axios.post(
        "https://koyocco-backend.onrender.com/api/post-listing/upload",
        formDataToSend,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      toast.success("Property uploaded successfully!");
      // Reset formData after successful upload
      setFormData({
        name: "",
        description: "",
        location: "",
        price: "",
        photos: [],
        video: null,
        propertyType: "",  
      });
    } catch (error) {
      console.error("Error uploading property:", error);
      toast.error("Failed to upload property. Please try again.");
    }
  };

  const handlePaymentSuccess = () => {
    toast.success("Payment Successful! Your property has been posted.");
    setShowPaymentForm(false);
    handlePostListing();
  };

  const handlePaymentFailure = () => {
    toast.error("Payment Failed! Please try again.");
    setShowPaymentForm(false);
  };

  const initializePayment = () => {
    const handler = window.PaystackPop.setup({
      key: "pk_live_be305faba4d35f18862ba2e58aeaff4a1aadbaa5",
      email: "francismarkamos71@gmail.com",
      amount: 5000, // Amount in Ghana cedis (₵)
      currency: "GH₵", // Set currency to Ghanaian Cedis
      callback: handlePaymentSuccess,
      onClose: handlePaymentFailure,
    });

    handler.openIframe();
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10">
      <div className="container mx-auto px-6">
        <ToastContainer />
        <h1 className="text-4xl font-bold text-center mb-6">Post Property for Sale</h1>

        <div className="flex flex-col sm:flex-row justify-center items-center mb-8 gap-4">
          <button
            onClick={() => setIsPropertyOwner(true)}
            className={`py-2 px-6 rounded-lg text-lg font-semibold ${
              isPropertyOwner ? "bg-red-500 text-white" : "bg-gray-300 text-gray-700"
            } w-full sm:w-auto`}
          >
            Property Owner
          </button>
          <button
            onClick={() => setIsPropertyOwner(false)}
            className={`py-2 px-6 rounded-lg text-lg font-semibold ${
              !isPropertyOwner ? "bg-red-500 text-white" : "bg-gray-300 text-gray-700"
            } w-full sm:w-auto`}
          >
            Agent (Rental)
          </button>
        </div>

        <div className="bg-white shadow-lg rounded-lg p-8">
          <h2 className="text-2xl font-semibold mb-4">
            {isPropertyOwner ? "Property Owner Post" : "Agent (Rental) Post"}
          </h2>
          <p className="text-gray-600 mb-6">
            {isPropertyOwner
              ? "As a property owner, you can post your properties for sale. You are required to pay a small fee for promotion and visibility to potential buyers."
              : "As an agent, you can post rental properties. There is no additional fee for posting, and you can list as many properties as needed."}
          </p>

          {error && <div className="text-red-500 text-center mb-4">{error}</div>}

          <div className="mb-6">
            <label className="block text-lg font-medium text-gray-700 mb-2">Property Name</label>
            <input
              type="text"
              className="w-full p-3 border border-gray-300 rounded-lg"
              placeholder="Enter property title"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
          </div>

          <div className="mb-6">
            <label className="block text-lg font-medium text-gray-700 mb-2">Description</label>
            <textarea
              rows="4"
              className="w-full p-3 border border-gray-300 rounded-lg"
              placeholder="Enter property description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            ></textarea>
          </div>

          <div className="mb-6">
            <label className="block text-lg font-medium text-gray-700 mb-2">Location</label>
            <input
              type="text"
              className="w-full p-3 border border-gray-300 rounded-lg"
              placeholder="Enter property location"
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
            />
          </div>

          <div className="mb-6">
            <label className="block text-lg font-medium text-gray-700 mb-2">Property Type</label>
            <select
              name="propertyType"
              value={formData.propertyType}
              onChange={(e) => setFormData({ ...formData, propertyType: e.target.value })}
              className="w-full p-3 border border-gray-300 rounded-lg"
            >
              <option value="">Select Property Type</option>
              <option value="House">House</option>
              <option value="Apartment">Apartment</option>
              <option value="Commercial">Commercial</option>
              <option value="Land">Land</option>
            </select>
          </div>

          <div className="mb-6">
            <label className="block text-lg font-medium text-gray-700 mb-2">Price</label>
            <input
              type="text"
              className="w-full p-3 border border-gray-300 rounded-lg"
              placeholder="Enter property price"
              value={formData.price}
              onChange={(e) => setFormData({ ...formData, price: e.target.value })}
            />
          </div>

          <div className="mb-6">
            <label className="block text-lg font-medium text-gray-700 mb-2">Photos</label>
            <input
              type="file"
              name="photos"
              multiple
              className="w-full p-3 border border-gray-300 rounded-lg"
              onChange={handleFileChange}
            />
          </div>

          <div className="mb-6">
            <label className="block text-lg font-medium text-gray-700 mb-2">Video</label>
            <input
              type="file"
              name="video"
              className="w-full p-3 border border-gray-300 rounded-lg"
              onChange={handleFileChange}
            />
          </div>

          <div className="mb-6">
            {showPaymentForm && (
              <div className="bg-green-100 p-6 rounded-lg">
                <h3 className="text-xl text-green-600 mb-4">Payment Form</h3>
                {/* Your Payment Form Integration Here */}
              </div>
            )}
          </div>

          <div className="flex justify-center gap-4">
            <button
              onClick={initializePayment}
              className="py-3 px-8 bg-red-500 text-white font-semibold rounded-lg"
            >
              Pay & Post Property
            </button>
            <button
              onClick={handlePostListing}
              className="py-3 px-8 bg-blue-500 text-white font-semibold rounded-lg"
            >
              Post Property
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertySales;
