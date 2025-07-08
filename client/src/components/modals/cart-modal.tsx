import { useCart } from '../../hooks/use-cart';
import { useAuth } from '../../hooks/use-auth';

interface CartModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CartModal({ isOpen, onClose }: CartModalProps) {
  const { cart, removeFromCart, updateQuantity, getTotal, checkout } = useCart();
  const { user } = useAuth();

  const handleCheckout = () => {
    if (!user) {
      alert('Please login to place an order');
      return;
    }

    const orderMessage = checkout(user.username);
    if (orderMessage) {
      // Copy to clipboard
      navigator.clipboard.writeText(orderMessage);
      alert('Order details copied to clipboard! Send this message to @sephyxofficial on Instagram.');
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-cyber-black/80 backdrop-blur-sm">
      <div className="glass-morphism p-8 max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto border border-cyber-cyan/30 animate-fade-in-up">
        <div className="flex items-center justify-between mb-8 pb-4 border-b border-cyber-cyan/20">
          <span className="text-cyber-green font-orbitron text-2xl font-bold neon-glow">VAULT_INVENTORY</span>
          <button 
            onClick={onClose}
            className="text-cyber-red hover:text-cyber-pink text-3xl transition-colors duration-300"
          >
            &times;
          </button>
        </div>
        
        {cart.length === 0 ? (
          <div className="text-center py-16">
            <div className="glass-morphism p-8 max-w-md mx-auto">
              <div className="text-cyber-cyan font-space text-xl font-bold mb-4">VAULT EMPTY</div>
              <div className="text-gray-400">Add items to your vault to continue</div>
            </div>
          </div>
        ) : (
          <>
            <div className="space-y-4 mb-8">
              {cart.map((item) => (
                <div key={item.product.id} className="card-modern p-6 flex items-center justify-between">
                  <div className="flex items-center space-x-6">
                    <img 
                      src={item.product.image} 
                      alt={item.product.title}
                      className="w-20 h-20 object-cover rounded-xl"
                    />
                    <div>
                      <div className="text-cyber-cyan font-space text-lg font-semibold">{item.product.title}</div>
                      <div className="text-cyber-purple text-xl font-orbitron font-bold">${item.product.price}</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <button
                      onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                      className="modern-button w-10 h-10 text-cyber-red hover:text-cyber-pink bg-cyber-red/10 hover:bg-cyber-red/20"
                    >
                      -
                    </button>
                    <span className="text-cyber-cyan px-4 text-lg font-bold">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                      className="modern-button w-10 h-10 text-cyber-green hover:text-cyber-cyan bg-cyber-green/10 hover:bg-cyber-green/20"
                    >
                      +
                    </button>
                    <button
                      onClick={() => removeFromCart(item.product.id)}
                      className="modern-button w-10 h-10 text-cyber-red hover:text-cyber-pink bg-cyber-red/10 hover:bg-cyber-red/20 ml-2"
                    >
                      ×
                    </button>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="glass-morphism border border-cyber-cyan/20 p-6 mt-8">
              <div className="flex justify-between items-center mb-6">
                <span className="font-space text-cyber-cyan text-lg font-semibold uppercase tracking-wider">Total Credits:</span>
                <span className="font-orbitron text-cyber-green text-3xl font-black">${getTotal()}</span>
              </div>
              <button
                onClick={handleCheckout}
                className="modern-button w-full bg-gradient-cyber hover:bg-gradient-neon text-white py-5 font-space font-bold uppercase tracking-[0.2em] text-lg"
              >
                GENERATE_ORDER
              </button>
              <div className="text-xs text-gray-400 text-center mt-4">
                Order details will be copied to clipboard for Instagram checkout
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
