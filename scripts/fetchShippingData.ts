import fs from "fs";
import fetch from "node-fetch";

const API_BASE = "https://homeesia.store/wp-json/wc/v3/shipping/zones";
const AUTH =
  "?consumer_key=ck_e1e5927de1495a5aa8dbe45991da8b13a55956aa&consumer_secret=cs_98ab90963bee663b43a00c3557b6d5b44e90b43a";

interface Zone {
  id: number;
  name: string;
}

interface Location {
  code: string;
  type: string;
}

interface Method {
  settings: {
    cost: {
      value: string;
    };
  };
}

interface ZoneWithDetails {
  id: number;
  name: string;
  locations: number[];
  cost: number | null;
}

(async () => {
  const zonesRes = await fetch(`${API_BASE}${AUTH}`);
  const zonesJson = await zonesRes.json();
  const zones: Zone[] = Array.isArray(zonesJson) ? zonesJson : [];

  const finalOutput: ZoneWithDetails[] = [];

  for (const zone of zones) {
    const zoneId = zone.id;

    // Fetch locations
    const locRes = await fetch(`${API_BASE}/${zoneId}/locations${AUTH}`);
    const locJsonRaw = await locRes.json();
    const locJson: Location[] = Array.isArray(locJsonRaw) ? locJsonRaw : [];

    // Clean up location codes (remove "AF" and "DZ" if present)
    const cleanedLocations = locJson
      .map((loc) => loc.code)
      .filter((code) => code.startsWith("DZ:"))
      .map((code) => parseInt(code.replace("DZ:DZ-", ""), 10))
      .filter((num) => !isNaN(num));

    // Fetch shipping methods
    const methRes = await fetch(`${API_BASE}/${zoneId}/methods${AUTH}`);
    const methJsonRaw = await methRes.json();
    const methJson: Method[] = Array.isArray(methJsonRaw) ? methJsonRaw : [];

    // Parse first available cost
    const costValue =
      methJson.length > 0 && methJson[0].settings?.cost?.value
        ? parseFloat(methJson[0].settings.cost.value)
        : null;

    finalOutput.push({
      id: zoneId,
      name: zone.name,
      locations: cleanedLocations,
      cost: costValue,
    });
  }

  fs.writeFileSync("public/data/ShippingData.json", JSON.stringify(finalOutput, null, 2), "utf-8");
  console.log("✅ data.json has been generated.");
})();
