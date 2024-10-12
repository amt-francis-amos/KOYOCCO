
import  koyoccoLogo from './koyocco-logo.jpeg'
import  houseImg1  from  './house-1.png'
import  houseImg2  from  './house-2.png'
import  houseImg3  from  './house-3.png'
import  propertyImg1  from  './propertyImg1.jpeg'
import  propertyImg2  from  './propertyImg2.jpeg'
import  propertyImg3  from  './propertyImg3.jpeg'
import  aboutImg from './aboutImg.png'


 export const assets = {
    koyoccoLogo,
    aboutImg,
    houseImg1,
    houseImg2,
    houseImg3,
    propertyImg1,
    propertyImg2,
    propertyImg3 
}


export const listings = [
    {
      id: 1,
      type: "Hotel",
      name: "Luxury Hotel",
      image: assets.propertyImg1,
      location: "Ashiaman",
      price: "$150/night",
    },
    {
      id: 2,
      type: "Movie House",
      name: "Cinema Palace",
      image: assets.houseImg2,
      location: "Tema",
      price: "$50/session",
    },
    {
      id: 3,
      type: "Guesthouse",
      name: "Sunny Guesthouse",
      image: assets.houseImg1,
      location: "Dansoman",
      price: "$80/night",
    },
    {
      id: 4,
      type: "Furnished Property",
      name: "Cozy Apartment",
      image:assets.propertyImg3,
      location: "Tesano",
      price: "$120/night",
    },
  ];



  export const featuredProperties = [
    {
      id: 1,
      image: assets.propertyImg1,  
      title: "Luxury Villa",
      location: "Tema",
      price: "$2,500,000",
      description: "This stunning luxury villa features 5 bedrooms, a private pool, and breathtaking ocean views."
    },
    {
      id: 2,
      image: assets.propertyImg2,
      title: "Modern Apartment",
      location: "Spintex",
      price: "$1,200,000",
      description: "A sleek modern apartment in the heart of Manhattan, featuring open spaces and high-end finishes."
    },
    {
      id: 3,
      image: assets.propertyImg3,
      title: "Beach House",
      location: "Kaneshie",
      price: "$3,800,000",
      description: "This beach house offers direct access to the sand, with spacious living areas and panoramic ocean views."
    },
    {
      id: 4,
      image: assets.houseImg1,
      title: "Cozy Cottage",
      location: "Nungua",
      price: "$850,000",
      description: "A charming cottage nestled in the mountains, perfect for winter getaways and summer retreats."
    },
    {
      id: 5,
      image: assets.houseImg2,
      title: "Urban Loft",
      location: "Osu",
      price: "$980,000",
      description: "An urban loft with an industrial vibe, featuring exposed brick, high ceilings, and modern amenities."
    },
    {
      id: 6,
      image: assets.houseImg3,
      title: "Suburban Home",
      location: "Kasoa",
      price: "$1,750,000",
      description: "A spacious suburban home with a large backyard, perfect for families looking for a peaceful neighborhood."
    },
    {
      id: 7,
      image: assets.houseImg3,
      title: "Suburban Home",
      location: "Kasoa",
      price: "$1,750,000",
      description: "A spacious suburban home with a large backyard, perfect for families looking for a peaceful neighborhood."
    },
    {
      id: 8,
      image: assets.houseImg3,
      title: "City Home",
      location: "Kasoa",
      price: "$1,750,000",
      description: "A spacious suburban home with a large backyard, perfect for families looking for a peaceful neighborhood."
    },
    {
      id: 9,
      image: assets.houseImg3,
      title: "Expensive Home",
      location: "Kasoa",
      price: "$1,750,000",
      description: "A spacious suburban home with a large backyard, perfect for families looking for a peaceful neighborhood."
    },
    {
      id: 10,
      image: assets.houseImg3,
      title: "Expensive Home",
      location: "Sekondi",
      price: "$50,000",
      description: "A spacious suburban home with a large backyard, perfect for families looking for a peaceful neighborhood."
    }
  ];
  