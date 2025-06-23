"use client";

import type React from "react";
import { useEffect, useState } from "react";
import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";
import { Building2 } from "lucide-react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/components/ui/select";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/app/components/ui/card";
import { Separator } from "@/app/components/ui/separator";
import { Badge } from "@/app/components/ui/badge";
import { ShoppingCart, User, Phone, MapPin, Minus, Plus } from "lucide-react";
import { toast } from "@/app/hooks/use-toast";
import Papa from "papaparse";
import Image from "next/image";

// Types
type WilayaCityMap = { [key: string]: string[] };
type WilayaCodeMap = { [key: string]: string };
type WilayaAsciiMap = { [key: string]: string };

interface FormData {
  state: string;
  stateCode: string;
  wilayaAscii: string;
  city: string;
  phoneNumber: string;
  fullName: string;
}

// Handler Functions
const handleInputChangeUtil = (
  field: string,
  value: string,
  setFormData: React.Dispatch<React.SetStateAction<FormData>>
) => {
  setFormData((prev) => ({
    ...prev,
    [field]: value,
    ...(field === "state" ? { city: "" } : {}),
  }));
};

const handleQuantityChangeUtil = (
  increment: boolean,
  setQuantity: React.Dispatch<React.SetStateAction<number>>
) => {
  setQuantity((prev) => (increment ? prev + 1 : Math.max(1, prev - 1)));
};

const handleSubmit = async (formData: {
  state: string;
  stateCode: string;
  city: string;
  phoneNumber: string;
  deliveryPrice: number;
  fullName: string;
  totalPrice: number;
  quantity: number;
  wilayaAscii?: string;
}) => {
  const requiredFields = [
    "state",
    "stateCode",
    "city",
    "phoneNumber",
    "fullName",
  ];
  const missing = requiredFields.find(
    (field) => !formData[field as keyof typeof formData]
  );

  if (missing) {
    toast({
      title: "معلومات مطلوبة",
      description: "يرجى ملء جميع الحقول المطلوبة",
      variant: "destructive",
    });
    return;
  }

  try {
    const res = await fetch("/api/submit-order", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    const result = await res.json();

    if (!res.ok) {
      throw new Error(result.error || "Unknown error");
    }

    toast({
      title: "تم تأكيد الطلب",
      description: "تم إرسال معلوماتك بنجاح وسنتواصل معك قريباً",
    });
  } catch (error) {
    console.error("Submit error:", error);
    toast({
      title: "حدث خطأ",
      description: "لم نتمكن من إرسال الطلب. حاول مجدداً",
      variant: "destructive",
    });
  }
};

// WilayaCitySelector Component
const WilayaCitySelectorWithTheme: React.FC<{
  formData: FormData;
  handleInputChange: (field: keyof FormData, value: string) => void;
  cities: WilayaCityMap;
  selectedWilaya: string;
  selectedWilayaCode: string;
  selectedWilayaAscii: string;
  selectedCity: string;
  setSelectedWilaya: (value: string) => void;
  setSelectedCity: (value: string) => void;
  wilayaAsciiMap: WilayaAsciiMap;
  wilayaCodesMap: WilayaCodeMap;
}> = ({
  handleInputChange,
  cities,
  selectedWilaya,
  selectedCity,
  setSelectedWilaya,
  setSelectedCity,
  wilayaAsciiMap,
  wilayaCodesMap,
}) => {
  //...

  const states = Object.keys(cities);

  return (
    <>
      {/* Wilaya (State) */}
      <div className="space-y-2">
        <Select
          value={selectedWilaya}
          onValueChange={(value: string) => {
            setSelectedWilaya(value);
            setSelectedCity("");
            handleInputChange("state", value);
            handleInputChange("city", "");

            const ascii = wilayaAsciiMap[value] || "";
            const code = wilayaCodesMap[value] || "";
            const fullCode = `${code} ${ascii} - ${value}`;

            handleInputChange("stateCode", fullCode);
            handleInputChange("wilayaAscii", ascii);
          }}
        >
          <SelectTrigger className="text-right border-gray-200 focus:border-purple-400">
            <div className="flex flex-row-reverse pr-3 items-center justify-between w-full">
              <SelectValue placeholder="الولاية" />
              <MapPin className="h-4 w-4 text-gray-400 ml-2" />
            </div>
          </SelectTrigger>

          <SelectContent>
            {states.map((state) => (
              <SelectItem
                key={state}
                value={state}
                className="text-right flex-row-reverse"
              >
                {state}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* City */}
      <div className="space-y-2">
        <Select
          value={selectedCity}
          onValueChange={(value: string) => {
            setSelectedCity(value);
            handleInputChange("city", value);
          }}
          disabled={!selectedWilaya}
        >
          <SelectTrigger className="text-right border-gray-200 focus:border-purple-400">
            <div className="flex flex-row-reverse pr-3 items-center justify-between w-full">
              <SelectValue placeholder="المدينة" />
              <Building2 className="h-4 w-4 text-gray-400 ml-2" />
            </div>
          </SelectTrigger>
          <SelectContent>
            {selectedWilaya &&
              cities[selectedWilaya]?.map((city) => (
                <SelectItem
                  key={city}
                  value={city}
                  className="text-right flex-row-reverse"
                >
                  {city}
                </SelectItem>
              ))}
          </SelectContent>
        </Select>
      </div>
    </>
  );
};

// Main OrderForm Component
export default function Page() {
  // Form state (previously useOrderForm hook)
  const [formData, setFormData] = useState<FormData>({
    state: "",
    stateCode: "",
    wilayaAscii: "",
    city: "",
    phoneNumber: "",
    fullName: "",
  });

  const [quantity, setQuantity] = useState(1);
  const [deliveryCost, setDeliveryCost] = useState(0);

  // Filter/Cities state (previously useFilter hook)
  const [cities, setCities] = useState<WilayaCityMap>({});
  const [wilayaCodes, setWilayaCodes] = useState<WilayaCodeMap>({});
  const [wilayaAscii, setWilayaAscii] = useState<WilayaAsciiMap>({});
  const [selectedWilaya, setSelectedWilaya] = useState("");
  const [selectedWilayaCode, setSelectedWilayaCode] = useState("");
  const [selectedWilayaAscii, setSelectedWilayaAscii] = useState("");
  const [selectedCity, setSelectedCity] = useState("");

  // Price calculations
  const basePrice = 1900;
  const deliveryPrice = deliveryCost;

  const totalPrice = basePrice * quantity + deliveryPrice;

  // Load CSV data (previously useFilter hook)
  useEffect(() => {
    fetch("/data/algeria_cities.csv")
      .then((res) => res.text())
      .then((csv) => {
        const result = Papa.parse(csv, { header: true });
        interface CSVRow {
          wilaya_name?: string;
          wilaya_name_ascii?: string;
          commune_name?: string;
          wilaya_code?: string;
        }
        const rows = result.data as CSVRow[];

        const grouped: { [key: string]: Set<string> } = {};
        const codes: WilayaCodeMap = {};
        const asciiMap: WilayaAsciiMap = {};

        rows.forEach((row) => {
          const wilaya = row.wilaya_name?.trim();
          const wilayaAsciiName = row.wilaya_name_ascii?.trim();
          const city = row.commune_name?.trim();
          const code = row.wilaya_code?.trim();

          if (wilaya && city) {
            if (!grouped[wilaya]) grouped[wilaya] = new Set();
            grouped[wilaya].add(city);
          }

          if (wilaya && code && !codes[wilaya]) {
            codes[wilaya] = code;
          }

          if (wilaya && wilayaAsciiName && !asciiMap[wilaya]) {
            asciiMap[wilaya] = wilayaAsciiName;
          }
        });

        const final: WilayaCityMap = {};
        Object.keys(grouped).forEach((w) => {
          final[w] = Array.from(grouped[w]).sort();
        });

        setCities(final);
        setWilayaCodes(codes);
        setWilayaAscii(asciiMap);
      });
  }, []);
  // Type for shipping zone (move this outside the effect)
  interface ShippingZone {
    locations: number[];
    cost: number;
  }

  // Fetch delivery cost from ShippingData.json
  useEffect(() => {
    if (!formData.stateCode) return;

    const wilayaCode = parseInt(
      formData.stateCode.match(/\b\d{1,2}\b/)?.[0] || "",
      10
    );

    console.log("StateCode:", formData.stateCode, "→ Wilaya Code:", wilayaCode);

    fetch("/data/ShippingData.json")
      .then((res) => res.json())
      .then((zones: ShippingZone[]) => {
        const matchedZone = zones.find((zone) =>
          zone.locations.includes(wilayaCode)
        );
        setDeliveryCost(matchedZone?.cost ?? 0);
      })
      .catch((err) => {
        console.error("Failed to load delivery cost", err);
        setDeliveryCost(0);
      });
  }, [formData.stateCode]); // ✅ <-- this was missing!

  // Sync wilaya selection with codes and ascii (previously useFilter hook)
  useEffect(() => {
    if (selectedWilaya) {
      setSelectedWilayaCode(wilayaCodes[selectedWilaya] || "");
      setSelectedWilayaAscii(wilayaAscii[selectedWilaya] || "");
    } else {
      setSelectedWilayaCode("");
      setSelectedWilayaAscii("");
    }
  }, [selectedWilaya, wilayaCodes, wilayaAscii]);

  // Sync form data with selections (previously useWilayaCitySelector hook)
  useEffect(() => {
    setSelectedWilaya(formData.state);
    setSelectedCity(formData.city);
  }, [formData.state, formData.city]);

  useEffect(() => {
    if (formData.state !== selectedWilaya) {
      handleInputChangeUtil("state", selectedWilaya, setFormData);

      const formattedCode = `${selectedWilayaAscii} - ${selectedWilaya} ${selectedWilayaCode}`;
      handleInputChangeUtil("stateCode", formattedCode, setFormData);

      if (selectedWilayaAscii) {
        handleInputChangeUtil("wilayaAscii", selectedWilayaAscii, setFormData);
      }
    }

    if (formData.city !== selectedCity) {
      handleInputChangeUtil("city", selectedCity, setFormData);
    }
  }, [
    selectedWilaya,
    selectedCity,
    selectedWilayaAscii,
    selectedWilayaCode,
    formData.state,
    formData.city,
  ]);

  // Handler functions
  const handleInputChange = (field: keyof FormData, value: string) =>
    handleInputChangeUtil(field, value, setFormData);

  const handleQuantityChange = (increment: boolean) =>
    handleQuantityChangeUtil(increment, setQuantity);

  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 ">
      {/* Placeholder for drop-page image */}

      <div className="w-full h-screen relative mb-6">
        {!imageLoaded && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-200 rounded-lg animate-pulse z-0">
            <span className="text-gray-500">جارٍ تحميل الصورة...</span>
          </div>
        )}
        <Image
          src="/assets/drop-page.png"
          alt="Mosquito Killer Device"
          fill
          className={`w-screen  transition-opacity duration-500 ${
            imageLoaded ? "opacity-100" : "opacity-0"
          }`}
          onLoadingComplete={() => setImageLoaded(true)}
        />
      </div>
      <div className="p-4">
        {/* Header */}
        <div className="text-center mb-6 ">
          <h1 className="text-2xl font-bold text-gray-800 mb-2 flex items-center justify-center gap-2">
            <span>👇</span>
            ادخل معلوماتك واضغط على الزر
            <span>👇</span>
          </h1>
        </div>

        {/* Main Form Card */}
        <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
          <CardContent className="p-6 space-y-4">
            {/* Full Name */}
            <div className="space-y-2">
              <div className="relative">
                <Input
                  placeholder="الاسم بالكامل"
                  value={formData.fullName}
                  onChange={(e) =>
                    handleInputChange("fullName", e.target.value)
                  }
                  className="pr-10 text-right border-gray-200 focus:border-purple-400 transition-colors"
                />
                <User className="absolute right-3 top-3 h-4 w-4 text-gray-400" />
              </div>
            </div>

            {/* Phone Number */}
            <div className="space-y-2">
              <div className="relative">
                <Input
                  placeholder="رقم الهاتف"
                  value={formData.phoneNumber}
                  onChange={(e) =>
                    handleInputChange("phoneNumber", e.target.value)
                  }
                  className="pr-10 text-right border-gray-200 focus:border-purple-400 transition-colors"
                />
                <Phone className="absolute right-3 top-3 h-4 w-4 text-gray-400" />
              </div>
            </div>

            <WilayaCitySelectorWithTheme
              formData={formData}
              handleInputChange={handleInputChange}
              cities={cities}
              selectedWilaya={selectedWilaya}
              selectedWilayaCode={selectedWilayaCode}
              selectedWilayaAscii={selectedWilayaAscii}
              selectedCity={selectedCity}
              setSelectedWilaya={setSelectedWilaya}
              setSelectedCity={setSelectedCity}
              wilayaAsciiMap={wilayaAscii}
              wilayaCodesMap={wilayaCodes}
            />

            {/* Quantity Controls */}
            <div className="flex items-center justify-center gap-4 py-4">
              <Button
                variant="outline"
                size="icon"
                onClick={() => handleQuantityChange(false)}
                disabled={quantity <= 1}
                className="rounded-full hover:bg-purple-50"
              >
                <Minus className="h-4 w-4" />
              </Button>

              <div className="bg-gray-50 px-6 py-2 rounded-lg min-w-[60px] text-center font-semibold">
                {quantity}
              </div>

              <Button
                variant="outline"
                size="icon"
                onClick={() => handleQuantityChange(true)}
                className="rounded-full hover:bg-purple-50"
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>

            {/* Submit Button */}
            <Button
              onClick={() =>
                handleSubmit({
                  ...formData,
                  totalPrice,
                  quantity,
                  deliveryPrice,
                })
              }
              className="w-full bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white font-semibold py-3 rounded-xl transition-all duration-200 transform hover:scale-105 shadow-lg"
            >
              انقر هنا لتأكيد الطلب
            </Button>
          </CardContent>
        </Card>

        {/* Order Summary */}
        <Card className="mt-6 shadow-xl border-0  bg-white/80 backdrop-blur-sm">
          <CardHeader className="pb-3 flex-row-reverse">
            <CardTitle className="text-right flex  items-center gap-2">
              <ShoppingCart className="h-5 w-5 " />
              ملخص الطلب
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 flex-row-reverse">
            <div className="space-y-3 ">
              <div className="flex justify-between items-center flex-row-reverse">
                <Badge
                  variant="secondary"
                  className="bg-purple-100 text-purple-800"
                >
                  جهاز قاتل البعوض
                </Badge>
                <span className="font-semibold">
                  {basePrice} د.ج x {quantity}
                </span>
              </div>

              <Separator />

              <div className="flex justify-between items-center flex-row-reverse text-sm ">
                <span>سعر التوصيل</span>
                <span>{deliveryPrice} د.ج</span>
              </div>

              <div className="flex justify-between items-center flex-row-reverse text-sm">
                <span>إختر الولاية</span>
                <span className="text-purple-600 font-medium">
                  {formData.state || "..."}
                </span>
              </div>

              <Separator />

              <div className="flex justify-between items-center font-bold flex-row-reverse text-lg">
                <span>السعر الإجمالي</span>
                <span className="text-purple-600">{totalPrice} د.ج</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
