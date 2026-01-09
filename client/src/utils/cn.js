// 1. On importe deux assistants professionnels
import clsx from "clsx";           // C'est le "styliste"
import { twMerge } from "tailwind-merge";  // C'est le "coordinateur de mode"

// 2. On crée notre SUPER ASSISTANT personnel
export function cn(...inputs) {
    return twMerge(clsx(inputs));
}