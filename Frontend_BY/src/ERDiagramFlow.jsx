// import React, { useState } from 'react';
// import { Database, ArrowRight, User, Users, Shield, Bus, Calendar, Ticket, CheckCircle, AlertCircle } from 'lucide-react';

// const ERDiagramFlow = () => {
//   const [selectedFlow, setSelectedFlow] = useState('booking');

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-8">
//       <div className="max-w-7xl mx-auto">
//         {/* Header */}
//         <div className="text-center mb-8">
//           <h1 className="text-4xl font-bold text-white mb-2 flex items-center justify-center gap-3">
//             <Database className="w-10 h-10" />
//             BusYatra - Complete ER Diagram Flow
//           </h1>
//           <p className="text-gray-300">Visual representation of database relationships and data flow</p>
//         </div>

//         {/* Flow Selection */}
//         <div className="flex justify-center gap-4 mb-8">
//           <button
//             onClick={() => setSelectedFlow('booking')}
//             className={`px-6 py-3 rounded-lg font-semibold transition-all ${
//               selectedFlow === 'booking'
//                 ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/50'
//                 : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
//             }`}
//           >
//             Customer Booking Flow
//           </button>
//           <button
//             onClick={() => setSelectedFlow('traveler')}
//             className={`px-6 py-3 rounded-lg font-semibold transition-all ${
//               selectedFlow === 'traveler'
//                 ? 'bg-green-600 text-white shadow-lg shadow-green-500/50'
//                 : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
//             }`}
//           >
//             Traveler Setup Flow
//           </button>
//           <button
//             onClick={() => setSelectedFlow('complete')}
//             className={`px-6 py-3 rounded-lg font-semibold transition-all ${
//               selectedFlow === 'complete'
//                 ? 'bg-purple-600 text-white shadow-lg shadow-purple-500/50'
//                 : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
//             }`}
//           >
//             Complete ER Diagram
//           </button>
//         </div>

//         {/* Diagram Content */}
//         <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20">
//           {selectedFlow === 'booking' && <BookingFlow />}
//           {selectedFlow === 'traveler' && <TravelerFlow />}
//           {selectedFlow === 'complete' && <CompleteERDiagram />}
//         </div>
//       </div>
//     </div>
//   );
// };

// const BookingFlow = () => {
//   return (
//     <div className="space-y-8">
//       <h2 className="text-2xl font-bold text-white text-center mb-6">
//         Customer Booking Flow - How Entities Connect
//       </h2>

//       {/* Flow Visualization */}
//       <div className="relative">
//         {/* Step 1: User Login */}
//         <div className="flex items-center justify-center mb-8">
//           <EntityCard
//             icon={<User className="w-8 h-8" />}
//             name="User"
//             color="from-blue-500 to-blue-600"
//             fields={['user_id', 'email', 'role: CUSTOMER']}
//             description="Customer logs in"
//           />
//         </div>

//         <FlowArrow label="Searches for bus" />

//         {/* Step 2: Bus Search */}
//         <div className="flex items-center justify-center gap-8 mb-8">
//           <EntityCard
//             icon={<Bus className="w-8 h-8" />}
//             name="Bus"
//             color="from-orange-500 to-orange-600"
//             fields={['bus_id', 'from_location', 'to_location', 'fare']}
//             description="Bus master data"
//           />
//           <div className="text-white text-2xl">+</div>
//           <EntityCard
//             icon={<Calendar className="w-8 h-8" />}
//             name="BusSchedule"
//             color="from-pink-500 to-pink-600"
//             fields={['schedule_id', 'bus_id (FK)', 'journey_date', 'available_seats']}
//             description="Specific journey"
//             highlight
//           />
//         </div>

//         <FlowArrow label="User selects bus & schedule" />

//         {/* Step 3: Seat Selection */}
//         <div className="flex items-center justify-center mb-8">
//           <EntityCard
//             icon={<CheckCircle className="w-8 h-8" />}
//             name="Seat"
//             color="from-teal-500 to-teal-600"
//             fields={['seat_id', 'schedule_id (FK)', 'seat_number: A1, A2', 'is_booked: FALSE']}
//             description="Shows available seats"
//             highlight
//           />
//         </div>

//         <FlowArrow label="User selects seats A1, A2" />

//         {/* Step 4: Booking Creation */}
//         <div className="flex items-center justify-center mb-8">
//           <EntityCard
//             icon={<Ticket className="w-8 h-8" />}
//             name="Booking"
//             color="from-red-500 to-red-600"
//             fields={['booking_id', 'user_id (FK)', 'schedule_id (FK)', 'number_of_seats: 2']}
//             description="Creates booking record"
//           />
//         </div>

//         <FlowArrow label="Links seats to booking" />

//         {/* Step 5: BookingSeat */}
//         <div className="flex items-center justify-center">
//           <EntityCard
//             icon={<Users className="w-8 h-8" />}
//             name="BookingSeat"
//             color="from-indigo-500 to-indigo-600"
//             fields={['booking_id (FK)', 'seat_id (FK)', 'passenger_name', 'passenger_age']}
//             description="Stores passenger details per seat"
//             highlight
//           />
//         </div>
//       </div>

//       {/* Flow Summary */}
//       <div className="bg-blue-500/20 border border-blue-400/50 rounded-lg p-6 mt-8">
//         <h3 className="text-xl font-bold text-white mb-4">Flow Summary:</h3>
//         <div className="grid grid-cols-2 gap-4 text-sm text-gray-200">
//           <div className="flex items-start gap-2">
//             <span className="text-blue-400 font-bold">1.</span>
//             <span>User logs in (User table)</span>
//           </div>
//           <div className="flex items-start gap-2">
//             <span className="text-blue-400 font-bold">2.</span>
//             <span>Searches buses (Bus + BusSchedule JOIN)</span>
//           </div>
//           <div className="flex items-start gap-2">
//             <span className="text-blue-400 font-bold">3.</span>
//             <span>Views seat layout (Seat table WHERE schedule_id)</span>
//           </div>
//           <div className="flex items-start gap-2">
//             <span className="text-blue-400 font-bold">4.</span>
//             <span>Selects seats A1, A2</span>
//           </div>
//           <div className="flex items-start gap-2">
//             <span className="text-blue-400 font-bold">5.</span>
//             <span>Creates Booking record</span>
//           </div>
//           <div className="flex items-start gap-2">
//             <span className="text-blue-400 font-bold">6.</span>
//             <span>Inserts BookingSeat records (2 rows)</span>
//           </div>
//           <div className="flex items-start gap-2">
//             <span className="text-blue-400 font-bold">7.</span>
//             <span>Updates Seat: is_booked = TRUE</span>
//           </div>
//           <div className="flex items-start gap-2">
//             <span className="text-blue-400 font-bold">8.</span>
//             <span>Updates BusSchedule: available_seats - 2</span>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// const TravelerFlow = () => {
//   return (
//     <div className="space-y-8">
//       <h2 className="text-2xl font-bold text-white text-center mb-6">
//         Traveler Setup Flow - Bus Operator Journey
//       </h2>

//       {/* Admin creates Traveler */}
//       <div className="flex items-center justify-center gap-8 mb-8">
//         <EntityCard
//           icon={<Shield className="w-8 h-8" />}
//           name="Admin"
//           color="from-purple-500 to-purple-600"
//           fields={['admin_id', 'user_id (FK)']}
//           description="System administrator"
//         />
//         <div className="text-white text-4xl">→</div>
//         <EntityCard
//           icon={<Users className="w-8 h-8" />}
//           name="Traveler"
//           color="from-green-500 to-green-600"
//           fields={['traveler_id', 'company_name', 'verification_status: APPROVED']}
//           description="Bus operator account"
//         />
//       </div>

//       <FlowArrow label="Traveler adds buses" />

//       {/* Traveler adds Bus */}
//       <div className="flex items-center justify-center mb-8">
//         <EntityCard
//           icon={<Bus className="w-8 h-8" />}
//           name="Bus"
//           color="from-orange-500 to-orange-600"
//           fields={['bus_id', 'traveler_id (FK)', 'bus_number: GJ01AB1234', 'total_seats: 40']}
//           description="Bus master record"
//         />
//       </div>

//       <FlowArrow label="Traveler creates schedules" />

//       {/* Creates multiple schedules */}
//       <div className="flex items-center justify-center gap-4 mb-8">
//         <EntityCard
//           icon={<Calendar className="w-8 h-8" />}
//           name="BusSchedule"
//           color="from-pink-500 to-pink-600"
//           fields={['schedule_id: 456', 'journey_date: Jan 10']}
//           size="small"
//           highlight
//         />
//         <EntityCard
//           icon={<Calendar className="w-8 h-8" />}
//           name="BusSchedule"
//           color="from-pink-500 to-pink-600"
//           fields={['schedule_id: 457', 'journey_date: Jan 11']}
//           size="small"
//           highlight
//         />
//         <EntityCard
//           icon={<Calendar className="w-8 h-8" />}
//           name="BusSchedule"
//           color="from-pink-500 to-pink-600"
//           fields={['schedule_id: 458', 'journey_date: Jan 12']}
//           size="small"
//           highlight
//         />
//       </div>

//       <FlowArrow label="System auto-generates seats" />

//       {/* Auto-generated Seats */}
//       <div className="flex items-center justify-center gap-2 flex-wrap max-w-4xl mx-auto">
//         {['A1', 'A2', 'A3', 'A4', 'B1', 'B2', 'B3', 'B4'].map(seat => (
//           <div key={seat} className="bg-gradient-to-br from-teal-500 to-teal-600 text-white px-4 py-2 rounded-lg shadow-lg text-sm font-bold">
//             {seat}
//           </div>
//         ))}
//         <div className="text-white font-bold">... (40 total seats)</div>
//       </div>

//       <div className="bg-green-500/20 border border-green-400/50 rounded-lg p-6 mt-8">
//         <h3 className="text-xl font-bold text-white mb-4">Key Points:</h3>
//         <div className="space-y-3 text-gray-200">
//           <div className="flex items-start gap-2">
//             <span className="text-green-400">•</span>
//             <span><strong>One Bus</strong> can have <strong>Many Schedules</strong> (different dates)</span>
//           </div>
//           <div className="flex items-start gap-2">
//             <span className="text-green-400">•</span>
//             <span><strong>One Schedule</strong> automatically creates <strong>40 Seat records</strong></span>
//           </div>
//           <div className="flex items-start gap-2">
//             <span className="text-green-400">•</span>
//             <span>Each seat starts with <strong>is_booked = FALSE</strong></span>
//           </div>
//           <div className="flex items-start gap-2">
//             <span className="text-green-400">•</span>
//             <span>Traveler can raise <strong>SupportTicket</strong> for issues</span>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// const CompleteERDiagram = () => {
//   return (
//     <div className="space-y-8">
//       <h2 className="text-2xl font-bold text-white text-center mb-6">
//         Complete Entity Relationship Diagram
//       </h2>

//       <svg viewBox="0 0 1200 800" className="w-full h-auto">
//         {/* User */}
//         <g transform="translate(100, 50)">
//           <rect width="180" height="120" rx="10" fill="url(#blue-gradient)" />
//           <text x="90" y="30" fill="white" fontSize="18" fontWeight="bold" textAnchor="middle">User</text>
//           <text x="10" y="55" fill="white" fontSize="12">• user_id (PK)</text>
//           <text x="10" y="75" fill="white" fontSize="12">• email</text>
//           <text x="10" y="95" fill="white" fontSize="12">• role</text>
//         </g>

//         {/* Traveler */}
//         <g transform="translate(350, 50)">
//           <rect width="180" height="120" rx="10" fill="url(#green-gradient)" />
//           <text x="90" y="30" fill="white" fontSize="18" fontWeight="bold" textAnchor="middle">Traveler</text>
//           <text x="10" y="55" fill="white" fontSize="12">• traveler_id (PK)</text>
//           <text x="10" y="75" fill="white" fontSize="12">• user_id (FK)</text>
//           <text x="10" y="95" fill="white" fontSize="12">• company_name</text>
//         </g>

//         {/* Admin */}
//         <g transform="translate(600, 50)">
//           <rect width="180" height="120" rx="10" fill="url(#purple-gradient)" />
//           <text x="90" y="30" fill="white" fontSize="18" fontWeight="bold" textAnchor="middle">Admin</text>
//           <text x="10" y="55" fill="white" fontSize="12">• admin_id (PK)</text>
//           <text x="10" y="75" fill="white" fontSize="12">• user_id (FK)</text>
//           <text x="10" y="95" fill="white" fontSize="12">• department</text>
//         </g>

//         {/* Bus */}
//         <g transform="translate(350, 250)">
//           <rect width="180" height="140" rx="10" fill="url(#orange-gradient)" />
//           <text x="90" y="30" fill="white" fontSize="18" fontWeight="bold" textAnchor="middle">Bus</text>
//           <text x="10" y="55" fill="white" fontSize="12">• bus_id (PK)</text>
//           <text x="10" y="75" fill="white" fontSize="12">• traveler_id (FK)</text>
//           <text x="10" y="95" fill="white" fontSize="12">• bus_number</text>
//           <text x="10" y="115" fill="white" fontSize="12">• from/to location</text>
//         </g>

//         {/* BusSchedule */}
//         <g transform="translate(600, 250)">
//           <rect width="200" height="160" rx="10" fill="url(#pink-gradient)" stroke="#ffd700" strokeWidth="3" />
//           <text x="100" y="30" fill="white" fontSize="18" fontWeight="bold" textAnchor="middle">BusSchedule ⭐</text>
//           <text x="10" y="55" fill="white" fontSize="12">• schedule_id (PK)</text>
//           <text x="10" y="75" fill="white" fontSize="12">• bus_id (FK)</text>
//           <text x="10" y="95" fill="white" fontSize="12">• journey_date</text>
//           <text x="10" y="115" fill="white" fontSize="12">• available_seats</text>
//           <text x="10" y="135" fill="white" fontSize="12">• departure_time</text>
//         </g>

//         {/* Seat */}
//         <g transform="translate(850, 250)">
//           <rect width="180" height="140" rx="10" fill="url(#teal-gradient)" stroke="#ffd700" strokeWidth="3" />
//           <text x="90" y="30" fill="white" fontSize="18" fontWeight="bold" textAnchor="middle">Seat ⭐</text>
//           <text x="10" y="55" fill="white" fontSize="12">• seat_id (PK)</text>
//           <text x="10" y="75" fill="white" fontSize="12">• schedule_id (FK)</text>
//           <text x="10" y="95" fill="white" fontSize="12">• seat_number</text>
//           <text x="10" y="115" fill="white" fontSize="12">• is_booked</text>
//         </g>

//         {/* Booking */}
//         <g transform="translate(100, 470)">
//           <rect width="200" height="160" rx="10" fill="url(#red-gradient)" />
//           <text x="100" y="30" fill="white" fontSize="18" fontWeight="bold" textAnchor="middle">Booking</text>
//           <text x="10" y="55" fill="white" fontSize="12">• booking_id (PK)</text>
//           <text x="10" y="75" fill="white" fontSize="12">• user_id (FK)</text>
//           <text x="10" y="95" fill="white" fontSize="12">• schedule_id (FK)</text>
//           <text x="10" y="115" fill="white" fontSize="12">• number_of_seats</text>
//           <text x="10" y="135" fill="white" fontSize="12">• total_amount</text>
//         </g>

//         {/* BookingSeat */}
//         <g transform="translate(400, 470)">
//           <rect width="200" height="160" rx="10" fill="url(#indigo-gradient)" stroke="#ffd700" strokeWidth="3" />
//           <text x="100" y="30" fill="white" fontSize="18" fontWeight="bold" textAnchor="middle">BookingSeat ⭐</text>
//           <text x="10" y="55" fill="white" fontSize="12">• booking_seat_id (PK)</text>
//           <text x="10" y="75" fill="white" fontSize="12">• booking_id (FK)</text>
//           <text x="10" y="95" fill="white" fontSize="12">• seat_id (FK)</text>
//           <text x="10" y="115" fill="white" fontSize="12">• passenger_name</text>
//           <text x="10" y="135" fill="white" fontSize="12">• passenger_age</text>
//         </g>

//         {/* SupportTicket */}
//         <g transform="translate(700, 470)">
//           <rect width="180" height="140" rx="10" fill="url(#yellow-gradient)" />
//           <text x="90" y="30" fill="black" fontSize="18" fontWeight="bold" textAnchor="middle">SupportTicket</text>
//           <text x="10" y="55" fill="black" fontSize="12">• ticket_id (PK)</text>
//           <text x="10" y="75" fill="black" fontSize="12">• traveler_id (FK)</text>
//           <text x="10" y="95" fill="black" fontSize="12">• admin_id (FK)</text>
//           <text x="10" y="115" fill="black" fontSize="12">• subject</text>
//         </g>

//         {/* Relationships (Arrows) */}
//         {/* User to Traveler */}
//         <line x1="280" y1="110" x2="350" y2="110" stroke="#fff" strokeWidth="2" markerEnd="url(#arrowhead)" />
//         <text x="315" y="100" fill="#ffd700" fontSize="12" fontWeight="bold">1:1</text>

//         {/* User to Admin */}
//         <line x1="280" y1="110" x2="600" y2="110" stroke="#fff" strokeWidth="2" markerEnd="url(#arrowhead)" strokeDasharray="5,5" />
//         <text x="440" y="100" fill="#ffd700" fontSize="12" fontWeight="bold">1:1</text>

//         {/* Traveler to Bus */}
//         <line x1="440" y1="170" x2="440" y2="250" stroke="#fff" strokeWidth="2" markerEnd="url(#arrowhead)" />
//         <text x="450" y="210" fill="#ffd700" fontSize="12" fontWeight="bold">1:N</text>

//         {/* Bus to BusSchedule */}
//         <line x1="530" y1="320" x2="600" y2="320" stroke="#fff" strokeWidth="2" markerEnd="url(#arrowhead)" />
//         <text x="565" y="310" fill="#ffd700" fontSize="12" fontWeight="bold">1:N</text>

//         {/* BusSchedule to Seat */}
//         <line x1="800" y1="330" x2="850" y2="330" stroke="#fff" strokeWidth="2" markerEnd="url(#arrowhead)" />
//         <text x="825" y="320" fill="#ffd700" fontSize="12" fontWeight="bold">1:N</text>

//         {/* User to Booking */}
//         <line x1="190" y1="170" x2="190" y2="470" stroke="#fff" strokeWidth="2" markerEnd="url(#arrowhead)" />
//         <text x="200" y="320" fill="#ffd700" fontSize="12" fontWeight="bold">1:N</text>

//         {/* Booking to BookingSeat */}
//         <line x1="300" y1="550" x2="400" y2="550" stroke="#fff" strokeWidth="2" markerEnd="url(#arrowhead)" />
//         <text x="350" y="540" fill="#ffd700" fontSize="12" fontWeight="bold">1:N</text>

//         {/* BusSchedule to Booking */}
//         <line x1="700" y1="410" x2="300" y2="470" stroke="#fff" strokeWidth="2" markerEnd="url(#arrowhead)" strokeDasharray="5,5" />
//         <text x="500" y="430" fill="#ffd700" fontSize="12" fontWeight="bold">1:N</text>

//         {/* Seat to BookingSeat */}
//         <line x1="940" y1="390" x2="600" y2="470" stroke="#fff" strokeWidth="2" markerEnd="url(#arrowhead)" strokeDasharray="5,5" />
//         <text x="770" y="420" fill="#ffd700" fontSize="12" fontWeight="bold">1:N</text>

//         {/* Traveler to SupportTicket */}
//         <line x1="440" y1="390" x2="700" y2="540" stroke="#fff" strokeWidth="2" markerEnd="url(#arrowhead)" strokeDasharray="5,5" />

//         {/* Admin to SupportTicket */}
//         <line x1="690" y1="170" x2="790" y2="470" stroke="#fff" strokeWidth="2" markerEnd="url(#arrowhead)" strokeDasharray="5,5" />

//         {/* Gradients */}
//         <defs>
//           <linearGradient id="blue-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
//             <stop offset="0%" stopColor="#3b82f6" />
//             <stop offset="100%" stopColor="#2563eb" />
//           </linearGradient>
//           <linearGradient id="green-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
//             <stop offset="0%" stopColor="#10b981" />
//             <stop offset="100%" stopColor="#059669" />
//           </linearGradient>
//           <linearGradient id="purple-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
//             <stop offset="0%" stopColor="#a855f7" />
//             <stop offset="100%" stopColor="#9333ea" />
//           </linearGradient>
//           <linearGradient id="orange-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
//             <stop offset="0%" stopColor="#f97316" />
//             <stop offset="100%" stopColor="#ea580c" />
//           </linearGradient>
//           <linearGradient id="pink-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
//             <stop offset="0%" stopColor="#ec4899" />
//             <stop offset="100%" stopColor="#db2777" />
//           </linearGradient>
//           <linearGradient id="teal-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
//             <stop offset="0%" stopColor="#14b8a6" />
//             <stop offset="100%" stopColor="#0d9488" />
//           </linearGradient>
//           <linearGradient id="red-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
//             <stop offset="0%" stopColor="#ef4444" />
//             <stop offset="100%" stopColor="#dc2626" />
//           </linearGradient>
//           <linearGradient id="indigo-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
//             <stop offset="0%" stopColor="#6366f1" />
//             <stop offset="100%" stopColor="#4f46e5" />
//           </linearGradient>
//           <linearGradient id="yellow-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
//             <stop offset="0%" stopColor="#fbbf24" />
//             <stop offset="100%" stopColor="#f59e0b" />
//           </linearGradient>
//           <marker id="arrowhead" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
//             <polygon points="0 0, 10 3, 0 6" fill="#fff" />
//           </marker>
//         </defs>
//       </svg>

//       <div className="bg-purple-500/20 border border-purple-400/50 rounded-lg p-6 mt-8">
//         <h3 className="text-xl font-bold text-white mb-4">Legend:</h3>
//         <div className="grid grid-cols-2 gap-4 text-sm text-gray-200">
//           <div className="flex items-center gap-2">
//             <div className="w-4 h-4 border-2 border-yellow-400 rounded"></div>
//             <span>⭐ New entities (solve booking confusion)</span>
//           </div>
//           <div className="flex items-center gap-2">
//             <div className="w-8 h-0.5 bg-white"></div>
//             <span>Solid line = Direct relationship</span>
//           </div>
//           <div className="flex items-center gap-2">
//             <div className="w-8 h-0.5 bg-white" style={{backgroundImage: 'repeating-linear-gradient(90deg, white 0, white 5px, transparent 5px, transparent 10px)'}}></div>
//             <span>Dashed line = Indirect relationship</span>
//           </div>
//           <div className="flex items-center gap-2">
//             <span className="text-yellow-400 font-bold">1:N</span>
//             <span>One-to-Many relationship</span>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// // Helper Components
// const EntityCard = ({ icon, name, color, fields, description, highlight, size = 'normal' }) => {
//   const sizeClasses = size === 'small' ? 'w-48' : 'w-64';
  
//   return (
//     <div className={`${sizeClasses} ${highlight ? 'ring-4 ring-yellow-400' : ''} rounded-xl shadow-2xl overflow-hidden transform hover:scale-105 transition-transform`}>
//       <div className={`bg-gradient-to-br ${color} text-white p-4 flex items-center gap-3`}>
//         {icon}
//         <span className="font-bold text-lg">{name}</span>
//       </div>
//       <div className="bg-white/90 p-4">
//         <ul className="space-y-1 text-sm text-gray-800 mb-3">
//           {fields.map((field, idx) => (
//             <li key={idx} className="font-mono">
//               {field}
//             </li>
//           ))}
//         </ul>
//         {description && (
//           <p className="text-xs text-gray-600 italic border-t border-gray-300 pt-2">
//             {description}
//           </p>
//         )}
//       </div>
//     </div>
//   );
// };

// const FlowArrow = ({ label }) => {
//   return (
//     <div className="flex flex-col items-center my-4">
//       <div className="text-yellow-400 text-3xl mb-2">↓</div>
//       <div className="bg-yellow-400/20 border border-yellow-400 rounded-full px-4 py-2 text-white text-sm font-semibold">
//         {label}
//       </div>
//     </div>
//   );
// };

// export default ERDiagramFlow;




import React, { useState } from 'react';
import { Database, ArrowRight, User, Users, Shield, Bus, Calendar, Ticket, CheckCircle, AlertCircle } from 'lucide-react';

const ERDiagramFlow = () => {
  const [selectedFlow, setSelectedFlow] = useState('booking');

  return (
    <div className="p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-2 flex items-center justify-center gap-3">
            <Database className="w-10 h-10" />
            Complete ER Diagram Flow
          </h1>
          <p className="text-gray-300">Visual representation of database relationships and data flow</p>
        </div>

        {/* Flow Selection */}
        <div className="flex justify-center gap-4 mb-8">
          <button
            onClick={() => setSelectedFlow('booking')}
            className={`px-6 py-3 rounded-lg font-semibold transition-all ${
              selectedFlow === 'booking'
                ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/50'
                : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
            }`}
          >
            Customer Booking Flow
          </button>
          <button
            onClick={() => setSelectedFlow('traveler')}
            className={`px-6 py-3 rounded-lg font-semibold transition-all ${
              selectedFlow === 'traveler'
                ? 'bg-green-600 text-white shadow-lg shadow-green-500/50'
                : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
            }`}
          >
            Traveler Setup Flow
          </button>
          <button
            onClick={() => setSelectedFlow('complete')}
            className={`px-6 py-3 rounded-lg font-semibold transition-all ${
              selectedFlow === 'complete'
                ? 'bg-purple-600 text-white shadow-lg shadow-purple-500/50'
                : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
            }`}
          >
            Complete ER Diagram
          </button>
        </div>

        {/* Diagram Content */}
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20">
          {selectedFlow === 'booking' && <BookingFlow />}
          {selectedFlow === 'traveler' && <TravelerFlow />}
          {selectedFlow === 'complete' && <CompleteERDiagram />}
        </div>
      </div>
    </div>
  );
};

const BookingFlow = () => {
  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-bold text-white text-center mb-6">
        Customer Booking Flow - How Entities Connect
      </h2>

      {/* Flow Visualization */}
      <div className="relative">
        {/* Step 1: User Login */}
        <div className="flex items-center justify-center mb-8">
          <EntityCard
            icon={<User className="w-8 h-8" />}
            name="User"
            color="from-blue-500 to-blue-600"
            fields={['user_id', 'email', 'role: CUSTOMER']}
            description="Customer logs in"
          />
        </div>

        <FlowArrow label="Searches for bus" />

        {/* Step 2: Bus Search */}
        <div className="flex items-center justify-center gap-8 mb-8">
          <EntityCard
            icon={<Bus className="w-8 h-8" />}
            name="Bus"
            color="from-orange-500 to-orange-600"
            fields={['bus_id', 'from_location', 'to_location', 'fare']}
            description="Bus master data"
          />
          <div className="text-white text-2xl">+</div>
          <EntityCard
            icon={<Calendar className="w-8 h-8" />}
            name="BusSchedule"
            color="from-pink-500 to-pink-600"
            fields={['schedule_id', 'bus_id (FK)', 'journey_date', 'available_seats']}
            description="Specific journey"
            highlight
          />
        </div>

        <FlowArrow label="User selects bus & schedule" />

        {/* Step 3: Seat Selection */}
        <div className="flex items-center justify-center mb-8">
          <EntityCard
            icon={<CheckCircle className="w-8 h-8" />}
            name="Seat"
            color="from-teal-500 to-teal-600"
            fields={['seat_id', 'schedule_id (FK)', 'seat_number: A1, A2', 'is_booked: FALSE']}
            description="Shows available seats"
            highlight
          />
        </div>

        <FlowArrow label="User selects seats A1, A2" />

        {/* Step 4: Booking Creation */}
        <div className="flex items-center justify-center mb-8">
          <EntityCard
            icon={<Ticket className="w-8 h-8" />}
            name="Booking"
            color="from-red-500 to-red-600"
            fields={['booking_id', 'user_id (FK)', 'schedule_id (FK)', 'number_of_seats: 2']}
            description="Creates booking record"
          />
        </div>

        <FlowArrow label="Links seats to booking" />

        {/* Step 5: BookingSeat */}
        <div className="flex items-center justify-center">
          <EntityCard
            icon={<Users className="w-8 h-8" />}
            name="BookingSeat"
            color="from-indigo-500 to-indigo-600"
            fields={['booking_id (FK)', 'seat_id (FK)', 'passenger_name', 'passenger_age']}
            description="Stores passenger details per seat"
            highlight
          />
        </div>
      </div>

      {/* Flow Summary */}
      <div className="bg-blue-500/20 border border-blue-400/50 rounded-lg p-6 mt-8">
        <h3 className="text-xl font-bold text-white mb-4">Flow Summary:</h3>
        <div className="grid grid-cols-2 gap-4 text-sm text-gray-200">
          <div className="flex items-start gap-2">
            <span className="text-blue-400 font-bold">1.</span>
            <span>User logs in (User table)</span>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-blue-400 font-bold">2.</span>
            <span>Searches buses (Bus + BusSchedule JOIN)</span>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-blue-400 font-bold">3.</span>
            <span>Views seat layout (Seat table WHERE schedule_id)</span>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-blue-400 font-bold">4.</span>
            <span>Selects seats A1, A2</span>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-blue-400 font-bold">5.</span>
            <span>Creates Booking record</span>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-blue-400 font-bold">6.</span>
            <span>Inserts BookingSeat records (2 rows)</span>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-blue-400 font-bold">7.</span>
            <span>Updates Seat: is_booked = TRUE</span>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-blue-400 font-bold">8.</span>
            <span>Updates BusSchedule: available_seats - 2</span>
          </div>
        </div>
      </div>
    </div>
  );
};

const TravelerFlow = () => {
  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-bold text-white text-center mb-6">
        Traveler Setup Flow - Bus Operator Journey
      </h2>

      {/* Admin creates Traveler */}
      <div className="flex items-center justify-center gap-8 mb-8">
        <EntityCard
          icon={<Shield className="w-8 h-8" />}
          name="Admin"
          color="from-purple-500 to-purple-600"
          fields={['admin_id', 'user_id (FK)']}
          description="System administrator"
        />
        <div className="text-white text-4xl">→</div>
        <EntityCard
          icon={<Users className="w-8 h-8" />}
          name="Traveler"
          color="from-green-500 to-green-600"
          fields={['traveler_id', 'company_name', 'verification_status: APPROVED']}
          description="Bus operator account"
        />
      </div>

      <FlowArrow label="Traveler adds buses" />

      {/* Traveler adds Bus */}
      <div className="flex items-center justify-center mb-8">
        <EntityCard
          icon={<Bus className="w-8 h-8" />}
          name="Bus"
          color="from-orange-500 to-orange-600"
          fields={['bus_id', 'traveler_id (FK)', 'bus_number: GJ01AB1234', 'total_seats: 40']}
          description="Bus master record"
        />
      </div>

      <FlowArrow label="Traveler creates schedules" />

      {/* Creates multiple schedules */}
      <div className="flex items-center justify-center gap-4 mb-8">
        <EntityCard
          icon={<Calendar className="w-8 h-8" />}
          name="BusSchedule"
          color="from-pink-500 to-pink-600"
          fields={['schedule_id: 456', 'journey_date: Jan 10']}
          size="small"
          highlight
        />
        <EntityCard
          icon={<Calendar className="w-8 h-8" />}
          name="BusSchedule"
          color="from-pink-500 to-pink-600"
          fields={['schedule_id: 457', 'journey_date: Jan 11']}
          size="small"
          highlight
        />
        <EntityCard
          icon={<Calendar className="w-8 h-8" />}
          name="BusSchedule"
          color="from-pink-500 to-pink-600"
          fields={['schedule_id: 458', 'journey_date: Jan 12']}
          size="small"
          highlight
        />
      </div>

      <FlowArrow label="System auto-generates seats" />

      {/* Auto-generated Seats */}
      <div className="flex items-center justify-center gap-2 flex-wrap max-w-4xl mx-auto">
        {['A1', 'A2', 'A3', 'A4', 'B1', 'B2', 'B3', 'B4'].map(seat => (
          <div key={seat} className="bg-gradient-to-br from-teal-500 to-teal-600 text-white px-4 py-2 rounded-lg shadow-lg text-sm font-bold">
            {seat}
          </div>
        ))}
        <div className="text-white font-bold">... (40 total seats)</div>
      </div>

      <div className="bg-green-500/20 border border-green-400/50 rounded-lg p-6 mt-8">
        <h3 className="text-xl font-bold text-white mb-4">Key Points:</h3>
        <div className="space-y-3 text-gray-200">
          <div className="flex items-start gap-2">
            <span className="text-green-400">•</span>
            <span><strong>One Bus</strong> can have <strong>Many Schedules</strong> (different dates)</span>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-green-400">•</span>
            <span><strong>One Schedule</strong> automatically creates <strong>40 Seat records</strong></span>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-green-400">•</span>
            <span>Each seat starts with <strong>is_booked = FALSE</strong></span>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-green-400">•</span>
            <span>Traveler can raise <strong>SupportTicket</strong> for issues</span>
          </div>
        </div>
      </div>
    </div>
  );
};

const CompleteERDiagram = () => {
  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-bold text-white text-center mb-6">
        Complete Entity Relationship Diagram
      </h2>

      <svg viewBox="0 0 1200 800" className="w-full h-auto">
        {/* User */}
        <g transform="translate(100, 50)">
          <rect width="180" height="120" rx="10" fill="url(#blue-gradient)" />
          <text x="90" y="30" fill="white" fontSize="18" fontWeight="bold" textAnchor="middle">User</text>
          <text x="10" y="55" fill="white" fontSize="12">• user_id (PK)</text>
          <text x="10" y="75" fill="white" fontSize="12">• email</text>
          <text x="10" y="95" fill="white" fontSize="12">• role</text>
        </g>

        {/* Traveler */}
        <g transform="translate(350, 50)">
          <rect width="180" height="120" rx="10" fill="url(#green-gradient)" />
          <text x="90" y="30" fill="white" fontSize="18" fontWeight="bold" textAnchor="middle">Traveler</text>
          <text x="10" y="55" fill="white" fontSize="12">• traveler_id (PK)</text>
          <text x="10" y="75" fill="white" fontSize="12">• user_id (FK)</text>
          <text x="10" y="95" fill="white" fontSize="12">• company_name</text>
        </g>

        {/* Admin */}
        <g transform="translate(600, 50)">
          <rect width="180" height="120" rx="10" fill="url(#purple-gradient)" />
          <text x="90" y="30" fill="white" fontSize="18" fontWeight="bold" textAnchor="middle">Admin</text>
          <text x="10" y="55" fill="white" fontSize="12">• admin_id (PK)</text>
          <text x="10" y="75" fill="white" fontSize="12">• user_id (FK)</text>
          <text x="10" y="95" fill="white" fontSize="12">• department</text>
        </g>

        {/* Bus */}
        <g transform="translate(350, 250)">
          <rect width="180" height="140" rx="10" fill="url(#orange-gradient)" />
          <text x="90" y="30" fill="white" fontSize="18" fontWeight="bold" textAnchor="middle">Bus</text>
          <text x="10" y="55" fill="white" fontSize="12">• bus_id (PK)</text>
          <text x="10" y="75" fill="white" fontSize="12">• traveler_id (FK)</text>
          <text x="10" y="95" fill="white" fontSize="12">• bus_number</text>
          <text x="10" y="115" fill="white" fontSize="12">• from/to location</text>
        </g>

        {/* BusSchedule */}
        <g transform="translate(600, 250)">
          <rect width="200" height="160" rx="10" fill="url(#pink-gradient)" stroke="#ffd700" strokeWidth="3" />
          <text x="100" y="30" fill="white" fontSize="18" fontWeight="bold" textAnchor="middle">BusSchedule ⭐</text>
          <text x="10" y="55" fill="white" fontSize="12">• schedule_id (PK)</text>
          <text x="10" y="75" fill="white" fontSize="12">• bus_id (FK)</text>
          <text x="10" y="95" fill="white" fontSize="12">• journey_date</text>
          <text x="10" y="115" fill="white" fontSize="12">• available_seats</text>
          <text x="10" y="135" fill="white" fontSize="12">• departure_time</text>
        </g>

        {/* Seat */}
        <g transform="translate(850, 250)">
          <rect width="180" height="140" rx="10" fill="url(#teal-gradient)" stroke="#ffd700" strokeWidth="3" />
          <text x="90" y="30" fill="white" fontSize="18" fontWeight="bold" textAnchor="middle">Seat ⭐</text>
          <text x="10" y="55" fill="white" fontSize="12">• seat_id (PK)</text>
          <text x="10" y="75" fill="white" fontSize="12">• schedule_id (FK)</text>
          <text x="10" y="95" fill="white" fontSize="12">• seat_number</text>
          <text x="10" y="115" fill="white" fontSize="12">• is_booked</text>
        </g>

        {/* Booking */}
        <g transform="translate(100, 470)">
          <rect width="200" height="160" rx="10" fill="url(#red-gradient)" />
          <text x="100" y="30" fill="white" fontSize="18" fontWeight="bold" textAnchor="middle">Booking</text>
          <text x="10" y="55" fill="white" fontSize="12">• booking_id (PK)</text>
          <text x="10" y="75" fill="white" fontSize="12">• user_id (FK)</text>
          <text x="10" y="95" fill="white" fontSize="12">• schedule_id (FK)</text>
          <text x="10" y="115" fill="white" fontSize="12">• number_of_seats</text>
          <text x="10" y="135" fill="white" fontSize="12">• total_amount</text>
        </g>

        {/* BookingSeat */}
        <g transform="translate(400, 470)">
          <rect width="200" height="160" rx="10" fill="url(#indigo-gradient)" stroke="#ffd700" strokeWidth="3" />
          <text x="100" y="30" fill="white" fontSize="18" fontWeight="bold" textAnchor="middle">BookingSeat ⭐</text>
          <text x="10" y="55" fill="white" fontSize="12">• booking_seat_id (PK)</text>
          <text x="10" y="75" fill="white" fontSize="12">• booking_id (FK)</text>
          <text x="10" y="95" fill="white" fontSize="12">• seat_id (FK)</text>
          <text x="10" y="115" fill="white" fontSize="12">• passenger_name</text>
          <text x="10" y="135" fill="white" fontSize="12">• passenger_age</text>
        </g>

        {/* SupportTicket */}
        <g transform="translate(700, 470)">
          <rect width="180" height="140" rx="10" fill="url(#yellow-gradient)" />
          <text x="90" y="30" fill="black" fontSize="18" fontWeight="bold" textAnchor="middle">SupportTicket</text>
          <text x="10" y="55" fill="black" fontSize="12">• ticket_id (PK)</text>
          <text x="10" y="75" fill="black" fontSize="12">• traveler_id (FK)</text>
          <text x="10" y="95" fill="black" fontSize="12">• admin_id (FK)</text>
          <text x="10" y="115" fill="black" fontSize="12">• subject</text>
        </g>

        {/* Relationships (Arrows) */}
        {/* User to Traveler */}
        <line x1="280" y1="110" x2="350" y2="110" stroke="#fff" strokeWidth="2" markerEnd="url(#arrowhead)" />
        <text x="315" y="100" fill="#ffd700" fontSize="12" fontWeight="bold">1:1</text>

        {/* User to Admin */}
        <line x1="280" y1="110" x2="600" y2="110" stroke="#fff" strokeWidth="2" markerEnd="url(#arrowhead)" strokeDasharray="5,5" />
        <text x="440" y="100" fill="#ffd700" fontSize="12" fontWeight="bold">1:1</text>

        {/* Traveler to Bus */}
        <line x1="440" y1="170" x2="440" y2="250" stroke="#fff" strokeWidth="2" markerEnd="url(#arrowhead)" />
        <text x="450" y="210" fill="#ffd700" fontSize="12" fontWeight="bold">1:N</text>

        {/* Bus to BusSchedule */}
        <line x1="530" y1="320" x2="600" y2="320" stroke="#fff" strokeWidth="2" markerEnd="url(#arrowhead)" />
        <text x="565" y="310" fill="#ffd700" fontSize="12" fontWeight="bold">1:N</text>

        {/* BusSchedule to Seat */}
        <line x1="800" y1="330" x2="850" y2="330" stroke="#fff" strokeWidth="2" markerEnd="url(#arrowhead)" />
        <text x="825" y="320" fill="#ffd700" fontSize="12" fontWeight="bold">1:N</text>

        {/* User to Booking */}
        <line x1="190" y1="170" x2="190" y2="470" stroke="#fff" strokeWidth="2" markerEnd="url(#arrowhead)" />
        <text x="200" y="320" fill="#ffd700" fontSize="12" fontWeight="bold">1:N</text>

        {/* Booking to BookingSeat */}
        <line x1="300" y1="550" x2="400" y2="550" stroke="#fff" strokeWidth="2" markerEnd="url(#arrowhead)" />
        <text x="350" y="540" fill="#ffd700" fontSize="12" fontWeight="bold">1:N</text>

        {/* BusSchedule to Booking */}
        <line x1="700" y1="410" x2="300" y2="470" stroke="#fff" strokeWidth="2" markerEnd="url(#arrowhead)" strokeDasharray="5,5" />
        <text x="500" y="430" fill="#ffd700" fontSize="12" fontWeight="bold">1:N</text>

        {/* Seat to BookingSeat */}
        <line x1="940" y1="390" x2="600" y2="470" stroke="#fff" strokeWidth="2" markerEnd="url(#arrowhead)" strokeDasharray="5,5" />
        <text x="770" y="420" fill="#ffd700" fontSize="12" fontWeight="bold">1:N</text>

        {/* Traveler to SupportTicket */}
        <line x1="440" y1="390" x2="700" y2="540" stroke="#fff" strokeWidth="2" markerEnd="url(#arrowhead)" strokeDasharray="5,5" />

        {/* Admin to SupportTicket */}
        <line x1="690" y1="170" x2="790" y2="470" stroke="#fff" strokeWidth="2" markerEnd="url(#arrowhead)" strokeDasharray="5,5" />

        {/* Gradients */}
        <defs>
          <linearGradient id="blue-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#3b82f6" />
            <stop offset="100%" stopColor="#2563eb" />
          </linearGradient>
          <linearGradient id="green-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#10b981" />
            <stop offset="100%" stopColor="#059669" />
          </linearGradient>
          <linearGradient id="purple-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#a855f7" />
            <stop offset="100%" stopColor="#9333ea" />
          </linearGradient>
          <linearGradient id="orange-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#f97316" />
            <stop offset="100%" stopColor="#ea580c" />
          </linearGradient>
          <linearGradient id="pink-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ec4899" />
            <stop offset="100%" stopColor="#db2777" />
          </linearGradient>
          <linearGradient id="teal-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#14b8a6" />
            <stop offset="100%" stopColor="#0d9488" />
          </linearGradient>
          <linearGradient id="red-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ef4444" />
            <stop offset="100%" stopColor="#dc2626" />
          </linearGradient>
          <linearGradient id="indigo-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#6366f1" />
            <stop offset="100%" stopColor="#4f46e5" />
          </linearGradient>
          <linearGradient id="yellow-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#fbbf24" />
            <stop offset="100%" stopColor="#f59e0b" />
          </linearGradient>
          <marker id="arrowhead" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
            <polygon points="0 0, 10 3, 0 6" fill="#fff" />
          </marker>
        </defs>
      </svg>

      <div className="bg-purple-500/20 border border-purple-400/50 rounded-lg p-6 mt-8">
        <h3 className="text-xl font-bold text-white mb-4">Legend:</h3>
        <div className="grid grid-cols-2 gap-4 text-sm text-gray-200">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 border-2 border-yellow-400 rounded"></div>
            <span>⭐ New entities (solve booking confusion)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-0.5 bg-white"></div>
            <span>Solid line = Direct relationship</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-0.5 bg-white" style={{backgroundImage: 'repeating-linear-gradient(90deg, white 0, white 5px, transparent 5px, transparent 10px)'}}></div>
            <span>Dashed line = Indirect relationship</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-yellow-400 font-bold">1:N</span>
            <span>One-to-Many relationship</span>
          </div>
        </div>
      </div>
    </div>
  );
};

// Helper Components
const EntityCard = ({ icon, name, color, fields, description, highlight, size = 'normal' }) => {
  const sizeClasses = size === 'small' ? 'w-48' : 'w-64';
  
  return (
    <div className={`${sizeClasses} ${highlight ? 'ring-4 ring-yellow-400' : ''} rounded-xl shadow-2xl overflow-hidden transform hover:scale-105 transition-transform`}>
      <div className={`bg-gradient-to-br ${color} text-white p-4 flex items-center gap-3`}>
        {icon}
        <span className="font-bold text-lg">{name}</span>
      </div>
      <div className="bg-white/90 p-4">
        <ul className="space-y-1 text-sm text-gray-800 mb-3">
          {fields.map((field, idx) => (
            <li key={idx} className="font-mono">
              {field}
            </li>
          ))}
        </ul>
        {description && (
          <p className="text-xs text-gray-600 italic border-t border-gray-300 pt-2">
            {description}
          </p>
        )}
      </div>
    </div>
  );
};

const FlowArrow = ({ label }) => {
  return (
    <div className="flex flex-col items-center my-4">
      <div className="text-yellow-400 text-3xl mb-2">↓</div>
      <div className="bg-yellow-400/20 border border-yellow-400 rounded-full px-4 py-2 text-white text-sm font-semibold">
        {label}
      </div>
    </div>
  );
};

export default ERDiagramFlow;