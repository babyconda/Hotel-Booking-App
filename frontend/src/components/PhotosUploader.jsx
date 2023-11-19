import axios from "axios";
import { useState } from "react";

import { BsTrash } from "react-icons/bs";
import { AiOutlineStar, AiFillStar } from "react-icons/ai";

export default function PhotosUploader({ addedPhotos,setAddedPhotos, onChange }) {
  const [imageUrl, setImageUrl] = useState('');

  const addUrlArray = (e) =>{
    e.preventDefault();  
    setAddedPhotos(prev => [...prev, imageUrl])
    setImageUrl('')
  }
  
  const removePhoto = (e, filename) => {    
    e.preventDefault();
    onChange([...addedPhotos.filter((photo) => photo !== filename)]);
  };

  const selectAsMainPhoto = (e, filename) => {
    e.preventDefault();
    onChange([filename, ...addedPhotos.filter((photo) => photo !== filename)]);
  };

  return (
    <>
      <div className="flex gap-2">
        <input
          type="text"
          placeholder="Add using a link ....jpg"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
          // onChange={(e) => setPhotoLink(e.target.value)}
        />
        <button
          className="bg-gray-200 px-4 rounded-2xl"
          onClick={addUrlArray}
          // onClick={addPhotoByLink}
        >
          Add&nbsp;photo
        </button>
      </div>
      <div className="mt-2 grid gap-2 grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
        {addedPhotos?.length > 0 &&
          addedPhotos?.map((link, id) => (
            <div key={id} className="h-32 flex relative">
           
              <img
                className="rounded-2xl w-full object-cover"
                src={link}
                alt=""
              />
               
              <button
                onClick={(e) => removePhoto(e, link)}
                className="absolute bottom-2 right-2 text-white rounded-full bg-black bg-opacity-70 hover:bg-opacity-40 p-2 cursor-pointer"
              >
                <BsTrash />
              </button>
              <button
                onClick={(e) => selectAsMainPhoto(e, link)}
                className="absolute bottom-2 left-2 text-white rounded-full bg-black bg-opacity-70 hover:bg-opacity-40 p-2 cursor-pointer"
              >
                {link === addedPhotos[0] ? <AiFillStar /> : <AiOutlineStar />}
              </button>
            </div>
          ))}
     
      </div>
    </>
  );
}
