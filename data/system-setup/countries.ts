import {
  matchesSearch,
  paginateItems,
  type Country,
  type EntityStatus,
  type PaginatedResult,
} from "@/data/system-setup/types";

let countries: Country[] = [
  { id: "1", name: "Pakistan", status: "active" },
  { id: "2", name: "United Arab Emirates", status: "active" },
  { id: "3", name: "Saudi Arabia", status: "inactive" },
  { id: "4", name: "Qatar", status: "active" },
  { id: "5", name: "Bahrain", status: "active" },
  { id: "6", name: "Oman", status: "inactive" },
];

export type CountryInput = {
  name: string;
  status: EntityStatus;
};

export async function listCountries(params?: {
  search?: string;
  page?: number;
  pageSize?: number;
}): Promise<PaginatedResult<Country>> {
  await delay();
  const search = params?.search ?? "";
  const filtered = countries.filter((item) =>
    matchesSearch(item.name, search),
  );
  return paginateItems(filtered, params?.page ?? 1, params?.pageSize ?? 10);
}

export async function getAllCountries(): Promise<Country[]> {
  await delay();
  return [...countries];
}

export async function createCountry(input: CountryInput): Promise<Country> {
  await delay();
  const country: Country = {
    id: String(Date.now()),
    name: input.name.trim(),
    status: input.status,
  };
  countries = [country, ...countries];
  return country;
}

export async function updateCountry(
  id: string,
  input: CountryInput,
): Promise<Country | null> {
  await delay();
  const index = countries.findIndex((item) => item.id === id);
  if (index < 0) return null;
  countries[index] = {
    ...countries[index],
    name: input.name.trim(),
    status: input.status,
  };
  return countries[index];
}

export async function deleteCountry(id: string): Promise<boolean> {
  await delay();
  const before = countries.length;
  countries = countries.filter((item) => item.id !== id);
  return countries.length < before;
}

function delay() {
  return new Promise((resolve) => setTimeout(resolve, 150));
}
