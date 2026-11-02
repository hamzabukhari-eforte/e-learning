import {
  matchesSearch,
  paginateItems,
  type City,
  type EntityStatus,
  type PaginatedResult,
} from "@/data/system-setup/types";
import { getAllCountries } from "@/data/system-setup/countries";

let cities: City[] = [
  { id: "1", countryId: "1", countryName: "Pakistan", name: "Karachi", status: "active" },
  { id: "2", countryId: "1", countryName: "Pakistan", name: "Lahore", status: "active" },
  { id: "3", countryId: "1", countryName: "Pakistan", name: "Islamabad", status: "active" },
  { id: "4", countryId: "2", countryName: "United Arab Emirates", name: "Dubai", status: "active" },
  { id: "5", countryId: "2", countryName: "United Arab Emirates", name: "Abu Dhabi", status: "inactive" },
  { id: "6", countryId: "4", countryName: "Qatar", name: "Doha", status: "active" },
];

export type CityInput = {
  countryId: string;
  name: string;
  status: EntityStatus;
};

export async function listCities(params?: {
  search?: string;
  page?: number;
  pageSize?: number;
}): Promise<PaginatedResult<City>> {
  await delay();
  const search = params?.search ?? "";
  const filtered = cities.filter(
    (item) =>
      matchesSearch(item.name, search) ||
      matchesSearch(item.countryName, search),
  );
  return paginateItems(filtered, params?.page ?? 1, params?.pageSize ?? 10);
}

export async function createCity(input: CityInput): Promise<City | null> {
  await delay();
  const countries = await getAllCountries();
  const country = countries.find((item) => item.id === input.countryId);
  if (!country) return null;
  const city: City = {
    id: String(Date.now()),
    countryId: country.id,
    countryName: country.name,
    name: input.name.trim(),
    status: input.status,
  };
  cities = [city, ...cities];
  return city;
}

export async function updateCity(
  id: string,
  input: CityInput,
): Promise<City | null> {
  await delay();
  const countries = await getAllCountries();
  const country = countries.find((item) => item.id === input.countryId);
  const index = cities.findIndex((item) => item.id === id);
  if (!country || index < 0) return null;
  cities[index] = {
    ...cities[index],
    countryId: country.id,
    countryName: country.name,
    name: input.name.trim(),
    status: input.status,
  };
  return cities[index];
}

export async function deleteCity(id: string): Promise<boolean> {
  await delay();
  const before = cities.length;
  cities = cities.filter((item) => item.id !== id);
  return cities.length < before;
}

function delay() {
  return new Promise((resolve) => setTimeout(resolve, 150));
}
