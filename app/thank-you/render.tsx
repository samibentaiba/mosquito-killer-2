"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/app/components/ui/card";
import { Button } from "@/app/components/ui/button";
import { CheckCircle, Phone, Home, Clock, Package } from "lucide-react";
import Link from "next/link";

export default function Render() {
  const searchParams = useSearchParams();
  const [orderData, setOrderData] = useState({
    orderId: "",
    customerName: "",
    phoneNumber: "",
    wilaya: "",
    city: "",
    quantity: "1",
    total: "",
  });

  useEffect(() => {
    // Avoid setting empty data on first render
    const orderId = searchParams.get("orderId");
    if (!orderId) return;

    setOrderData({
      orderId,
      customerName: searchParams.get("name") || "",
      phoneNumber: searchParams.get("phone") || "",
      wilaya: searchParams.get("wilaya") || "",
      city: searchParams.get("city") || "",
      quantity: searchParams.get("quantity") || "1",
      total: searchParams.get("total") || "",
    });
  }, [searchParams]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 p-4">
      <div className="max-w-2xl mx-auto pt-8">
        {/* Success Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <CheckCircle className="w-20 h-20 text-green-500" />
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            شكراً لتأكيد طلبك
          </h1>
          <p className="text-lg text-gray-600">
            تم استلام طلبك بنجاح وسنتواصل معك قريباً
          </p>
        </div>

        {/* Order Details Card */}
        <Card className="shadow-xl border-0 bg-white/90 backdrop-blur-sm mb-6">
          <CardHeader className="text-center bg-gradient-to-r from-green-500 to-green-600 text-white rounded-t-lg">
            <CardTitle className="flex items-center justify-center gap-2">
              <Package className="w-6 h-6" />
              تفاصيل الطلب
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6 space-y-4">
            {orderData.orderId && (
              <div className="flex justify-between items-center py-2 border-b">
                <span className="font-semibold text-gray-700">رقم الطلب:</span>
                <span className="text-green-600 font-bold">
                  #{orderData.orderId}
                </span>
              </div>
            )}

            {orderData.customerName && (
              <div className="flex justify-between items-center py-2 border-b">
                <span className="font-semibold text-gray-700">الاسم:</span>
                <span className="text-gray-800">{orderData.customerName}</span>
              </div>
            )}

            {orderData.phoneNumber && (
              <div className="flex justify-between items-center py-2 border-b">
                <span className="font-semibold text-gray-700">رقم الهاتف:</span>
                <span className="text-gray-800" dir="ltr">
                  {orderData.phoneNumber}
                </span>
              </div>
            )}

            {orderData.wilaya && (
              <div className="flex justify-between items-center py-2 border-b">
                <span className="font-semibold text-gray-700">الولاية:</span>
                <span className="text-gray-800">{orderData.wilaya}</span>
              </div>
            )}

            {orderData.city && (
              <div className="flex justify-between items-center py-2 border-b">
                <span className="font-semibold text-gray-700">المدينة:</span>
                <span className="text-gray-800">{orderData.city}</span>
              </div>
            )}

            <div className="flex justify-between items-center py-2 border-b">
              <span className="font-semibold text-gray-700">المنتج:</span>
              <span className="text-gray-800">جهاز قاتل البعوض</span>
            </div>

            <div className="flex justify-between items-center py-2 border-b">
              <span className="font-semibold text-gray-700">الكمية:</span>
              <span className="text-gray-800">{orderData.quantity}</span>
            </div>

            {orderData.total && (
              <div className="flex justify-between items-center py-3 bg-green-50 rounded-lg px-4">
                <span className="font-bold text-lg text-gray-700">
                  المبلغ الإجمالي:
                </span>
                <span className="text-green-600 font-bold text-xl">
                  {orderData.total} د.ج
                </span>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Contact Information Card */}
        <Card className="shadow-xl border-0 bg-white/90 backdrop-blur-sm mb-6">
          <CardHeader className="text-center bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-t-lg">
            <CardTitle className="flex items-center justify-center gap-2">
              <Phone className="w-6 h-6" />
              معلومات الاتصال
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6 text-center">
            <p className="text-lg text-gray-700 mb-4">
              لمزيد من المعلومات اتصل على الرقم:
            </p>
            <div className="bg-blue-50 rounded-lg p-4 mb-4">
              <a
                href="tel:+213555123456"
                className="text-2xl font-bold text-blue-600 hover:text-blue-800 transition-colors"
                dir="ltr"
              >
                +213 555 123 456
              </a>
            </div>
            <p className="text-sm text-gray-600">
              أوقات العمل: من السبت إلى الخميس، 9:00 ص - 6:00 م
            </p>
          </CardContent>
        </Card>

        {/* Next Steps Card */}
        <Card className="shadow-xl border-0 bg-white/90 backdrop-blur-sm mb-6">
          <CardHeader className="text-center bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-t-lg">
            <CardTitle className="flex items-center justify-center gap-2">
              <Clock className="w-6 h-6" />
              الخطوات التالية
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-green-100 text-green-600 rounded-full flex items-center justify-center font-bold text-sm">
                  1
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800">تأكيد الطلب</h3>
                  <p className="text-gray-600 text-sm">
                    سنتصل بك خلال 24 ساعة لتأكيد تفاصيل الطلب
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-bold text-sm">
                  2
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800">
                    التحضير والشحن
                  </h3>
                  <p className="text-gray-600 text-sm">
                    سيتم تحضير طلبك وشحنه خلال 2-3 أيام عمل
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center font-bold text-sm">
                  3
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800">
                    التسليم والدفع
                  </h3>
                  <p className="text-gray-600 text-sm">
                    الدفع عند الاستلام - ادفع عندما تستلم المنتج
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/">
            <Button className="w-full sm:w-auto bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white px-8 py-3">
              <Home className="w-4 h-4 mr-2" />
              العودة للصفحة الرئيسية
            </Button>
          </Link>

          <Button
            variant="outline"
            className="w-full sm:w-auto border-blue-500 text-blue-600 hover:bg-blue-50 px-8 py-3"
            onClick={() => window.print()}
          >
            طباعة تفاصيل الطلب
          </Button>
        </div>

        {/* Footer Message */}
        <div className="text-center mt-8 p-4 bg-white/50 rounded-lg">
          <p className="text-gray-600">
            شكراً لثقتكم بنا. نحن ملتزمون بتقديم أفضل خدمة لعملائنا الكرام
          </p>
        </div>
      </div>
    </div>
  );
}
