"use client";

import { useSearchParams, useRouter } from "next/navigation";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Filter } from "lucide-react";

export function FilterSidebar() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const types = [
    "Appartement",
    "Maison",
    "Terrain",
    "Studio",
    "Villa",
    "Commerce",
  ];
  const transactions = ["À louer", "À vendre"];
  const cities = ["Douala", "Yaoundé", "Buea", "Bamenda", "Garoua", "Limbe"];

  const selectedType = searchParams.get("type") || "";
  const selectedTransaction = searchParams.get("transaction") || "";
  const selectedCity = searchParams.get("city") || "";
  const priceMin = parseInt(searchParams.get("priceMin") || "0");
  const priceMax = parseInt(searchParams.get("priceMax") || "500000000");

  const handleFilterChange = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams);
    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    router.push(`/annonces?${params.toString()}`);
  };

  const handlePriceChange = (range: number[]) => {
    const params = new URLSearchParams(searchParams);
    params.set("priceMin", range[0].toString());
    params.set("priceMax", range[1].toString());
    router.push(`/annonces?${params.toString()}`);
  };

  const handleReset = () => {
    router.push("/annonces");
  };

  const FilterContent = () => (
    <div className="space-y-6">
      {/* Type */}
      <div>
        <h3 className="font-semibold text-foreground mb-4">Type de bien</h3>
        <div className="space-y-3">
          {types.map((type) => (
            <div key={type} className="flex items-center">
              <Checkbox
                id={`type-${type}`}
                checked={selectedType === type}
                onCheckedChange={() =>
                  handleFilterChange("type", selectedType === type ? "" : type)
                }
              />
              <Label htmlFor={`type-${type}`} className="ml-2 cursor-pointer">
                {type}
              </Label>
            </div>
          ))}
        </div>
      </div>

      {/* Transaction */}
      <div className="border-t border-border pt-6">
        <h3 className="font-semibold text-foreground mb-4">
          Type de transaction
        </h3>
        <div className="space-y-3">
          {transactions.map((transaction) => (
            <div key={transaction} className="flex items-center">
              <Checkbox
                id={`transaction-${transaction}`}
                checked={selectedTransaction === transaction}
                onCheckedChange={() =>
                  handleFilterChange(
                    "transaction",
                    selectedTransaction === transaction ? "" : transaction,
                  )
                }
              />
              <Label
                htmlFor={`transaction-${transaction}`}
                className="ml-2 cursor-pointer"
              >
                {transaction}
              </Label>
            </div>
          ))}
        </div>
      </div>

      {/* Cities */}
      <div className="border-t border-border pt-6">
        <h3 className="font-semibold text-foreground mb-4">Villes</h3>
        <div className="space-y-3">
          {cities.map((city) => (
            <div key={city} className="flex items-center">
              <Checkbox
                id={`city-${city}`}
                checked={selectedCity === city}
                onCheckedChange={() =>
                  handleFilterChange("city", selectedCity === city ? "" : city)
                }
              />
              <Label htmlFor={`city-${city}`} className="ml-2 cursor-pointer">
                {city}
              </Label>
            </div>
          ))}
        </div>
      </div>

      {/* Price Range */}
      <div className="border-t border-border pt-6">
        <h3 className="font-semibold text-foreground mb-4">Budget</h3>
        <div className="space-y-4">
          <p className="text-sm text-muted-foreground">
            {new Intl.NumberFormat("fr-FR").format(priceMin)} -{" "}
            {new Intl.NumberFormat("fr-FR").format(priceMax)} FCFA
          </p>
          <Slider
            min={0}
            max={500000000}
            step={5000000}
            value={[priceMin, priceMax]}
            onValueChange={handlePriceChange}
          />
        </div>
      </div>

      {/* Reset Button */}
      <Button
        variant="outline"
        className="w-full border-border"
        onClick={handleReset}
      >
        Réinitialiser filtres
      </Button>
    </div>
  );

  return (
    <>
      {/* Mobile Filter Button */}
      <div className="lg:hidden mb-6">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" className="w-full">
              <Filter size={18} className="mr-2" />
              Filtres
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-full sm:w-96">
            <SheetHeader>
              <SheetTitle>Filtrer les annonces</SheetTitle>
            </SheetHeader>
            <div className="mt-6">
              <FilterContent />
            </div>
          </SheetContent>
        </Sheet>
      </div>

      {/* Desktop Sidebar */}
      <aside className="hidden lg:block">
        <FilterContent />
      </aside>
    </>
  );
}
