"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Search } from "lucide-react";

export function SearchBar() {
  const router = useRouter();
  const [location, setLocation] = useState("");
  const [type, setType] = useState("all");
  const [transaction, setTransaction] = useState("all");
  const [priceRange, setPriceRange] = useState([0, 500000000]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (location) params.append("location", location);
    if (type && type !== "all") params.append("type", type);
    if (transaction && transaction !== "all")
      params.append("transaction", transaction);
    params.append("priceMin", priceRange[0].toString());
    params.append("priceMax", priceRange[1].toString());
    router.push(`/annonces?${params.toString()}`);
  };

  return (
    <form
      onSubmit={handleSearch}
      className="bg-white dark:bg-slate-900 rounded-lg shadow-xl p-6 max-w-3xl mx-auto"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
        {/* Location */}
        <div>
          <Input
            type="text"
            placeholder="Ville ou quartier..."
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="w-full"
          />
        </div>

        {/* Type */}
        <Select value={type} onValueChange={setType}>
          <SelectTrigger>
            <SelectValue placeholder="Type de bien" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tous les types</SelectItem>
            <SelectItem value="Appartement">Appartement</SelectItem>
            <SelectItem value="Maison">Maison</SelectItem>
            <SelectItem value="Terrain">Terrain</SelectItem>
            <SelectItem value="Studio">Studio</SelectItem>
            <SelectItem value="Villa">Villa</SelectItem>
            <SelectItem value="Commerce">Commerce</SelectItem>
          </SelectContent>
        </Select>

        {/* Transaction */}
        <Select value={transaction} onValueChange={setTransaction}>
          <SelectTrigger>
            <SelectValue placeholder="Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">À louer & À vendre</SelectItem>
            <SelectItem value="À louer">À louer</SelectItem>
            <SelectItem value="À vendre">À vendre</SelectItem>
          </SelectContent>
        </Select>

        {/* Budget */}
        <Button
          type="submit"
          className="bg-primary hover:bg-primary/90 text-white w-full"
        >
          <Search size={18} className="mr-2" />
          Chercher
        </Button>
      </div>

      {/* Price Range Slider */}
      <div className="space-y-3">
        <label className="text-sm font-medium">
          Budget: {new Intl.NumberFormat("fr-FR").format(priceRange[0])} -{" "}
          {new Intl.NumberFormat("fr-FR").format(priceRange[1])} FCFA
        </label>
        <Slider
          min={0}
          max={500000000}
          step={5000000}
          value={priceRange}
          onValueChange={setPriceRange}
          className="w-full"
        />
      </div>
    </form>
  );
}
