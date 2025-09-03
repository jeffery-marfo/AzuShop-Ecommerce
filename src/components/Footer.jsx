import Mastercard from '../assets/images/MasterCard.png';
import Paypal from '../assets/images/Paypal.png';
import Visa from '../assets/images/Visa.png';

function Footer() {
  return (
    <footer className="w-full bg-gray-50 border-t border-gray-200 px-4 sm:px-6 py-4 sm:py-6">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-0">
        {/* Payment Methods */}
        <div className="flex items-center justify-center sm:justify-start space-x-2 sm:space-x-4 order-2 sm:order-1">
          {/* Visa */}
          <div className="flex items-center justify-center bg-white rounded px-2 sm:px-3 py-1.5 sm:py-2 shadow-sm border border-gray-100 transition-shadow hover:shadow-md">
            <img 
              src={Visa} 
              alt="Visa" 
              className="w-8 h-6 sm:w-10 sm:h-8 object-contain"
            />
          </div>
          
          {/* PayPal */}
          <div className="flex items-center justify-center bg-white rounded px-2 sm:px-3 py-1.5 sm:py-2 shadow-sm border border-gray-100 transition-shadow hover:shadow-md">
            <img 
              src={Paypal} 
              alt="PayPal" 
              className="w-8 h-6 sm:w-10 sm:h-8 object-contain"
            />
          </div>
          
          {/* Mastercard */}
          <div className="flex items-center justify-center bg-white rounded px-2 sm:px-3 py-1.5 sm:py-2 shadow-sm border border-gray-100 transition-shadow hover:shadow-md">
            <img 
              src={Mastercard} 
              alt="Mastercard" 
              className="w-10 h-6 sm:w-12 sm:h-8 object-contain"
            />
          </div>
        </div>
        
        {/* Copyright */}
        <div className="text-gray-600 text-xs sm:text-sm text-center sm:text-right order-1 sm:order-2">
          © 2022 Evershop. All Rights Reserved.
        </div>
      </div>
    </footer>
  );
}

export default Footer;