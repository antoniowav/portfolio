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
    title: "The Joe Rogan Experience",
    creator: "Joe Rogan",
    description:
      "Long-form conversations with experts in various fields from science to entertainment.",
    link: "https://open.spotify.com/show/4rOoJ6Egrf8K2IrywzwOMk",
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
    title: "Breaking Bad",
    creator: "Vince Gilligan",
    description:
      "A high school chemistry teacher turned methamphetamine manufacturer after a cancer diagnosis.",
    link: "https://www.imdb.com/title/tt0903747/",
    imagePath: "/images/listen-watch/breaking-bad.jpg",
    date: "2024-04-29",
    featured: true,
    category: "series",
  },
  {
    id: "watch-3",
    title: "Computerphile",
    creator: "Sean Riley",
    description:
      "Deep dives into computer science topics explained by experts in the field.",
    link: "https://www.youtube.com/@Computerphile",
    imagePath: "/images/listen-watch/computerphile.jpg",
    date: "2024-04-25",
    featured: true,
    category: "youtube",
  },
  {
    id: "watch-4",
    title: "Inception",
    creator: "Christopher Nolan",
    description:
      "A thief who steals corporate secrets through dream-sharing technology is given the task of planting an idea into someone's mind.",
    link: "https://www.imdb.com/title/tt1375666/",
    imagePath: "/images/listen-watch/inception.jpg",
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
