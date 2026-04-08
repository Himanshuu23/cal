import january from "@/assets/months/january.jpg";
import april from "@/assets/months/april.jpg";
import july from "@/assets/months/july.jpg";
import october from "@/assets/months/october.jpg";

const MONTH_IMAGES: Record<number, string> = {
  0: january,   
  1: january,  
  2: april,     
  3: april,     
  4: april,     
  5: july,      
  6: july,      
  7: july,
  8: october,
  9: october,   
  10: october,  
  11: january,
};

export function getMonthImage(month: number): string {
  return MONTH_IMAGES[month] ?? january;
}
