# **Mosquito Killer DZ Landing Page**

A streamlined e-commerce landing page designed for the Algerian market to sell mosquito killer devices. Features dynamic shipping calculation, comprehensive Wilaya/City selection, and direct integration with WooCommerce for order processing.

## **Features**

* **Optimized Checkout Flow**: Single-page order form designed for high conversion with "Cash on Delivery" (COD) focus.  
* **Dynamic Location Data**:  
  * Automatically loads Algerian Wilayas and Communes from a local CSV database.  
  * Smart filtering of cities based on selected state.  
* **Smart Shipping Calculation**:  
  * Real-time delivery cost estimation based on the selected state (Wilaya) using mapped zones.  
* **WooCommerce Integration**:  
  * Direct order submission to a WordPress/WooCommerce backend via secure API routes.  
  * Handles customer billing and shipping details automatically.  
* **Responsive Design**: Fully responsive UI built with Tailwind CSS 4, optimized for mobile users.  
* **Interactive UI**: Uses Radix UI components for a polished user experience (Toasts, Selects, Cards, Dialogs).

## **Tech Stack**

* **Framework**: [Next.js 15](https://nextjs.org/) (App Router)  
* **Language**: [TypeScript](https://www.typescriptlang.org/)  
* **Styling**: [Tailwind CSS 4](https://tailwindcss.com/) & tw-animate-css  
* **Icons**: [Lucide React](https://lucide.dev/)  
* **UI Components**: Built with [Radix UI](https://www.radix-ui.com/) primitives (Select, Toast, Card, etc.)  
* **Data Parsing**: [Papaparse](https://www.papaparse.com/) for CSV handling  
* **Package Manager**: Bun / NPM

## **Getting Started**

### **Prerequisites**

Ensure you have Node.js or Bun installed on your machine.

### **Installation**

1. Install the dependencies:

npm install  
\# or  
bun install

2. Run the development server:

npm run dev  
\# or  
bun dev

3. Open [http://localhost:3000](https://www.google.com/search?q=http://localhost:3000) with your browser to see the result.

## **Usage**

1. **Location Selection**: Select your Wilaya (State) and City from the dropdowns. The system automatically calculates shipping costs based on the zone.  
2. **Customer Details**: Enter Full Name and Phone Number. The form validates inputs to ensure accurate delivery data.  
3. **Order Summary**: Review the total price, which dynamically updates based on quantity and shipping fees.  
4. **Submission**: Click to confirm. The order is sent to the backend, and you are redirected to a Thank You page with order details.

## **Project Structure**

* app:  
  * page.tsx: Main landing page and order form logic.  
  * api/submit-order: Server-side route for handling WooCommerce API requests.  
  * thank-you: Confirmation page component.  
* app/components/ui: Reusable primitive components (Buttons, Inputs, Selects, Toasts).  
* public/data:  
  * algeria\_cities.csv: Database of Algerian administrative divisions.  
  * ShippingData.json: Configuration for shipping zones and costs.  
* lib/utils.ts: Utility functions for class merging and styling.

## **Learn More**

To learn more about the technologies used in this project:

* [Next.js Documentation](https://nextjs.org/docs)  
* [Tailwind CSS Documentation](https://tailwindcss.com/docs)  
* [Radix UI Documentation](https://www.radix-ui.com/)
