import { supabaseUrl } from '../services/supabase';

const imageUrl = `${supabaseUrl}/storage/v1/object/public/cabin-images/`;

export const cabins = [
  {
    name: 'Pinewood Retreat',
    maxCapacity: 2,
    regularPrice: 250,
    discount: 0,
    image: imageUrl + 'cabin-001.jpg',
    description:
      'A cozy cabin nestled among tall pine trees, featuring a small kitchen, two bedrooms, and a private balcony overlooking the forest.',
  },
  {
    name: 'Lakeside Haven',
    maxCapacity: 2,
    regularPrice: 350,
    discount: 25,
    image: imageUrl + 'cabin-002.jpg',
    description:
      'Located by the lake, this spacious cabin includes three bedrooms, a large living area with a fireplace, and a barbecue patio.',
  },
  {
    name: 'Mountain View Lodge',
    maxCapacity: 4,
    regularPrice: 300,
    discount: 0,
    image: imageUrl + 'cabin-003.jpg',
    description:
      'A luxurious cabin offering stunning mountain views, featuring four bedrooms, a hot tub, and a fully equipped modern kitchen.',
  },
  {
    name: 'Sunset Creek Cabin',
    maxCapacity: 4,
    regularPrice: 500,
    discount: 50,
    image: imageUrl + 'cabin-004.jpg',
    description:
      'A charming one-bedroom cabin with a rustic design, perfect for couples seeking a romantic getaway. Includes a small porch by a babbling creek.',
  },
  {
    name: 'Family Wilderness Cabin',
    maxCapacity: 6,
    regularPrice: 350,
    discount: 0,
    image: imageUrl + 'cabin-005.jpg',
    description:
      'Ideal for family gatherings, this large cabin includes five bedrooms, a game room, and a spacious deck for outdoor activities.',
  },
  {
    name: 'Secluded Birch Cottage',
    maxCapacity: 6,
    regularPrice: 800,
    discount: 100,
    image: imageUrl + 'cabin-006.jpg',
    description:
      'A secluded getaway surrounded by birch trees, offering one bedroom, a reading nook, and an outdoor fire pit for stargazing nights.',
  },
  {
    name: 'Rustic River Escape',
    maxCapacity: 8,
    regularPrice: 600,
    discount: 100,
    image: imageUrl + 'cabin-007.jpg',
    description:
      'A tranquil cabin located by the riverbank, featuring two bedrooms, a fully equipped kitchen, and a wraparound deck for enjoying the serene water views.',
  },
  {
    name: 'Evergreen Chalet',
    maxCapacity: 10,
    regularPrice: 1400,
    discount: 0,
    image: imageUrl + 'cabin-008.jpg',
    description:
      'A modern cabin surrounded by evergreen forests, offering three bedrooms, a loft, and large windows for immersive nature views. Includes access to a shared heated pool.',
  },
];
