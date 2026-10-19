import Yoko1 from "../assets/Yoko1.avif";
import Yoko2 from "../assets/Yoko2.avif";
import Yoko3 from "../assets/Yoko3.avif";
import Model1 from "../assets/model1.avif";
import Model2 from "../assets/model2.avif";
import Model3 from "../assets/model3.avif";
import Art1 from "../assets/Art1.jpg";
import Art2 from "../assets/Art2.jpg";
import Art3 from "../assets/Art3.avif";

/**
 * Artwork catalogue.
 *
 * SHAPE NOTICE — the original fields (id, title, Artist, price, description,
 * images, sizes, frames, mediums) are untouched and nothing about how artworks
 * are imported/consumed has changed. The following fields are ADDITIVE, purely
 * so the Shop filters and the detail page have real metadata to render:
 *
 *   category    "Portrait" | "Landscape" | "Street"  -> Shop category filter
 *   year        number                                -> "Newest" sort + detail spec row
 *   dimensions  string                                -> detail spec row
 *   editionSize number                                -> "Limited edition of N"
 *
 * These values are placeholder metadata inferred from the image assets and the
 * existing descriptions. Confirm/replace them with the artist's real records.
 */
export const artworks = [
  {
    id: 1,
    title: "Golden Horizon",
    Artist: "Razak",
    price: 120000,
    description: "Warm golden sunset over calm waters.",
    images: [Yoko1],
    sizes: ["Small", "Medium", "Large"],
    frames: ["Wood", "Black", "Gold"],
    mediums: ["Canvas", "Glass", "Acrylic"],
    category: "Landscape",
    year: 2023,
    dimensions: "50 × 70 cm",
    editionSize: 25,
  },
  {
    id: 2,
    title: "Urban Silence",
    Artist: "Razak",
    price: 150000,
    description: "Moody cityscape with modern tones.",
    images: [Yoko2],
    sizes: ["Small", "Medium", "Large"],
    frames: ["Silver", "Black"],
    mediums: ["Canvas", "Metal Print"],
    category: "Portrait",
    year: 2024,
    dimensions: "60 × 75 cm",
    editionSize: 30,
  },
  {
    id: 3,
    title: "Classic Bloom",
    Artist: "Razak",
    price: 150000,
    description: "Moody cityscape with modern tones.",
    images: [Yoko3],
    sizes: ["Small", "Medium", "Large"],
    frames: ["Silver", "Black"],
    mediums: ["Canvas", "Metal Print"],
    category: "Portrait",
    year: 2024,
    dimensions: "60 × 75 cm",
    editionSize: 30,
  },
  {
    id: 4,
    title: "Urban Silence",
    Artist: "Razak",
    price: 150000,
    description: "Moody cityscape with modern tones.",
    images: [Model1],
    sizes: ["Small", "Medium", "Large"],
    frames: ["Silver", "Black"],
    mediums: ["Canvas", "Metal Print"],
    category: "Portrait",
    year: 2025,
    dimensions: "60 × 75 cm",
    editionSize: 20,
  },
  {
    id: 5,
    title: "Urban Silence",
    Artist: "Razak",
    price: 150000,
    description: "Moody cityscape with modern tones.",
    images: [Model2],
    sizes: ["Small", "Medium", "Large"],
    frames: ["Silver", "Black"],
    mediums: ["Canvas", "Metal Print"],
    category: "Street",
    year: 2024,
    dimensions: "60 × 90 cm",
    editionSize: 15,
  },
  {
    id: 6,
    title: "Urban Silence",
    Artist: "Razak",
    price: 150000,
    description: "Moody cityscape with modern tones.",
    images: [Model3],
    sizes: ["Small", "Medium", "Large"],
    frames: ["Silver", "Black"],
    mediums: ["Canvas", "Metal Print"],
    category: "Portrait",
    year: 2023,
    dimensions: "60 × 75 cm",
    editionSize: 20,
  },
  {
    id: 7,
    title: "Urban Silence",
    Artist: "Razak",
    price: 150000,
    description: "Moody cityscape with modern tones.",
    images: [Art1],
    sizes: ["Small", "Medium", "Large"],
    frames: ["Silver", "Black"],
    mediums: ["Canvas", "Metal Print"],
    category: "Street",
    year: 2025,
    dimensions: "70 × 100 cm",
    editionSize: 10,
  },
  {
    id: 8,
    title: "Urban Silence",
    Artist: "Razak",
    price: 150000,
    description: "Moody cityscape with modern tones.",
    images: [Art2],
    sizes: ["Small", "Medium", "Large"],
    frames: ["Silver", "Black"],
    mediums: ["Canvas", "Metal Print"],
    category: "Landscape",
    year: 2023,
    dimensions: "90 × 60 cm",
    editionSize: 15,
  },
  {
    id: 9,
    title: "Urban Silence",
    Artist: "Razak",
    price: 150000,
    description: "Moody cityscape with modern tones.",
    images: [Art3],
    sizes: ["Small", "Medium", "Large"],
    frames: ["Silver", "Black"],
    mediums: ["Canvas", "Metal Print"],
    category: "Landscape",
    year: 2025,
    dimensions: "90 × 60 cm",
    editionSize: 15,
  },
];