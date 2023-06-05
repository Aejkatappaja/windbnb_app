import { StayType } from "@/types/stay";
import { endpoint } from "@/utils/endpoint";

export async function getAllStays(
  city?: string,
  guests?: number
): Promise<StayType[]> {
  let url = `${endpoint}/stays`;

  if (city) {
    url += `?city=${city}`;
  }

  if (guests) {
    url += `?guests=${guests}`;
  }

  if (city && guests) {
    url += `?city=${city}&guests=${guests}`;
  }
  const res: Response = await fetch(url);

  const data = await res.json();

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return data.stays;
}

// import { NextRequest, NextResponse } from "next/server";
// import stays from "@/data/stays.json";
// import { StayType } from "@/types/stay";

// interface FilteredStaysResponse {
//   stays: StayType[];
// }

// interface AllStaysResponse {
//   stays: StayType[];
// }

// export default async function GET(request: NextRequest): Promise<NextResponse> {
//   const url = new URL(request.url);
//   const city = url.searchParams.get("city");

//   // Vérifiez si la ville est présente dans la requête
//   if (city) {
//     const filteredStays: StayType[] = stays.filter((stay) => {
//       if (Array.isArray(stay)) {
//         return stay.some((s) => s.city === city);
//       }
//       return stay.city === city;
//     });

//     const response: FilteredStaysResponse = { stays: filteredStays };
//     return NextResponse.json(response);
//   }

//   // Si la ville n'est pas spécifiée, retournez toutes les données
//   const allStays: StayType[] = stays;
//   const response: AllStaysResponse = { stays: allStays };
//   return NextResponse.json(response);
// }
