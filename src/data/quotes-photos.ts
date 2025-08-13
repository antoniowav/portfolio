import { StaticImageData } from "next/image";

export interface Quote {
  id: string;
  text: string;
  author: string;
  date: string;
  featured: boolean;
}

export interface Photo {
  id: string;
  title: string;
  description: string;
  imagePath: string;
  date: string;
  featured: boolean;
  location?: string;
}

// Sample quotes data - replace with your own quotes
export const quotes: Quote[] = [
  {
    id: "quote-1",
    text: "The best way to predict the future is to invent it.",
    author: "Alan Kay",
    date: "2024-05-01",
    featured: true,
  },
  {
    id: "quote-2",
    text: "Simplicity is the ultimate sophistication.",
    author: "Leonardo da Vinci",
    date: "2024-04-28",
    featured: true,
  },
  {
    id: "quote-3",
    text: "The only way to do great work is to love what you do.",
    author: "Steve Jobs",
    date: "2024-04-25",
    featured: false,
  },
  {
    id: "quote-4",
    text: "It does not matter how slowly you go as long as you do not stop.",
    author: "Confucius",
    date: "2024-04-20",
    featured: false,
  },
  {
    id: "quote-5",
    text: "Life is what happens when you're busy making other plans.",
    author: "John Lennon",
    date: "2024-04-15",
    featured: true,
  },
];

// Sample photos data - replace with your actual photos
export const photos: Photo[] = [
  {
    id: "photo-1",
    title: "Sunset at the Beach",
    description: "A beautiful sunset captured at the local beach.",
    imagePath: "/images/gallery/sunset.jpg",
    date: "2024-05-02",
    featured: true,
    location: "Malibu, CA",
  },
  {
    id: "photo-2",
    title: "Mountain Landscape",
    description: "Breathtaking view from the top of Mt. Whitney.",
    imagePath: "/images/gallery/mountain.jpg",
    date: "2024-04-29",
    featured: true,
    location: "Sierra Nevada, CA",
  },
  {
    id: "photo-3",
    title: "City Lights",
    description: "Nighttime cityscape from downtown.",
    imagePath: "/images/gallery/city.jpg",
    date: "2024-04-25",
    featured: true,
    location: "San Francisco, CA",
  },
  {
    id: "photo-4",
    title: "Forest Trail",
    description: "Peaceful walk through the redwoods.",
    imagePath: "/images/gallery/forest.jpg",
    date: "2024-04-20",
    featured: false,
    location: "Muir Woods, CA",
  },
  {
    id: "photo-5",
    title: "Desert Landscape",
    description: "The stunning formations at sunset.",
    imagePath: "/images/gallery/desert.jpg",
    date: "2024-04-15",
    featured: false,
    location: "Joshua Tree, CA",
  },
];

// Get featured items
export const featuredQuotes = quotes.filter((quote) => quote.featured);
export const featuredPhotos = photos.filter((photo) => photo.featured);
