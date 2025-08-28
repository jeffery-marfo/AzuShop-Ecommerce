import Mastercard from '../assets/images/MasterCard.png';
import Paypal from '../assets/images/Paypal.png';
import Visa from '../assets/images/Visa.png';

function Footer() {
  return (
    <footer className="w-full bg-gray-50 border-t border-gray-200 px-6 py-6">
      <div className="flex items-center justify-between">
        {/* Payment Methods */}
        <div className="flex items-center space-x-4">
          {/* Visa */}
          <div className="flex items-center justify-center bg-white rounded px-3 py-2 shadow-sm border border-gray-100">
            <img src={Visa} alt="Visa" className="w-10 h-10" />
          </div>
          
          {/* PayPal */}
          <div className="flex items-center justify-center bg-white rounded px-3 py-2 shadow-sm border border-gray-100">
            <img src={Paypal} alt="PayPal" className="w-10 h-10" />
          </div>
          
          {/* Mastercard */}
          <div className="flex items-center justify-center bg-white rounded px-3 py-2 shadow-sm border border-gray-100">
            <img src={Mastercard} alt="Mastercard" className="w-15 h-10" />
          </div>
        </div>
        
        {/* Copyright */}
        <div className="text-gray-600 text-sm">
          2022 Evershop. All Rights Reserved.
        </div>
      </div>
    </footer>
  );
}

export default Footer;