import React, { useState } from 'react';
import { Send, User, Phone, Mail, MapPin, Globe, Building, MessageSquare, TrendingUp, Home, Star, Shield } from 'lucide-react';

export const Management: React.FC = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    country: '',
    investmentLocation: '',
    siteCity: '',
    message: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    alert('Thank you for your interest! One of our owner reps will get in touch with you soon.');
    setFormData({
      firstName: '',
      lastName: '',
      phone: '',
      email: '',
      country: '',
      investmentLocation: '',
      siteCity: '',
      message: ''
    });
  };

  const countries = [
    'United States of America (USA)', 'Canada', 'United Kingdom', 'Mexico', 'Spain',
    'France', 'Germany', 'Italy', 'Brazil', 'Argentina', 'Colombia', 'Chile',
    'Australia', 'Japan', 'China', 'India', 'Other'
  ];

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">IHM Management</h1>
            <p className="text-xl md:text-2xl mb-4 text-gray-300">
              <strong>Is your vacation home working for you, or are you working for it?</strong>
            </p>
            <p className="text-lg text-gray-400 mb-8">
              Minimize your stress and maximize your profits with our property management experience
            </p>
            <p className="text-base text-gray-300">
              Fill out the form below, and one of our owner reps will get in touch
            </p>
          </div>
        </div>
      </section>

      {/* Form Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* First Name */}
                <div>
                  <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <User className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      required
                      className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-xl focus:ring-amber-500 focus:border-amber-500 transition-colors"
                      placeholder="First Name"
                    />
                  </div>
                </div>

                {/* Last Name */}
                <div>
                  <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <User className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      required
                      className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-xl focus:ring-amber-500 focus:border-amber-500 transition-colors"
                      placeholder="Last Name"
                    />
                  </div>
                </div>
              </div>

              {/* Phone */}
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">Phone <span className="text-red-500">*</span></label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Phone className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-xl focus:ring-amber-500 focus:border-amber-500 transition-colors"
                    placeholder="Your Phone Number"
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email <span className="text-red-500">*</span></label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-xl focus:ring-amber-500 focus:border-amber-500 transition-colors"
                    placeholder="name@example.com"
                  />
                </div>
              </div>

              {/* Country of Residence */}
              <div>
                <label htmlFor="country" className="block text-sm font-medium text-gray-700 mb-1">Country of Residence</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Globe className="h-5 w-5 text-gray-400" />
                  </div>
                  <select
                    id="country"
                    name="country"
                    value={formData.country}
                    onChange={handleChange}
                    className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-xl focus:ring-amber-500 focus:border-amber-500 transition-colors bg-white"
                  >
                    <option value="">Select Country</option>
                    {countries.map((country) => (
                      <option key={country} value={country}>{country}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Investment Location */}
              <div>
                <label htmlFor="investmentLocation" className="block text-sm font-medium text-gray-700 mb-1">Investment Location</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <MapPin className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    id="investmentLocation"
                    name="investmentLocation"
                    value={formData.investmentLocation}
                    onChange={handleChange}
                    className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-xl focus:ring-amber-500 focus:border-amber-500 transition-colors"
                    placeholder="Investment Location"
                  />
                </div>
              </div>

              {/* Site City */}
              <div>
                <label htmlFor="siteCity" className="block text-sm font-medium text-gray-700 mb-1">Site City</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Building className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    id="siteCity"
                    name="siteCity"
                    value={formData.siteCity}
                    onChange={handleChange}
                    className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-xl focus:ring-amber-500 focus:border-amber-500 transition-colors"
                    placeholder="E.g. Orlando"
                  />
                </div>
              </div>

              {/* Message */}
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                <div className="relative">
                  <div className="absolute top-3 left-3 pointer-events-none">
                    <MessageSquare className="h-5 w-5 text-gray-400" />
                  </div>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                    className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-xl focus:ring-amber-500 focus:border-amber-500 transition-colors resize-none"
                    placeholder="Tell us about your property..."
                  />
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-bold py-4 px-6 rounded-xl shadow-lg transform transition hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center"
              >
                <span>Submit</span>
                <Send className="ml-2 h-5 w-5" />
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Features Sections */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Revenue Maximization */}
          <div className="mb-20">
            <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12">Revenue Maximization</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-gray-50 rounded-2xl p-6 hover:shadow-lg transition-shadow">
                <TrendingUp className="h-10 w-10 text-amber-600 mb-4" />
                <h3 className="text-xl font-bold text-gray-900 mb-3">Revenue Management</h3>
                <p className="text-gray-600">
                  We take a hands on approach to revenue management and use industry leading analytics tools to ensure your property is getting the latest and most profitable pricing year round.
                </p>
              </div>
              <div className="bg-gray-50 rounded-2xl p-6 hover:shadow-lg transition-shadow">
                <Star className="h-10 w-10 text-amber-600 mb-4" />
                <h3 className="text-xl font-bold text-gray-900 mb-3">Tailored Marketing</h3>
                <p className="text-gray-600">
                  Your home should be showcased to the right guests at the right time. We use the latest in cutting edge marketing to get your property optimum exposure and booking.
                </p>
              </div>
              <div className="bg-gray-50 rounded-2xl p-6 hover:shadow-lg transition-shadow">
                <User className="h-10 w-10 text-amber-600 mb-4" />
                <h3 className="text-xl font-bold text-gray-900 mb-3">Loyal Repeat Guests</h3>
                <p className="text-gray-600">
                  We keep in communication with an extensive database of former guests, so you'll have a waiting list of loyal guests from day 1.
                </p>
              </div>
              <div className="bg-gray-50 rounded-2xl p-6 hover:shadow-lg transition-shadow">
                <Mail className="h-10 w-10 text-amber-600 mb-4" />
                <h3 className="text-xl font-bold text-gray-900 mb-3">Direct Bookings</h3>
                <p className="text-gray-600">
                  Approximately 20% of our reservations are direct bookings. That means we're able to build direct relationships with our guests and maintain greater control over our reservations and revenue.
                </p>
              </div>
              <div className="bg-gray-50 rounded-2xl p-6 hover:shadow-lg transition-shadow">
                <Globe className="h-10 w-10 text-amber-600 mb-4" />
                <h3 className="text-xl font-bold text-gray-900 mb-3">OTAs/Third Party Channels</h3>
                <p className="text-gray-600">
                  We use all the latest third party booking sites like AirBnB, VRBO, Hopper Hommes, Whimstay among others to maximize the visibility of your home and ensure that no matter how your guests find your home, booking is a breeze.
                </p>
              </div>
            </div>
          </div>

          {/* Dedicated Home Care */}
          <div className="mb-20">
            <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12">Dedicated Home Care</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-gray-50 rounded-2xl p-6 hover:shadow-lg transition-shadow">
                <Shield className="h-10 w-10 text-amber-600 mb-4" />
                <h3 className="text-xl font-bold text-gray-900 mb-3">24/7 Support</h3>
                <p className="text-gray-600">
                  Rest easy knowing your guests have continuous support from our expert, local team. We ensure your property remains in excellent condition, 24/7 with our on-call staff.
                </p>
              </div>
              <div className="bg-gray-50 rounded-2xl p-6 hover:shadow-lg transition-shadow">
                <Home className="h-10 w-10 text-amber-600 mb-4" />
                <h3 className="text-xl font-bold text-gray-900 mb-3">Spotless Housekeeping</h3>
                <p className="text-gray-600">
                  Every property is cared for by our professional house cleaners who are dedicated to providing a clean, maintained and flawless property.
                </p>
              </div>
              <div className="bg-gray-50 rounded-2xl p-6 hover:shadow-lg transition-shadow">
                <Shield className="h-10 w-10 text-amber-600 mb-4" />
                <h3 className="text-xl font-bold text-gray-900 mb-3">Property Inspections</h3>
                <p className="text-gray-600">
                  We perform rigorous and comprehensive inspections between every guest to make sure your property is in excellent condition year round.
                </p>
              </div>
              <div className="bg-gray-50 rounded-2xl p-6 hover:shadow-lg transition-shadow">
                <Building className="h-10 w-10 text-amber-600 mb-4" />
                <h3 className="text-xl font-bold text-gray-900 mb-3">Full Service Maintenance</h3>
                <p className="text-gray-600">
                  You'll never have to stress about maintenance or repairs again. Our local in house maintenance team performs thorough and comprehensive care of your property between every guest.
                </p>
              </div>
            </div>
          </div>

          {/* VIP Guest Experience */}
          <div className="mb-20">
            <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12">VIP Guest Experience</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-gray-50 rounded-2xl p-6 hover:shadow-lg transition-shadow">
                <Star className="h-10 w-10 text-amber-600 mb-4" />
                <h3 className="text-xl font-bold text-gray-900 mb-3">VIP Services</h3>
                <p className="text-gray-600">
                  Our business starts and ends with our guests, so we go above and beyond to ensure everyone who stays with us feels like a VIP. All our guests can expect personalized guest relations for help during their stay.
                </p>
              </div>
              <div className="bg-gray-50 rounded-2xl p-6 hover:shadow-lg transition-shadow">
                <Shield className="h-10 w-10 text-amber-600 mb-4" />
                <h3 className="text-xl font-bold text-gray-900 mb-3">Guest Screening</h3>
                <p className="text-gray-600">
                  We maintain strict guest booking procedures to make sure the highest quality clientele are staying in your home. We thoroughly screen and verify every guest before check in and require a minimum age of 21 to book.
                </p>
              </div>
              <div className="bg-gray-50 rounded-2xl p-6 hover:shadow-lg transition-shadow">
                <Home className="h-10 w-10 text-amber-600 mb-4" />
                <h3 className="text-xl font-bold text-gray-900 mb-3">Smart Technology</h3>
                <p className="text-gray-600">
                  You can rest easy knowing your property is in the safest and most secure hands possible. All our properties are updated with the latest smart home technology including digital locks.
                </p>
              </div>
            </div>
          </div>

          {/* Personalized Owner Services */}
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12">Personalized Owner Services</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-gray-50 rounded-2xl p-6 hover:shadow-lg transition-shadow">
                <Star className="h-10 w-10 text-amber-600 mb-4" />
                <h3 className="text-xl font-bold text-gray-900 mb-3">No Nickel and Diming</h3>
                <p className="text-gray-600">
                  We pride ourselves in offering value to our homeowners and don't believe in nickel and diming.
                </p>
              </div>
              <div className="bg-gray-50 rounded-2xl p-6 hover:shadow-lg transition-shadow">
                <Mail className="h-10 w-10 text-amber-600 mb-4" />
                <h3 className="text-xl font-bold text-gray-900 mb-3">Transparent Updates and Feedback</h3>
                <p className="text-gray-600">
                  Stay connected with your property through our online owner portal that provides you with an up-to-the minute booking calendar, owner statements, and maintenance history.
                </p>
              </div>
              <div className="bg-gray-50 rounded-2xl p-6 hover:shadow-lg transition-shadow">
                <Home className="h-10 w-10 text-amber-600 mb-4" />
                <h3 className="text-xl font-bold text-gray-900 mb-3">Unlimited Owner Use</h3>
                <p className="text-gray-600">
                  As a property owner, you'll have full control and access to your property's calendar. Unlike other companies that limit when homeowners can stay in their vacation homes, we give you unlimited access.
                </p>
              </div>
              <div className="bg-gray-50 rounded-2xl p-6 hover:shadow-lg transition-shadow">
                <Star className="h-10 w-10 text-amber-600 mb-4" />
                <h3 className="text-xl font-bold text-gray-900 mb-3">100% Owner Satisfaction</h3>
                <p className="text-gray-600">
                  We are committed to satisfying the needs of our owners. Mistakes happen, but you have our commitment that we will do everything in our power to make the situation right.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

