import { StaticImageData } from "next/image";
import { Photo, photos } from "./quotes-photos";

// Export Photo type and photos array
export type { Photo };
export { photos };

export interface ListenItem {
  id: string;
  title: string;
  creator: string;
  description: string;
  link: string;
  imagePath: string;
  date: string;
  featured: boolean;
  category: "playlist" | "podcast";
}

export interface WatchItem {
  id: string;
  title: string;
  creator: string;
  description: string;
  link: string;
  imagePath: string;
  date: string;
  featured: boolean;
  category: "youtube" | "series" | "movie";
}

// Sample listen data - replace with your own recommendations
export const listenItems: ListenItem[] = [
  {
    id: "listen-1",
    title: "Coding Focus Playlist",
    creator: "Spotify",
    description:
      "Perfect background music for deep work and programming sessions.",
    link: "https://open.spotify.com/playlist/37i9dQZF1DWZeKCadgRdKQ",
    imagePath: "/images/listen-watch/coding-focus.jpg",
    date: "2024-05-01",
    featured: true,
    category: "playlist",
  },
  {
    id: "listen-2",
    title: "Syntax",
    creator: "Wes Bos & Scott Tolinski",
    description:
      "A tasty web development podcast covering everything from frameworks to career advice.",
    link: "https://syntax.fm/",
    imagePath: "/images/listen-watch/syntax.jpg",
    date: "2024-04-28",
    featured: true,
    category: "podcast",
  },
  {
    id: "listen-3",
    title: "Darknet Diaries",
    creator: "Jack Rhysider",
    description: "Explore true stories of the dark side of the Internet.",
    link: "https://open.spotify.com/show/4XPl3uEEL9hvqMkoZrzbx5",
    imagePath: "/images/listen-watch/joe-rogan.jpg",
    date: "2024-04-25",
    featured: false,
    category: "podcast",
  },
  {
    id: "listen-4",
    title: "Lo-Fi Beats",
    creator: "Spotify",
    description: "Chill beats to help you relax or focus on your work.",
    link: "https://open.spotify.com/playlist/37i9dQZF1DWWQRwui0ExPn",
    imagePath: "/images/listen-watch/lofi-beats.jpg",
    date: "2024-04-20",
    featured: false,
    category: "playlist",
  },
  {
    id: "listen-5",
    title: "Hardcore History",
    creator: "Dan Carlin",
    description:
      "In-depth explorations of historical events that feel like time travel.",
    link: "https://www.dancarlin.com/hardcore-history-series/",
    imagePath: "/images/listen-watch/hardcore-history.jpg",
    date: "2024-04-15",
    featured: true,
    category: "podcast",
  },
];

// Sample watch data - replace with your actual recommendations
export const watchItems: WatchItem[] = [
  {
    id: "watch-1",
    title: "Fireship",
    creator: "Jeff Delaney",
    description:
      "Quick and informative coding tutorials with a unique style and humor.",
    link: "https://www.youtube.com/@Fireship",
    imagePath: "/images/listen-watch/fireship.jpg",
    date: "2024-05-02",
    featured: true,
    category: "youtube",
  },
  {
    id: "watch-2",
    title: "Succession",
    creator: "Jesse Armstrong",
    description:
      "The series centers on the Roy family, the owners of global media and entertainment conglomerate Waystar RoyCo, and their fight for control of the company amidst uncertainty about the health of the family's patriarch.",
    link: "https://www.imdb.com/title/tt7660850/",
    imagePath: "/images/listen-watch/succession.jpg",
    date: "2024-04-29",
    featured: true,
    category: "series",
  },
  {
    id: "watch-3",
    title: "MKBHD",
    creator: "Marques Brownlee",
    description:
      "Tech reviews and tutorials on various technologies and gadgets.",
    link: "https://www.youtube.com/@mkbhd",
    imagePath: "/images/listen-watch/mkbhd.jpg",
    date: "2024-04-25",
    featured: true,
    category: "youtube",
  },
  {
    id: "watch-4",
    title: "Interstellar",
    creator: "Christopher Nolan",
    description:
      "The film follows a group of astronauts who travel through a wormhole near Saturn in search of a new home for mankind.",
    link: "https://www.imdb.com/title/tt0816692/",
    imagePath: "/images/listen-watch/interstellar.jpg",
    date: "2024-04-20",
    featured: false,
    category: "movie",
  },
  {
    id: "watch-5",
    title: "Kurzgesagt – In a Nutshell",
    creator: "Kurzgesagt GmbH",
    description:
      "Beautiful animations that make science accessible and thought-provoking.",
    link: "https://www.youtube.com/@kurzgesagt",
    imagePath: "/images/listen-watch/kurzgesagt.jpg",
    date: "2024-04-15",
    featured: false,
    category: "youtube",
  },
];

// Photos are now exported at the top of the file

// Get featured items
export const featuredListenItems = listenItems.filter((item) => item.featured);
export const featuredWatchItems = watchItems.filter((item) => item.featured);
export const featuredPhotos = photos.filter((photo) => photo.featured);
