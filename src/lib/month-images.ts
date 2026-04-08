import january from "@/assets/months/january.jpg";
import april from "@/assets/months/april.jpg";
import july from "@/assets/months/july.jpg";
import october from "@/assets/months/october.jpg";

// Map months to seasonal images (4 images rotate through seasons)
const MONTH_IMAGES: Record<number, string> = {
  0: january,   // Jan - winter
  1: january,   // Feb - winter
  2: april,     // Mar - spring
  3: april,     // Apr - spring
  4: april,     // May - spring
  5: july,      // Jun - summer
  6: july,      // Jul - summer
  7: july,      // Aug - summer
  8: october,   // Sep - autumn
  9: october,   // Oct - autumn
  10: october,  // Nov - autumn
  11: january,  // Dec - winter
};

export function getMonthImage(month: number): string {
  return MONTH_IMAGES[month] ?? january;
}
