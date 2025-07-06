import React, { useState, Fragment } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Combobox, Transition } from '@headlessui/react';
import { indianLocations } from './data/locations';
import AnimatedBackground from './components/AnimatedBackground';
import BusinessBackground from './components/BusinessBackground';

const API_URL = 'http://localhost:5000';

function App() {
  const [businessData, setBusinessData] = useState(null);
  const [formData, setFormData] = useState({
    businessName: '',
    location: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [query, setQuery] = useState('');

  const filteredLocations = query === ''
    ? indianLocations
    : indianLocations.filter((location) =>
        location.toLowerCase().includes(query.toLowerCase())
      );

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(`${API_URL}/business-data`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.businessName,
          location: formData.location
        })
      });

      if (!response.ok) throw new Error('Failed to fetch business data');

      const data = await response.json();
      setBusinessData({
        businessName: formData.businessName,
        location: formData.location,
        rating: data.rating,
        reviews: data.reviews,
        seoHeadline: data.headline
      });
    } catch (err) {
      setError('Failed to fetch business data. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const regenerateSEO = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `${API_URL}/regenerate-headline?name=${encodeURIComponent(businessData.businessName)}&location=${encodeURIComponent(businessData.location)}`
      );

      if (!response.ok) throw new Error('Failed to regenerate headline');

      const data = await response.json();
      setBusinessData(prev => ({
        ...prev,
        seoHeadline: data.headline
      }));
    } catch (err) {
      setError('Failed to regenerate headline. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const resetDashboard = () => {
    setBusinessData(null);
    setFormData({ businessName: '', location: '' });
    setError(null);
    setQuery('');
  };

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <BusinessBackground variant={businessData ? 'dashboard' : 'home'} />

      <div className="max-w-4xl mx-auto relative z-10">
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl font-bold gradient-text mb-4">Business Dashboard</h1>
          <p className="text-gray-600 text-lg">Monitor and manage your business presence</p>
        </motion.div>

        {error && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl text-red-600 text-center"
          >
            {error}
          </motion.div>
        )}

        <AnimatePresence mode='wait'>
          {!businessData ? (
            <motion.div
              key="form"
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="glassmorphism rounded-2xl p-8 card-3d"
            >
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <label htmlFor="businessName" className="block text-sm font-medium text-gray-700">
                    Business Name
                  </label>
                  <input
                    type="text"
                    name="businessName"
                    id="businessName"
                    required
                    value={formData.businessName}
                    onChange={handleInputChange}
                    className="input-animated block w-full rounded-xl px-4 py-3 text-gray-900 placeholder-gray-400 focus:outline-none"
                    placeholder="Enter your business name"
                    disabled={isLoading}
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="location" className="block text-sm font-medium text-gray-700">
                    Location
                  </label>
                  <Combobox
                    value={formData.location}
                    onChange={(location) => setFormData(prev => ({ ...prev, location }))}
                    disabled={isLoading}
                  >
                    <div className="relative">
                      <Combobox.Input
                        className="input-animated block w-full rounded-xl px-4 py-3 text-gray-900 placeholder-gray-400 focus:outline-none"
                        placeholder="Search location..."
                        onChange={(event) => setQuery(event.target.value)}
                        displayValue={(location) => location}
                      />
                      <Transition
                        as={Fragment}
                        leave="transition ease-in duration-100"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                        afterLeave={() => setQuery('')}
                      >
                        <Combobox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-xl bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                          {filteredLocations.length === 0 && query !== '' ? (
                            <div className="relative cursor-default select-none py-2 px-4 text-gray-700">
                              Nothing found.
                            </div>
                          ) : (
                            filteredLocations.map((location) => (
                              <Combobox.Option
                                key={location}
                                className={({ active }) =>
                                  `relative cursor-default select-none py-2 pl-10 pr-4 ${active ? 'bg-indigo-600 text-white' : 'text-gray-900'}`
                                }
                                value={location}
                              >
                                {({ selected, active }) => (
                                  <>
                                    <span className={`block truncate ${selected ? 'font-medium' : 'font-normal'}`}>
                                      {location}
                                    </span>
                                    {selected ? (
                                      <span
                                        className={`absolute inset-y-0 left-0 flex items-center pl-3 ${active ? 'text-white' : 'text-indigo-600'}`}
                                      >
                                        <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                        </svg>
                                      </span>
                                    ) : null}
                                  </>
                                )}
                              </Combobox.Option>
                            ))
                          )}
                        </Combobox.Options>
                      </Transition>
                    </div>
                  </Combobox>
                </div>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  className="button-gradient w-full py-3 px-6 rounded-xl text-white font-medium shadow-lg relative"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <span className="flex items-center justify-center">
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Loading...
                    </span>
                  ) : 'View Dashboard'}
                </motion.button>
              </form>
            </motion.div>
          ) : (
            <motion.div
              key="dashboard"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-6"
            >
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={resetDashboard}
                className="mb-6 button-gradient px-4 py-2 rounded-xl text-white font-medium shadow-lg flex items-center gap-2 mx-auto"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
                Back to Home
              </motion.button>

              <div className="grid gap-6 md:grid-cols-2">
                <motion.div
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  className="glassmorphism rounded-2xl p-6 card-3d"
                >
                  <div className="card-content">
                    <h2 className="text-xl font-semibold gradient-text mb-4">Business Overview</h2>
                    <div className="space-y-4">
                      <div>
                        <p className="text-sm text-gray-500">Business Name</p>
                        <p className="text-lg font-medium text-gray-900">{businessData.businessName}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Location</p>
                        <p className="text-lg font-medium text-gray-900">{businessData.location}</p>
                      </div>
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ x: 20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  className="glassmorphism rounded-2xl p-6 card-3d"
                >
                  <div className="card-content">
                    <h2 className="text-xl font-semibold gradient-text mb-4">Ratings & Reviews</h2>
                    <div className="space-y-4">
                      <div>
                        <p className="text-sm text-gray-500">Google Rating</p>
                        <p className="text-4xl font-bold text-yellow-500 flex items-center gap-2">
                          {businessData.rating}
                          <span className="rating-star">★</span>
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Number of Reviews</p>
                        <p className="text-2xl font-semibold text-gray-900">{businessData.reviews}</p>
                      </div>
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  className="md:col-span-2 glassmorphism rounded-2xl p-6 headline-card card-3d"
                >
                  <div className="card-content">
                    <div className="flex justify-between items-start mb-4">
                      <h2 className="text-xl font-semibold gradient-text">AI-Generated SEO Headline</h2>
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={regenerateSEO}
                        disabled={isLoading}
                        className="button-gradient px-4 py-2 rounded-xl text-white font-medium shadow-lg flex items-center gap-2"
                      >
                        {isLoading ? (
                          <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                        ) : (
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                          </svg>
                        )}
                        Regenerate
                      </motion.button>
                    </div>
                    <p className="text-lg text-gray-700 italic">"{businessData.seoHeadline}"</p>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

export default App;