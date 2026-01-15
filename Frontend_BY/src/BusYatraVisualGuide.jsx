import React, { useState } from 'react';
import { Database, Users, Bus, Calendar, Ticket, User, Shield, AlertCircle, CheckCircle } from 'lucide-react';

const BusYatraVisualGuide = () => {
  const [activeTab, setActiveTab] = useState('er-diagram');

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <h1 className="text-3xl font-bold text-indigo-900 flex items-center gap-3">
            <Database className="w-8 h-8" />
            BusYatra - Database Design & Data Flow
          </h1>
          <p className="text-gray-600 mt-2">Complete visual guide to understand the system architecture</p>
        </div>

        <div className="bg-white rounded-lg shadow-lg mb-6">
          <div className="flex border-b">
            <button
              onClick={() => setActiveTab('er-diagram')}
              className={`px-6 py-3 font-semibold ${activeTab === 'er-diagram' ? 'border-b-2 border-indigo-600 text-indigo-600' : 'text-gray-600'}`}
            >
              ER Diagram
            </button>
            <button
              onClick={() => setActiveTab('data-flow')}
              className={`px-6 py-3 font-semibold ${activeTab === 'data-flow' ? 'border-b-2 border-indigo-600 text-indigo-600' : 'text-gray-600'}`}
            >
              Booking Flow
            </button>
            <button
              onClick={() => setActiveTab('seat-flow')}
              className={`px-6 py-3 font-semibold ${activeTab === 'seat-flow' ? 'border-b-2 border-indigo-600 text-indigo-600' : 'text-gray-600'}`}
            >
              Seat Selection
            </button>
            <button
              onClick={() => setActiveTab('sample-data')}
              className={`px-6 py-3 font-semibold ${activeTab === 'sample-data' ? 'border-b-2 border-indigo-600 text-indigo-600' : 'text-gray-600'}`}
            >
              Sample Data
            </button>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6">
          {activeTab === 'er-diagram' && <ERDiagram />}
          {activeTab === 'data-flow' && <DataFlow />}
          {activeTab === 'seat-flow' && <SeatFlow />}
          {activeTab === 'sample-data' && <SampleData />}
        </div>
      </div>
    </div>
  );
};

const ERDiagram = () => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Entity Relationship Diagram</h2>
      
      <div className="grid grid-cols-1 gap-6">
        <div className="flex justify-around items-start gap-4">
          <EntityBox 
            name="User" 
            icon={<User className="w-5 h-5" />}
            color="bg-blue-500"
            fields={[
              'user_id (PK)',
              'full_name',
              'email',
              'mobile_number',
              'password',
              'role',
              'gender',
              'date_of_birth',
              'is_active',
              'created_at'
            ]}
          />
          
          <EntityBox 
            name="Traveler" 
            icon={<Users className="w-5 h-5" />}
            color="bg-green-500"
            fields={[
              'traveler_id (PK)',
              'user_id (FK)',
              'company_name',
              'business_contact',
              'address',
              'verification_status',
              'created_at'
            ]}
          />
          
          <EntityBox 
            name="Admin" 
            icon={<Shield className="w-5 h-5" />}
            color="bg-purple-500"
            fields={[
              'admin_id (PK)',
              'user_id (FK)',
              'admin_level',
              'department',
              'created_at'
            ]}
          />
        </div>

        <div className="flex justify-around items-start gap-4">
          <EntityBox 
            name="Bus" 
            icon={<Bus className="w-5 h-5" />}
            color="bg-orange-500"
            fields={[
              'bus_id (PK)',
              'traveler_id (FK)',
              'bus_number',
              'bus_type',
              'from_location',
              'to_location',
              'total_seats',
              'fare',
              'is_active'
            ]}
          />
          
          <EntityBox 
            name="BusSchedule ⭐" 
            icon={<Calendar className="w-5 h-5" />}
            color="bg-pink-500"
            fields={[
              'schedule_id (PK)',
              'bus_id (FK)',
              'journey_date',
              'departure_time',
              'arrival_time',
              'total_seats',
              'available_seats',
              'schedule_status'
            ]}
            highlight={true}
          />
          
          <EntityBox 
            name="Seat ⭐" 
            icon={<CheckCircle className="w-5 h-5" />}
            color="bg-teal-500"
            fields={[
              'seat_id (PK)',
              'schedule_id (FK)',
              'seat_number',
              'seat_type',
              'is_booked',
              'booking_id (FK)'
            ]}
            highlight={true}
          />
        </div>

        <div className="flex justify-around items-start gap-4">
          <EntityBox 
            name="Booking" 
            icon={<Ticket className="w-5 h-5" />}
            color="bg-red-500"
            fields={[
              'booking_id (PK)',
              'booking_reference',
              'user_id (FK)',
              'schedule_id (FK)',
              'traveler_id (FK)',
              'number_of_seats',
              'total_amount',
              'booking_status',
              'payment_status',
              'booking_date'
            ]}
          />
          
          <EntityBox 
            name="BookingSeat ⭐" 
            icon={<Users className="w-5 h-5" />}
            color="bg-indigo-500"
            fields={[
              'booking_seat_id (PK)',
              'booking_id (FK)',
              'seat_id (FK)',
              'passenger_name',
              'passenger_age',
              'passenger_gender'
            ]}
            highlight={true}
          />
          
          <EntityBox 
            name="SupportTicket" 
            icon={<AlertCircle className="w-5 h-5" />}
            color="bg-yellow-500"
            fields={[
              'ticket_id (PK)',
              'traveler_id (FK)',
              'admin_id (FK)',
              'subject',
              'description',
              'ticket_status',
              'priority'
            ]}
          />
        </div>
      </div>

      <div className="mt-8 bg-indigo-50 p-6 rounded-lg">
        <h3 className="text-xl font-bold text-gray-800 mb-4">Key Relationships:</h3>
        <div className="grid grid-cols-2 gap-4">
          <Relationship from="User" to="Booking" type="1:N" desc="One user can have many bookings" />
          <Relationship from="Traveler" to="Bus" type="1:N" desc="One traveler operates many buses" />
          <Relationship from="Bus" to="BusSchedule" type="1:N" desc="One bus has many schedules (different dates)" />
          <Relationship from="BusSchedule" to="Seat" type="1:N" desc="One schedule has many seats" />
          <Relationship from="BusSchedule" to="Booking" type="1:N" desc="One schedule has many bookings" />
          <Relationship from="Booking" to="BookingSeat" type="1:N" desc="One booking has many seats" />
          <Relationship from="Seat" to="BookingSeat" type="1:N" desc="One seat can be in many bookings (over time)" />
        </div>
      </div>

      <div className="mt-6 bg-yellow-50 border-l-4 border-yellow-500 p-4">
        <p className="text-sm font-semibold text-yellow-800">⭐ = New entities added to solve your confusion!</p>
      </div>
    </div>
  );
};

const DataFlow = () => {
  const steps = [
    {
      step: 1,
      title: "User Login",
      desc: "Customer logs in with email/password",
      table: "User",
      query: "SELECT * FROM User WHERE email = 'john@email.com' AND role = 'CUSTOMER'",
      result: "User authenticated ✓"
    },
    {
      step: 2,
      title: "Search Buses",
      desc: "User enters: From=Ahmedabad, To=Mumbai, Date=Jan 10, 2026",
      table: "BusSchedule + Bus",
      query: "SELECT * FROM BusSchedule bs JOIN Bus b ON bs.bus_id = b.bus_id WHERE b.from_location='Ahmedabad' AND b.to_location='Mumbai' AND bs.journey_date='2026-01-10'",
      result: "List of 5 available buses shown"
    },
    {
      step: 3,
      title: "Select Bus",
      desc: "User clicks on 'GJ01AB1234' bus",
      table: "BusSchedule",
      query: "SELECT schedule_id FROM BusSchedule WHERE bus_id = 123 AND journey_date = '2026-01-10'",
      result: "schedule_id = 456 retrieved"
    },
    {
      step: 4,
      title: "Load Seat Layout",
      desc: "System fetches all seats for this schedule",
      table: "Seat",
      query: "SELECT seat_id, seat_number, is_booked FROM Seat WHERE schedule_id = 456",
      result: "40 seats loaded (20 available, 20 booked)"
    },
    {
      step: 5,
      title: "User Selects Seats",
      desc: "User selects seats A1 and A2",
      table: "Seat (check)",
      query: "SELECT is_booked FROM Seat WHERE seat_id IN (101, 102)",
      result: "Both seats available ✓"
    },
    {
      step: 6,
      title: "Enter Passenger Details",
      desc: "For A1: John Doe, 30, Male | For A2: Jane Doe, 28, Female",
      table: "BookingSeat (prepare)",
      query: "Prepare data for insertion",
      result: "Passenger data ready"
    },
    {
      step: 7,
      title: "Create Booking",
      desc: "System creates booking record",
      table: "Booking",
      query: "INSERT INTO Booking (user_id, schedule_id, number_of_seats, total_amount) VALUES (123, 456, 2, 1000)",
      result: "booking_id = 1001 created"
    },
    {
      step: 8,
      title: "Link Seats to Booking",
      desc: "Associate selected seats with booking",
      table: "BookingSeat",
      query: "INSERT INTO BookingSeat (booking_id, seat_id, passenger_name, ...) VALUES (1001, 101, 'John Doe', ...), (1001, 102, 'Jane Doe', ...)",
      result: "2 records inserted"
    },
    {
      step: 9,
      title: "Mark Seats as Booked",
      desc: "Update seat status to prevent double booking",
      table: "Seat",
      query: "UPDATE Seat SET is_booked = TRUE, booking_id = 1001 WHERE seat_id IN (101, 102)",
      result: "Seats A1, A2 now booked ✓"
    },
    {
      step: 10,
      title: "Update Availability",
      desc: "Reduce available seats in schedule",
      table: "BusSchedule",
      query: "UPDATE BusSchedule SET available_seats = available_seats - 2 WHERE schedule_id = 456",
      result: "Available seats: 20 → 18"
    }
  ];

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Complete Booking Data Flow</h2>
      <p className="text-gray-600 mb-6">Step-by-step journey from login to booking confirmation</p>
      
      <div className="space-y-4">
        {steps.map((item, idx) => (
          <div key={idx} className="border-l-4 border-indigo-500 bg-indigo-50 p-4 rounded-r-lg">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-10 h-10 bg-indigo-600 text-white rounded-full flex items-center justify-center font-bold">
                {item.step}
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-lg text-gray-800">{item.title}</h3>
                <p className="text-gray-700 mt-1">{item.desc}</p>
                <div className="mt-3 bg-white p-3 rounded border border-indigo-200">
                  <div className="flex items-center gap-2 mb-2">
                    <Database className="w-4 h-4 text-indigo-600" />
                    <span className="font-semibold text-sm text-indigo-900">Table: {item.table}</span>
                  </div>
                  <code className="text-xs text-gray-700 block bg-gray-50 p-2 rounded overflow-x-auto">
                    {item.query}
                  </code>
                  <div className="mt-2 text-sm font-semibold text-green-700">
                    → {item.result}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const SeatFlow = () => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Seat Selection Visual Flow</h2>
      
      <div className="bg-gray-50 p-6 rounded-lg">
        <h3 className="font-bold text-lg mb-4">Seat Layout Display (Frontend)</h3>
        <div className="grid grid-cols-4 gap-3 max-w-md">
          {['A1', 'A2', 'A3', 'A4', 'B1', 'B2', 'B3', 'B4', 
            'C1', 'C2', 'C3', 'C4', 'D1', 'D2', 'D3', 'D4'].map((seat) => {
            const isBooked = ['A3', 'B1', 'C2', 'D4'].includes(seat);
            const isSelected = ['A1', 'A2'].includes(seat);
            return (
              <div
                key={seat}
                className={`h-16 flex flex-col items-center justify-center rounded-lg font-bold text-sm
                  ${isBooked ? 'bg-red-200 text-red-800 cursor-not-allowed' : 
                    isSelected ? 'bg-blue-500 text-white' : 
                    'bg-green-200 text-green-800 cursor-pointer hover:bg-green-300'}`}
              >
                <span>{seat}</span>
                <span className="text-xs">
                  {isBooked ? 'Booked' : isSelected ? 'Selected' : 'Available'}
                </span>
              </div>
            );
          })}
        </div>
        
        <div className="mt-6 flex gap-6">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-green-200 rounded"></div>
            <span className="text-sm">Available</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-blue-500 rounded"></div>
            <span className="text-sm">Selected</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-red-200 rounded"></div>
            <span className="text-sm">Booked</span>
          </div>
        </div>
      </div>

      <div className="bg-indigo-50 p-6 rounded-lg">
        <h3 className="font-bold text-lg mb-4">How Database Stores This (Backend)</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead className="bg-indigo-600 text-white">
              <tr>
                <th className="border p-2">seat_id</th>
                <th className="border p-2">schedule_id</th>
                <th className="border p-2">seat_number</th>
                <th className="border p-2">is_booked</th>
                <th className="border p-2">booking_id</th>
              </tr>
            </thead>
            <tbody className="bg-white">
              <tr className="bg-blue-100">
                <td className="border p-2">101</td>
                <td className="border p-2">456</td>
                <td className="border p-2 font-bold">A1</td>
                <td className="border p-2 text-blue-700 font-bold">TRUE (Selected)</td>
                <td className="border p-2">1001</td>
              </tr>
              <tr className="bg-blue-100">
                <td className="border p-2">102</td>
                <td className="border p-2">456</td>
                <td className="border p-2 font-bold">A2</td>
                <td className="border p-2 text-blue-700 font-bold">TRUE (Selected)</td>
                <td className="border p-2">1001</td>
              </tr>
              <tr className="bg-red-100">
                <td className="border p-2">103</td>
                <td className="border p-2">456</td>
                <td className="border p-2 font-bold">A3</td>
                <td className="border p-2 text-red-700 font-bold">TRUE</td>
                <td className="border p-2">998</td>
              </tr>
              <tr className="bg-green-100">
                <td className="border p-2">104</td>
                <td className="border p-2">456</td>
                <td className="border p-2 font-bold">A4</td>
                <td className="border p-2 text-green-700 font-bold">FALSE</td>
                <td className="border p-2">NULL</td>
              </tr>
              <tr className="bg-red-100">
                <td className="border p-2">105</td>
                <td className="border p-2">456</td>
                <td className="border p-2 font-bold">B1</td>
                <td className="border p-2 text-red-700 font-bold">TRUE</td>
                <td className="border p-2">999</td>
              </tr>
              <tr className="bg-green-100">
                <td className="border p-2">106</td>
                <td className="border p-2">456</td>
                <td className="border p-2 font-bold">B2</td>
                <td className="border p-2 text-green-700 font-bold">FALSE</td>
                <td className="border p-2">NULL</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className="bg-yellow-50 p-6 rounded-lg border-l-4 border-yellow-500">
        <h3 className="font-bold text-lg mb-4">Selection Logic Explained:</h3>
        <ol className="space-y-2 list-decimal list-inside">
          <li><strong>Load seats:</strong> Fetch all seats WHERE schedule_id = 456</li>
          <li><strong>Display layout:</strong> Show green if is_booked = FALSE, red if TRUE</li>
          <li><strong>User clicks A1:</strong> Check is_booked → FALSE → Allow selection</li>
          <li><strong>User clicks A2:</strong> Check is_booked → FALSE → Allow selection</li>
          <li><strong>User clicks A3:</strong> Check is_booked → TRUE → Show "Already Booked" error</li>
          <li><strong>On confirm:</strong> Update A1 & A2 to is_booked = TRUE, booking_id = 1001</li>
        </ol>
      </div>
    </div>
  );
};

const SampleData = () => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Sample Data with Real Examples</h2>
      
      <DataTable 
        title="User Table"
        headers={['user_id', 'full_name', 'email', 'role', 'mobile']}
        rows={[
          ['123', 'John Doe', 'john@email.com', 'CUSTOMER', '9876543210'],
          ['124', 'Jane Smith', 'jane@email.com', 'CUSTOMER', '9876543211'],
          ['789', 'ABC Travels', 'abc@travels.com', 'TRAVELER', '9876543212'],
          ['999', 'Admin User', 'admin@busyatra.com', 'ADMIN', '9876543213']
        ]}
      />

      <DataTable 
        title="Traveler Table"
        headers={['traveler_id', 'user_id', 'company_name', 'verification_status']}
        rows={[
          ['789', '789', 'ABC Travels Pvt Ltd', 'APPROVED']
        ]}
      />

      <DataTable 
        title="Bus Table"
        headers={['bus_id', 'traveler_id', 'bus_number', 'from_location', 'to_location', 'total_seats', 'fare']}
        rows={[
          ['123', '789', 'GJ01AB1234', 'Ahmedabad', 'Mumbai', '40', '₹500']
        ]}
      />

      <DataTable 
        title="BusSchedule Table (⭐ KEY TABLE)"
        headers={['schedule_id', 'bus_id', 'journey_date', 'departure_time', 'available_seats', 'status']}
        rows={[
          ['456', '123', '2026-01-10', '08:00 AM', '18', 'ACTIVE'],
          ['457', '123', '2026-01-11', '08:00 AM', '40', 'ACTIVE'],
          ['458', '123', '2026-01-12', '08:00 AM', '35', 'ACTIVE']
        ]}
        highlight={true}
      />

      <DataTable 
        title="Seat Table (Sample - showing first 8 seats)"
        headers={['seat_id', 'schedule_id', 'seat_number', 'seat_type', 'is_booked', 'booking_id']}
        rows={[
          ['101', '456', 'A1', 'SEATER', 'TRUE', '1001'],
          ['102', '456', 'A2', 'SEATER', 'TRUE', '1001'],
          ['103', '456', 'A3', 'SEATER', 'TRUE', '998'],
          ['104', '456', 'A4', 'SEATER', 'FALSE', 'NULL'],
          ['105', '456', 'B1', 'SLEEPER', 'TRUE', '999'],
          ['106', '456', 'B2', 'SLEEPER', 'FALSE', 'NULL'],
          ['107', '456', 'B3', 'SLEEPER', 'FALSE', 'NULL'],
          ['108', '456', 'B4', 'SLEEPER', 'FALSE', 'NULL']
        ]}
      />

      <DataTable 
        title="Booking Table"
        headers={['booking_id', 'booking_ref', 'user_id', 'schedule_id', 'number_of_seats', 'total_amount', 'status']}
        rows={[
          ['1001', 'BUS2026011001', '123', '456', '2', '₹1000', 'CONFIRMED'],
          ['998', 'BUS2026011002', '124', '456', '1', '₹500', 'CONFIRMED'],
          ['999', 'BUS2026011003', '123', '456', '1', '₹600', 'CONFIRMED']
        ]}
      />

      <DataTable 
        title="BookingSeat Table (⭐ Links Bookings to Seats)"
        headers={['booking_seat_id', 'booking_id', 'seat_id', 'passenger_name', 'age', 'gender']}
        rows={[
          ['1', '1001', '101', 'John Doe', '30', 'Male'],
          ['2', '1001', '102', 'Jane Doe', '28', 'Female'],
          ['3', '998', '103', 'Mike Wilson', '35', 'Male'],
          ['4', '999', '105', 'Sarah Brown', '25', 'Female']
        ]}
        highlight={true}
      />

      <div className="bg-green-50 p-6 rounded-lg border-l-4 border-green-500">
        <h3 className="font-bold text-lg mb-2 text-green-900">Understanding the Data:</h3>
        <ul className="space-y-2 text-sm text-green-800">
          <li>• <strong>Bus GJ01AB1234</strong> operates on 3 different dates (3 schedules)</li>
          <li>• <strong>Schedule 456</strong> (Jan 10) has 40 total seats, 18 available (22 booked)</li>
          <li>• <strong>Booking 1001</strong> by John has 2 seats (A1, A2) with 2 passengers</li>
          <li>• <strong>Seat A1</strong> is booked in booking 1001, occupied by John Doe</li>
          <li>• <strong>Seat A4</strong> is still available (is_booked = FALSE)</li>
        </ul>
      </div>
    </div>
  );
};

const EntityBox = ({ name, icon, color, fields, highlight }) => {
  return (
    <div className={`flex-1 ${highlight ? 'ring-4 ring-yellow-400' : ''} rounded-lg shadow-lg overflow-hidden`}>
      <div className={`${color} text-white p-3 flex items-center gap-2`}>
        {icon}
        <span className="font-bold">{name}</span>
      </div>
      <div className="bg-white p-3">
        <ul className="text-xs space-y-1">
          {fields.map((field, idx) => (
            <li key={idx} className={`${field.includes('PK') || field.includes('FK') ? 'font-bold text-indigo-700' : 'text-gray-700'}`}>
              {field}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

const Relationship = ({ from, to, type, desc }) => {
  return (
    <div className="bg-white p-3 rounded border border-indigo-300">
      <div className="font-bold text-sm text-indigo-900">
        {from} <span className="text-indigo-600">({type})</span> {to}
      </div>
      <div className="text-xs text-gray-600 mt-1">{desc}</div>
    </div>
  );
};

const DataTable = ({ title, headers, rows, highlight }) => {
  return (
    <div className={`${highlight ? 'ring-4 ring-yellow-400' : ''} bg-white rounded-lg shadow-lg overflow-hidden`}>
      <div className="bg-indigo-600 text-white p-3 font-bold">
        {title}
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-xs">
          <thead className="bg-gray-100">
            <tr>
              {headers.map((h, idx) => (
                <th key={idx} className="border p-2 text-left font-semibold">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, idx) => (
              <tr key={idx} className="hover:bg-gray-50">
                {row.map((cell, cellIdx) => (
                  <td key={cellIdx} className="border p-2">
                    {cell === 'TRUE' ? (
                      <span className="text-green-700 font-bold">{cell}</span>
                    ) : cell === 'FALSE' ? (
                      <span className="text-gray-600">{cell}</span>
                    ) : cell === 'NULL' ? (
                      <span className="text-gray-400 italic">{cell}</span>
                    ) : (
                      cell
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BusYatraVisualGuide;