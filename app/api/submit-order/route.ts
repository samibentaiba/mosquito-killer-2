// app/api/submit-order/route.ts
import { NextResponse } from "next/server";

const API_URL = "https://homeesia.store/wp-json/wc/v3/orders";
const CONSUMER_KEY = process.env.WC_CONSUMER_KEY!;
const CONSUMER_SECRET = process.env.WC_CONSUMER_SECRET!;

export async function POST(req: Request) {
  try {
    const {
      fullName,
      phoneNumber,
      state,
      stateCode,
      city,
      deliveryPrice,
      quantity,
      wilayaAscii,
    } = await req.json();

    if (!fullName || !phoneNumber || !state || !city || !stateCode) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const [firstName, ...lastParts] = fullName.trim().split(" ");
    const lastName = lastParts.join(" ") || "-";

    const body = {
      payment_method: "cod",
      payment_method_title: "الدفع عند الاستلام",
      set_paid: false,
      status: "processing",
      created_via: "checkout",
      billing: {
        first_name: firstName,
        last_name: lastName,
        phone: phoneNumber,
        state: stateCode,
        city,
        country: "DZ",
      },
      shipping: {
        first_name: firstName,
        last_name: lastName,
        phone: phoneNumber,
        state: stateCode,
        city,
        country: "DZ",
      },
      line_items: [
        {
          product_id: 421,
          quantity,
        },
      ],
      shipping_lines: [
        {
          method_title: "الشحن",
          method_id: "flat_rate",
          total: deliveryPrice.toString(),
        },
      ],
      meta_data: wilayaAscii
        ? [{ key: "wilaya_ascii", value: wilayaAscii }]
        : [],
    };

    const res = await fetch(
      `${API_URL}?consumer_key=${CONSUMER_KEY}&consumer_secret=${CONSUMER_SECRET}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      }
    );

    if (!res.ok) {
      const errorData = await res.json();
      return NextResponse.json({ error: errorData }, { status: res.status });
    }

    const data = await res.json();
    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error("Server Error:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
