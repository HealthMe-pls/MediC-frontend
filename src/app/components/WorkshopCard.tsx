import React from 'react';
import { format } from 'date-fns';


// Define Workshop interface for type safety
interface Workshop {
  id: number;
  name: string;
  description: string;
  instructor: string;
  language: string;
  date: string;
  start_time: string;
  end_time: string;
  price: number;
  photos: { photo_id: number; pathfile: string }[];
}

// Utility function for formatting date
const formatFullDate = (isoString: string): string => {
  const date = new Date(isoString);
  return format(date, 'EEEE dd MMMM yyyy');
};
const formatTime = (isoString: string): string => {
  const date = new Date(isoString); // ใช้ new Date() แทน parseISO
  return format(date, "HH:mm");
};
const WorkshopCard: React.FC<{ workshop: Workshop }> = ({ workshop }) => {
  return (
    <div
      key={workshop.id}
      className="bg-white rounded shadow-md p-4 hover:shadow-lg transition"
    >
      <h2 className="text-xl font-semibold">{workshop.name}</h2>
      <p className="text-gray-700 mt-2">{workshop.description}</p>
      <p className="text-gray-500 mt-2">
        Instructor: {workshop.instructor}
      </p>
      <p className="text-gray-500 mt-1">
        Language: {workshop.language}
      </p>
      <p className="text-gray-500 mt-1">
        Date: {formatFullDate(workshop.date)} ({formatTime(workshop.start_time)} - {formatTime(workshop.end_time)})
      </p>
      <p className="text-blue-600 font-bold mt-2">
        ${workshop.price.toFixed(2)}
      </p>
      <div className="mt-4">
        {workshop.photos.map((photo) => (
          <img
            key={photo.photo_id}
            src={photo.pathfile}
            alt={`Workshop ${workshop.name}`}
            className="w-full h-32 object-cover rounded mb-2"
          />
        ))}
      </div>
    </div>
  );
};

export default WorkshopCard;