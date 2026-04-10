export const cropImages: Record<string, string> = {
  wheat: "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?q=80&w=800&auto=format&fit=crop",
  rice: "https://images.unsplash.com/photo-1586201375761-83865001e31c?q=80&w=800&auto=format&fit=crop",
  corn: "https://images.unsplash.com/photo-1551754655-cd27e38d2076?q=80&w=800&auto=format&fit=crop",
  tomato: "https://images.unsplash.com/photo-1560717789-0ac7c58ac90a?q=80&w=800&auto=format&fit=crop",
  potato: "https://images.unsplash.com/photo-1518977676601-b53f02ac10dd?q=80&w=800&auto=format&fit=crop",
  onion: "https://images.unsplash.com/photo-1508747703725-71977713d540?q=80&w=800&auto=format&fit=crop",
  sugarcane: "https://images.unsplash.com/photo-1622244099803-fb99499df5e9?q=80&w=800&auto=format&fit=crop",
  cotton: "https://images.unsplash.com/photo-1615214434250-98315570087f?q=80&w=800&auto=format&fit=crop",
  vegetables: "https://images.unsplash.com/photo-1566385101042-1a0aa0c1268c?q=80&w=800&auto=format&fit=crop",
  godown: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=800&auto=format&fit=crop",
  default: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=800&auto=format&fit=crop"
};

export const getGodownImage = (): string => {
  return cropImages.godown;
};

export const getCropImage = (cropName: string): string => {
  const normalized = cropName.toLowerCase().trim();
  if (normalized.includes('wheat')) return cropImages.wheat;
  if (normalized.includes('rice')) return cropImages.rice;
  if (normalized.includes('corn')) return cropImages.corn;
  if (normalized.includes('tomato')) return cropImages.tomato;
  if (normalized.includes('potato')) return cropImages.potato;
  if (normalized.includes('onion')) return cropImages.onion;
  if (normalized.includes('sugarcane')) return cropImages.sugarcane;
  if (normalized.includes('cotton')) return cropImages.cotton;
  if (normalized.includes('vegetable')) return cropImages.vegetables;
  return cropImages.default;
};
