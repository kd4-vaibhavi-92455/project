import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const GetQuotePage = () => {
  const navigate = useNavigate();
  const [showQuote, setShowQuote] = useState(false);
  const [quote, setQuote] = useState(null);
  
  const [formData, setFormData] = useState({
    // User details (pre-filled from auth)
    name: 'John Doe',
    mobile: '9876543210',
    email: 'john@example.com',
    
    // Service Details
    serviceType: '',
    pickupDate: '',
    pickupCity: '',
    dropCity: '',
    pickupAddress: '',
    dropAddress: '',
    
    // Goods Information
    goodsCategory: '',
    weight: '',
    itemCount: '',
    pickupFloor: '',
    dropFloor: '',
    liftAvailable: 'yes',
    
    // Vehicle & Manpower
    vehicleType: '',
    laborers: '',
    packingRequired: false,
    unpackingRequired: false,
    
    // Additional Services
    insuranceRequired: false,
    storageRequired: false,
    specialHandling: []
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === 'checkbox') {
      if (name === 'specialHandling') {
        setFormData(prev => ({
          ...prev,
          specialHandling: checked 
            ? [...prev.specialHandling, value]
            : prev.specialHandling.filter(item => item !== value)
        }));
      } else {
        setFormData(prev => ({ ...prev, [name]: checked }));
      }
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const calculateQuote = () => {
    const servicePrices = { household: 5000, office: 8000, vehicle: 3000, warehouse: 10000 };
    const vehiclePrices = { mini: 2000, medium: 4000, large: 6000 };
    
    let basePrice = servicePrices[formData.serviceType] || 0;
    let vehiclePrice = vehiclePrices[formData.vehicleType] || 0;
    let weightPrice = (parseFloat(formData.weight) || 0) * 10;
    let laborPrice = (parseInt(formData.laborers) || 0) * 500;
    
    let additionalServices = 0;
    if (formData.packingRequired) additionalServices += 1000;
    if (formData.unpackingRequired) additionalServices += 800;
    if (formData.insuranceRequired) additionalServices += 500;
    if (formData.storageRequired) additionalServices += 1500;
    additionalServices += formData.specialHandling.length * 300;
    
    let subtotal = basePrice + vehiclePrice + weightPrice + laborPrice + additionalServices;
    let gst = subtotal * 0.18;
    let total = subtotal + gst;
    
    return {
      basePrice,
      vehiclePrice,
      weightPrice,
      laborPrice,
      additionalServices,
      subtotal,
      gst,
      total,
      validity: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toLocaleDateString()
    };
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const calculatedQuote = calculateQuote();
    setQuote(calculatedQuote);
    localStorage.setItem('quote', JSON.stringify({ formData, quote: calculatedQuote }));
    setShowQuote(true);
  };

  const handleProceedToBooking = () => {
    navigate('/customer/booking', { state: { formData, quote } });
  };

  if (showQuote) {
    return (
      <div className="min-h-screen bg-blue-50 py-8">
        <div className="max-w-4xl mx-auto px-4">
          <div className="bg-white rounded-lg shadow-md p-8">
            <h2 className="text-3xl font-bold text-center mb-8">Your Quote</h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold mb-4">Service Summary</h3>
                <div className="space-y-2 text-sm">
                  <p><span className="font-medium">Service:</span> {formData.serviceType}</p>
                  <p><span className="font-medium">From:</span> {formData.pickupCity}</p>
                  <p><span className="font-medium">To:</span> {formData.dropCity}</p>
                  <p><span className="font-medium">Date:</span> {formData.pickupDate}</p>
                  <p><span className="font-medium">Vehicle:</span> {formData.vehicleType}</p>
                  <p><span className="font-medium">Weight:</span> {formData.weight} kg</p>
                </div>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold mb-4">Price Breakdown</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Base Price:</span>
                    <span>₹{quote.basePrice}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Vehicle Charges:</span>
                    <span>₹{quote.vehiclePrice}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Weight Charges:</span>
                    <span>₹{quote.weightPrice}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Labor Charges:</span>
                    <span>₹{quote.laborPrice}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Additional Services:</span>
                    <span>₹{quote.additionalServices}</span>
                  </div>
                  <hr />
                  <div className="flex justify-between">
                    <span>Subtotal:</span>
                    <span>₹{quote.subtotal}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>GST (18%):</span>
                    <span>₹{quote.gst.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between font-bold text-lg">
                    <span>Total:</span>
                    <span>₹{quote.total.toFixed(2)}</span>
                  </div>
                </div>
                <p className="text-sm text-gray-600 mt-4">Valid until: {quote.validity}</p>
              </div>
            </div>
            
            <div className="flex gap-4 mt-8 justify-center">
              <button
                onClick={handleProceedToBooking}
                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
              >
                Proceed to Booking
              </button>
              <button
                onClick={() => setShowQuote(false)}
                className="bg-gray-600 text-white px-6 py-2 rounded-lg hover:bg-gray-700"
              >
                Modify Details
              </button>
              <button
                onClick={() => navigate('/')}
                className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-blue-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow-md p-8">
          <h2 className="text-3xl font-bold text-center mb-8">Get Quote</h2>
          
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Service Details */}
            <div>
              <h3 className="text-xl font-semibold mb-4">Service Details</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Service Type</label>
                  <select name="serviceType" value={formData.serviceType} onChange={handleChange} required
                    className="w-full p-2 border rounded-md">
                    <option value="">Select Service</option>
                    <option value="household">Household</option>
                    <option value="office">Office</option>
                    <option value="vehicle">Vehicle</option>
                    <option value="warehouse">Warehouse</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Pickup Date</label>
                  <input type="date" name="pickupDate" value={formData.pickupDate} onChange={handleChange} required
                    className="w-full p-2 border rounded-md" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Pickup City</label>
                  <input type="text" name="pickupCity" value={formData.pickupCity} onChange={handleChange} required
                    className="w-full p-2 border rounded-md" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Drop City</label>
                  <input type="text" name="dropCity" value={formData.dropCity} onChange={handleChange} required
                    className="w-full p-2 border rounded-md" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Pickup Address</label>
                  <textarea name="pickupAddress" value={formData.pickupAddress} onChange={handleChange} required
                    className="w-full p-2 border rounded-md" rows="2"></textarea>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Drop Address</label>
                  <textarea name="dropAddress" value={formData.dropAddress} onChange={handleChange} required
                    className="w-full p-2 border rounded-md" rows="2"></textarea>
                </div>
              </div>
            </div>

            {/* Goods Information */}
            <div>
              <h3 className="text-xl font-semibold mb-4">Goods Information</h3>
              <div className="grid md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Goods Category</label>
                  <select name="goodsCategory" value={formData.goodsCategory} onChange={handleChange} required
                    className="w-full p-2 border rounded-md">
                    <option value="">Select Category</option>
                    <option value="furniture">Furniture</option>
                    <option value="electronics">Electronics</option>
                    <option value="documents">Documents</option>
                    <option value="others">Others</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Weight (kg)</label>
                  <input type="number" name="weight" value={formData.weight} onChange={handleChange} required
                    className="w-full p-2 border rounded-md" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Number of Items</label>
                  <input type="number" name="itemCount" value={formData.itemCount} onChange={handleChange} required
                    className="w-full p-2 border rounded-md" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Pickup Floor</label>
                  <select name="pickupFloor" value={formData.pickupFloor} onChange={handleChange} required
                    className="w-full p-2 border rounded-md">
                    <option value="">Select Floor</option>
                    <option value="ground">Ground Floor</option>
                    <option value="1">1st Floor</option>
                    <option value="2">2nd Floor</option>
                    <option value="3+">3rd Floor & Above</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Drop Floor</label>
                  <select name="dropFloor" value={formData.dropFloor} onChange={handleChange} required
                    className="w-full p-2 border rounded-md">
                    <option value="">Select Floor</option>
                    <option value="ground">Ground Floor</option>
                    <option value="1">1st Floor</option>
                    <option value="2">2nd Floor</option>
                    <option value="3+">3rd Floor & Above</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Lift Available</label>
                  <select name="liftAvailable" value={formData.liftAvailable} onChange={handleChange}
                    className="w-full p-2 border rounded-md">
                    <option value="yes">Yes</option>
                    <option value="no">No</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Vehicle & Manpower */}
            <div>
              <h3 className="text-xl font-semibold mb-4">Vehicle & Manpower</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Vehicle Type</label>
                  <select name="vehicleType" value={formData.vehicleType} onChange={handleChange} required
                    className="w-full p-2 border rounded-md">
                    <option value="">Select Vehicle</option>
                    <option value="mini">Mini Truck</option>
                    <option value="medium">Medium Truck</option>
                    <option value="large">Large Truck</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Number of Laborers</label>
                  <input type="number" name="laborers" value={formData.laborers} onChange={handleChange} required
                    className="w-full p-2 border rounded-md" min="1" max="10" />
                </div>
                <div className="flex items-center">
                  <input type="checkbox" name="packingRequired" checked={formData.packingRequired} onChange={handleChange}
                    className="mr-2" />
                  <label>Packing Required</label>
                </div>
                <div className="flex items-center">
                  <input type="checkbox" name="unpackingRequired" checked={formData.unpackingRequired} onChange={handleChange}
                    className="mr-2" />
                  <label>Unpacking Required</label>
                </div>
              </div>
            </div>

            {/* Additional Services */}
            <div>
              <h3 className="text-xl font-semibold mb-4">Additional Services</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="flex items-center">
                  <input type="checkbox" name="insuranceRequired" checked={formData.insuranceRequired} onChange={handleChange}
                    className="mr-2" />
                  <label>Insurance Required</label>
                </div>
                <div className="flex items-center">
                  <input type="checkbox" name="storageRequired" checked={formData.storageRequired} onChange={handleChange}
                    className="mr-2" />
                  <label>Storage Required</label>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Special Handling</label>
                  <div className="space-y-2">
                    {['fragile', 'highValue', 'oversized'].map(item => (
                      <div key={item} className="flex items-center">
                        <input type="checkbox" name="specialHandling" value={item}
                          checked={formData.specialHandling.includes(item)} onChange={handleChange}
                          className="mr-2" />
                        <label className="capitalize">{item.replace(/([A-Z])/g, ' $1')}</label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="text-center">
              <button type="submit" className="bg-blue-600 text-white px-8 py-3 rounded-lg text-lg hover:bg-blue-700">
                Get Quote
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default GetQuotePage;