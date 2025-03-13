import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaBicycle, FaMapMarkerAlt, FaDollarSign, FaTools, FaStar } from 'react-icons/fa';

const BikeServiceCenters = () => {
  const navigate = useNavigate();

  const serviceCenters = [
    {
      id: 1,
      name: 'speed_motors',
      status: 'Authorized',
      location: 'New York',
      rating: '4.5 / 5',
      priceRange: '$$',
      services: 'Sport, Cruiser'
    },
    {
      id: 2,
      name: 'speed_motors1',
      status: 'Authorized',
      location: 'New York',
      rating: '4.5 / 5',
      priceRange: '$$',
      services: 'Sport, Cruiser'
    },
    {
      id: 3,
      name: 'speed_motors2',
      status: 'Authorized',
      location: 'New York',
      rating: '4.5 / 5',
      priceRange: '$$',
      services: 'Sport, Cruiser'
    },
    {
      id: 4,
      name: 'ravibikes',
      status: 'Private',
      location: 'hyderabad',
      rating: '0 / 5',
      priceRange: 'medium',
      services: 'Sport'
    },
    {
      id: 5,
      name: 'ravi',
      status: 'Authorized',
      location: 'Hyd',
      rating: '4.5 / 5',
      priceRange: '$$',
      services: 'Sports'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Navigation */}
      <div className="p-4">
        <button 
          onClick={() => navigate('/services')}
          className="flex items-center text-gray-600 hover:text-gray-800"
        >
          <span className="mr-2">←</span> Back to Services
        </button>
      </div>

      {/* Header Banner */}
      <div className="bg-gradient-to-r from-blue-400 to-blue-600 text-white py-8 px-4">
        <div className="max-w-7xl mx-auto flex items-center gap-4">
          <div className="bg-blue-400/30 p-3 rounded-lg">
            <FaBicycle className="text-3xl" />
          </div>
          <div>
            <h1 className="text-3xl font-bold mb-2">Bike Service Centers</h1>
            <p>Find and book the best bike service centers near you</p>
          </div>
        </div>
      </div>

      {/* Service Centers Grid */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {serviceCenters.map((center) => (
            <div key={center.id} className="bg-white rounded-lg shadow-md p-6">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-lg font-semibold">{center.name}</h3>
                <span className={`px-3 py-1 rounded-full text-sm ${
                  center.status === 'Authorized' 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-blue-100 text-blue-800'
                }`}>
                  {center.status}
                </span>
              </div>

              <div className="space-y-3 mb-4">
                <div className="flex items-center">
                  <FaMapMarkerAlt className="text-blue-500 mr-3" />
                  <span className="text-gray-600">Location</span>
                  <span className="ml-auto">{center.location}</span>
                </div>

                <div className="flex items-center">
                  <FaStar className="text-blue-500 mr-3" />
                  <span className="text-gray-600">Rating</span>
                  <span className="ml-auto">{center.rating}</span>
                </div>

                <div className="flex items-center">
                  <FaDollarSign className="text-blue-500 mr-3" />
                  <span className="text-gray-600">Price Range</span>
                  <span className="ml-auto">{center.priceRange}</span>
                </div>

                <div className="flex items-center">
                  <FaTools className="text-blue-500 mr-3" />
                  <span className="text-gray-600">Services</span>
                  <span className="ml-auto">{center.services}</span>
                </div>
              </div>

              <button className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition-colors">
                Book Service
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BikeServiceCenters; 