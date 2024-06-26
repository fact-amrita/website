import React, { useState } from 'react';

// Interface for photo data
interface Photo {
  id: number;
  name: string;
  url: string;
}

const App: React.FC = () => {
  // Example array of photo data
  const initialPhotos: Photo[] = [
    { id: 1, name: 'Photo 1', url: 'https://example.com/photo1.jpg' },
    { id: 2, name: 'Photo 2', url: 'https://example.com/photo2.jpg' },
    { id: 3, name: 'Photo 3', url: 'https://example.com/photo3.jpg' },
    { id: 4, name: 'Photo 4', url: 'https://example.com/photo4.jpg' },
    { id: 5, name: 'Photo 5', url: 'https://example.com/photo5.jpg' },
    { id: 6, name: 'Photo 6', url: 'https://example.com/photo6.jpg' },
    { id: 7, name: 'Photo 7', url: 'https://example.com/photo7.jpg' },
    { id: 8, name: 'Photo 8', url: 'https://example.com/photo8.jpg' },
    { id: 9, name: 'Photo 9', url: 'https://example.com/photo9.jpg' },
    { id: 10, name: 'Photo 10', url: 'https://example.com/photo10.jpg' },
    
  ];

  const [photos, setPhotos] = useState(initialPhotos);
  const [searchTerm, setSearchTerm] = useState('');
  const [isMember, setIsMember] = useState(false); 
  const title = 'Visitor Photos'; 

  
  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setSearchTerm(value);

    
    const filteredPhotos = initialPhotos.filter(photo =>
      photo.name.toLowerCase().includes(value.toLowerCase()) ||
      photo.id.toString().includes(value.toLowerCase())
    );

    
    setPhotos(filteredPhotos);
  };

  return (
    <div className="container mx-auto mt-8">
      <h1 className="text-3xl font-bold mb-4">Photo Gallery</h1>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search by name or ID"
          value={searchTerm}
          onChange={handleSearch}
          className="px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div className="grid grid-cols-4 gap-4 p-4">
        {photos.map(photo => (
          <div key={photo.id} className="border border-gray-300 p-4">
            {!isMember && (
              <div className="text-center">
                <img src={photo.url} alt={photo.name} className="w-full h-auto mb-2" />
                <div>{title}</div>
                <div>{photo.name}</div>
                <div>ID: {photo.id}</div>
              </div>
            )}
            {isMember && (
              <div>
                <img src={photo.url} alt={photo.name} className="w-full h-auto mb-2" />
                <div className="text-center">{photo.name}</div>
                <div className="text-center text-gray-500 text-sm">ID: {photo.id}</div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
