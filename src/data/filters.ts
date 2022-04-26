import { BuildingType, BuildingAge, SortingItem } from "@/types/Filters";

const buildingTypes: BuildingType[] = ['Apartment', 'House', 'Studio'];
const buildingAges: BuildingAge[] = ['Old', 'New'];
const rooms: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const floors: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const sortingList: SortingItem[] = [
  {
    label: 'Price: Lower',
    value: 'price:low',
    field: 'price',
    order: 'DESC',
  },
  {
    label: 'Price: Highest',
    value: 'price:highest',
    order: 'ASC',
    field: 'price',
  },
  {
    label: 'Date: Latest',
    value: 'created_at:latest',
    order: 'DESC',
    field: 'created_at',
  },
  {
    label: 'Date: Newest',
    value: 'created_at: newest',
    field: 'created_at',
    order: 'ASC',
  },
];

export {
  buildingTypes,
  buildingAges,
  rooms,
  floors,
  sortingList,
};
